'use strict'
let btnSignUp = document.getElementById('signup');
let btnSignIn = document.getElementsByClassName('signin')[0];
// let elements = document.getElementById("signUpForm").elements;
let btnHome = document.getElementById("redirectToHome");
let h1SignIn = document.getElementsByClassName("h1Sign2")[0];
let h1SignUp = document.getElementsByClassName("h1Sign1")[0];
// let userName = localStorage.getItem('userName');
let btnShowSignIn = document.getElementById("signIn");
let btnShowSignUp = document.getElementById("signUp");
let passwordCheck = document.getElementById("password");
let emailCheck = document.getElementById("email");
let currentUser =[];
let wrongMessage = document.getElementById("message");
btnSignIn.addEventListener('click',signIn);

function signIn(event) {
   event.preventDefault();
   debugger;
   // let check = localStorage.getItem('userInfo');
   let correct = false;
for (let i = 0; i < User.all.length; i++) {
   
   if (emailCheck.value === User.all[i].email) {
      
      if (passwordCheck.value === User.all[i].password) {

         // currentUser.push(User.all[i].name);
         // currentUser.push(emailCheck.value);
         localStorage.setItem('currentUserId',i);
         correct = true;
         window.location = '../profile.html';
         break;
      }

   }

   if (correct === false) {

      wrongMessage.style.display = 'block';
      
   }


   
}
}



btnHome.addEventListener('click',redirectToHome);
let signUpCounter ;



h1SignUp.addEventListener('click',showSignUp);

function showSignUp(event) {
   
   btnShowSignIn.style.display = "none";
   btnShowSignUp.style.display ="block";

}


h1SignIn.addEventListener('click',showSignIn);

function showSignIn(event) {
   
  event.preventDefault();
  btnShowSignUp.style.display ="none";
  btnShowSignIn.style.display = "block";
  

}

// take the the previous number from localStorage 
function NoOfUsers() {
   if (localStorage.getItem("SignUpCounter") === null) {
      localStorage.setItem('SignUpCounter','0');
      signUpCounter = 0;
}
else{
   signUpCounter = localStorage.getItem("SignUpCounter");
   signUpCounter = parseInt(signUpCounter);
}
}

NoOfUsers();


function redirectToHome(event){
   event.preventDefault();
   window.location = "../index.html";
}



  class User {
   constructor(Id , name, password, email) {
      this.Id = Id;
      this.arrUserQuizzes = [];
      this.name = name;
      this.password = password;
      this.email = email;
      User.all.push(this);
   }
     getherUserInformation() {
      
     
      let error = document.getElementById('error');
      let newUserName = document.getElementById('newUserName');
      let newEmail = document.getElementById('newEmail');
      const PASSWORD = document.getElementById("newPassword");
      const CONFIRM$PASSWORD = document.getElementById("confirmPassword");
      let hidden = document.getElementById('hide');
      let showing = document.getElementById('show');
      if (PASSWORD.value !== CONFIRM$PASSWORD.value) {
         error.textContent = "The password doesn't match";
         return;
      }
      else {
         for (let i = 0; i < User.all.length; i++) {

            if (newUserName.value === User.all[i].name) {
               error.textContent = "The username is taken";
               return;

            }


            else if (newEmail.value === User.all[i].email) {
               error.textContent = "The email is used before";
               return;
            }
         }
      }

      user.name = newUserName.value;
      user.Id = signUpCounter;
      user.password = PASSWORD.value;
      user.email = newEmail.value;
      console.log(user.all);
      User.all.push(user);
      signUpCounter += 1;
      localStorage.setItem('SignUpCounter', signUpCounter);
      localStorage.setItem('userInfo',JSON.stringify(User.all));
      hidden.style.display = 'none';
      showing.style.display = 'block';

   }
}
   User.all=[];
    
   let user = new User;



    btnSignUp.addEventListener('click',handelEvent);
    

    function handelEvent(event){
      event.preventDefault();
      user.getherUserInformation();
    }

      function userInfo() {
      if (localStorage.getItem("userInfo") !== null) {
         User.all  = localStorage.getItem('userInfo');
         User.all = JSON.parse(User.all);
         return User.all;
      }
    }
    userInfo();
   
