import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogsResponse = await fetch("http://localhost:5000/api/blogs?limit=3");
        const blogsData = await blogsResponse.json();

        const recipesResponse = await fetch("http://localhost:5000/api/recipes?limit=3");
        const recipesData = await recipesResponse.json();

        setBlogs(blogsData);
        setRecipes(recipesData);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the Food Blog</h1>
      <p className="home-description">Discover delicious recipes and food stories!</p>

      {/* Recipes Section */}
      <section className="home-section">
        <h2>Featured Recipes</h2>
        <div className="cards-container">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="card" onClick={() => navigate(`/recipes/${recipe.id}`)}>
              <img src={recipe.image_url} alt={recipe.title} />
              <h3>{recipe.title}</h3>
            </div>
          ))}
        </div>
        <button className="load-more" onClick={() => navigate("/recipes")}>View All Recipes</button>
      </section>

      {/* Blogs Section */}
      <section className="home-section">
        <h2>Latest Blog Posts</h2>
        <div className="cards-container">
          {blogs.map((blog) => (
            <div key={blog.id} className="card" onClick={() => navigate(`/blog/${blog.id}`)}>
              <img src={blog.image_url} alt={blog.title} />
              <h3>{blog.title}</h3>
            </div>
          ))}
        </div>
        <button className="load-more" onClick={() => navigate("/blog")}>View All Blog Posts</button>
      </section>
    </div>
  );
};

export default Home;
