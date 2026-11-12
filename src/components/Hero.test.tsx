import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { HeroContent } from "@/catalog";
import { breakpointMedia } from "@/lib/breakpoints";
import { Hero } from "./Hero";

const hairDryer: HeroContent = {
  title: "Octopus Ionic Hair Dryer",
  description: "Fast drying and less frizz",
  cta: { label: "Learn more", href: "/products/ionic-hair-dryer" },
};

describe("Hero", () => {
  it("shows the title, description and call to action from the data", () => {
    render(<Hero hero={hairDryer} />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Octopus Ionic Hair Dryer",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Fast drying and less frizz")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /^Learn more/ });
    expect(link).toHaveTextContent("Learn more: Octopus Ionic Hair Dryer");
    expect(link).toHaveAttribute("href", "/products/ionic-hair-dryer");
  });

  it("is a landmark named after its title", () => {
    render(<Hero hero={hairDryer} />);

    expect(
      screen.getByRole("region", { name: "Octopus Ionic Hair Dryer" }),
    ).toBeInTheDocument();
  });

  it("plays the portrait cut on mobile and the landscape cut from tablet up", () => {
    const { container } = render(
      <Hero
        hero={{
          ...hairDryer,
          video: {
            portrait: "/videos/hair-dryer-9x16.mp4",
            landscape: "/videos/hair-dryer-16x9.mp4",
            poster: "/images/hero/hair-dryer-poster.jpg",
          },
        }}
      />,
    );

    const video = container.querySelector("video");
    expect(video).toHaveAttribute(
      "poster",
      "/images/hero/hair-dryer-poster.jpg",
    );
    expect(video).toHaveAttribute("aria-hidden", "true");
    expect(video?.muted).toBe(true);

    const sources = Array.from(video?.querySelectorAll("source") ?? []).map(
      (source) => [source.getAttribute("media"), source.getAttribute("src")],
    );
    expect(sources).toEqual([
      [breakpointMedia.tablet, "/videos/hair-dryer-16x9.mp4"],
      [null, "/videos/hair-dryer-9x16.mp4"],
    ]);
  });

  it("shows no video until the files are provided", () => {
    const { container } = render(<Hero hero={hairDryer} />);

    expect(container.querySelector("video")).toBeNull();
  });
});
