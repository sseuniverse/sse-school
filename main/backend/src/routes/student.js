const express = require("express");
const router = express.Router();
const {
  createStudent,
  getStudents,
  getStudentById,
  getAddress,
  getGuardian,
  getContact,
  getMedical,
  deleteStudent,
  updateStudent,
  updateAddress,
  updateContact,
  updateGuardian,
  updateMedical,
} = require("../controllers/student.controller.js");
const { authenticate } = require("../middelware/auth.js");

// Other
router.post("/", createStudent);
router.delete("/:id", authenticate, deleteStudent);

// Get Details
router.get("/", authenticate, getStudents);
router.get("/:id", authenticate, getStudentById);
router.get("/:id/address", authenticate, getAddress);
router.get("/:id/contact", authenticate, getContact);
router.get("/:id/guardian", authenticate, getGuardian);
router.get("/:id/medical", authenticate, getMedical);

// Update Details
router.put("/:id", authenticate, updateStudent);
router.put("/:id/address", authenticate, updateAddress);
router.put("/:id/contact", authenticate, updateContact);
router.put("/:id/guardian", authenticate, updateGuardian);
router.put("/:id/medical", authenticate, updateMedical);

module.exports = router;
