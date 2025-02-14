import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/recipes"); // Adjust backend URL if needed
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="recipes-page">
      <h2>Recipes</h2>
      <div className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <h3>{recipe.title}</h3>
              <img src={recipe.image} alt={recipe.title} />
              <p>{recipe.description}</p>
              <Link to={`/recipes/${recipe.id}`} className="view-details">
                View Recipe
              </Link>
            </div>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
}

export default Recipes;
