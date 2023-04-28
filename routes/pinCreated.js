var mongoose=require("mongoose");
var pinCreated=mongoose.Schema({
    postUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    pinTitle:String,
    desc:String,
    pinImage:String,
})
module.exports=mongoose.model("pinCreated",pinCreated);