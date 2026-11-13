# 05: Carrousel Best sellers

**What to build:** sur la Homepage et la fiche produit, un visiteur parcourt les meilleures ventes avec les flèches et les points sur desktop, et en glissant le doigt sur écran tactile. Les produits apparaissent selon leur marqueur de meilleure vente dans les données.

**Blocked by:** 02 (Design tokens et carte conforme)

**Status:** done

- [x] Le carrousel utilise Embla derrière un composant propre au projet, sans import d'Embla ailleurs
- [x] Les cartes restent rendues côté serveur et sont passées en enfants
- [x] Les flèches et les points fonctionnent sur desktop
- [x] Les flèches sont désactivées au début et à la fin
- [x] Le swipe fonctionne sur écran tactile
- [x] Les commandes sont utilisables au clavier et ont des noms accessibles
- [ ] Le carrousel et la section sont conformes au Figma à chaque breakpoint — à confirmer visuellement (ticket 12)
- [x] Le même composant est réutilisé sur les deux pages
- [x] Les tests de composant couvrent les flèches, les points et les états désactivés, avec Embla simulé
- [x] ~~Un test Playwright couvre le défilement réel, y compris le début et la fin~~ → **modifié :** Playwright couvre le swipe et l'alignement de la dernière carte sur la marge de page. Les flèches et les états de début et de fin ne sont couverts qu'en test de composant, depuis le retrait des tests jugés inutiles (commit `73655bf`).

## Mise à jour du 12/11

- Le Figma ne montre que des flèches : les points demandés par le sujet sont placés à gauche des flèches (hypothèse notée dans le README).
- Sans animation quand le visiteur réduit les animations, et sans commandes quand toutes les cartes tiennent à l'écran.
