


const express = require("express");
const {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const { protect, adminOnly } = require("../middleware/auth");
const {validate} = require("../middleware/validate");
const {
  courseSchema,
  courseIdSchema,
  updateCourseSchema,
} = require("../validators/courseValidator");

const router = express.Router();

router
  .route("/")
  .post(protect, adminOnly, validate(courseSchema), createCourse)
  .get(getCourses);

router
  .route("/:id")
  .get(validate(courseIdSchema), getCourse)
  .put(protect, adminOnly, validate(updateCourseSchema), updateCourse)
  .delete(protect, adminOnly, validate(courseIdSchema), deleteCourse);

module.exports = router;