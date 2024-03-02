import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:8080/";

const FacultyForm = () => {
  const [academicTitle, setAcademicTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [officeLocation, setOfficeLocation] = useState("");
  const [officeHoursStart, setOfficeHoursStart] = useState("");
  const [officeHoursEnd, setOfficeHoursEnd] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append("academicTitle", academicTitle);
      formData.append("department", department);
      formData.append("officeLocation", officeLocation);
      formData.append("officeHoursStart", officeHoursStart);
      formData.append("officeHoursEnd", officeHoursEnd);

      const response = await axios.post("/faculty", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.status === 200) {
        alert("Values Inserted Successfully");
        setAcademicTitle("");
        setDepartment("");
        setOfficeLocation("");
        setOfficeHoursStart("");
        setOfficeHoursEnd("");
        navigate("/meeting");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while inserting values");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Academic Title:
        <input
          type="text"
          value={academicTitle}
          onChange={(e) => setAcademicTitle(e.target.value)}
        />
      </label>
      <br />
      <label>
        Department:
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </label>
      <br />
      <label>
        Office Location:
        <input
          type="text"
          value={officeLocation}
          onChange={(e) => setOfficeLocation(e.target.value)}
        />
      </label>
      <br />
      <label>
        Office Hours Start:
        <input
          type="text"
          value={officeHoursStart}
          onChange={(e) => setOfficeHoursStart(e.target.value)}
        />
      </label>
      <br />
      <label>
        Office Hours End:
        <input
          type="text"
          value={officeHoursEnd}
          onChange={(e) => setOfficeHoursEnd(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FacultyForm;
