const userModel = require("./user.model.js");
const eventModel = require("./event.model.js");
const { chatModel, attachmentModel, messageModel } = require("./chat.model.js");
const schoolModel = require("./school.model.js");
const { Column, Task, Board } = require("./kanban.model.js");
const classModel = require("./classes.model.js");

exports.m = {
  user: userModel,
  event: eventModel,
  chat: chatModel,
  attachment: attachmentModel,
  message: messageModel,
  kanban: {
    board: Board,
    task: Task,
    column: Column,
  },
  school: schoolModel,
  class: classModel,
};
