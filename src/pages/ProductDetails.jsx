import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { CartContext } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    api.get(`/api/products/${id}/`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  let imageUrl = "";

  if (product.image) {
    if (product.image.startsWith("http")) {
      imageUrl = product.image;
    } else {
      imageUrl = `${process.env.REACT_APP_API_URL}${product.image}`;
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      {imageUrl && <img src={imageUrl} alt={product.name} width="300" />}

      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <h3>Rs {product.price}</h3>

      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}
