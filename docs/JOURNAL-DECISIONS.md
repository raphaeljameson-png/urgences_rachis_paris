# Urgence'Rachis — Journal des décisions

> Relu par Claude en début de chaque session, au même titre que MEMOIRE.md.
> Objet : consigner chaque arbitrage du Dr Jameson (daté, avec justification), les
> points ouverts, et les retours d'expérience cas par cas.
> Règle : aucune décision listée en section 1 sans validation explicite de RJ.
> Document compagnon : docs/HIERARCHISATION-PATIENTS.md (doctrine lisible, FAIT FOI).

---

## 1. Décisions entérinées

### Session du 07/08/2026 — matin (banc A1, référence, 14 ambiguës)

| Décision | Justification |
|---|---|
| Chantier A option A1 ; `/api/eval` poussé (b41d6fc), mort par défaut. | Validé RJ ; 17 tests, prod inchangée. |
| `eval/vignettes.json` versionné (494da36, blob a027b59). | Reproductibilité. |
| Création de ce journal. | Mémoire cumulative. |
| Mécanisme `radiculalgie_filiere` (mt + carte filière). Principe `filiere_possible`. | Doctrine double mission ; textes cartes à valider. |
| Arbitrage des 14 vignettes ambiguës (détail dans vignettes.json). | Séance du matin. |
| Règle « craquement » (v99 vs v30). | Fait monter d'un cran, âge renforçant. |

### Session du 07/08/2026 — après-midi (passe n°1 : 82/100, REX-001→008 arbitrés)

| Décision | Justification |
|---|---|
| Banc en mode direct API (clé communiquée par RJ, plafond + **révocation en fin de campagne**). `/api/eval` dormant. | Exactitude préservée (prompt extrait du blob vérifié). |
| **Passe n°1 : 82/100** (réf. manuelle : 62 %). Aucun manqué critique. 18 écarts analysés. | Protocole validé sur 2 témoins. |
| Règle **brachialgies bilatérales** → 72h (v15, trou de doctrine). | Validé RJ. |
| **Règle CANCER 4 lignes** (« modificateur, pas un niveau ») + **filet transversal** (tout cancéreux : consigne de re-consulter vite si dégradation). | « Le tableau clinique commande » ; « en cours de traitement = prioritaire » ; « dorso-lombalgie + cancer = penser tassement pathologique, rare au cervical » ; drapeau rouge = circuit MÉDICAL. |
| **REX-005** : radiculalgie sans déficit — amélioration → mt ; < 4 sem supportable → mt filière ; > 4-6 sem stable ou s'aggravant → consult candidat. | « La trajectoire commande. » |
| **REX-006** : claudication — la TYPICITÉ commande (3 marqueurs). | « Typique = chirurgical à terme ; vague = peut tout être. » |
| **REX-001+002** : parésie partielle récente (tous membres, y c. post-geste) + hyperalgie sans imagerie → **72h**. Révisions : v11, v34, v35, v47, v49, v82. | « 48h est un bon équilibre — je ne veux pas créer de frustration » : plus aucun délai intenable promis. |
| **REX-007** : tassement documenté hyperalgique → 72h (v52). « 24h » ne garde que la paralysie du jour. | Même réalisme. |
| **REX-003** : trois étages — mt (jamais exploré / imagerie normale) < suivi (lésion structurale documentée stable : « bienvenu, aucune urgence, > 1 mois, MT prescrit le bilan ») < consult (évolutivité). Scoliose stable → suivi (v75 révisée). Frontière suivi→consult = ÉVOLUTIVITÉ (v76). | Définitions RJ. |
| **REX-004** : trauma routier < 24 h → question de CINÉTIQUE ; haute énergie/incertain → 15 ; modéré à l'arrêt sans signe → urgences. | Précaution première. |
| **REX-008** : verrou « installation progressive » — tassement/craquement exigent un début BRUTAL ; l'âge seul ne majore jamais. | Validé RJ. |
| Référence v2 : `vignettes-arbitrages-2.json`. | Traçabilité par couches. |

### Session du 07/08/2026 — soir (patch, passe n°2 : 93→94→100 cumulé, 6 micro-arbitrages)

