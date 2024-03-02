import React from "react";
import "../styles/dashboard.css";
import axios from "axios";
import { useState } from "react";
import StudentForm from "./StudentForm";
import FacultyForm from "./FacultyForm";
import Visitorform from "./VisitorForm";
import { useEffect } from "react";
import MeetingForm from "./MeetingForm";
import ShowMeetingRequests from "./ShowMeetingRequests";
import SendMeetingRequest from "./SendMeetingRequest";
import ShowAcceptedMeetings from "./ShowAcceptedMeetings";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:8080/";

function Dashboard() {
  const [userType, setUserType] = useState("");
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isMeetingOpen, setMeetingOpen] = useState(false);
  const [isMeetingRequests, setMeetingRequests] = useState(false);
  const [isSendMeetingRequest, setSendMeetingRequest] = useState(false);
  const [isAcceptedMeetings, setAcceptedMeetings] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserType = async () => {
      try {
        const response = await axios.get("/userType", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        // console.log(response);
        setUserType(response.data.UserType);
      } catch (error) {
        console.error("Error fetching user type:", error);
      }
    };
    getUserType();
  }, []);

  const handleProfileClick = async () => {
    setProfileOpen((prevProfileOpen) => !prevProfileOpen);
  };

  const handleMeetingClick = () => {
    setMeetingOpen((prevMeetingOpen) => !prevMeetingOpen);
  };

  const handleMeetingRequests = () => {
    setMeetingRequests((prevMeetingRequests) => !prevMeetingRequests);
  };

  const handleSendMeetingRequest = () => {
    setSendMeetingRequest((prevSendMeetingRequest) => !prevSendMeetingRequest);
  };

  const handleAcceptedMeetings = () => {
    setAcceptedMeetings((prevAcceptedMeetings) => !prevAcceptedMeetings);
  };

  const handleLogout = async () => {
    console.log("Logout");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getProfileComponent = () => {
    // console.log(userType);
    if (userType === "student") {
      return <StudentForm />;
    } else if (userType === "faculty") {
      return <FacultyForm />;
    } else {
      return <Visitorform />;
    }
  };

  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <p>User Type: {userType}</p> {/* Display user type */}
      <ul>
        <li>
          <button onClick={handleProfileClick}>Profile</button>
        </li>
        {userType === "faculty" && (
          <React.Fragment>
            <li>
              <button onClick={handleMeetingClick}>Create Meeting</button>
            </li>
            <li>
              <button onClick={handleMeetingRequests}>
                Show Meeting Requests
              </button>
            </li>
            <li>
              <button onClick={handleAcceptedMeetings}>
                Show accepted Meetings
              </button>
            </li>
          </React.Fragment>
        )}
        {userType === "student" && (
          <li>
            <button onClick={handleSendMeetingRequest}>
              Send Meeting Request
            </button>
          </li>
        )}
        <li>
          <button onClick={handleLogout}>logout</button>
        </li>
      </ul>
      {isProfileOpen && getProfileComponent()}
      {isMeetingOpen && <MeetingForm />}
      {isMeetingRequests && <ShowMeetingRequests />}
      {isSendMeetingRequest && <SendMeetingRequest />}
      {isAcceptedMeetings && <ShowAcceptedMeetings />}
    </div>
  );
}

export default Dashboard;
