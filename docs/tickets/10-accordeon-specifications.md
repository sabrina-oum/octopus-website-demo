# 10: Accordéon des spécifications

**What to build:** sur la fiche produit, un visiteur déplie et replie Technical specifications, Dimensions & weight, Product information et Downloads, à la souris, au tactile et au clavier.

**Blocked by:** 02 (Design tokens et carte conforme)

**Status:** done

- [x] L'accordéon utilise Radix derrière un composant propre au projet, sans import de Radix ailleurs
- [x] ~~Les quatre sections sont générées depuis les données~~ → **modifié :** les trois sections dépliables viennent des données. Downloads est une carte à part, non dépliable, comme dans le Figma.
- [x] Les sections s'ouvrent et se ferment à la souris, au tactile et au clavier
- [x] L'état ouvert ou fermé est annoncé aux lecteurs d'écran
- [ ] L'accordéon suit le Figma à chaque breakpoint — à confirmer visuellement (ticket 12)
- [x] Les tests de composant couvrent l'ouverture, la fermeture, ARIA et le clavier

## Mise à jour du 12/11

- Toutes les sections sont ouvertes au chargement.
- Le manuel n'a pas été fourni : le lien ouvre, dans un nouvel onglet, un PDF d'une page tiré des spécifications, qui le précise (hypothèse notée dans le README).
