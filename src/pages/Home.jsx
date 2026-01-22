import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("products/")
      .then(res => {
        console.log("API RESPONSE:", res.data); // 🔴 IMPORTANT
        setProducts(res.data);
      })
      .catch(err => console.error("API ERROR:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Products</h2>

      {products.length === 0 && <p>No products</p>}

      <div className="row">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
