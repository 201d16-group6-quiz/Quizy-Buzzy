let arrCategory = ['math','science','programming','fun','languages','geography'];
let arrColors = ['red', 'blue','green','black','orange','yellow'];
let arrBackground = ['url(../img/math22.jpg)','url(../img/science.jpg)','url(../img/Programming6.jpeg)','url(../img/photo6.jpg', 'url(../img/languages.png)','url(../img/world-map.png'];
let root = document.querySelector(':root');
let table = document.getElementById('category');
table.className="tableCategory";
let quiz ;
let id = localStorage.getItem('id'); 



// this function will take the quiz ID and send the user to the quiz page
table.addEventListener('click',goToQuiz);
function goToQuiz(event){
 let quizID = event.target.id;
 let quizClass = event.target.className;
 localStorage.setItem("quizID",quizID);
 localStorage.setItem("quizClass",quizClass);
 localStorage.setItem("quizArray", JSON.stringify(arrObjectToArray[quizID]));
 window.location.href = "../quiz.html";
}

// take the arrays of questions and answers from Json file and assign them in variable "quiz"
function loadJSON(path, success, error)
{
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}
loadJSON('Quiz.json',
         function(data) { console.log(data); 
        quiz = data;
        
        },
         function(xhr) { console.error(xhr); }
);


//  give the category page css properties depending on type of quizzes
function setCssStyle(){

    for (let i = 0; i < arrCategory.length; i++) {
           if (id ===arrCategory[i]) { 

               root.style.setProperty('--color',arrColors[i]);
               root.style.setProperty('--background', arrBackground[i]);
               break;
           }
       }
   }
   setCssStyle();

//  insert all the quizzes objects in an array 
let arrObjectToArray = [];
let arrNewQuiz =[];
function makeQuizzesList(){
    debugger;
    for (let i = 0; i < quiz.length; i++) {
        arrObjectToArray.push(quiz[i]);
        
    }
}


// generate the quizzes category  from json file depending on the type user chose
function generateQuizzesTable(){
    makeQuizzesList(); 
    
    debugger;
for (let i = 0; i < arrCategory.length; i++) {
    if (arrCategory[i] === id) {
    let trEl = document.createElement('tr');
    let tdEl = document.createElement('td');
     for (let y = 0; y < quiz.length; y++) {
         if (arrObjectToArray[y].category === id) {
       trEl = document.createElement('tr');
       trEl.className="trCategory";
       table.appendChild(trEl);
       tdEl = document.createElement('td');
       trEl.appendChild(tdEl);
       tdEl.textContent = arrObjectToArray[y].name;
       tdEl.id= y;
       tdEl.className = arrObjectToArray[y].category;
      console.log(arrObjectToArray[y].name);
    }
    }
    break;
  
}
    }
    
 }

   
    //  work after the page load so the the json file function will work first and assign the value to "quiz"

    window.onload = function() { 
        setTimeout(function(){  generateQuizzesTable(); }, 500);

    };
