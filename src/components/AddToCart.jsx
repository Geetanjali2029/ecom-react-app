import React,{ useState,useEffect } from 'react';
import { connect } from "react-redux";
import ShowNotificationDialog from './ShowNotificationDialog';

  const AddToCart = (props) => {
    
    const [cartItems, setCartItems] = useState([]);
    let tempCartData = []; 

    const [notification, setNotification] = useState(null);

    useEffect(() => {
        if (notification) {
        const timeoutId = setTimeout(() => {
            setNotification(null);
        }, 5000);

        return () => clearTimeout(timeoutId);
        }
    }, [notification]);
    
    const addProductToCart = (item) => {

      if(props.cart.cartData.length !== 0 ){
        tempCartData = props.cart.cartData;
      }
      
      if(cartItems.length === 0 ){
        tempCartData.push({...item, quantity: 1 });
      }else{
        tempCartData = tempCartData.map((cartItem) => // if the item is already in the cart, increase the quantity of the item
          cartItem.id === item.id
              ? { ...cartItem, quantity: parseInt(cartItem.quantity) + 1 }
              : cartItem // otherwise, return the cart item
          );
        
      }
      setCartItems(tempCartData);
      props.cartData(tempCartData);
      
      props.cartQuantity(
        tempCartData.reduce((a, b) => a + (b["quantity"] || 0), 0)
      );

      setNotification("Product added to cart successfully");
    };
        
    return (
      <div>
        {notification && (<ShowNotificationDialog message={notification} />)}

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
