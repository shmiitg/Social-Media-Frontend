import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import logo from "../images/logo.png";

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: "", email: "", password: "", cpassword: "" });
    const { setUserEmail } = useContext(UserContext);
    const handleInput = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    const handleClick = async () => {
        try {
            const { name, email, password, cpassword } = user;
            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, cpassword }),
            });
            const data = await res.json();
            if (res.status === 201) {
                setUserEmail(user.email);
                localStorage.setItem("userToken", data.accessToken);
                navigate("/");
            } else {
                window.alert(data.error);
            }
        } catch (err) {
            window.alert("Something went wrong");
        }
    };

    return (
        <div className="auth__container">
            <div className="form-container">
                <div className="form-logo">
                    <img src={logo} alt="logo" />
                </div>
                <form id="register" method="POST">
                    <div className="form-fields">
                        <input
                            name="name"
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Name"
                            value={user.name}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="form-fields">
                        <input
                            name="email"
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="E-mail"
                            value={user.email}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="form-fields">
                        <input
                            name="password"
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            value={user.password}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="form-fields">
                        <input
                            name="cpassword"
                            type="password"
                            className="form-control"
                            id="cpassword"
                            placeholder="Confirm Password"
                            value={user.cpassword}
                            onChange={handleInput}
                        />
                    </div>
                </form>
                <button className="btn-account" onClick={handleClick}>
                    Submit
                </button>
                <div className="account-toggle">
                    <p>Have an account?</p>
                    <Link to="/login">Sign In</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
