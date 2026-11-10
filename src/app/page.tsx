import { getProducts } from "@/catalog";
import { ProductCard } from "@/components/ProductCard";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="mx-auto w-full max-w-5xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Octopus</h1>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </main>
  );
}
