const userModel = require("./user.model.js");
const eventModel = require("./event.model.js");
const { chatModel, attachmentModel, messageModel } = require("./chat.model.js");
const schoolModel = require("./school.model.js");

exports.m = {
  user: userModel,
  event: eventModel,
  chat: chatModel,
  attachment: attachmentModel,
  message: messageModel,
  school: schoolModel,
};
