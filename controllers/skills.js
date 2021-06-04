const Skill = require("../models/Skills");

// Import custom error response class.
const ErrorResponse = require("../utils/errorResponse");

// Import utility functions
const { executeDbAction, checkIfDataIsNull } = require("../utils");

// @desc   Get all skills
// @route  GET /api/v1/skills
// @access Public
exports.getSkills = (req, res, next) => {
  executeDbAction(
    async () => {
      // Fetch all skill data.
      const skills = await Skill.find();

      res
        .status(200)
        .json({ success: true, count: skills.length, data: skills });
    },
    (error) => {
      next(error);
      // res.status(400).json({ success: false })
    }
  );
};

// @desc   Get single skill
// @route  GET /api/v1/skills/:id
// @access Public
exports.getSkill = (req, res, next) => {
  executeDbAction(
    async () => {
      // Find skill data based on the given ID.
      const skill = await Skill.findById(req.params.id);

      // When a correctly-formatted ID is passed but skill data is null, send error 400.
      checkIfDataIsNull(skill, () => {
        return next(
          new ErrorResponse(
            `Skill data not found with id ${req.params.id}`,
            404
          )
        );
      });

      res.status(200).json({ success: true, data: skill });
    },
    (error) => {
      next(error);
      // res.status(400).json({ success: false })
    }
  );
};

// @desc   Create new skill
// @route  POST /api/v1/skills
// @access Private
exports.createSkill = (req, res, next) => {
  executeDbAction(
    async () => {
      // Create new skill data.
      const skill = await Skill.create(req.body);

      res.status(200).json({ success: true, data: skill });
    },
    (error) => {
      next(error);
      // res.status(400).json({ success: false })
    }
  );
};

// @desc   Update skill
// @route  PUT /api/v1/skills/:id
// @access Private
exports.updateSkill = (req, res, next) => {
  executeDbAction(
    async () => {
      // Find and update skill data.
      const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      // When a correctly-formatted ID is passed but skill data is null, send error 400.
      checkIfDataIsNull(skill, () => {
        return next(
          new ErrorResponse(
            `Skill data not found with id ${req.params.id}`,
            404
          )
        );
      });

      res.status(200).json({ success: true, data: skill });
    },
    (error) => {
      next(error);
      // res.status(400).json({ success: false })
    }
  );
};

// @desc   Delete skill
// @route  DELETE /api/v1/skills/:id
// @access Private
exports.deleteSkill = (req, res, next) => {
  executeDbAction(
    async () => {
      // Find and delete skill data.
      const skill = await Skill.findByIdAndDelete(req.params.id);

      // When a correctly-formatted ID is passed but skill data is null, send error 400.
      checkIfDataIsNull(skill, () => {
        return next(
          new ErrorResponse(
            `Skill data not found with id ${req.params.id}`,
            404
          )
        );
      });

      res.status(200).json({ success: true, data: {} });
    },
    (error) => {
      next(error);
    }
  );
};
