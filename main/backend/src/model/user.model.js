const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photoURL: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    country: {
      type: String,
    },
    address: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    about: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "student", "teacher"],
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.model("User", accountSchema);

module.exports = Account;
