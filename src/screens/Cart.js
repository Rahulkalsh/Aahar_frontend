import React from 'react';
import Delete from '@mui/icons-material/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';
// import trash from "../trash.svg"

export default function Cart() {
  let data = useCart();
  const baseUrl = "https://aahar-backend-1.onrender.com/";

  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center text-danger fs-3'>The Cart is Empty!</div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch(`${baseUrl}api/auth/orderData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });
    console.log("JSON RESPONSE:::::", response.status);
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md' style={{ color: "white" }}>
        <table className='table table-hover'>
          <thead className=' text-success fs-4' style={{ color: "MediumSeaGreen" }}>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row' style={{ color: "white" }}>{index + 1}</th>
                <td style={{ color: "white" }}>{food.name}</td>
                <td style={{ color: "white" }}>{food.qty}</td>
                <td style={{ color: "white" }}>{food.size}</td>
                <td style={{ color: "white" }}>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0" style={{ color: "white" }}>
                    <Delete onClick={() => { dispatch({ type: "REMOVE", index: index }); }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check Out</button>
        </div>
      </div>
    </div>
  );
}
