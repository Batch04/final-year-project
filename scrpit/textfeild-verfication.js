 let values = document.getElementById("email-type");
 let inputvalue;
 values.addEventListener("input" , () =>{
    inputvalue = values.value;
     let spantag = document.getElementById("email-span");
     if(!inputvalue){
        spantag.style.top="30%";
        spantag.style.left="3%";
    }
    else{
        spantag.style.top="-4%";
        spantag.style.left="5%";
    }
    
 })
 let password = document.getElementById("password-type");
 let passwordvalue;
password.addEventListener("input" , () =>{
    passwordvalue = password.value;
     let passwordspan = document.getElementById("password-span");
     if(!passwordvalue){
        passwordspan.style.top="30%";
        passwordspan.style.left="3%";
    }
    else{
        passwordspan.style.top="-4%";
        passwordspan.style.left="5%";
    }
    
 })
