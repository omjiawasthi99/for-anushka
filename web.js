let btn =document.querySelector(".continue-btn");

btn.addEventListener("click",()=>{
   let email= document.querySelector('#email').value;
   if(email==='anushkaverma14032005@gmail.com'|| email==='Anushkaverma14032005@gmail.com'){
      alert("✅ Welcome Anushka❤️");
      window.location.href="annu.html";
   }else{
      alert("wrong email anushka ❤️");
   }
})