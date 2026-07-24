# MEMOIRE PROJET — Urgence'Rachis (urgence-rachis.fr)

> Fichier de passation pour Claude. Dans une nouvelle conversation, demander :
> « Lis MEMOIRE.md du repo raphaeljameson-png/urgences_rachis_paris ».
> Dernière mise à jour : 24 juillet 2026.

## RÈGLE DE TRAVAIL ABSOLUE
Avant de coder ou de pousser quoi que ce soit : **discuter et faire valider
explicitement l'approche par Raphael**. Jamais d'implémentation avant accord entériné.
Les textes affichés aux patients sont validés **mot à mot** par le Dr Jameson.

## CONTEXTE
- Projet du **Dr Raphaël Jameson**, chirurgien orthopédiste du rachis,
  **Espace Francilien du Rachis** (avec Dr Mayalen Lamerain et Dr Christophe Travert ;
  ⚠️ le Dr Robin Arvieu ne doit PAS apparaître).
- Objet : site de **triage des douleurs du rachis** (cervical/lombaire) vers
  15 / urgences / avis chirurgical 24-48 h / 48-72 h / médecin traitant / suivi.
- Site principal : rachis.paris. Charte « Precision Médicale » d'Opti'CCAM
  (navy #0B1628, sky #38BDF8, DM Sans/DM Mono, amber/emerald/rose).
- État : **version d'essai** — noindex actif, badge « Version d'essai ».

## INFRA
- Repo GitHub **privé** : `raphaeljameson-png/urgences_rachis_paris`
  (le token MCP peut lire/pousser mais PAS créer de repo).
- Déploiement auto : **Cloudflare Workers**, compte dr.jameson@rachis.paris,
  build command vide, deploy `npx wrangler deploy`.
- KV « URGENCE_KV » créé, ID `8578258e537e45998f97f0ef80685f6f` (branché dans wrangler.jsonc).
- Secrets Worker : `ANTHROPIC_API_KEY` (⚠️ à créer côté Raphael — pas encore fait au 24/07),
  `STATS_KEY` (optionnel, accès /api/stats).
- Domaine cible : urgence-rachis.fr (achat ~10 €/an, pas encore fait).

## ARCHITECTURE v2 (en place sur main)
1. **`src/worker.js`** : proxy `/api/chat` → API Claude (Opus 4.8, bascule auto
   Sonnet 4.6 au-delà de 50 €/mois via compteur KV `spend:YYYY-MM` en USD) ;
   prompt système avec les 12 règles verrouillées + signal
   `<sortie>{"niveau","motif","synthese"}</sortie>` ; `/api/now` (jour+heure Paris) ;
   `/api/stat` (compteurs anonymes agrégés, allowlist) ; `/api/stats?key=` (protégé
   STATS_KEY) ; anti-abus 40 req/IP/jour avec **IP hachée** (SHA-256 salé, rotation
   mensuelle) ; 30 messages max/conversation ; prompt caching ephemeral.
2. **`public/index.html`** : parcours = région (cartes SVG) → sexe → âge →
   latéralité (cervical seul) → irradiation → ancienneté → évolution → imagerie
   (+ récence <6 mois) → souhait (rdv / rdv+IRM / avis) → checklist alarme filtrée
   par région → **court-circuits déterministes** → description libre →
   **conversation IA** → carte de sortie à texte fixe. PDF jsPDF généré localement
   (profil, irradiation, imagerie, souhait, signes, synthèse IA). Envoi = Web Share
   (PDF joint) ou téléchargement + mailto `dr.jameson@rachis.paris`, objet
   « Demande de consultation d'avis chirurgical — rapport Urgence'Rachis ».
3. Stats validées RGPD : compteurs agrégés anonymes uniquement + ligne de
   transparence sur le site + Cloudflare Web Analytics (à activer).

## RÈGLES MÉDICALES VERROUILLÉES (validées Dr Jameson — ne jamais modifier sans lui)
- Sphincter / anesthésie du siège → **15** immédiat (court-circuit client).
- Fièvre + rachis → **urgences**, sans exception (court-circuit).
- Paralysie complète brutale (court-circuit, heure serveur /api/now) :
  vendredi <12 h → 24h motif `paralysie_jour_meme` (jour même) ;
  vendredi ≥12 h ou samedi → urgences ; dimanche–jeudi → 24h `paralysie_lendemain`.
- Perte de force partielle → 24h `force`.
- Myélopathie cervicale (2 mains, marche, Lhermitte — cervical uniquement) → 24h + IRM.
- Trauma haute énergie <24 h → urgences (court-circuit) ; >24 h → 72h `trauma`.
- Trauma faible énergie (susp. tassement) → 72h `tassement`.
- Cancer <5 ans + douleur nouvelle → 72h `cancer` (+ option oncologue).
- Hyperalgique résistant → 72h `hyperalgique`.
- >6 semaines ou aggravation → 72h `persistante`
  (⚠️ critères niveau 3 PROVISOIRES — passe 2 jamais tranchée).
- Aiguë SANS radiculalgie, sans trauma, sans signe → **mt** (médecin traitant).
- Ancienne stable → **suivi**.
- En cas d'hésitation : toujours le niveau le plus urgent.

## DÉCISIONS PRODUIT ENTÉRINÉES
- Aucun lien Doctolib caché : canal unique « 📤 Envoyer mon message au chirurgien »
  (PDF joint, rappel par le secrétariat). Doctolib générique seulement sur carte mt.
- Toute mention de RDV = « consultation avec un chirurgien du rachis pour un avis
  chirurgical ». Cartes = textes fixes, l'IA ne rédige jamais la conclusion.
- Note sur toutes les cartes : évaluation **non médicale**, indicative, doute → 15.
- Synthèse IA visible uniquement dans le PDF.
- Email v1 : dr.jameson@rachis.paris (roadmap : boîte générique équipe).
- Coûts : ~25-30 cts/conversation Opus ; plafond dur conseillé ~100 € console Anthropic.

## PENDING — côté Raphael (dashboard)
1. ⚠️ **Secret `ANTHROPIC_API_KEY`** (console.anthropic.com : clé + crédits + plafond ;
   Cloudflare : Workers → Settings → Variables and Secrets). Sans lui, la phase IA
   affiche « service momentanément indisponible ».
2. Optionnel : secret `STATS_KEY` ; activer Cloudflare Web Analytics.
3. Acheter urgence-rachis.fr.

## PENDING — côté Claude (après validation)
1. **Test de bout en bout** dès la clé en place (scénarios : paralysie vendredi,
   cas banal → mt, myélopathie cervicale, tentative de détournement).
2. Page d'accueil : 2 sections proposées (niveaux d'urgence en 4 cartes ;
   pathologies + maillage rachis.paris) — **jamais validées mot à mot, ne pas coder**.
3. Passe 2 sur les critères niveau 3 (seuil 4/6 semaines, « traitement bien
   conduit », EVA, IRM déjà faite) — jamais tranchée.
4. Lancement : retirer noindex + badge, mentions légales/RGPD complètes, SEO
   (Schema.org, Search Console, maillage rachis.paris / institutdurachis.com).

## FICHIERS DE TRAVAIL (conteneur Claude, non persistants)
`/home/claude/urgence/` : arbres.py, build_pdf.py, index-v2.html, worker.js…
PDF des arbres décisionnels remis : urgence-rachis-arbres-decisionnels.pdf (validé).
