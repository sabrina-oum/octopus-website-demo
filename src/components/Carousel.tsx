"use client";

import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import {
  Children,
  isValidElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import { cx } from "@/lib/cx";
import { Button } from "./Button";
import { Icon } from "./Icon";

type EmblaCarouselType = NonNullable<UseEmblaCarouselType[1]>;

const noSubscription = () => () => {};

/** Re-read whenever Embla moves or resizes. */
function useEmblaValue<T>(
  api: EmblaCarouselType | undefined,
  read: (api: EmblaCarouselType) => T,
  initial: T,
): T {
  const subscribe = useCallback(
    (onChange: () => void) => {
      api?.on("select", onChange).on("reInit", onChange);

      return () => {
        api?.off("select", onChange).off("reInit", onChange);
      };
    },
    [api],
  );

  return useSyncExternalStore(
    api ? subscribe : noSubscription,
    () => (api ? read(api) : initial),
    () => initial,
  );
}

/** Whether the last slide runs past the window edge, wherever Embla has scrolled. */
function slidesOverflow(api: EmblaCarouselType): boolean {
  const track = api.containerNode().getBoundingClientRect();
  const lastSlide = api.slideNodes().at(-1)?.getBoundingClientRect();

  return (
    lastSlide !== undefined && lastSlide.right - track.left > track.width + 1
  );
}

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const list = window.matchMedia(reducedMotionQuery);
  list.addEventListener("change", onChange);

  return () => list.removeEventListener("change", onChange);
}

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false,
  );
}

type CarouselProps = {
  children: ReactNode;
  labelledBy: string;
  /** Gap above the controls, and `--carousel-gap` between slides. */
  className?: string;
};

/**
 * Embla stays inside this file. Expects a window-wide `@container` ancestor
 * that clips horizontal overflow, so slides show up to the window edges.
 */
export function Carousel({ children, labelledBy, className }: CarouselProps) {
  const [viewportRef, api] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });

  const canScrollPrev = useEmblaValue(api, (a) => a.canScrollPrev(), false);
  const canScrollNext = useEmblaValue(api, (a) => a.canScrollNext(), false);
  const snapCount = useEmblaValue(api, (a) => a.scrollSnapList().length, 0);
  const selectedSnap = useEmblaValue(api, (a) => a.selectedScrollSnap(), 0);
  // Reduced motion: arrows and dots jump instead of sliding.
  const jump = usePrefersReducedMotion();

  const overflows = useEmblaValue(api, slidesOverflow, false);

  // Embla reads the end margin of the last slide only on (re)init.
  useLayoutEffect(() => {
    api?.reInit();
  }, [api, overflows]);

  // Undo any native scroll made before Embla started.
  useEffect(() => {
    api?.rootNode().scrollTo({ left: 0 });
  }, [api]);

  const previousRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  // At the end the pressed arrow gets disabled, so focus moves to the other.
  function step(direction: "previous" | "next") {
    if (!api) return;

    flushSync(() => {
      if (direction === "previous") api.scrollPrev(jump);
      else api.scrollNext(jump);
    });

    if (direction === "previous" && !api.canScrollPrev()) {
      nextRef.current?.focus();
    } else if (direction === "next" && !api.canScrollNext()) {
      previousRef.current?.focus();
    }
  }

  const slides = Children.toArray(children);
  const hasControls = snapCount > 1;

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-labelledby={labelledBy}
      className={cx("flex flex-col", className)}
    >
      {/* Native scroll until Embla runs (and without JavaScript). */}
      <div
        ref={viewportRef}
        className={cx(
          "-mr-[calc((100cqw-100%)/2)]",
          api ? "overflow-visible" : "overflow-x-auto",
        )}
      >
        <div className={cx("-ml-(--carousel-gap) flex", api && "touch-pan-y")}>
          {slides.map((slide, index) => (
            <div
              key={isValidElement(slide) ? slide.key : index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}`}
              className={cx(
                "min-w-0 shrink-0 pl-(--carousel-gap)",
                // Stops the last card at the right page margin.
                overflows && "last:mr-[calc(100cqw-100%+var(--carousel-gap))]",
              )}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>
      {/* Fixed height: no layout shift when the controls appear. */}
      <div className="flex h-10 items-center justify-between gap-4">
        {hasControls && (
          <>
            <div className="flex">
              {Array.from({ length: snapCount }, (_, index) => {
                const isCurrent = index === selectedSnap;

                return (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to position ${index + 1} of ${snapCount}`}
                    aria-current={isCurrent || undefined}
                    onClick={() => api?.scrollTo(index, jump)}
                    className="focus-ring group flex size-6 items-center justify-center rounded-full"
                  >
                    <span
                      className={cx(
                        "h-2 rounded-full transition-[width,background-color]",
                        // Width, not only color, marks the current dot.
                        isCurrent
                          ? "w-5 bg-icon-primary"
                          : "w-2 bg-text-secondary group-hover:bg-icon-primary",
                      )}
                    />
                  </button>
                );
              })}
            </div>
            <div className="flex gap-2">
              <Button
                ref={previousRef}
                variant="secondary"
                iconOnly
                aria-label="Previous slide"
                disabled={!canScrollPrev}
                onClick={() => step("previous")}
              >
                <Icon name="chevron-left" />
              </Button>
              <Button
                ref={nextRef}
                variant="secondary"
                iconOnly
                aria-label="Next slide"
                disabled={!canScrollNext}
                onClick={() => step("next")}
              >
                <Icon name="chevron-right" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
