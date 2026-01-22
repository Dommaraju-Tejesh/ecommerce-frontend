import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { CartContext } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    if (!id) return;

    api
      .get(`products/${id}/`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/cart"); // ✅ IMPORTANT: no page reload
  };

  return (
    <div className="container mt-4">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <h4>₹{product.price}</h4>

      <button
        className="btn btn-success"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;

