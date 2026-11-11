# octopus-website-demo

## Assumptions

The Figma file has export, copy and sharing disabled. Design values were read in the Figma Properties panel with a signed-in session, then defined once in the Tailwind theme (`src/app/globals.css`).

- **Font.** The Figma uses Satoshi Variable, a free Fontshare font (ITF Free Font License), self-hosted with `next/font/local`. The mobile title of the small product card is set in Aeonik SemiBold in Figma, a style detached from the design system; it uses Satoshi Bold like the other breakpoints.
- **Icons.** Octopus's icon files were not provided, so the `Icon` component wraps Lucide with the names of the Figma icon set. Figma gives no stroke width for its outlined glyphs, so strokes of 1.75 px (24 px icons) and 1.25 px (16 px icons) were estimated from the glyph sizes. The Figma "Solid" icons have no Lucide equivalent yet.
- **Focus ring.** Figma draws the focus ring in `#2069E8` at 35 % opacity, which gives about 1.6:1 contrast on white. It is drawn at full opacity to meet WCAG AA non-text contrast.
- **Header below 1200 px.** The Figma tablet frames show the full navigation inline. The brief asks for the navigation to collapse into a menu below 1200 px, so the menu is used on tablet as well as on mobile.
- **Menu links.** The links of the open mobile menu are set in Aeonik Regular in Figma, a style detached from the design system. They use the CTA style (Satoshi Medium) of the desktop navigation.
- **Footer links.** The Figma Ghost white button does not change on hover, so footer links are underlined on hover to show which one is targeted.
- **Homepage hero video.** The Figma hero plays `OctopusHairDryer_4K.mp4` (16:9, from tablet up) and `OctopusHairDryer_9;16.mp4` (mobile), which were not provided. The hero shows a gray gradient in their place. Adding a `video` entry (`portrait`, `landscape`, optional `poster`) to `src/catalog/homepage.json` switches it to the muted, looping video, with the poster preloaded (one poster serves both cuts). A pause control and a `prefers-reduced-motion` check should come with the real files.
- **Hero height.** The Figma hero frames match the device screens (402 × 820 below the status bar, 1600 × 900 on desktop), so the hero fills the screen height (at least `100svh` and 576 px, growing with its content) and slides under the floating header. Its mobile side margin is 24 px, as in Figma, rather than the 16 px page margin.
- **Hero title width.** Figma caps the title block at 550 px, but its desktop title box is 692 px wide on one line. Only the description is capped at 550 px, so the title keeps its single desktop line.
- **Open Graph image.** No share image is designed. The homepage uses the provided hair dryer photo, cropped to 1200 × 630.
