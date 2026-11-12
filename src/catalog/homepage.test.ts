import { describe, expect, it } from "vitest";
import { getHomepage, parseHomepage } from "./index";

const homepage = {
  seo: {
    title: "Octopus",
    description: "Consumer electronics.",
    image: {
      src: "/images/og/homepage.jpg",
      width: 1200,
      height: 630,
      alt: "A hair dryer",
    },
  },
  hero: {
    title: "Octopus Ionic Hair Dryer",
    description: "Dries fast.",
    cta: { label: "Learn more", href: "/products/countertop-blender" },
  },
  sections: [
    {
      layout: "cards",
      category: "accessories",
      subheading: "The little things",
      products: ["power-bank"],
    },
  ],
};

describe("parseHomepage", () => {
  it("returns valid homepage content", () => {
    expect(parseHomepage(homepage)).toEqual(homepage);
  });

  it("rejects a hero without a title, naming the faulty field", () => {
    const parse = () =>
      parseHomepage({ ...homepage, hero: { ...homepage.hero, title: "" } });

    expect(parse).toThrow(/^Invalid homepage data/);
    expect(parse).toThrow(/hero\.title/);
  });

  it("rejects a hero link that leaves the site", () => {
    expect(() =>
      parseHomepage({
        ...homepage,
        hero: {
          ...homepage.hero,
          cta: { label: "Learn more", href: "https://example.com" },
        },
      }),
    ).toThrow(/hero\.cta\.href/);
  });

  it("rejects a featured section without its photo, naming the field", () => {
    expect(() =>
      parseHomepage({
        ...homepage,
        sections: [
          {
            layout: "featured-above",
            category: "kitchen",
            subheading: "Powerful appliances",
            featured: "kettle",
          },
        ],
      }),
    ).toThrow(/sections\[0\]\.image/);
  });
});

describe("getHomepage", () => {
  it("presents the Octopus Ionic Hair Dryer in the shipped hero", async () => {
    await expect(getHomepage()).resolves.toMatchObject({
      hero: {
        title: "Octopus Ionic Hair Dryer",
        cta: { label: "Learn more", href: "/products/countertop-blender" },
      },
    });
  });
});
