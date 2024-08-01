import React , {useState}from "react";
import { TiShoppingCart } from "react-icons/ti";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Sidebar from './Sidebar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cartSlice } from './../redux/slice/Cartslice';
import { useSelector } from "react-redux";

const CartIcon = ({state:{isSidebarOpen,setIsSidebar}}:any) => {
  const state = useSelector((store) => store.cartSlice.cart)
  return (
    <div onClick={() =>{setIsSidebar(!isSidebarOpen)}} className="relative">
      <FaShoppingCart className="text-5xl"/>
      <span className="absolute -top-[5px] right-0 bg-red-500 p-1 px-2 rounded-full text-white">{state.length}</span>
    </div>
  );
};

const Header = () => {
    const [isSidebarOpen,setIsSidebar] = useState(false);
  return (
    <>
    <ToastContainer/>
      <header className="w-full shadow-md">
        <nav className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <TiShoppingCart className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" />
            <span className="ml-3 text-xl">Threadify</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link to={"/"} className="mr-5 hover:text-gray-900">
              Home
            </Link>
            <Link to={"/checkout"} className="mr-5 hover:text-gray-900">
              Checkout
            </Link>
            <CartIcon state={{isSidebarOpen,setIsSidebar}}/>
          </nav>
        </nav>
        <Sidebar state={{isSidebarOpen,setIsSidebar}}/>
      </header>
    </>
  );
};

export default Header;
