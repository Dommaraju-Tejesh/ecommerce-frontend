import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100">
        {product.image && (
          <img
            src={product.image}
            className="card-img-top"
            alt={product.name}
          />
        )}

        <div className="card-body">
          <h5>{product.name}</h5>
          <p>₹{product.price}</p>

          <Link to={`/product/${product.id}`} className="btn btn-primary">
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

