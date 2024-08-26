const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      maxlength: 50,
    },
    address: {
      country: {
        type: String,
      },
      state: {
        type: String,
      },
      city: {
        type: String,
      },
      address: {
        type: String,
      },
      zip: {
        type: Number,
      },
    },
    email: {
      type: String,
      required: true,
      maxlength: 50,
    },
    emailVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: String,
    lastName: String,
    phone: {
      code: {
        type: Number,
      },
      no: {
        type: Number,
      },
    },
    dob: {
      type: Date,
    },
    fatherName: {
      type: String,
    },
    motherName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.model("User", accountSchema);

module.exports = Account;
