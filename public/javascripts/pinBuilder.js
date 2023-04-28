/*const defaultBtn=document.getElementById("default-btn");
const customBtn=document.getElementById("custom-btn");
const wrapper=document.querySelector(".wrapper");
const cancelBtn=document.getElementById("close");
let regix=/[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;
let img=document.querySelector("img");
function defaultBtnActive(){
    defaultBtn.click();
}

defaultBtn.addEventListener("change",function(){
    const file=this.files[0];
    if(file){
        const reader=new FileReader();
        reader.onload=function(){
            const result=reader.result;
            img.src=result;
            wrapper.classList.add("active");
        }
        cancelBtn.addEventListener("click",function(){
            img.src="";
            wrapper.classList.remove("active");
        })
        reader.readAsDataURL(file);
    }
    if(this.value){
        let StoreValue=this.value.match(regix);
        filename.textContent=StoreValue;
    }
})*/