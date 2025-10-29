const express = require("express");
const router = express.Router();
const {
  createCourse,
  updateCourse,
  getCourses,
} = require("../Controlers/CourseFilterController");

// POST: create course
router.post("/", createCourse);

// PUT: update course
router.put("/:id", updateCourse);

// GET: fetch + filter courses (category/search/mode/duration/pagination)
router.get("/", getCourses);

module.exports = router;
