// attendance.model.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the attendance schema
const attendanceSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
  month: { type: Date, required: true }, // store the month as a Date object
  attendance: { type: Buffer, required: true }, // store attendance as a binary buffer
});

// Create a virtual property to get the attendance as a bit vector
attendanceSchema.virtual("attendanceVector").get(function () {
  const attendanceBuffer = this.attendance;
  const attendanceVector = [];
  for (let i = 0; i < attendanceBuffer.length; i++) {
    const byte = attendanceBuffer[i];
    for (let j = 0; j < 8; j++) {
      attendanceVector.push((byte >> j) & 1);
    }
  }
  return attendanceVector;
});

// Create a method to mark attendance
attendanceSchema.methods.markAttendance = function (day, present) {
  const attendanceBuffer = this.attendance;
  const byteIndex = Math.floor(day / 8);
  const bitIndex = day % 8;
  if (present) {
    attendanceBuffer[byteIndex] |= 1 << bitIndex;
  } else {
    attendanceBuffer[byteIndex] &= ~(1 << bitIndex);
  }
  this.attendance = attendanceBuffer;
};

// Create the attendance model
const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
