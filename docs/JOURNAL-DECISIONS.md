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
| 07/08/2026 | **Bascule du banc en mode direct API** : RJ a communiqué la clé d'évaluation en conversation (risque accepté : plafond + révocation en fin de campagne) ; le banc tourne depuis la machine de session avec le prompt extrait du worker vérifié (blob e094e29). `/api/eval` reste en sommeil (404, secrets non posés) et sert d'infrastructure durable pour rejouer le banc plus tard. **La clé sera révoquée en fin de campagne.** | Décision RJ en séance ; exactitude préservée (même prompt, même Opus 4.8, mêmes 700 tokens, ctx neutre figé mardi 15 h hors v12/v36). |
| 07/08/2026 | **PASSE n°1 DU BANC EXÉCUTÉE — concordance 82/100** (réf. manuelle antérieure : 62 %). Coût 5,05 $ (~4,6 €), 3,0 tours moyens, 0 sortie manquante. **Sécurité : aucun manqué critique** — 15 : 10/10, 24h : 8/8, urgences vitales toutes captées ; le seul écart sur cas grave est un SUR-triage (v60 → 15). Faiblesses concentrées sur 72h (6/13) et suivi (0/2). 18 écarts : 8 prédits (REX-001 à 004, craquement v99, famille suivi), 5 sur-triages nouveaux (v20, v56, v57, v65, v84), 5 sous-triages nouveaux (v15, v17, v19, v44, v63). Dialogues complets conservés (eval_resultats_all.json, session). | Protocole validé par RJ sur 2 vignettes témoins (v1, v99) avant lancement, exécution par lots de 10. |
| 07/08/2026 | **Règle « brachialgies bilatérales » (issue v15, trou de doctrine)** : douleurs des DEUX bras (± fourmillements bilatéraux des mains), récentes ou aggravées, sans déficit → **« 72h »** (vigilance myélopathie / compression étagée) ; signes myélopathiques associés → cluster myélopathie. | Validé par RJ (« Ok pour la règle ») après découverte au banc : le prompt ne couvrait que la sciatique bilatérale, la v15 sortait en aigue_simple/mt. |
| 07/08/2026 | **Règle CANCER refondue — « le cancer est un modificateur, pas un niveau » — 4 lignes** : (1) cancer **en cours de traitement** → MT + oncologue sans délai (IRM), l'équipe d'oncologie en place pilote (v43 : mt) ; (2) **drapeau rouge** : douleur nocturne, insomniante MALGRÉ les médicaments + antécédent de cancer < 5 ans → niveau **mt** mais carte spécifique « **oncologue ou médecin traitant pour IRM RAPIDE, dans les jours qui viennent** », sans aucun faux réconfort (v74 : mt confirmé, carte durcie) ; (3) **radiculalgie aggravée** chez cancer terminé → tableau mécanique d'abord (hernie) → **72h** avec IRM ou TC de débrouillage (v17 : 72h confirmé) ; (4) douleur **modérée supportable** (y compris cervicalgie axiale — tassement cervical rarissime) → **mt**, IRM à prévoir, oncologue prévenu. | Arbitrages RJ successifs en séance : « c'est le tableau clinique qui commande, pas l'antécédent » (v17 = hernie probable, pas métastase) ; « cancer en cours de traitement, c'est prioritaire » (circuit onco pilote) ; « cancer + dorso-lombalgie peut évoquer un tassement pathologique — très rare au cervical » ; « axiale résistante aux médicaments → RDV rapide, modérée → MT » ; précision finale : le RDV rapide du drapeau rouge est **médical** (oncologue/MT pour IRM), PAS la consultation chirurgicale. |
| 07/08/2026 | **Filet de sécurité transversal cancer** : TOUT patient avec antécédent de cancer, quel que soit son niveau de sortie, reçoit la consigne explicite de **solliciter un rendez-vous rapide si la situation se dégrade** (aggravation, douleur nocturne, fièvre, perte de force). À intégrer dans toutes les cartes concernées. | Demande explicite RJ : « si cancer il faut toujours toujours rester très prudent ». |

## 2. Points ouverts

