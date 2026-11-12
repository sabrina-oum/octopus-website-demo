import { cx } from "@/lib/cx";

type WarehouseLogoProps = {
  className?: string;
};

/** Redrawn, as the logo was not provided. The badge overflows the 360 × 34 frame, as in Figma. */
export function WarehouseLogo({ className }: WarehouseLogoProps) {
  return (
    <span className={cx("relative block", className)}>
      <svg
        role="img"
        aria-label="The Warehouse"
        viewBox="0 0 360 65"
        className="absolute inset-x-0 top-[-32.35%] h-[191.18%] w-full overflow-visible"
      >
        <text
          x="0"
          y="45"
          fill="currentColor"
          fontSize="46"
          textLength="283"
          lengthAdjust="spacingAndGlyphs"
        >
          <tspan fontWeight="300">the</tspan>
          <tspan fontWeight="900">warehouse</tspan>
        </text>
        <g transform="translate(295 0)">
          <rect width="65" height="65" rx="12" fill="currentColor" />
          {/* A thin slash, then a wide one. */}
          <path
            d="M7 44.5 23.9 19.5h9.2L16.9 44.5ZM23.2 44.5 40.4 19.5h16.4L39.7 44.5Z"
            className="fill-accent"
          />
        </g>
      </svg>
    </span>
  );
}
