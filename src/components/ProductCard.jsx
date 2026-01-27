import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  if (!product) return null;

  let imageUrl = "";

  if (product.image) {
    if (product.image.startsWith("http")) {
      imageUrl = product.image;
    } else {
      imageUrl = `${process.env.REACT_APP_API_URL}${product.image}`;
    }
  }

  return (
    <div className="card h-100 shadow-sm">
      {imageUrl && (
        <img
          src={imageUrl}
          className="card-img-top"
          alt={product.name}
          style={{ height: "220px", objectFit: "cover" }}
        />
      )}

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <h6 className="text-success mb-3">Rs {product.price}</h6>

        <Link
          to={`/product/${product.id}`}
          className="btn btn-dark mt-auto"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
