const express = require("express");
const router = express.Router();

const personController = require("../controllers/person");

router.get("/", personController.getAll);
router.post("/", personController.postPerson);
router.put("/:id", personController.updatePerson);
router.delete("/:id", personController.deletePerson);

module.exports = router;
