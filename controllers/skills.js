let skills = [
  { id: 0, name: "HTML" },
  { id: 1, name: "CSS" },
  { id: 2, name: "JavaScript" },
  { id: 3, name: "Node.js" },
  { id: 4, name: "PHP" },
  { id: 5, name: "Python" },
  { id: 6, name: "Java" },
  { id: 7, name: "Rust" },
  { id: 8, name: "Assembly" },
  { id: 9, name: "C" },
  { id: 10, name: "C++" },
  { id: 11, name: "C#" },
  { id: 12, name: "React.js" },
  { id: 13, name: "Vue.js" },
  { id: 14, name: "Angular" },
  { id: 15, name: "Next.js" },
];

// Find skill data.
const findSkill = (skills, inputId, callback) => {
  const capturedSkill = skills.find((item) => {
    return Number(item.id) === Number(inputId);
  });

  if (!capturedSkill) {
    callback();
  }

  return capturedSkill;
};

// @desc   Get all skills
// @route  GET /api/v1/skills
// @access Public
exports.getSkills = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: "Show all skills", skills: skills });
};

// @desc   Get single skill
// @route  GET /api/v1/skills/:id
// @access Public
exports.getSkill = (req, res, next) => {
  const capturedSkill = findSkill(skills, req.params.id, () => {
    res.status(400).json({
      success: false,
      msg: `Cannot find skill ${req.params.id}`,
    });
  });

  res.status(200).json({
    success: true,
    msg: `Show skill ${req.params.id}`,
    skills: capturedSkill,
  });
};

// @desc   Create new skill
// @route  POST /api/v1/skills
// @access Private
exports.createSkill = (req, res, next) => {
  const newSkill = { id: skills.length, ...req.body };
  skills = [...skills, newSkill];

  res
    .status(200)
    .json({ success: true, msg: "Create new skill", skill: newSkill });
};

// @desc   Update skill
// @route  PUT /api/v1/skills/:id
// @access Private
exports.updateSkill = (req, res, next) => {
  const capturedSkill = findSkill(skills, req.params.id, () => {
    res.status(400).json({
      success: false,
      msg: `Unable to update. Cannot find skill ${req.params.id}`,
    });
  });

  let updatedSkill;

  skills = skills.map((item) => {
    if (Number(item.id) === Number(capturedSkill.id)) {
      updatedSkill = { ...item, ...req.body };
      return updatedSkill;
    }
    return item;
  });

  res.status(200).json({
    success: true,
    msg: `Update skill ${req.params.id}`,
    skill: updatedSkill,
  });
};

// @desc   Delete skill
// @route  DELETE /api/v1/skills/:id
// @access Private
exports.deleteSkill = (req, res, next) => {
  const capturedSkill = findSkill(skills, req.params.id, () => {
    res.status(400).json({
      success: false,
      msg: `Unable to delete. Cannot find skill ${req.params.id}`,
    });
  });

  let deletedSkill;

  skills = skills.filter((item) => {
    if (Number(item.id) === Number(capturedSkill.id)) {
      deletedSkill = item;
    }
    return Number(item.id) !== Number(req.params.id);
  });

  res.status(200).json({
    success: true,
    msg: `Delete skill ${req.params.id}`,
    skills: deletedSkill,
  });
};
