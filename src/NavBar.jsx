import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className=" navbar">
      <ul className="flex space-x-4 bg-blue-600 p-4 text-white">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/signin" className="hover:underline">
            Sign In
          </Link>
        </li>
        <li>
          <Link to="/signup" className="hover:underline">
            Sign Up
          </Link>
        </li>
        <li>
          <Link to="/reset-password" className="hover:underline">
            Reset Password
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
