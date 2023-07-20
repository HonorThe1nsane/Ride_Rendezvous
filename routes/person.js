const express = require("express");
const router = express.Router();
const personController = require("../controllers/person");
const { personsValidationRules, validate } = require("../utils/validator");

router.get("/", personController.getAll);
router.get("/:id", personController.getSpecific);
router.post(
  "/",
  personsValidationRules(),
  validate,
  personController.postPerson
);
router.put(
  "/:id",
  personsValidationRules(),
  validate,
  personController.updatePerson
);

router.delete("/:id", personController.deletePerson);

module.exports = router;
