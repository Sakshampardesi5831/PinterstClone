var express = require('express');
var router = express.Router();
var userModel=require("./users");
const passport=require("passport");
var config=require("../config/config");
var pinCreated=require("./pinCreated");
var myboard=require("./boardPost");
const LocalStrategy=require("passport-local");
var mongoose=require("mongoose");
passport.use(new LocalStrategy(userModel.authenticate()));
/*-----------------------------------------------------------------------------------*/
const mongooseURI="mongodb://localhost/pinDb";
const conn = mongoose.createConnection(mongooseURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
let gfs;
conn.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "pin",
  });
});
/*------------------------------------------------------------------------------------*/

router.get('/',redirectToProfile ,function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get("/post", isLoggedIn,async function(req,res,next){
  let user=await userModel.findOne({username:req.session.passport.user});
  var allpost=await pinCreated.find();
    console.log(allpost);
    res.render("post",{post:allpost,user:user});
});
router.get("/saveBoard/:id",isLoggedIn, async  function(req,res){
    let user= await userModel.findOne({username:req.session.passport.user}).populate("myboard");
    let pin=await pinCreated.findOne({_id:req.params.id});
    res.render("postDetail",{pin:pin,user:user});
})
router.get("/login",function(req,res){
    res.redirect("/");
})
router.post("/register",function(req,res){
  var userdata=new userModel({
     username:req.body.username,
     email:req.body.email,
     age:req.body.age,
     address:req.body.address,
     gender:req.body.gender,
     contactNumber:req.body.contactnumber
  })
  userModel.register(userdata,req.body.password).then(function(u){
     console.log(u);
     passport.authenticate("local")(req,res,function(){
         res.redirect("/post");
     });
  });
});
router.post("/login",passport.authenticate("local",{
   successRedirect:"/post",
   failureRedirect:"/"
}),function(req,res){});
router.get("/logout", function (req, res) {
   req.logout(function (err) {
     if (err) { return next(err); }
     res.redirect('/');
   });
 });
router.get("/updateProfile",isLoggedIn, async function(req,res){
    let user=await userModel.findOne({username:req.session.passport.user});
    res.render("profileUpdate",{user:user});
});
router.post("/updateProfile",isLoggedIn,config.single("pic"),async function(req,res){
   let user= await userModel.findOne({username:req.session.passport.user});
  let updatedData={
      name:req.body.name,
      username:req.body.username,
      address:req.body.address,
      gender:req.body.gender,
      contactNumber:req.body.contactnumber,
      profilePic:req.file.filename
  }
  let updatedUser= await userModel.findOneAndUpdate(user,updatedData);
  console.log(updatedUser);
  res.redirect("/post");
});
router.get("/createPin",isLoggedIn, async function(req,res){
    let user= await userModel.findOne({username:req.session.passport.user});
    res.render("createPin",{user:user});
});
router.post("/upload",isLoggedIn,config.single("image"),async function(req,res){
  let user=await userModel.findOne({username:req.session.passport.user});
  let data={
     postUser:user._id,
     pinTitle:req.body.title,
     desc:req.body.desc,
     pinImage:req.file.filename,
  }
  const post= await pinCreated.create(data);
  console.log(post);
  user.post.push(post._id);
  user.save();
  res.redirect("/post");
});
router.get("/image/:filename", (req, res) => {
  const file = gfs
    .find({
      filename: req.params.filename,
    })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist",
        });
      }
      gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    });
  // console.log(file);
});
router.get("/savePost/:id",isLoggedIn, async function(req,res){
  let user= await userModel.findOne({username:req.session.passport.user});
  let post=await pinCreated.findOne({_id:req.params.id});
  if(user.mysave.indexOf(req.params.id)===-1){
    user.mysave.push(post._id);
  }else{
    user.mysave.splice(user.mysave.indexOf(req.params.id),1);
  }
 let saveuser= await user.save();
  console.log(saveuser);
  res.redirect("/post");
    /*const _id=mongoose.Types.ObjectId(req.params.id);
    let cursor=gfs.find({_id});
    let metadata= await cursor.toArray();
    const data={
      postOwner:user._id,
      images:metadata.map((elem)=>elem.filename)
    }
    const post=await owner.create(data);
    console.log(post);
    console.log(mongoose.Types.ObjectId(post._id));
    user.post.push(mongoose.Types.ObjectId(post._id));
    user.save();
    console.log(user);
    res.redirect("/post");*/
     
});
router.get("/mysave",isLoggedIn, async function(req,res){
   let user=await userModel.findOne({username:req.session.passport.user}).populate("mysave");
    console.log(user);
    res.render("save",{user:user});
});
router.post("/myBoard",isLoggedIn, async function(req,res){
    let user=await userModel.findOne({username:req.session.passport.user});
    let data={
      boardUser:user._id,
      boardTitle:req.body.boardTitle
    }
    let boardCreated=await myboard.create(data);
    user.myboard.push(boardCreated._id);
    user.save();
    res.redirect("/post");
});
router.get("/myBoard",isLoggedIn, async function(req,res){
     let user=await userModel.findOne({username:req.session.passport.user}).populate("myboard");
     res.render("boardPost",{user:user});
});
router.get("/boardpics/:id/",isLoggedIn, async function(req,res){
   let user=await userModel.findOne({username:req.session.passport.user}).populate("myboard");
   let post=await pinCreated.findOne({_id:req.params.id});
   let board=await myboard.findOne({boardTitle:req.query.boardname});
   console.log(user);
   console.log(board);
  //  board.postDetail.push(post._id);
  board.postDetail.push(req.params.id);
   board.save();
   res.redirect("/myBoard");
});
router.get("/viewAllBoardPics/:board",isLoggedIn, async function(req,res){
  console.log(req.params.board);
  let user=await userModel.findOne({username:req.session.passport.user});
  let pinBoard=await myboard.findOne({boardTitle:req.params.board}).populate("postDetail");
  console.log(pinBoard);
  res.render("viewAllBoardPics",{pinBoard:pinBoard});
});
// router.get("/viewAllBoardDel/:id",isLoggedIn,async function(req,res){
//   // let user= await userModel.findOne({username:req.session.passport.user});
//   // user.myboard.splice(req.params.id,1);
//   // user.save();
//   // res.redirect("/viewAllBoardPics");
//   res.send("true");
// })
router.get("/profile-section",isLoggedIn, async function(req,res){
  let user= await userModel.findOne({username:req.session.passport.user}).populate("myboard");
  res.render("profile",{user:user});
})
/*-----------------------------------------------------------------------------------*/
 function isLoggedIn(req, res, next) {
   if (req.isAuthenticated()) {
     return next();
   }
   else {
     res.redirect("/");
   }
 };
 function redirectToProfile(req,res,next){
  if(req.isAuthenticated()){
     res.redirect("/post");
  }else{
     return next();
  }
}
module.exports = router;
