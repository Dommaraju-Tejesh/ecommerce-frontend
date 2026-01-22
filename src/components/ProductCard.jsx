import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  if (!product) return null;

  const imageUrl = product.image?.startsWith("http")
    ? product.image
    : `${process.env.REACT_APP_API_URL}${product.image}`;

  return (
    <div style={card}>
      <img
        src={imageUrl}
        alt={product.name}
        width="200"
        height="200"
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
