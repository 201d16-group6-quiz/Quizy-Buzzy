let btnSignUp = document.getElementById('signup');
let elements = document.getElementById("signUpForm").elements;
const PASSWORD = document.getElementById("newPassword").elements;
const CONFIRM$PASSWORD = document.getElementById("newPassword").elements;
 



 function User(name,password,email,userQuizzes=[]) {
    this.questionsArr = questionsArr;
    this.choicesArr = choicesArr;
    this.answersArr = answersArr;
    User.all.push(this);
    }
    User.all=[];
    
    let quiz = new Quiz


    btnSignUp.addEventListener('click',getherUserInformation);
    
    User.prototype.getherUserInformation = function(event){
      event.preventDefault();
      debugger;
      let error = document.getElementById('error');
      let newUserName = document.getElementById('newUserName');
      let newEmail = document.getElementById('newEmail');
      if (PASSWORD !== CONFIRM$PASSWORD) {
         error.textContent = "The password doesn't match";
         break;
      }
      else {
         for (let i = 0; i < User.all.length; i++) {
           
            if (newUserName.value === User.all[i].name) {
               error.textContent = "The username is taken";
               break;
               
            }

           else if (newEmail.textContent === User.all[i].email) {
               error.textContent = "The email is used before";
               break;
            }
         }
      }

      alert('you can reach here');
   

    }