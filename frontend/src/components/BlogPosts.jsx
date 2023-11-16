import React, { useState, useEffect } from "react";
import "../components_styles/BlogPosts.css";
import { getBlogPosts } from "../Api";

const BlogPosts = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getBlogPosts(searchQuery);
                setBlogPosts(data);
            } catch (error) {
                console.error('Error fetching blog posts:', error);
            }
        };
        fetchData();

    }, [searchQuery]);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const heroSection = (
        <div className="hero-section">
            <h1>Blog Posts</h1>
            <p>
                Embark on a journey of discovery with our captivating blog posts. 
                From hidden gems to must-visit destinations, find inspiration for your next adventure right here.
                Or simply allow yourself some relaxation by checking out our curated collection of exotic destinations!

                <br /><br />
                Something specific you're looking for? Try your luck with the search bar!
                <br /><br />

                <input 
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </p>
        </div>
    );


    return (
        <section className="blog-posts-page">
            {heroSection}
            <div className="blog-posts">
                    <ul>
                    {blogPosts.map((post) => (
                        <figure key={post.id} className="snip1577" >
                            <img src={post.banner_image} alt={post.title} loading="lazy" />
                            <figcaption>
                            <h3>{post.title}</h3><br/>
                            <h4>{post.content}</h4>
                            <br/>
                            <h4>Created By: {post.author}</h4>
                            </figcaption>
                        </figure>
                        ))}
                    </ul> 

                    {blogPosts.length === 0 && (
                    <h3>No blog posts found matching your criteria.</h3>
                )}
            </div> 
        </section>
    ); 
};
 
export default BlogPosts; 