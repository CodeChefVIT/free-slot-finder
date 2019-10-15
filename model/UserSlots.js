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

// module.exports = mongoose.models.User || mongoose.model('UserSlots', UserSchema);


const UserSlots = mongoose.model('UserSlot', UserSchema);

module.exports.create = function(args){
    return UserSlots.create(args)
}
//return model.create() UserSlots;
