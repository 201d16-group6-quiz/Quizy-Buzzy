let arrQuiz = JSON.parse(localStorage.getItem("quizArray") || "[]");
let quizSection = document.getElementById('quiz');
let buttonEl = document.createElement("button");
let liEl = document.createElement('li');
let olEl = document.createElement('ol');
let arrAnswers = ['','','','',''];
let points = 0;
let players =0;
let arrOrder = ['a-','b-','c-','d-'];
let noOfChoicesArr = [4,4,4,4,4];
let Q$NUMBER = 5;
let quizID = JSON.parse(localStorage['quizID']);
//get the question number
if(localStorage['quiz'] && quizID ===30 ){
    let quizObject = JSON.parse(localStorage['quiz']);
    Q$NUMBER = quizObject.arrSimpleMathQuestions.length;
    noOfChoicesArr = quizObject.noOfChoicesArray;
    arrQuiz = quizObject;
}




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
        let noOfChoices = noOfChoicesArr[i] ;


    for (let y = 0; y < noOfChoices; y++) {

        liEl = document.createElement('li');
        olEl.appendChild(liEl);
        liEl.textContent =arrQuiz.arrSimpleMathChoices[y];
        liEl.style.backgroundColor = 'whitesmoke';
        liEl.id = y;        
    }
    arrQuiz.arrSimpleMathChoices.splice(0,noOfChoices);



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
    let start = 0;
    let end =0;
    let noOfChoices = 0;
 for (let i = 0; i <arrQuiz.arrSimpleAnswers.length; i++) {

        start = i*noOfChoices;
         noOfChoices = noOfChoicesArr[i] ;
        end = start+noOfChoices; 

for (let y = start; y < end; y++) {
    console.log(rightAnswer[y]);
    console.log(arrQuiz.arrSimpleAnswers[i]);

    if (rightAnswer[y] && rightAnswer[y].textContent == arrQuiz.arrSimpleAnswers[i]) {
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

//

}

  let pEl = document.createElement('p');
  quizSection.appendChild(pEl);
if (points >=3) {
    pEl.textContent = `good job ! you got ${points} out of ${Q$NUMBER}`;
}
else {
    pEl.textContent = `hard luck ! you got ${points} out of ${Q$NUMBER}`;
}
 players ++;
  buttonEl.disabled = true;

}

