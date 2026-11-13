# Spec : démo du site Octopus (test technique Product Engineer Web)

Statut : `ready-for-agent` (fichier local, aucun outil de tickets configuré)
Échéance : vendredi 13 novembre 2026 à 17 h, objectif interne jeudi 12 au soir

## Problem Statement

Sabrina a reçu un test technique pour un poste de Product Engineer Web. Elle doit livrer une petite démo du site d'électronique grand public Octopus : la Homepage et la fiche produit du Countertop Blender, fidèles au Figma sur trois breakpoints.

La difficulté n'est pas le volume de pages, mais le niveau d'exigence sur peu de temps : fidélité au design, comportement responsive, composants réutilisables pilotés par les données, performance, accessibilité, tests et documentation. Les outils d'IA sont obligatoires, mais Sabrina doit pouvoir expliquer chaque partie du code et défendre ses compromis lors d'un appel de revue de 45 minutes.

Le fichier Figma a l'export, la copie et le partage désactivés. Les valeurs de design ne se lisent que dans l'interface, avec une session connectée. Les images et logos sont fournis à part, mais pas les icônes.

## Solution

Un site Next.js généré au build, déployé sur Vercel, dont les deux pages reproduisent le Figma à chaque breakpoint et s'adaptent de façon fluide entre eux.

Le contenu vient d'un fichier JSON local validé au build, de sorte qu'ajouter un produit aux données suffit à l'afficher dans la bonne section. Les composants sont réutilisés sur les deux pages et les tokens du Figma sont définis une seule fois. Les éléments interactifs fonctionnent à la souris, au tactile et au clavier.

Le travail avance par petits lots relus par Sabrina avant chaque commit, afin qu'elle connaisse le code à l'arrivée et que la section du README sur l'usage de l'IA repose sur de vraies corrections.

## User Stories

### Navigation et en-tête

1. En tant que visiteur sur desktop, je veux voir la navigation complète et le bouton « Where to buy », afin d'accéder directement aux sections principales.
2. En tant que visiteur sous 1200 px, je veux que la navigation se replie dans un menu, afin que l'en-tête reste lisible sur un petit écran.
3. En tant que visiteur mobile, je veux ouvrir et fermer le menu d'un geste, afin de naviguer sans perdre ma place.
4. En tant qu'utilisateur du clavier, je veux ouvrir le menu, le parcourir et le fermer sans souris, afin d'accéder à toute la navigation.
5. En tant qu'utilisateur du clavier, je veux que la touche Escape ferme le menu et que le focus revienne sur son bouton d'ouverture, afin de ne pas perdre ma position.
6. En tant qu'utilisateur de lecteur d'écran, je veux que l'état ouvert ou fermé du menu soit annoncé, afin de comprendre ce qui se passe.

### Homepage

7. En tant que visiteur, je veux voir un hero consacré à l'Octopus Ionic Hair Dryer, afin de découvrir immédiatement le produit mis en avant.
8. En tant que visiteur, je veux parcourir les meilleures ventes, afin de repérer rapidement les produits populaires.
9. En tant que visiteur sur desktop, je veux faire défiler le carrousel avec des flèches, afin de voir tous les produits.
10. En tant que visiteur sur desktop, je veux que les flèches soient désactivées au début et à la fin du carrousel, afin de savoir quand il n'y a plus rien à voir.
11. En tant que visiteur, je veux des points de pagination, afin de savoir où j'en suis dans le carrousel.
12. En tant que visiteur sur écran tactile, je veux faire défiler le carrousel en glissant le doigt, afin d'utiliser un geste naturel.
13. En tant qu'utilisateur du clavier, je veux atteindre et utiliser les commandes du carrousel, afin d'accéder aux mêmes produits que les autres visiteurs.
14. En tant que visiteur, je veux voir les sections Kitchen, Hair Care, Home Security et Accessories, afin d'explorer l'offre par catégorie.
15. En tant que visiteur sur desktop et tablette, je veux une grande carte mise en avant accompagnée de cartes plus petites, comme dans le design, afin de comprendre la hiérarchie des produits.
16. En tant que visiteur mobile, je veux que les rangées deviennent des colonnes empilées, afin de lire les cartes confortablement.
17. En tant que visiteur, je veux que chaque carte affiche le nom, la description courte et l'image du produit, afin de décider si elle m'intéresse.
18. En tant que visiteur, je veux que « Learn more » sur le Countertop Blender ouvre sa fiche, afin d'en savoir plus.
19. En tant que visiteur, je veux que « Learn more » sur les autres produits mène aussi à la fiche disponible, afin de ne jamais tomber sur un lien cassé.
20. En tant que visiteur, je veux utiliser les tuiles « Explore all categories », afin d'aller vers une catégorie ou une page d'attente.
21. En tant que visiteur, je veux voir le bandeau « Find us at », afin de savoir que des points de vente existent.
22. En tant que visiteur, je veux un footer conforme au design à chaque breakpoint, afin de retrouver les liens secondaires.

