import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:8080/";

function SignUp() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("userType", userType);
      formData.append("image", image);

      const response = await axios.post("/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("User registered successfully");
        navigate("/login");
      } else {
        const errorData = await response.data;
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error:", error);

      if (error.response && error.response.status === 500) {
        alert("Internal Server Error");
      } else {
        alert("An error occurred during registration");
      }
    }
  };

  return (
    <div>
      <h1>Register User</h1>

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
            Name:
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <label>
            User Type:
            <select
              name="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <option value="">Select User Type</option>
              <option value="faculty">Faculty</option>
              <option value="student">Student</option>
              <option value="visitor">Visitor</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            Image:
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </label>
        </div>

        <div>
          <button type="submit">Sign up</button>
        </div>

        <div>
          <p>
            Already have an account?
            <button type="button" onClick={() => navigate("/login")}>
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
