import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  // safety check
  if (!product) return null;

  const imageUrl = product.image
    ? `${product.image.startsWith("http") ? "" : process.env.REACT_APP_API_URL}${product.image}`
    : "";

  return (
    <div style={card}>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={product.name}
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
      )}

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
