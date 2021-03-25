
const quizSection = document.getElementById('createQuiz');
const FORM = document.getElementById('quizForm');
let questionContainer = document.createElement('div');
let choiceBtnsContainer = document.createElement('div');
let INPUT= document.createElement('input');
let brk = document.createElement('br');
let ulEl = document.createElement('ul');
let liEl = document.createElement('li');
let noOFChoices =2;
let counter=0;
let arrCategory = ['math','science','programming','fun','languages','geography']; //edit later

function Quiz(category='',arrSimpleMathQuestions=[],arrSimpleMathChoices=[],arrSimpleAnswers=[],noOfChoicesArray=[]) {
this.category = category;
this.id=30;
this.name='New user Quiz';
this.arrSimpleMathQuestions = arrSimpleMathQuestions;
this.arrSimpleMathChoices = arrSimpleMathChoices;
this.arrSimpleAnswers = arrSimpleAnswers;
this.noOfChoicesArray = noOfChoicesArray;
Quiz.all.push(this);
}
Quiz.all=[];

let quiz = new Quiz



Quiz.prototype.generateQuestionfield = function (){

    createNewQuestion();
 
    //create a button to add a new question
    addQuestionBtn = document.createElement('button');
    quizSection.appendChild(addQuestionBtn);
    addQuestionBtn.textContent='+ new Question';
    addQuestionBtn.type='button';

    addQuestionBtn.addEventListener('click',createNewQuestion);
    //FORM.addEventListener('click',removeQuestion); 

}

// generate choices inputs
Quiz.prototype.addChoice = function (ulEl,idOfQ){

    let i;
    console.log(ulEl)
    if(ulEl.childNodes){ //if it has childs
     i = ulEl.childNodes.length; //take the length of those childs to continue counting the number of choices
    }else{
        i = 0;
    }
    if(i<10){
    liEl = document.createElement('li');
    ulEl.appendChild(liEl);

    //new input 
    INPUT= document.createElement('input');
    liEl.appendChild(INPUT);
    // input type radio to specify the right answer
    INPUT.type='radio';
    INPUT.className=`${idOfQ}Inpt${i}`;
    INPUT.name=`radioOf${idOfQ}`;
    INPUT.setAttribute('required','');

    //new choice input 
    INPUT= document.createElement('input');
    liEl.appendChild(INPUT);
    INPUT.placeholder=`choice ${i+1}`;
    INPUT.className=`${idOfQ}Inpt${i}`;
    }else{
        alert('no more than 10 options')
    }
    
}

Quiz.prototype.removeChoice = function (ulEl){

    if(ulEl.childNodes.length>2){
        ulEl.lastElementChild.remove();      
        noOFChoices--;
    }
}

// holds a button that creates a new question when clicked, it is called by the object method generatefields
// each time to update the position of the button
function createNewQuestion(){
    counter++;

        //create the question and choices container
        questionContainer = document.createElement('div');
        FORM.appendChild(questionContainer);
        questionContainer.className='newQuestion';
        questionContainer.id=`question${counter}`;

        //the next question takes the previous question's number of choices, and if it is the first one the default would be two 
        if( questionContainer.previousElementSibling && questionContainer.previousElementSibling.childNodes.length){
            noOFChoices = questionContainer.previousElementSibling.querySelector('ul').childNodes.length;
            }else{
                noOFChoices = 2;
            } 
    
        //create question input field
        INPUT= document.createElement('input');
        questionContainer.appendChild(INPUT);
        INPUT.placeholder='your question';
    
        // creates a break between the questions and the fields
        brk = document.createElement('br');
        questionContainer.appendChild(brk);

        ulEl = document.createElement('ul');
        questionContainer.appendChild(ulEl);
    // create two choices by default
    for(let i=0; i<noOFChoices; i++){  
        quiz.addChoice(ulEl,questionContainer.id);
        }

    //create a container for the addChoiceBtn and removeChoiceBtn
    choiceBtnsContainer = document.createElement('div');
    questionContainer.appendChild(choiceBtnsContainer);
    choiceBtnsContainer.id=`choiceBtnsContainer`;

    //create button to add a single choice field
    addChoiceBtn = document.createElement('button');
    choiceBtnsContainer.appendChild(addChoiceBtn);
    addChoiceBtn.textContent='+';
    addChoiceBtn.type='button';

    //creates a button to remove a single choice field
    removeChoiceBtn = document.createElement('button');
    choiceBtnsContainer.appendChild(removeChoiceBtn);
    removeChoiceBtn.textContent='-';
    removeChoiceBtn.type='button'

    //onclick calls addchoice function to add a choice field
    addChoiceBtn.onclick = function(event){
        let parentQId =  event.target.parentElement.parentElement.id;
        let parentQ = document.getElementById(parentQId);
        ulEl = parentQ.querySelector('ul');
        quiz.addChoice(ulEl,parentQId);
        noOFChoices++;

        console.log(event.target.parentElement.parentElement.id);
    }

    //onclick calls addchoice function to add a choice field
    removeChoiceBtn.onclick = function(event){    
        let parentQId =  event.target.parentElement.parentElement.id;
        let parentQ = document.getElementById(parentQId); 
        ulEl = parentQ.querySelector('ul');
        quiz.removeChoice(ulEl);
    }

    let dragBtn = document.createElement('img');
    questionContainer.appendChild(dragBtn);
    dragBtn.src='../img/drag.png';
    dragBtn.id='dragBtn';
    dragBtn.draggable='true';


    makeDraggable(dragBtn,questionContainer);

    let removeQuestionbutton = document.createElement('button');
    questionContainer.appendChild(removeQuestionbutton);
    removeQuestionbutton.textContent='x';
    removeQuestionbutton.id='removeQuestionbutton';
    removeQuestionbutton.type='button'
    removeQuestionbutton.onclick = function(event){
        removeQuestion(event.target.parentElement.id);
    }

    

}

