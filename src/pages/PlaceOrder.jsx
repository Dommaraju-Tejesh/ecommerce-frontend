import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function PlaceOrder() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const shippingAddress = JSON.parse(
    localStorage.getItem("shippingAddress")
  );

  const itemsPrice = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const taxPrice = itemsPrice * 0.1;
  const totalPrice = itemsPrice + taxPrice;

  const placeOrderHandler = () => {
    const order = {
      id: Date.now(),
      cart,
      shippingAddress,
      totalPrice,
    };

    localStorage.setItem("lastOrder", JSON.stringify(order));
    navigate(`/order/${order.id}`);
  };

  return (
    <div style={{ display: "flex", padding: "40px", gap: "50px" }}>
      <div style={{ flex: 2 }}>
        <h2>SHIPPING</h2>
        <p>
          {shippingAddress.address}, {shippingAddress.city},{" "}
          {shippingAddress.pincode}, {shippingAddress.country}
        </p>

        <h2>ORDER ITEMS</h2>
        {cart.map((item) => (
          <p key={item.id}>
            {item.name} — {item.qty} x Rs {item.price}
          </p>
        ))}
      </div>

      <div style={{ flex: 1 }}>
        <h2>ORDER SUMMARY</h2>
        <p>Items: Rs {itemsPrice}</p>
        <p>Tax: Rs {taxPrice}</p>
        <h3>Total: Rs {totalPrice}</h3>

        <button onClick={placeOrderHandler}>
          PLACE ORDER
        </button>
      </div>
    </div>
  );
}
