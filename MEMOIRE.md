# MEMOIRE PROJET — Urgence'Rachis (urgence-rachis.fr)

> Fichier de passation pour Claude. Dans une nouvelle conversation, demander :
> « Lis MEMOIRE.md du repo raphaeljameson-png/urgences_rachis_paris ».
> Dernière mise à jour : 25 juillet 2026 (soir) — **v2 en prod + chaîne email Gmail validée**.

## RÈGLE DE TRAVAIL ABSOLUE
Avant de coder ou de pousser quoi que ce soit : **discuter et faire valider
explicitement l'approche par Raphael**. Jamais d'implémentation avant accord entériné.
Les textes affichés aux patients sont validés **mot à mot** par le Dr Jameson.

## CONTEXTE
- Projet du **Dr Raphaël Jameson**, chirurgien orthopédiste du rachis,
  **Espace Francilien du Rachis** (avec Dr Mayalen Lamerain et Dr Christophe Travert ;
  ⚠️ le Dr Robin Arvieu ne doit PAS apparaître).
- Objet : **triage des douleurs du rachis** vers 15 / urgences / avis chirurgical
  24-48 h / 48-72 h / médecin traitant / suivi.
- **Stratégie assumée (dixit Raphael)** : le site est l'entonnoir de recrutement de
  l'activité chirurgicale — faire remonter vite les indications chirurgicales
  potentielles, renvoyer vers le médecin traitant les pathologies non chirurgicales.
- Site principal : rachis.paris (WordPress, thème Bridge/Qode, messagerie Google
  Workspace, Raphael administrateur). État : version d'essai, noindex, badge.

