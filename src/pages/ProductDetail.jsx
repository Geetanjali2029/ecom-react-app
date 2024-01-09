import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddToCart from '../components/AddToCart';

function ProductDetail() {
    const { id } = useParams();
    const [productData, setProductData] = useState({});

    useEffect(() => {
        
        fetch(`https://fake-ecommerce-app-api.onrender.com/products/${id}`)
         .then((response) => response.json())
         .then((data) => {
            setProductData(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
    }, [])
    
   
    return (
        <div className="flex-1 bg-gray-100 p-4">
            <h1 className="text-3xl font-bold underline">Product Detail</h1>

            <div className="container mx-auto p-4">
                <div className="flex">
                    <div className="w-1/2">
                    <img
                        src={productData.image}
                        alt={productData.title}
                        className="rounded-lg shadow-lg"
                    />
                    </div>
                    <div className="w-1/2 ml-4">
                    <h1 className="text-3xl font-semibold mb-2">{productData.title}</h1>
                    <p className="text-gray-600 mb-4">{productData.description}</p>
                    <div className="text-2xl font-bold mb-4">{productData.price}</div>
                    <AddToCart productData={productData}/>
                    </div>
                </div>
                </div>
        </div>
    );
}

export default ProductDetail