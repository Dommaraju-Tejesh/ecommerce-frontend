import { useNavigate } from "react-router-dom";

export default function Payment() {
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("paymentMethod", "Cash On Delivery");
    navigate("/placeorder");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Select Method</h2>

      <form onSubmit={submitHandler}>
        <input type="radio" checked readOnly />
        <label> Cash On Delivery</label>
        <br /><br />
        <button type="submit">CONTINUE</button>
      </form>
    </div>
  );
}
