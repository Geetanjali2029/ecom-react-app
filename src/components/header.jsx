import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addtocart } from '../redux/actions';

function header(props) {
  // console.log(props)
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Your Website</h1>
        </div>
        <div className="space-x-4">
            <Link to="/" className="hover:text-gray-300"> Home</Link>
            <Link to="/cart" className="hover:text-gray-300"> My Cart
            <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              9</span>
            </Link>
            <Link to="/orders" className="hover:text-gray-300"> My Oders</Link>
        </div>
      </nav>
    </header>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps,{addtocart})(header);

// export default header;
