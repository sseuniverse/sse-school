const router = require("express").Router();
const {
  getContactsRoute,
  getConversationsRoute,
  getConversationRoute,
  markConversationAsReadRoute,
  getParticipantsRoute,
  sendMessageRoute,
  addAttachmentRoute,
  addRecipientsRoute,
  resetActiveConversationRoute,
} = require("../controllers/chat.controller.js");

router.get("/contacts", getContactsRoute);
router.get("/conversations", getConversationsRoute);
router.get("/conversation/:conversationKey", getConversationRoute);
router.post("/conversation/:conversationKey/mark-as-read", markConversationAsReadRoute);
router.get("/conversation/:conversationKey/participants", getParticipantsRoute);
router.post("/conversation/:conversationKey/send-message", sendMessageRoute);
router.post("/conversation/:conversationKey/add-attachment", addAttachmentRoute);
router.post("/add-recipients", addRecipientsRoute);
router.post("/reset-active-conversation", resetActiveConversationRoute);

module.exports = router
