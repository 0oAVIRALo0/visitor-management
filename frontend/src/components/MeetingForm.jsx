import { useState } from "react";
import axios from "axios";
import SearchBar from "./Search/SearchBar";

axios.defaults.baseURL = "http://localhost:8080/";

const MeetingForm = () => {
  const [selectedAttendant, setSelectedAttendant] = useState("");
  const [status, setStatus] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingLocation, setMeetingLocation] = useState("");
  const [meetingDescription, setMeetingDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append("attendantName", selectedAttendant);
      formData.append("status", status);
      formData.append("meetingDate", meetingDate);
      formData.append("meetingTime", meetingTime);
      formData.append("meetingLocation", meetingLocation);
      formData.append("meetingDescription", meetingDescription);

      const response = await axios.post("/meeting", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.status === 200) {
        alert("Meeting Created Successfully");
        setStatus("");
        setMeetingDate("");
        setMeetingTime("");
        setMeetingLocation("");
        setMeetingDescription("");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the meeting");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          {/* SearchBar component for selecting the attendant */}
          <SearchBar
            onSelectAttendant={(attendant) => setSelectedAttendant(attendant)}
          />
          Attendant Name: {selectedAttendant}
        </label>
        <br />
        <label>
          Status:
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </label>
        <br />
        <label>
          Meeting Date:
          <input
            type="date"
            value={meetingDate}
            onChange={(e) => setMeetingDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          Meeting Time:
          <input
            type="time"
            value={meetingTime}
            onChange={(e) => setMeetingTime(e.target.value)}
          />
        </label>
        <br />
        <label>
          Meeting Location:
          <input
            type="text"
            value={meetingLocation}
            onChange={(e) => setMeetingLocation(e.target.value)}
          />
        </label>
        <br />
        <label>
          Meeting Description:
          <input
            type="text"
            value={meetingDescription}
            onChange={(e) => setMeetingDescription(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Create Meeting</button>
      </form>
    </div>
  );
};

export default MeetingForm;