### Fiche produit

23. En tant que visiteur, je veux voir le titre, la description, le sélecteur de couleur et « Where to buy », afin de comprendre le produit et la marche à suivre.
24. En tant que visiteur, je veux choisir une couleur et voir l'état sélectionné se mettre à jour, afin de savoir quelle option est active.
25. En tant qu'utilisateur du clavier ou de lecteur d'écran, je veux utiliser le sélecteur et connaître la couleur choisie, afin de ne pas dépendre de la seule perception des couleurs.
26. En tant que visiteur, je veux parcourir la galerie d'images et les cartes de fonctionnalités, afin de comprendre les atouts du produit.
27. En tant que visiteur, je veux déplier et replier Technical specifications, Dimensions & weight, Product information et Downloads, afin de lire seulement ce qui m'intéresse.
28. En tant qu'utilisateur du clavier, je veux piloter ces sections sans souris, afin d'accéder à tout leur contenu.
29. En tant qu'utilisateur de lecteur d'écran, je veux entendre si une section est ouverte ou fermée, afin de savoir où j'en suis.
30. En tant que visiteur, je veux retrouver le carrousel Best sellers en bas de fiche, afin de continuer à explorer.

### Responsive, visuel et performance

31. En tant que visiteur, je veux que les pages restent propres à n'importe quelle largeur, y compris entre les breakpoints, afin de ne jamais voir de mise en page cassée.
32. En tant que visiteur, je ne veux jamais de défilement horizontal de la page, afin de garder une lecture confortable.
33. En tant que visiteur sur connexion mobile, je veux que les pages se chargent vite, afin de ne pas attendre.
34. En tant que visiteur, je veux que les images aient le bon format et que la page ne saute pas pendant leur chargement, afin de garder ma position.
35. En tant que visiteur, je veux que les contenus apparaissent avec l'animation prévue au défilement, afin de profiter de l'expérience conçue.
36. En tant que visiteur sensible aux mouvements, je veux que l'animation se limite à un fondu lorsque j'ai activé la réduction des animations, afin d'éviter l'inconfort.
37. En tant que visiteur, je veux voir le contenu même si le JavaScript ne se charge pas, afin que le site reste utilisable.
38. En tant que visiteur, je veux voir des états de survol et de focus cohérents avec le design, afin de savoir sur quoi j'agis.
39. En tant que visiteur sur les derniers Chrome, Safari, Firefox, Edge, iOS Safari ou Android Chrome, je veux le même fonctionnement, afin de ne pas être pénalisé par mon navigateur.

### Liens hors périmètre et référencement

40. En tant que visiteur, je veux qu'un lien vers une page non construite mène à une page « Coming soon », afin de comprendre que le contenu n'existe pas encore.
41. En tant que moteur de recherche, je veux un titre et une description propres à chaque page, afin d'indexer correctement le contenu.
42. En tant que personne partageant un lien, je veux des balises Open Graph sur les deux pages, afin que l'aperçu soit soigné.

### Contenu et maintenance

43. En tant que développeuse, je veux ajouter un produit dans les données pour qu'il apparaisse dans la bonne section, afin de ne pas modifier le balisage.
44. En tant que développeuse, je veux qu'une donnée invalide fasse échouer le build avec un message clair, afin qu'une erreur de contenu n'arrive pas en production.
45. En tant que développeuse, je veux que les pages n'accèdent aux données que par des fonctions asynchrones, afin de pouvoir brancher plus tard une API ou un CMS sans les modifier.
46. En tant que développeuse, je veux des tokens de design définis une seule fois, afin de changer une valeur à un seul endroit.
47. En tant que développeuse, je veux que Radix et Embla restent internes à nos composants, afin de pouvoir remplacer une librairie sans toucher aux pages.
48. En tant que développeuse, je veux qu'une fiche produit soit créée à partir d'un slug, afin d'ajouter facilement d'autres fiches.
49. En tant que développeuse, je veux des modèles strictement typés sans `any`, afin de détecter les erreurs à la compilation.

### Livraison et évaluation

50. En tant qu'évaluateur, je veux un historique de petits commits explicites, afin de comprendre la progression du travail.
51. En tant qu'évaluateur, je veux un README couvrant l'installation, l'architecture, les composants, les compromis, les hypothèses et les améliorations possibles, afin d'évaluer le raisonnement.
52. En tant qu'évaluateur, je veux savoir quels outils d'IA ont été utilisés, pour quelles parties et où leur sortie a été corrigée, afin d'évaluer cet usage.
53. En tant qu'évaluateur, je veux lancer tous les tests avec une seule commande, afin de les vérifier facilement.
54. En tant qu'évaluateur, je veux un lien en ligne, afin de tester le site sans l'installer.
55. En tant qu'évaluateur, je veux les rapports Lighthouse mobile des deux pages, afin de vérifier les objectifs.
56. En tant que candidate, je veux relire chaque lot avant son commit, afin de pouvoir expliquer tout le code lors de l'appel.

