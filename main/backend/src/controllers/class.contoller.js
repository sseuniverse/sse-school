// const Class = require("../models/Class");
// const Teacher = require("../models/Teacher");

const { m } = require("../model");
const Class = m.class;

// Create a new class
exports.createClass = async (req, res) => {
  try {
    const newClass = new Class(req.body);
    await newClass.save();
    res
      .status(201)
      .json({ message: "Class created successfully", class: newClass });
  } catch (error) {
    res.status(500).json({ message: "Error creating class", error });
  }
};

// Update a class
exports.updateClass = async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.classId,
      req.body,
      { new: true }
    );
    if (!updatedClass) {
      res.status(404).json({ message: "Class not found" });
    } else {
      res
        .status(200)
        .json({ message: "Class updated successfully", class: updatedClass });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating class", error });
  }
};

// Delete a class
exports.deleteClass = async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.classId);
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting class", error });
  }
};

// Get a class
exports.getClass = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.classId).populate(
      "sections.teacher"
    );
    if (!classData) {
      res.status(404).json({ message: "Class not found" });
    } else {
      res
        .status(200)
        .json({ message: "Class retrieved successfully", class: classData });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving class", error });
  }
};

// Get a section
exports.getSection = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.classId);
    if (!classData) {
      res.status(404).json({ message: "Class not found" });
    } else {
      const section = classData.sections.id(req.params.sectionId);
      if (!section) {
        res.status(404).json({ message: "Section not found" });
      } else {
        res
          .status(200)
          .json({ message: "Section retrieved successfully", section });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving section", error });
  }
};

// Create a new section
exports.createSection = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.classId);
    if (!classData) {
      res.status(404).json({ message: "Class not found" });
    } else {
      classData.sections.push(req.body);
      await classData.save();
      res.status(201).json({
        message: "Section created successfully",
        section: classData.sections[classData.sections.length - 1],
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error creating section", error });
  }
};

// Update a section
exports.updateSection = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.classId);
    if (!classData) {
      res.status(404).json({ message: "Class not found" });
    } else {
      const section = classData.sections.id(req.params.sectionId);
      if (!section) {
        res.status(404).json({ message: "Section not found" });
      } else {
        section.set(req.body);
        await classData.save();
        res
          .status(200)
          .json({ message: "Section updated successfully", section });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating section", error });
  }
};

// Delete a section
exports.deleteSection = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.classId);
    if (!classData) {
      res.status(404).json({ message: "Class not found" });
    } else {
      const section = classData.sections.id(req.params.sectionId);
      if (!section) {
        res.status(404).json({ message: "Section not found" });
      } else {
        section.remove();
        await classData.save();
        res.status(200).json({ message: "Section deleted successfully" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting section", error });
  }
};
