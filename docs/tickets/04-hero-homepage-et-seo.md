# 04: Hero de la Homepage et SEO

**What to build:** un visiteur arrive sur une Homepage dont le hero présente l'Octopus Ionic Hair Dryer, fidèle au Figma aux trois breakpoints, et la page expose ses métadonnées.

**Blocked by:** 02 (Design tokens et carte conforme)

**Status:** done

- [ ] Le hero est conforme au Figma à chaque breakpoint et s'adapte de façon fluide entre eux — à confirmer visuellement (ticket 12)
- [x] Son contenu vient des données, pas du balisage
- [x] Le visuel principal est chargé en priorité, sans décalage de mise en page — le poster de la vidéo est préchargé en priorité dès qu'une vidéo est fournie
- [x] Aucun défilement horizontal n'apparaît — test Playwright sur plusieurs largeurs
- [x] La page a un titre, une description et des balises Open Graph — test Playwright

## Mise à jour du 12/11

- Les fichiers vidéo du hero n'ont pas été fournis : le hero affiche un dégradé gris, et ajouter une entrée `video` dans les données de la Homepage active la vidéo (hypothèse notée dans le README).
