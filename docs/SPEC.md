# Spec: Octopus website demo (Product Engineer Web technical test)

Status: `ready-for-agent` (local file, no issue tracker configured)
Deadline: Friday 13 November 2026 at 17:00, internal target Thursday the 12th in the evening

## Problem Statement

Sabrina received a technical test for a Product Engineer Web role. She must deliver a small demo of the Octopus consumer electronics website: the Homepage and the Countertop Blender product page, faithful to the Figma at three breakpoints.

The difficulty is not the number of pages but the standard expected in a short time: design fidelity, responsive behaviour, reusable data-driven components, performance, accessibility, tests and documentation. AI tools are required, but Sabrina must be able to explain every part of the code and defend her trade-offs during a 45-minute review call.

The Figma file has export, copying and sharing disabled. Design values can only be read in the interface, with a signed-in session. Images and logos are provided separately, but icons are not.

## Solution

A Next.js site generated at build time and deployed on Vercel, whose two pages reproduce the Figma at each breakpoint and adapt fluidly between them.

Content comes from a local JSON file validated at build time, so that adding a product to the data is enough to show it in the right section. Components are reused across both pages and the Figma tokens are defined once. Interactive elements work with a mouse, touch and the keyboard.

Work moves forward in small batches that Sabrina reviews before each commit, so that she knows the code by the end and the README's AI section is based on real corrections.

## User Stories

### Navigation and header

1. As a desktop visitor, I want to see the full navigation and the « Where to buy » button, so that I can go straight to the main sections.
2. As a visitor below 1200 px, I want the navigation to fold into a menu, so that the header stays readable on a small screen.
3. As a mobile visitor, I want to open and close the menu with one gesture, so that I can navigate without losing my place.
4. As a keyboard user, I want to open the menu, move through it and close it without a mouse, so that I can reach the whole navigation.
5. As a keyboard user, I want the Escape key to close the menu and focus to return to its open button, so that I don't lose my position.
6. As a screen reader user, I want the menu's open or closed state to be announced, so that I understand what is happening.

### Homepage

7. As a visitor, I want to see a hero dedicated to the Octopus Ionic Hair Dryer, so that I immediately discover the featured product.
8. As a visitor, I want to browse the best sellers, so that I can quickly spot popular products.
9. As a desktop visitor, I want to scroll the carousel with arrows, so that I can see every product.
10. As a desktop visitor, I want the arrows to be disabled at the start and end of the carousel, so that I know when there is nothing more to see.
11. As a visitor, I want pagination dots, so that I know where I am in the carousel.
12. As a touch screen visitor, I want to scroll the carousel by swiping, so that I can use a natural gesture.
13. As a keyboard user, I want to reach and use the carousel controls, so that I can access the same products as other visitors.
14. As a visitor, I want to see the Kitchen, Hair Care, Home Security and Accessories sections, so that I can explore the range by category.
15. As a desktop and tablet visitor, I want a large featured card with smaller cards beside it, as in the design, so that I understand the product hierarchy.
16. As a mobile visitor, I want rows to become stacked columns, so that I can read the cards comfortably.
17. As a visitor, I want each card to show the product's name, short description and image, so that I can decide whether it interests me.
18. As a visitor, I want « Learn more » on the Countertop Blender to open its product page, so that I can find out more.
19. As a visitor, I want « Learn more » on the other products to also lead to the available product page, so that I never land on a broken link.
20. As a visitor, I want to use the « Explore all categories » tiles, so that I can go to a category or a placeholder page.
21. As a visitor, I want to see the « Find us at » banner, so that I know there are stores that sell the products.
22. As a visitor, I want a footer that matches the design at each breakpoint, so that I can find the secondary links.

### Product page

23. As a visitor, I want to see the title, description, colour selector and « Where to buy », so that I understand the product and what to do next.
24. As a visitor, I want to choose a colour and see the selected state update, so that I know which option is active.
25. As a keyboard or screen reader user, I want to use the selector and know which colour is chosen, so that I don't depend on colour perception alone.
26. As a visitor, I want to browse the image gallery and the feature cards, so that I understand the product's strengths.
27. As a visitor, I want to expand and collapse Technical specifications, Dimensions & weight, Product information and Downloads, so that I only read what interests me.
28. As a keyboard user, I want to control these sections without a mouse, so that I can reach all their content.
29. As a screen reader user, I want to hear whether a section is open or closed, so that I know where I am.
30. As a visitor, I want to find the Best sellers carousel at the bottom of the product page, so that I can keep exploring.

### Responsive, visuals and performance

