# Banc de concordance — Passe n°2 (07/08/2026, soir)

**Prompt testé** : src/worker.js commit b60c57c (11 règles arbitrées du 07/08 encodées).
**Référence** : vignettes.json + révisions v2 (43 mt · 19 consult · 20 72h · 10 «15» · 4 urgences · 1 24h · 3 suivi).

## Résultat : 93/100 (passe n°1 : 82/100 ; mesure manuelle initiale : 62 %)

Sécurité : « 15 » 10/10 · paralysie 24h 1/1 · aucune sortie manquante · 3,0 tours moyens.
Motifs attendus : v9 et v33 → radiculalgie_filiere ✓ · v30 → tassement_mt ✓ · v43 et v74 → cancer_mt ✓ (5/5).
Coût passe n°2 : 6,19 $ (~5,7 €). Coût cumulé campagne : ~11,3 $ (~10,4 €).

## Les 7 écarts restants — tous des questions de PRÉCÉDENCE ou de SEUIL entre règles validées (micro-arbitrages à soumettre à RJ)

| V | Attendu → obtenu | Analyse | Micro-question pour RJ |
|---|---|---|---|
| 17 | 72h → mt/cancer_mt | La branche « drapeau rouge insomniant » (→ mt) a primé sur la branche « radiculalgie aggravée chez cancer terminé » (→ 72h) : les deux s'appliquent à ce cas. | Préciser que le drapeau rouge concerne les douleurs AXIALES, les radiculalgies suivant leur propre branche (72h) ? |
| 41 | consult → 72h/hyperalgique | Sur-triage d'un cran : « s'aggrave depuis 4 mois » + douleur forte → l'IA a choisi hyperalgique/72h ; l'arbitrage RJ disait consult 15 j. Tension entre « s'aggravant → consult » (règle radiculalgie) et « aggravation récente → 72h » (règle d'hésitation). | Pour les radiculalgies > 6 semaines : aggravation LENTE → consult (bas de fourchette) ; seule la vraie hyperalgie résistante → 72h ? |
| 56 | 72h → mt/trauma | **LE SEUL SOUS-TRIAGE À CORRIGER EN PRIORITÉ** : fracture L1 VUE au scanner, corset, douleur mal calmée → l'IA a appliqué « déjà bilanté → mt » alors que cette règle exige une imagerie NORMALE. Régression de la passe 1 (24h → mt). | Clarifier : « déjà bilanté avec imagerie NORMALE → mt ; si l'imagerie a MONTRÉ une fracture → règles du tassement documenté (72h si mal calmée) ». |
| 66 | mt → consult/candidat | Les 3 marqueurs de typicité étaient présents à la lettre (périmètre 2 km chiffrable, un arrêt obligé) alors que RJ voulait mt (périmètre conservé). | Ajouter un seuil de retentissement : périmètre franchement limité (quelques centaines de mètres) ou en réduction → consult ; périmètre conservé (≥ 1-2 km) stable → mt ? |
| 69 | suivi → mt/ancienne_stable | L'IA n'a pas rangé « discopathie L4-L5 + L5-S1 à l'IRM, kiné, 4/10 permanent » dans « lésion structurale documentée ». | Confirmer que la discopathie documentée à l'IRM suffit à « suivi » (ou exiger « évoluée/Modic ») ? |
| 86 | urgences → 15/extra_rachidien | Sur-triage d'un cran : douleur thoracique en barre + essoufflement → l'IA a suivi « oppression thoracique → 15 ». Cliniquement défendable (suspicion vasculaire/embolie). | Assumer le 15 (et réviser la référence v86 → 15) ou maintenir urgences ? |
| 91 | consult → mt/radiculalgie_filiere | La nouvelle règle « en amélioration → mt » a primé, alors que l'arbitrage v91 voulait consult ~15 j (premier bilan/éducation devant une hernie volumineuse concordante à l'IRM). | Exception : « radiculalgie documentée avec hernie volumineuse concordante → consult même en amélioration » ? |

## Journal des décisions : à mettre à jour en début de prochaine session avec ces 7 points + le résultat 93/100.
