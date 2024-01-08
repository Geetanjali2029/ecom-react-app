import React,{ useState, useEffect } from 'react';
import { connect } from "react-redux";

function Cart(props) {

  const [cartItems, setCartItems] = useState(props.cart.cartData);
  useEffect(() => {
    
    console.log(cartItems);
  },[cartItems]);

  return (
    <div className="flex-1 bg-gray-100 p-4">
        <h1 className="text-3xl font-bold underline">Cart page sdfdsf</h1>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps,null)(Cart);
