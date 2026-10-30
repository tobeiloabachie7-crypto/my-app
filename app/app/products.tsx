"use client";
import { useEffect, useState } from "react";
import Shop from "./shop";

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating: { rate: number; count: number };
};

export default function Products() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((r) => {
        if (!r.ok) throw new Error("Bad response");
        return r.json();
      })
      .then(setProducts)
      .catch(() => setFailed(true));
  }, []);

  if (failed) return <p style={{ padding: 40 }}>Products didn&apos;t load. Refresh the page.</p>;
  if (!products) return <p style={{ padding: 40 }}>Loading products…</p>;
  return <Shop products={products} />;
}