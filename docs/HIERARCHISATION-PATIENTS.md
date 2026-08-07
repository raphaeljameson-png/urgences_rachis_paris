# Urgence'Rachis — Hiérarchisation des patients

> **Document de référence de la doctrine d'orientation** — version lisible, maintenue à chaque
> évolution validée par le Dr Jameson. Le prompt du worker (src/worker.js) est la traduction
> machine de ce document ; en cas de divergence, ce document fait foi et le prompt doit être corrigé.
> Version du 7 août 2026, soir (post micro-arbitrages ; concordance mesurée : 100/100 cumulé).

---

## 1. Les sept niveaux d'orientation

| Niveau | Signification | Délai promis au patient |
|---|---|---|
| **15** | Appel du 15 immédiat | Immédiat |
| **urgences** | Se rendre aux urgences | Sans délai, sans SAMU |
| **24h** | Avis chirurgical très rapide | 24-48 h |
| **72h** | Avis chirurgical rapide | 48-72 h / dans la semaine, avec IRM organisée en urgence |
| **consult** | Consultation programmée | 2 à 4 semaines (10-15 jours en bas de fourchette si évolutif) |
| **mt** | Médecin traitant d'abord | — (filière mentionnée si pertinent) |
| **suivi** | Parcours de suivi | Bienvenu, aucune urgence, au-delà d'un mois sans problème |

**Principe de réalisme** : l'orientation ne promet jamais un délai que la filière ne peut pas tenir.
Le niveau « 24h » est réservé à la paralysie brutale survenant un jour de consultation (lundi-jeudi avant 10 h).

**Principe d'hésitation** : entre deux niveaux d'urgence, toujours le plus urgent. Entre 72h et consult :
stabilité, ancienneté ou aggravation lente → consult ; aggravation rapide (échelle des jours) ou vraie hyperalgie → 72h.

---

## 2. Les urgences absolues → « 15 »

- **Queue de cheval** : troubles urinaires, anesthésie du siège/périnée, sciatique bilatérale avec déficit.
- **Infection** : fièvre ou frissons + douleur rachidienne (une exception : opéré du rachis < 3 mois → urgences + prévenir le chirurgien).
- **Paralysie complète et brutale** d'un membre (sauf lundi-jeudi avant 10 h → rendez-vous le jour même, « 24h »).
- **Traumatisme à haute énergie < 24 h** non évalué — ou cinétique incertaine.
- **Suspicion extra-rachidienne grave** : douleur du bras gauche à l'effort ou oppression thoracique (coronaire) ; **douleur thoracique brutale avec symptôme cardio-respiratoire associé** (essoufflement, oppression, malaise, sueurs) ; douleur brutale + anévrisme connu. Sur les tableaux vitaux, le sur-triage est assumé.

## 3. Les urgences sans SAMU → « urgences »

