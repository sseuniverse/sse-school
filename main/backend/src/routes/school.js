const router = require("express").Router()
const schoolController = require("../controllers/school.controller");

/**
 * School routes
 */

router.get("/", schoolController.getAllSchools);
router.get("/:id", schoolController.getSchoolById);
router.post("/", schoolController.createSchool);
router.put("/:id", schoolController.updateSchool);
router.delete("/:id", schoolController.deleteSchool);

module.exports = router;
