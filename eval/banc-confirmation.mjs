#!/usr/bin/env node
/**
 * Banc de confirmation — rejoue les 100 vignettes sur le prompt de PROD via /api/eval
 * (chantier A option A1, validé RJ 07/08/2026 ; passe de confirmation validée RJ 04/09/2026).
 *
 * Usage :
 *   EVAL_TOKEN=... node eval/banc-confirmation.mjs [--url=https://...] [--ids=1,2,3] [--concurrency=3]
 *
 * Prérequis (posés par RJ, jamais dans le dépôt ni dans une conversation autre que le jeton) :
 *   - Secret Cloudflare ANTHROPIC_EVAL_KEY : clé API dédiée à plafond, révoquée en fin de campagne.
 *   - Secret Cloudflare EVAL_TOKEN : jeton d'accès à /api/eval (le supprimer désactive l'endpoint).
 *
 * Méthode : pour chaque vignette, dialogue automatique entre
 *   - le TRIAGE de prod (/api/eval mode "triage" : prompt systemPrompt exact, MODEL_PRIMARY,
 *     ctx figé si la vignette en porte un — créneau paralysie reproductible), et
 *   - un SIMULATEUR DE PATIENT (/api/eval mode "patient", modèle économique) qui répond aux
 *     questions de l'IA uniquement à partir de la fiche, sans inventer de symptôme.
 * Référence : eval/vignettes.json + révisions eval/vignettes-arbitrages-2.json.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const args = Object.fromEntries(process.argv.slice(2).map(a => {
  const m = a.match(/^--([^=]+)(?:=(.*))?$/); return m ? [m[1], m[2] ?? true] : [a, true];
}));
const URL_BASE = args.url || "https://urgences-rachis-paris.dr-jameson.workers.dev";
const TOKEN = process.env.EVAL_TOKEN;
if (!TOKEN) { console.error("EVAL_TOKEN manquant (variable d'environnement)."); process.exit(1); }
const CONCURRENCY = parseInt(args.concurrency || "3", 10);
const MAX_TOURS = 8;

const base = JSON.parse(readFileSync(join(here, "vignettes.json"), "utf8"));
const rev = JSON.parse(readFileSync(join(here, "vignettes-arbitrages-2.json"), "utf8")).revisions;
let vignettes = base.vignettes.map(v => rev[String(v.id)] ? { ...v, attendu: rev[String(v.id)].attendu } : v);
if (args.ids) { const keep = new Set(String(args.ids).split(",").map(Number)); vignettes = vignettes.filter(v => keep.has(v.id)); }

/* Dossier au format envoyé par le front (fonction dossier() de public/index.html). */
function dossierProd(v) {
  const d = v.dossier || {};
  const imBrut = String(d.imagerie || "Aucune");
  const recente = /<\s*3\s*mois/.test(imBrut) ? "Oui" : (imBrut === "Aucune" ? null : "Non");
  return {
    region: d.region, sexe: d.sexe === "F" ? "Femme" : d.sexe === "H" ? "Homme" : d.sexe,
    age: String(d.age ?? ""), lateralite: null,
    irradiation: d.irradiation ?? "Non", anciennete: d.anciennete ?? null, evolution: d.evolution ?? null,
    imagerie: imBrut.replace(/\s*\(.*\)\s*$/, ""), imagerie_moins_3_mois: recente,
    conclusion_imagerie: d.conclusion_imagerie ?? null,
    souhait_patient: "avis d'abord", signes_coches: d.signes || [], description: v.description,
  };
}

function promptPatient(v) {
  return `Tu joues un PATIENT qui utilise un site d'orientation médicale. Voici ta fiche (tout ce que tu sais de toi) :
${JSON.stringify({ ...v.dossier, description: v.description }, null, 2)}
Règles : réponds à la dernière question de l'assistant en 1 à 2 phrases simples, à la première personne, en restant STRICTEMENT fidèle à la fiche. N'invente JAMAIS un symptôme, un antécédent ou un détail absent de la fiche : si la fiche ne dit rien sur le sujet, réponds par la négative ou « non, rien de particulier ». Ne pose pas de question, ne remercie pas, ne conclus pas.`;
}

