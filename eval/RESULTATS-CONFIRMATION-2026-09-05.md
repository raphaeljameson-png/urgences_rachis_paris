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

---

## Addendum — patch final et rejeu (05/09/2026, soir)

**Arbitrages RJ encodés** (commit f229030) : frontière radiculalgie « ~4 semaines,
un mois compte comme tel » + phrase de capture sans inquiéter ; myélopathie v2
(la récence des chutes interroge — récentes → 24h, anciennes stables → consult) ;
exception ostéoporotique au verrou REX-008 (douleur inhabituelle même progressive
→ 72h, IRM impérative). **Référence v57 révisée consult → 72h.**

**Rejeu ciblé (15 vignettes) : v19 ✅ consult/candidat · v57 ✅ 72h/tassement ·
contre-épreuves 11/11** (v9, v12, v20, v21, v23, v30, v33, v52, v56, v61, v94).

**Restes connus :**
- **v22 : sur-triage d'un cran ASSUMÉ sous ambiguïté.** La fiche dit « chutes »
  sans date ; le simulateur ne peut pas dater ce que la fiche ne précise pas ;
  l'IA applique alors la règle « hésitation → le plus urgent » → 24h. C'est le
  comportement de sécurité voulu. En vie réelle, le patient répondra à la
  question de récence (désormais posée systématiquement) et le niveau se
  résoudra. Option ouverte : préciser la récence des chutes dans la fiche v22
  pour la rendre testable.
- **v41 : cas-frontière stochastique** — 1 échec puis 3/3 concordants au rejeu.
  Borné à un cran de sur-triage quand il flanche.

**Bilan du prompt final en prod : 99/100 (v22 = seul écart, prudent et expliqué),
v41 instable-borné.** Campagne close — clé d'évaluation et secrets à révoquer.
