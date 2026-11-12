import { useId } from "react";
import type { FindUsContent } from "@/catalog";
import { backdropStyle } from "@/lib/backdrop";
import { ArtDirectedImage } from "./ArtDirectedImage";
import { ButtonLink } from "./Button";
import { WarehouseLogo } from "./WarehouseLogo";

type FindUsBannerProps = {
  content: FindUsContent;
};

export function FindUsBanner({ content }: FindUsBannerProps) {
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      style={backdropStyle(content.image.backdrop)}
      className="relative isolate flex aspect-402/688 flex-col bg-(--backdrop) text-white tablet:aspect-81/50 tablet:justify-center desktop:aspect-12/5 desktop:border-t desktop:border-stroke-light"
    >
      <div className="page-container flex flex-col items-center gap-10 pt-20 text-center tablet:items-start tablet:gap-12 tablet:pt-0 tablet:text-left">
        <h2
          id={titleId}
          className="flex flex-col items-center gap-2 text-title-l font-book tablet:items-start tablet:text-h3-l tablet:leading-auto"
        >
          <span>{content.title}</span>{" "}
          <WarehouseLogo className="h-6.25 w-66.25 tablet:h-8.5 tablet:w-90" />
        </h2>
        <ButtonLink
          variant="secondary"
          href={content.cta.href}
          className="focus-visible:outline-white"
        >
          {content.cta.label}
        </ButtonLink>
      </div>
      <div className="absolute inset-0 -z-10">
        <ArtDirectedImage image={content.image} sizes={{ mobile: "100vw" }} />
      </div>
    </section>
  );
}
