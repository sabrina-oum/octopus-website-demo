import { getProducts } from "@/catalog";
import { ProductCard } from "@/components/ProductCard";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="page-container py-10">
      <h1 className="mb-6 heading-1">Octopus</h1>
      <ul className="flex flex-col gap-4 tablet:flex-row">
        {products.map((product) => (
          <li key={product.id} className="tablet:w-1/3">
            <ProductCard product={product} titleAs="h2" />
          </li>
        ))}
      </ul>
    </main>
  );
}
