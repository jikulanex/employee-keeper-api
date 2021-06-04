const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Skill cannot be blank"],
    maxLength: [50, "Skill cannot be more than 50 characters"],
  },
});

module.exports = mongoose.model("Skill", SkillSchema);
