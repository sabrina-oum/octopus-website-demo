import { describe, expect, it } from "vitest";
import { isWideOnDesktop } from "./FeatureCards";

describe("isWideOnDesktop", () => {
  const layout = (count: number) =>
    Array.from({ length: count }, (_, index) => isWideOnDesktop(index, count));

  it("alternates a full-width card and a pair, as in Figma", () => {
    expect(layout(4)).toEqual([true, false, false, true]);
    expect(layout(6)).toEqual([true, false, false, true, false, false]);
  });

  it("widens a card left alone in a pair", () => {
    expect(layout(2)).toEqual([true, true]);
    expect(layout(5)).toEqual([true, false, false, true, true]);
  });
});
