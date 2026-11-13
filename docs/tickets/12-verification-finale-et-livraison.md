# 12: Vérification finale et livraison

**What to build:** un évaluateur d'Octopus reçoit un site en ligne vérifié, un dépôt clair, des tests lancés en une commande, un README honnête et les rapports Lighthouse demandés.

**Blocked by:** 03 (En-tête, footer et « Coming soon »), 11 (Animations et finitions)

**Status:** ready-for-agent — à faire avant vendredi 13/11, 17 h

- [ ] Les 10 critères d'acceptation du sujet sont vérifiés un par un sur le site déployé
- [ ] Les deux pages sont vérifiées aux trois breakpoints et entre eux, sans défilement horizontal — le défilement horizontal est déjà testé par Playwright sur les deux pages ; il reste les points visuels à confirmer listés plus bas
- [ ] Le fonctionnement est vérifié sur les derniers Chrome, Safari, Firefox et Edge, sur iOS Safari et Android Chrome, et tout navigateur non testé est signalé — Playwright ne tourne que sur Chromium
- [ ] Lighthouse Performance atteint au moins 90 sur la Homepage en mobile
- [ ] Lighthouse Accessibility atteint au moins 90
- [ ] Le clavier, le focus visible, les textes alternatifs et les contrastes WCAG AA sont vérifiés
- [ ] `yarn test` passe depuis une installation propre — le README indique d'installer d'abord Chromium pour Playwright
- [ ] Le README couvre l'installation, l'architecture, les composants, les compromis, les hypothèses et les améliorations possibles — toutes les parties existent ; voir les corrections plus bas
- [x] La section IA du README décrit les outils utilisés, les parties concernées et les vraies corrections du journal
- [ ] Les rapports Lighthouse mobile des deux pages sont joints au dépôt — le README indique encore « _to add_ »
- [x] Les icônes d'Octopus remplacent Lucide si elles ont été reçues, sinon l'hypothèse est notée
- [ ] Le dossier de matériel fourni et aucun secret ne figurent dans le dépôt public — rien n'est suivi aujourd'hui, mais les lignes `.gitignore` de `material/` et `.scratch/` ne sont pas commitées
- [ ] Sabrina dispose du lien du dépôt et du lien en ligne pour les envoyer à Octopus

## Points ouverts relevés le 12/11

1. **Commiter les lignes `.gitignore`** de `material/` et `.scratch/` avant tout `git add .`, pour ne pas publier le sujet, la spec et les tickets.
2. **Terminer et commiter le travail `cardText`** en cours (voir ticket 06).
3. **Pousser les commits locaux** (`73655bf`, `27f105f` et les suivants), puis vérifier le déploiement Vercel.
4. **Mesurer Lighthouse mobile** sur les deux pages du site déployé, joindre les rapports et remplacer « _to add_ » dans le README.
5. **Corriger le README** : la partie « With more time » propose encore de sortir les libellés de catégories du code, ce qui est fait depuis le commit `3706598`.
6. **Animation des Best sellers :** décider si le carrousel et le bandeau « Find us at » doivent être entourés de `Reveal` (voir ticket 11).
7. **Conformité visuelle à confirmer** aux trois breakpoints et entre eux : carte produit (02), footer (03), hero de la Homepage (04), carrousel (05), sections catégories (06), « Find us at » (07), hero produit (08), galerie (09) et accordéon (10).
