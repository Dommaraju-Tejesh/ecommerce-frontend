import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQty } = useContext(CartContext);

  const getImageUrl = (image) => {
    if (!image) return "";
    if (image.startsWith("http")) return image;
    return `${process.env.REACT_APP_API_URL}${image}`;
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h3>Your Cart is Empty</h3>
        <Link to="/" className="btn btn-dark mt-3">
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Shopping Cart</h2>

      <div className="row">
        {/* LEFT SIDE - ITEMS TABLE */}
        <div className="col-md-8">
          <table className="table align-middle">
            <thead className="table-dark">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td className="d-flex align-items-center gap-3">
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.name}
                      width="70"
                      className="rounded"
                    />
                    {item.name}
                  </td>

                  <td>Rs {item.price}</td>

                  <td style={{ width: "100px" }}>
                    <select
                      className="form-select"
                      value={item.qty}
                      onChange={(e) =>
                        updateQty(item.id, e.target.value)
                      }
                    >
                      {[...Array(10).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>Rs {item.price * item.qty}</td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* RIGHT SIDE - SUMMARY CARD */}
        <div className="col-md-4">
          <div className="card shadow p-3">
            <h4>Order Summary</h4>
            <hr />

            <p>
              Items ({totalItems}): <strong>Rs {totalPrice}</strong>
            </p>

            <Link to="/checkout" className="btn btn-dark w-100 mt-3">
              Proceed To Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
