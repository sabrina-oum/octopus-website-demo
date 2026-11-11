import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Carousel } from "./Carousel";

type Listener = () => void;

/** Embla needs real layout: this fake only moves between positions. */
function createFakeEmbla(snapCount: number) {
  let selected = 0;
  const listeners = new Set<Listener>();

  const scrollTo = (index: number) => {
    selected = Math.min(Math.max(index, 0), snapCount - 1);
    listeners.forEach((listener) => listener());
  };

  const root = document.createElement("div");

  const api = {
    rootNode: () => root,
    containerNode: () => root,
    slideNodes: (): HTMLElement[] => [],
    reInit: vi.fn(),
    scrollSnapList: () =>
      Array.from({ length: snapCount }, (_, index) => index),
    selectedScrollSnap: () => selected,
    canScrollPrev: () => selected > 0,
    canScrollNext: () => selected < snapCount - 1,
    scrollPrev: vi.fn<(jump?: boolean) => void>(() => scrollTo(selected - 1)),
    scrollNext: vi.fn<(jump?: boolean) => void>(() => scrollTo(selected + 1)),
    scrollTo: vi.fn<(index: number, jump?: boolean) => void>((index) =>
      scrollTo(index),
    ),
    on: (_event: string, listener: Listener) => {
      listeners.add(listener);
      return api;
    },
    off: (_event: string, listener: Listener) => {
      listeners.delete(listener);
      return api;
    },
  };

  return api;
}

const embla = vi.hoisted(() => ({
  current: undefined as ReturnType<typeof createFakeEmbla> | undefined,
}));

function preferReducedMotion(reduce: boolean) {
  vi.spyOn(window, "matchMedia").mockImplementation((query) => {
    const list: MediaQueryList = {
      matches: reduce && query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    };
    return list;
  });
}

vi.mock("embla-carousel-react", () => ({
  default: () => [() => {}, embla.current],
}));

function renderCarousel(slideCount = 3) {
  return render(
    <>
      <h2 id="best-sellers">Best sellers</h2>
      <Carousel labelledBy="best-sellers">
        {Array.from({ length: slideCount }, (_, index) => (
          <article key={index}>Product {index + 1}</article>
        ))}
      </Carousel>
    </>,
  );
}

describe("Carousel", () => {
  beforeEach(() => {
    embla.current = createFakeEmbla(3);
    preferReducedMotion(false);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("disables Previous at the start and Next at the end", async () => {
    const user = userEvent.setup();
    renderCarousel();

    const previous = screen.getByRole("button", { name: "Previous slide" });
    const next = screen.getByRole("button", { name: "Next slide" });
    expect(previous).toBeDisabled();
    expect(next).toBeEnabled();

    await user.click(next);
    expect(previous).toBeEnabled();
    expect(next).toBeEnabled();

    await user.click(next);
    expect(next).toBeDisabled();

    await user.click(previous);
    expect(next).toBeEnabled();
  });

  it("has one dot per scroll position, marks the current one and jumps to a dot", async () => {
    const user = userEvent.setup();
    renderCarousel();

    const dots = screen.getAllByRole("button", {
      name: /^Go to position \d of 3$/,
    });
    expect(dots).toHaveLength(3);
    expect(dots[0]).toHaveAttribute("aria-current", "true");
    expect(dots[2]).not.toHaveAttribute("aria-current");

    await user.click(
      screen.getByRole("button", { name: "Go to position 3 of 3" }),
    );

    expect(dots[2]).toHaveAttribute("aria-current", "true");
    expect(dots[0]).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("button", { name: "Next slide" })).toBeDisabled();
  });

  it("works with the keyboard and keeps focus on a usable arrow at the end", async () => {
    const user = userEvent.setup();
    renderCarousel();

    const next = screen.getByRole("button", { name: "Next slide" });
    for (let press = 0; press < 10 && !next.matches(":focus"); press++) {
      await user.tab();
    }
    expect(next).toHaveFocus();

    await user.keyboard("{Enter}{Enter}");

    expect(next).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Previous slide" }),
    ).toHaveFocus();
  });

  it("shows no controls when every slide fits", () => {
    embla.current = createFakeEmbla(1);
    renderCarousel();

    expect(screen.getByText("Product 3")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("is a carousel named by its heading, with slides named by position", () => {
    renderCarousel();

    const carousel = screen.getByRole("group", { name: "Best sellers" });
    expect(carousel).toHaveAttribute("aria-roledescription", "carousel");
    expect(screen.getByRole("group", { name: "2 of 3" })).toHaveTextContent(
      "Product 2",
    );
  });

  it("animates the arrows and dots by default", async () => {
    const user = userEvent.setup();
    renderCarousel();

    await user.click(screen.getByRole("button", { name: "Next slide" }));
    await user.click(screen.getByRole("button", { name: "Previous slide" }));
    await user.click(
      screen.getByRole("button", { name: "Go to position 3 of 3" }),
    );

    expect(embla.current?.scrollNext).toHaveBeenCalledWith(false);
    expect(embla.current?.scrollPrev).toHaveBeenCalledWith(false);
    expect(embla.current?.scrollTo).toHaveBeenCalledWith(2, false);
  });

  it("jumps without animation when the user prefers reduced motion", async () => {
    preferReducedMotion(true);
    const user = userEvent.setup();
    renderCarousel();

    await user.click(screen.getByRole("button", { name: "Next slide" }));
    await user.click(screen.getByRole("button", { name: "Previous slide" }));
    await user.click(
      screen.getByRole("button", { name: "Go to position 3 of 3" }),
    );

    expect(embla.current?.scrollNext).toHaveBeenCalledWith(true);
    expect(embla.current?.scrollPrev).toHaveBeenCalledWith(true);
    expect(embla.current?.scrollTo).toHaveBeenCalledWith(2, true);
  });
});