- Fièvre chez un opéré du rachis < 3 mois (motif fievre_postop, prévenir le chirurgien).
- Traumatisme routier < 24 h à cinétique manifestement modérée (percuté à l'arrêt, très basse vitesse), patient qui marche, aucun signe — après question systématique sur la cinétique. Au moindre doute → 15.
- Douleur en ceinture + amaigrissement (suspicion pancréatique), sans détresse.

## 4. La filière chirurgicale rapide → « 72h » (48-72 h, IRM en urgence)

- **Toute parésie** (perte de force partielle) récente ou évolutive — bras ou jambe, y compris après infiltration, geste, ou à distance d'un traumatisme.
- **Radiculalgie en VRAIE hyperalgie** — insupportable, insomniante, résistante aux antalgiques y compris forts (une douleur simplement intense qui s'aggrave lentement n'est PAS une hyperalgie) — ou en **aggravation RAPIDE sur quelques jours**.
- **Sciatique bilatérale** isolée · **brachialgies bilatérales** récentes ou aggravées (vigilance myélopathie).
- **Tassement vertébral** : terrain ostéoporotique + douleur brutale ou inhabituelle ; **fracture MONTRÉE à l'imagerie avec douleur mal contrôlée** — même corsetée, même dite « stable » (cette règle PRIME sur « déjà bilanté »).
- **Trauma non bilanté** > 24 h.
- **Myélopathie documentée** à l'IRM avec souffrance médullaire.
- **Radiculalgie aggravée — y compris nocturne ou insomniante — chez un patient dont le cancer est terminé** (tableau mécanique d'abord, oncologue prévenu). Cancer + déficit moteur.

## 5. La consultation programmée → « consult » (2-4 semaines ; 10-15 jours si évolutif)

- **Radiculalgie sans déficit, au-delà de 4-6 semaines, stable ou en aggravation LENTE** (échelle des semaines/mois) malgré le traitement — la vitesse est toujours demandée : « depuis quand précisément est-ce pire ? » (motif candidat ; IRM avant si non faite).
- **Exception à « amélioration → mt »** : imagerie récente (< 3 mois) montrant une hernie volumineuse ou une compression marquée concordante, surtout si le patient a été alarmé par le compte rendu → consultation ~15 jours pour premier bilan et éducation (« la clinique prime sur l'image » ; l'amélioration est une excellente nouvelle).
- **Claudication neurogène TYPIQUE AU SENS STRICT** : les TROIS marqueurs présents et FRANCS — périmètre nettement limité et chiffré, arrêts obligés systématiques, soulagement net penché/assis (10-15 jours si le périmètre se réduit).
- **Myélopathie d'évolution lente** (mois) ou Lhermitte isolé stable.
- **Douleur axiale chronique résistante** à un traitement complet bien conduit (y compris Modic).
- **Craquement ressenti** lors d'une douleur brutale du sujet de 60 ans et plus (consultation + IRM dans la semaine).
- **Toute lésion structurale ÉVOLUTIVE** : scoliose qui s'aggrave avec retentissement, tassements multiples qui se modifient.

## 6. Le médecin traitant d'abord → « mt »

- **Douleur axiale isolée**, même hyperalgique, sans signe d'alarme — l'intensité seule n'ouvre JAMAIS la filière chirurgicale. Insomniante → insister sur une voie médicale rapide, sans faux réconfort.
- **Radiculalgie récente** (< 4 semaines) supportable → traitement d'épreuve AVEC mention filière (motif radiculalgie_filiere). **En amélioration → mt quelle que soit la durée** (hors exception hernie volumineuse, section 5).
- **Claudication au tableau incomplet, vague ou bien compensé** (fatigue des jambes sans plus, un marqueur manquant, périmètre conservé de l'ordre du kilomètre) → **bilan d'abord** par le MT — examen et imagerie pour établir l'origine (rachidienne ? veineuse ? artérielle ?) — le patient restant candidat à une consultation, sans urgence. **Au moindre doute → mt avec bilan : ici le doute profite au bilan, pas à la filière.**
- **Tassement possible du sujet de 60 ans et plus sans terrain** (douleur brutale, sans craquement) → radiographie ± IRM via le MT (motif tassement_mt).
- **Cancer** (voir règles transversales, section 8).
- Trauma déjà bilanté avec imagerie NORMALE · post-opératoire sans fièvre ni déficit · grossesse en première intention · coccyx (toujours) · suspicion de hanche (radio d'abord) · demande de conseils (sans dévaloriser) · douleur ancienne **jamais explorée ou à imagerie normale**.

## 7. Le parcours de suivi → « suivi »

**Définition** : **anomalie structurale identifiée à l'imagerie** et cohérente avec la douleur — spondylolisthésis, **discopathie (un ou plusieurs étages, avec ou sans Modic)**, scoliose, sténose — douleur ancienne, STABLE, sans déficit.
Ces patients n'ont aucun intérêt chirurgical en urgence, mais un avis peut être intéressant dans leur parcours.
**Ils ne sont jamais refusés — et jamais pressés** : consultation possible au-delà d'un mois sans problème,
idéalement après que le médecin traitant a prescrit le bilan, en venant avec l'imagerie (CD ou codes d'accès).
La sévérité de l'image ne change pas le niveau — et **ces situations sont en pratique peu fréquemment chirurgicales** :
la consultation sert à faire le point (rééducation, infiltrations, hygiène rachidienne, rares indications), pas à promettre une intervention.

Frontière avec « consult » : l'**ÉVOLUTIVITÉ**. Frontière avec « mt » : l'existence d'une **anomalie documentée**.

## 8. Règles transversales

**Cancer = modificateur, pas un niveau** — le tableau rachidien commande :
1. En cours de traitement → l'équipe d'oncologie pilote (MT + oncologue sans délai, IRM).
2. Drapeau rouge — **douleurs AXIALES uniquement** : axiale nocturne insomniante malgré les médicaments + cancer < 5 ans → circuit MÉDICAL ultra-rapide (oncologue ou MT pour IRM dans les jours qui viennent). **Une douleur radiculaire nocturne/insomniante ne relève jamais du drapeau rouge : elle suit la branche radiculalgie (72h).**
3. Radiculalgie aggravée, cancer terminé → 72h (hernie probable).
4. Douleur modérée → MT + IRM + oncologue. Cervicalgie axiale : tassement cervical rarissime.
Mélanome → toujours le circuit oncologique. Dorso-lombalgie + cancer → penser tassement pathologique → IRM rapide systématique.
**Filet de sécurité** : tout patient cancéreux reçoit la consigne de solliciter un rendez-vous rapide si dégradation.

**Fractures : le début BRUTAL commande** — tassement/craquement exigent une douleur datable à un instant précis. Installation progressive → règles habituelles, QUEL QUE SOIT L'ÂGE. Et une fracture **vue** à l'imagerie prime toujours sur « déjà bilanté ».

**Trajectoire et VITESSE avant intensité** : amélioration → désescalade ; stabilité ou aggravation lente → programmé ; aggravation rapide → accélération. L'intensité seule n'ouvre jamais la filière chirurgicale (sauf vraie hyperalgie radiculaire → 72h).

**Jamais de renvoi sec** : tout candidat futur part avec une porte d'entrée vers la filière (mention filière, circuit IRM-MT ou téléconsultation de débrouillage).

**Le doute** : vers le haut sur les tableaux d'urgence ; **vers le bilan** sur les tableaux imprécis non urgents (claudication vague).

---

## 9. Historique des versions

| Date | Évolution |
|---|---|
| Juillet 2026 | Doctrine initiale (annotation des 100 vignettes). |
| 06/08/2026 | DOCTRINE-TRIAGE.md v1 (7 niveaux, clusters IFOMPT). |
| 07/08/2026 | Arbitrage complet du banc (REX-001 à 008) : réalisme des délais, règle cancer 4 lignes, trajectoire des radiculalgies, typicité de la claudication, trois étages mt/suivi/consult, cinétique des traumatismes, verrou « progressif », craquement. 62 % → 93 %. |
| 07/08/2026 soir | Correctif fracture documentée (v56) + 6 micro-arbitrages : drapeau rouge = axiale, vitesse d'aggravation, typicité stricte (doute → bilan), discopathie simple → suivi (« peu fréquemment chirurgical »), thoracique + cardio-respiratoire → 15, exception hernie volumineuse. **100/100 cumulé.** |
