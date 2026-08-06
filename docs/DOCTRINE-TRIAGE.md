# Urgence'Rachis — Doctrine de triage (référence)

*Extraite de l'annotation complète des 100 vignettes de calibration par le Dr Raphaël Jameson (juillet 2026 — 92 cas via Excel, 8 cas complétés en séance). Concordance initiale de l'IA : 57/92. Ce document est la source de vérité pour le prompt du worker et le futur score G×U. Toute modification du comportement du site doit s'y conformer.*

---

## 0. Double mission de l'algorithme

1. **Sécurité** : détecter et orienter sans délai les vraies urgences (queue de cheval, infection, trauma à haute énergie, déficit récent, suspicion extra-rachidienne grave).
2. **Recrutement** : capter les patients candidats à une chirurgie **immédiate ou future**, et les garder dans la patientèle — y compris ceux relevant d'un correspondant (chirurgien de hanche, rhumatologue…), car ces adressages font vivre le réseau qui adresse en retour.

Corollaires : ne jamais « perdre » un candidat chirurgical en le renvoyant sèchement ; ne jamais faire venir en urgence un patient stable (ne pas inquiéter inutilement) ; ne pas rassurer indument un patient insomniant ou évolutif.

---

## 1. Les SEPT niveaux de sortie

| # | Sortie | Délai | Usage |
|---|---|---|---|
| 1 | **15 / Urgences immédiates** | immédiat | QDC, fièvre + rachialgie, trauma haute énergie < 24 h, paralysie brutale (sauf créneau chirurgien le jour même), suspicion coronarienne / anévrisme |
| 2 | **Urgences (sans délai)** | quelques heures | fièvre post-opératoire (+ prévenir le chirurgien), situations relevant d'un plateau hospitalier sans médicalisation du transport |
| 3 | **Avis chirurgical 24–48 h** | 1–2 j | déficit moteur récent (< 3–4 jours) ou rapidement évolutif, tassement documenté hyperalgique, déficit après geste rachidien — IRM organisée en urgence, patient examiné avant ou le jour de l'IRM |
| 4 | **Avis chirurgical 48–72 h** | 2–3 j | hyperalgie résistante sans imagerie (TC + IRM rapide), parésie évoluant depuis > 3–4 jours (« dans la semaine »), myélopathie documentée sévère, cancer + déficit progressif (+ oncologue) |
| 5 | **Consultation chirurgicale programmée** — *NOUVEAU* | 1 à 4 sem (idéal 2–4, plus tôt si besoin/dispo) | NCB ou sciatique documentée stable ou résistante au traitement bien conduit (candidats intervention/infiltration — à garder), canal lombaire étroit non déficitaire, myélopathie d'évolution lente, Lhermitte isolé stable, ≥ 60 ans + début brutal sans signe neuro (consultation + IRM « dans la semaine »), lombalgie chronique résistante, hernie volumineuse peu symptomatique (éducation) |
| 6 | **Médecin traitant** | — | douleur axiale isolée même hyperalgique, première poussée non explorée, grossesse (sauf exceptions), post-op non compliqué, suspicion extra-rachidienne non grave (coxopathie → radio hanche), cancer sans déficit (MT pour IRM + oncologue) |
| 7 | **Suivi programmé** | — | pathologie ancienne stable sans demande ni candidature chirurgicale (scoliose stable, spondylolisthésis peu symptomatique, claudication compensée déjà suivie) |

