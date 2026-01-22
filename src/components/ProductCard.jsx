import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div style={card}>
      <img src={product.image} alt="" width="200" />
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

