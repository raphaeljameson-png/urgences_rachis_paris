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
| 07/08/2026 | `eval/vignettes.json` **versionné au repo** — poussé commit 494da36 (blob a027b59, intégrité vérifiée). Contient les 100 vignettes avec dossier structuré, verbatims Excel, attendu + source, motifs attendus, ctx figés (v12 vendredi 15 h → 15 ; v36 mardi 9 h → 24h). | Choix RJ (reproductibilité, versionné avec la doctrine). |
| 07/08/2026 | Création de `docs/JOURNAL-DECISIONS.md` (ce fichier), relu à chaque session. | Demande RJ : mémoire cumulative des décisions et des REX, support de la logique à faire émerger. |
| 07/08/2026 | **Mécanisme `radiculalgie_filiere` entériné** : radiculalgie récente, supportable, non explorée → niveau **mt**, mais la carte MT porte un motif dédié : traitement d'épreuve, IRM organisée par le MT, **ou téléconsultation de débrouillage**, + annonce de la consultation si persistance. Pas de 8e niveau. Concerne v9, v33 (v44 candidat). | Doctrine double mission : jamais de renvoi sec au MT pour un candidat chirurgical futur ; pas de fausse urgence pour autant. Texte patient exact à valider mot à mot (point ouvert). |
| 07/08/2026 | **Principe `filiere_possible` (généralisation)** : « si ancien et stable mais intervention possible, orienter aussi vers consultation chirurgicale sans urgence ». Le **niveau reste mt ou suivi** ; la carte ajoute la mention « consultation chirurgicale sans urgence également possible » avec le circuit IRM-MT ou téléconsultation. Concerne v68, v69 (suivi), v75, v81, v70, v4 (mt). | Formulation RJ du 07/08. Ne modifie pas les niveaux attendus du banc, uniquement le contenu des cartes. Motif générique de carte à créer, textes à valider mot à mot. |
| 07/08/2026 | **Arbitrage des 14 vignettes ambiguës** (une par une, méthode demandée par RJ) : v9 → mt `radiculalgie_filiere` · v33 → mt `radiculalgie_filiere` · v30 → mt `tassement_mt` (« pas d'urgence a priori : pas d'ostéoporose, pas de facteur de risque, récent ») · v87 → mt (radio de hanche d'abord) · v23 → consult 2-3 sem (Lhermitte isolé stable) · v50 → consult 2-3 sem · v57 → consult 10-15 j avec IRM récente à obtenir · v99 → consult + IRM dans la semaine via MT ou TC · v74 → mt `cancer_mt` + oncologue (mélanome = maladie généralisée, mauvais pronostic) · v76 → consult sans urgence · v70 → mt avec TC de débrouillage en alternative pour l'IRM · v75 → mt ± rhumato, mention filière · v81 → mt ou chirurgien initial, mention filière · v91 → consult ~15 j (éducation, la clinique prime sur l'image). | Arbitrages RJ en séance, justifications consignées dans les notes de `eval/vignettes.json`. |
| 07/08/2026 | **Règle discriminante « craquement »** : un CRAQUEMENT ressenti lors d'une douleur rachidienne brutale évoque une fracture et **fait monter d'un cran** l'orientation ; l'âge avancé renforce. Frontière posée : v99 (78 ans, brutal en éternuant, craquement → consult + IRM dans la semaine) vs v30 (73 ans, brutal sans craquement, sans facteur de risque → mt `tassement_mt`). | Arbitrage RJ 07/08. Candidat à l'encodage prompt + grille G/U après la mesure du banc. |
| 07/08/2026 | **Répartition de référence du banc confirmée : 44 mt · 19 consult · 13 72h · 10 « 15 » · 8 24h · 4 urgences · 2 suivi.** Remplace la répartition doctrine du 06/08 (40/16/16/10/8/6/4) — évolution assumée après arbitrage des 14 ambiguës. | Confirmation explicite RJ du 07/08 (« confirmé »). |

## 2. Points ouverts

1. **Textes patients** des cartes `radiculalgie_filiere` et `filiere_possible` : à rédiger et valider **mot à mot** avec RJ avant tout push worker.
2. **Grille G/U v0.2** — restent à arbitrer (une question à la fois) : (a) hyperalgie radiculaire sans imagerie — G3 ou exception nommée ; (b) cancer sans déficit — exception nommée `cancer_mt` assumée (G3 → mt) ; (c) G max strict vs additif ; (d) implantation côté worker avec règle « divergence → le plus urgent ».
3. **Piste « ostéophilie » (ouverte par RJ, à encadrer très prudemment)** : moduler l'orientation des lombalgies chez patient cancéreux selon le type de cancer / son tropisme osseux / son pronostic (ex. mélanome → filière onco ; sein → discussion chirurgicale plus fréquente). Aucune règle sans proposition écrite encadrée validée par RJ. Ne pas laisser l'IA improviser sur ce point.
4. **Secrets Cloudflare** `ANTHROPIC_EVAL_KEY` (plafond ~50 €) + `EVAL_TOKEN` : pose prévue par RJ le 07/08 au soir ; vérifier ensuite que `/api/eval` répond en prod avant tout lancement du banc.
5. Modèle du simulateur patient : Sonnet par défaut (économie) — passer à Opus si RJ le souhaite.
6. **Ne rien corriger au prompt avant la mesure du banc** : la première passe mesure le prompt tel quel (référence), les REX ci-dessous seront arbitrés ensuite.

## 3. Retours d'expérience (REX) — cas par cas

> Un bloc par cas divergent ou frontière. Alimenté par le banc des 100 vignettes,
> puis par les traces de vie réelle. Chaque REX arbitré devient une règle (prompt
> worker et/ou grille G/U) et remonte en section 1.

### REX-001 — Hyperalgie radiculaire sans imagerie : délai incohérent cervical/lombaire
- **Constat (07/08, lecture des annotations)** : v10 (NCB hyperalgique sans imagerie) annotée **72h** ; v34 (sciatique hyperalgique sans imagerie) annotée **24h**. Le prompt du worker code **24h** dans les deux cas (doctrine 2.7).
- **Enjeu** : le prompt est plus urgent que l'annotation v10 — sans danger, mais coûtera des points de concordance.
- **Arbitrage RJ** : en attente (après la mesure du banc).

### REX-002 — Déficit apparu à distance d'un trauma
- **Constat (07/08)** : v62 annotée **72h** ; le prompt code **24h** (« déficit apparu après un geste ou à distance d'un trauma »).
- **Enjeu** : idem — prompt plus urgent que l'annotation, points de concordance en jeu.
- **Arbitrage RJ** : en attente (après la mesure du banc).

### REX-003 — « Stable ancien → suivi » du prompt vs arbitrages mt
- **Constat (07/08)** : le prompt code « scoliose stable → suivi » et « douleur ancienne stable déjà explorée → suivi » ; les arbitrages RJ placent v75 (scoliose stable), v81 (cervicalgies post-arthrodèse à 5 ans) et v4 (cervicarthrose stable) en **mt** — le niveau suivi étant réservé aux patients déjà dans une trajectoire (v68 spondylolisthésis, v69 discopathie suivie).
- **Enjeu** : divergence de philosophie (suivi = trajectoire existante, pas simple chronicité). Coûtera de la concordance sur ces vignettes.
- **Arbitrage RJ** : en attente (après la mesure du banc) — probable reformulation de la règle « suivi » du prompt + mention `filiere_possible` sur les cartes mt concernées.

### REX-004 — Whiplash à l'arrêt : « urgences » annoté vs court-circuit « 15 »
- **Constat (07/08)** : v60 (coup du lapin, percutée à l'arrêt, < 24 h) annotée **urgences** ; le court-circuit du prompt « traumatisme haute énergie < 24 h non évalué → 15 » enverrait au **15**.
- **Enjeu** : la case cochée « accident de la route < 24 h » ne distingue pas l'énergie du choc ; RJ considère le whiplash à l'arrêt comme une énergie modérée relevant des urgences, pas du 15.
- **Arbitrage RJ** : en attente (après la mesure du banc) — candidate : question de l'IA sur la cinétique avant de trancher 15 vs urgences.

---

*Dernière mise à jour : 7 août 2026 (session banc A1 + grille G/U + arbitrage des 100 vignettes).*
