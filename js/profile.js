let userName = document.getElementById('userName');
let email = document.getElementById('UserEmail');
let quizzesList = document.getElementById('quizzesList');
let allQuizzes= localStorage.getItem('allQuizzes');
let quizzesCounter =0;



function render() {
    
    let userInfo = localStorage.getItem('currentUserId');
    let user = localStorage.getItem('userInfo');
    user = JSON.parse(user);
    userInfo = parseInt(userInfo);
    console.log(userInfo);
  
    userName.textContent = user[userInfo].name;
    email.textContent = user[userInfo].email;
}
render();


function fillQuizzes() {
    allQuizzes = JSON.parse(allQuizzes);
    let div = document.createElement('div');
    let h3El = document.createElement('h3');
    let p = document.createElement('p');
    let pC = document.createElement('p');
    let divC = document.createElement('div');
    for (let i = 0; i < allQuizzes.length; i++) {
       if (allQuizzes[i].author  ===  userName.textContent ) {
        quizzesCounter++;
        div = document.createElement('div');
        div.className = 'column';
        quizzesList.appendChild(div);
        divC = document.createElement('div');
        divC.className = 'card';
        div.appendChild(divC);
        h3El = document.createElement('h3');
        h3El.textContent = 'Quiz Name';
        divC.appendChild(h3El);
        p = document.createElement('p');
        p.textContent = allQuizzes[i].name;
        divC.appendChild(p)
        h3El = document.createElement('h3');
        h3El.textContent = 'Category';
        divC.appendChild(h3El);
        pC = document.createElement('p');
        pC.textContent = allQuizzes[i].category;
        divC.appendChild(pC);

       }
        
    }



   }

   fillQuizzes()