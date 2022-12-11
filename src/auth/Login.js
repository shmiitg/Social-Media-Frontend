import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { UserContext } from "../context/UserContext";
import "./Auth.css";

const Login = () => {
    const navigate = useNavigate();
    const { setUserEmail } = useContext(UserContext);
    const [user, setUser] = useState({ email: "", password: "" });

    const handleLoginInput = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    const userLogin = async () => {
        const { email, password } = user;
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (res.status === 200) {
            setUserEmail(user.email);
            localStorage.setItem("userToken", data.accessToken);
            navigate("/");
        } else {
            window.alert(data.error);
        }
    };

    return (
        <div className="auth__container">
            <div className="form-container">
                <div className="form-logo">
                    <img src={logo} alt="logo" />
                </div>
                <div id="login" method="POST">
                    <div className="form-fields">
                        <input
                            name="email"
                            type="text"
                            className="form-control"
                            id="email"
                            placeholder="E-mail"
                            value={user.key}
                            onChange={handleLoginInput}
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
                            onChange={handleLoginInput}
                        />
                    </div>
                </div>
                <button className="btn-account" onClick={userLogin}>
                    Submit
                </button>
                <div className="account-toggle">
                    <p>No account?</p>
                    <Link to="/register">Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
