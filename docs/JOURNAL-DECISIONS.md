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
| 07/08/2026 | **Chantier A : option A1** (clé de test dédiée en secret Cloudflare + endpoint `/api/eval` protégé par jeton Bearer). | Validé par RJ. |
| 07/08/2026 | `/api/eval` poussé (commit b41d6fc) : mort par défaut, mode `triage` = réplique exacte de la prod, mode `patient` = simulateur Sonnet. | Plan validé avant tout code ; 17 tests locaux, routes de prod inchangées. |
| 07/08/2026 | `eval/vignettes.json` versionné au repo — commit 494da36 (blob a027b59). 100 vignettes, verbatims, attendus, motifs, ctx figés (v12, v36). | Choix RJ (reproductibilité). |
| 07/08/2026 | Création de `docs/JOURNAL-DECISIONS.md`, relu à chaque session. | Demande RJ : mémoire cumulative. |
| 07/08/2026 | **Mécanisme `radiculalgie_filiere`** : radiculalgie récente supportable non explorée → mt, carte à motif dédié (traitement d'épreuve, IRM par MT ou TC de débrouillage, consultation annoncée si persistance). v9, v33. | Doctrine double mission. Texte patient à valider mot à mot. |
| 07/08/2026 | **Principe `filiere_possible`** : ancien et stable avec intervention possible → niveau mt/suivi maintenu, carte mentionnant la consultation sans urgence. | Formulation RJ. |
| 07/08/2026 | **Arbitrage des 14 vignettes ambiguës** (détail dans eval/vignettes.json) : v9, v33, v30, v87, v23, v50, v57, v99, v74, v76, v70, v75, v81, v91. | Arbitrages RJ en séance (matin). |
| 07/08/2026 | **Règle « craquement »** : craquement ressenti lors d'une douleur brutale évoque une fracture, fait monter d'un cran ; âge avancé renforce (v99 vs v30). | Arbitrage RJ. |
| 07/08/2026 | **Bascule du banc en mode direct API** (clé d'évaluation communiquée par RJ, risque accepté : plafond + révocation en fin de campagne). `/api/eval` dormant, infrastructure durable. **Clé à révoquer en fin de campagne.** | Décision RJ ; exactitude préservée (prompt extrait du blob e094e29, ctx neutre mardi 15 h). |
| 07/08/2026 | **PASSE n°1 DU BANC : concordance 82/100** (réf. manuelle : 62 %). Coût 5,05 $, 3,0 tours moyens, 0 sortie manquante. **Aucun manqué critique** (15 : 10/10, urgences vitales toutes captées ; seul écart grave = SUR-triage v60). Faiblesses : 72h (6/13), suivi (0/2). 18 écarts : 8 prédits, 5 sur-triages nouveaux, 5 sous-triages nouveaux. | Protocole validé sur v1+v99 avant lancement, lots de 10. |
| 07/08/2026 | **Règle « brachialgies bilatérales »** (v15, trou de doctrine) : douleurs des deux bras (± fourmillements bilatéraux), récentes ou aggravées, sans déficit → **72h** ; signes myélopathiques → cluster myélopathie. | Validé RJ après découverte au banc. |
| 07/08/2026 | **Règle CANCER refondue — « modificateur, pas un niveau » — 4 lignes** : (1) en cours de traitement → MT + oncologue sans délai, l'équipe onco pilote (v43) ; (2) **drapeau rouge** : douleur nocturne insomniante malgré les médicaments + cancer < 5 ans → **mt** avec carte « oncologue ou MT pour IRM RAPIDE, dans les jours qui viennent », sans faux réconfort (v74, carte durcie) ; (3) radiculalgie aggravée chez cancer terminé → tableau mécanique d'abord → **72h** (v17) ; (4) douleur modérée supportable (y c. cervicalgie axiale — tassement cervical rarissime) → mt, IRM à prévoir, oncologue prévenu. | Arbitrages RJ : « le tableau clinique commande » ; « en cours de traitement, c'est prioritaire » ; « cancer + dorso-lombalgie = penser tassement pathologique, très rare au cervical » ; drapeau rouge = circuit MÉDICAL rapide, pas chirurgical. |
| 07/08/2026 | **Filet transversal cancer** : tout patient avec antécédent de cancer, quel que soit le niveau, reçoit la consigne de solliciter un rendez-vous rapide si la situation se dégrade. | « Toujours toujours rester très prudent » — RJ. |
| 07/08/2026 (ap.-midi) | **REX-005 ARBITRÉ — Règle radiculalgie sans déficit (verbatim validé RJ)** : « en amélioration → mt, quelle que soit la durée. Récente (moins d'environ 4 semaines), supportable → mt, traitement d'épreuve, avec la mention filière. Au-delà d'environ 4 à 6 semaines, stable ou s'aggravant malgré le traitement → consult motif candidat (2 à 4 semaines, IRM organisée avant si non faite). Hyperalgique ou déficitaire → clusters d'urgence habituels. » v19 et v44 confirmées consult. | « NCB stable ou s'aggravant = consultation chir non urgente » — la trajectoire commande, pas l'efficacité du traitement. Seuil cohérent avec le commentaire grossesse (> 1 mois). |
| 07/08/2026 (ap.-midi) | **REX-006 ARBITRÉ — Claudication : la TYPICITÉ commande** : typique (périmètre chiffrable, arrêts obligés, soulagement penché/assis — signe du caddie) → **consult** candidat (10-15 j si périmètre se réduit, 2-4 sem si stable), IRM organisée avant ; atypique/vague (« jambes lourdes » sans périmètre net) → **mt**, bilan d'abord (peut être veineux, artériel, autre), consultation mentionnée possible. L'IA doit rechercher les 3 marqueurs de typicité avant de conclure. v63 consult ✓, v66 mt ✓. | « Si la claudication est typique, ça sera chirurgical à terme. Jambes qui fatiguent sans plus, ça peut tout être — d'où imagerie » — RJ. |
| 07/08/2026 (ap.-midi) | **REX-001 + 002 ARBITRÉS ENSEMBLE — harmonisation à 48-72 h (option A, tous membres)** : hyperalgie radiculaire résistante sans imagerie → **72h** (IRM en urgence dans le délai) ; **toute parésie partielle récente** (membre sup ou inf, avec ou sans geste/trauma récent) → **72h**. Garde-fous intacts : paralysie complète brutale → 15/jour-même ; sphincters → 15. Révisions : v11, v34, v35, v47, v49, v82 → 72h. | « Sous 48 à 72 h — on ne va pas se mentir, difficile de trouver un RDV dans les 24 h, je ne veux pas créer de frustration. 48 h est un bon équilibre » — l'orientation ne promet que ce que la filière tient. Les incohérences internes des annotations de juillet (v10 vs v34, v11 vs v20) relevaient de la variabilité d'annotation. |
| 07/08/2026 (ap.-midi) | **REX-007 ARBITRÉ — tassement documenté hyperalgique → 72h** (option A). Révision : v52 → 72h. Le niveau « 24h » ne conserve que la paralysie du jour hors créneau (v36). | Même logique de réalisme ; plus aucun délai intenable promis. |
| 07/08/2026 (ap.-midi) | **REX-003 ARBITRÉ — définition à trois étages** : **mt** = dégénératif banal sans lésion structurale identifiée (arthrose v4, jamais exploré v73), ± rhumato, mention filiere_possible ; **suivi** = lésion structurale documentée stable sans déficit (spondylolisthésis v68, discopathie évoluée v69, **scoliose v75**) → « patients qu'il ne faut pas refuser mais sans aucune urgence — au-delà d'un mois sans problème », carte : MT prescrit le bilan d'abord, venir avec l'imagerie ; **consult** = aggravation ou candidature active (2-4 sem). **Frontière suivi→consult = l'ÉVOLUTIVITÉ** (scoliose stable v75 = suivi ; scoliose évolutive avec retentissement v76 = consult). Révision : v75 mt → suivi. | Définition RJ : « pas d'intérêt chirurgical en urgence, mais un avis peut être intéressant dans le cadre de leur parcours de suivi » ; « la scoliose stable peut aussi être dirigée vers le chirurgien sans aucune urgence — l'idéal : le MT prescrit le bilan ». |
| 07/08/2026 (ap.-midi) | **REX-004 ARBITRÉ — question de cinétique avant 15 vs urgences** : accident de la route < 24 h non évalué → l'IA demande la cinétique (vitesse, arrêt/mouvement, airbags, autres blessés) puis : haute énergie ou incertain → **15** ; choc manifestement modéré chez patient qui marche, sans déficit ni signe → **urgences sans délai**. Au moindre doute → 15. | Validé RJ ; précaution première, aiguillage fin réservé au tableau explicitement bénin. |
| 07/08/2026 (ap.-midi) | **REX-008 ARBITRÉ — verrou « installation progressive »** : les règles tassement et craquement n'existent que pour les douleurs d'installation BRUTALE (datables à un instant/geste). Installation progressive sur plusieurs jours, sans trauma, état fonctionnel conservé → règles habituelles **quel que soit l'âge** — l'âge seul ne majore jamais. Filet carte mt du sujet âgé : consulter vite le MT si intensification ou marche impossible. v84 mt ✓. | Validé RJ. |
| 07/08/2026 (ap.-midi) | **Référence v2 poussée** : `eval/vignettes-arbitrages-2.json` (commit 4168564, blob 0fd4ea9) — 8 révisions fusionnables sur vignettes.json. **Nouvelle répartition : 43 mt · 19 consult · 20 72h · 10 « 15 » · 4 urgences · 1 24h · 3 suivi.** | Traçabilité de l'évolution de la doctrine (fichier de révisions plutôt que réécriture). |

## 2. Points ouverts

1. **PATCH DE PROMPT à soumettre à RJ** (mot à mot, un seul patch) encodant : brachialgies bilatérales, cancer 4 lignes + filet transversal, radiculalgie (règle verbatim REX-005), claudication typique/atypique, parésie partielle + hyperalgie → 72h, tassement documenté → 72h, trois étages mt/suivi/consult + évolutivité, question cinétique trauma routier, verrou installation progressive, craquement (v99), consult pour tassements aggravés (v57) — puis **tests locaux, push, rejeu du banc** (au minimum les vignettes divergentes et révisées, idéalement les 100). Concordance projetée ≥ 92 %.
2. **Textes patients** à valider mot à mot : cartes `radiculalgie_filiere`, `filiere_possible`, drapeau rouge cancer (« oncologue ou MT pour IRM rapide »), carte suivi (« bienvenu, sans aucune urgence, MT prescrit le bilan, venir avec l'imagerie »), filets de sécurité (cancer, sujet âgé).
3. **Grille G/U v0.2** : transposer les règles du jour ; restent (a) hyperalgie sans imagerie dans la grille (cohérence avec le 72h décidé), (c) G max vs additif, (d) implantation worker.
4. **Validation multi-praticiens** (proposée par RJ le 07/08) : après calibration, faire annoter les 100 vignettes indépendamment par plusieurs praticiens (Drs Lamerain, Travert ± rhumato/MT), mesurer l'accord inter-juges (kappa), consensus sur les divergences → référence consolidée. Ossature d'une publication (aucun score patient-facing validé n'existe — cf. BIBLIOGRAPHIE-SCORE.md). |
5. **Clé d'évaluation à RÉVOQUER en fin de campagne** (console Anthropic → API Keys). `/api/eval` dormant pour usage futur.
6. **Piste « ostéophilie »** : non encodée, volontairement (« terrain glissant et risqué »). La nuance par type de cancer relève de l'oncologue et du MT.

## 3. Retours d'expérience (REX)

> REX-001 → REX-008 : **tous arbitrés le 07/08/2026** — décisions remontées en section 1. Prochains REX : issus du rejeu post-patch, puis des traces de vie réelle.

- REX-001 (hyperalgie sans imagerie) : **arbitré** → 72h partout.
- REX-002 (déficit à distance d'un trauma/geste) : **arbitré** → 72h (fusionné avec 001, option A).
- REX-003 (philosophie « suivi ») : **arbitré** → trois étages, frontière évolutivité.
- REX-004 (whiplash 15 vs urgences) : **arbitré** → question de cinétique.
- REX-005 (traitement peu efficace) : **arbitré** → règle trajectoire (verbatim en section 1).
- REX-006 (claudication non explorée) : **arbitré** → typicité.
- REX-007 (tassement documenté hyperalgique) : **arbitré** → 72h.
- REX-008 (pression de l'âge) : **arbitré** → verrou installation progressive.

---

*Dernière mise à jour : 7 août 2026, fin d'après-midi — tous les REX de la passe n°1 arbitrés ; prochaine étape : patch de prompt soumis à RJ puis rejeu.*
