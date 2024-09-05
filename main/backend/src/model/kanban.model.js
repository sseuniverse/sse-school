const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  due: [Date],
  status: {
    type: String,
  },
  labels: [{ type: String }],
  comments: [
    {
      name: String,
      createdAt: Date,
      avatarUrl: String,
      messageType: String,
      message: String,
    },
  ],
  assignee: [
    {
      name: String,
      avatarUrl: String,
    },
  ],
  priority: String,
  attachments: [{ type: String }],
  reporter: {
    name: String,
    avatarUrl: String,
  },
});

const columnSchema = new mongoose.Schema({
  name: String,
  taskIds: [{ type: String, ref: "Task" }],
});

const boardSchema = new mongoose.Schema({
  columns: { type: Object, default: {} },
  tasks: { type: Object, default: {} },
  ordered: [{ type: String, ref: "Column" }],
});

const Task = mongoose.model("Task", taskSchema);
const Column = mongoose.model("Column", columnSchema);
const Board = mongoose.model("Board", boardSchema);

module.exports = { Task, Column, Board };
