import { useId } from "react";
import { preload } from "react-dom";
import type { HeroContent, HeroVideo } from "@/catalog";
import { breakpointMedia } from "@/lib/breakpoints";
import { ButtonLink } from "./Button";

function HeroVideoBackdrop({ video }: { video: HeroVideo }) {
  if (video.poster) {
    preload(video.poster, { as: "image", fetchPriority: "high" });
  }

  // TODO(real video): add a pause control and honour reduced motion (WCAG 2.2.2).
  // The <source> is picked once, at load: resizing keeps that cut.
  return (
    <video
      aria-hidden
      autoPlay
      muted
      loop
      playsInline
      poster={video.poster}
      className="absolute inset-0 size-full object-cover"
    >
      <source media={breakpointMedia.tablet} src={video.landscape} />
      <source src={video.portrait} />
    </video>
  );
}

type HeroProps = {
  hero: HeroContent;
};

export function Hero({ hero }: HeroProps) {
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className="hero-placeholder relative isolate -mt-header flex min-h-[max(100svh,--spacing(144))] flex-col items-center overflow-hidden px-6 pt-26 pb-26 text-center tablet:px-page-tablet tablet:pt-45 desktop:-mt-header-desktop desktop:px-page-desktop"
    >
      {/* The section gradient stands in for the video while it loads. */}
      {hero.video && <HeroVideoBackdrop video={hero.video} />}
      <div className="relative flex flex-col items-center gap-6 tablet:gap-8">
        <div className="flex flex-col items-center gap-2 desktop:gap-3">
          <h1 id={titleId} className="heading-1">
            {hero.title}
          </h1>
          <p className="subtitle max-w-hero-text text-text-secondary">
            {hero.description}
          </p>
        </div>
        <ButtonLink href={hero.cta.href}>{hero.cta.label}</ButtonLink>
      </div>
    </section>
  );
}
