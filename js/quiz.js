const arrQuiz = JSON.parse(localStorage.getItem("quizArray") || "[]");
let quizSection = document.getElementById('quiz');
let buttonEl = document.createElement("button");
let liEl = document.createElement('li');
let olEl = document.createElement('ol');
let arrAnswers = ['','','','',''];
let points = 0;
let arrOrder = ['a-','b-','c-','d-'];
const Q$NUMBER = 4;
// show quiz question on the page
function generateQuizQuestion(){

let h3El = document.createElement('h3');
let hrEl = document.createElement('hr');

for (let i = 0; i < arrQuiz.arrSimpleMathQuestions.length; i++) {
    h3El = document.createElement('h3');
    quizSection.appendChild(h3El);
    h3El.textContent =i+1 + '- '+ arrQuiz.arrSimpleMathQuestions[i];
    olEl = document.createElement('ol');
    olEl.id = i;
        quizSection.appendChild(olEl);
        hrEl = document.createElement('hr');
        olEl.appendChild(hrEl);
        let start = 0;
        let end =0;
        start = i*Q$NUMBER;
        end = start+Q$NUMBER;
        let countOrder = 0;
    for (let y = start; y < end; y++) {

        liEl = document.createElement('li');
        olEl.appendChild(liEl);
        liEl.textContent =arrQuiz.arrSimpleMathChoices[y];
        liEl.style.backgroundColor = 'whitesmoke';
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
 debugger;
    event.target.style.backgroundColor = "#b7cad0";
    let currentUl =  event.target.parentNode;
    let allLi = currentUl.children;
    for (let i = 0; i < allLi.length; i++) {
  
    if (allLi[i].className === 'selected') {
        allLi[i].classList.remove("selected");
        allLi[i].style.backgroundColor = "whitesmoke";
        break;
        
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

    let rightAnswer = quizSection.querySelectorAll("li");
    let selectedAnswer = quizSection.querySelectorAll(".selected");
 for (let i = 0; i <arrQuiz.arrSimpleAnswers.length; i++) {
    let start = 0;
    let end =0;
        start = i*Q$NUMBER;
        end = start+Q$NUMBER;
for (let y = start; y < end; y++) {
    if (rightAnswer[y].textContent === arrQuiz.arrSimpleAnswers[i]) {
        console.log(rightAnswer[y]);
    rightAnswer[y].style.border = '3px solid limegreen';
    rightAnswer[y].style.color = 'limegreen';
    rightAnswer[y].style.backgroundColor = 'rgba(215, 248, 215, 0.787)';
    

    if (selectedAnswer[i] === undefined || selectedAnswer[i].textContent !== arrQuiz.arrSimpleAnswers[i]) {
        if ( selectedAnswer[i] !== undefined) {
            selectedAnswer[i].style.border = " 3px solid red";
            selectedAnswer[i].style.color = "red";
            selectedAnswer[i].style.backgroundColor = '#8b000038';
            
            
            
        }

    }
    else{
        points ++;
    }
}  
}
  }
  let pEl = document.createElement('p');
  quizSection.appendChild(pEl);
if (points >=3) {
    pEl.textContent = `good job ! you got ${points} out of 5`;
}
else {
    pEl.textContent = `hard luck ! you got ${points} out of 5`;
}
 
  buttonEl.disabled = true;
}