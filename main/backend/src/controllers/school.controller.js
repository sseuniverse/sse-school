// school.controller.js
const { m } = require("../model");
const School = m.school

/**
 * Get all schools
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAllSchools = async (req, res) => {
  try {
    const schools = await School.find().exec();
    res.json(schools);
  } catch (err) {
    res.status(500).json({ message: "Error fetching schools" });
  }
};

/**
 * Get a single school by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getSchoolById = async (req, res) => {
  try {
    const school = await School.findById(req.params.id).exec();
    if (!school) {
      res.status(404).json({ message: "School not found" });
    } else {
      res.json(school);
    }
  } catch (err) {
    res.status(500).json({ message: "Error fetching school" });
  }
};

/**
 * Create a new school
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createSchool = async (req, res) => {
  try {
    // const uid = School.findOne().sort({ _id: -1 })
    // console.log(uid)
    const school = new School(req.body);
    await school.save();
    res.json(uid);
  } catch (err) {
    res.status(500).json({ message: "Error creating school" });
  }
};

/**
 * Update a school
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateSchool = async (req, res) => {
  try {
    const school = await School.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!school) {
      res.status(404).json({ message: "School not found" });
    } else {
      res.json(school);
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating school" });
  }
};

/**
 * Delete a school
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.deleteSchool = async (req, res) => {
  try {
    await School.findByIdAndRemove(req.params.id);
    res.json({ message: "School deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting school" });
  }
};
