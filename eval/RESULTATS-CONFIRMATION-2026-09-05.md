# Passe de confirmation — 05/09/2026

**Prompt testé** : celui de PROD (commit 3d87dc5 — inclut le patch myélopathie REX n° 3
du 05/09). C'est la première mesure des 100 vignettes sur UN SEUL prompt, celui
réellement en ligne (le « 100/100 cumulé » d'août mélangeait deux versions proches).
**Référence** : vignettes.json + arbitrages-2. **Banc** : eval/banc-confirmation.mjs,
détail par vignette dans eval/resultats-confirmation.json.

## Résultat : 97/100 — coût 8,04 $

Sécurité : « 15 » 11/11 · aucune vignette sans sortie · aucun manqué critique.
Les 3 écarts sont tous d'UN cran, chacun sur une frontière connue.

| V | Attendu → obtenu | Analyse | Micro-question pour RJ |
|---|---|---|---|
| 19 | consult → mt/radiculalgie_filiere | NCB stable, supportable, « depuis 1 mois » : l'IA l'a rangée sous « récente < ~4 semaines → mt filière » ; la référence attendait « > 4-6 semaines stable → consult ». Cas pile sur la frontière ; sous-triage d'un cran mais vers la carte filière (le patient reste dans le circuit). | Où classer « environ 1 mois » ? Proposition : à exactement ~4 semaines, choisir la filière MT (traitement d'épreuve d'abord) — ou abaisser la frontière à « > 4 semaines → consult » ? |
| 22 | 72h → 24h/myelopathie | Myélopathie documentée (canal étroit serré + souffrance médullaire) avec chutes, SANS aggravation rapide : le patch du 05/09 range « chutes récentes » dans la branche 24h. Sur-triage d'un cran — effet de bord du patch REX n° 3, qui recoupe la question déjà ouverte « seule règle 24h restante ». | Chutes récentes chez une myélopathie documentée qui ne s'aggrave PAS vite : 24h (prudence chutes) ou 72h (la vitesse commande) ? |
| 57 | consult → 72h/tassement | Ostéoporotique, tassements connus, douleur qui « change de caractère » mais s'installe PROGRESSIVEMENT : l'IA a appliqué « inhabituelle → 72h » sans le verrou REX-008 (les règles tassement exigent un début BRUTAL, datable). L'arbitrage RJ du 07/08 disait consult 10-15 j. | Confirmer que « inhabituelle » exige AUSSI un début brutal/datable, et qu'un changement progressif chez l'ostéoporotique connu → consult 10-15 j ? |

## Statut

- Cette passe devient la **référence chiffrée officielle** du prompt en prod
  (préalable exigé avant toute migration de modèle).
- Les 3 micro-questions sont soumises à RJ ; chaque arbitrage éventuel sera suivi
  d'un rejeu ciblé (vignette + contre-épreuves) avant re-mesure.
- Clé d'évaluation : à conserver le temps des micro-arbitrages, puis RÉVOQUER
  (+ suppression des secrets ANTHROPIC_EVAL_KEY / EVAL_TOKEN).
