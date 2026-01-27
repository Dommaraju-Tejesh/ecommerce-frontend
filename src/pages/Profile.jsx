import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const userOrders = orders.filter(
    (o) => o.userEmail === user.email
  );

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>USER PROFILE</h2>
      <p>Email: {user.email}</p>

      <button onClick={logoutHandler}>Logout</button>

      <h2 style={{ marginTop: "30px" }}>MY ORDERS</h2>

      {userOrders.map((order) => (
        <div key={order.id}>
          <p>
            Order ID: {order.id} — Rs {order.totalPrice}
          </p>
          <button onClick={() => navigate(`/order/${order.id}`)}>
            Details
          </button>
        </div>
      ))}
    </div>
  );
}
