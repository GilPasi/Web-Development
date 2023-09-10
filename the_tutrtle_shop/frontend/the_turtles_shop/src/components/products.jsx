import Product from "./product";

const Products = (props) => {
  return (
    <div className="products">
      {Object.entries(props.templateProducts).map((turtle) => {
        return (
          <Product
            productId={turtle[0]}
            name={turtle[1].name}
            description={turtle[1].description}
            price={turtle[1].price}
            handleClick={props.handleAdd}
            imageSource={turtle[1].imageSource}
          />
        );
      })}
    </div>
  );
};
export default Products;