31. As a visitor, I want the pages to stay clean at any width, including between breakpoints, so that I never see a broken layout.
32. As a visitor, I never want the page to scroll horizontally, so that reading stays comfortable.
33. As a visitor on a mobile connection, I want the pages to load fast, so that I don't have to wait.
34. As a visitor, I want images to have the right format and the page not to jump while they load, so that I keep my position.
35. As a visitor, I want content to appear with the designed scroll animation, so that I enjoy the intended experience.
36. As a motion-sensitive visitor, I want the animation to be limited to a fade when I have turned on reduced motion, so that I avoid discomfort.
37. As a visitor, I want to see the content even if JavaScript does not load, so that the site stays usable.
38. As a visitor, I want hover and focus states consistent with the design, so that I know what I am acting on.
39. As a visitor on the latest Chrome, Safari, Firefox, Edge, iOS Safari or Android Chrome, I want the same behaviour, so that my browser does not put me at a disadvantage.

### Out-of-scope links and SEO

40. As a visitor, I want a link to a page that isn't built to lead to a « Coming soon » page, so that I understand the content doesn't exist yet.
41. As a search engine, I want a title and description specific to each page, so that I can index the content correctly.
42. As someone sharing a link, I want Open Graph tags on both pages, so that the preview looks good.

### Content and maintenance

43. As a developer, I want to add a product to the data so that it appears in the right section, without changing the markup.
44. As a developer, I want invalid data to fail the build with a clear message, so that a content error never reaches production.
45. As a developer, I want pages to access data only through async functions, so that an API or CMS can be connected later without changing them.
46. As a developer, I want design tokens defined once, so that I change a value in one place.
47. As a developer, I want Radix and Embla to stay inside our components, so that a library can be replaced without touching the pages.
48. As a developer, I want a product page to be built from a slug, so that other product pages are easy to add.
49. As a developer, I want strictly typed models with no `any`, so that errors are caught at compile time.

### Delivery and evaluation

50. As an evaluator, I want a history of small, explicit commits, so that I understand how the work progressed.
51. As an evaluator, I want a README covering setup, architecture, components, trade-offs, assumptions and possible improvements, so that I can assess the reasoning.
52. As an evaluator, I want to know which AI tools were used, for which parts and where their output was corrected, so that I can assess that use.
53. As an evaluator, I want to run every test with a single command, so that I can check them easily.
54. As an evaluator, I want a live link, so that I can try the site without installing it.
55. As an evaluator, I want the mobile Lighthouse reports for both pages, so that I can check the targets.
56. As the candidate, I want to review each batch before its commit, so that I can explain all the code during the call.

## Implementation Decisions

### Stack and rendering

- Next.js with the App Router, React, strict TypeScript with no `any`, and Yarn.
- Pages generated at build time. The content is the same for every visitor, so no on-demand rendering is needed.
- Server Components by default. Only the menu, the carousel, the accordion, the colour selector and the reveal component run on the client.
- The carousel receives the cards, already rendered on the server, as children.

### Design and tokens

- Tailwind v4, with colours, typography and spacing defined once in the theme configuration.
- Design system breakpoints: mobile below 810 px, tablet from 810 to 1199 px, desktop from 1200 px.
- Page margins: 16 px on mobile, 32 px on tablet, 48 px on desktop.
- Fluid width at every breakpoint, capped at 1344 px on desktop. The grid is built on Flexbox.
- Values are read in the Figma Properties panel, on the Flows and Design System pages, with a signed-in session. The known accent colour is `#DE2027` (`Alias tokens/Color/Accent`).
- The font must be identified in the Figma. If it isn't free to use, the closest equivalent is used and noted in the README.

### Modules

- **Data layer**: the single entry point for content, with async functions such as `getProducts()` and `getProductBySlug(slug)`. It validates the JSON with a Zod schema at build time. It acts as the mock API and will be the only module to change to connect a CMS or an API.
- **Typed models**: the `Product`, category and section types derive from the schemas. The product follows the brief's shape, which may be adapted: `id`, `slug`, `name`, `category` (`kitchen`, `home-security`, `hair-care`, `accessories`), `shortDescription`, `image`, `bestSeller`, and optional `colours` and `specs`.
- **Reusable components**: product card, carousel, section header (`SectionHeader`), accordion, button and icon, used on both pages.
- **Site header and footer**: `Header` and `Footer` components, rendered once in the root layout. The section header keeps the name `SectionHeader` so it isn't confused with the site's `Header`.
- **Carousel**: a project-specific API, with Embla inside. It handles the arrows, the dots, the disabled states and swiping.
- **Accordion and mobile menu**: a project-specific API, with Radix inside. The menu relies on Dialog for focus and Escape.
- **Icon**: Lucide icons adjusted to the design system's 16 and 24 px sizes and stroke widths. It is the only module to change if Octopus provides the files.
- **Reveal**: a home-made component with no animation library, based on `IntersectionObserver` and CSS.
- **Images**: `next/image`, with explicit dimensions or ratios, lazy loading below the fold and priority for the main visual. Files with hashed names are renamed readably, and only the images used are copied into the project.

