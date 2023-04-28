
let signup=document.getElementById("signup");
let login=document.getElementById("login");
let registerSection=document.getElementById("register");
let loginSection=document.getElementById("login-section");
var overlayer=document.getElementById("overlayer");

signup.addEventListener("click",function(){
    overlayer.style.display="initial";
    registerSection.style.opacity=1
    loginSection.style.display="none";
})
login.addEventListener("click",function(){
    overlayer.style.display="initial";
    registerSection.style.display="none";
    loginSection.style.opacity=1;
})
document.querySelector("#login-section>#close").addEventListener("click",function(){
    loginSection.style.opacity=0;
    overlayer.style.display="none";
})
document.querySelector("#register>#close").addEventListener("click",function(){
    registerSection.style.opacity=0;
    overlayer.style.display="none";
})

window.onscroll=function(){
    var top=window.scrollY;
    if(top>15){
        document.querySelector(".navigation").style.position="fixed"
        document.querySelector(".navigation").style.backgroundColor="#fff"
        document.querySelector(".nav a").style.color="#000";
    }else{
        document.querySelector(".navigation").style.backgroundColor="transparent"
    }
}
