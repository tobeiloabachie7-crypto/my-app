import Image from "next/image";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

function Shop({ products }: { products: Product[] }) {
  return (
    <main className="wrap">
      <h1>Shop</h1>
      <div className="products">
        {products.map((product) => (
          <article key={product.id}>
            <Image
              src={product.image}
              alt={product.title}
              width={160}
              height={160}
              unoptimized
            />
            <h2>{product.title}</h2>
            <p>${product.price.toFixed(2)}</p>
          </article>
        ))}
      </div>
    </main>
  );
}

export default async function Home() {
  let products = [];
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Bad response");
    products = await res.json();
  } catch {
    return (
      <main className="wrap" style={{ padding: "80px 0" }}>
        <h1>Products didn&apos;t load</h1>
        <p>Check your internet connection and refresh the page.</p>
      </main>
    );
  }
  return <Shop products={products} />;
}