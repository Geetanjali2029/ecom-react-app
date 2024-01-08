import React,{ useState, useEffect } from 'react';
import { connect } from "react-redux";
// import { addtocart } from '../redux/actions';

  const AddToCart = (props) => {
    
    const [cartItems, setCartItems] = useState([]);
    useEffect(()=>{

    }, [cartItems])

    const addProductToCart = (item) => {

      const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.productData.id); // check if the item is already in the cart

      if (isItemInCart) {
      setCartItems(
          cartItems.map((cartItem) => // if the item is already in the cart, increase the quantity of the item
          cartItem.id === item.productData.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem // otherwise, return the cart item
          )
      );
      } else {
      setCartItems([...cartItems, { ...item.productData, quantity: 1 }]); // if the item is not in the cart, add the item to the cart
      }
      props.cartQuantity(
        cartItems.reduce((a, b) => a + (b["quantity"] || 0), 0)
      );

      console.log(`cartItems:=>${JSON.stringify(cartItems)}`)
    };
        
    return (
      <div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          onClick={()=>addProductToCart(props)}
        >
          Add To Cart
        </button>
      </div>
    );
  }

    
  function mapDispatchToProps(dispatch) {
    return {
      cartQuantity: (cartQuantity) =>
        dispatch({ type: "ADD_TO_CART", data: cartQuantity }),
    };
  }
  export default connect(
    null,
    mapDispatchToProps
  )(AddToCart);
