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

  if (!product) return <p className="text-center mt-5">Loading...</p>;

  const getImageUrl = (image) => {
    if (!image) return "";
    if (image.startsWith("http")) return image;
    return `${process.env.REACT_APP_API_URL}${image}`;
  };

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
    <div className="container mt-5">
      <div className="card shadow p-4">
        <div className="row">
          {/* IMAGE */}
          <div className="col-md-6 text-center">
            <img
              src={getImageUrl(product.image)}
              alt={product.name}
              className="img-fluid rounded"
              style={{ maxHeight: "420px", objectFit: "cover" }}
            />
          </div>

          {/* DETAILS */}
          <div className="col-md-6">
            <h2 className="fw-bold mb-3">{product.name}</h2>

            <h3 className="text-success mb-3">Rs {product.price}</h3>

            <p className="text-muted">{product.description}</p>

            <p>
              <strong>Status:</strong>{" "}
              {product.count_in_stock > 0 ? (
                <span className="badge bg-success">In Stock</span>
              ) : (
                <span className="badge bg-danger">Out of Stock</span>
              )}
            </p>

            {product.count_in_stock > 0 && (
              <div className="mb-3">
                <label className="form-label">Quantity</label>
                <select
                  className="form-select w-25"
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

            <button
              className="btn btn-dark btn-lg mt-3 w-50"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
