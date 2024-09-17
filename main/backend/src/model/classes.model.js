const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    schoolUid: {
      type: String,
    },
    room: {
      type: String,
    },
    // sections: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     capacity: {
    //       type: Number,
    //       required: true,
    //     },
    //     teacher: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "User",
    //       // required: true,
    //     },
    //   },
    // ],
  },
  { timestamps: true }
);

const sectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
  },
  { timestamps: true }
);

exports.Class = mongoose.model("Class", classSchema);
exports.Section = mongoose.model("Section", sectionSchema);
