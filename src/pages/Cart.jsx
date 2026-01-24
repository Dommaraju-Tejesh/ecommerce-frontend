import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

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
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{item.name}</h3>
          <p>Rs {item.price}</p>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}

      <Link to="/checkout">
        <button style={{ marginTop: "20px" }}>Go to Checkout</button>
      </Link>
    </div>
  );
}
