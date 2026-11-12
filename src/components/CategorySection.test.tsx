import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Category, CategorySectionData } from "@/catalog";
import { breakpointMedia } from "@/lib/breakpoints";
import { kitchen as kitchenCategory, makeProduct } from "@/test/fixtures";
import { CategorySection } from "./CategorySection";

const hairCare: Category = { id: "hair-care", name: "Hair Care" };
const accessories: Category = { id: "accessories", name: "Accessories" };

function product(id: string, name: string, category: Category) {
  return makeProduct({
    id,
    name,
    category,
    shortDescription: `About the ${name}.`,
  });
}

const blender = product("personal-blender", "Octopus Blender", kitchenCategory);
const kettle = product("kettle", "Octopus Kettle", kitchenCategory);
const dryer = product("ionic-hair-dryer", "Octopus Ionic Hair Dryer", hairCare);
const powerBank = product("power-bank", "Octopus Power Bank", accessories);
const charger = product("car-charger", "Octopus Car Charger", accessories);

function photo(name: string) {
  return {
    mobile: `/images/${name}-mobile.jpg`,
    tablet: `/images/${name}-tablet.jpg`,
    desktop: `/images/${name}-desktop.jpg`,
    alt: `A ${name} photo`,
    backdrop: "#F2E0D7",
  };
}

const kitchen: CategorySectionData = {
  layout: "featured-above",
  category: kitchenCategory,
  subheading: "Powerful appliances for everyday cooking",
  image: photo("kitchen"),
  featured: blender,
  products: [kettle],
};

function section(name: string) {
  return screen.getByRole("region", { name });
}

describe("CategorySection", () => {
  it("introduces the category with its header and a link to all its products", () => {
    render(<CategorySection section={kitchen} />);

    expect(
      within(section("Kitchen")).getByRole("heading", {
        level: 2,
        name: "Kitchen",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Powerful appliances for everyday cooking"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Explore all products in Kitchen" }),
    ).toHaveAttribute("href", "/coming-soon");
  });

  it("shows the featured product and the other products, each linking to its page", () => {
    render(<CategorySection section={kitchen} />);

    const cards = within(section("Kitchen")).getAllByRole("article");

    expect(
      cards.map((card) => [
        within(card).getByRole("heading").textContent,
        within(card)
          .getByRole("link", { name: "Learn more" })
          .getAttribute("href"),
      ]),
    ).toEqual([
      ["Octopus Blender", "/products/personal-blender"],
      ["Octopus Kettle", "/products/kettle"],
    ]);
  });

  it("loads the photo lazily, as it sits below the fold", () => {
    render(<CategorySection section={kitchen} />);

    expect(
      screen.getByRole("img", { name: "A kitchen photo" }),
    ).toHaveAttribute("loading", "lazy");
  });

  it("serves the mobile, tablet and desktop crops at their breakpoints", () => {
    render(<CategorySection section={kitchen} />);

    const img = screen.getByRole("img", { name: "A kitchen photo" });
    const sources = img.closest("picture")!.querySelectorAll("source");
    const crop = (media: string) =>
      Array.from(sources).find((source) => source.media === media)?.srcset;

    expect(crop(breakpointMedia.desktop)).toContain(
      encodeURIComponent("/images/kitchen-desktop.jpg"),
    );
    expect(crop(breakpointMedia.tablet)).toContain(
      encodeURIComponent("/images/kitchen-tablet.jpg"),
    );
    expect(img.getAttribute("src")).toContain(
      encodeURIComponent("/images/kitchen-mobile.jpg"),
    );
  });

  it("names a banner section after its category and presents its product", () => {
    render(
      <CategorySection
        section={{
          layout: "banner",
          category: hairCare,
          image: photo("hair-dryer"),
          featured: dryer,
        }}
      />,
    );

    const banner = section("Hair Care");
    expect(
      within(banner).getByRole("heading", {
        level: 3,
        name: "Octopus Ionic Hair Dryer",
      }),
    ).toBeInTheDocument();
    expect(
      within(banner).getByRole("link", { name: "Learn more" }),
    ).toHaveAttribute("href", "/products/ionic-hair-dryer");
  });

  it("lists every product of a cards section", () => {
    render(
      <CategorySection
        section={{
          layout: "cards",
          category: accessories,
          subheading: "The little things",
          products: [powerBank, charger],
        }}
      />,
    );

    expect(
      within(section("Accessories"))
        .getAllByRole("heading", { level: 3 })
        .map((heading) => heading.textContent),
    ).toEqual(["Octopus Power Bank", "Octopus Car Charger"]);
  });
});
