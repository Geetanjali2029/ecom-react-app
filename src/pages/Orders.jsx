import React, {useState, useEffect} from 'react';

function Orders() {

  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    fetch(`https://fake-ecommerce-app-api.onrender.com/orders/user/13322`)
         .then((response) => response.json())
         .then((data) => {
            setOrderData(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
  }, []);

  const convertDate = (param) => {
    const dateString = param;
    const date = new Date(dateString);
  
    const formattedDate = date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return formattedDate;
  }

  return (
    <div className="flex-1 bg-gray-100 p-4">
        <h1 className="text-3xl font-bold underline pb-6">Your Orders</h1>
        <div className="container mx-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Order Number</th>
                <th className="py-2 px-4 border-b">Customer Name</th>
                <th className="py-2 px-4 border-b">Payment Status</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Address</th>
                <th className="py-2 px-4 border-b">Order Date</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {orderData.length !== 0 && orderData.map((item,index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{item.id}</td>
                <td className="py-2 px-4 border-b">{item.shippingAddress.firstName} {item.shippingAddress.lastName}</td>
                <td className="py-2 px-4 border-b">{item.paymentStatus.split('|')[0]}</td>
                <td className="py-2 px-4 border-b">₹{item.paymentStatus.split('|')[1]}.00</td>
                <td className="py-2 px-4 border-b">{item.shippingAddress.addressLine1}, {item.shippingAddress.city}</td>
                <td className="py-2 px-4 border-b">{convertDate(item.date)}</td>
                <td className="py-2 px-4 border-b">{item.orderStatus}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
}

export default Orders
