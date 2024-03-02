import { useEffect, useState } from "react";
import axios from "axios";
import CreateMeetingFromRequest from "./CreateMeetingFromRequest";
import RejectMeetingFromRequest from "./RejectMeetingFromRequest";

axios.defaults.baseURL = "http://localhost:8080/";

const ShowMeetingRequests = () => {
  const [meetingRequests, setMeetingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isMeetingFromRequest, setMeetingFromRequest] = useState(false);
  const [isRejectMeetingFromRequest, setRejectMeetingFromRequest] =
    useState(false);

  useEffect(() => {
    const fetchMeetingRequests = async () => {
      try {
        const response = await axios.get("/meetingRequests", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (response.status === 200) {
          // console.log("Meeting requests:", response.data.data);
          setMeetingRequests(response.data.data);
        } else {
          console.error(
            "Error fetching meeting requests:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetingRequests();
  }, []);

  const handleAccept = (requestId) => {
    // Set the selected request and open the pop-up
    setSelectedRequest(
      meetingRequests.find((request) => request.senderId === requestId)
    );
    // console.log("Accepted request with ID:", requestId);
    setMeetingFromRequest(true);
  };

  const handleReject = (requestId) => {
    console.log("Rejected request with ID:", requestId);
    setMeetingRequests((prevRequests) =>
      prevRequests.filter((request) => request.senderId !== requestId)
    );
    setRejectMeetingFromRequest(true);
  };

  const handleClosePopUp = () => {
    // Close the pop-up
    setMeetingFromRequest(false);
  };

  return (
    <div>
      <h1>Meeting Requests</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {meetingRequests.map((request) => (
            <li key={request.id}>
              <div>
                <strong>Sender:</strong> {request.senderName}
              </div>
              <div>
                <strong>Description:</strong> {request.meetingDescription}
              </div>
              <div>
                <button onClick={() => handleAccept(request.senderId)}>
                  Accept
                </button>
                <button onClick={() => handleReject(request.senderId)}>
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {isMeetingFromRequest && (
        <CreateMeetingFromRequest
          selectedRequest={selectedRequest}
          onClose={handleClosePopUp}
        />
      )}

      {isRejectMeetingFromRequest && (
        <RejectMeetingFromRequest
          selectedRequest={selectedRequest}
          onClose={handleClosePopUp}
        />
      )}
    </div>
  );
};

export default ShowMeetingRequests;
