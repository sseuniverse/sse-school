const { m } = require("../model");

const Chat = m.chat;
const Message = m.message;
const Attachment = m.attachment;

async function getContacts() {
  return Chat.find().select("contacts");
}

async function getConversations() {
  return Chat.find().select("conversations");
}

async function getConversation(conversationId) {
  return Chat.findOne({ "conversations.id": conversationId }).select(
    "conversations.$"
  );
}

async function markConversationAsRead(conversationId) {
  return Chat.updateOne(
    { "conversations.id": conversationId },
    { $set: { "conversations.$.unreadCount": 0 } }
  );
}

async function getParticipants(conversationKey) {
  return Chat.findOne({ "conversations.id": conversationKey }).select(
    "participants"
  );
}

async function sendMessage(conversationId, message) {
  const newMessage = new Message(message);
  await newMessage.save();
  return Chat.updateOne(
    { "conversations.id": conversationId },
    { $push: { "conversations.$.messages": newMessage } }
  );
}

async function addAttachment(conversationId, attachment) {
  const newAttachment = new Attachment(attachment);
  await newAttachment.save();
  return Chat.updateOne(
    { "conversations.id": conversationId },
    { $push: { "conversations.$.messages.$[].attachments": newAttachment } }
  );
}

async function addRecipients(recipients) {
  return Chat.updateOne({}, { $set: { recipients } });
}

async function resetActiveConversation() {
  return Chat.updateOne({}, { $set: { activeConversationId: null } });
}

exports.getContactsRoute = async (req, res) => {
  try {
    const contacts = await getContacts();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Failed to get contacts" });
  }
};

exports.getConversationsRoute = async (req, res) => {
  try {
    const conversations = await getConversations();
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: "Failed to get conversations" });
  }
};

exports.getConversationRoute = async (req, res) => {
  try {
    const conversation = await getConversation(req.params.conversationKey);
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ error: "Failed to get conversation" });
  }
};

exports.markConversationAsReadRoute = async (req, res) => {
  try {
    await markConversationAsRead(req.params.conversationKey);
    res.json({ message: "Conversation marked as read" });
  } catch (error) {
    res.status(500).json({ error: "Failed to mark conversation as read" });
  }
};

exports.getParticipantsRoute = async (req, res) => {
  try {
    const participants = await getParticipants(req.params.conversationKey);
    res.json(participants);
  } catch (error) {
    res.status(500).json({ error: "Failed to get participants" });
  }
};

exports.sendMessageRoute = async (req, res) => {
  try {
    const message = req.body;
    await sendMessage(req.params.conversationKey, message);
    res.json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" });
  }
};

exports.addAttachmentRoute = async (req, res) => {
  try {
    const attachment = req.body;
    await addAttachment(req.params.conversationKey, attachment);
    res.json({ message: "Attachment added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add attachment" });
  }
};

exports.addRecipientsRoute = async (req, res) => {
  try {
    const recipients = req.body;
    await addRecipients(recipients);
    res.json({ message: "Recipients added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add recipients" });
  }
};

exports.resetActiveConversationRoute = async (req, res) => {
  try {
    await resetActiveConversation();
    res.json({ message: "Active conversation reset successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to reset active conversation" });
  }
};
