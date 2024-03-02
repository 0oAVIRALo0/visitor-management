import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/";

const ShowAcceptedMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAcceptedMeetings = async () => {
      try {
        const response = await axios.get("/showAcceptedMeetings", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (response.status === 200) {
          setMeetings(response.data.data);
        } else {
          console.error(
            "Error fetching accepted meetings:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedMeetings();
  }, []);

  return (
    <div>
      <h1>Accepted Meetings</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {meetings.map((meeting) => (
            <li key={meeting.MeetingID}>
              <div>
                <strong>Attendant Name:</strong> {meeting.AttendantName}
              </div>
              <div>
                <strong>Meeting Title:</strong> {meeting.MeetingDescription}
              </div>
              <div>
                <strong>Meeting Date:</strong> {meeting.MeetingDate}
              </div>
              <div>
                <strong>Meeting Time:</strong> {meeting.MeetingTime}
              </div>
              <div>
                <strong>Meeting Location:</strong> {meeting.MeetingLocation}
              </div>
              {/* Add more meeting details as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShowAcceptedMeetings;
