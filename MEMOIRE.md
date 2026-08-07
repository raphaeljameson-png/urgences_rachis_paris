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
   écrasées. Avant TOUT patch : relire l'état réel de `main`.
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
- Comptes : GitHub et Drive perso = raphaeljameson@gmail.com ; Cloudflare et Gmail
  d'envoi = dr.jameson@rachis.paris.

---

## INFRA

- Repo GitHub **privé** : `raphaeljameson-png/urgences_rachis_paris`.
- Cloudflare Workers (compte dr.jameson@rachis.paris), déploiement auto sur push main.
  ⚠️ **Délais de déploiement longs et irréguliers** (plusieurs heures constatées) :
  ne jamais préparer un patch à partir de la prod, toujours à partir de `main`.
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

1. Lire l'état de `main` (get_file_contents, ou raw.githubusercontent si le connecteur
   MCP ne répond pas — raw fonctionne toujours et sans approbation).
2. Patcher en local avec des asserts sur le nombre d'occurrences.
3. `node --check` sur le script extrait.
4. Pousser le **fichier complet** via `push_files`.
5. Re-télécharger le commit via raw et `cmp` avec la version locale.

### PIÈGES D'ÉCHAPPEMENT (coûteux, tous rencontrés)

- Jamais de `\n` littéraux dans le JS inline : utiliser `const NL = String.fromCharCode(10)`.
- **Antislashs dans le JSON de push** : des séquences d'échappement JS ont été doublées
  (commit 2b5ed4f) et se sont affichées littéralement aux patients. **Solution retenue :
  écrire les caractères accentués RÉELS dans le fichier** et éviter les antislashs
  évitables. Vérifier après chaque push par `cmp` avec la version locale.
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
| `72h` | carte72h (n3) | 48-72 h, ou « dans la semaine » si motif `force_semaine` |
| `consult` | carteConsult (n5) | 2 à 4 semaines |
| `mt` | carteMT (n4) | sans urgence |
| (défaut) | carteSuivi (n4) | suivi programmé |
| (fallback 28 tours) | carteBilan (n4) | hybride MT + consultation |

### Règles cliniques

- **Fièvre + rachialgie → 15.** Exception : chirurgie du rachis < 3 mois → `urgences`
  motif `fievre_postop` (la carte affiche la consigne de prévenir le chirurgien).
- **Trauma haute énergie < 24 h → 15.**
- **Paralysie brutale → 15**, sauf créneau chirurgien lundi-jeudi avant 10 h → 24h.
- **Parésie** < 3-4 jours → 24-48 h ; > 3-4 jours et stable → `72h` motif
  `force_semaine`, la carte annonçant alors « dans la semaine ».
- **Myélopathie : la VITESSE d'aggravation prime.** Lente → `consult` ; rapide
  (~1 semaine) → 24h ; documentée sévère → 72h.
- **Hyperalgie radiculaire sans imagerie** → 24h ; avec imagerie → 72h.
  ⚠️ Douleur **axiale** isolée, même hyperalgique → `mt` : l'intensité seule ne
  déclenche jamais la filière chirurgicale (mis-orientation d'origine, corrigée).
- **Ostéoporose** (ou corticothérapie au long cours) + douleur **brutale ou
  inhabituelle** → 72h motif `tassement` ; douleur habituelle modérée → `mt`.
- **≥ 60 ans + douleur axiale brutale SANS terrain ostéoporotique ni corticothérapie**
  → `mt` motif `tassement_mt` (la carte porte alors la phrase : radiographie du rachis
  par le médecin traitant, complétée si besoin par une IRM).
- **Tassement documenté et hyperalgique** → 24h.
- **Cancer sans déficit** → `mt` motif `cancer_mt` + prévenir l'oncologue
  (mélanome → circuit onco). **Cancer + déficit progressif** → 72h.
- **Radiculalgie documaptée stable ou résistante** → `consult` motif `candidat`
  (2 à 4 semaines — délai validé par RJ le 07/08).
- **Lombalgie inflammatoire nocturne** : NE PAS exclure du circuit (« plus de
  discopathies dégénératives inflammatoires que de spondylarthropathies »).
- **Post-opératoire non compliqué** → `mt` ou son chirurgien.
- **Coccyx → JAMAIS vers l'équipe.** **Coxopathie** → `mt` + radio de hanche.

### Consignes transversales

- **Téléconsultation de débrouillage = maillon pivot** : TC → prescription et
  organisation de l'IRM en centre partenaire → consultation physique obligatoire.
- **Imagerie** : exiger CD-ROM ou codes d'accès ; le compte rendu seul ne suffit pas ;
  pas d'analyse d'IRM sur smartphone.
- **Ton** : ne pas inquiéter, ne pas rassurer indûment. Rester diplomate sur les
  sorties non chirurgicales (kiné, semelles, literie → médecin traitant).

---

## ÉTAT DU CODE (au 7 août 2026)

### Front — `public/index.html` — commit **b8447ca**

- Charte « Blanc clinique », formulaire d'envoi intégré, validations (email,
  téléphone, majorité au jour près avec message dédié pour les mineurs).
