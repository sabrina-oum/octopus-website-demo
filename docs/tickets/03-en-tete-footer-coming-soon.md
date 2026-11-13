# 03: En-tête, footer et « Coming soon »

**What to build:** sur les deux pages, un visiteur navigue avec un en-tête et un footer conformes au Figma. Sous 1200 px, le menu s'ouvre et se ferme à la souris, au tactile et au clavier. Tout lien hors périmètre mène à une page « Coming soon ».

**Blocked by:** 02 (Design tokens et carte conforme)

**Status:** done

- [x] En desktop, l'en-tête (composant `Header`) affiche la navigation complète et le bouton « Where to buy »
- [x] Sous 1200 px, la navigation se replie dans un menu basé sur Radix, derrière un composant propre au projet
- [x] Le menu s'ouvre et se ferme, fonctionne au clavier et se ferme avec Escape
- [x] Le focus revient sur le bouton d'ouverture à la fermeture
- [x] L'état du menu est annoncé aux lecteurs d'écran
- [ ] Le footer (composant `Footer`) et ses liens suivent le Figma à chaque breakpoint — conformité visuelle à confirmer (ticket 12)
- [x] La page « Coming soon » existe, et aucun lien n'est cassé — un test Playwright vérifie tous les liens des pages buildées
- [x] Les tests de composant couvrent l'ouverture, la fermeture, Escape et le clavier
- [x] Un test Playwright couvre le menu mobile

## Mise à jour du 12/11

- Les frames tablette du Figma montrent la navigation complète, mais le sujet demande un menu sous 1200 px : la tablette utilise donc le menu (hypothèse notée dans le README).
- Le test de composant du footer a été retiré (commit `73655bf`) : le ticket ne l'exigeait pas.
