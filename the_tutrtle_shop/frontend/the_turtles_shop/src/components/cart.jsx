const Cart = (props) => {
  const { productsList, handleClick, handleChange, totalCost } = props;
  /*The products list must work by the following template:
    prodList=[
        ...
        {
        productId: "arduino",
        name:"Arduino", 
        quantity:3,
        unitPrice:25},
        ...
    ]
    */
  //  const totalCost = productsList.reduce()
  // console.log(productsList);

  let listElement = <></>;

  //On the initial connection, do not calculate the cart

  if (props.productsList)
    listElement = productsList.map((prod) => (
      <li className="aligner">
        {prod.name}{" "}
        <input
          type="number"
          value={prod.quantity}
          onChange={handleChange}
          name={prod.productId}
        />
        <span>{prod.totalPrice}🍕</span>
        <button onClick={handleClick} name={prod.productId}>
          X
        </button>
      </li>
    ));

  return (
    <div id="cartbox">
      <h6 className="">your cart</h6>
      <ul>{listElement}</ul>
      {listElement.length === 0 && <p>There are no items yet!</p>}
      <hr />
      total: {totalCost}
    </div>
  );
};
export default Cart;
