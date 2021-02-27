const arrQuiz = JSON.parse(localStorage.getItem("quizArray") || "[]");
let quizSection = document.getElementById('quiz');
let buttonEl = document.createElement("button");
let liEl = document.createElement('li');
let olEl = document.createElement('ol');
let arrAnswers = ['','','','',''];
let points = 0;


// show quiz question on the page
function generateQuizQuestion(){

let h3El = document.createElement('h3');
for (let i = 0; i < arrQuiz.arrSimpleMathQuestions.length; i++) {
    h3El = document.createElement('h3');
    quizSection.appendChild(h3El);
    h3El.textContent =i+1 + '- '+ arrQuiz.arrSimpleMathQuestions[i];
    olEl = document.createElement('ol');
    olEl.id = i;
        quizSection.appendChild(olEl);
        let start = 0;
        let end =0;
        if (i === 0) {
            end = 4;
        }
        else{
            start = i*4;
            end = (i*4)+4;
        }
    for (let y = start; y < end; y++) {
        liEl = document.createElement('li');
        olEl.appendChild(liEl);
        liEl.textContent = arrQuiz.arrSimpleMathChoices[y];
        liEl.id = y;
        
    }
}
buttonEl = document.createElement('button');
buttonEl.textContent = 'submit';
quizSection.appendChild(buttonEl);

}
generateQuizQuestion();


// add class selected to the answer and add it to the user answers list
quizSection.addEventListener('click',addAnswer);

function addAnswer(event){
    if(event.target.tagName.toLowerCase() === 'li'){
    console.log(event.target);
 
    event.target.style.color = "#F00";
    let currentUl =  event.target.parentNode;
    let allLi = currentUl.children;
    for (let i = 0; i < allLi.length; i++) {
  
    if (allLi[i].className === 'selected') {
        allLi[i].classList.remove("selected");
        allLi[i].style.color = "black";
        
    }  
}
event.target.className = 'selected';
let newAnswer = event.target.textContent;
let index = parseInt(currentUl.id);

    arrAnswers[index] = newAnswer;

 console.log(arrAnswers);
    }

}


// showing results 
buttonEl.addEventListener("click",showResults) 
function showResults(){
debugger;
    let rightAnswer = quizSection.querySelectorAll("li");
    let selectedAnswer = quizSection.querySelectorAll(".selected");

 for (let i = 0; i <arrQuiz.arrSimpleAnswers.length; i++) {
    let start = 0;
    let end =0;
    if (i === 0) {
        end = 4;
    }
    else{
        start = i*4;
        end = (i*4)+4;
    }
for (let y = start; y < end; y++) {
    if (rightAnswer[y].textContent === arrQuiz.arrSimpleAnswers[i]) {
        console.log(rightAnswer[y]);
    rightAnswer[y].style.backgroundColor = "green";
    if (selectedAnswer[i].textContent !== arrQuiz.arrSimpleAnswers[i]) {
        selectedAnswer[i].style.backgroundColor = "red";
        rightAnswer[y].style.backgroundColor = "green";
        selectedAnswer[i].style.color = "black";
    }
    else{
        points ++;
    }
}  
}
  }
  let pEl = document.createElement('p');
  quizSection.appendChild(pEl);
  pEl.textContent = `good job ! you got ${points} out of 5`;
}