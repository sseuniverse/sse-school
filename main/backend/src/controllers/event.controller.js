const { m } = require("../model");
const Event = m.event;

exports.getEvent = async (req, res) => {
  try {
    const events = await Event.find().exec();
    res.status(200).json({ events });
  } catch (error) {
    console.error("[Events Controller]: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const id = req.params.id;
    const event = await Event.findById(id).exec();
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ event });
  } catch (error) {
    console.error("[Events Controller]: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.newEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const event = await newEvent.save();
    res.json({ event });
  } catch (error) {
    console.error("[Events Controller]: ", error);
    res.status(500).json({ error: "Error creating event" });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const eventId = req.body.eventId;
    const eventUpdates = req.body.event;
    const id = await Event.findById(eventId);
    if (!id) {
      return res.status(404).json({ message: "Event not found" });
    }
    const event = await Event.findByIdAndUpdate(eventId, eventUpdates, {
      new: true,
    });
    res.json({ event });
  } catch (error) {
    console.error("[Events Controller]: ", error);
    res.status(500).json({ error: "Error updating event" });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const eventId = req.body.eventId;
    const id = await Event.findById(eventId);
    if (!id) {
      return res.status(404).json({ message: "Event not found" });
    }
    await Event.findByIdAndRemove(eventId);
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("[Events Controller]: ", error);
    res.status(500).json({ error: "Error deleting event" });
  }
};
