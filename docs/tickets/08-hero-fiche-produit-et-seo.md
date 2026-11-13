# 08: Hero de la fiche produit et SEO

**What to build:** sur la fiche du Countertop Blender, un visiteur voit le titre, la description, le sélecteur de couleur et « Where to buy ». Choisir une couleur met à jour l'état sélectionné, et la page expose ses métadonnées.

**Blocked by:** 02 (Design tokens et carte conforme)

**Status:** done

- [ ] Le hero suit le Figma à chaque breakpoint — à confirmer visuellement (ticket 12)
- [x] Le titre, la description et les couleurs viennent des données
- [x] Sélectionner une couleur met à jour l'état sélectionné
- [x] Le sélecteur fonctionne au clavier — flèches du clavier, comme un groupe de boutons radio
- [x] La couleur choisie est annoncée aux lecteurs d'écran et ne dépend pas de la seule perception des couleurs — son nom est écrit en texte
- [x] « Where to buy » suit les états du design system
- [x] La page a un titre, une description et des balises Open Graph issus des données — test Playwright
- [x] Un test de composant couvre la mise à jour de la couleur sélectionnée

## Mise à jour du 12/11

- Les données listent les couleurs Black et White : le Figma cache une seconde pastille blanche. La photo reste la même, faute de photo blanche (hypothèse notée dans le README).
- En mobile, « Where to buy » est une barre fixe en bas de l'écran, comme dans le Figma. Le Figma desktop superpose la description et « Colour - Black » : la page les empile, comme la frame tablette.
- Chaque fiche peut surcharger ses champs SEO un par un. Sinon, ils reprennent le nom, la description courte et l'image de partage du site.
