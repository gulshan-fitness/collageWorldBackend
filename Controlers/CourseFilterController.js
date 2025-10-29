const Course = require("../models/CourseFilter");

/**
 * Build Mongo filter object based on category + query params.
 * Runs filtering IN DATABASE (faster than in-memory).
 */
function buildCategoryFilter(category) {
  if (!category || category === "all") return {};

  const regexOr = (arr) => ({ $or: arr.map(s => ({ courseName: { $regex: s, $options: "i" } })) });

  switch (category) {
    case "ug":
      return {
        $or: [
          { courseName: { $regex: "^b\\.", $options: "i" } },
          { courseName: /bachelor|b\.tech|b tech|bsc|b\.sc|bcom|b\.com|ba|b\.a/i }
        ]
      };

    case "pg":
      return {
        $or: [
          { courseName: { $regex: "^m\\.", $options: "i" } },
          { courseName: /master|mba|mca|m\.tech|m tech|msc|m\.sc|mcom|m\.com|ma|m\.a/i }
        ]
      };

    case "diploma":
      return { courseName: /diploma/i };

    case "certificate":
      return {
        $or: [
          { courseName: /certificate|certification|cert/i },
          { duration: { $lt: 1 } }
        ]
      };

    case "online":
      return {
        $or: [
          { mode: /online|distance|e-?learning|virtual/i },
          { courseName: /online|distance/i }
        ]
      };

    case "abroad":
      return { $or: [{ courseName: /abroad|international|foreign|global/i }, { mode: /international|abroad/i }] };

    case "job_guarantee":
      return {
        $or: [
          { courseName: /job|placement|guarantee|assured|employment/i },
          { mode: /placement|job guarantee/i }
        ]
      };

    default:
      return {};
  }
}

exports.createCourse = async (req, res) => {
  console.log(req.body)
  try {
    const course = await Course.create(req.body);
    return res.status(201).json({ status: 1, msg: "Course created", data: course });
  } catch (err) {
    return res.status(400).json({ status: 0, msg: "Validation error", error: err.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ status: 0, msg: "Course not found" });
    return res.json({ status: 1, msg: "Course updated", data: updated });
  } catch (err) {
    return res.status(400).json({ status: 0, msg: "Update error", error: err.message });
  }
};

/**
 * GET /api/courses
 * Query params:
 *  - category=ug|pg|diploma|certificate|online|abroad|job_guarantee|all
 *  - search= (free text on courseName/specialisation)
 *  - mode=online/offline/distance
 *  - minDuration / maxDuration (numbers)
 *  - page (default 1), limit (default 20)
 *  - populate=1 to populate refs
 */
exports.getCourses = async (req, res) => {
  try {
    const {
      category = "all",
      search = "",
      mode = "",
      minDuration,
      maxDuration,
      page = 1,
      limit = 20,
      populate = "1",
    } = req.query;

    // Category-based filter
    const catFilter = buildCategoryFilter(category);

    // Extra filters
    const extra = {};
    if (mode) extra.mode = new RegExp(mode, "i");
    if (search) {
      extra.$or = [
        { courseName: new RegExp(search, "i") },
        { specialisation: { $elemMatch: { $regex: search, $options: "i" } } }
      ];
    }
    if (minDuration || maxDuration) {
      extra.duration = {};
      if (minDuration) extra.duration.$gte = Number(minDuration);
      if (maxDuration) extra.duration.$lte = Number(maxDuration);
    }

    const filter = { ...catFilter, ...extra };

    const skip = (Number(page) - 1) * Number(limit);
    let query = Course.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit));

    if (populate === "1") {
      query = query.populate("college_id").populate("stream_id");
    }

    const [data, total] = await Promise.all([
      query.exec(),
      Course.countDocuments(filter),
    ]);

    return res.json({
      status: 1,
      msg: "Courses fetched",
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      count: data.length,
      data,
    });
  } catch (err) {
    return res.status(500).json({ status: 0, msg: "Internal error", error: err.message });
  }
};
