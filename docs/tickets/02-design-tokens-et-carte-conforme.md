# 02: Design tokens et carte conforme

**What to build:** les fondations visuelles du Figma sont en place, et un visiteur voit une carte produit fidèle au design aux trois breakpoints. Ce ticket sert de préparation à tous les tickets visuels.

**Blocked by:** 01 (Parcours minimal déployé)

**Status:** done

- [x] Les couleurs, typographies et espacements sont relevés dans le Figma avec une session connectée, sans contourner la restriction d'export
- [x] Ces tokens sont définis une seule fois dans le thème Tailwind
- [x] Les breakpoints sont calés sur 810 et 1200 px
- [x] Les marges de page sont de 16, 32 et 48 px selon le breakpoint, avec une largeur maximale de 1344 px en desktop
- [x] La police du Figma est identifiée et chargée, ou l'équivalent libre le plus proche est choisi et noté comme hypothèse — Satoshi, auto-hébergée
- [x] Le bouton et ses états (survol, focus, désactivé) suivent le design system
- [x] Le composant `Icon` encapsule Lucide, aux tailles et traits des icônes de 16 et 24 px
- [ ] La carte produit est rendue depuis les données et conforme au Figma à chaque breakpoint — rendu depuis les données vérifié, conformité visuelle à confirmer (ticket 12)
- [x] Le composant image évite tout décalage de mise en page, avec les bons ratios
- [x] Les images utilisées sont copiées dans le projet avec des noms lisibles
- [x] Un test de composant vérifie le rendu de la carte depuis les données et son lien « Learn more »

## Mise à jour du 12/11

- L'anneau de focus est opaque, et non à 35 % comme dans le Figma, pour respecter le contraste WCAG AA (hypothèse notée dans le README).
