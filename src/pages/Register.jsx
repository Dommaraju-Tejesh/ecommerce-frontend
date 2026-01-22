import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("users/register/", {
      email,
      password,
    });

    navigate("/login");
  };

  return (
    <div className="container mt-4">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-success">Register</button>
      </form>
    </div>
  );
};

export default Register;