## Implementation Decisions

### Stack et rendu

- Next.js avec App Router, React, TypeScript strict sans `any`, et Yarn.
- Pages générées au build. Le contenu est identique pour tous les visiteurs, donc aucun rendu à la demande n'est nécessaire.
- Server Components par défaut. Seuls le menu, le carrousel, l'accordéon, le sélecteur de couleur et le composant de révélation passent côté client.
- Le carrousel reçoit les cartes déjà rendues côté serveur en tant qu'enfants.

### Design et tokens

- Tailwind v4, avec les couleurs, typographies et espacements définis une seule fois dans la configuration de thème.
- Breakpoints du design system : mobile sous 810 px, tablette de 810 à 1199 px, desktop à partir de 1200 px.
- Marges de page : 16 px en mobile, 32 px en tablette, 48 px en desktop.
- Largeur fluide sur tous les breakpoints, limitée à 1344 px en desktop. La grille repose sur Flexbox.
- Les valeurs sont relevées dans le panneau Properties du Figma, sur les pages Flows et Design System, avec une session connectée. La couleur d'accent connue est `#DE2027` (`Alias tokens/Color/Accent`).
- La police doit être identifiée dans le Figma. Si elle n'est pas libre de droits, on utilise l'équivalent le plus proche et on le note dans le README.

### Modules

- **Couche de données** : point d'entrée unique du contenu, avec des fonctions asynchrones comme `getProducts()` et `getProductBySlug(slug)`. Elle valide le JSON avec un schéma Zod au build. Elle joue le rôle de mock API et sera le seul module à modifier pour brancher un CMS ou une API.
- **Modèles typés** : les types `Product`, catégorie et section dérivent des schémas. Le produit suit la forme du sujet, adaptable : `id`, `slug`, `name`, `category` (`kitchen`, `home-security`, `hair-care`, `accessories`), `shortDescription`, `image`, `bestSeller`, `colours` et `specs` optionnels.
- **Composants réutilisables** : carte produit, carrousel, en-tête de section (`SectionHeader`), accordéon, bouton et icône, utilisés sur les deux pages.
- **En-tête et footer du site** : composants `Header` et `Footer`, rendus une seule fois dans le layout racine. L'en-tête de section garde le nom `SectionHeader` pour ne pas être confondu avec le `Header` du site.
- **Carrousel** : API propre au projet, Embla en interne. Gère les flèches, les points, les états désactivés et le swipe.
- **Accordéon et menu mobile** : API propre au projet, Radix en interne. Le menu s'appuie sur Dialog pour le focus et Escape.
- **Icon** : icônes Lucide ajustées aux tailles de 16 et 24 px et aux traits du design system. C'est le seul module à modifier si Octopus fournit les fichiers.
- **Reveal** : composant maison sans librairie d'animation, basé sur `IntersectionObserver` et CSS.
- **Images** : `next/image`, avec dimensions ou ratios explicites, chargement différé sous la ligne de flottaison et priorité au visuel principal. Les fichiers au nom haché sont renommés de façon lisible, et seules les images utilisées sont copiées dans le projet.

### Animation (Motion Documentation du Figma)

- Déclenchement à l'entrée de la section dans l'écran, une seule fois, sans animation de sortie.
- Opacité de 0 à 1 et translation verticale de 60 px à 0, ou 30 px à 0 pour les blocs de texte seul.
- Transition `ease-out`, durée 1,2 s, délai 0,1 s, `will-change: transform` sur la cible.
- Les éléments d'une même section apparaissent ensemble, sans décalage.
- Avec `prefers-reduced-motion`, opacité seule, sans déplacement.
- L'état masqué ne s'applique que si le JavaScript est actif, afin que le contenu reste visible sans lui.
- La liste exacte des éléments concernés suit les blocs « Applies to » de la Motion Documentation. Les entrées visant des pages hors périmètre sont ignorées.
- Le Figma est suivi aussi sur le hero. Si le score Lighthouse mobile passe sous 90, on proposera d'alléger l'animation du hero uniquement, et le compromis sera noté dans le README.

### Routes

- La fiche produit est servie par une route dynamique basée sur le slug, générée au build pour les produits ayant une fiche complète. Seul le Countertop Blender en a une.
- Tous les « Learn more » mènent à la fiche du Countertop Blender.
- Les liens hors des deux pages mènent à une page unique « Coming soon ». Les tuiles de catégories mènent à une ancre ou à cette page.

