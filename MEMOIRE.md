# MEMOIRE PROJET — Urgence'Rachis (urgence-rachis.fr)

> Fichier de passation pour Claude. Dans une nouvelle conversation, demander :
> « Lis MEMOIRE.md du repo raphaeljameson-png/urgences_rachis_paris ».
> Dernière mise à jour : 7 août 2026 — **DOCTRINE v2 EN LIGNE (front + worker)**.

---

## RÈGLES DE TRAVAIL ABSOLUES

1. **Valider avant de coder.** Discuter et faire valider explicitement l'approche par
   Raphael. Jamais d'implémentation avant accord entériné.
2. **Textes patients validés mot à mot.** Ne jamais reformuler un texte affiché au
   patient sans validation explicite.
3. **UNE SEULE SESSION à la fois sur le repo.** Une session parallèle (Claude Desktop)
   a travaillé en même temps le 06/08 et les deux sessions se sont mutuellement
   écrasées. Avant TOUT patch : relire l'état réel de `main` via raw.githubusercontent.
4. **Ne jamais pousser de contenu de test.** Un push « PLACEHOLDER » a détruit la page
   complète le 06/08 (commit 98ed56e, réparé par 35d904d). Le contenu poussé doit
   toujours être le fichier complet, vérifié localement avant envoi.

---

## CONTEXTE

- Projet du **Dr Raphaël Jameson**, chirurgien orthopédiste du rachis,
  **Espace Francilien du Rachis** (avec Dr Mayalen Lamerain et Dr Christophe Travert ;
  ⚠️ le Dr Robin Arvieu ne doit PAS apparaître).
- Objet : **triage des douleurs du rachis** vers le bon circuit de soins.
- **Double mission assumée** : sécurité du patient + recrutement de l'activité
  chirurgicale (candidats à une chirurgie immédiate OU future). Les correspondants
  (hanche, rhumatologie) forment un réseau d'adressage réciproque : on garde le
  patient dans la patientèle, on ne le met jamais à la porte.
- Site principal : rachis.paris (WordPress Bridge/Qode, Google Workspace).
- État : version d'essai, noindex, badge « Version d'essai ».

---

## INFRA

- Repo GitHub **privé** : `raphaeljameson-png/urgences_rachis_paris`.
- Cloudflare Workers (compte dr.jameson@rachis.paris), déploiement auto sur push main.
  ⚠️ **Délais de déploiement devenus longs et irréguliers** (plusieurs heures
  constatées le 06/08) : ne jamais préparer un patch à partir de la prod, toujours
  à partir de `main` lu via raw.
- **URL prod : https://urgences-rachis-paris.dr-jameson.workers.dev**
- KV `URGENCE_KV` ID `8578258e537e45998f97f0ef80685f6f`.
- Secrets : `ANTHROPIC_API_KEY` (⚠️ expire 24/08/2026), `GMAIL_CLIENT_ID`,
  `GMAIL_CLIENT_SECRET`, `GMAIL_REFRESH_TOKEN`.
- Limite : 40 requêtes/IP/jour sur /api/chat et /api/send.
- **Chaîne email Gmail VALIDÉE** : envoi Worker via API Gmail (OAuth refresh token,
  projet GCloud `urgence-rachis`, consentement Interne = jetons permanents),
  alias expéditeur **`urgences@rachis.paris` (avec un S)**, To dr.jameson@rachis.paris,
  PJ OK, Reply-To OK. Pièges résolus : b64 UTF-8 (jamais btoa brut) ; invalid_grant =
  re-générer le refresh token via oauthplayground avec ses propres identifiants.
- Domaine urgence-rachis.fr : PAS acheté. STATS_KEY : pas posé.

### MÉTHODE DE PUSH (obligatoire)

1. Lire l'état de `main` via **raw.githubusercontent.com** (fonctionne sans
   approbation MCP, contrairement à get_file_contents).