- Retour arrière « ↩ Corriger ma réponse précédente » ; scroll ancré.
- Cartes doctrine v2 : carteConsult (n5), carteBilan (fallback), constantes IMGNOTE
  et ANOTER, variante « dans la semaine » de carte72h, motif `fievre_postop`,
  carteMT recevant le motif pour `tassement_mt`.
- Courts-circuits : sphincter → 15 ; fièvre → 15 ; paralysie → 15 sauf lundi-jeudi
  avant 10 h ; trauma haute énergie < 24 h → 15 ; court-circuit ostéo SUPPRIMÉ
  (confié à l'IA, qui exige une douleur brutale ou inhabituelle).
- Traces option A codées, `TRACE_ACTIVE = false`.

### Worker — `src/worker.js` — commit **33c310b**

Prompt IA en **clusters IFOMPT**, 7 niveaux, toutes les règles ci-dessus.
Relu intégralement le 07/08 : conforme à la doctrine.
Modèle : `claude-opus-4-8`, bascule sur `claude-sonnet-4-6` au-delà de 50 €/mois.
`MAX_TOKENS_REPLY = 700`.

### Documentation

- `docs/DOCTRINE-TRIAGE.md` (2ecd280) — doctrine complète.
- `docs/BIBLIOGRAPHIE-SCORE.md` (dd26981) — 30 références avec PMID/DOI.

---

## VEILLE MODÈLES — À ARBITRER PLUS TARD

> Les modèles changent vite. Ce comparatif date du **7 août 2026** : le vérifier
> avant toute décision.

### Opus 5 vs Opus 4.8 (modèle actuellement utilisé)

| | Opus 4.8 (`claude-opus-4-8`) | Opus 5 (`claude-opus-5`) |
|---|---|---|
| Sortie | 28 mai 2026 | 24 juillet 2026 |
| Prix | 5 $ / 25 $ par million de tokens | **identique : 5 $ / 25 $** |
| Batch | 2,50 $ / 12,50 $ | identique |
| Cache hit | 0,50 $ | identique |
| Fast mode | 10 $ / 50 $ | identique |
| Contexte | 1 M tokens, 128 k en sortie | identique |
| Benchmarks | référence | **devance 4.8 sur les 14 lignes publiées** |
| Réflexion | désactivée sauf demande | **activée par défaut** |
| Retrait | pas avant le 28 mai 2027 | — |

### ⚠️ Le piquet de migration qui nous concerne

Sur Opus 5 la réflexion adaptative est **active par défaut** et ses tokens sont
facturés au tarif de sortie. Conséquences directes pour ce projet :

1. **`MAX_TOKENS_REPLY = 700` devient dangereux** : la réponse peut être tronquée en
   plein milieu, **y compris le bloc `<sortie>`** qui déclenche les cartes
   d'orientation — le triage casserait silencieusement. Relever `max_tokens` et/ou
   fixer `effort` à `medium` ou `low` avant toute migration.
2. Le compteur de dépense KV monterait plus vite à usage égal, déclenchant la bascule
   vers Sonnet plus tôt que prévu.
3. Deux fonctions absentes d'Opus 5 : web fetch et Priority Tier — sans impact ici.
4. Changement cassant : désactiver la réflexion aux niveaux d'effort `xhigh` ou `max`
   renvoie une erreur 400.

### Recommandation

**Ne pas migrer avant la fin de la calibration clinique.** Changer de modèle pendant
la calibration invaliderait le banc de concordance. Le bon moment : après la mesure
des 100 vignettes sur Opus 4.8, qui fournira une référence chiffrée pour juger si
Opus 5 fait mieux. Aucune urgence : Opus 4.8 n'a pas de date de retrait avant
mai 2027.

### Autres modèles au catalogue (août 2026)

- **Sonnet 5** — génération Sonnet la plus capable ; candidat naturel au remplaçant
  de `claude-sonnet-4-6` en position de repli.
- **Fable 5** (10 $ / 50 $) et **Mythos 5** (accès restreint, Project Glasswing) —
  hors sujet pour ce projet : coût double sans bénéfice sur une tâche de triage.

---

## CALIBRATION CLINIQUE — 100 VIGNETTES

- Excel livré et **annoté par Raphael** : 92 annotations + 8 complétées en chat.
- **Concordance initiale : 57/92 (62 %)** → 35 désaccords, tous traduits en règles.
- Répartition de la doctrine finale : 40 médecin traitant · 16 consultation programmée
  · 16 avis 72 h · 10 pour le 15 · 8 avis 24-48 h · 6 suivi · 4 urgences.
- **Banc de concordance automatisé : À FAIRE.** Rejouer les 100 vignettes contre
  l'API Anthropic directe (PAS la prod : limite 40 req/IP/jour). Objectif ≥ 90 %.
  ⚠️ Bloqué : pas de clé API de test. Ne JAMAIS coller de clé ni de jeton dans une
  conversation — prévoir un secret Cloudflare et un endpoint de test protégé.

---

## SCORE G/U (gravité × urgence) — CONCEPTION

Recherche PubMed structurée effectuée. **Aucun score patient gravité × urgence
couvrant tout le rachis n'existe.** Briques validées :

- **SuCESS** (Bone Joint J 2026, PMID 41763246) — 6 items queue de cheval, seuil ≥ 3,
  sensibilité et VPN 100 % ; modèle méthodologique dérivation → validation externe.
- Cochrane fracture 2023 ; Cochrane malignité 2013 (seul l'ATCD de cancer discrimine).
- mJOA / AOSpine 2017 ; Kögl 2021 ; Canadian C-Spine Rule / NEXUS ; DART 2024.
- HAS 2019 (IRM au-delà de 3 mois) ; NICE NG59.

**À faire** : grille G/U référencée (items pondérés + matrice G × U → 7 sorties).

---

## DÉONTOLOGIE — MONÉTISATION

**Publicité de tiers = très risqué.** Article 13 (pas de profit sur une action
d'information sanitaire), article 19 (pas de commerce), articles 23-24 (compérage,
commission), RGPD, risque de requalification en dispositif médical (règlement UE
2017/745, règle 11, classe IIa).
Voies licites : modèle actuel, licence B2B via structure ad hoc, valorisation
académique, financements publics.
**Conseil donné** : saisine écrite du CDOM + avocat en droit de la santé.

---

## PENDING — Raphael

1. **Test mobile complet** (parcours + formulaire + envoi réel avec photo) — jamais fait.
2. **Vérifier la prod** après le déploiement des commits 33c310b et b8447ca.
3. **Phrase de transparence option A** → active les traces (TRACE_ACTIVE=true).
4. **Clé API Anthropic de test** (via secret Cloudflare) pour le banc de concordance.
5. Achat urgence-rachis.fr (~11 €/an, Cloudflare Registrar).
6. **Renouvellement ANTHROPIC_API_KEY avant le 24/08/2026.**
7. Décider s'il faut une feuille complémentaire de 15 cas « clusters partiels ».

## PENDING — Claude

1. **Banc de concordance** des 100 vignettes (objectif ≥ 90 %).
2. **Grille G/U** référencée à concevoir et soumettre.
3. **Arbitrage migration Opus 5** (voir VEILLE MODÈLES) — après la calibration.
4. Safety-netting spécifique par cluster incomplet sur les cartes MT, Suivi et
   Programmée (textes à soumettre).
5. Régénérer le **PDF des arbres décisionnels** (doctrine v2).
6. Lancement : retirer noindex + badge, mentions légales, RGPD, SEO, maillage.

---

## HISTORIQUE DES COMMITS CLÉS

| Commit | Date | Contenu |
|---|---|---|
| 344b2d8 | 26/07 | Validations formulaire (email, téléphone, majorité) |
| dd26981 | 27/07 | Bibliographie du score G×U (30 PMID/DOI) |
| 2ecd280 | 06/08 | **Doctrine de triage** (100 vignettes annotées) |
| 7705b37 | 06/08 | **Worker** réécrit en clusters IFOMPT, 7 niveaux |
| 09b3ca6 | 06/08 | Front doctrine v2 (session parallèle) |
| c2cb450 | 06/08 | ⚠️ Écrasement accidentel du front 09b3ca6 |
| 2b5ed4f | 06/08 | ⚠️ Restauration avec antislashs doublés |
| 98ed56e | 06/08 | ⚠️ Push accidentel de contenu factice (PLACEHOLDER) |
| 35d904d | 06/08 | Front réparé et vérifié |
| c01b9a0 | 07/08 | MEMOIRE.md remis à jour |
| **33c310b** | 07/08 | **Worker** : tassement_mt, force_semaine, sortie_bilan |
| **b8447ca** | 07/08 | **Front** : fievre_postop, « dans la semaine », tassement_mt |
