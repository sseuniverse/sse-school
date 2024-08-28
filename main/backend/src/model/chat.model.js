const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String },
  profilePicture: { type: String },
});

const conversationSchema = new mongoose.Schema({
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

const messageSchema = new mongoose.Schema({
  body: { type: String, required: true },
  contentType: { type: String, required: true },
  attachments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attachment" }],
  createdAt: { type: Date, required: true },
  senderId: { type: String, required: true },
});

const participantSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  conversationId: { type: String, required: true },
});

const attachmentSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, enum: ["chat", "mail"], default: "chat" },
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
  data: { type: Buffer, required: true },
});

exports.chatModel = mongoose.model(
  "Chat",
  new mongoose.Schema({
    contacts: [contactSchema],
    conversations: [conversationSchema],
    activeConversationId: { type: String },
    participants: [participantSchema],
    recipients: [{ type: String }],
  })
);

exports.messageModel = mongoose.model("Message", messageSchema);
exports.attachmentModel = mongoose.model("Attachment", attachmentSchema);
