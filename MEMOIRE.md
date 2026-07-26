# MEMOIRE PROJET — Urgence'Rachis (urgence-rachis.fr)

> Fichier de passation pour Claude. Dans une nouvelle conversation, demander :
> « Lis MEMOIRE.md du repo raphaeljameson-png/urgences_rachis_paris ».
> Dernière mise à jour : 26 juillet 2026 — **PASSES 1 ET 2 EN LIGNE ET TESTÉES**.

## RÈGLE DE TRAVAIL ABSOLUE
Avant de coder ou de pousser quoi que ce soit : **discuter et faire valider
explicitement l'approche par Raphael**. Jamais d'implémentation avant accord entériné.
Les textes affichés aux patients sont validés **mot à mot** par le Dr Jameson.

## CONTEXTE
- Projet du **Dr Raphaël Jameson**, chirurgien orthopédiste du rachis,
  **Espace Francilien du Rachis** (avec Dr Mayalen Lamerain et Dr Christophe Travert ;
  ⚠️ le Dr Robin Arvieu ne doit PAS apparaître).
- Objet : **triage des douleurs du rachis** → 15 / urgences / 24-48h / 48-72h / mt / suivi.
- **Stratégie assumée (dixit Raphael)** : entonnoir de recrutement de l'activité
  chirurgicale — faire remonter les indications chirurgicales potentielles,
  renvoyer au médecin traitant le non-chirurgical.
- Site principal : rachis.paris (WordPress Bridge/Qode, Google Workspace, Raphael admin).
- État : version d'essai, noindex, badge « Version d'essai ».

## INFRA — ✅ OPÉRATIONNELLE
- Repo GitHub **privé** : `raphaeljameson-png/urgences_rachis_paris` (MCP : lecture/push).
- Cloudflare Workers (compte dr.jameson@rachis.paris), déploiement auto sur push main.
- **URL prod : https://urgences-rachis-paris.dr-jameson.workers.dev**
- KV `URGENCE_KV` ID `8578258e537e45998f97f0ef80685f6f`.
- Secrets : `ANTHROPIC_API_KEY` (⚠️ expire 24/08/2026), `GMAIL_CLIENT_ID`,
  `GMAIL_CLIENT_SECRET`, `GMAIL_REFRESH_TOKEN`.
- **Chaîne email Gmail VALIDÉE** : envoi Worker via API Gmail (OAuth refresh token,
  projet GCloud `urgence-rachis`, consentement **Interne** = jetons permanents),
  alias expéditeur **`urgences@rachis.paris` (avec un S)**, PJ OK, Reply-To OK,
  25 Mo/message (~17 Mo utiles). Fonctions : gmailAccessToken/gmailSend.
  Pièges résolus : b64 UTF-8 (jamais btoa brut) ; invalid_grant = re-générer le
  refresh token via oauthplayground AVEC ses propres identifiants (roue ⚙️).
- Domaine urgence-rachis.fr : PAS acheté. `STATS_KEY` : pas posé. Web Analytics : non.

## ⚠️ PIÈGE DE PUSH — RÉSOLU DÉFINITIVEMENT (26/07)
Les pushes MCP transformaient parfois les échappements de saut de ligne des chaînes
JS inline en retours réels → SyntaxError en prod (arrivé 3 fois). **Solution en
place** : le script de public/index.html n'utilise PLUS AUCUN échappement fragile —
constante `const NL = String.fromCharCode(10);` en tête de CONFIGURATION, utilisée
partout (labels.join(NL), NL+"<sortie>", escapeHtml via split(NL).join,
join(NL) PDF), validation email par indexOf, extension fichier par lastIndexOf.
**Workflow obligatoire après CHAQUE push front** : attendre ~30-60 s, curl avec
cache-buster, extraire le dernier script (python re.findall), `node --check`.

