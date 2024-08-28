const router = require("express").Router();
const {
  getEvent,
  newEvent,
  updateEvent,
  deleteEvent,
  getEventById,
} = require("../controllers/event.controller.js");

// Route
router.get("/events", getEvent);
router.get("/events/:id", getEventById);
router.post("/events/new", newEvent);
router.put("/events/update", updateEvent);
router.delete("/events/delete", deleteEvent);

module.exports = router;
