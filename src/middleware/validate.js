const { ZodError } = require("zod");

const validate = (schema) => (req, res, next) => {
  console.log("🔹 Incoming request body:", req.body);

  const result = schema.safeParse({
    body: req.body,
    query: req.query,
    params: req.params,
  });

  if (!result.success) {
    console.log(" Validation Error:", result.error.format()); // Debugging logs

    return res.status(400).json({
      success: false,
      error: Object.entries(result.error.format()).map(([key, value]) => ({
        path: key,
        message: value?._errors?.[0] || "Invalid input",
      })),
    });
  }

  console.log(" Validation passed!"); // Debugging log
  next();
};

module.exports = { validate };
