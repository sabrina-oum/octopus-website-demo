# 12: Final check and delivery

**What to build:** an Octopus evaluator receives a verified live site, a clear repository, tests run with a single command, an honest README and the requested Lighthouse reports.

**Blocked by:** 03 (Header, footer and « Coming soon »), 11 (Animations and polish)

**Status:** ready-for-agent — to do before Friday 13 November, 17:00

- [ ] The brief's 10 acceptance criteria are checked one by one on the deployed site
- [ ] Both pages are checked at the three breakpoints and between them, with no horizontal scrolling — horizontal scrolling is already tested by Playwright on both pages; the visual points listed below remain to confirm
- [ ] Behaviour is checked on the latest Chrome, Safari, Firefox and Edge, on iOS Safari and Android Chrome, and any untested browser is reported — Playwright only runs on Chromium
- [ ] Lighthouse Performance reaches at least 90 on the Homepage on mobile
- [ ] Lighthouse Accessibility reaches at least 90
- [ ] Keyboard use, visible focus, alt text and WCAG AA contrast are checked
- [ ] `yarn test` passes from a clean install — the README says to install Chromium for Playwright first
- [ ] The README covers setup, architecture, components, trade-offs, assumptions and possible improvements — every part exists; see the corrections below
- [x] The README's AI section describes the tools used, the parts concerned and the real corrections from the log
- [ ] The mobile Lighthouse reports for both pages are included in the repository — the README still says « _to add_ »
- [x] Octopus icons replace Lucide if they were received; otherwise the assumption is noted
- [ ] Neither the provided material nor any secret is in the public repository — nothing is tracked today, but the `.gitignore` lines for `material/` and `.scratch/` are not committed
- [ ] Sabrina has the repository link and the live link to send to Octopus

## Open points found on 12 November

1. **Commit the `.gitignore` lines** for `material/` and `.scratch/` before any `git add .`, so the brief, the spec and the tickets are not published.
2. **Finish and commit the `cardText` work** in progress (see ticket 06).
3. **Push the local commits** (`73655bf`, `27f105f` and any later ones), then check the Vercel deployment.
4. **Measure mobile Lighthouse** on both pages of the deployed site, include the reports and replace « _to add_ » in the README.
5. **Fix the README**: the « With more time » part still suggests moving the category labels out of the code, which commit `3706598` already did.
6. **Best sellers animation:** decide whether the carousel and the « Find us at » banner should be wrapped in `Reveal` (see ticket 11).
7. **Visual fidelity to confirm** at the three breakpoints and between them: product card (02), footer (03), Homepage hero (04), carousel (05), category sections (06), « Find us at » (07), product hero (08), gallery (09) and accordion (10).