## INFRA — ✅ OPÉRATIONNELLE
- Repo GitHub **privé** : `raphaeljameson-png/urgences_rachis_paris` (MCP : lecture/push, pas de création).
- Cloudflare Workers (compte dr.jameson@rachis.paris), déploiement auto sur push main.
- **URL prod : https://urgences-rachis-paris.dr-jameson.workers.dev**
- KV `URGENCE_KV` : ID `8578258e537e45998f97f0ef80685f6f`.
- Secrets en place : `ANTHROPIC_API_KEY` (clé « urgence-rachis », ⚠️ expire 24/08/2026 ;
  crédits OK — piège rencontré : crédits et clé dans la même organisation, délai
  d'affichage possible), `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, `GMAIL_REFRESH_TOKEN`.
- **Chaîne email Gmail VALIDÉE le 25/07 au soir** : envoi depuis le Worker via API
  Gmail (OAuth refresh token, projet Google Cloud `urgence-rachis`, écran de
  consentement **Interne** — jetons permanents), expéditeur alias
  **`urgences@rachis.paris`** (avec un S), destinataire dr.jameson@rachis.paris,
  pièces jointes OK, Reply-To OK. Limite : 25 Mo/message (~17 Mo utiles).
  Fonctions worker : gmailAccessToken/gmailSend. Route de test retirée après succès.
  Pièges résolus : btoa→b64 UTF-8 ; invalid_grant = refresh token à re-générer
  via oauthplayground AVEC ses propres identifiants (roue ⚙️).
- Domaine urgence-rachis.fr : PAS ENCORE acheté (Cloudflare Registrar, ~11 €/an).
- `STATS_KEY` : pas posé (optionnel).

## ARCHITECTURE v2 (en production)
1. **`src/worker.js`** : `/api/chat` proxy Claude (Opus 4.8 → Sonnet 4.6 >50 €/mois,
   compteur KV spend:YYYY-MM) ; 12 règles verrouillées + signal
   `<sortie>{"niveau","motif","synthese"}</sortie>` ; `/api/now` ; `/api/stat`
   (compteurs anonymes) ; `/api/stats?key=` ; IP hachées SHA-256 salées ;
   40 req/IP/jour ; module Gmail (gmailSend, pièces jointes MIME).
2. **`public/index.html`** : parcours structuré → checklist par région →
   court-circuits déterministes → description libre → conversation IA → cartes de
   sortie à textes fixes ; PDF jsPDF local ; envoi actuel = Web Share/mailto
   (⚠️ à remplacer par le formulaire intégré, voir chantier en cours).
3. RGPD : stats agrégées anonymes uniquement, transparence affichée, IA sans
   données nominatives. Web Analytics Cloudflare : pas encore activé.

## TESTS VALIDÉS EN PROD (25/07)
- IA : lumbago banal→mt ✅ · myélopathie→24h ✅ · détournement→recadrage exact ✅ ·
  hyperalgique→72h ✅ · règle paralysie vérifiée via /api/now ✅ · IP hachées ✅
- Email : test réel reçu dans la boîte (alias, PJ, corps) ✅
- Micro-défaut connu : l'IA peut émettre question + sortie dans le même message
  (le front gère ; ajustement prompt possible).
- Reste : test mobile complet par Raphael (parcours + PDF).

## RÈGLES MÉDICALES VERROUILLÉES (ne jamais modifier sans le Dr Jameson)
- Sphincter/anesthésie siège → 15 (court-circuit). Fièvre → urgences (court-circuit).
- Paralysie brutale (heure serveur) : ven<12h→24h paralysie_jour_meme ;
  ven≥12h ou samedi→urgences ; dim-jeu→24h paralysie_lendemain (court-circuit).
- Force partielle→24h. Myélopathie (cervical seul)→24h+IRM.
- Trauma HE<24h→urgences (court-circuit) ; >24h→72h trauma. Trauma FE→72h tassement.
- Cancer<5 ans→72h cancer. Hyperalgique→72h. >6 sem/aggravation→72h persistante
  (critères niveau 3 PROVISOIRES, passe 2 non tranchée).
- Aiguë sans radiculalgie/trauma/signe→mt. Ancienne stable→suivi. Doute→plus urgent.
- **NOUVELLE RÈGLE TASSEMENT (validée sur le principe, détails en cours)** :
  terrain ostéoporotique (ostéoporose connue, traitement, cortisone au long cours)
  + douleur axiale aiguë → **72h tassement même sans traumatisme** (indication
  cimentoplastie potentielle). EN ATTENTE de Raphael : seuil ≥60 ans sans ostéoporose
  connue ? lombaire uniquement ? libellé case checklist ? → PAS ENCORE CODÉE.

## DÉCISIONS PRODUIT ENTÉRINÉES
- Pas de lien Doctolib caché ; canal = message au chirurgien avec rapport ;
  Doctolib générique seulement carte mt. RDV = « consultation avec un chirurgien
  du rachis pour un avis chirurgical ». Cartes à textes fixes. Synthèse IA
  uniquement dans le PDF. Notes non médicales partout.
- **Refonte graphique : MAQUETTE A « Clinique turquoise » retenue** (fond blanc,
  marine #003366, turquoise #1abc9c — charte rachis.paris ; Montserrat/Raleway ;
  colonne vertébrale annotée en héros ; frise des niveaux ; vignettes pathologies ;
  boîte de dialogue mise en avant par ombre décroissante + halo ; bulles
  différenciées assistant [turquoise pâle, avatar ✚] / patient [marine, avatar VOUS]).
  Fichier d'aperçu : maquette-A-clinique.html (remis à Raphael). PAS ENCORE INTÉGRÉE.
- **Formulaire d'envoi intégré (remplace le mailto)** — décisions actées : champs
  nom, prénom, date de naissance, téléphone ET email obligatoires + message libre
  + pièces jointes (compression photos côté client, ~17 Mo utiles max, limite
  Gmail 25 Mo) + case de consentement ; rapport PDF joint AUTOMATIQUEMENT ;
  envoi via gmailSend ; Worker ne stocke rien ; Reply-To = email patient.
  Niveau de sécurité assumé : email standard, comme les sites de confrères
  (transparence à réécrire en conséquence, validation mot à mot requise).
  PAS ENCORE CODÉ.
- Moteur IA : sujet Gemini ouvert (payant acceptable, gratuit NON — entraînement
  sur données) ; architecture ENGINE prévue ; rien d'implémenté, décision en attente.

## PENDING — côté Raphael (BLOQUANTS pour la passe 1)
1. **Validation mot à mot des 11 textes** des sections « Cinq niveaux
   d'orientation » (1a-1e) et « Pathologies concernées » (2a-2g) — liste dans la
   conversation du 25/07.
2. **Règle tassement** : seuil ≥60 ans ? lombaire seul ? libellé de la case ?
3. URLs exactes des fiches pathologies sur rachis.paris (liens profonds, sinon
   liens génériques).
4. Achat urgence-rachis.fr · test mobile · STATS_KEY/Web Analytics (non bloquants).

## PENDING — côté Claude (après validations)
1. **PASSE 1** : intégration maquette A en prod + nouvelles sections + règle
   tassement (checklist + règle 13 prompt IA) + PDF arbres décisionnels à jour.
2. **PASSE 2** : formulaire d'envoi intégré (textes du formulaire + consentement
   + nouvelle transparence à soumettre mot à mot AVANT codage).
3. Ajustement prompt (question+sortie simultanées) — mineur.
4. Lancement : domaine, retirer noindex+badge, mentions légales/RGPD, SEO.

## FICHIERS DE TRAVAIL (conteneur, non persistants)
/home/claude/urgence/ (worker.js, index-v2.html, arbres.py…) ;
maquettes A/B/C remises dans outputs ; PDF arbres décisionnels remis (à mettre à
jour avec la règle tassement).
