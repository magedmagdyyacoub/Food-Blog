import React, { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "User" });
  const [editingUser, setEditingUser] = useState(null);
  const [showAddUser, setShowAddUser] = useState(false); // Toggle for add user section
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({ title: "",
    description: "",
    ingredients: "",
    instructions: "",
    image_url: "", });
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [showAddRecipe, setShowAddRecipe] = useState(false); 
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    image_url: "",
  });
  const [editingBlog, setEditingBlog] = useState(null);
  const [showAddBlog, setShowAddBlog] = useState(false);


  useEffect(() => {
    if (activeTab === "users") {
      fetchUsers();
    } else if (activeTab === "recipes") {
      fetchRecipes();
    } else if (activeTab === "blogs") {
      fetchBlogs();
    }
  }, [activeTab]);
  


  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/users", newUser);
      setUsers([...users, response.data]);
      setNewUser({ name: "", email: "", password: "", role: "User" });
      setShowAddUser(false); // Hide form after adding user
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/${editingUser.id}`, editingUser);
      setUsers(users.map(user => (user.id === editingUser.id ? editingUser : user)));
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/recipes");
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };
  const handleAddRecipe = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/recipes", newRecipe);
      setRecipes([...recipes, response.data]);
      setNewRecipe({ title: "",description: "", ingredients: "", instructions: "",image_url: "", });
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };
  const handleDeleteRecipe = async (recipeId) => {
    try {
      await axios.delete(`http://localhost:5000/api/recipes/${recipeId}`);
      setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleEditRecipe = (recipe) => {
    setEditingRecipe(recipe);
  };

  const handleUpdateRecipe = async () => {
    try {
      await axios.put(`http://localhost:5000/api/recipes/${editingRecipe.id}`, editingRecipe);
      setRecipes(recipes.map(recipe => (recipe.id === editingRecipe.id ? editingRecipe : recipe)));
      setEditingRecipe(null);
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };
  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleAddBlog = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/blogs", newBlog);
      setBlogs([...blogs, response.data]);
      setNewBlog({ title: "", content: "", image_url: "" });
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${blogId}`);
      setBlogs(blogs.filter((blog) => blog.id !== blogId));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
  };

  const handleUpdateBlog = async () => {
    try {
      await axios.put(`http://localhost:5000/api/blogs/${editingBlog.id}`, editingBlog);
      setBlogs(blogs.map((blog) => (blog.id === editingBlog.id ? editingBlog : blog)));
      setEditingBlog(null);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };
  const [currentPageUsers, setCurrentPageUsers] = useState(1);
  const [currentPageRecipes, setCurrentPageRecipes] = useState(1);
  const [currentPageBlogs, setCurrentPageBlogs] = useState(1);
    const recordsPerPage = 4;
  // Pagination Functions
  const paginate = (data, page) => {
    const startIndex = (page - 1) * recordsPerPage;
    return data.slice(startIndex, startIndex + recordsPerPage);
  };

  return (
    <div className="admin-panel">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>
            Dashboard
          </li>
          <li className={activeTab === "users" ? "active" : ""} onClick={() => setActiveTab("users")}>
            Manage Users
          </li>
          <li className={activeTab === "recipes" ? "active" : ""} onClick={() => setActiveTab("recipes")}>
            Manage Recipes
          </li>
          <li className={activeTab === "blogs" ? "active" : ""} onClick={() => setActiveTab("blogs")}>
            Manage Blog
          </li>
        </ul>
      </aside>

      <main className="content">
        {activeTab === "dashboard" && (
          <section className="dashboard">
            <h2>Dashboard Overview</h2>
            <div className="stats">
              <div className="stat-card">Total Users: {users.length}</div>
              <div className="stat-card">Recipes Published: {recipes.length}</div>
              <div className="stat-card">Blog Posts: {blogs.length}</div>
            </div>
          </section>
        )}

        {activeTab === "users" && (
          <section className="manage-users">
            <h2>Manage Users</h2>
            
            {/* Add New User Button */}
            <button className="add-btn" onClick={() => setShowAddUser(!showAddUser)}>
              {showAddUser ? "Hide Add User" : "+ Add New User"}
            </button>

            {/* Add User Section - Visible when showAddUser is true */}
            {showAddUser && (
              <div className="add-user">
                <input type="text" placeholder="Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
                <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                <input type="password" placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
                <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
                <button className="add-btn" onClick={handleAddUser}>Add User</button>
              </div>
            )}

            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {paginate(users, currentPageUsers).map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEditClick(user)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          {/* Pagination Controls */}
          <div className="pagination">
              <button
                onClick={() => setCurrentPageUsers((prev) => Math.max(prev - 1, 1))}
                disabled={setCurrentPageUsers === 1}
              >
                Previous
              </button>
              <span> Page {setCurrentPageUsers} </span>
              <button
                onClick={() =>
                  setCurrentPageUsers((prev) => (prev * recordsPerPage < users.length ? prev + 1 : prev))
                }
                disabled={currentPageUsers * recordsPerPage >= users.length}
              >
                Next
              </button>
            </div>

            {editingUser && (
              <div className="edit-user">
                <h3>Edit User</h3>
                <input type="text" value={editingUser.name} onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })} />
                <input type="email" value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} />
                <select value={editingUser.role} onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
                <button className="save-btn" onClick={handleUpdateUser}>Save</button>
                <button className="cancel-btn" onClick={() => setEditingUser(null)}>Cancel</button>
              </div>
            )}
          </section>
        )}

