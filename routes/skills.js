const express = require("express");

// Import `skills` controllers.
const { getSkills, getSkill } = require("../controllers/skills");
const { createSkill, updateSkill } = require("../controllers/skills");
const { deleteSkill } = require("../controllers/skills");

// Initialize express router.
const router = express.Router();

// Setup `get` and `post` routes.
router.route("/").get(getSkills).post(createSkill);

// Setup another `get` route as well as `put` and `delete` route.
router.route("/:id").get(getSkill).put(updateSkill).delete(deleteSkill);

module.exports = router;
