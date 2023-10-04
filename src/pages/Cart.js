import React, { useEffect, useState } from 'react';
import '../styles/cardItem.css';
import Delivery from '../components/Delivery';
// import Additem from '../components/Additem';

export default function Cart({cartreciveFun}) {
  const [getData,setGet_data] = useState([]);
  const [qtyValue,setQtyValue] = useState()

  useEffect(() => {
    // Load the cart from localStorage when the component mounts
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setGet_data(storedCart);
     //  ------------------------------Api get Method---------------------
  }, []);


  //  ------------------------------ Adding Cart Total Amount and values --------------------------------------

  function sumTotal(arrNumber) {
    cartreciveFun(getData.length);
    return arrNumber.reduce((acc, currentValue) => acc + currentValue, 0);

  }
  
  const TotalValus = getData.map(events => events.item_price * events.item_qty);
  const result = sumTotal(TotalValus);

  //  ------------ To formatted into  currency Simbols ------------------------------

  const formattedAmount = result.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
  });


  const updateCart = (cartValue) => {
    // Update the cart in component state
    setGet_data(cartValue);
  // Update the cart in localStorage
  localStorage.setItem('cart', JSON.stringify(cartValue));

  }

  const addToCart = (item) => {
    // Check if the item is already in the cart
    const existingItemIndex = getData.findIndex((cartItem) => cartItem.item_id === item.item_id);

    if (existingItemIndex !== -1) {
      // Item is already in the cart, update its quantity
      const updatedCart = [...getData];
      updatedCart[existingItemIndex].item_qty += 1;
      updateCart(updatedCart);
    } else {
      // Item is not in the cart, add it
      const updatedCart = [...getData, { ...item, item_qty: 1 }];
      updateCart(updatedCart);
    }
  };
  const removeFromCart = (item) => {
    // Find the item in the cart
    const existingItemIndex = getData.findIndex((cartItem) => cartItem.item_id === item.item_id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...getData];
      // Decrease the item quantity and remove it if quantity becomes zero
      updatedCart[existingItemIndex].item_qty -= 1;

      if (updatedCart[existingItemIndex].item_qty === 0) {
        updatedCart.splice(existingItemIndex, 1);
      }

      updateCart(updatedCart);
    }
  };
 console.log(getData,'getdata');


//   // qty get data 
//   const qtyGetData = (value) => {
//     console.log("im, child value " ,value)
//     setQtyValue(value);
// }
  return (
    <>
    <div className=' px-2 w-100 cartsWrapper' >
      {getData.length <= 0 ?
      <div className='heartImg_Wrapper text-center'>
        <div className='d-flex flex-column justify-content-center'>
          <img src='assests/emtycart1.gif' className='w-100' alt='no image' />
          <p className='fs-6 fw-bold text-secondary pt-2'>Your cart is empty</p>
        </div>
      </div> :

      <div className='row w-100'>
        <div className='col-8'><Delivery /></div>
        <div className='col-4 position-relative'>
        <div className='d-flex flex-column px-3 overflow-auto cartAreaItems pt-4'>
                {/* {cart.length} */}
                {getData.map((e, index) => (
                    <div className="card border-0 mb-1" style={{ maxWidth: 450 + "px" }} key={index}>
                      <div className="row px-3">
                        <div className="col-md-4 rounded d-flex align-items-center">
                          <img src={e.item_image} className="img-fluid rounded" alt="no image found" />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <div className=''>
                              <h5 className="card-title asideCartHeader" >{e.item_name}</h5>
                              <div className="card-price SideCardprice d-flex"><i className="bi bi-currency-rupee "></i><span>
                                {getData.map((item, index) => (
                                  <div key={index} className=''>
                                    {item.item_id == e.item_id ? + item.item_qty * item.item_price : <></>}
                                  </div>
                                ))}
                              </span>
                              </div>
                            </div>
                            <div className='mt-1'>
                              {getData.map((item, index) => (
                                <div key={index} className='d-flex gap-3 align-item-center '>
                                  {item.item_id == e.item_id ? <>
                                    <button className='btn border' onClick={() => removeFromCart(item)}>-</button>
                                    <div className='p-1 d-flex align-items-center'>{item.item_qty}</div>
                                    <button className='btn border' onClick={() => addToCart(item)}>+</button></>
                                    : <></>}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>                                    
                  ))}
                    {/*--------------------------- Total Amount Component here ------------------------- */}
                    
              </div>
              <div className='cartFooterWrapper position-static bottom-0 rounded' >
                            <div className=' row w-100 '>
                              <div className='col-12 py-2'><p className="w-100 fw-bold ps-2 d-flex justify-content-between " ><span>Total Items</span><span className='text-white pe-2'>{getData.length}</span></p></div>
                              <div className='col-12 py-2 '><p className="w-100 pt-2 fw-bold ps-2 d-flex justify-content-between"><span>Total Amount</span><span className='text-white pe-2'>{formattedAmount}</span></p></div>
                              </div>
              </div>
        </div>
      </div>
    }
      
      </div>
    </>
  )
}