## PASSE 1 — ✅ EN LIGNE ET TESTÉE (25/07 soir)
Refonte complète charte **« Blanc clinique »** (maquette A validée) :
- Héros blanc, colonne vertébrale annotée façon imagerie (halos pulsants, C1-C7/L1-L5,
  hernie), CTA turquoise « Commencer l'évaluation ».
- Chat mis en avant : bord turquoise, ombre décroissante 3 couches + halo, voile radial.
- **Bulles différenciées** : assistant = turquoise pâle + avatar ✚ + étiquette
  ASSISTANT ; patient = marine texte blanc + avatar VOUS à droite.
- Sections validées mot à mot : « Cinq niveaux d'orientation » (frise + 4 cartes) et
  « Pathologies concernées » (6 vignettes, liens profonds rachis.paris :
  hernie-discale-lombaire-symptomes, la-stenose-lombaire,
  nevralgie-cervico-brachiale-causes, cruralgie-sciatique,
  fracture-tassement-vertebre, myelopathie-cervicale-definition).
- Région reformulée : « Rachis thoracique ou lombaire — le milieu ou le bas du dos ».
- PDF rapport recoloré marine/turquoise.

## PASSE 2 — ✅ EN LIGNE ET TESTÉE (26/07)
- **Worker /api/send** : validation nom/prénom/ddn/tel/email/consent obligatoires,
  plafond 22 Mo b64, rapport PDF + PJ ≤10, corps structuré
  (patient/orientation/synthèse/message), sujet « Demande de consultation — NOM
  Prénom — orientation », From alias urgences@rachis.paris, To dr.jameson@rachis.paris,
  Reply-To patient, AUCUN stockage, événement stats « envoi_site ».
