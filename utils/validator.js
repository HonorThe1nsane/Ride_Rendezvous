const { body, validationResult, check } = require("express-validator");

const personsValidationRules = () => {
  return [
    check("firstName", "first name is required").not().trim().isEmpty().escape(),
    check("lastName", "last name is required").not().trim().isEmpty().escape(),
    body("email").isEmail().withMessage("Not a valid e-mail address"),
    check("birthday", "birthday is required").not().trim().isEmpty().escape(),
    check("city", "city is required").not().trim().isEmpty().escape(),
    check("state", "state is required").not().trim().isEmpty().escape(),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));
  return res.status(400).json({ errors: extractedErrors });
};

module.exports = {
  personsValidationRules,
  validate,
};
