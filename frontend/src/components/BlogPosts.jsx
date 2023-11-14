import React, { useState, useEffect } from "react";
import "../components_styles/BlogPosts.css";
import { getBlogPosts } from "../Api";

const BlogPosts = () => {
    const [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getBlogPosts();
                console.log(data)
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
                <figure key={post.id} className="snip1577" >
                    <img src={post.banner_image} alt={post.title} />
                    <figcaption>
                    <h3>{post.title}</h3><br/>
                    <h4>{post.content}</h4>
                    <br/>
                    <h4>Created By: {post.author}</h4>
                    </figcaption>
                    <a href="#"></a>
                </figure>
                ))}
            </ul>
        </div> 
    );
};
 
export default BlogPosts; 