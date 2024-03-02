import { useState } from "react";
import axios from "axios";
import SearchResult from "./SearchResult";

axios.defaults.baseURL = "http://localhost:8080/";

const SearchBar = ({ onSelectAttendant }) => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  const fetchData = async (value) => {
    try {
      const response = await axios.get("/getUsers");
      // console.log("API Response:", response);

      const data = response.data.data;

      const filteredData = data.filter((user) => {
        return (
          value &&
          user &&
          user.Name &&
          user.Name.toLowerCase().includes(value.toLowerCase())
        );
      });

      // console.log("Filtered Data:", filteredData);

      setResults(filteredData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSelectAttendant = (user) => {
    onSelectAttendant(user.Name);
    setInput(""); // Clear the input after selecting an attendant
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Searcg for an attendant..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      <button type="submit">Search</button>
      {/* Display search results */}
      <ul>
        {results.map((user) => (
          <SearchResult
            user={user}
            key={user.UserID}
            onSelect={() => handleSelectAttendant(user)}
          />
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
