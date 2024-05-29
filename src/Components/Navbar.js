import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.jpg";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <div className="h-20 text-white flex flex-row flex-wrap items-center top	 ">
      <Link to="/" className="flex-1">
        {" "}
        <img src="" className="h-14 w-14 ml-6 rounded-full" />
      </Link>
      <div className="flex-[2]  flex justify-around flex-wrap">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/service">Services</NavLink>
        <NavLink to="/about">About </NavLink>
        <NavLink to="/contact">Contact </NavLink>
      </div>
      <div className="flex-1 flex justify-center flex-wrap gap-6">
        <Link>
          <button className="border-2 rounded-full font-bold px-5 py-2">
            SignUp
          </button>
        </Link>
        <Link>
          <button className="border-2 rounded-full font-bold px-5 py-2">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
