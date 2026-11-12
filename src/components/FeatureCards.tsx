import Image from "next/image";
import type { ProductFeature } from "@/catalog";
import { cx } from "@/lib/cx";
import { toSizesAttribute } from "@/lib/imageSizes";
import { Reveal } from "./Reveal";

export function isWideOnDesktop(index: number, count: number): boolean {
  const position = index % 3;

  return position === 0 || (position === 1 && index === count - 1);
}

type FeatureCardsProps = {
  features: ProductFeature[];
};

export function FeatureCards({ features }: FeatureCardsProps) {
  return (
    <ul className="grid gap-4 desktop:grid-cols-2">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          feature={feature}
          wide={isWideOnDesktop(index, features.length)}
        />
      ))}
    </ul>
  );
}

type FeatureCardProps = {
  feature: ProductFeature;
  wide: boolean;
};

function FeatureCard({ feature, wide }: FeatureCardProps) {
  return (
    <li className={cx(wide && "desktop:col-span-2")}>
      <Reveal>
        <div
          className={cx(
            "reveal flex gallery-block-height flex-col gap-4 overflow-hidden rounded-card bg-card px-8 pt-8 text-center",
            "tablet:px-12 tablet:pt-10 desktop:text-left",
            wide
              ? "desktop:aspect-[709/324.33] desktop:flex-row desktop:items-center desktop:gap-17 desktop:py-0 desktop:pr-0 desktop:pl-10"
              : "desktop:aspect-[346.5/455.76] desktop:px-8",
          )}
        >
          <div
            className={cx(
              "flex flex-col gap-2",
              wide && "desktop:h-14.25 desktop:w-63 desktop:shrink-0",
            )}
          >
            <h2 className="text-title-m font-bold tablet:text-h3-m desktop:text-title-m">
              {feature.title}
            </h2>
            <p className="text-body font-book tablet:text-title-m desktop:text-body">
              {feature.description}
            </p>
          </div>
          <div className="relative min-h-0 flex-1 self-stretch">
            <Image
              src={feature.image.src}
              alt={feature.image.alt}
              fill
              sizes={toSizesAttribute({
                mobile: "calc(100vw - 6rem)",
                tablet: "calc(100vw - 27rem)",
                desktop: wide
                  ? "min(21.8125rem, 24vw)"
                  : "min(17.65625rem, 20vw)",
              })}
              className={cx(
                "object-contain object-bottom",
                wide && "desktop:object-right",
              )}
            />
          </div>
        </div>
      </Reveal>
    </li>
  );
}
