const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

// ------------------- ROUTES -------------------

const signUpRoute = require("./api/routes/signup");
const loginRoute = require("./api/routes/login");
const logoutRoute = require("./api/routes/logout");
const getUserTypeRoute = require("./api/routes/userType");
const studentRoute = require("./api/routes/student");
const facultyRoute = require("./api/routes/faculty");
const visitorRoute = require("./api/routes/visitor");
const meetingRoute = require("./api/routes/meeting");
const getUsersRoute = require("./api/routes/getAllUsers");
const meetingRequestsRoute = require("./api/routes/meetingRequest");
const getMeetingRequestsRoute = require("./api/routes/getMeetingRequests");
const createMeetingFromRequestRoute = require("./api/routes/createMeetingFromRequest");
const showAcceptedMeetingsRoute = require("./api/routes/showAcceptedMeetings");

app.use("/signup", signUpRoute);
app.use("/login", loginRoute);
app.use("/logout", logoutRoute);
app.use("/userType", getUserTypeRoute);
app.use("/student", studentRoute);
app.use("/faculty", facultyRoute);
app.use("/visitor", visitorRoute);
app.use("/meeting", meetingRoute);
app.use("/getUsers", getUsersRoute);
app.use("/meetingRequests", meetingRequestsRoute);
app.use("/meetingRequests", getMeetingRequestsRoute);
app.use("/createMeetingFromRequest", createMeetingFromRequestRoute);
app.use("/showAcceptedMeetings", showAcceptedMeetingsRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
