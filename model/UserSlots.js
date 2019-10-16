const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  
  timetable: {
    type: Object,
    required: true
  }
});

const UserSlots = mongoose.model('UserSlot', UserSchema);

module.exports = UserSlots;

// module.exports.create = function(args){
//     return UserSlots.create(args)
// }
