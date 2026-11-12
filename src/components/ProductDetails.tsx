import type { Product, ProductSpecItem } from "@/catalog";
import { cx } from "@/lib/cx";
import { Accordion } from "./Accordion";
import { ghostTextClasses } from "./Button";
import { Icon } from "./Icon";

type ProductDetailsProps = {
  product: Product;
};

export function ProductDetails({ product }: ProductDetailsProps) {
  const specs = product.specs ?? [];
  const downloads = product.downloads ?? [];

  if (specs.length === 0 && downloads.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      {specs.length > 0 && (
        <Accordion
          items={specs.map((section) => ({
            title: section.title,
            content: <SpecItems items={section.items} />,
          }))}
        />
      )}
      {downloads.length > 0 && (
        <div className="flex min-h-16 items-center justify-between gap-4 rounded-card bg-card px-5 py-3">
          <h2 className="text-body font-bold">Downloads</h2>
          <ul className="flex flex-wrap justify-end gap-x-6">
            {downloads.map((file) => (
              <li key={file.href}>
                <a
                  href={file.href}
                  target="_blank"
                  rel="noopener"
                  className={cx(
                    "focus-ring inline-flex h-10 items-center gap-2 rounded-button text-cta font-medium transition-colors",
                    ghostTextClasses,
                  )}
                >
                  <Icon name="download" />
                  {file.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

type SpecItemsProps = {
  items: ProductSpecItem[];
};

function SpecItems({ items }: SpecItemsProps) {
  const lines = items.map(({ label, value }) => `${label}: ${value}`);

  if (lines.length === 1) {
    return <p>{lines[0]}</p>;
  }

  return (
    <ul className="list-disc pl-6">
      {lines.map((line, index) => (
        <li key={index}>{line}</li>
      ))}
    </ul>
  );
}
