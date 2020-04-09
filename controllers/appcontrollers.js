const router = require("express").Router();
const UserSlots = require('../model/UserSlots');

router.get("/users/:search", (req, res, next) => {
    let search = req.params.search.toLowerCase();
    let reg = new RegExp(search)
    UserSlots.find({name: {$regex: reg}})
    .then(user => {
        res.json(user)
    }).catch(err => {
        res.json({err})
    })
})

router.post("/users/range", (req, res, next) => {
    let offsets = req.body.offsets // 0 to 21
    let day = req.body.day // 0 to 4
    // console.log(day)

    /*
    [[0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0], 
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1], 
    [1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0], 
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0], 
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1]]' 
    */
    UserSlots.find({})
    .then(users => {
        let freeUsers = []
        let dayObj = {}
        for(let u of users) {
            u.timetable = JSON.parse(u.timetable)
            dayObj["day"] = u.timetable[day]

            // loop through offset and check if corresponding numbers
            // are 1 or not. if yes, push in freeUsers array

            var i;
            var flag = false;
            for (i = 0; i < 22; i++) {
                // console.log(dayObj.day[i])
                // console.log(offsets[i])

                if(offsets[i]==1 && dayObj.day[i]!=offsets[i]){
                    flag=true
                    break;

                }
            }
            if(!flag){
                freeUsers.push(u.name)
            }

        }
        res.json({freeUsers})
    }).catch(err => {
        res.json(err)
    })
})

module.exports = router