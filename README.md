# Urgence Rachis — urgence-rachis.fr (prototype)

Site d'orientation des urgences du rachis — **Espace Francilien du Rachis**
(Dr Lamerain, Dr Jameson, Dr Travert, Dr Arvieu).

Le site trie les patients selon des règles médicales validées et les oriente vers :
le 15 / les urgences, une consultation sous 24 h (créneaux Doctolib cachés),
une consultation rapide 48–72 h, ou le site principal [rachis.paris](https://rachis.paris).

## État : v1 — prototype en cours de validation médicale

- ✅ Arbre décisionnel statique (`index.html`, aucune dépendance, aucun secret)
- ✅ Règles de triage passe 1 validées par le Dr Jameson (juillet 2026) — voir ci-dessous
- ⏳ Passe 2 en attente : critères du niveau 3 (seuil 4 vs 6 semaines, définition
  « traitement bien conduit », critère hyperalgique, place de l'IRM déjà faite)
- ⏳ Liens Doctolib cachés à créer et à renseigner dans `LINKS` en tête du `<script>`
- ⏳ Charte graphique : variables CSS `:root` à aligner sur les couleurs exactes de rachis.paris

## Règles de triage validées (passe 1)

| Situation | Orientation |
|---|---|
| Troubles sphinctériens / anesthésie de la selle | **15** immédiat |
| Fièvre + douleur rachidienne | **Urgences, sans exception** |
| Paralysie complète brutale — conversation un **ven/sam** | Urgences |
| Paralysie complète brutale — autres jours (dim inclus) | Consultation **tôt le lendemain** (1er créneau) |
| Perte de force partielle/récente | Consultation **24 h** |
| Myélopathie cervicale (maladresse 2 mains, marche, Lhermitte) | Consultation **24 h** + IRM cervicale |
| Trauma haute énergie **< 24 h** | Urgences |
| Trauma haute énergie **> 24 h** | Consultation rapide |
| Trauma faible énergie (susp. tassement ostéoporotique) | Consultation **72 h** |
| Cancer **< 5 ans** + douleur nouvelle | Consultation **72 h** + IRM (ou oncologue si dispo) |
| Cancer > 5 ans | Triage population générale |
| Critères niveau 3 (provisoires) | Consultation **48–72 h** |
| Aucun critère | Orientation rachis.paris |

Verrou permanent affiché à chaque sortie consultation : aggravation (fièvre,
perte de force, troubles urinaires, paralysie) → **15**.

## Déploiement

Cloudflare Pages branché sur ce dépôt (branche `main`) → republication automatique
à chaque commit. Domaine cible : `urgence-rachis.fr` (à acheter, DNS → Cloudflare).

## Roadmap

1. **v1** (ce dépôt) : arbre décisionnel statique — validation par l'équipe
2. **v2** : couche IA conversationnelle — Cloudflare Worker détenant la clé API
   Anthropic en secret chiffré + le prompt système côté serveur + rate limiting.
   La clé API ne doit **jamais** apparaître dans ce dépôt ni dans le frontend.
3. **v3** : SEO — pages d'atterrissage par situation (sciatique hyperalgique,
   tassement ostéoporotique, IRM rapide…), Schema.org, Search Console, maillage
   depuis rachis.paris et institutdurachis.com.

## ⚠️ Rappels avant mise en production

- Retirer la balise `<meta name="robots" content="noindex">` de `index.html`
- Retirer le badge « Prototype » du footer
- Remplacer les liens Doctolib placeholder
- Valider la passe 2 des critères de triage
- Compléter mentions légales + RGPD
