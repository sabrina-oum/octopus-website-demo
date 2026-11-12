import { useId } from "react";
import {
  categoryLabels,
  type CategorySectionData,
  type FeaturedSectionData,
  type Product,
} from "@/catalog";
import { cx } from "@/lib/cx";
import { comingSoonPath } from "@/navigation";
import { ButtonLink } from "./Button";
import { HighlightProductCard } from "./HighlightProductCard";
import { MediumProductCard } from "./MediumProductCard";
import { ProductBanner } from "./ProductBanner";
import { ProductCard } from "./ProductCard";
import { SectionHeader } from "./SectionHeader";

type CategorySectionProps = {
  section: CategorySectionData;
};

export function CategorySection({ section }: CategorySectionProps) {
  const titleId = useId();
  const title = categoryLabels[section.category];

  if (section.layout === "banner") {
    return (
      <section aria-labelledby={titleId}>
        <h2 id={titleId} className="sr-only">
          {title}
        </h2>
        <ProductBanner product={section.featured} image={section.image} />
      </section>
    );
  }

  return (
    <section
      aria-labelledby={titleId}
      className="pt-10 pb-20 tablet:py-20 desktop:py-30"
    >
      <div className="page-container flex flex-col gap-10 desktop:gap-20">
        <SectionHeader
          title={title}
          subheading={section.subheading}
          titleId={titleId}
        >
          <ButtonLink variant="secondary" href={comingSoonPath}>
            Explore all products<span className="sr-only"> in {title}</span>
          </ButtonLink>
        </SectionHeader>
        {section.layout === "cards" ? (
          <SmallCards products={section.products} />
        ) : (
          <FeaturedProducts section={section} />
        )}
      </div>
    </section>
  );
}

function FeaturedProducts({ section }: { section: FeaturedSectionData }) {
  // On desktop: large card on the left, medium cards stacked on its right.
  const beside = section.layout === "featured-beside";

  return (
    <div
      className={cx(
        "flex flex-col gap-4 desktop:gap-6",
        beside && "desktop:flex-row",
      )}
    >
      <div className="desktop:flex-1">
        <HighlightProductCard
          product={section.featured}
          image={section.image}
          desktopShape={beside ? "vertical" : "horizontal"}
        />
      </div>
      <ul
        className={cx(
          "grid gap-4 tablet:grid-cols-[repeat(auto-fit,minmax(min(20rem,100%),1fr))] desktop:gap-6",
          beside && "desktop:flex-1 desktop:grid-cols-1",
        )}
      >
        {section.products.map((product) => (
          <li key={product.id}>
            <MediumProductCard
              product={product}
              desktopShape={beside ? "horizontal" : "vertical"}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function SmallCards({ products }: { products: Product[] }) {
  return (
    <ul className="grid gap-4 tablet:grid-cols-3 desktop:gap-6">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
