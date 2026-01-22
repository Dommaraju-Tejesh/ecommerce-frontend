import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={nav}>
      <h2>Ecommerce Guvi Shop</h2>
      <div>
        <Link to="/">HOME</Link>
        <Link to="/cart">CART</Link>
        <Link to="/checkout">CHECKOUT</Link>
        <Link to="/signup">SIGNUP</Link>
        <Link to="/login">LOGIN</Link>
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
