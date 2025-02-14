import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/recipes/${id}`);
        const data = await response.json();

        if (data.error) {
          setRecipe(null);
        } else {
          // Convert ingredients string to an array
          setRecipe({
            ...data,
            ingredients: data.ingredients
              ? data.ingredients.split(",").map((item) => item.trim())
              : [],
          });
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setRecipe(null);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <h2>Recipe not found</h2>;
  }

  return (
    <div className="recipe-detail">
      <h2>{recipe.title}</h2>
      {recipe.image_url && <img src={recipe.image_url} alt={recipe.title} />}
      <p>{recipe.description}</p>

      <h3>Ingredients</h3>
      {recipe.ingredients.length > 0 ? (
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      ) : (
        <p>No ingredients provided.</p>
      )}

      <h3>Instructions</h3>
      <p>{recipe.instructions}</p>
    </div>
  );
}

export default RecipeDetail;
