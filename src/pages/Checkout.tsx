import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { decrementHandler, deleteHandler, incrementHandler } from "../redux/slice/Cartslice";

export const Checkout = () => {
  const state = useSelector((store: any) => store.cartSlice.cart);
  const [price,setPrice] = useState(0)
  useEffect(()=>{
    if(state && state.length > 0){
      let totalPrice = 0;
      state.forEach((cur:any) => {
        totalPrice += cur.price*cur.qty
        setPrice(totalPrice)
      });
      
    }
    else{
      setPrice(0);
    }
  },[state])
  const dispatch = useDispatch();
    const increment = (id:number) => {
      try {
        dispatch(incrementHandler(id));
        toast.success("Item Quantity Increased");
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    const decrement = (id:number) => {
      try {
        dispatch(decrementHandler(id));
        toast.success("Item Quantity Decreased");
      } catch (error: any) {
        toast.error(error.message);
      }
    };
  return <>
  <div className="bg-gray-100 h-screen py-8">
    <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
        <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/4">
                <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-left font-semibold">Product</th>
                                <th className="text-left font-semibold">Price</th>
                                <th className="text-left font-semibold">Quantity</th>
                                <th className="text-left font-semibold">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                              state.map((cur:any,i:any)=>{
                                return <tr key={i}>
                                <td className="py-4">
                                    <div className="flex items-center">
                                        <img className="h-16 w-16 mr-4" src={cur.image} alt="Product image"/>
                                        <span className="font-semibold">{cur.title}</span>
                                    </div>
                                </td>
                                <td className="py-4">{cur.price*10}</td>
                                <td className="py-4">
                                    <div className="flex items-center">
                                        <button onClick={() => decrement(cur.id)} className="border rounded-md py-2 px-4 mr-2">-</button>
                                        <span className="text-center w-8">{cur.qty}</span>
                                        <button onClick={() => increment(cur.id)} className="border rounded-md py-2 px-4 ml-2">+</button>
                                    </div>
                                </td>
                                <td className="py-4">&#8377;{cur.price*10*cur.qty}</td>
                            </tr>
                              })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="md:w-1/4">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold mb-4">Summary</h2>
                    <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>&#8377;{price*10}</span>
                    </div>
                    <hr className="my-2"/>
                    <div className="flex justify-between mb-2">
                        <span className="font-semibold">Total</span>
                        <span className="font-semibold">&#8377;{price*10}</span>
                    </div>
                    <button className="bg-blue-500 text-center text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
                </div>
            </div>
        </div>
    </div>
</div>
  </>;
};
