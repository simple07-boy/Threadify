import React, { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { toast } from "react-toastify";
import { incrementHandler } from "../../redux/slice/Cartslice";
import { decrementHandler } from "../../redux/slice/Cartslice";
import { deleteHandler } from "../../redux/slice/Cartslice";
import { IoCartSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const Slidebar = ({ state: { isSidebarOpen, setIsSidebar } }: any) => {
  const [price,setPrice] = useState(0);
  const state = useSelector((store: any) => store.cartSlice.cart);

  const CartCard = ({ c }) => {
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
    const deleteH = (id:number) => {
      try {
        dispatch(deleteHandler(id));
        toast.success("Item Deleted");
      } catch (error:any) {
        toast.error(error.message);
      }
    };

    return (
      <div className="w-full px-4 border border-white flex justify-between gap-x-2 py-3 items-center">
        <img src={c.image} alt="" className="w-24 rounded-full" />
        <div className="items">
          <h1 className="text-xl text-white font-semibold">{c.title}</h1>
          <div className="flex text-3xl text-white items-center gap-x-3 mx-auto cursor-pointer">
            <CiCirclePlus className="" onClick={() => increment(c.id)} />
            <h1>{c.qty}</h1>
            <CiCircleMinus className="" onClick={() => decrement(c.id)} />
          </div>
        </div>
        <div className="icon">
          <FaRegTrashAlt className="text-2xl text-white cursor-pointer" onClick={()=>deleteH(c.id)}/>
        </div>
      </div>
    );
  };

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
  
  return (
    <>
      <div
        className={`${
          isSidebarOpen ? "-translate-x-0" : "translate-x-[100%]"
        } transition-all duration-500 top-0 fixed h-screen w-full md:w-1/3 bg-indigo-500 right-0 z-[10]`}
      >
        <div className="py-4 mx-10 flex justify-between">
          <h1 className="font-semibold text-white text-2xl">My Cart</h1>
          <IoIosCloseCircle
            onClick={() => setIsSidebar(!isSidebarOpen)}
            className="text-4xl text-white"
          />
        </div>
        {
          state.length < 1 && <div className="text-white w-full flex justify-center flex-col">
            <IoCartSharp className="text-9xl mx-auto" />
            <h1 className="mx-auto">Empty Cart !!</h1>
          </div>
        }
        <div id="cart-div" className="h-[60%] overflow-y-auto w-full">
          {state &&
            state.length >= 1 &&
            state.map((c, i) => {
              return <CartCard key={i} c={c} />;
            })}
        </div>
        {state.length > 0 && <div className="mb-3 px-3 mx-5 gap-y-5 flex flex-col">
          <h1 className="text-4xl text-white">Total Price : &#8377; {price*10}/-</h1>
          <Link to={'/Checkout'} className="w-full bg-indigo-700 py-3 text-white text-center">Checkout</Link>
        </div>}
      </div>
    </>
  );
};

export default Slidebar;
