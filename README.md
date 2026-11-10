# octopus-website-demo

## Assumptions

The Figma file has export, copy and sharing disabled. Design values were read in the Figma Properties panel with a signed-in session, then defined once in the Tailwind theme (`src/app/globals.css`).

- **Font.** The Figma uses Satoshi Variable, a free Fontshare font (ITF Free Font License), self-hosted with `next/font/local`. The mobile title of the small product card is set in Aeonik SemiBold in Figma, a style detached from the design system; it uses Satoshi Bold like the other breakpoints.
- **Icons.** Octopus's icon files were not provided, so the `Icon` component wraps Lucide with the names of the Figma icon set. Figma gives no stroke width for its outlined glyphs, so strokes of 1.75 px (24 px icons) and 1.25 px (16 px icons) were estimated from the glyph sizes. The Figma "Solid" icons have no Lucide equivalent yet.
- **Focus ring.** Figma draws the focus ring in `#2069E8` at 35 % opacity, which gives about 1.6:1 contrast on white. It is drawn at full opacity to meet WCAG AA non-text contrast.
- **Buttons.** Primary and Secondary buttons are built with their hover, focus, pressed and disabled states. The Ghost variants are left out until a page needs them.
