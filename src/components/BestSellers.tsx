import { useId, type ComponentType } from "react";
import type { Product } from "@/catalog";
import { cx } from "@/lib/cx";
import { Carousel } from "./Carousel";
import { FeaturedProductCard } from "./FeaturedProductCard";
import { PopularProductCard } from "./PopularProductCard";

type BestSellersLayout = {
  Card: ComponentType<{ product: Product }>;
  section: string;
  gap: string;
  slideGap: string;
};

const layouts = {
  large: {
    Card: FeaturedProductCard,
    section: "pt-20 pb-10 tablet:pb-20 desktop:pt-30 desktop:pb-15",
    gap: "gap-8 tablet:gap-10",
    slideGap:
      "[--carousel-gap:--spacing(4)] desktop:[--carousel-gap:--spacing(6)]",
  },
  small: {
    Card: PopularProductCard,
    section: "pt-20 pb-10 tablet:pb-20",
    gap: "gap-8",
    slideGap: "[--carousel-gap:--spacing(4)]",
  },
} satisfies Record<string, BestSellersLayout>;

type BestSellersProps = {
  products: Product[];
  cards: keyof typeof layouts;
};

export function BestSellers({ products, cards }: BestSellersProps) {
  const titleId = useId();
  const { Card, section, gap, slideGap } = layouts[cards];

  return (
    <section
      aria-labelledby={titleId}
      className={cx("@container overflow-x-clip", section)}
    >
      <div className={cx("page-container flex flex-col", gap)}>
        <h2 id={titleId} className="heading-3">
          Best sellers
        </h2>
        <Carousel labelledBy={titleId} className={cx(gap, slideGap)}>
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
