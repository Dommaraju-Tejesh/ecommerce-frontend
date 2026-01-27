import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Checkout() {
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({ address, city, pincode, country })
    );

    navigate("/payment");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <h3 className="mb-4 text-center">Shipping Address</h3>

        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              className="form-control"
              required
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">City</label>
            <input
              className="form-control"
              required
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Postal Code</label>
            <input
              className="form-control"
              required
              placeholder="Enter postal code"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Country</label>
            <input
              className="form-control"
              required
              placeholder="Enter country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-dark w-100">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