1. **Textes patients** des cartes `radiculalgie_filiere`, `filiere_possible` et de la carte « drapeau rouge cancer » (règle 2 ci-dessus) : à rédiger et valider **mot à mot** avec RJ avant tout push worker.
2. **Arbitrages restants de la passe n°1** (une question à la fois, dans l'ordre) : (a) v19/v44 — frontière « traitement peu/partiellement efficace » : quand déclencher `candidat`/consult vs mt ; (b) v63 — canal étroit non exploré : mt (prompt) vs consult (annotation) ; (c) REX-001 (v10/v20 : hyperalgie et déficit très récents cervicaux — 24h prompt vs 72h annoté) ; (d) REX-002 (v62) et v65 (déficit à distance/ancien avec chutes : 24h vs 72h) ; (e) v56 (tassement documenté hyperalgique : 24h prompt vs 72h annoté) ; (f) REX-003 (philosophie « suivi » : v4, v68, v69, v75) ; (g) REX-004 (v60 whiplash : question cinétique 15 vs urgences) ; (h) v84 (89 ans progressif sur-trié 72h) ; (i) v57 et v99 (arbitrés, encodage craquement/consult). Puis UN SEUL patch de prompt et rejeu.
3. **Grille G/U v0.2** — restent à arbitrer : (a) hyperalgie radiculaire sans imagerie — G3 ou exception nommée ; (b) cancer sans déficit — réglé par la règle cancer 4 lignes (à transposer dans la grille) ; (c) G max strict vs additif ; (d) implantation côté worker avec règle « divergence → le plus urgent ».
4. **Piste « ostéophilie »** : reste une piste NON encodée — la règle cancer 4 lignes s'en passe volontairement (« terrain glissant et risqué » — RJ). La nuance par type de cancer relève de l'oncologue et du MT, pas du triage. Ne pas laisser l'IA improviser.
5. **Clé d'évaluation à RÉVOQUER en fin de campagne** (console Anthropic → API Keys). Les secrets Cloudflare (`ANTHROPIC_EVAL_KEY`/`EVAL_TOKEN`) ne sont plus nécessaires pour cette campagne ; `/api/eval` reste dormant pour un usage futur.
6. Modèle du simulateur patient : Sonnet par défaut — validé de fait (comportement parfait sur 100 vignettes : réponses courtes, neutres, aucun signe inventé).

## 3. Retours d'expérience (REX) — cas par cas

> Un bloc par cas divergent ou frontière. Chaque REX arbitré devient une règle
> (prompt worker et/ou grille G/U) et remonte en section 1.

### REX-001 — Hyperalgie radiculaire sans imagerie : délai incohérent cervical/lombaire
- **Constat** : v10 annotée **72h** ; v34 annotée **24h**. Le prompt code **24h** partout. **Confirmé au banc** : v10 sortie 24h (écart), v34 concordante. S'y rattache v20 (déficit + hyperalgie < 48 h : annotée 72h, sortie 24h/force).
- **Arbitrage RJ** : en attente.

### REX-002 — Déficit apparu à distance d'un trauma
- **Constat** : v62 annotée **72h** ; prompt **24h**. **Confirmé au banc** (sortie 24h/force). S'y rattache v65 (déficit ancien 15 j MAIS deux chutes : l'IA a lu « aggravation rapide » → 24h ; annoté 72h).
- **Arbitrage RJ** : en attente.

### REX-003 — « Stable ancien → suivi » du prompt vs arbitrages mt
- **Constat** : **confirmé au banc dans les deux sens** — v4 et v75 sortis « suivi » (attendu mt), v68 et v69 sortis « mt/conseils » (attendu suivi). La règle « suivi » du prompt ne correspond pas à la philosophie RJ (suivi = trajectoire existante) ET ne se déclenche pas sur les bons cas.
- **Arbitrage RJ** : en attente — reformulation complète de la règle « suivi » nécessaire.

### REX-004 — Whiplash à l'arrêt : « urgences » annoté vs court-circuit « 15 »
- **Constat** : **confirmé au banc** — v60 sortie 15/trauma_urgences (attendu urgences).
- **Arbitrage RJ** : en attente — candidate : question de l'IA sur la cinétique avant de trancher 15 vs urgences.

### REX-005 — Frontière « traitement peu efficace » (nouveau, banc passe 1)
- **Constat** : v19 (NCB 1 mois, arthrose, « traitement peu efficace ») et v44 (sciatique 5 sem documentée scanner, « partiellement efficace ») sorties **mt/aigue_simple** ; attendus **consult**. Le prompt exige « résistante à un traitement BIEN CONDUIT » pour `candidat` — critère trop strict face à ces libellés intermédiaires.
- **Arbitrage RJ** : en attente (premier de la file).

### REX-006 — Canal lombaire étroit non exploré (nouveau, banc passe 1)
- **Constat** : v63 (claudication depuis des mois, aggravation modérée, aucune imagerie) sortie **mt/conseils** ; annotation **consult 10-15 j** — mais le prompt code explicitement « canal non exploré → mt (imagerie d'abord) » et le commentaire RJ de juillet ouvrait aussi la voie MT. Conflit annotation/prompt à trancher.
- **Arbitrage RJ** : en attente.

### REX-007 — Tassement documenté hyperalgique : 24h vs 72h (nouveau, banc passe 1)
- **Constat** : v56 (fracture L1 vue au scanner, corset, douleur mal calmée) sortie **24h/tassement** conformément au prompt (« tassement documenté hyperalgique → 24h ») ; annotation **72h**. Sur-triage d'un cran.
- **Arbitrage RJ** : en attente.

### REX-008 — Pression de l'âge sur la règle tassement (nouveau, banc passe 1)
- **Constat** : v84 (89 ans, douleur depuis 5 jours d'installation PROGRESSIVE, marche comme d'habitude) sortie **72h/tassement** ; attendu **mt**. La règle tassement exige un début brutal ; le grand âge a fait pression sur le modèle. Sur-triage sans danger mais bruit.
- **Arbitrage RJ** : en attente (renforcement possible : « installation progressive → règles habituelles, quel que soit l'âge »).

---

*Dernière mise à jour : 7 août 2026 (passe n°1 du banc : 82/100 ; règles brachialgies bilatérales + cancer 4 lignes + filet transversal cancer entérinées).*
