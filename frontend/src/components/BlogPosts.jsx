import React, { useState, useEffect } from "react";
import { getBlogPosts } from "../Api";

const BlogPosts = () => {
    const [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getBlogPosts();
                setBlogPosts(response.data);
            } catch (error) {
                console.log('Error fetching blog posts:', error);
            }
        };
        fetchData();

    }, []);

    return (
        <div>
            <h1>Blog Posts</h1>
            <ul>
                {blogPosts.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default BlogPosts;