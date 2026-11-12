import type { Product } from "@/catalog";
import { ButtonLink } from "./Button";

type LearnMoreLinkProps = {
  product: Product;
};

export function LearnMoreLink({ product }: LearnMoreLinkProps) {
  return (
    <ButtonLink href={product.href}>
      Learn more<span className="sr-only"> about {product.name}</span>
    </ButtonLink>
  );
}
