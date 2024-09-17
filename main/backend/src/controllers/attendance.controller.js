// attendance.controller.js
const Attendance = require("./attendance.model");
const Student = require("./student.model");

// Get attendance for a student
exports.getAttendance = async (req, res) => {
  const studentId = req.params.studentId;
  const month = req.params.month;
  try {
    const attendance = await Attendance.findOne({ studentId, month });
    if (!attendance) {
      return res.status(404).send({ message: "Attendance not found" });
    }
    res.send(attendance);
  } catch (err) {
    res.status(500).send({ message: "Error fetching attendance" });
  }
};

// Mark attendance for a student
exports.markAttendance = async (req, res) => {
  const studentId = req.params.studentId;
  const month = req.params.month;
  const day = req.body.day;
  const present = req.body.present;
  try {
    const attendance = await Attendance.findOne({ studentId, month });
    if (!attendance) {
      const newAttendance = new Attendance({
        studentId,
        month,
        attendance: Buffer.alloc(4),
      });
      await newAttendance.save();
      attendance = newAttendance;
    }
    attendance.markAttendance(day, present);
    await attendance.save();
    res.send({ message: "Attendance marked successfully" });
  } catch (err) {
    res.status(500).send({ message: "Error marking attendance" });
  }
};

// Get attendance report for a student
exports.getAttendanceReport = async (req, res) => {
  const studentId = req.params.studentId;
  const month = req.params.month;
  try {
    const attendance = await Attendance.findOne({ studentId, month });
    if (!attendance) {
      return res.status(404).send({ message: "Attendance not found" });
    }
    const attendanceVector = attendance.attendanceVector;
    const attendanceReport = [];
    for (let i = 0; i < attendanceVector.length; i++) {
      attendanceReport.push({
        day: i + 1,
        present: attendanceVector[i] === 1,
      });
    }
    res.send(attendanceReport);
  } catch (err) {
    res.status(500).send({ message: "Error fetching attendance report" });
  }
};