function removeQuestion(qId){
    if(qId !== FORM.querySelector('div').id ){ //if it is not the first question
    document.getElementById(qId).remove();
    }
}

//event listener on the create quiz input 
FORM.addEventListener('submit',formValidate)
// takes the values from the form and push them to the quiz object array
 function getValuesandCreateQuiz(){
    updateCategorySelection();
    let qList= FORM.querySelectorAll('.newQuestion')
    
    // question value
    for(let i=0; i<qList.length; i++){
        const CURRENTQUESTION= qList[i];
        quiz.arrSimpleMathQuestions.push(CURRENTQUESTION.firstChild.value);
        console.log(quiz.arrSimpleMathQuestions)
    let choiceList= CURRENTQUESTION.querySelector('ul').childNodes;  //li elements as choices
        for(let j=0;j<choiceList.length;j++) {
            // the input choice is the last of each li element
            quiz.arrSimpleMathChoices.push(choiceList[j].lastElementChild.value);
            console.log(quiz.arrSimpleMathChoices);
            if(choiceList[j].firstChild.checked){ // the input radio is the first of each li element
                quiz.arrSimpleAnswers.push(choiceList[j].lastElementChild.value);  
                console.log(quiz.arrSimpleAnswers)              
            }
        
    }
    }    
            saveToLocalStorage();
            FORM.reset(); 
}

const SELECT = document.createElement('select');
const LABEL = document.createElement('Label');

//rendering the select category and its options
function chooseCategory (){
    SELECT.id='select';
    SELECT.setAttribute('required','');
    quizSection.appendChild(LABEL);
    LABEL.for='select';
    LABEL.textContent='Category: '
    quizSection.appendChild(SELECT);
    let option = document.createElement('option');
    option.value='none';
    option.setAttribute('selected','');
    option.setAttribute('disabled','');
    option.setAttribute('hidden','');
    option.textContent='Select a Category';
    SELECT.appendChild(option);
    for (let i = 0; i < arrCategory.length; i++) {
         option = document.createElement('option');
        SELECT.appendChild(option);
        option.textContent=option.value = arrCategory[i];
    }
}

function updateCategorySelection(){
    quiz.category=SELECT.value;
    let allQ = FORM.querySelectorAll('.newQuestion')
    for(let i=0;i<allQ.length;i++){
        quiz.noOfChoicesArray.push(allQ[i].querySelector('ul').childNodes.length);
    }
console.log(quiz.noOfChoicesArray);
}

 function formValidate(event){
    event.preventDefault();
    let success = true;
     let allInputs = document.querySelectorAll('input');
     console.log(allInputs);
     for(let i=0; i<allInputs.length;i++){
         if(allInputs[i].type != 'submit'){  
         if(allInputs[i].value){
                if(allInputs[i].style.backgroundColor){
                    allInputs[i].style.backgroundColor='';
                }
            }else{
                allInputs[i].style.setProperty('background-color','rgba(255, 0, 0, 0.479)');
                success = false;
                
            }

        }
     }
     
     if(SELECT.value ==='none'){
        SELECT.style.backgroundColor='rgba(255, 0, 0, 0.479)';
     }
     
     if(success && SELECT.value !=='none'){
            getValuesandCreateQuiz();
        }
     
}

function saveToLocalStorage(){

    localStorage.setItem('id',quiz.category);
    localStorage.setItem('quizID',quiz.id);
    
    localStorage.setItem('quiz',JSON.stringify(quiz));

    goToQuizesPage();
}


//go to a page to see his quiz
function goToQuizesPage(){
    window.location="../category.html";

} 

 

chooseCategory();
quiz.generateQuestionfield();



//-----------------------------------episode two: draggable form ----------------------------------------

function makeDraggable(dragBtn,questionContainer){
        
        dragBtn.addEventListener('dragstart', dragStart);
        dragBtn.addEventListener('dragend', dragend);
    
        questionContainer.addEventListener('dragenter', dragEnter);
        questionContainer.addEventListener('dragleave', dragLeave);
        questionContainer.addEventListener('dragover', dragOver);
        questionContainer.addEventListener('drop', drop);
        
        function dragStart(e) {
            console.log('drag starts...',e.target.parentElement.id);
            e.dataTransfer.setData('text/plain', e.target.parentElement.id);
            
        
            setTimeout(() => {
                e.target.parentElement.classList.add('partiallyHide');
            }, 0);
        }
    
        function dragend(e){
            //display the draggable element again
            e.target.parentElement.classList.remove('partiallyHide');
            console.log('drag end...',e.target)
    
        }
        
        
        function dragEnter(e) {
            e.preventDefault();
            e.currentTarget.classList.add('drag-over');
            console.log('drag enter...',e.target)
    
        }
        
        function dragOver(e) {
            e.preventDefault();
            e.currentTarget.classList.add('drag-over');
            console.log('drag over...')
        }
        
        function dragLeave(e) {
            e.currentTarget.classList.remove('drag-over');
            console.log('drag leave...')
    
        }
        
        function drop(e) {
            e.currentTarget.classList.remove('drag-over');
            console.log('drop...')
    
            // get the draggable element
            const id = e.dataTransfer.getData('text/plain');
            const draggable = document.getElementById(id);
    
            // add it to the drop target
            e.currentTarget.insertAdjacentElement("afterend", draggable);

            console.log('target..',e.target,'currentTarget',e.currentTarget);
        
        }

}