import { useNavigate } from "react-router-dom";

export default function Payment() {
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("paymentMethod", "Cash on Delivery");
    navigate("/placeorder");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <h3 className="mb-4 text-center">Payment Method</h3>

        <form onSubmit={submitHandler}>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="radio"
              checked
              readOnly
            />
            <label className="form-check-label">
              Cash on Delivery
            </label>
          </div>

          <button type="submit" className="btn btn-dark w-100">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
