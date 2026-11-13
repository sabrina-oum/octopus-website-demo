# 11: Animations et finitions

**What to build:** en faisant défiler les pages, un visiteur voit les contenus apparaître comme le décrit la Motion Documentation du Figma, avec des états de survol cohérents. Les visiteurs qui réduisent les animations n'ont qu'un fondu, et le contenu reste visible sans JavaScript.

**Blocked by:** 04 (Hero de la Homepage et SEO), 05 (Carrousel Best sellers), 06 (Sections catégories), 07 (Explore all categories et Find us at), 08 (Hero de la fiche produit et SEO), 09 (Galerie et cartes de fonctionnalités), 10 (Accordéon des spécifications)

**Status:** done — 2 points ouverts

- [x] Un composant `Reveal` maison anime les éléments, sans librairie d'animation
- [x] L'animation se déclenche à l'entrée dans l'écran, une seule fois, sans sortie
- [x] L'effet est un fondu avec une montée de 60 px, ou 30 px pour le texte seul
- [x] La transition est en `ease-out`, sur 1,2 s avec 0,1 s de délai
- [x] Les éléments d'une même section apparaissent ensemble
- [ ] Les éléments concernés suivent les blocs « Applies to » du Figma, hors pages non construites — `Reveal` entoure le hero, les sections catégories, « Explore all categories », le hero produit, la galerie, les cartes de fonctionnalités et les spécifications, mais pas le carrousel Best sellers, que le Figma liste (« H03 Best sellers carousel »), ni le bandeau « Find us at ». À vérifier dans la Motion Documentation.
- [x] Avec `prefers-reduced-motion`, seule l'opacité change
- [x] Le contenu reste visible si le JavaScript ne se charge pas — rien n'est masqué quand les scripts sont désactivés, et le contenu s'affiche après 3 s si le script ne se charge pas
- [x] Les états de survol et les transitions d'images suivent le design
- [ ] Le score Lighthouse mobile de la Homepage est mesuré après l'ajout, et toute baisse sous 90 est signalée à Sabrina avec une proposition pour le hero — aucun rapport Lighthouse dans le dépôt

## Mise à jour du 12/11

- Le test Playwright de `Reveal` a été retiré (commit `73655bf`) : l'animation n'est plus couverte par un test automatisé.
