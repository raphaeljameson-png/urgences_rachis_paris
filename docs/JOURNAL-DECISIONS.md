# Urgence'Rachis — Journal des décisions

> Relu par Claude en début de chaque session, au même titre que MEMOIRE.md.
> Objet : consigner chaque arbitrage du Dr Jameson (daté, avec justification), les
> points ouverts, et les retours d'expérience cas par cas qui feront émerger la
> logique de la grille G/U et nourriront le prompt du worker.
> Règle : aucune décision listée en section 1 sans validation explicite de RJ.

---

## 1. Décisions entérinées

| Date | Décision | Justification |
|---|---|---|
| 07/08/2026 | **Chantier A : option A1** (clé de test dédiée en secret Cloudflare + endpoint `/api/eval` protégé par jeton Bearer). Jeton transitant en conversation accepté car il ne protège que `/api/eval`, dépense bornée par le plafond de la clé, révocable en supprimant le secret. | Validé par RJ ; la clé Anthropic ne quitte jamais Cloudflare. |
| 07/08/2026 | `/api/eval` poussé (commit b41d6fc) : mort par défaut, mode `triage` = réplique exacte de la prod (Opus 4.8, max_tokens 700, ctx forçable), mode `patient` = simulateur sur Sonnet. | Plan validé par RJ avant tout code ; 17 tests locaux, routes de prod inchangées. |
| 07/08/2026 | `eval/vignettes.json` sera **versionné au repo**. | Choix RJ (reproductibilité, versionné avec la doctrine). |
| 07/08/2026 | Création de `docs/JOURNAL-DECISIONS.md` (ce fichier), relu à chaque session. | Demande RJ : mémoire cumulative des décisions et des REX, support de la logique à faire émerger. |
| 07/08/2026 | Grille G/U — principe des radiculalgies G1 (récentes, non documentées, supportables) : **jamais de renvoi sec au MT**. La sortie reste MT (pas de fausse urgence) mais la carte propose la filière : traitement d'épreuve, IRM organisée par le MT, **ou téléconsultation de débrouillage**, et annonce la consultation si persistance. | Doctrine double mission : ne pas perdre un candidat chirurgical futur ; rend proactive la mention « consultation possible » de la doctrine 2.7. Mécanisme d'implémentation à entériner (voir points ouverts). |

## 2. Points ouverts

1. **`radiculalgie_filiere` — mécanisme** : motif porté par la carte MT existante (modèle `tassement_mt` / `cancer_mt`), sans 8e niveau. Texte patient à valider mot à mot ensuite. → validation RJ en cours.
2. **Grille G/U v0.1** : (a) hyperalgie radiculaire sans imagerie — G3 ou exception nommée ; (b) cancer sans déficit — exception nommée `cancer_mt` assumée (G3 → mt) ; (c) G max strict vs additif ; (d) implantation côté worker avec règle « divergence → le plus urgent ».
3. **14 vignettes ambiguës** (dropdown Excel antérieur au niveau 5) : v9, 23, 30, 33, 50, 57, 70, 74, 75, 76, 81, 87, 91, 99 — propositions faites, arbitrage RJ attendu. Contrainte de cohérence : répartition doctrine 40 mt · 16 consult · 16 72h · 10 « 15 » · 8 24h · 6 suivi · 4 urgences.
4. **Secrets Cloudflare** `ANTHROPIC_EVAL_KEY` (plafond ~50 €) + `EVAL_TOKEN` : pose prévue par RJ le 07/08 au soir ; vérifier ensuite que `/api/eval` répond en prod avant tout lancement.
5. Modèle du simulateur patient : Sonnet par défaut (économie) — passer à Opus si RJ le souhaite.

## 3. Retours d'expérience (REX) — cas par cas

> Un bloc par cas divergent ou frontière. Alimenté par le banc des 100 vignettes,
> puis par les traces de vie réelle. Chaque REX arbitré devient une règle (prompt
> worker et/ou grille G/U) et remonte en section 1.

### REX-001 — Hyperalgie radiculaire sans imagerie : délai incohérent cervical/lombaire
- **Constat (07/08, lecture des annotations)** : v10 (NCB hyperalgique sans imagerie) annotée **72h** ; v34 (sciatique hyperalgique sans imagerie) annotée **24h**. Le prompt du worker code **24h** dans les deux cas (doctrine 2.7).
- **Enjeu** : le prompt est plus urgent que l'annotation v10 — sans danger, mais coûtera des points de concordance.
- **Arbitrage RJ** : en attente.

### REX-002 — Déficit apparu à distance d'un trauma
- **Constat (07/08)** : v62 annotée **72h** ; le prompt code **24h** (« déficit apparu après un geste ou à distance d'un trauma »).
- **Enjeu** : idem — prompt plus urgent que l'annotation, points de concordance en jeu.
- **Arbitrage RJ** : en attente.

---

*Dernière mise à jour : 7 août 2026 (session banc A1 + grille G/U).*
