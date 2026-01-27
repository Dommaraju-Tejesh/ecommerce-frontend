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
        const data = res.data;

        if (data.results && Array.isArray(data.results)) {
          setProducts(data.results);
        } else if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold">Latest Products</h2>

      {loading && (
        <p className="text-center fs-5">Loading products...</p>
      )}

      {!loading && products.length === 0 && (
        <p className="text-center fs-5">No products available</p>
      )}

      <div className="row">
        {products.map((p) =>
          p && p.id ? (
            <div key={p.id} className="col-md-4 col-sm-6 mb-4">
              <ProductCard product={p} />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
