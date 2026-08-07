# Urgence'Rachis — Hiérarchisation des patients

> **Document de référence de la doctrine d'orientation** — version lisible, maintenue à chaque
> évolution validée par le Dr Jameson. Le prompt du worker (src/worker.js) est la traduction
> machine de ce document ; en cas de divergence, ce document fait foi et le prompt doit être corrigé.
> Version du 7 août 2026 (post-arbitrages du banc de concordance, concordance mesurée : 93/100).

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
stabilité et ancienneté → consult ; aggravation récente → 72h.

---

## 2. Les urgences absolues → « 15 »

- **Queue de cheval** : troubles urinaires, anesthésie du siège/périnée, sciatique bilatérale avec déficit.
- **Infection** : fièvre ou frissons + douleur rachidienne (une exception : opéré du rachis < 3 mois → urgences + prévenir le chirurgien).
- **Paralysie complète et brutale** d'un membre (sauf lundi-jeudi avant 10 h → rendez-vous le jour même, « 24h »).
- **Traumatisme à haute énergie < 24 h** non évalué — ou cinétique incertaine.
- **Suspicion extra-rachidienne grave** : douleur du bras gauche à l'effort ou oppression thoracique (coronaire) ; douleur brutale + anévrisme connu.

## 3. Les urgences sans SAMU → « urgences »

- Fièvre chez un opéré du rachis < 3 mois (motif fievre_postop, prévenir le chirurgien).
- Traumatisme routier < 24 h à cinétique manifestement modérée (percuté à l'arrêt, très basse vitesse), patient qui marche, aucun signe — après question systématique sur la cinétique. Au moindre doute → 15.
- Douleur en ceinture + amaigrissement (suspicion pancréatique).

## 4. La filière chirurgicale rapide → « 72h » (48-72 h, IRM en urgence)

- **Toute parésie** (perte de force partielle) récente ou évolutive — bras ou jambe, y compris après infiltration, geste, ou à distance d'un traumatisme.
- **Radiculalgie hyperalgique résistante** (avec ou sans imagerie — sans imagerie, l'IRM est LA priorité du délai).
- **Sciatique bilatérale** isolée · **brachialgies bilatérales** récentes ou aggravées (vigilance myélopathie).
- **Tassement vertébral** : terrain ostéoporotique + douleur brutale ou inhabituelle ; tassement documenté avec douleur mal contrôlée.
- **Trauma non bilanté** > 24 h.
- **Myélopathie documentée** à l'IRM avec souffrance médullaire.
- **Radiculalgie aggravée chez un patient dont le cancer est terminé** (tableau mécanique d'abord, oncologue prévenu).
- Cancer + déficit moteur.

## 5. La consultation programmée → « consult » (2-4 semaines)

- **Radiculalgie sans déficit, au-delà de 4-6 semaines, stable ou s'aggravant** malgré le traitement (motif candidat ; IRM avant si non faite).
- **Claudication neurogène TYPIQUE** (périmètre chiffrable, arrêts obligés, soulagement penché/assis) — 10-15 jours si le périmètre se réduit.
- **Myélopathie d'évolution lente** (mois) ou Lhermitte isolé stable.
- **Douleur axiale chronique résistante** à un traitement complet bien conduit (y compris Modic).
- **Craquement ressenti** lors d'une douleur brutale du sujet de 60 ans et plus (consultation + IRM dans la semaine).
- **Toute lésion structurale ÉVOLUTIVE** : scoliose qui s'aggrave avec retentissement, tassements multiples qui se modifient.

## 6. Le médecin traitant d'abord → « mt »

- **Douleur axiale isolée**, même hyperalgique, sans signe d'alarme — l'intensité seule n'ouvre JAMAIS la filière chirurgicale. Insomniante → insister sur une voie médicale rapide, sans faux réconfort.
- **Radiculalgie récente** (< 4 semaines) supportable → traitement d'épreuve AVEC mention filière (motif radiculalgie_filiere : IRM organisable par le MT ou une téléconsultation, consultation annoncée si persistance). En amélioration → mt quelle que soit la durée.
- **Claudication atypique ou vague** (« jambes lourdes » sans périmètre net) : bilan d'abord — peut être veineux, artériel, autre.
- **Tassement possible du sujet de 60 ans et plus sans terrain** (douleur brutale, sans craquement) → radiographie ± IRM via le MT (motif tassement_mt).
- **Cancer** (voir règles transversales, section 8).
- Trauma déjà bilanté avec imagerie NORMALE · post-opératoire sans fièvre ni déficit · grossesse en première intention · coccyx (toujours, jamais la filière) · suspicion de hanche (radio de hanche d'abord) · demande de conseils (sans dévaloriser).

## 7. Le parcours de suivi → « suivi »

**Définition** : lésion structurale DOCUMENTÉE (spondylolisthésis, discopathie évoluée, scoliose), STABLE, sans déficit.
Ces patients n'ont aucun intérêt chirurgical en urgence, mais un avis chirurgical peut être intéressant dans leur parcours.
**Ils ne sont jamais refusés — et jamais pressés** : consultation possible au-delà d'un mois sans problème,
idéalement après que le médecin traitant a prescrit le bilan, en venant avec l'imagerie (CD ou codes d'accès).

La frontière avec « consult » est l'**ÉVOLUTIVITÉ** ; la frontière avec « mt » est l'existence d'une **lésion documentée**.

## 8. Règles transversales

**Cancer = modificateur, pas un niveau** — le tableau rachidien commande :
1. En cours de traitement → l'équipe d'oncologie pilote (MT + oncologue sans délai, IRM).
2. Drapeau rouge : douleur nocturne insomniante malgré les médicaments + cancer < 5 ans → circuit MÉDICAL ultra-rapide (oncologue ou MT pour IRM dans les jours qui viennent) — pas la consultation chirurgicale.
3. Radiculalgie aggravée, cancer terminé → 72h (hernie probable).
4. Douleur modérée → MT + IRM + oncologue. Cervicalgie axiale : tassement cervical rarissime.
Mélanome → toujours le circuit oncologique. Dorso-lombalgie + cancer → penser tassement pathologique → IRM rapide systématique.
**Filet de sécurité** : tout patient cancéreux reçoit la consigne de solliciter un rendez-vous rapide si dégradation.

**Fractures : le début BRUTAL commande** — les règles tassement/craquement exigent une douleur datable à un instant précis. Installation progressive → règles habituelles, QUEL QUE SOIT L'ÂGE : l'âge seul ne majore jamais.

**Trajectoire avant intensité** : amélioration → désescalade ; stabilité → programmé ; aggravation → accélération. L'intensité seule n'ouvre jamais la filière chirurgicale (sauf radiculalgie hyperalgique → 72h).

**Jamais de renvoi sec** : tout patient candidat futur (radiculalgie récente, lésion structurale) part avec une porte d'entrée vers la filière (mention filière, circuit IRM-MT ou téléconsultation de débrouillage).

---

## 9. Historique des versions

| Date | Évolution |
|---|---|
| Juillet 2026 | Doctrine initiale (annotation des 100 vignettes). |
| 06/08/2026 | DOCTRINE-TRIAGE.md v1 (7 niveaux, clusters IFOMPT). |
| 07/08/2026 | Arbitrage complet du banc de concordance (REX-001 à 008) : réalisme des délais (fin du 24h générique), règle cancer 4 lignes, trajectoire des radiculalgies, typicité de la claudication, définition à trois étages mt/suivi/consult, cinétique des traumatismes, verrou « installation progressive », craquement. Concordance : 62 % → 93 %. |
