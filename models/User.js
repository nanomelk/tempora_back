const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },
   created_at: {
      type: Date,
      default: Date.now,
   },
   habilities: { 
      type: [String], 
      default: ['user'] }
});

module.exports = mongoose.model('User', UserSchema);
