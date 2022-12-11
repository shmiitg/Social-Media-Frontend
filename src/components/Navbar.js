import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import "./Navbar.css";

const Navbar = () => {
    const { userEmail, setUserEmail } = useContext(UserContext);
    const logout = () => {
        localStorage.removeItem("userToken");
        setUserEmail(null);
    };

    return (
        <div className="navbar">
            <div className="nav-links">
                <div className="nav-logo">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <div className="nav-right">
                    <Link to="/post">Write Post</Link>
                    {userEmail ? (
                        <div className="logout" onClick={logout}>
                            Logout
                        </div>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
