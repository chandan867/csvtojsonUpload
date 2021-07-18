var mongoose = require('mongoose');
 
var questSchema = mongoose.Schema
({
  serialNumber:{
       type:String,
       required:true,
   },
   Question:{
       type:String,
       required:true,

   },
   OptionA:{
       type:String,
       required:true,
   },
   OptionB:{
       type:String,
       required:true,
   },
   OptionC:{
       type:String,
       required:true,
   }

    
});
 
var question = mongoose.model('question', questSchema);
 
module.exports = question;

///////////////////
