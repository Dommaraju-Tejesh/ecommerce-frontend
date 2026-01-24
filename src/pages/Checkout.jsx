import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const itemsPrice = cart.reduce((acc, item) => acc + item.price, 0);
  const taxPrice = itemsPrice * 0.1;
  const totalPrice = itemsPrice + taxPrice;

  const placeOrderHandler = () => {
    alert("Order Placed Successfully!");
    navigate("/");
  };

  if (cart.length === 0) {
    return <h2 style={{ padding: "20px" }}>Your cart is empty</h2>;
  }

  return (
    <div style={{ display: "flex", padding: "20px", gap: "50px" }}>
      {/* LEFT SIDE */}
      <div style={{ flex: 2 }}>
        <h2>SHIPPING</h2>
        <p>Bangalore, Bangalore 560032, India</p>

        <h2 style={{ marginTop: "30px" }}>PAYMENT METHOD</h2>
        <p>Cash on Delivery</p>

        <h2 style={{ marginTop: "30px" }}>ORDER ITEMS</h2>

        {cart.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              borderBottom: "1px solid #ccc",
              paddingBottom: "10px",
            }}
          >
            <div>
              <p>{item.name}</p>
              <p>Rs {item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE */}
      <div
        style={{
          flex: 1,
          border: "1px solid #ccc",
          padding: "20px",
          height: "fit-content",
        }}
      >
        <h2>ORDER SUMMARY</h2>

        <p>Items: Rs {itemsPrice.toFixed(2)}</p>
        <p>Tax: Rs {taxPrice.toFixed(2)}</p>
        <hr />
        <h3>Total: Rs {totalPrice.toFixed(2)}</h3>

        <button
          onClick={placeOrderHandler}
          style={{
            marginTop: "20px",
            padding: "10px",
            width: "100%",
            background: "black",
            color: "white",
            border: "none",
          }}
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  );
}