| Décision | Justification |
|---|---|
| **Patch de prompt validé mot à mot et poussé** (b60c57c) : les 11 règles encodées. Front vérifié : motif inconnu → carte générique (aucun risque d'affichage). | Validation RJ (« OK »). |
| **Passe n°2 : 93/100** (coût cumulé campagne ~12,7 $). Analyse des 7 écarts : eval/RESULTATS-PASSE-2.md. | Objectif ≥ 90 % atteint. |
| **Correctif v56 (seul sous-triage significatif)** : la fracture MONTRÉE à l'imagerie PRIME sur « déjà bilanté » — mal contrôlée → 72h ; bien contrôlée → mt. Poussé (08094a4), vérifié sur v56 + contre-épreuves v61/v94. **Score : 94/100.** | Validé RJ. |
| **docs/HIERARCHISATION-PATIENTS.md créé** : doctrine lisible, FAIT FOI sur le prompt. | Demande explicite RJ. |
| **Micro-arbitrage v17** : le drapeau rouge cancer ne s'applique qu'aux douleurs AXIALES ; une douleur RADICULAIRE nocturne/insomniante suit la branche radiculalgie (72h). | Validé RJ. |
| **Micro-arbitrage v41** : radiculalgie > 4-6 sem — aggravation LENTE (semaines/mois) → consult 10-15 j ; seuls montent en 72h l'aggravation RAPIDE (jours) ou la VRAIE hyperalgie (insupportable, insomniante, résistante aux antalgiques forts). L'IA demande toujours « depuis quand précisément est-ce pire ? ». | Validé RJ. |
| **Micro-arbitrage v66** : claudication — typicité AU SENS STRICT (3 marqueurs FRANCS, périmètre chiffré) → consult ; tableau incomplet/vague/bien compensé → mt avec BILAN (origine rachidienne ? veineuse ? artérielle ?), patient restant candidat sans urgence. **Au moindre doute → mt avec bilan : le doute profite au bilan, pas à la filière.** | « Pas assez précis — il faut des examens pour être sûr que cela vient du dos. » |
| **Micro-arbitrage v69** : TOUTE anomalie structurale identifiée à l'imagerie (discopathie simple incluse, un ou plusieurs étages) + douleur ancienne stable → suivi — en précisant que ces situations sont PEU FRÉQUEMMENT chirurgicales (la consultation fait le point, ne promet rien). mt = jamais exploré ou imagerie normale. | « Oui mais non urgent car en pratique peu fréquemment chirurgical. » |
| **Micro-arbitrage v86 (option A)** : douleur thoracique brutale + symptôme cardio-respiratoire (dyspnée, oppression, malaise, sueurs) → **15**. Révision de référence v86 : urgences → 15. Répartition finale : **43 mt · 19 consult · 20 72h · 11 « 15 » · 3 urgences · 1 24h · 3 suivi**. | Sur-triage assumé sur les tableaux vitaux. |
| **Micro-arbitrage v91** : exception à « amélioration → mt » — imagerie récente (< 3 mois) avec hernie volumineuse/compression marquée concordante, patient alarmé par le compte rendu → consult ~15 j (premier bilan, éducation : « la clinique prime sur l'image »). | Validé RJ. |
| **Patch final poussé (18bd1a7, blob 518b5a7 vérifié)** : les 5 raffinements + ligne cardio-respiratoire. Rejeu des 6 vignettes arbitrées + 9 contre-épreuves : **11/11 puis 4/4 concordants — cumul 100/100**. | Les 89 autres vignettes ont été mesurées sur la version précédente du prompt (identique hors blocs raffinés) ; une passe complète de confirmation (~6 €) reste disponible si souhaitée. |
| **Idée validation multi-praticiens** (RJ) : après calibration, annotation indépendante des 100 vignettes par plusieurs praticiens, kappa, consensus → référence consolidée, ossature de publication. | Point ouvert n°4. |

### Séance du soir (suite) — chantier UX et niveau de langue

| Décision | Justification / verbatim RJ |
|---|---|
| **Règle « NIVEAU COLLÉGIEN » ajoutée au prompt** (18d0732, blob 916b7b2 vérifié) : questions IA compréhensibles par un collégien — phrases courtes, mots du quotidien, termes médicaux traduits immédiatement (parésie → perte de force, claudication → besoin de s'arrêter en marchant…), jamais plus de 4 options par question. Portée : questions IA uniquement ; la synthèse chirurgien reste médicale. | Validé RJ (« 1 ok »). |
| **Écran des signes découpé en 2 écrans de 5 points max** (82622ec, blob 1e2201a) : écran A = 4 signes urgents (sphincter, fièvre, paralysie, force) + « Aucun », avec **court-circuit immédiat** si sphincter/fièvre/paralysie coché (le patient queue de cheval ne voit jamais l'écran B) ; écran B = terrain (cervical : myélo, trauma, cancer, douleurMax ; lombaire : trauma, cancer, ostéo, douleurMax) + « Aucun ». Maquette montrée et validée avant implémentation. Cases tactiles agrandies (padding 13px, police .94rem). Valeurs de signes inchangées → aucun impact worker/PDF. Retour arrière opérationnel sur les deux écrans. | Règle RJ : « jamais plus de 5 points quand on propose des choix ». Maquette validée (« OK »). |
| **Rejeu de contrôle post-collégien : 12/12 concordants** (v9, v12, v17, v22, v34, v41, v56, v63, v66, v69, v86, v91 — multi-clusters), cumul **100/100** maintenu. La règle de langue ne dégrade pas l'orientation. Coût 0,88 $. | Vérification promise avant de considérer le chantier clos. |
| Note de fidélité : lors du push du front, deux espaces insécables (U+00A0) dans « 15 Mo » (note pièces jointes, message d'erreur de taille) sont devenues des espaces normales. Aucun mot changé, aucun impact ; à rétablir au prochain push du front si souhaité. | Transparence. |

### Séance du 08/08/2026 (matin) — versionnage et conclusion d'imagerie

**Versionnage du site** (commit 625dabd) : format « v0.9 · date » validé (v1.0 à la validation multi-praticiens). Affiché à trois endroits : badge du pied de page, sous-titre du chat, ligne « Généré le… » du rapport PDF. Constantes uniques VERSION / VERSION_DATE dans le script du front.

**Conclusion d'imagerie rapportée par le patient** (commits 35cbaaf worker + f3d77b9 front) : après « imagerie < 3 mois : Oui », question facultative « recopier la conclusion du radiologue » (champ libre + « Passer cette étape »). Décisions validées par RJ :
- Champ libre OUI — chaînon manquant des exceptions v91 (hernie volumineuse + amélioration → consult) et v69 (anomalie ancienne stable → suivi).
- Photo du compte rendu NON — l'en-tête contiendrait le nom du patient, contradictoire avec la promesse « aucune donnée nominative » ; le canal photo légitime reste les pièces jointes du formulaire d'envoi (lues par le secrétariat, pas par l'IA). À réévaluer si les patients ne recopient pas.
- Statut : SIGNAL FAIBLE (dixit RJ : « c'est juste pour orienter avec une faible valeur »). Règle de prompt : peut orienter les questions, ne commande jamais un niveau à elle seule, la clinique prime, ignorée si incohérente.
- Transmis au dossier IA (conclusion_imagerie) et repris dans le PDF (ligne dédiée, déclaratif).

**Rejeu de contrôle** : 2 sondes ad hoc (probe_conclusion.mjs) — P1 sciatique en amélioration + conclusion « volumineuse hernie L5-S1 » → consult/candidat (exception activée par le champ, comme voulu) ; P2 lombalgie axiale banale + conclusion anxiogène « discopathie étagée, Modic » → mt/aigue_simple (aucune escalade sur la seule foi du compte rendu). Non-régression v12, v41, v69, v91 : 4/4. **Cumul : 100/100 maintenu.** Coût ~0,55 $.

**Limitation du canal de push (à retenir)** : le connecteur GitHub convertit les espaces insécables (U+00A0) en espaces normales à l'émission — constaté deux fois sur « 15 Mo ». Impact purement typographique. Consigne : tout futur push encode les insécables en `&nbsp;` (HTML) ou `\u00a0` (JS), jamais en caractère brut.

**Version en ligne** : v0.9 · 08/08/2026 — worker blob 958f4bc, front blob e3033bf, vérifiés servis en prod.

## 2. Points ouverts

1. **Textes patients à valider mot à mot** : cartes `radiculalgie_filiere`, `filiere_possible`, cancer durcie (« oncologue ou MT pour IRM rapide » + filet transversal), suivi (« bienvenu, sans urgence, peu fréquemment chirurgical, MT prescrit le bilan »), filet sujet âgé.
2. **Passe complète de confirmation** du prompt final (~6 €, optionnelle) — le cumul 100/100 mélange deux versions très proches du prompt.
3. **Grille G/U v0.2** : transposer les règles ; restent (a) place de l'hyperalgie dans la grille, (c) G max vs additif, (d) implantation worker. Question annexe non arbitrée : myélopathie « aggravation rapide → 24h » (seule règle 24h restante avec la paralysie — cohérence réalisme à discuter).
4. **Validation multi-praticiens** (Lamerain, Travert ± rhumato/MT) puis publication.
5. **CLÉ D'ÉVALUATION À RÉVOQUER** (console Anthropic → API Keys) — campagne terminée.
6. Piste « ostéophilie » : non encodée, volontairement.
7. Pendants MEMOIRE.md : renouvellement ANTHROPIC_API_KEY avant le 24/08, test mobile complet, achat urgence-rachis.fr, PDF arbres décisionnels, migration Opus 5 après calibration seulement.

## 3. REX

REX-001 à 008 : **tous arbitrés et encodés le 07/08/2026** (voir section 1). Score final : 62 % → 82 % → 94 % → 100/100 cumulé après micro-arbitrages. Prochains REX : passe de confirmation éventuelle, puis traces de vie réelle.

---

*Dernière mise à jour : 8 août 2026, matin — v0.9 datée en prod, champ « conclusion du radiologue » en signal faible (sondes concordantes), cumul 100/100 maintenu.*
