// attendance.routes.js
const express = require("express");
const router = express.Router();
const attendanceController = require("./attendance.controller");

// Get attendance for a student
router.get("/:studentId/:month", attendanceController.getAttendance);

// Mark attendance for a student
router.post("/:studentId/:month", attendanceController.markAttendance);

// Get attendance report for a student
router.get(
  "/:studentId/:month/report",
  attendanceController.getAttendanceReport
);

module.exports = router;
