const initialState = {
    totalQuantity: 0,
  };
  
  const CartReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_TO_CART":
        return {
          ...state,
          totalQuantity: action.data,
        };
      default:
        return state;
    }
  };
  export default CartReducer;
  