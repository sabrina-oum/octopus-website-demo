import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Footer } from "./Footer";

function linkNamesUnder(heading: string): Array<string | null> {
  return within(screen.getByRole("list", { name: heading }))
    .getAllByRole("link")
    .map((link) => link.textContent);
}

describe("Footer", () => {
  it("groups the links under « Our Products » and « Learn », as in the Figma", () => {
    render(<Footer />);

    expect(linkNamesUnder("Our Products")).toEqual([
      "Kitchen",
      "Home Security",
      "Hair Care",
      "Accessories",
    ]);
    expect(linkNamesUnder("Learn")).toEqual(["Where to buy", "Contact us"]);
  });

  it("sends every page that is not built to Coming soon, and the logo home", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    const links = within(footer).getAllByRole("link");
    const logo = within(footer).getByRole("link", { name: "Octopus home" });

    expect(logo).toHaveAttribute("href", "/");
    for (const link of links.filter((link) => link !== logo)) {
      expect(link).toHaveAttribute("href", "/coming-soon");
    }
    expect(
      within(footer).getByRole("link", { name: "Policies & Terms" }),
    ).toBeInTheDocument();
  });

  it("shows the copyright for the year the site is built", () => {
    vi.useFakeTimers({ now: new Date("2027-03-01T12:00:00Z"), toFake: ["Date"] });
    render(<Footer />);
    vi.useRealTimers();

    expect(
      screen.getByText("Copyright 2027 Octopus - All rights reserved"),
    ).toBeInTheDocument();
  });
});