async function callEval(body) {
  for (let essai = 0; essai < 3; essai++) {
    try {
      const r = await fetch(URL_BASE + "/api/eval", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: "Bearer " + TOKEN },
        body: JSON.stringify(body),
      });
      if (r.status === 404) throw Object.assign(new Error("/api/eval éteint (secrets absents ou jeton invalide)"), { fatal: true });
      if (!r.ok) { if (essai < 2) { await new Promise(s => setTimeout(s, 2000 * (essai + 1))); continue; } throw new Error("HTTP " + r.status + " " + (await r.text()).slice(0, 200)); }
      return await r.json();
    } catch (e) { if (e.fatal || essai === 2) throw e; await new Promise(s => setTimeout(s, 2000 * (essai + 1))); }
  }
}

const usd = { in: 0, out: 0 };
function addUsage(u, out) { if (!u) return; usd.in += (u.input_tokens || 0) * 5e-6 + (u.cache_read_input_tokens || 0) * 0.5e-6 + (u.cache_creation_input_tokens || 0) * 6.25e-6; usd.out += (u.output_tokens || 0) * out; }

async function jouer(v) {
  const dossier = dossierProd(v);
  const messages = [{ role: "user", content: "Description du patient : « " + v.description + " »" }];
  for (let tour = 1; tour <= MAX_TOURS; tour++) {
    const t = await callEval({ mode: "triage", dossier, messages, ...(v.ctx ? { ctx: v.ctx } : {}) });
    addUsage(t.usage, 25e-6);
    if (t.sortie) return { v, sortie: t.sortie, tours: tour, ok: t.sortie.niveau === v.attendu };
    messages.push({ role: "assistant", content: t.reply || "(vide)" });
    /* Côté simulateur, les rôles s'inversent : les questions du triage deviennent "user",
       les réponses du patient "assistant". La description initiale est omise (déjà dans la
       fiche) pour que la conversation commence par un message "user", exigence de l'API. */
    const inverse = messages.slice(1).map(m => ({ role: m.role === "assistant" ? "user" : "assistant", content: m.content }));
    const p = await callEval({ mode: "patient", system: promptPatient(v), messages: inverse });
    addUsage(p.usage, 15e-6);
    messages.push({ role: "user", content: (p.reply || "Non, rien de particulier.").trim() });
  }
  return { v, sortie: null, tours: MAX_TOURS, ok: false, epuise: true };
}

const resultats = [];
let idx = 0;
async function worker() {
  while (idx < vignettes.length) {
    const v = vignettes[idx++];
    try {
      const r = await jouer(v);
      resultats.push(r);
      console.log(`${r.ok ? "OK " : "ÉCART"} v${v.id}: attendu ${v.attendu} → ${r.sortie ? r.sortie.niveau + "/" + (r.sortie.motif || "") : "AUCUNE SORTIE"} (${r.tours} tours)`);
    } catch (e) {
      resultats.push({ v, erreur: String(e).slice(0, 200), ok: false });
      console.log(`ERREUR v${v.id}: ${String(e).slice(0, 150)}`);
      if (e.fatal) process.exit(1);
    }
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

resultats.sort((a, b) => a.v.id - b.v.id);
const score = resultats.filter(r => r.ok).length;
const ecarts = resultats.filter(r => !r.ok);
console.log(`\n===== SCORE : ${score}/${resultats.length} — coût ~${(usd.in + usd.out).toFixed(2)} $ =====`);
for (const r of ecarts) console.log(`  v${r.v.id} (${r.v.attendu}) → ${r.erreur ? "ERREUR " + r.erreur : (r.sortie ? r.sortie.niveau + "/" + (r.sortie.motif || "") : "aucune sortie")}${r.v.note ? " · note: " + r.v.note.slice(0, 80) : ""}`);
const horodatage = new Date().toISOString().slice(0, 16).replace("T", " ");
writeFileSync(join(here, "resultats-confirmation.json"), JSON.stringify({ horodatage, url: URL_BASE, score, total: resultats.length, cout_usd: +(usd.in + usd.out).toFixed(2), resultats: resultats.map(r => ({ id: r.v.id, attendu: r.v.attendu, obtenu: r.sortie?.niveau ?? null, motif: r.sortie?.motif ?? null, tours: r.tours ?? null, ok: r.ok, erreur: r.erreur ?? null, synthese: r.sortie?.synthese ?? null })) }, null, 2));
console.log("Détail écrit dans eval/resultats-confirmation.json");
