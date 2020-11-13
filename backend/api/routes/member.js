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

//Add member to a team
router.post("/add", checkAuth, async (req, res, next) => {
  const { teamId, memberName } = req.query;

  var upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
    onError: function (err, next) {
      res.status(400).json({
        message: "Something went wrong",
        error: err,
        errormsg: err.toString(),
      });
      next(err);
    },
  }).single("file");

  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        error: "PLease select correct file",
      });
    } else if (err) {
      return res.status(400).json({
        message: "Something went wrong",
        error: err,
        errormsg: err.toString(),
      });
    }

    let filepath =
      path.dirname(__dirname).replace("\\api", "").replace("/api", "") +
      "/public/uploads/" +
      req.file.filename;

    var options = {
      mode: "text",
      args: [filepath],
    };

    PythonShell.run("./freeSlots.py", options, async function (err, results) {
      if (err)
        return res.status(400).json({
          message: "Something went wrong",
          error: "Please upload valid and correctly cropped timetable",
          errormsg: err.toString(),
          err: err,
        });
      else {
        var timetableArray = JSON.parse(results);
        const userSlot = new UserSlot({
          _id: new mongoose.Types.ObjectId(),
          memberName,
          timetable: timetableArray,
          teamId,
        });
        await userSlot
          .save()
          .then((data) => {
            res.status(201).json({
              message: "Uploaded successfully",
              result: data,
            });
          })
          .catch((err) =>
            res.status(400).json({
              message: "Something went wrong",
              error: err,
              errormsg: err.toString,
            })
          );
      }
    });
  });
});

//Get all members of a team
router.get("/all", checkAuth, async (req, res, next) => {
  const { teamId } = req.query;

  if (!teamId) {
    return res.status(400).json({
      message: "1 or more parameter(s) missing from req.body",
    });
  }

  await UserSlot.find({ teamId })
    .then(async (members) => {
      res.status(200).json({
        members,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err.toString(),
      });
    });
});

//Delete a member
router.delete("/", checkAuth, async (req, res, next) => {
  const userId = req.user.userId;
  const { teamId, memberId } = req.body;

  if (!teamId || !memberId) {
    return res.status(400).json({
      message: "1 or more parameter(s) missing from req.body",
    });
  }

  await Team.findById(teamId)
    .then(async (team) => {
      if (team.createdBy == userId) {
        await UserSlot.deleteOne({ _id: memberId })
          .then(async () => {
            res.status(200).json({
              message: "Member removed successfully",
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: "Something went wrong",
              error: err.toString(),
            });
          });
      } else {
        res.status(403).json({
          message: "You are not authorized to remove this member",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err.toString(),
      });
    });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      path.basename(file.originalname, path.extname(file.originalname)) +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error());
  }
};

module.exports = router;
