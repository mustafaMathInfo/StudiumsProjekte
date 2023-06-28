import React from 'react';
import {Link, Outlet} from "react-router-dom";
import passwordLogo from '../assets/images/password-logo.png'
import {useAuth} from "../context/authContext.jsx";

const Navbar = () => {
    const {isAuthenticated, logout} = useAuth()

    const onLogout = () => {
        logout()
    }

    return (
        <div>
            {isAuthenticated &&
                <nav className="flex items-center justify-between p-2 bg-gray-800 text-white">
                    <img src={passwordLogo} alt="Password-Logo" className="w-12 h-12 me-5 rounded-full"/>
                    <div className="">
                        <Link to="/home" className="text-white hover:text-gray-300 me-4 font-bold text-xl">Home</Link>
                        <Link to="/add" className="text-white hover:text-gray-300 me-4 font-bold text-xl">Add
                            Password</Link>
                    </div>
                    <button className="text-white hover:text-gray-300 me-4 font-bold text-xl"
                            onClick={onLogout}>Logout
                    </button>
                </nav>}
            <Outlet/>
        </div>
    );
};

export default Navbar;
