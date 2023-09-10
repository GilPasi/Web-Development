import { useState } from "react";
import Cart from "./cart";
const Header = (props) => {
  const { handleX, handleEdit, selectedProducts, totalCost } = props;
  const [showCart, setShowCart] = useState(false);

  return (
    <header>
      <div id="top-menu">
        <img src="../images/icon.png" alt="the turtles icon" />
        <h1>The turtles shop!</h1>
        <button
          id="cart-button"
          onClick={() => setShowCart((prevShow) => !prevShow)}
        >
          {showCart ? "Hide" : "Show"} cart
        </button>

        {showCart && (
          <Cart
            totalCost={totalCost}
            productsList={selectedProducts}
            handleClick={handleX}
            handleChange={handleEdit}
          />
        )}
      </div>
    </header>
  );
};
export default Header;
