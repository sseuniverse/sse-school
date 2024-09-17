const Student = require("../model/student.model.js");

/**
 * Create a new student
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(200).send(student);
  } catch (err) {
    res.status(400).send(err);
  }
};

/**
 * Get all students
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate("school").populate("class");
    res.status(200).send(students);
  } catch (err) {
    res.status(400).send(err);
  }
};

/**
 * Get a student by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getStudentById = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findById(id)
      .populate("school")
      .populate("class");
    if (!student) {
      res.status(404).send({ message: "Student not found" });
    } else {
      res.status(200).send(student);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

/**
 * Get a student's address
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAddress = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findById(id);
    if (!student) {
      res.status(404).send({ message: "Student not found" });
    } else {
      res.status(200).send(student.address);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

/**
 * Get a student's contact information
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getContact = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findById(id);
    if (!student) {
      res.status(404).send({ message: "Student not found" });
    } else {
      res.status(200).send(student.contact);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

/**
 * Get a student's guardian information
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getGuardian = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findById(id);
    if (!student) {
      res.status(404).send({ message: "Student not found" });
    } else {
      res.status(200).send(student.guardian);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

/**
 * Get a student's medical information
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getMedical = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findById(id);
    if (!student) {
      res.status(404).send({ message: "Student not found" });
    } else {
      res.status(200).send(student.medical);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

/**
 * Delete a student by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    await Student.findByIdAndRemove(id);
    res.status(200).send({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(400).send(err);
  }
};

/**
 * Update a student's information
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send(student);
  } catch (err) {
    res.status(400).send(err);
  }
};

/**
 * Update a student's address
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateAddress = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findByIdAndUpdate(
      id,
      { $set: { address: req.body } },
      { new: true }
    );
    res.status(200).send(student);
  } catch (err) {
    res.status(400).send(err);
  }
};

/**
 * Update a student's contact information
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateContact = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findByIdAndUpdate(
      id,
      { $set: { contact: req.body } },
      { new: true }
    );
    res.status(200).send(student);
  } catch (err) {
    res.status(400).send(err);
  }
};

/**
 * Update a student's guardian information
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateGuardian = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findByIdAndUpdate(
      id,
      { $set: { guardian: req.body } },
      { new: true }
    );
    res.status(200).send(student);
  } catch (err) {
    res.status(400).send(err);
  }
};

/**
 * Update a student's medical information
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateMedical = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findByIdAndUpdate(
      id,
      { $set: { medical: req.body } },
      { new: true }
    );
    res.status(200).send(student);
  } catch (err) {
    res.status(400).send(err);
  }
};
