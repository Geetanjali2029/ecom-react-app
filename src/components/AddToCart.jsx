import React,{ useState } from 'react';
import { connect } from "react-redux";

  const AddToCart = (props) => {
    
    const [cartItems, setCartItems] = useState([]);
    let tempCartData = []; 

    const addProductToCart = (item) => {
      // console.log(props.cart.cartData);return;
      if(props.cart.cartData.length !== 0){
        setCartItems(props.cart.cartData);
        tempCartData = tempCartData.concat(props.cart.cartData);
      }
      
      if(cartItems.length === 0){
       
        tempCartData.push(item);
        tempCartData = tempCartData.map((cartItem) => // if the item is already in the cart, increase the quantity of the item
            cartItem.id === item.id
                ? { ...cartItem, quantity: 1 }
                : cartItem // otherwise, return the cart item
            );
      }else{
        const isItemInCart = tempCartData.find((cartItem) => cartItem.id === item.id);

        if(isItemInCart){

          tempCartData = tempCartData.map((cartItem) => // if the item is already in the cart, increase the quantity of the item
            cartItem.id === item.id
                ? { ...cartItem, quantity: parseInt(cartItem.quantity) + 1 }
                : cartItem // otherwise, return the cart item
            );
        }
      }
      setCartItems(tempCartData);
      props.cartData(tempCartData);
      
      props.cartQuantity(
        tempCartData.reduce((a, b) => a + (b["quantity"] || 0), 0)
      );
      
    };
        
    return (
      <div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          onClick={()=>addProductToCart(props.productData)}
        >
          Add To Cart
        </button>
      </div>
    );
  }

  const mapStateToProps = (state) => ({
    cart: state.cart,
  });
  
  function mapDispatchToProps(dispatch) {
    return {
      cartQuantity: (cartQuantity) =>
        dispatch({ type: "ADD_TO_CART", data: cartQuantity }),
      cartData: (cartData) =>
        dispatch({ type: "CART_DATA", data: cartData }),
    };
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddToCart);
