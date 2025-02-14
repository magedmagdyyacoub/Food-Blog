import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token); // Convert token existence to boolean
    };

    checkAuth(); // Run on mount

    // Listen for auth changes
    window.addEventListener("authChange", checkAuth);

    return () => {
      window.removeEventListener("authChange", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    window.dispatchEvent(new Event("authChange")); // Notify other components
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Food Blog</Link>
      <div className="nav-links">
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/recipes">Recipes</Link>
        <Link to="/contact">Contact</Link>

        {isAuthenticated ? (
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        ) : (
          <>
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/register" className="login-btn">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
