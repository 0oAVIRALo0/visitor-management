import { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/";

const VisitorForm = () => {
  const [profession, setProfession] = useState("");
  const [address, setAddress] = useState("");
  const [purposeOfVisit, setPurposeOfVisit] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append("profession", profession);
      formData.append("address", address);
      formData.append("purposeOfVisit", purposeOfVisit);

      const response = await axios.post("/visitor", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.status === 200) {
        alert("Values Inserted Successfully");
        setProfession("");
        setAddress("");
        setPurposeOfVisit("");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while inserting values");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Profession:
        <input
          type="text"
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
        />
      </label>
      <br />
      <label>
        Address:
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      <br />
      <label>
        Purpose of Visit:
        <input
          type="text"
          value={purposeOfVisit}
          onChange={(e) => setPurposeOfVisit(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default VisitorForm;
