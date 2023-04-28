const mongoose = require("mongoose");
var plm= require("passport-local-mongoose");

mongoose.set("strictQuery",true);

/*mongoose.connect("mongodb://localhost/pinDb")
.then(function(){
  console.log("Connected to db")
})*/
mongoose.connect("mongodb+srv://sakshampardeshi6610:NVJBe5qcK4VWNMbj@cluster0.bgpdm0a.mongodb.net/pindb?retryWrites=true&w=majority").then(function(){
  console.log("Connected to db");
})

const userSchema= mongoose.Schema({
  username:String,
  name:String,
  email:String,
  age:String,
  password:String,
  address:String,
  gender:String,
  profilePic:String,
  contactNumber:String,
  post:[{
     type:mongoose.Schema.Types.ObjectId,
     ref:"pinCreated"
  }],
  mysave:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"pinCreated"
  }],
  myboard:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"pinBoard"
  }]
  
})

userSchema.plugin(plm);

module.exports=mongoose.model("user", userSchema)