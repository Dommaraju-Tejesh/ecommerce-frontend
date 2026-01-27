import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav style={nav}>
      <h2>Ecommerce Shop</h2>

      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/">HOME</Link>
        <Link to="/cart">CART</Link>
        <Link to="/checkout">CHECKOUT</Link>

        {!user ? (
          <>
            <Link to="/signup">SIGNUP</Link>
            <Link to="/login">LOGIN</Link>
          </>
        ) : (
          <>
            <span style={{ cursor: "pointer" }}>
              WELCOME {user.email}
            </span>
            <Link to="/profile">PROFILE</Link>
            <span
              onClick={logoutHandler}
              style={{ cursor: "pointer", color: "red" }}
            >
              LOGOUT
            </span>
          </>
        )}
      </div>
    </nav>
  );
}

const nav = {
  display: "flex",
  justifyContent: "space-between",
  padding: "15px",
  background: "#222",
  color: "white",
};
