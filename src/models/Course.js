const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a course title"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      min: [0, "Price must be at least 0"],
    },
    duration: {
      type: Number,
      required: [true, "Please add course duration in weeks"],
    },
    level: {
      type: String,
      required: [true, "Please add a difficulty level"],
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    published: {
      type: Boolean,
      default: false,
    },
    instructor: {
      type: String,
      required: [true, "Please add an instructor name"],
    },
    topics: [String],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
