let dialogBox=document.getElementById("dialog-box");
let sideNav=document.getElementById("side-nav");
let downArrow=document.getElementById("down-arrow");
document.querySelector("#create-section").addEventListener("click",function(){
    dialogBox.style.opacity=1;
})
document.querySelector("#close").addEventListener("click",function(){
    dialogBox.style.opacity=0;
})
downArrow.addEventListener("click",function(){
    sideNav.style.opacity=1;
})
document.querySelector("#side-nav>#close").addEventListener("click",function(){
    sideNav.style.opacity=0
})