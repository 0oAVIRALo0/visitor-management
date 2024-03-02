import { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/";

const CreateMeetingFromRequest = ({ selectedRequest, onClose }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append("attendantID", selectedRequest.senderId);
      formData.append("status", "rejected");
      formData.append("meetingDate", meetingDate);
      formData.append("meetingTime", meetingTime);
      formData.append("meetingLocation", meetingLocation);
      formData.append("meetingDescription", selectedRequest.meetingDescription);
      formData.append("attendantName", selectedRequest.senderName);

      console.log("Meeting details submitted:", {
        senderId: selectedRequest.senderId,
        status: "rejected",
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
        alert("Meeting Rejected Successfully");
      }

      // Close the pop-up
      onClose();
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the meeting");
    }
  };

  return <div>Meeting Rejected!</div>;
};

export default CreateMeetingFromRequest;
