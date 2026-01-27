import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { CartContext } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
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

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      window.location.href = "/login";
      return;
    }

    addToCart(product, qty);
  };

  return (
    <div style={{ padding: "40px", display: "flex", gap: "50px" }}>
      {/* IMAGE */}
      <div>
        {imageUrl && (
          <img src={imageUrl} alt={product.name} width="350" />
        )}
      </div>

      {/* DETAILS */}
      <div style={{ maxWidth: "500px" }}>
        <h2>{product.name}</h2>
        <p>{product.description}</p>

        <h3>Rs {product.price}</h3>

        <p>
          <b>Status:</b>{" "}
          {product.count_in_stock > 0 ? "In Stock" : "Out of Stock"}
        </p>

        {/* QTY SELECT */}
        {product.count_in_stock > 0 && (
          <div style={{ margin: "15px 0" }}>
            <label>Qty: </label>
            <select
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            >
              {[...Array(product.count_in_stock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </div>
        )}

        <button onClick={handleAddToCart}>
          Add To Cart
        </button>
      </div>
    </div>
  );
}
