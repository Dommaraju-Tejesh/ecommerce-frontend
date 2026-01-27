import { useParams } from "react-router-dom";

export default function Order() {
  const { id } = useParams();

  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const order = orders.find((o) => o.id === Number(id));

  if (!order) return <h2 className="text-center mt-5">Order not found</h2>;

  const getImageUrl = (image) => {
    if (!image) return "";
    if (image.startsWith("http")) return image;
    return `${process.env.REACT_APP_API_URL}${image}`;
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Order ID: {order.id}</h2>

      <div className="row">
        {/* LEFT */}
        <div className="col-md-8">
          <div className="card p-3 mb-3 shadow-sm">
            <h5>Shipping</h5>
            <p>
              {order.shippingAddress.address},{" "}
              {order.shippingAddress.city},{" "}
              {order.shippingAddress.pincode},{" "}
              {order.shippingAddress.country}
            </p>
          </div>

          <div className="card p-3 mb-3 shadow-sm">
            <h5>Payment Method</h5>
            <p>{order.paymentMethod}</p>
          </div>

          <div className="card p-3 shadow-sm">
            <h5>Order Items</h5>

            {order.cart.map((item) => (
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
            <p>Items: Rs {order.itemsPrice?.toFixed(2) || order.totalPrice}</p>
            <p>Tax: Rs {order.taxPrice?.toFixed(2) || "Included"}</p>
            <hr />
            <h5>Total: Rs {order.totalPrice}</h5>
            <p className="text-muted">Ordered on: {order.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
