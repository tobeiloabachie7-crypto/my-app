"use client";
import { useState } from "react";
import Image from "next/image";

const money = (n: number) => `$${n.toFixed(2)}`;

type Product = {
  id: number;
  category: string;
  title: string;
  image: string;
  price: number;
  rating: { rate: number; count: number };
};

export default function Shop({ products }: { products: Product[] }) {
  const [category, setCategory] = useState("all");
  const [cart, setCart] = useState<Record<number, number>>({}); // { [id]: qty }
  const [justAdded, setJustAdded] = useState<number | null>(null);

  const categories = ["all", ...new Set(products.map((p) => p.category))];
  const visible =
    category === "all" ? products : products.filter((p) => p.category === category);
  const featured = [...products].sort((a, b) => b.rating.rate - a.rating.rate)[0];
  const count = Object.values(cart).reduce((a, b) => a + b, 0);

  function add(id: number) {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
    setJustAdded(id);
    setTimeout(() => setJustAdded(null), 1200);
  }

  return (
    <>
      <header className="bar">
        <div className="wrap bar-inner">
          <a href="#top" className="logo">Parcel</a>
          <nav aria-label="Main">
            <a href="#shop">Shop</a>
          </nav>
          <div className="cart" aria-live="polite">
            Cart <span className="badge">{count}</span>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero wrap">
          <div className="hero-copy">
            <h1>Everyday things, well chosen.</h1>
            <p>
              Clothing, jewelery and electronics from one small catalogue. Every
              item is rated by real buyers, so you can see what worth keeping.
            </p>
            <a className="btn" href="#shop">Browse {products.length} products</a>
          </div>
          {featured && (
            <figure className="hero-card">
              <Image src={featured.image} alt={featured.title} width={500} height={500} unoptimized/>
              <figcaption>
                <strong>Top rated: {featured.title}</strong>
                <span>{featured.rating.rate} / 5 from {featured.rating.count} reviews</span>
              </figcaption>
            </figure>
          )}
        </section>

        <section id="shop" className="wrap shop">
          <div className="shop-head">
            <h2>Shop all</h2>
            <div className="chips" role="group" aria-label="Filter by category">
              {categories.map((c) => (
                <button
                  key={c}
                  className={c === category ? "chip on" : "chip"}
                  aria-pressed={c === category}
                  onClick={() => setCategory(c)}
                >
                  {c === "all" ? "All" : c.charAt(0).toUpperCase() + c.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid">
            {visible.map((p) => (
              <article key={p.id} className="card">
                <div className="thumb">
                  <Image src={p.image} alt={p.title} width={500} height={500} loading="lazy" unoptimized/>
                </div>
                <p className="cat">{p.category}</p>
                <h3>{p.title}</h3>
                <p className="rating">
                  {p.rating.rate} / 5 ({p.rating.count})
                </p>
                <div className="buy">
                  <span className="price">{money(p.price)}</span>
                  <button className="btn small" onClick={() => add(p.id)}>
                    {justAdded === p.id ? "Added" : "Add to cart"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap">
          <p>Parcel. Product data from fakestoreapi.com.</p>
        </div>
      </footer>
    </>
  );
}