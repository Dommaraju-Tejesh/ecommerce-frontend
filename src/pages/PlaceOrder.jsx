import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function PlaceOrder() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));
  const paymentMethod = localStorage.getItem("paymentMethod");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please login again");
    navigate("/login");
    return null;
  }

  const itemsPrice = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const taxPrice = itemsPrice * 0.1;
  const totalPrice = itemsPrice + taxPrice;

  const placeOrderHandler = () => {
    const order = {
      id: Date.now(),
      userEmail: user.email,
      cart,
      shippingAddress,
      paymentMethod,
      totalPrice,
      date: new Date().toLocaleString(),
    };

    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    existingOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");

    navigate(`/order/${order.id}`);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>PLACE ORDER</h2>
      <button onClick={placeOrderHandler}>CONFIRM ORDER</button>
    </div>
  );
}