- **Front, cartes 24h et 72h — « Deux options pour transmettre votre demande : »** :
  1. bouton turquoise « 📤 Envoyer ma demande via ce site (recommandé) » → formulaire
     intégré au chat : Nom*/Prénom*/Date de naissance*/Téléphone*/Email*/Message
     facultatif/PJ facultatives (compression photos canvas max 2000px JPEG 0.8 si
     >400 Ko, plafond 15 Mo) ; rapport PDF joint automatiquement ; case consentement.
  2. « Ou par vous-même : » bouton 📄 Télécharger le PDF + « puis envoyez-le par
     email à urgences@rachis.paris » (mailto avec sujet pré-rempli — un mailto simple
     pré-remplit bien le destinataire, contrairement au partage de FICHIER iOS qui
     l'interdit : raison de l'abandon de l'ancien sharePDF).
- **Mention de consentement FINALE validée (mention 1)** : « J'accepte que ces
  informations et les pièces jointes soient transmises de façon sécurisée (connexion
  chiffrée) au secrétariat de l'Espace Francilien du Rachis afin d'être
  recontacté(e) pour une consultation. » (l'ancienne formule « email standard, non
  chiffré de bout en bout » jugée anxiogène a été RETIRÉE — le circuit est chiffré
  en transit et au repos, seul le E2E type S/MIME manque et n'est pas mentionné).
- Tests prod : /api/send réel → {"ok":true}, email reçu avec PJ + Reply-To ✅ ;
  sans consentement → 400 ✅ ; syntaxe JS prod node --check ✅.

## RÈGLES MÉDICALES VERROUILLÉES (worker, prompt système)
1-6, 8-12 : inchangées (sphincter→15 ; fièvre→urgences ; paralysie selon jour/heure
serveur ; force→24h ; myélopathie cervical→24h ; trauma HE <24h→urgences sinon 72h ;
cancer<5ans→72h ; hyperalgique→72h ; >6sem→72h ; aiguë simple→mt ; ancienne→suivi).
**7 (étendue)** : trauma faible énergie OU terrain ostéoporotique (ostéoporose,
traitement anti-ostéoporotique, corticothérapie au long cours) + douleur axiale aiguë
thoracique/lombaire → 72h tassement MÊME SANS TRAUMATISME.
**13** : ≥60 ans + douleur axiale thoracique/lombaire AIGUË ET BRUTALE,
sans irradiation ni autre cause, même sans ostéoporose connue → 72h tassement
(l'IA vérifie le caractère brutal avant de conclure).
**Région** : thoracique assimilé au lombaire partout.
**Fiches (niveau 1)** : l'IA connaît les 6 fiches rachis.paris et peut, MAX 1×/conv,
signaler qu'une fiche existe — sans URL, sans contenu. (Niveaux 2/3 écartés.)
**Front** : case checklist lombaire « J'ai de l'ostéoporose, un traitement pour la
solidité des os, ou je prends de la cortisone au long cours » → court-circuit
déterministe carte72h('tassement') (placé APRÈS trauma ; trauma_ancien+osteo → IA).

## TESTS VALIDÉS EN PROD
- lumbago banal→mt ✅ · myélopathie→24h ✅ · détournement→recadrage ✅ ·
  hyperalgique→72h ✅ · **règle 13 : femme 68 ans, axiale brutale, pas d'ostéo →
  IA pose LES bonnes questions puis 72h tassement + mention fiche niveau 1 ✅**
- /api/send réel ✅ (email + PJ + Reply-To) · refus sans consentement (400) ✅
- Syntaxe JS prod vérifiée (node --check) après le dernier push ✅
- Micro-défaut connu : question+signal de sortie parfois dans le même message (front gère).
- ⚠️ Test mobile complet par Raphael : TOUJOURS PENDING (parcours + formulaire +
  envoi réel avec photo).

## TRACES (option A) — CODÉE MAIS DÉSACTIVÉE
- Worker : POST /api/trace opérationnel (champs filtrés/tronqués, AUCUN texte libre
  patient, tranche d'âge par décennie, clé trace:YYYY-MM:uuid, TTL 12 mois).
- Front : sendTrace() appelé dans carteParNiveau, gated par `const TRACE_ACTIVE=false`.
- **Activation conditionnée à la validation par Raphael de la phrase de transparence** :
  « Le déroulé technique de l'évaluation (réponses aux questions à choix multiples,
  questions posées par l'assistant, orientation proposée) est conservé de façon
  anonyme pour améliorer l'outil. Vos messages et descriptions libres ne sont jamais
  conservés. » → puis : ajouter la phrase à la section Transparence + TRACE_ACTIVE=true.
- Option B (verbatim + consentement coché, TTL 12 mois) documentée, bascule facile.

## DÉCISIONS PRODUIT ENTÉRINÉES
- Canal = message au chirurgien avec rapport ; Doctolib générique seulement carte mt.
- Cartes de sortie à textes fixes ; synthèse IA uniquement dans le PDF.
- IA : Opus 4.8 → Sonnet 4.6 au-delà de 50 €/mois. Gemini : payant OK, gratuit NON —
  rien d'implémenté, architecture ENGINE prévue, décision en attente.

## PENDING — Raphael
1. **Test mobile complet passe 2** (parcours + formulaire + envoi réel avec photo).
2. **Phrase de transparence option A** (ci-dessus) → active les traces.
3. Achat urgence-rachis.fr (~11 €/an, Cloudflare Registrar).
4. Renouvellement ANTHROPIC_API_KEY avant le 24/08/2026.
5. STATS_KEY / Web Analytics (optionnels).

## PENDING — Claude
1. Mettre à jour le **PDF des arbres décisionnels** (règles tassement/thoracique)
   — sources /home/claude/urgence/arbres.py + build_pdf.py (conteneur, régénérables).
2. Ajustement prompt (question+sortie simultanées) — mineur.
3. Passe 2 des critères niveau 3 (jamais tranchée : seuil 4/6 sem, « traitement bien
   conduit », EVA, IRM faite).
4. Lancement : retirer noindex+badge, mentions légales/RGPD, SEO, maillage.