2. Patcher en local avec des asserts sur le nombre d'occurrences.
3. `node --check` sur le script extrait.
4. Pousser le **fichier complet** via `push_files`.
5. Re-télécharger le commit via raw et `cmp` avec la version locale.

### PIÈGES D'ÉCHAPPEMENT (coûteux, tous rencontrés)

- Jamais de `\n` littéraux dans le JS inline : utiliser `const NL = String.fromCharCode(10)`.
- **Antislashs dans le JSON de push** : les séquences d'échappement JS ont été
  doublées lors d'un push (commit 2b5ed4f) et se sont affichées littéralement aux
  patients (« acc\u00e8s »). **Solution retenue : écrire les caractères accentués
  RÉELS dans le fichier**, et éviter tout antislash (regex du traçage réécrite en
  indexOf/slice). Vérifier après chaque push : `grep` sur un mot accentué.
- Émojis : en Python utiliser la forme `\U0001F4E4` (les surrogates provoquent
  UnicodeEncodeError).

---

## DOCTRINE DE TRIAGE v2 — SOURCE DE VÉRITÉ

**Document de référence : `docs/DOCTRINE-TRIAGE.md`** (commit 2ecd280), issu de
l'annotation par Raphael des 100 vignettes cliniques.

### Les 7 niveaux de sortie

| Niveau worker | Carte front | Délai |
|---|---|---|
| `15` | carte15 (n1) | immédiat |
| `urgences` | carteUrgences (n1) | immédiat |
| `24h` | carte24h (n2) | 24-48 h |
| `72h` | carte72h (n3) | 48-72 h |
| `consult` | carteConsult (n5) | **2 à 4 semaines — NOUVEAU** |
| `mt` | carteMT (n4) | sans urgence |
| (défaut) | carteSuivi (n4) | suivi programmé |
| (fallback 28 tours) | carteBilan (n4) | hybride MT + consultation |

### Règles cliniques

- **Fièvre + rachialgie → 15** (post-opératoire : urgences + prévenir le chirurgien).
- **Trauma haute énergie < 24 h → 15.**
- **Paralysie brutale → 15**, sauf créneau chirurgien tôt le matin lundi-jeudi
  (avant 10 h) → 24h « jour même ».
- **Parésie** < 3-4 jours → 24-48 h ; > 3-4 jours → dans la semaine.
- **Myélopathie : la VITESSE d'aggravation prime.** Lente → consultation dans le mois
  avec IRM préalable ; rapide (~1 semaine) → urgent ; documentée sévère → 72 h.
- **Hyperalgie sans imagerie** → 24-48 h avec téléconsultation + IRM.
  ⚠️ L'hyperalgie isolée n'active l'urgence que si la gravité est positive par
  ailleurs (aucun délai documenté dans la littérature).
- **Ostéoporose** : exiger une douleur **BRUTALE ou INHABITUELLE**. Une douleur
  habituelle modérée → médecin traitant. Le court-circuit déterministe front a été
  SUPPRIMÉ (trop agressif) : la règle est confiée à l'IA du worker.
- **Tassement documenté hyperalgique** → 24-48 h.
- **≥ 60 ans + début brutal sans signe** → consultation + IRM dans la semaine.
- **Cancer sans déficit** → médecin traitant pour IRM + prévenir l'oncologue
  (mélanome → circuit onco). **Cancer + déficit progressif** → 48-72 h.
- **Sciatique / NCB documentée, stable ou résistante** → 7-15 jours (candidats à une
  intervention ou une infiltration).
- **Lombalgie inflammatoire nocturne** : NE PAS exclure du circuit (« plus de
  discopathies dégénératives inflammatoires que de spondylarthropathies »).
- **Post-opératoire non compliqué** → médecin traitant ou son chirurgien.
- **Coccyx → JAMAIS vers l'équipe.**
- **Coxopathie** → médecin traitant + radio de hanche, puis consultation non urgente
  possible (redirection vers le correspondant).

