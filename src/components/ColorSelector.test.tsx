import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import type { ProductColor } from "@/catalog";
import { ColorSelector } from "./ColorSelector";

const colors: ProductColor[] = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#ffffff" },
];

function colorGroup() {
  return screen.getByRole("radiogroup");
}

describe("ColorSelector", () => {
  it("starts on the first colour and names it in text", () => {
    render(<ColorSelector colors={colors} />);

    expect(screen.getByRole("radio", { name: "Black" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "White" })).not.toBeChecked();
    expect(colorGroup()).toHaveAccessibleName("Colour - Black");
  });

  it("selects the colour a visitor clicks, and updates its name", async () => {
    const user = userEvent.setup();
    render(<ColorSelector colors={colors} />);

    await user.click(screen.getByRole("radio", { name: "White" }));

    expect(screen.getByRole("radio", { name: "White" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Black" })).not.toBeChecked();
    expect(colorGroup()).toHaveAccessibleName("Colour - White");
  });

  it("moves the selection with the arrow keys", async () => {
    const user = userEvent.setup();
    render(<ColorSelector colors={colors} />);

    await user.tab();
    expect(screen.getByRole("radio", { name: "Black" })).toHaveFocus();

    await user.keyboard("{ArrowRight}");

    expect(screen.getByRole("radio", { name: "White" })).toBeChecked();
    expect(colorGroup()).toHaveAccessibleName("Colour - White");
  });
});
