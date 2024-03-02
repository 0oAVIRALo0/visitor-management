import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Protected from "./components/Protected";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={<Protected Component={Dashboard} />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Protected Component={Login} />} />
        {/* Default route redirects to /signup */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
