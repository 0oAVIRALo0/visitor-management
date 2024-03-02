import { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/";

const SendMeetingRequest = () => {
  const [receiverName, setReceiverName] = useState("");
  const [meetingDescription, setMeetingDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append("receiverName", receiverName);
      formData.append("meetingDescription", meetingDescription);

      const response = await axios.post("/meetingRequests", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.status === 200) {
        alert("Meeting request created successfully");
        setReceiverName("");
        setMeetingDescription("");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating meeting request");
    }
  };

  return (
    <div>
      <h1>Send Meeting Request</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Receiver Name:
          <input
            type="text"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Meeting Description:
          <textarea
            value={meetingDescription}
            onChange={(e) => setMeetingDescription(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Send Meeting Request</button>
      </form>
    </div>
  );
};

export default SendMeetingRequest;
