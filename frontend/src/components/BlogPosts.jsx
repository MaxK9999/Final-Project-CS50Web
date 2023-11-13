import React, { useState, useEffect } from "react";
import "../components_styles/BlogPosts.css";
import { getBlogPosts } from "../Api";

const BlogPosts = () => {
    const [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getBlogPosts();
                setBlogPosts(data);
            } catch (error) {
                console.error('Error fetching blog posts:', error);
            }
        };
        fetchData();

    }, []);

    return (
        <div className="blog-posts">
            <h1>Blog Posts</h1>
            <ul>
                {blogPosts.map((post) => (
                    <li key={post.id}>
                        <strong>{post.title}</strong>
                        <p>{post.content}</p>
                        <p>{post.created_at}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogPosts;