import React, { useState, useContext, useRef, useCallback } from "react";
import { UserContext } from "../context/UserContext";
import { CgQuote } from "react-icons/cg";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import useScroll from "../customHooks/useScroll";
import "./Home.css";

const Home = () => {
    const { userEmail } = useContext(UserContext);
    const [pageNo, setPageNo] = useState(1);
    const { posts, setPosts, loading, morePosts } = useScroll(pageNo);

    const observer = useRef();
    const lastPost = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && morePosts) {
                    // console.log("Fetched");
                    setPageNo((prev) => prev + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading]
    );

    const deletePost = async (id) => {
        const token = localStorage.getItem("userToken");
        if (!token) {
            window.alert("You need a token");
            return;
        }
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/api/post/${id}`;
            const res = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.status === 200) {
                setPosts((prev) => prev.filter((ele) => ele.id !== id));
            }
        } catch (err) {
            window.alert("Something went wrong");
        }
    };

    return (
        <div className="container-home">
            <div className="post-container">
                {posts.map((post, index) => {
                    if (index + 1 === posts.length) {
                        return (
                            <div ref={lastPost} key={index} className="post">
                                <div className="post-description">
                                    <CgQuote />
                                    <div className="post-description-content">
                                        {post.description}
                                    </div>
                                    <CgQuote />
                                </div>
                                <div className="post-bottom">
                                    <div className="post-bottom-left">
                                        <div className="post-image">
                                            <img
                                                src={`https://avatars.dicebear.com/api/open-peeps/${post.email}.svg`}
                                                alt="img"
                                            />
                                        </div>
                                        <div className="post-author">
                                            <div className="post-author-name">{post.name}</div>
                                            <div className="post-author-email">{post.email}</div>
                                        </div>
                                    </div>
                                    <div className="post-bottom-right">
                                        {userEmail === post.email && (
                                            <>
                                                <Link
                                                    to={`/post/edit/${post.id}`}
                                                    className="post-edit"
                                                >
                                                    <FaEdit />
                                                </Link>
                                                <div
                                                    onClick={() => deletePost(post.id)}
                                                    className="post-delete"
                                                >
                                                    <MdDelete />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <div key={index} className="post">
                                <div className="post-description">
                                    <CgQuote />
                                    <div className="post-description-content">
                                        {post.description}
                                    </div>
                                    <CgQuote />
                                </div>
                                <div className="post-bottom">
                                    <div className="post-bottom-left">
                                        <div className="post-image">
                                            <img
                                                src={`https://avatars.dicebear.com/api/open-peeps/${post.email}.svg`}
                                                alt="img"
                                            />
                                        </div>
                                        <div className="post-author">
                                            <div className="post-author-name">{post.name}</div>
                                            <div className="post-author-email">{post.email}</div>
                                        </div>
                                    </div>
                                    <div className="post-bottom-right">
                                        {userEmail === post.email && (
                                            <>
                                                <Link
                                                    to={`/post/edit/${post.id}`}
                                                    className="post-edit"
                                                >
                                                    <FaEdit />
                                                </Link>
                                                <div
                                                    onClick={() => deletePost(post.id)}
                                                    className="post-delete"
                                                >
                                                    <MdDelete />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    }
                })}
                <h1>{loading && "Loading..."}</h1>
            </div>
        </div>
    );
};

export default Home;
