

const Course = require('../models/Course')

const catchAsync = require('../utils/catchAsync')

const {AppError} = require('../middleware/errorHandler')

// @desc    Create new course
// @route   POST /api/courses
// @access  Private/Admin

const createCourse = catchAsync(async (req, res, next) => {
  req.body.createdBy = req.user._id;

  const course = await Course.create(req.body);

  res.status(201).json({
    success: true,
    data: course,
  });
});


// @desc    Get all courses
// @route   GET /api/courses
// @access  Public


const getCourses = catchAsync(async (req, res, next) => {
  // Query parameters for filtering
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach(el => delete queryObj[el]);

  // Filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  let query = Course.find(JSON.parse(queryStr));

  // Non-admin users can only see published courses
  if (req.user && req.user.role !== 'admin') {
    query = query.find({ published: true });
  }

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Field limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    query = query.select(fields);
  } else {
    query = query.select('-__v');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  
  query = query.skip(startIndex).limit(limit);
  
  // Execute query
  const courses = await query;
  
  // Get total documents
  const totalCourses = await Course.countDocuments(JSON.parse(queryStr));
  
  res.status(200).json({
    success: true,
    count: courses.length,
    totalPages: Math.ceil(totalCourses / limit),
    currentPage: page,
    data: courses,
  });
});

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
const getCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  
  if (!course) {
    return next(new AppError(`Course not found with id of ${req.params.id}`, 404));
  }

  // Check if course is published or user is admin
  if (!course.published && (!req.user || req.user.role !== 'admin')) {
    return next(new AppError(`Course not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private/Admin
const updateCourse = catchAsync(async (req, res, next) => {
  let course = await Course.findById(req.params.id);
  
  if (!course) {
    return next(new AppError(`Course not found with id of ${req.params.id}`, 404));
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: course,
  });
});



// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
const deleteCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  
  if (!course) {
    return next(new AppError(`Course not found with id of ${req.params.id}`, 404));
  }

  await course.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});