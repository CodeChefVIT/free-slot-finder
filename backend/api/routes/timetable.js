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

//Get timetable of one user
router.get("/compare", checkAuth, (req, res, next) => {
  var arr = req.query.id;

  UserSlot.find({ _id: { $in: arr } })
    .then((data) => {
      const numTimetables = data.length;

      if (numTimetables >= 1) {
        //save the timetable of first person in an array called first
        var first = data[0].timetable;
        var newarr = [];

        // loop to initialize every element of newarr to 0
        for (var j = 0; j < 5; j++) {
          newarr[j] = [];
          for (var k = 0; k < 22; k++) {
            newarr[j][k] = 0;
          }
        }

        // loop to compare each timetable to the first one
        for (var i = 1; i < data.length; i++) {
          //save the details of the current user in newvar
          var newvar = data[i].timetable;
          // console.log("next log is the timetable of person " + (i + 1));
          // console.log("newvar", newvar);
          for (var j = 0; j < 5; j++) {
            for (var k = 0; k < 22; k++) {
              if (first[j][k] == 1 && newvar[j][k] == 1) {
                newarr[j][k] = newarr[j][k] + 1;
              } else {
                newarr[j][k] = 0;
              }
            }
          }
        }

        // finding the max element of newarr
        var maxRow = newarr.map(function (row) {
          return Math.max.apply(Math, row);
        });
        var max = Math.max.apply(null, maxRow);

        // console.log("Total number of timetables checking:", max);

        // loop to replace number<max with 0 in newarr
        for (var j = 0; j < 5; j++) {
          for (var k = 0; k < 22; k++) {
            if (newarr[j][k] !== max) {
              newarr[j][k] = 0;
            }
          }
        }

        //loop to replace max with 1 in newarr
        for (var j = 0; j < 5; j++) {
          for (var k = 0; k < 22; k++) {
            if (newarr[j][k] === max) {
              newarr[j][k] = 1;
            }
          }
        }
      }

      res.status(200).json({
        message: "Success",
        numberOfTimetablesCompared: numTimetables,
        commonFreeSlots: newarr,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
});

//Get users according to free slots
router.get("/range", (req, res, next) => {
  let { offsets, day, teamId } = req.query;

  //day can be from 0 to 4
  //offsets can be from 0 to 21

  UserSlot.find({ teamId })
    .then((users) => {
      let freeUsers = [];
      let dayObj = {};
      for (let u of users) {
        //save timetable for given day in dayobj
        dayObj["day"] = u.timetable[day];

        // loop through offset and check if corresponding numbers
        // are 1 or not. if yes, push in freeUsers array

        var i;
        var flag = false;
        for (i = 0; i < 22; i++) {
          if (offsets[i] == 1 && dayObj.day[i] != offsets[i]) {
            flag = true;
            break;
          }
        }
        if (!flag) {
          freeUsers.push({ _id: u._id, memberName: u.memberName });
        }
      }
      res.status(200).json({
        count: freeUsers.length,
        freeUsers: freeUsers,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.toString(),
      });
    });
});

module.exports = router;
