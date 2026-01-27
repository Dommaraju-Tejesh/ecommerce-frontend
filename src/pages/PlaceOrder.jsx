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

  const getImageUrl = (image) => {
    if (!image) return "";
    if (image.startsWith("http")) return image;
    return `${process.env.REACT_APP_API_URL}${image}`;
  };

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
      itemsPrice,
      taxPrice,
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
    <div className="container mt-5">
      <div className="row">
        {/* LEFT */}
        <div className="col-md-8">
          <div className="card p-3 mb-3 shadow-sm">
            <h5>Shipping</h5>
            <p>
              {shippingAddress.address}, {shippingAddress.city},{" "}
              {shippingAddress.pincode}, {shippingAddress.country}
            </p>
          </div>

          <div className="card p-3 mb-3 shadow-sm">
            <h5>Payment Method</h5>
            <p>{paymentMethod}</p>
          </div>

          <div className="card p-3 shadow-sm">
            <h5>Order Items</h5>

            {cart.map((item) => (
              <div
                key={item.id}
                className="d-flex align-items-center border-bottom py-2"
              >
                <img
                  src={getImageUrl(item.image)}
                  alt={item.name}
                  width="70"
                  className="me-3"
                />
                <div style={{ flex: 1 }}>
                  <strong>{item.name}</strong>
                </div>
                <div>
                  {item.qty} × Rs {item.price} ={" "}
                  <strong>Rs {item.qty * item.price}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h5>Order Summary</h5>
            <p>Items: Rs {itemsPrice.toFixed(2)}</p>
            <p>Tax: Rs {taxPrice.toFixed(2)}</p>
            <hr />
            <h5>Total: Rs {totalPrice.toFixed(2)}</h5>

            <button
              onClick={placeOrderHandler}
              className="btn btn-dark w-100 mt-3"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
