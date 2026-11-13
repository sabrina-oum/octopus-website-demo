# 01: Minimal deployed journey

**What to build:** a visitor lands on the Homepage, sees a product from the data as a card, clicks « Learn more » and reaches that product's page, served by its slug. The rendering is deliberately minimal: this ticket proves the whole chain works, from the data to the live site, with tests.

**Blocked by:** None (can start immediately)

**Status:** done

- [x] The project uses Next.js (App Router), strict TypeScript with no `any`, Yarn and Tailwind v4
- [ ] The local Git repository is initialised, with the provided material and the tickets excluded from tracking — neither `material/` nor `.scratch/` is tracked, but their `.gitignore` lines are not committed yet
- [x] Data comes from a local JSON file, read only through async functions
- [x] The JSON is validated by a Zod schema, and an invalid entry fails the build with a clear message
- [x] Model types derive from the schemas
- [x] ~~The product page is generated at build time from the Countertop Blender's slug~~ → **changed:** every product has its own page, generated at build time from its slug
- [x] Pages are generated at build time
- [x] Data layer tests cover valid data, an invalid entry and an unknown slug
- [x] A Playwright test covers the Homepage → « Learn more » → product page journey
- [x] `yarn test` runs Vitest and Playwright in a single command
- [x] With Sabrina's approval, the public `octopus-website-demo` repository exists, and she connects it to Vercel with her account
- [x] The deployed site shows the working journey

## Update of 12 November

- Scope change: every product page is built from the same template. Each card leads to its own product's page, and only the Countertop Blender's page follows a Figma design (see the « Product pages » assumption in the README).
- The last two local commits (`73655bf`, `27f105f`) are not pushed yet: the live site does not include them yet.