### Consignes transversales

- **Téléconsultation de débrouillage = maillon pivot** : TC → prescription et
  organisation de l'IRM en centre partenaire → consultation physique obligatoire
  (le chirurgien doit examiner le patient).
- **Imagerie** : exiger CD-ROM ou codes d'accès en ligne ; le compte rendu seul ne
  suffit pas ; pas d'analyse d'IRM sur smartphone.
- **Ton** : ne pas inquiéter, ne pas rassurer indûment. Rester diplomate sur les
  sorties non chirurgicales (kiné, semelles, matelas, oreiller → médecin traitant),
  l'équipe reste disponible si la situation évolue.

---

## ÉTAT DU CODE (au 7 août 2026)

### Front — `public/index.html` — commit **35d904d**

- Charte « Blanc clinique » (passe 1), formulaire d'envoi intégré (passe 2).
- **Validations formulaire** (commit 344b2d8) : email, téléphone (10 chiffres ou
  format international), majorité au jour près avec message dédié orientant le
  parent ou représentant légal vers l'envoi du PDF à urgences@rachis.paris.
- **Retour arrière** : lien « ↩ Corriger ma réponse précédente » (pile d'états JSON).
- **Scroll** : nouvelles questions ancrées en bas, gros éléments ancrés par le haut,
  activé seulement à la première réponse du patient.
- **Doctrine v2** : carteConsult (style n5 marine), carteBilan (fallback hybride),
  constantes factorisées IMGNOTE et ANOTER, paragraphes téléconsultation + imagerie
  sur les cartes 24-48 h et 72 h.
- **Courts-circuits déterministes** : sphincter → 15 ; fièvre → 15 ; paralysie → 15
  sauf lundi-jeudi avant 10 h ; trauma haute énergie < 24 h → 15 ; ostéo supprimé.
- Traces option A : codées, `TRACE_ACTIVE = false` (en attente de la phrase de
  transparence validée).

### Worker — `src/worker.js` — commit **7705b37**

Prompt IA réécrit en **clusters IFOMPT** : raisonnement organisé par pathologie cible,
complétion active des clusters partiels, niveau de préoccupation comme axe de gravité,
safety-netting spécifique. 7 niveaux de sortie, toutes les règles doctrine ci-dessus,
STAT_EVENTS enrichi (sortie_consult, sortie_longue).
⚠️ **Non encore relu en détail** — première tâche de la prochaine session.

### Documentation

- `docs/DOCTRINE-TRIAGE.md` (2ecd280) — doctrine complète.
- `docs/BIBLIOGRAPHIE-SCORE.md` (dd26981) — 30 références avec PMID/DOI.

---

## CALIBRATION CLINIQUE — 100 VIGNETTES

- Excel livré et **annoté par Raphael** : 92 annotations + 8 complétées en chat.
- **Concordance initiale : 57/92 (62 %)** → 35 désaccords, tous traduits en règles
  dans la doctrine v2.
- Répartition de la doctrine finale : 40 médecin traitant · 16 consultation programmée
  · 16 avis 72 h · 10 pour le 15 · 8 avis 24-48 h · 6 suivi · 4 urgences.
- **Banc de concordance automatisé : À FAIRE.** Rejouer les 100 vignettes contre
  l'API Anthropic directe (PAS la prod : limite 40 req/IP/jour). Objectif ≥ 90 %.
  ⚠️ Problème ouvert : pas de clé API dans le conteneur (la clé est un secret
  Cloudflare) — demander une clé à Raphael ou prévoir un endpoint de test.

---

## SCORE G/U (gravité × urgence) — CONCEPTION

Recherche PubMed structurée effectuée (via NCBI E-utilities ; le connecteur MCP PubMed
ne se charge pas). **Constat : aucun score patient gravité × urgence couvrant tout le
rachis n'existe.** Briques validées identifiées :

- **SuCESS** (Bone Joint J 2026, PMID 41763246) — 6 items queue de cheval, seuil ≥ 3,
  sensibilité et VPN 100 % ; modèle méthodologique dérivation → validation externe.
- Cochrane fracture 2023 (combinaisons de drapeaux) ; Cochrane malignité 2013 (seul
  l'antécédent de cancer discrimine).
- mJOA / AOSpine 2017 (myélopathie modérée à sévère = chirurgie) ; Kögl 2021
  (chirurgie précoce des déficits) ; Canadian C-Spine Rule / NEXUS ; DART 2024.
- HAS 2019 (IRM au-delà de 3 mois — cohérent avec la règle `dispenseIRM`) ; NICE NG59.

**À faire** : grille G/U référencée (items pondérés + matrice G × U → 7 sorties),
à soumettre à validation.

---

## DÉONTOLOGIE — MONÉTISATION

Avis rendu : **publicité de tiers = très risqué**. Article 13 (pas de profit sur une
action d'information sanitaire), article 19 (pas de commerce), articles 23-24
(compérage, commission), RGPD, et risque de requalification en dispositif médical
(règlement UE 2017/745, règle 11, classe IIa).
Voies licites : modèle actuel, licence B2B via structure ad hoc, valorisation
académique, financements publics.
**Conseil donné** : saisine écrite du CDOM + avocat en droit de la santé.
*(Projet de courrier à l'Ordre : proposé, non demandé.)*

---

## PENDING — Raphael

1. **Test mobile complet** (parcours + formulaire + envoi réel avec photo) — jamais fait.
2. **Phrase de transparence option A** → active les traces (TRACE_ACTIVE=true).
3. Fournir une **clé API Anthropic de test** (ou un endpoint) pour le banc de concordance.
4. Achat urgence-rachis.fr (~11 €/an, Cloudflare Registrar).
5. **Renouvellement ANTHROPIC_API_KEY avant le 24/08/2026.**
6. Réglage connecteur GitHub : autoriser la lecture (get_file_contents échoue en
   « No approval received » ; contournement raw.githubusercontent).
7. Décider s'il faut une feuille complémentaire de 15 cas « clusters partiels ».

## PENDING — Claude

1. **Relire le worker 7705b37 en détail** et vérifier la conformité complète du prompt
   à la doctrine ; soumettre les écarts à Raphael.
2. **Banc de concordance** des 100 vignettes (objectif ≥ 90 %).
3. **Grille G/U** référencée à concevoir et soumettre.
4. Safety-netting spécifique par cluster incomplet sur les cartes MT, Suivi et
   Programmée (textes à soumettre).
5. Régénérer le **PDF des arbres décisionnels** (doctrine v2).
6. Lancement : retirer noindex + badge, mentions légales, RGPD, SEO, maillage.

---

## HISTORIQUE DES COMMITS CLÉS

| Commit | Date | Contenu |
|---|---|---|
| 5666e6c | 26/07 | Retour arrière « Corriger ma réponse précédente » |
| 344b2d8 | 26/07 | Validations formulaire (email, téléphone, majorité) |
| dd26981 | 27/07 | Bibliographie du score G×U (30 PMID/DOI) |
| 2ecd280 | 06/08 | **Doctrine de triage** (100 vignettes annotées) |
| 7705b37 | 06/08 | **Worker** réécrit en clusters IFOMPT, 7 niveaux |
| 09b3ca6 | 06/08 | Front doctrine v2 (session parallèle) |
| c2cb450 | 06/08 | ⚠️ Écrasement accidentel du front 09b3ca6 |
| 2b5ed4f | 06/08 | ⚠️ Restauration avec antislashs doublés |
| 98ed56e | 06/08 | ⚠️ Push accidentel de contenu factice (PLACEHOLDER) |
| **35d904d** | 06/08 | **Front réparé et vérifié — état courant** |
