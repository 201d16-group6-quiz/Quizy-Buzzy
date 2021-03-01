
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

function Quiz(category='',questionsArr=[],choicesArr=[],answersArr=[]) {
this.category = category;
this.questionsArr = questionsArr;
this.choicesArr = choicesArr;
this.answersArr = answersArr;
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

    addQuestionBtn.addEventListener('click',createNewQuestion);
    //FORM.addEventListener('click',removeQuestion); 

}

// generate choices inputs
Quiz.prototype.addChoice = function (ulEl){

    let i;
    console.log(ulEl)
    if(ulEl.childNodes){ //if it has childs
     i = ulEl.childNodes.length;
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
    INPUT.className=`Q${counter}inpt${i}`;//edit
    INPUT.name=`right${counter}`;

    //new choice input 
    INPUT= document.createElement('input');
    liEl.appendChild(INPUT);
    INPUT.placeholder=`choice ${i+1}`;
    INPUT.className=`Q${counter}inpt${i}`;
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
        //questionContainer.draggable='true'
    
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
        quiz.addChoice(ulEl);
        }

    //create a container for the addChoiceBtn and removeChoiceBtn
    choiceBtnsContainer = document.createElement('div');
    questionContainer.appendChild(choiceBtnsContainer);
    choiceBtnsContainer.id=`choiceBtnsContainer`;

    //create button to add a single choice field
    addChoiceBtn = document.createElement('button');
    choiceBtnsContainer.appendChild(addChoiceBtn);
    addChoiceBtn.textContent='+';

    //creates a button to remove a single choice field
    removeChoiceBtn = document.createElement('button');
    choiceBtnsContainer.appendChild(removeChoiceBtn);
    removeChoiceBtn.textContent='-';

    //onclick calls addchoice function to add a choice field
    addChoiceBtn.onclick = function(event){
        let parentQId =  event.target.parentElement.parentElement.id;
        let parentQ = document.getElementById(parentQId);
        ulEl = parentQ.querySelector('ul');
        quiz.addChoice(ulEl);
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

    let dragBtn = document.createElement('button');
    questionContainer.appendChild(dragBtn);
    dragBtn.textContent='drag';
    dragBtn.id='dragBtn';
    dragBtn.draggable='true';

    makeDraggable(dragBtn,questionContainer);

    let removeQuestionbutton = document.createElement('button');
    questionContainer.appendChild(removeQuestionbutton);
    dragBtn.textContent='x';
    dragBtn.id='removeQuestionbutton';
    removeQuestionbutton.onclick = function(event){
        removeQuestion(event.target.parentElement.id);
    }

    

}

function removeQuestion(qId){
    document.getElementById(qId).removeChild();

}

//event listener on the create quiz input 
document.getElementById('submit').addEventListener('submit',getValuesandCreateQuiz)
// takes the values from the form and push them to the quiz object array
function getValuesandCreateQuiz(event){
    console.log(event.target)
    updateCategorySelection();
    event.preventDefault();
    for(let i=0; i<counter; i++){
        const CURRENTQUESTION= FORM.getElementsByClassName('newQuestion')[i];
        quiz.questionsArr.push(CURRENTQUESTION.firstChild.value);

        for(let j=1;j<CURRENTQUESTION.childNodes.length;j++) {
           if(CURRENTQUESTION.childNodes[j].hasAttribute('placeholder')){
            quiz.choicesArr.push(CURRENTQUESTION.childNodes[j].value);
            if(CURRENTQUESTION.childNodes[j].previousSibling.getAttribute('type')=='radio' && CURRENTQUESTION.childNodes[j].previousSibling.checked){

                quiz.answersArr.push(CURRENTQUESTION.childNodes[j].value);                
            }
        }
    }
    }
    formValidate();
    saveToLocalStorage();
    FORM.reset();
}

const SELECT = document.createElement('select');
const LABEL = document.createElement('Label');

//rendering the select category and its options
function chooseCategory (){
    SELECT.id='select';
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
}

function formValidate(){
    
    let invalid = document.querySelector('input:invalid');

    invalid.style.setProperty('background-color',rgba(255, 0, 0, 0.479))
     
}

function saveToLocalStorage(){
    localStorage.setItem('questionsArr',JSON.stringify(quiz.questionsArr));
    localStorage.setItem('choicesArr',JSON.stringify(quiz.choicesArr));
    localStorage.setItem('answersArr',JSON.stringify(quiz.answersArr));
    localStorage.setItem('category',JSON.stringify(quiz.category));

    goToQuizesPage();
}

//go to a page to see his quiz
function goToQuizesPage(){
    window.location.href = "../quiz.html";

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
            e.target.classList.add('drag-over');
            console.log('drag enter...',e.target)
    
        }
        
        function dragOver(e) {
            e.preventDefault();
            e.target.classList.add('drag-over');
            console.log('drag over...')
        }
        
        function dragLeave(e) {
            e.target.classList.remove('drag-over');
            console.log('drag leave...')
    
        }
        
        function drop(e) {
            e.target.classList.remove('drag-over');
            console.log('drop...')
    
            // get the draggable element
            const id = e.dataTransfer.getData('text/plain');
            const draggable = document.getElementById(id);
    
            // add it to the drop target
            e.target.insertAdjacentElement("afterend", draggable);
        
        }

}