Les trois modalités d'entrée dans les niveaux 3–5 : (a) MT pour prescription d'IRM puis consultation ; (b) **téléconsultation de débrouillage** (premier bilan + prescription et organisation de l'IRM, puis consultation physique) ; (c) consultation directe, IRM organisée ensuite. Règle absolue : **toujours examiner physiquement le patient** au plus tard autour de l'IRM.

---

## 2. Règles par cluster (cadre IFOMPT : raisonner par pathologie cible, compléter les clusters, graduer la préoccupation)

### 2.1 Queue de cheval
Troubles sphinctériens, hypoesthésie périnéale (« selle »), sciatique bilatérale + déficit → **15**, sans exception. Sciatalgie bilatérale isolée → avis rapide + IRM (vigilance).

### 2.2 Infection
Fièvre/frissons + rachialgie → **15** (communautaire) ; post-opératoire → **Urgences + prévenir immédiatement le chirurgien**. Éléments d'appel en texte libre sans fièvre mesurée (geste invasif récent, immunodépression, toxicomanie IV, sueurs nocturnes) → l'IA doit rechercher activement la fièvre et le contexte.

### 2.3 Fracture / tassement
- Terrain ostéoporotique (ostéoporose traitée, corticothérapie au long cours) **+ douleur brutale ou inhabituelle** → 72 h + imagerie. ⚠️ La règle déterministe actuelle (ostéo → 72 h systématique) est **trop agressive** : douleur modérée habituelle → MT.
- Tassement documenté hyperalgique → **24–48 h + IRM rapide** (cimentoplastie).
- ≥ 60 ans + début brutal sans signe neuro → **consultation + IRM dans la semaine** (niveau 5), pas le jour même, pas 72 h.
- ≥ 60 ans + douleur d'installation progressive → MT.
- Trauma haute énergie < 24 h → **15** ; déjà bilanté négatif → MT (réévaluation imagerie si dégradation) ; déficit apparu à distance d'un trauma → 24–48 h.

### 2.4 Tumeur
- Cancer actif/récent + rachialgie **sans déficit** → MT pour IRM + **prévenir l'oncologue** (message systématique), puis avis chirurgical avec l'imagerie.
- Cancer + **déficit progressif** → 48–72 h avec IRM organisée (TC possible) + contact oncologue.
- Mélanome → orienter d'abord vers le circuit oncologique (maladie généralisée) — différent d'un cancer du sein.
- Dorsalgie insomniante chez fumeur → MT pour IRM rapide (pas de filière chirurgicale d'emblée).

### 2.5 Déficit moteur radiculaire (bras ou jambe)
- **Paralysie brutale** (membre qui ne répond plus) → **15/urgences** ; seule exception : consultation le jour même si un chirurgien de l'équipe consulte ce jour et qu'il est tôt ; vendredi après-midi / week-end → 15.
- **Parésie récente (< 3–4 jours) ou rapidement évolutive** → 24–48 h, IRM en urgence.
- **Parésie évoluant depuis > 3–4 jours** (jusqu'à ~15 jours, stable) → consultation **dans la semaine** (48–72 h acceptable) + IRM rapide, en prévenant le patient du circuit (MT / TC / consultation).
- La distinction membre supérieur / inférieur ne change pas le délai : c'est **l'ancienneté et la vitesse** qui commandent.

### 2.6 Myélopathie cervicale
La **vitesse d'aggravation prime** : évolution sur des mois, lentement → consultation programmée dans le mois avec IRM préalable (MT ou TC) ; aggravation rapide (échelle d'une semaine), troubles de la marche récents, paralysie → filière urgente. Myélopathie documentée sévère (IRM : souffrance médullaire) → 72 h. L'IA doit **quantifier la vitesse d'aggravation** quand il n'y a pas d'examen complémentaire. Lhermitte isolé stable → niveau 5 avec IRM via MT/TC.

### 2.7 Radiculalgies non déficitaires
- Hyperalgique résistante **sans imagerie** → 24–48 h avec TC + IRM rapide + consultation physique (on n'a pas d'imagerie : il faut la créer vite).
- Hyperalgique avec imagerie disponible → 48–72 h.
- Récente non compliquée, supportable → MT (traitement d'épreuve) ; consultation non urgente possible si le patient la souhaite.
- Documentée stable ou résistante à un traitement bien conduit → **niveau 5 (7–15 jours)** : candidats probables à intervention ou infiltration — à garder dans la patientèle.
- Cruralgie : mêmes règles ; chez le diabétique évoquer la neuropathie (atteinte plexique peu probable avant ~5 jours d'évolution).

### 2.8 Canal lombaire étroit / claudication
Stable, non déficitaire → niveau 5 (10 j–4 sem) avec IRM via MT/TC ; déficit récent → règles 2.5 ; claudication compensée non explorée → MT d'abord (imagerie), en mentionnant la possibilité d'une consultation chirurgicale ou rhumatologique.

### 2.9 Lombalgies / cervicalgies axiales
- Axiale isolée, **même hyperalgique** → MT (renfort antalgique). L'intensité seule ne déclenche jamais la filière chirurgicale.
- Insomniante → avis **médical** rapide (MT), sans faux réconfort.
- Chronique résistante à un traitement complet (kiné, infiltrations…), y compris discopathie Modic 1 → niveau 5 (2–4 sem) — « il y a plus de discopathies dégénératives inflammatoires que de spondylarthropathies » : ne pas exclure du circuit chirurgical, IRM à l'appui ; le rhumatologue reste une orientation complémentaire.
- Chronique stable / demande de conseils → MT (± rhumato, médecin du sport) ; scoliose stable → MT/rhumato ; scoliose évolutive avec retentissement → consultation programmée **sans urgence**.

### 2.10 Post-opératoire
Douleur récidivante sans fièvre ni déficit → MT/kiné/rhumato ou son chirurgien (les chirurgiens reçoivent pour des consultations chirurgicales) ; fièvre → urgences + chirurgien ; déficit après geste → 24–48 h.

### 2.11 Hors périmètre et pièges extra-rachidiens
- **Coccyx : jamais vers l'équipe** (aucun membre ne s'en occupe) → MT.
- Coxopathie suspectée → MT + radio de hanche d'abord ; si coxarthrose : consultation non urgente utile (redirection vers correspondant hanche — réseau d'adressage).
- Oppression thoracique d'effort + bras gauche → 15 (coronarien) ; lombalgie brutale + anévrisme → 15 ; douleur en ceinture + amaigrissement → bilan sans délai ; raideur fébrile + photophobie → 15.
- Grossesse → MT/sage-femme en première intention ; avis chirurgical autorisé si sciatique évolutive > 1 mois, hyperalgie ou déficit.

---

## 3. Consignes transversales

1. **Imagerie consultable** : demander systématiquement d'apporter le CD-ROM ou les codes d'accès en ligne — le compte rendu seul ne suffit pas, et un téléphone ne permet pas de lire les images. À intégrer aux cartes de sortie et au PDF.
2. **Ton** : ne pas inquiéter un patient stable ; ne pas rassurer indument un patient insomniant ou qui s'aggrave.
3. **Vitesse d'évolution** : quand l'ancienneté est longue, l'IA doit chercher à quantifier la vitesse d'aggravation récente (échelle : jours ? semaines ? mois ?).
4. **Cancer** : toujours suggérer de reprendre contact avec l'oncologue.
5. **En cas d'incertitude** entre deux niveaux : choisir le plus urgent des deux (principe de sécurité) — sauf entre 5 et 4/3 où la doctrine ci-dessus (stabilité, ancienneté) tranche.

---

## 4. Chantiers d'implémentation découlant de cette doctrine (à valider un par un)

1. Créer la **7e sortie** « Consultation chirurgicale programmée » (carte + niveau worker + PDF) avec les trois modalités d'accès dont la **TC de débrouillage**.
2. Corriger la règle déterministe ostéo (exiger douleur brutale/inhabituelle).
3. Basculer fièvre et trauma haute énergie < 24 h vers le 15 ; conserver urgences pour le post-op fébrile.
4. Adapter le court-circuit paralysie (15 par défaut, créneau jour-même si chirurgien disponible tôt en semaine).
5. Réécrire le prompt IA en clusters IFOMPT avec les règles ci-dessus + questions de complétion de cluster + quantification de vitesse.
6. Safety-netting spécifique par cluster incomplet sur les cartes MT/Suivi/Programmée.
7. Fallback 28 tours : actuellement → MT (le moins urgent) ; proposer → niveau 5 « consultation programmée » avec safety-netting (décision à prendre).
8. Banc de concordance automatisé sur les 100 cas (API directe), objectif ≥ 90 %.
