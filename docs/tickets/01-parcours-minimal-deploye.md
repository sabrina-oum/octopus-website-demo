# 01: Parcours minimal déployé

**What to build:** un visiteur arrive sur la Homepage, voit un produit issu des données sous forme de carte, clique sur « Learn more » et arrive sur la fiche de ce produit, accessible par son slug. Le rendu reste volontairement minimal : ce ticket prouve que toute la chaîne fonctionne, des données au site en ligne, avec les tests.

**Blocked by:** None (can start immediately)

**Status:** done

- [x] Le projet utilise Next.js (App Router), TypeScript strict sans `any`, Yarn et Tailwind v4
- [ ] Le dépôt Git local est initialisé, avec le matériel fourni et les tickets exclus du suivi — ni `material/` ni `.scratch/` ne sont suivis, mais leurs lignes dans `.gitignore` ne sont pas encore commitées
- [x] Les données viennent d'un fichier JSON local, lu uniquement par des fonctions asynchrones
- [x] Le JSON est validé par un schéma Zod, et une entrée invalide fait échouer le build avec un message clair
- [x] Les types des modèles dérivent des schémas
- [x] ~~La fiche produit est générée au build à partir du slug du Countertop Blender~~ → **modifié :** chaque produit a sa fiche, générée au build à partir de son slug
- [x] Les pages sont bien générées au build
- [x] Les tests de la couche de données couvrent des données valides, une entrée invalide et un slug inconnu
- [x] Un test Playwright couvre le parcours Homepage → « Learn more » → fiche produit
- [x] `yarn test` lance Vitest et Playwright en une seule commande
- [x] Après accord de Sabrina, le dépôt public `octopus-website-demo` existe, et elle le relie à Vercel avec son compte
- [x] Le site déployé montre le parcours fonctionnel

## Mise à jour du 12/11

- Changement de périmètre : toutes les fiches produit sont construites avec le même modèle. Les cartes mènent chacune à leur propre fiche, et seule celle du Countertop Blender suit un design Figma (voir l'hypothèse « Product pages » du README).
- Les deux derniers commits locaux (`73655bf`, `27f105f`) ne sont pas encore poussés : le site en ligne ne les contient pas encore.
