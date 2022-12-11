import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PostEdit = () => {
    const location = useLocation();
    const postId = location.pathname.split("/")[3];
    const navigate = useNavigate();
    const [post, setPost] = useState({ description: "" });

    const handleInput = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const postData = async () => {
        const token = localStorage.getItem("userToken");
        if (!token) {
            navigate("/");
            return;
        }
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/post/${postId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        if (res.status === 200) {
            setPost(data.post);
        } else {
            navigate("/");
        }
    };

    const postSave = async () => {
        const token = localStorage.getItem("userToken");
        if (!token) {
            window.alert("You need a token");
            return;
        }
        const { description } = post;
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/post/${postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ description }),
        });
        const data = await res.json();
        if (res.status === 200) {
            window.alert(data.success);
        } else {
            window.alert(data.error);
        }
    };

    const postCancel = () => {
        navigate("/");
    };

    useEffect(() => {
        postData();
    }, []);

    return (
        <div className="container">
            <div className="post-container-main">
                <form method="POST" className="post-form">
                    <div className="post-form-field">
                        <label htmlFor="description">Description</label>
                        <textarea
                            required
                            onChange={handleInput}
                            name="description"
                            value={post.description}
                        ></textarea>
                    </div>
                </form>
                <div className="post-write-btn">
                    <div className="post-save-btn" onClick={postSave}>
                        Save
                    </div>
                    <div className="post-cancel-btn" onClick={postCancel}>
                        Cancel
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostEdit;
