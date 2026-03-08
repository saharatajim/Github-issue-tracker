
const button=document.getElementById('loginBtn').addEventListener("click",()=>{
let inputPassword=document.getElementById("inputPassword")
let password=inputPassword.value
let inputUsername=document.getElementById
("inputUsername")
let username=inputUsername.value
    console.log(username,password)

    if(username==="admin"&&password==="admin123"){
        window.location.assign("home.html")
    }
    else{
        alert("Try again")
    }   
})