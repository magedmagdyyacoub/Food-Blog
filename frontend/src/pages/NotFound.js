// src/pages/NotFound.js
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="notfound-page">
      <h2>404 - Page Not Found</h2>
      <p>Oops! The page you are looking for doesn't exist.</p>
      <Link to="/">Go Back Home</Link>
    </div>
  );
}

export default NotFound;
