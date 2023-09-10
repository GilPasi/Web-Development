const Product = (props) => {
  return (
    <div className="product">
      <h3 className="name">{props.name}</h3>
      <img src={`../images/${props.imageSource}`} />
      <div className="desc">{props.description}</div>
      <div className="price">{props.price}🍕</div>
      <button onClick={props.handleClick} name={props.productId}>
        This one!
      </button>
    </div>
  );
};
export default Product;
