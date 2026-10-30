import { Suspense } from "react";
import Image from "next/image";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

function Shop({ products }: { products: Product[] }) {
  return (
    <main style={{ padding: 40 }}>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Image
              src={product.image}
              alt={product.title}
              width={100}
              height={100}
              unoptimized
            />
            <h2>{product.title}</h2>
            <p>${product.price.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

async function Products() {
  const res = await fetch("https://fakestoreapi.com/products").catch(() => null);
  if (!res || !res.ok) {
    return <p style={{ padding: 40 }}>Products didn&apos;t load. Refresh the page.</p>;
  }
  const products = await res.json();
  return <Shop products={products} />;
}

export default function Home() {
  return (
    <Suspense fallback={<p style={{ padding: 40 }}>Loading products…</p>}>
      <Products />
    </Suspense>
  );
}