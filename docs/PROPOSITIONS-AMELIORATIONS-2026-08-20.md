# Propositions d'améliorations — audit du 20/08/2026

> Document soumis à validation de RJ (règle n° 1 du MEMOIRE.md : rien n'est codé
> sans accord entériné). Audit complet de `src/worker.js` (blob a508d7f) et
> `public/index.html` (blob d97afad), à jour du correctif sténose du 09/08.
> AUCUNE modification de code n'accompagne ce document ; `main` est intact.

---

## 0. URGENT — avant toute autre chose (échéances)

1. **`ANTHROPIC_API_KEY` expire le 24/08/2026 — dans 4 jours.** À renouveler dans
   la console Anthropic puis reposer en secret Cloudflare (`wrangler secret put
   ANTHROPIC_API_KEY` ou dashboard). Sans cela, le triage IA tombe en panne
   (le patient verra « service momentanément indisponible » à chaque tour).
2. **Clé d'évaluation à révoquer** (point ouvert n° 5 du journal) : la campagne
   des 100 vignettes est terminée depuis le 09/08 ; supprimer aussi les secrets
   `ANTHROPIC_EVAL_KEY` + `EVAL_TOKEN` pour éteindre `/api/eval` (il redevient 404).

---

## 1. Robustesse du triage — correctifs techniques proposés (aucun texte patient modifié)

### 1.1 Garde contre la troncature du bloc `<sortie>` (priorité haute)

`MAX_TOKENS_REPLY = 700` : si la réponse du modèle atteint la limite, elle est
coupée en plein milieu — y compris, au pire, au milieu du bloc `<sortie>`. Le
front ne reçoit alors jamais le signal, le patient tourne jusqu'au fallback des
28 tours (carteBilan). Le worker ne vérifie pas `data.stop_reason`.

**Proposition** : dans `/api/chat`, si `stop_reason === "max_tokens"` :
- si un `<sortie>` complet est présent → comportement actuel (rien à faire) ;
- sinon, purger tout `<sortie>` partiel du texte visible et relancer UNE fois
  l'appel avec un `max_tokens` doublé ; en cas de nouvel échec, laisser le flux
  normal (le patient répond, la conversation continue).

C'est aussi le prérequis n° 1 de la future migration Opus 5 (réflexion facturée
en sortie, risque de troncature accru — cf. MEMOIRE, veille modèles).

### 1.2 Repli de modèle en cas d'erreur API (priorité haute)

Aujourd'hui, un seul essai : si l'API Anthropic renvoie 429/529/5xx (surcharge),
le patient voit « service momentanément indisponible ». Aucun retry, aucun repli.

**Proposition** : sur échec d'appel avec `MODEL_PRIMARY`, retenter une fois sur
`MODEL_FALLBACK` (Sonnet) avant de rendre l'erreur. Le prompt étant identique,
la doctrine reste la même ; on préfère un triage Sonnet à pas de triage du tout.
(Optionnel : compter ces replis dans une stat `fallback_model` pour surveiller.)

### 1.3 Auto-héberger jsPDF (priorité moyenne)

Le front charge jsPDF depuis `cdnjs.cloudflare.com`. Si le CDN est bloqué
(entreprise, extensions vie privée) ou en panne :
- « Télécharger le PDF » plante silencieusement (`window.jspdf` indéfini) ;
- pire : **l'envoi au secrétariat plante aussi**, car `submitForm()` construit
  le rapport PDF avant l'envoi — le patient voit « L'envoi n'a pas abouti »
  avec pour seule issue… un téléchargement PDF qui ne marche pas non plus.

**Proposition** : servir `jspdf.umd.min.js` depuis `/public` (même version
2.5.1, fichier copié tel quel). Bénéfices : fiabilité, suppression du
sous-traitant cdnjs des mentions légales, un point de moins pour le RGPD.
En complément, si jsPDF est indisponible malgré tout, envoyer la demande SANS
le PDF joint plutôt que d'échouer (le dossier texte suffit au secrétariat).

### 1.4 Repli horaire du créneau paralysie (priorité moyenne)

Le court-circuit paralysie (lundi–jeudi avant 10 h → 24h, sinon 15) interroge
`/api/now` ; en cas d'échec réseau, le repli utilise **l'heure de l'appareil du
patient** (`new Date()`), pas l'heure de Paris. Un patient à l'étranger ou avec
une horloge déréglée peut être orienté « consultation demain matin » à tort —
dans le sens du sous-triage.

**Proposition** : le repli client peut calculer l'heure de Paris exactement
comme le worker, avec `Intl.DateTimeFormat("fr-FR", { timeZone: "Europe/Paris" })`
— API disponible dans tous les navigateurs cibles. Correctif de 3 lignes,
aucun texte modifié.

### 1.5 Plafond de dépense DUR (priorité moyenne)

`pickModel` bascule Opus → Sonnet au-delà de 50 €/mois, mais rien n'arrête la
dépense ensuite : en cas d'abus distribué (la limite est PAR IP), la facture
mensuelle est théoriquement non bornée.

