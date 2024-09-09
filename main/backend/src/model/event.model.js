const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    allDay: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
    },
    description: {
      type: String,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
