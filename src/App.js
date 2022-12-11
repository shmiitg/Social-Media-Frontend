import "./App.css";
import { UserContext } from "./context/UserContext";
import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./home/Home";
import Post from "./post/Post";
import PostEdit from "./post/PostEdit";
import Login from "./auth/Login";
import Error from "./error/Error";
import Register from "./auth/Register";

function App() {
    const { userEmail, setUserEmail } = useContext(UserContext);

    const fetchData = async () => {
        const token = localStorage.getItem("userToken");
        if (!token) {
            setUserEmail(null);
            return;
        }
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/info`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            if (res.status === 200) {
                setUserEmail(data.user.email);
            } else {
                setUserEmail(null);
            }
        } catch (err) {
            setUserEmail(null);
        }
    };
    useEffect(() => {
        fetchData();
    }, [userEmail]);

    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/post" element={<Post />}></Route>
                    <Route path="/post/edit/:id" element={<PostEdit />}></Route>
                    <Route
                        path="/login"
                        element={userEmail ? <Navigate to="/" /> : <Login />}
                    ></Route>
                    <Route
                        path="/register"
                        element={userEmail ? <Navigate to="/" /> : <Register />}
                    ></Route>
                    <Route path="*" element={<Error />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
