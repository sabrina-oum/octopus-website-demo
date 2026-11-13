# 09: Galerie et cartes de fonctionnalités

**What to build:** sur la fiche produit, un visiteur parcourt la galerie d'images et les cartes de fonctionnalités, conformes au Figma aux trois breakpoints.

**Blocked by:** 02 (Design tokens et carte conforme)

**Status:** done

- [x] La galerie et les cartes de fonctionnalités sont générées depuis les données
- [ ] La mise en page suit le Figma à chaque breakpoint et reste fluide entre eux — à confirmer visuellement (ticket 12)
- [x] Les images ont les bons ratios et ne provoquent aucun décalage de mise en page — largeur et hauteur du Figma, corrigées après un écart observé à 746 px
- [x] Les images sous la ligne de flottaison sont chargées en différé
- [x] Les images ont un texte alternatif pertinent — les images des cartes de fonctionnalités ont un alt vide, car leur titre décrit déjà ce qu'elles montrent
- [x] Aucun défilement horizontal n'apparaît — test Playwright sur plusieurs largeurs

## Mise à jour du 12/11

- Les photos de la galerie n'ont pas été fournies : le détourage du produit les remplace toutes les six, aux tailles du Figma. Chaque carte de fonctionnalité place donc son texte au-dessus de l'image (hypothèse notée dans le README).
