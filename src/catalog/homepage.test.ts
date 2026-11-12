import { describe, expect, it } from "vitest";
import { parseHomepage } from "./index";

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
  exploreCategories: {
    title: "Explore all categories",
    tiles: [{ category: "accessories", image: "/images/products/cable.png" }],
  },
  findUs: {
    title: "Find us at",
    cta: { label: "Find your nearest store", href: "/coming-soon" },
    image: {
      mobile: "/images/banners/find-us-mobile.jpg",
      tablet: "/images/banners/find-us-tablet.jpg",
      desktop: "/images/banners/find-us-desktop.jpg",
      alt: "Octopus appliances on red stands",
      backdrop: "#D2181E",
    },
  },
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

  it("rejects a store locator link that leaves the site", () => {
    expect(() =>
      parseHomepage({
        ...homepage,
        findUs: {
          ...homepage.findUs,
          cta: { label: "Find a store", href: "https://example.com/stores" },
        },
      }),
    ).toThrow(/findUs\.cta\.href/);
  });

  it("rejects a category tile listed twice", () => {
    const tile = { category: "kitchen", image: "/images/products/blender.png" };

    expect(() =>
      parseHomepage({
        ...homepage,
        exploreCategories: { title: "Explore", tiles: [tile, tile] },
      }),
    ).toThrow(/"kitchen" is listed twice/);
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
