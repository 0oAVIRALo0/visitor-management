import { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/";

const CreateMeetingFromRequest = ({ selectedRequest, onClose }) => {
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingLocation, setMeetingLocation] = useState("");
  const [meetingDate, setMeetingDate] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append("attendantID", selectedRequest.senderId);
      formData.append("status", "accepted");
      formData.append("meetingDate", meetingDate);
      formData.append("meetingTime", meetingTime);
      formData.append("meetingLocation", meetingLocation);
      formData.append("meetingDescription", selectedRequest.meetingDescription);
      formData.append("attendantName", selectedRequest.senderName);

      console.log("Meeting details submitted:", {
        senderId: selectedRequest.senderId,
        status: "accepted",
        meetingDate,
        meetingTime,
        meetingLocation,
        meetingDescription: selectedRequest.meetingDescription,
        attendantName: selectedRequest.senderName,
      });

      const response = await axios.post("/createMeetingFromRequest", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.status === 200) {
        alert("Meeting Created Successfully");
        setMeetingTime("");
        setMeetingLocation("");
        setMeetingDate("");
      }

      // Close the pop-up
      onClose();
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the meeting");
    }
  };

  return (
    <div>
      <h1>Create Meeting</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="hidden"
          name="senderName"
          value={selectedRequest.senderName}
        />
        <input
          type="hidden"
          name="meetingDescription"
          value={selectedRequest.meetingDescription}
        />
        <label>
          Meeting date:
          <input
            type="date"
            value={meetingDate}
            onChange={(e) => setMeetingDate(e.target.value)}
          />
        </label>
        <label>
          Meeting Time:
          <input
            type="time"
            value={meetingTime}
            onChange={(e) => setMeetingTime(e.target.value)}
          />
        </label>
        <label>
          Meeting Location:
          <input
            type="text"
            value={meetingLocation}
            onChange={(e) => setMeetingLocation(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateMeetingFromRequest;