### Méthode, dépôt et déploiement

- Travail par petits lots. Sabrina relit et teste chaque lot. Les étapes très simples peuvent être regroupées.
- **L'agent ne fait jamais de commit : Sabrina les fait tous elle-même.** Quand un lot est validé, l'agent lui signale simplement qu'un commit est à faire, puis attend qu'elle l'ait fait avant de passer au lot suivant.
- Un journal note uniquement les corrections réellement apportées au code généré, et alimente la section IA du README.
- Dépôt GitHub public nommé `octopus-website-demo`, créé uniquement avec l'accord de Sabrina.
- Le dossier de matériel fourni est exclu de Git : il contient le sujet, cette spec et des fichiers non utilisés.
- Vercel est relié au dépôt par Sabrina, avec son propre compte. Le premier déploiement a lieu dès la fin de l'installation, afin de mesurer Lighthouse sur le site réel tout au long du travail.
- Site en anglais, comme le Figma, sans multilingue.

### Objectifs chiffrés

- Lighthouse Performance d'au moins 90 sur la Homepage en mobile.
- Lighthouse Accessibility d'au moins 90.
- Contrastes WCAG AA, focus visibles, navigation complète au clavier, HTML sémantique et textes alternatifs.

## Testing Decisions

### Ce qui fait un bon test

- Un test vérifie un comportement observable, jamais un détail d'implémentation.
- Les tests passent par nos composants et sélectionnent les éléments comme un utilisateur : rôles, noms accessibles, clavier et clics.
- Aucun test ne vérifie les internes de Radix ou d'Embla, afin qu'ils restent valables si une librairie est remplacée.

### Points de test

1. **Site réel, avec Playwright sur le site buildé** :
   - parcours Homepage → « Learn more » → fiche produit ;
   - défilement réel du carrousel avec Embla, y compris les états de début et de fin ;
   - ouverture, fermeture et Escape du menu mobile.
2. **Composants publics, avec Vitest et Testing Library** :
   - accordéon : ouverture, fermeture, ARIA et clavier ;
   - menu : ouverture, fermeture, Escape et clavier ;
   - sélecteur de couleur : mise à jour de l'état sélectionné ;
   - carte produit : rendu depuis les données et lien « Learn more » ;
   - carrousel : flèches, points et états désactivés.
3. **Couche de données, avec Vitest** :
   - lecture correcte de données valides ;
   - rejet d'une entrée invalide ;
   - comportement avec un slug inconnu.

### Précisions

- Radix tourne réellement dans les tests de composants.
- Embla est la seule exception : jsdom ne calcule ni dimensions ni défilement. Dans Vitest, il est remplacé par un faux pour simuler le début et la fin du carrousel, et son fonctionnement réel est couvert par Playwright.
- Une seule commande, `yarn test`, lance les suites Vitest et Playwright.
- Les breakpoints et la compatibilité navigateurs sont vérifiés manuellement avant la livraison, en plus des parcours automatisés.
- Prior art : aucun, le projet part de zéro. Les premiers tests servent de référence.

## Out of Scope

- Panier, paiement ou tout parcours d'achat.
- Comptes utilisateurs.
- Recherche.
- CMS ou vrai backend.
- Autres pages produit ou de catégorie.
- Store locator derrière « Find us at ».
- Formulaires de contact.
- Bannières de cookies.
- Multilingue.
- Pixel-perfect strict : l'objectif est un espacement cohérent et un comportement correct entre les breakpoints.

## Further Notes

- Le Figma est lisible avec une session connectée, mais l'export, la copie et le partage y sont désactivés. L'API Figma renvoie une erreur 403 « File not exportable », et le serveur MCP refuse aussi l'accès. Les valeurs sont donc relevées à la main dans l'interface, sans contourner cette restriction.
- Les 47 images et logos fournis sont dans le dossier `Octopus_assets`. Les icônes n'y sont pas : Sabrina envoie un e-mail à Octopus pour les demander, et Lucide sert de solution en attendant.
- Toute hypothèse est notée dans le README, comme le demande le sujet.
- Ordre de priorité : les 10 critères d'acceptation d'abord, les finitions ensuite. La fidélité et le responsive pèsent chacun 25 %, le code et les composants 20 %, la performance et l'accessibilité 15 %, les tests et la documentation 15 %.
- L'appel de revue de 45 minutes comprend 10 minutes de démo, un parcours du code et une discussion sur les évolutions : CMS headless, autres fiches produit, localisation.
- Points de vigilance à préparer pour l'appel : frontière serveur/client, encapsulation des librairies, couche de données, et compromis entre l'animation du hero et le score Lighthouse.
