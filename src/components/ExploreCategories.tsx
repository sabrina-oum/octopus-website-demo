import Link from "next/link";
import { useId } from "react";
import type { CategoryTileData, ExploreCategoriesData } from "@/catalog";
import { ResponsiveImage } from "./ResponsiveImage";

type ExploreCategoriesProps = {
  content: ExploreCategoriesData;
};

export function ExploreCategories({ content }: ExploreCategoriesProps) {
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className="pt-10 pb-30 tablet:py-20 desktop:pt-30 desktop:pb-45"
    >
      <div className="page-container flex flex-col gap-8 tablet:gap-10 desktop:gap-12">
        <h2 id={titleId} className="heading-3 text-center tablet:text-left">
          {content.title}
        </h2>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-6 tablet:grid-cols-4 tablet:gap-4 desktop:gap-6">
          {content.tiles.map((tile) => (
            <li key={tile.category}>
              <CategoryTileLink tile={tile} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CategoryTileLink({ tile }: { tile: CategoryTileData }) {
  return (
    <Link
      href={tile.href}
      className="focus-ring group flex flex-col gap-4 rounded-card text-center"
    >
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-card bg-card">
        <div className="w-[84.6%] transition-transform duration-300 ease-out group-hover:scale-105 group-focus-visible:scale-105 motion-reduce:transition-none">
          <ResponsiveImage
            src={tile.image}
            alt=""
            ratio="1/1"
            sizes={{ mobile: "45vw", tablet: "22vw", desktop: "270px" }}
          />
        </div>
      </div>
      <span className="text-title-m font-book">{tile.categoryName}</span>
    </Link>
  );
}