### Animation (Figma Motion Documentation)

- Triggered once, when the section enters the screen, with no exit animation.
- Opacity from 0 to 1 and a vertical translation from 60 px to 0, or from 30 px to 0 for text-only blocks.
- `ease-out` transition, 1.2 s duration, 0.1 s delay, `will-change: transform` on the target.
- Elements in the same section appear together, with no stagger.
- With `prefers-reduced-motion`, opacity only, with no movement.
- The hidden state only applies when JavaScript is active, so the content stays visible without it.
- The exact list of animated elements follows the « Applies to » blocks of the Motion Documentation. Entries for out-of-scope pages are ignored.
- The Figma is followed on the hero too. If the mobile Lighthouse score drops below 90, lightening the hero animation only will be proposed, and the trade-off noted in the README.

### Routes

- The product page is served by a dynamic route based on the slug, generated at build time for products with a complete page. Only the Countertop Blender has one.
- Every « Learn more » leads to the Countertop Blender's page.
- Links outside the two pages lead to a single « Coming soon » page. Category tiles lead to an anchor or to that page.

### Method, repository and deployment

- Work in small batches. Sabrina reviews and tests each batch. Very simple steps can be grouped.
- **The agent never commits: Sabrina makes every commit herself.** When a batch is approved, the agent simply tells her a commit is due, then waits until she has made it before moving on to the next batch.
- A log records only the corrections actually made to generated code, and feeds the README's AI section.
- A public GitHub repository named `octopus-website-demo`, created only with Sabrina's approval.
- The folder of provided material is excluded from Git: it holds the brief, this spec and unused files.
- Sabrina connects Vercel to the repository with her own account. The first deployment happens as soon as setup is done, so Lighthouse can be measured on the real site throughout the work.
- Site in English, like the Figma, with no localisation.

### Measurable targets

- Lighthouse Performance of at least 90 on the Homepage on mobile.
- Lighthouse Accessibility of at least 90.
- WCAG AA contrast, visible focus, full keyboard navigation, semantic HTML and alt text.

## Testing Decisions

### What makes a good test

- A test checks observable behaviour, never an implementation detail.
- Tests go through our components and select elements the way a user would: roles, accessible names, keyboard and clicks.
- No test checks the internals of Radix or Embla, so that tests stay valid if a library is replaced.

### Test seams

1. **Real site, with Playwright on the built site**:
   - Homepage → « Learn more » → product page journey;
   - real carousel scrolling with Embla, including the start and end states;
   - opening, closing and Escape for the mobile menu.
2. **Public components, with Vitest and Testing Library**:
   - accordion: opening, closing, ARIA and keyboard;
   - menu: opening, closing, Escape and keyboard;
   - colour selector: updating the selected state;
   - product card: rendering from data and the « Learn more » link;
   - carousel: arrows, dots and disabled states.
3. **Data layer, with Vitest**:
   - valid data is read correctly;
   - an invalid entry is rejected;
   - behaviour with an unknown slug.

### Details

- Radix really runs in the component tests.
- Embla is the only exception: jsdom computes neither dimensions nor scrolling. In Vitest it is replaced by a fake that simulates the start and end of the carousel, and its real behaviour is covered by Playwright.
- A single command, `yarn test`, runs the Vitest and Playwright suites.
- Breakpoints and browser compatibility are checked manually before delivery, on top of the automated journeys.
- Prior art: none, the project starts from scratch. The first tests serve as the reference.

## Out of Scope

- Cart, checkout or any purchase flow.
- User accounts.
- Search.
- A CMS or a real backend.
- Other product or category pages.
- The store locator behind « Find us at ».
- Contact forms.
- Cookie banners.
- Localisation.
- Strict pixel-perfection: the goal is consistent spacing and correct behaviour between breakpoints.

## Further Notes

- The Figma can be read with a signed-in session, but export, copying and sharing are disabled. The Figma API returns a 403 « File not exportable » error, and the MCP server also refuses access. Values are therefore read by hand in the interface, without working around this restriction.
- The 47 images and logos provided are in the `Octopus_assets` folder. Icons are not included: Sabrina emails Octopus to ask for them, and Lucide stands in meanwhile.
- Every assumption is noted in the README, as the brief asks.
- Priority order: the 10 acceptance criteria first, polish second. Fidelity and responsive behaviour weigh 25 % each, code and components 20 %, performance and accessibility 15 %, tests and documentation 15 %.
- The 45-minute review call includes a 10-minute demo, a code walkthrough and a discussion of how to extend the site: headless CMS, more product pages, localisation.
- Points to prepare for the call: the server/client boundary, library encapsulation, the data layer, and the trade-off between the hero animation and the Lighthouse score.
