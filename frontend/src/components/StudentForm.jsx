import { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/";

function StudentForm() {
  const [branchOfStudy, setBranchOfStudy] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append("branchOfStudy", branchOfStudy);
      formData.append("yearOfStudy", yearOfStudy);
      formData.append("address", address);

      const response = await axios.post("/student", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.status === 200) {
        alert("Values Inserted Successfully");
        setBranchOfStudy("");
        setYearOfStudy("");
        setAddress("");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while inserting values");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Branch of Study:
          <input
            type="text"
            value={branchOfStudy}
            onChange={(e) => setBranchOfStudy(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Year of Study:
          <input
            type="text"
            value={yearOfStudy}
            onChange={(e) => setYearOfStudy(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default StudentForm;
