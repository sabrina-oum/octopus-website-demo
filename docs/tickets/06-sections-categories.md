# 06: Sections catégories

**What to build:** un visiteur explore les sections Kitchen, Hair Care, Home Security et Accessories de la Homepage. Chacune suit la mise en page du Figma, et ajouter un produit aux données suffit à l'afficher dans la bonne section.

**Blocked by:** 02 (Design tokens et carte conforme)

**Status:** done

- [x] Les quatre sections sont générées depuis les données
- [x] L'en-tête de section est un composant réutilisable, `SectionHeader`, distinct du `Header` du site
- [ ] La grande carte mise en avant et les petites cartes suivent le Figma à chaque breakpoint — à confirmer visuellement (ticket 12)
- [x] Les rangées deviennent des colonnes empilées en mobile — test Playwright
- [x] Les bannières de catégorie utilisent l'image prévue pour chaque breakpoint — test Playwright
- [x] Les images sous la ligne de flottaison sont chargées en différé, sans décalage de mise en page
- [x] ~~Ajouter un produit au JSON l'affiche dans la bonne section, sans modifier le balisage~~ → **modifié :** les sections sont choisies à la main. Un produit ajouté au JSON apparaît dès que son id est ajouté à une section des données de la Homepage, sans modifier le balisage.
- [x] ~~Tous les « Learn more » mènent à la fiche du Countertop Blender~~ → **modifié :** chaque « Learn more » mène à la fiche de son propre produit

## Mise à jour du 12/11

- Les catégories viennent désormais de leur propre fichier JSON, et non plus du code (commit `3706598`).
- **En cours, non commité :** un champ `cardText` permet à une section de donner à ses cartes un autre nom ou une autre description que ceux du produit, comme le fait le Figma. Une entrée `cardText` pour un produit absent de la section fait échouer le build. Les modifications touchent les données et le schéma de la Homepage, la couche de données, les tests et le README.
- Les photos lifestyle du Figma n'ont pas été fournies : les photos « Category » les remplacent, et le texte posé sur ces photos repose sur un bandeau de la couleur de la photo (hypothèses notées dans le README).
