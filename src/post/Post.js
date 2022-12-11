import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Post.css";

const Post = () => {
    const navigate = useNavigate();
    const [post, setPost] = useState({ description: "" });

    const handleInput = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const postSave = async () => {
        const token = localStorage.getItem("userToken");
        if (!token) {
            window.alert("You need a token");
            return;
        }
        const { description } = post;
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/post/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ description }),
        });
        const data = await res.json();
        if (res.status === 201) {
            window.alert(data.success);
            navigate(`/`);
        } else {
            window.alert(data.error);
        }
    };

    const postCancel = () => {
        navigate("/");
    };

    return (
        <div className="container">
            <div className="post-container-main">
                <form method="POST" className="post-form">
                    <div className="post-form-field">
                        <label htmlFor="description">Write your post here...</label>
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

export default Post;
