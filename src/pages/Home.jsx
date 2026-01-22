import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/products/")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          setProducts([]);
        }
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>LATEST PRODUCTS</h1>

      {loading && <p style={{ textAlign: "center" }}>Loading products...</p>}

      {!loading && products.length === 0 && (
        <p style={{ textAlign: "center" }}>No products available</p>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {products.map((p) =>
          p && p.id ? <ProductCard key={p.id} product={p} /> : null
        )}
      </div>
    </div>
  );
}