**Proposition** : au-delà d'un second seuil (ex. 150 €/mois), `/api/chat`
renvoie 429 « limite » — le front affiche déjà un message adapté dans ce cas.
Seuil à fixer par RJ.

### 1.6 Divers (priorité basse, en lot)

- **Contrôle d'origine** sur `/api/chat` et `/api/send` : refuser les requêtes
  dont l'en-tête `Origin` existe et n'est pas le domaine du site — barrière
  simple contre l'utilisation du proxy IA par des tiers.
- **`/api/stats`** : comparaison de clé en temps constant (`crypto.subtle` ou
  comparaison XOR) — cosmétique, la clé n'est pas posée à ce jour.
- **Validation de l'âge** dans le formulaire initial : borner réellement 1–119
  à la soumission (aujourd'hui seul l'attribut HTML contraint, contournable).
- **`clean64`** (worker) : rejeter une pièce jointe dont le base64 est invalide
  plutôt que de la « nettoyer » silencieusement (risque de PJ corrompue).

---

## 2. UX — points nécessitant des TEXTES à valider mot à mot

### 2.1 Impasse du 429 en pleine conversation

Si le patient (ou son réseau : NAT d'entreprise, 4G partagée — la limite est
par IP) atteint 40 requêtes/jour EN COURS de dialogue, il reçoit « Le service a
atteint sa limite d'utilisation pour aujourd'hui » — sans carte de sortie, sans
PDF, sans recours. C'est une impasse sèche au milieu d'un parcours de soins.

**Proposition** : dans ce cas, afficher la carteBilan (elle existe déjà, textes
déjà validés : « Faites le point avec votre médecin traitant » + demande de
consultation possible) précédée d'une phrase courte À VALIDER, par exemple :
« Le service est très sollicité aujourd'hui et ne peut pas terminer l'analyse. »

### 2.2 Safety-netting par cluster incomplet

Déjà au PENDING Claude n° 4 du MEMOIRE : textes spécifiques sur les cartes MT,
Suivi et Programmée quand un cluster est partiellement coché. Textes à rédiger
et soumettre — je peux préparer une première version pour validation.

---

## 3. Observations doctrine (simples remarques, aucune action proposée sans arbitrage)

- **Fièvre cochée à l'écran A → carte 15 directe** : l'exception doctrine
  « chirurgie < 3 mois → urgences + prévenir le chirurgien » (`fievre_postop`)
  n'est atteignable que si la fièvre émerge en phase IA. Sur-triage assumé ?
  Si non : une sous-question « Avez-vous été opéré du dos dans les 3 derniers
  mois ? » après la case fièvre suffirait (textes à valider).
- **Trauma « accident de la route / chute de hauteur » < 24 h → 15 direct** :
  la nuance cinétique de REX-004 (choc modéré à l'arrêt → urgences) n'est
  appliquée que par l'IA. Même question : sur-triage assumé au formulaire ?

Ces deux courts-circuits vont dans le sens de la sécurité ; je les signale
uniquement pour que l'écart formulaire/doctrine soit un choix conscient.

---

## 4. Chantiers déjà ouverts (rappel, rien de nouveau)

1. **Grille G/U v0.2** (chantier B) — conception à soumettre AVANT tout code ;
   reste : place de l'hyperalgie, G max vs additif, implantation worker.
2. **Validation multi-praticiens** des 100 vignettes (kappa, consensus) → v1.0.
3. **Passe complète de confirmation** du prompt final (~6 €, optionnelle).
4. **PDF des arbres décisionnels** (doctrine v2) à régénérer.
5. Lancement : noindex, badge, achat du domaine, SEO (v3 du README).
6. **Re-test mobile du scénario sténose** par RJ (correctif du 09/08 à confirmer
   en conditions réelles).

---

## 5. Ordre de réalisation proposé

| # | Action | Type | Validation requise |
|---|---|---|---|
| 1 | Renouveler `ANTHROPIC_API_KEY` (avant le 24/08) | Ops | RJ (console + secret) |
| 2 | Révoquer la clé d'éval + secrets `/api/eval` | Ops | RJ |
| 3 | Garde troncature `<sortie>` (1.1) + repli modèle (1.2) | Code worker | Accord sur l'approche |
| 4 | jsPDF auto-hébergé + envoi sans PDF en secours (1.3) | Code front | Accord sur l'approche |
| 5 | Repli horaire Paris côté client (1.4) | Code front | Accord sur l'approche |
| 6 | Plafond dur de dépense (1.5) | Code worker | RJ fixe le seuil |
| 7 | Carte de sortie sur 429 en cours de dialogue (2.1) | Code front | Texte à valider mot à mot |
| 8 | Lot divers (1.6) | Code | Accord sur l'approche |
| 9 | Safety-netting clusters incomplets (2.2) | Textes | Textes à valider mot à mot |

Chaque étape code : petit diff, rejeu des sondes concernées du banc (non-
régression), push du fichier complet vérifié, `main` seulement après feu vert.
Les étapes 3–5 ne touchent AUCUN texte patient et ne changent AUCUNE règle
d'orientation — elles réduisent uniquement les pannes silencieuses.
