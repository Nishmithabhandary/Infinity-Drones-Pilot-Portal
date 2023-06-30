
var mongoose = require('mongoose');
  
var imageSchema = new mongoose.Schema({
    name: String,
    email_id:String,
    mobile_no:String,
    dob: String,
    type_of_drone_experience:String,
    honors_and_achievements:String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});
  

  
module.exports = new mongoose.model('Image', imageSchema);