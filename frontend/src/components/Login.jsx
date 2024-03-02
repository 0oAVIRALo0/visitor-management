import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

axios.defaults.baseURL = "http://localhost:8080/";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    console.log("Sign up clicked");
    navigate("/signup");
  };

  useEffect(() => {
    // Check if there is a token in the local storage
    const token = localStorage.getItem("token");
    if (token) {
      // If there is a token, navigate to the dashboard
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      const response = await axios.post("/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (response.status === 200) {
        alert("User logged in successfully");
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        const errorData = await response.data;
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error:", error);

      if (error.response && error.response.status === 500) {
        alert("Internal Server Error");
      } else {
        alert("An error occurred during login");
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <button type="submit">Login</button>
        </div>

        <div>
          <p>Don't have an account? Sign up now!</p>
          <button type="button" onClick={handleSignUpClick}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
