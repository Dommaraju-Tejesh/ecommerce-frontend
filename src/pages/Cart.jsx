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
    return <h2 style={{ padding: "20px" }}>Cart is empty</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>CART ITEMS</h1>

      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            borderBottom: "1px solid #ccc",
            padding: "10px 0",
          }}
        >
          <img
            src={getImageUrl(item.image)}
            alt={item.name}
            width="80"
          />

          <div style={{ flex: 1 }}>
            <h3>{item.name}</h3>
            <p>Rs {item.price}</p>
          </div>

          <div>
            Qty:{" "}
            <select
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
          </div>

          <div>
            <strong>Rs {item.price * item.qty}</strong>
          </div>

          <button onClick={() => removeFromCart(item.id)}>
            Remove
          </button>
        </div>
      ))}

      <div style={{ marginTop: "30px" }}>
        <h2>
          Total ({totalItems} items): Rs {totalPrice}
        </h2>

        <Link to="/checkout">
          <button style={{ marginTop: "10px" }}>
            Proceed To Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}
