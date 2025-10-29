const mongoose = require('mongoose');

const CourseFilterSchema = new mongoose.Schema(
  {
    college_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      // required: true,
    },
    stream_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "stream",
      // required: true,
    },

    courseName: { type: String, required: true },
    courseCategory: { type: String, required: true },

    duration: { type: Number, required: true }, // years (or months if you prefer)

    approved: { type: String, required: true }, // e.g., UGC/AICTE/etc

    specialisation: [{ type: String, required: true }],

    time: { type: String, required: true }, // full-time/part-time

    scholarship: { type: String, required: true }, // e.g., "available"/"NA"

    fees: { type: Number, required: true },

    mode: { type: String, required: true }, // online/offline/distance

    approvals: [{ type: String }], // optional: multiple approvals

    course_image: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('CourseFilter', CourseFilterSchema);
