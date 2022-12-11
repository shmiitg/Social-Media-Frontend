import { useState, useEffect } from "react";

const useScroll = (pageNo) => {
    const maxLimit = 15;
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [morePosts, setMorePosts] = useState(false);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/api/post/page/${pageNo}/${maxLimit}`;
            const res = await fetch(url);
            const data = await res.json();
            if (res.status === 200) {
                const psts = new Set(posts);
                if (data.posts.length === 0) setMorePosts(false);
                else {
                    setMorePosts(true);
                    data.posts.forEach((post) => {
                        let newPost = post;
                        psts.add(newPost);
                    });
                    setPosts([...psts]);
                }
            } else {
                setPosts([]);
            }
        } catch (err) {
            setPosts([]);
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchPosts();
    }, [pageNo]);

    return { posts, setPosts, loading, morePosts };
};

export default useScroll;
