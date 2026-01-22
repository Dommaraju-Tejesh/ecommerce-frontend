import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  if (cart.length === 0) return <h3>Cart is empty</h3>;

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.map(item => (
        <div key={item.id}>
          <h4>{item.name}</h4>
          <p>₹{item.price}</p>
          <button onClick={() => removeFromCart(item.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
