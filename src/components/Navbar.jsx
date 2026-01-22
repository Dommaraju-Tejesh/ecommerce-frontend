import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: "15px" }}>Products</Link>
      <Link to="/cart" style={{ marginRight: "15px" }}>Cart</Link>
      <Link to="/login" style={{ marginRight: "15px" }}>Login</Link>
      <Link to="/signup">Signup</Link>
    </nav>
  );
};

export default Navbar;
