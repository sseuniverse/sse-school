const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      // unique: true,
    },
    // logo: {
    //   type: Buffer,
    //   contentType: String,
    // },
    address: {
      type: String,
      required: true,
    },
    schoolUid: {
      type: String,
      default: "1",
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    website: {
      type: String,
    },
    type: {
      type: String, // e.g. "Public", "Private", "Charter"
      enum: ["Public", "Private", "Charter"],
    },
    board: {
      type: String,
      enum: ["CBSE", "State Board"],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    levels: {
      type: [
        {
          type: String,
          enum: ["Elementary", "Middle", "High", "Higher Education"],
        },
      ],
    },
  },
  { timestamps: true }
);

const School = mongoose.model("School", schoolSchema);

module.exports = School;
