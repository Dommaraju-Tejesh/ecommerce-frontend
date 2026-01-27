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
    <div style={{ padding: "40px" }}>
      <h2>SHIPPING</h2>

      <form onSubmit={submitHandler} style={{ maxWidth: "400px" }}>
        <input
          required
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <br /><br />

        <input
          required
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <br /><br />

        <input
          required
          placeholder="Enter postal code"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
        <br /><br />

        <input
          required
          placeholder="Enter country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <br /><br />

        <button type="submit">CONTINUE</button>
      </form>
    </div>
  );
}
