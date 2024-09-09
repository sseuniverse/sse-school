const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./src/routes/user.js");
const eventRouter = require("./src/routes/event.js");
const chatRoute = require("./src/routes/chat.js");
const schoolRoute = require("./src/routes/school.js");
const kanbanRoute = require("./src/routes/kanban.js");
// const { verifyToken } = require("./src/middelware/auth.js");
const requestIp = require("request-ip");

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://sseworld:sseworld04%40@main.9p2ytf6.mongodb.net/sm-s?retryWrites=true&w=majority&appName=main"
  )
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// app.use(express.static('../frontend/dist'));

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:4173", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);
app.use(requestIp.mw({ enableProxy: true }));
app.use(cookieParser());

// Define the API routes
app.use("/api/account", userRouter);
app.use("/api/calendar", eventRouter);
app.use("/api/chat", chatRoute);
app.use("/api/schools", schoolRoute);
app.use("/api/kanban", kanbanRoute);

// Use middleware to verify token for protected routes
// app.use("/api/account/my-account", verifyToken);

// API endpoint to get client's IP address
app.get("/api/ipv4", (req, res) => {
  const ipv4Address = requestIp.getClientIp(req, { version: 4, mapIPv6: true })
  res.json({ ipv4: ipv4Address })
})

// API endpoint to get client's IP address with additional information
app.get("/api/ip-info", (req, res) => {
  const clientIp = req.clientIp;
  const userAgent = req.headers["user-agent"];
  res.json({ ip: clientIp, userAgent });
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
