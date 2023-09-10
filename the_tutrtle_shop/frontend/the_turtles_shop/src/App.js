/*Internet development course - Assignment 4 
  Authors:
    Yulia Moshan 319656510
    Gil Pasi     206500936
    Dependencies: nodemon, express, cors, mongojs
*/
import './App.css';
import {useState , useEffect} from 'react'
import Header from "./components/header";
import Footer from "./components/footer";
import Products from "./components/products";

function App() {
  const [cartContent , setCartContent] = useState([])
  const [turtlesData , setTurtlesData] = useState({})
  const [totalCost , setTotalCost] = useState(0)
  
  useEffect(() => {
    const cartId = localStorage.getItem("cart id")
    const URL  = "http://localhost:3001/cart?id=" + (cartId?cartId:"")

    fetch(URL)
      .then((res) => res.json())
      .then((cartData) =>{
        //Keep the id for future actions
        if(cartId !== cartData._id)//Update only if the previous value was deleted
          localStorage.setItem("cart id",cartData._id);
        const newCartContent =cartObjectToArray(cartData)
        setCartContent(newCartContent)
      }).catch(err=>console.error(err))
  },[]);

  useEffect(() => {
    const URL  = "http://localhost:3001/products"
    
    fetch(URL)
    .then((res) => res.json())
    .then((_turtlesData) =>{
          setTurtlesData(_turtlesData)
        console.log(_turtlesData.leo)

      })
  },[]);


/*   cartData input example: 
      {ard:{
        product_id:arduino
        name: "Arduino",
        line_price: 9.99,
        quantity: 2
      }} */

  const cartObjectToArray = (CART_OBJECT)=>{
    const CART_ARRAY = Object.entries(CART_OBJECT.items).map(([key,value])=>({
      productId:value.product_id,
      name:value.name,
      quantity:value.quantity,
      totalPrice: value.line_price,
      }))
  return CART_ARRAY
  }


  const handleAdd =(event)=>{
    const _productId = event.target.name
    
    //If the item already exists its a PUT request, not a POST
    if( cartContent.some(obj => obj.id === _productId)){
      handleChangeQuantity(event)
      return;
    }
    
    //Adjust for a post reqest
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cart_id:localStorage.getItem("cart id"),//Saved as a ref since no render is needed
        product: _productId,//Event based trigger 
      })
    }
    
    
    fetch("http://localhost:3001/cart/product" ,requestOptions)
    .then((res) => res.json())
    .then((cartData) =>{
      console.log("cartData" , cartData);
      //Customize the server data to client data
      const newCartContent =cartObjectToArray(cartData);
      //Rerender the cart component
      setCartContent(newCartContent)
      setTotalCost(cartData.sum)
    }).catch(err=>console.error(err))
  }
    
    
    const handleRemove = (event)=>{
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          cart_id:localStorage.getItem("cart id"),
          product: event.target.name,//Event based trigger 
        })
    }
  fetch("http://localhost:3001/cart/product" ,requestOptions)
      .then((res)=>res.json())
      .then((cartData)=>{
          //Customize the server data to client data
          const newCartContent =cartObjectToArray(cartData);
          //Rerender the cart component
          setCartContent(newCartContent)
          setTotalCost(cartData.sum)

      }).catch(err=>console.error(err))
  }

  const handleChangeQuantity =(event) =>{
    const _productId = event.target.name
    const _quantity =  event.target.value !== '' ? event.target.value : '0';

    if(_quantity < 0)return

    console.log(_quantity)
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          cart_id:localStorage.getItem("cart id"),//Saved as a ref since no render is needed
          product: _productId,//Event based trigger 
          quantity: _quantity,
        })
    }

    fetch("http://localhost:3001/cart/product" ,requestOptions)
          .then((res) => res.json())
          .then((cartData) =>{
            console.log("PUT")

          //Customize the server data to client data
          const newCartContent =cartObjectToArray(cartData);
          //Rerender the cart component
          setCartContent(newCartContent)
          setTotalCost(cartData.sum)

      }).catch(err=>console.error(err))
  }

  return (
    <div className="app">
        <Header 
          selectedProducts={cartContent} 
          handleX={handleRemove} 
          handleEdit={handleChangeQuantity} 
          totalCost={totalCost}
      />
        <Products handleAdd={handleAdd} templateProducts={turtlesData}/>
        <div className='footer-wrapper'>
          <Footer/>
        </div>

    </div>
  );
}

export default App;
