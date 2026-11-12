# octopus-website-demo

A demo of two pages of the Octopus website, the Homepage and the Countertop Blender product page, built from the Figma « Flows » at three breakpoints.

- Live demo: _to add_
- Lighthouse reports (mobile): _to add_

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

Next.js 16 (App Router, static pages), React 19, TypeScript, Tailwind CSS 4.

- **`src/app`**: the routes: `/`, `/products/[slug]` and a `/coming-soon` placeholder for links outside the two pages.
- **`src/catalog`**: the content. `products.json` holds the products, `homepage.json` the Homepage hero, SEO, sections, category tiles and « Find us at » banner. Zod schemas validate both at build time, so bad content fails the build with the path of the error. Pages read content only through the functions of `index.ts`.
- **`src/components`**: the UI, one component per Figma component: `Button`, `ProductCard`, `Carousel`, `SectionHeader`, `Header`, `Footer`… The same components serve both pages.
- **`src/app/globals.css`**: the design tokens from Figma (colors, type scale, spacing, breakpoints), defined once in the Tailwind theme.

Libraries: Embla for the carousel (swipe, snapping), Radix Dialog for the mobile menu (focus trap, Escape), Lucide for the icons, `next/image` for responsive, lazy images.

## Trade-offs

- **Curated Homepage.** Each section of `homepage.json` lists the product ids it shows. A new product appears once its id is added to a section, with no markup change. Showing every product of a category automatically would fill the Homepage as the catalog grows.
- **Content checked at build.** Product ids are checked against the product list and their category, so a typo fails the build instead of shipping an empty card.
- **Static pages.** Both pages are prerendered. Moving to a CMS would replace the JSON reads in `src/catalog/index.ts`; the components would not change.
- **Images.** Category photos are art-directed (one crop per breakpoint, with `<picture>`). Every image sits in a box of known size, so loading causes no layout shift.

## Assumptions

The Figma file has export disabled: values were read in its Properties panel.

- **Header below 1200 px.** The Figma tablet frames show the full navigation; the brief asks for a menu below 1200 px, so tablet uses the menu.
- **Focus ring.** Drawn at full opacity instead of the Figma 35 %, which fails WCAG AA contrast.
- **Hero video.** The video files were not provided; the hero shows a gray gradient. Adding a `video` entry to `homepage.json` switches it to the video.
- **Category photos.** The Figma lifestyle photos were not provided. The « Category » photos take their place, and the large card features the product in the photo: the Octopus Blender for Kitchen, the Video Doorbell for Home Security.
- **Text over photos.** These photos have no empty wall behind the text, so the text sits on a band in the photo's own color.
- **Carousel dots.** Figma shows arrows only; the dots asked for by the brief sit left of the arrows.
- **Icons and font.** Octopus icons were not provided: Lucide icons stand in. The font is Satoshi, self-hosted.
- **Section spacing.** Figma varies it (60 to 180 px on desktop); the four category sections share the same spacing. « Explore all categories » follows its Figma values.
- **Product pages.** Only the Countertop Blender has a page; every « Learn more » leads there.
- **Category tiles.** Category pages are not built, so every tile leads to « Coming soon », like the category links of the header and footer. The photos are decorative (the label names the link). Accessories uses the provided cable photo, which is not a catalog product.
- **« Find us at » banner.** The Warehouse logo was not provided and the Figma file is not exportable: it is redrawn as text and an SVG badge, at the Figma size. The store locator is not built; its button leads to « Coming soon ». The focus ring is white on this red banner, as the blue one would not show.

## With more time

- Connect a headless CMS behind `src/catalog`, with remote images and on-demand revalidation.
- Use the real hero video (with a pause control), lifestyle photos and Octopus icons.
- Move the category labels from the code into the data.
- Add visual regression tests per breakpoint, and Lighthouse in CI.

## Use of AI tools

Built with Claude Code. It wrote the code and tests from tickets I wrote, read the Figma values through Claude in Chrome, and checked layouts in the browser. I reviewed every change and made every commit.

Where I corrected it:

- It changed the size of a category card to fix a crop issue; I had it restore the Figma size.
- It showed every product of a category on the Homepage; I asked for curated sections.
- It darkened the photos with a gray gradient; I asked for the photo's own color.
- It placed the Best sellers photo 46 px off on tablet and 25 px off on desktop; I had it measured against Figma and fixed.
- Its code had long comments and clever generic types; I had it simplified to plain types and short comments.
