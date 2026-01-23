import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div style={{ padding: "20px" }}>
      <h1>CART ITEMS</h1>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map((item) => (
        <div key={item.id} style={card}>
          <h3>{item.name}</h3>
          <p>Rs {item.price}</p>
          <button onClick={() => removeFromCart(item.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

const card = {
  border: "1px solid #ccc",
  padding: "10px",
  margin: "10px 0",
};
