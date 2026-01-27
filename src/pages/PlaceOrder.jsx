import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function PlaceOrder() {
  const { cart } = useContext(CartContext);

  const shipping = JSON.parse(localStorage.getItem("shippingAddress"));
  const payment = localStorage.getItem("paymentMethod");

  const itemsPrice = cart.reduce(
    (acc, item) => acc + Number(item.price) * item.qty,
    0
  );

  const tax = itemsPrice * 0.1;
  const total = itemsPrice + tax;

  const placeOrder = () => {
    alert("Order Placed Successfully!");
  };

  return (
    <div style={{ padding: "40px", display: "flex", gap: "50px" }}>
      <div style={{ flex: 2 }}>
        <h2>SHIPPING</h2>
        <p>{shipping.address}, {shipping.city}</p>

        <h2>PAYMENT METHOD</h2>
        <p>{payment}</p>

        <h2>ORDER ITEMS</h2>
        {cart.map((item) => (
          <p key={item.id}>
            {item.name} — {item.qty} × Rs {item.price}
          </p>
        ))}
      </div>

      <div style={{ flex: 1 }}>
        <h2>ORDER SUMMARY</h2>
        <p>Items: Rs {itemsPrice}</p>
        <p>Tax: Rs {tax}</p>
        <h3>Total: Rs {total}</h3>

        <button onClick={placeOrder}>PLACE ORDER</button>
      </div>
    </div>
  );
}
