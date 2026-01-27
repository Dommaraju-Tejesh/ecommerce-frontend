import { useParams } from "react-router-dom";

export default function Order() {
  const { id } = useParams();

  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const order = orders.find((o) => o.id === Number(id));

  if (!order) return <h2>Order not found</h2>;

  return (
    <div style={{ padding: "40px" }}>
      <h2>ORDER ID: {order.id}</h2>

      <h3>SHIPPING</h3>
      <p>
        {order.shippingAddress.address},{" "}
        {order.shippingAddress.city},{" "}
        {order.shippingAddress.pincode},{" "}
        {order.shippingAddress.country}
      </p>

      <h3>PAYMENT METHOD</h3>
      <p>{order.paymentMethod}</p>

      <h3>ORDER ITEMS</h3>
      {order.cart.map((item) => (
        <p key={item.id}>
          {item.name} — {item.qty} x Rs {item.price}
        </p>
      ))}

      <h3>Total: Rs {order.totalPrice}</h3>
    </div>
  );
}
