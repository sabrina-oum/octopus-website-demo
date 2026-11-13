# octopus-website-demo

Two pages of the Octopus website, the Homepage and the Countertop Blender product page, built from the Figma « Flows » at three breakpoints.

- Live demo: https://octopus-website-demo-six.vercel.app
- Lighthouse reports (mobile): [Homepage](lighthouse/homepage-mobile.html), [product page](lighthouse/product-page-mobile.html)

## Setup

Requires Node.js 20.9+ and Yarn 1.

```bash
yarn install
yarn dev          # http://localhost:3000
```

| Command                                              | What it does                                                                        |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `yarn build` / `yarn start`                          | Production build and server                                                         |
| `yarn test`                                          | Component tests (Vitest), then end-to-end tests (Playwright, on a production build) |
| `yarn typecheck` / `yarn lint` / `yarn format:check` | Static checks                                                                       |

Before the first `yarn test`, install the Playwright browser: `yarn playwright install chromium`.

## Architecture

Next.js 16 (App Router, static pages), React 19, TypeScript, Tailwind CSS 4. Details in [architecture.md](architecture.md).

- **`src/app`**: the routes `/`, `/products/[slug]` and a `/coming-soon` placeholder for links outside the two pages.
- **`src/catalog`**: the content. `products.json` holds one record per product, like a CMS product type: what its card shows, what its page shows (description, colours, gallery, specifications, downloads) and optional SEO overrides. `homepage.json` holds the Homepage hero, SEO and sections. Zod schemas validate both at build time, so bad content fails the build with the path of the error. Pages read content only through `index.ts`.
- **`src/components`**: one component per Figma component (`Button`, `ProductCard`, `Carousel`, `SectionHeader`, `Accordion`, `Header`, `Footer`…), shared by both pages.
- **`src/app/globals.css`**: the Figma design tokens (colors, type scale, spacing, breakpoints), defined once in the Tailwind theme.

Libraries: Embla (carousel swipe and snapping), Radix Dialog (mobile menu: focus trap, Escape), Radix Accordion (specifications), Lucide (icons), `next/image` (responsive, lazy images).

## Trade-offs

- **Curated category sections.** The brief asks that adding a product to the data be enough to show it. That holds for « Best sellers », which shows every product marked `bestSeller`. Each category section instead lists its products in `homepage.json`, so a new product also needs its id added there. In return, each section keeps its Figma layout (one large card, a fixed number of smaller ones) and the Homepage doesn't grow with the catalog.
- **Content checked at build.** Zod validates the JSON and checks every product id against the product list and its category, so a typo fails the build instead of shipping an empty card. The cost: one content error blocks the whole deploy.
- **Static pages.** Both pages are prerendered, so they are fast and simple to host. The cost: a content change needs a rebuild. Moving to a CMS would replace the JSON reads in `src/catalog/index.ts` and add on-demand revalidation; the components would not change.

## Assumptions

The Figma file has export disabled: values were read in its Properties panel.

- **Missing assets.** Hero video: a gray gradient, replaced by the video once a `video` entry is added to `homepage.json`. Gallery and feature-card photos: a neutral `placeholder.png`. Icons: Lucide. The Warehouse logo: redrawn as text and an SVG badge at the Figma size. User manual: a one-page PDF made from the specifications, which says so.
- **Focus ring.** Full opacity instead of the Figma 35 %, which fails WCAG AA contrast; white on the red « Find us at » banner, where blue would not show.
- **Category photos.** The « Category » photos replace the missing lifestyle photos, so the large card shows the product in the photo (the Octopus Blender for Kitchen, the Video Doorbell for Home Security) and the product Figma puts there moves to a medium card. These photos have no empty wall behind the text, so it sits on a band in the photo's color.
- **Space between sections.** Every category section has the same space above and below it (120 px on desktop). Figma varies it: on desktop it leaves 180 px around the Hair Care banner, where the page has 120 px, and 120 px between Best sellers and Kitchen, where the page has 180 px.
- **Carousel dots.** Figma shows arrows only; the dots the brief asks for sit left of the arrows.
- **Card text.** « Best sellers » shows each product's own content on every page, as it would from a CMS, so the Figma Homepage's other wording for the Air Fryer and Hair Dryer is not used there. Category sections can give a card its own words with `cardText` in `homepage.json`.
- **Best sellers order.** One ranking on every page, the order of `products.json`; the Figma product page uses another order.
- **Product pages.** Every card links to its own product, on the same template. Figma designs only the Countertop Blender: the other products' descriptions and colours were written from their short descriptions and photos.
- **Product colours.** Figma shows the Countertop Blender in black with a hidden white swatch, so the selector offers Black and White. The photo does not change, as no white photo was provided.
- **Out-of-scope links.** Category tiles, category links and the store locator lead to « Coming soon ». Accessories uses the provided cable photo, which is not a catalog product.

## With more time

- Add screenshot tests that compare each page at each breakpoint with an approved version, so a layout change is caught.
- Run the tests and Lighthouse automatically on every push (GitHub Actions), so a failing test or a score under 90 is caught before deploying.

## Use of AI tools

I used Claude Code for the whole project, in this order:

1. **Requirements.** I turned the brief into requirements with Claude, [docs/SPEC.md](docs/SPEC.md).
2. **Tickets.** Claude split those requirements into tickets with acceptance criteria, [docs/tickets](docs/tickets).
3. **Architecture.** I guided Claude to define the code architecture, [architecture.md](architecture.md).
4. **Implementation.** Claude Code then implemented the tickets one by one, code and tests.
5. **Review.** I reviewed each ticket, asked for changes when needed, and made every commit myself.

For design fidelity, it read the Figma values through Claude in Chrome, as export is disabled, and checked layouts in the browser.

Where I corrected it:

- It split each product into two content types and sent cards with no page content to « Coming soon »; as a CMS will come later, I had each product made one record, with every card linking to its own page.
- It showed every product of a category on the Homepage; I asked for curated sections.
- Its end-to-end tests hard-coded product names and copy; I had them read the content from the page.
- Its code had long comments and clever generic types; I had it simplified.
- It said The Warehouse logo matched Figma; a side-by-side comparison showed errors in the badge and wordmark.
- It added a button style and a product description that the Figma doesn't have; I had both removed.
- It kept the gallery and feature cards at 3:4 at every width, which left a large gap at 746 px; I had it use the Figma sizes.
- Smaller Figma mismatches: a resized category card, an offset Best sellers photo, the mobile « Where to buy » bar, text covering the product in two photos, photo fades that didn't match the photos.
