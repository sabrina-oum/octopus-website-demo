"use client";

import { useId, useState } from "react";
import type { ProductColor } from "@/catalog";
import { cx } from "@/lib/cx";

function isWhite(color: ProductColor): boolean {
  return color.hex.toLowerCase() === "#ffffff";
}

type ColorSelectorProps = {
  colors: ProductColor[];
};

export function ColorSelector({ colors }: ColorSelectorProps) {
  const labelId = useId();
  const [selected, setSelected] = useState(colors[0]);

  return (
    <div className="flex flex-col gap-3">
      <p id={labelId} className="text-body font-book text-text-secondary">
        Colour - {selected.name}
      </p>
      <div role="radiogroup" aria-labelledby={labelId} className="flex gap-2">
        {colors.map((color) => (
          <label
            key={color.name}
            className="flex size-11 cursor-pointer items-center justify-center rounded-full border-2 border-transparent has-checked:border-swatch-selected has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-focus"
          >
            <input
              type="radio"
              name={labelId}
              value={color.name}
              checked={color.name === selected.name}
              onChange={() => setSelected(color)}
              className="sr-only"
            />
            <span
              aria-hidden
              className={cx(
                "size-7.5 rounded-full border",
                isWhite(color)
                  ? "border-swatch-stroke-white"
                  : "border-swatch-stroke",
              )}
              style={{ backgroundColor: color.hex }}
            />
            <span className="sr-only">{color.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
