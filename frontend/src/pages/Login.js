import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      console.log("Login Response:", data); // ✅ Debugging output
  
      if (res.ok) { // ✅ Check if request was successful
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user?.role || "user");
        window.dispatchEvent(new Event("authChange"));
  
        const redirectPath = data.redirect || (data.user?.role === "admin" ? "/admin" : "/");
        console.log("Redirecting to:", redirectPath);
  
        // ✅ Use `navigate` instead of `window.location`
        navigate(redirectPath);
      } else {
        setMessage(data.error || "Invalid credentials.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setMessage("Login failed. Please try again.");
    }
  };
  
  

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
