'use strict'
let btnSignUp = document.getElementById('signup');
let elements = document.getElementById("signUpForm").elements;
const PASSWORD = document.getElementById("newPassword").elements;
const CONFIRM$PASSWORD = document.getElementById("newPassword").elements;
 



 function User(name,password,email,arrUserQuizzes=[]) {
    this.arrUserQuizzes = arrUserQuizzes;
    this.name = name;
    this.password = password;
    this.email = email;
    User.all.push(this);
    }
    User.all=[];
    
    let user = new User;


    btnSignUp.addEventListener('click',getherUserInformation);
    
    User.prototype.getherUserInformation = function(event){
      event.preventDefault();
      debugger;
      let error = document.getElementById('error');
      let newUserName = document.getElementById('newUserName');
      let newEmail = document.getElementById('newEmail');
      if (PASSWORD !== CONFIRM$PASSWORD) {
         error.textContent = "The password doesn't match";
         return;
      }
      else {
         for (let i = 0; i < User.all.length; i++) {
           
            if (newUserName.value === User.all[i].name) {
               error.textContent = "The username is taken";
               return;
               
            }

           else if (newEmail.textContent === User.all[i].email) {
               error.textContent = "The email is used before";
               return;
            }
         }
      }

      alert('you can reach here');
   

    }