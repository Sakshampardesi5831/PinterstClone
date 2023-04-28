var mongoose=require("mongoose");
var boardPost=mongoose.Schema({
    boardUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    boardTitle:String,
    postDetail:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"pinCreated"
    }]
});
module.exports=mongoose.model("pinBoard",boardPost);