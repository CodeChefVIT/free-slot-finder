const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const { PythonShell } = require("python-shell");

const User = require("../models/user");
const Team = require("../models/team");
const UserSlot = require("../models/userSlot");

const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

//Create a team
router.post("/add", checkAuth, async (req, res, next) => {
  const { teamName } = req.body;
  const createdBy = req.user.userId;

  if (!teamName) {
    return res.status(400).json({
      message: "1 or more parameter(s) missing from req.body",
    });
  }

  const team = new Team({
    _id: new mongoose.Types.ObjectId(),
    teamName,
    createdBy,
  });

  await team
    .save()
    .then(async (result) => {
      res.status(201).json({
        message: "Team created",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err.toString(),
      });
    });
});

//Get all teams of a user
router.get("/all", checkAuth, async (req, res, next) => {
  const createdBy = req.user.userId;

  await Team.find({ createdBy })
    .select("-__v")
    .then(async (teams) => {
      res.status(200).json({
        teams,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err.toString(),
      });
    });
});

router.use("/member", require("../routes/member"));

module.exports = router;
