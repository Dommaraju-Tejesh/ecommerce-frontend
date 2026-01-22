import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  // 🔥 VERY IMPORTANT SAFETY CHECK
  if (!product) return null;

  return (
    <div style={card}>
      <img
        src={`${process.env.REACT_APP_API_URL}${product.image}`}
        alt={product.name}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />

      <h3>{product.name}</h3>
      <p>Rs {product.price}</p>
      <Link to={`/product/${product.id}`}>View More</Link>
    </div>
  );
}

const card = {
  border: "1px solid #ccc",
  padding: "10px",
  margin: "10px",
  width: "250px",
};
