import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { FindUsContent } from "@/catalog";
import { FindUsBanner } from "./FindUsBanner";

const findUs: FindUsContent = {
  title: "Find us at",
  cta: { label: "Find your nearest store", href: "/coming-soon" },
  image: {
    mobile: "/images/banners/find-us-mobile.jpg",
    tablet: "/images/banners/find-us-tablet.jpg",
    desktop: "/images/banners/find-us-desktop.jpg",
    alt: "Octopus appliances on red stands",
    backdrop: "#D2181E",
  },
};

function renderBanner() {
  render(<FindUsBanner content={findUs} />);

  return screen.getByRole("region", { name: "Find us at The Warehouse" });
}

describe("FindUsBanner", () => {
  it("names the retailer in its title, logo included", () => {
    const banner = renderBanner();

    expect(
      within(banner).getByRole("heading", {
        level: 2,
        name: "Find us at The Warehouse",
      }),
    ).toBeInTheDocument();
  });

  it("links to the store locator", () => {
    const banner = renderBanner();

    expect(
      within(banner).getByRole("link", { name: "Find your nearest store" }),
    ).toHaveAttribute("href", "/coming-soon");
  });

  it("describes its photo, loaded lazily below the fold", () => {
    const banner = renderBanner();

    expect(
      within(banner).getByRole("img", {
        name: "Octopus appliances on red stands",
      }),
    ).toHaveAttribute("loading", "lazy");
  });
});
