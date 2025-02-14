import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blogs"); // Adjust based on your backend route
        const data = await response.json();
        setBlogPosts(data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="blog-page">
      <h2>Latest Blog Posts</h2>
      <div className="blog-list">
        {blogPosts.length > 0 ? (
          blogPosts.map((post) => (
            <div key={post.id} className="blog-card">
              <h3>{post.title}</h3>
              <p className="blog-date">{new Date(post.date).toLocaleDateString()}</p>
              <p>{post.excerpt}</p>
              <Link to={`/blog/${post.id}`} className="read-more">
                Read More
              </Link>
            </div>
          ))
        ) : (
          <p>No blog posts available.</p>
        )}
      </div>
    </div>
  );
}

export default Blog;
