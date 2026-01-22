import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    api.get(`/api/products/${id}/`).then((res) => setProduct(res.data));
  }, [id]);

  return (
    <div style={{ padding: "20px" }}>
      <img src={product.image} width="300" />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <h3>Rs {product.price}</h3>
      <button>Add to Cart</button>
    </div>
  );
}