{activeTab === "recipes" && (
        <section className="manage-recipes">
          <h2>Manage Recipes</h2>
          <button className="add-btn" onClick={() => setShowAddRecipe(!showAddRecipe)}>
            {showAddRecipe ? "Hide Add Recipe" : "+ Add New Recipe"}
          </button>

          {/* Add Recipe Section */}
          {showAddRecipe && (
            <div className="add-recipe">
              <input
                type="text"
                placeholder="Title"
                value={newRecipe.title}
                onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Description"
                value={newRecipe.description}
                onChange={(e) => setNewRecipe({ ...newRecipe, description: e.target.value })}
              />
              <input
                type="text"
                placeholder="Ingredients"
                value={newRecipe.ingredients}
                onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
              />
              <input
                type="text"
                placeholder="Instructions"
                value={newRecipe.instructions}
                onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newRecipe.image_url}
                onChange={(e) => setNewRecipe({ ...newRecipe, image_url: e.target.value })}
              />
              <button className="add-btn" onClick={handleAddRecipe}>
                Add Recipe
              </button>
            </div>
          )}

          {/* Recipe List */}
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginate(recipes, currentPageRecipes).map((recipe) => (
                <tr key={recipe.id}>
                  <td>{recipe.id}</td>
                  <td>{recipe.title}</td>
                  <td>{recipe.description}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEditRecipe(recipe)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteRecipe(recipe.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination Controls */}
          <div className="pagination">
              <button
                onClick={() => setCurrentPageRecipes((prev) => Math.max(prev - 1, 1))}
                disabled={currentPageRecipes === 1}
              >
                Previous
              </button>
              <span> Page {currentPageRecipes} </span>
              <button
                onClick={() =>
                  setCurrentPageRecipes((prev) => (prev * recordsPerPage < recipes.length ? prev + 1 : prev))
                }
                disabled={currentPageRecipes * recordsPerPage >= recipes.length}
              >
                Next
              </button>
            </div>

          {/* Edit Recipe Section */}
          {editingRecipe && (
            <div className="edit-recipe">
              <h3>Edit Recipe</h3>
              <input
                type="text"
                placeholder="Title"
                value={editingRecipe.title}
                onChange={(e) => setEditingRecipe({ ...editingRecipe, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Description"
                value={editingRecipe.description}
                onChange={(e) => setEditingRecipe({ ...editingRecipe, description: e.target.value })}
              />
              <input
                type="text"
                placeholder="Ingredients"
                value={editingRecipe.ingredients}
                onChange={(e) => setEditingRecipe({ ...editingRecipe, ingredients: e.target.value })}
              />
              <input
                type="text"
                placeholder="Instructions"
                value={editingRecipe.instructions}
                onChange={(e) => setEditingRecipe({ ...editingRecipe, instructions: e.target.value })}
              />
              <input
                type="text"
                placeholder="Image URL"
                value={editingRecipe.image_url}
                onChange={(e) => setEditingRecipe({ ...editingRecipe, image_url: e.target.value })}
              />
              <button className="save-btn" onClick={handleUpdateRecipe}>
                Save
              </button>
              <button className="cancel-btn" onClick={() => setEditingRecipe(null)}>
                Cancel
              </button>
            </div>
          )}
        </section>
      )}


        {activeTab === "blogs" && (
          <section className="manage-blogs">
            <h2>Manage Blogs</h2>
            <button className="add-btn" onClick={() => setShowAddBlog(!showAddBlog)}>
              {showAddBlog ? "Hide Add Blog" : "+ Add New Blog"}
            </button>
  
            {showAddBlog && (
              <div className="add-blog">
                <input
                  type="text"
                  placeholder="Title"
                  value={newBlog.title}
                  onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                />
                <textarea
                  placeholder="Content"
                  value={newBlog.content}
                  onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newBlog.image_url}
                  onChange={(e) => setNewBlog({ ...newBlog, image_url: e.target.value })}
                />
                <button className="add-btn" onClick={handleAddBlog}>Add Blog</button>
              </div>
            )}
  
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {paginate(blogs, currentPageBlogs).map((blog) => (
                  <tr key={blog.id}>
                    <td>{blog.id}</td>
                    <td>{blog.title}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEditBlog(blog)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDeleteBlog(blog.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

  {/* Pagination Controls */}
  <div className="pagination">
    <button
      onClick={() => setCurrentPageBlogs((prev) => Math.max(prev - 1, 1))}
      disabled={currentPageBlogs === 1}
    >
      Previous
    </button>
    <span> Page {currentPageBlogs} </span>
    <button
      onClick={() =>
        setCurrentPageBlogs((prev) => (prev * recordsPerPage < blogs.length ? prev + 1 : prev))
      }
      disabled={currentPageBlogs * recordsPerPage >= blogs.length}
    >
      Next
    </button>
  </div>

  
            {editingBlog && (
              <div className="edit-blog">
                <h3>Edit Blog</h3>
                <input
                  type="text"
                  placeholder="Title"
                  value={editingBlog.title}
                  onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                />
                <textarea
                  placeholder="Content"
                  value={editingBlog.content}
                  onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={editingBlog.image_url}
                  onChange={(e) => setEditingBlog({ ...editingBlog, image_url: e.target.value })}
                />
                <button className="save-btn" onClick={handleUpdateBlog}>Save</button>
                <button className="cancel-btn" onClick={() => setEditingBlog(null)}>Cancel</button>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default Admin;
