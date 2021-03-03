
const quizSection = document.getElementById('createQuiz');
const FORM = document.getElementById('quizForm');
let questionContainer = document.createElement('div');
let noOFChoices =4;
let counter=0;
let arrCategory = ['math','science','programming','fun','languages','geography']; //edit later

function Quiz(category='',arrQuestions=[],arrChoices=[],arrAnswers=[], author ='',name='',id=0 ,players =0) {
this.category = category;
this.name = name;
this.arrQuestions = arrQuestions;
this.arrChoices = arrChoices;
this.arrAnswers = arrAnswers;
this.author= author;
this.id = id;
this.players = 0;
Quiz.all.push(this);
}

Quiz.all=[];

let quiz = new Quiz
//generate input fields and radio fields and assign a shared class for each corresponding input and radio field
Quiz.prototype.generatefields = function (){
    counter++;
    questionContainer = document.createElement('div');
    let brk = document.createElement('br');
    questionContainer.className='newQuestion'
    let INPUT= document.createElement('input');
    FORM.appendChild(questionContainer);
    INPUT.placeholder='Quiz Name';
    questionContainer.appendChild(INPUT);
    INPUT.style.display ='block';
    INPUT.style.width ='fit-content';
    INPUT.style.margin='0 auto';
    INPUT.style.paddingRight='23px';
    INPUT.setAttribute('required','');
    INPUT.id = 'QuizName';

    INPUT= document.createElement('input');
    questionContainer.appendChild(INPUT);
    questionContainer.appendChild(brk);

    
    INPUT.placeholder='your question';
    INPUT.style.paddingRight='23px';
    INPUT.setAttribute('required','');

    for(let i=0; i<noOFChoices; i++){   
        INPUT= document.createElement('input');
        questionContainer.appendChild(INPUT);
        INPUT.type='radio';
        INPUT.setAttribute('required','');
        INPUT.className=`Q${counter}inpt${i}`;
        INPUT.name=`right${counter}`
        INPUT= document.createElement('input');
        questionContainer.appendChild(INPUT);
        INPUT.placeholder=`choice ${i+1}`;
        INPUT.className=`Q${counter}inpt${i}`;
        INPUT.setAttribute('required','');
        brk = document.createElement('br');
        questionContainer.appendChild(brk);
    }

    createNewQuestion();
}

// holds a button that creates a new question when clicked, it is called by the object method generatefields
// each time to update the position of the button
function createNewQuestion(){
    const newQuestionbutton = document.createElement('button');
    questionContainer.appendChild(newQuestionbutton);
    newQuestionbutton.textContent='+';
    newQuestionbutton.onclick = function(){
        newQuestionbutton.remove();
        quiz.generatefields();
        }
}

//event listener on the create quiz input 
FORM.addEventListener('submit',getValuesandCreateQuiz)
// takes the values from the form and push them to the quiz object array
function getValuesandCreateQuiz(event){
    updateCategorySelection();
    event.preventDefault();

    for(let i=0; i<counter; i++){
        const CURRENTQUESTION= FORM.getElementsByClassName('newQuestion')[i];
        quiz.arrQuestions.push(CURRENTQUESTION.firstChild.value);

        for(let j=1;j<CURRENTQUESTION.childNodes.length;j++) {
           if(CURRENTQUESTION.childNodes[j].hasAttribute('placeholder')){
            quiz.arrChoices.push(CURRENTQUESTION.childNodes[j].value);
            if(CURRENTQUESTION.childNodes[j].previousSibling.getAttribute('type')=='radio' && CURRENTQUESTION.childNodes[j].previousSibling.checked){

                quiz.arrAnswers.push(CURRENTQUESTION.childNodes[j].value);                
            }
        }
    }
    }
    generateAutherAndName();
    generateId() ;
    FORM.reset();
   
}

const SELECT = document.createElement('select');

//rendering the select category and its options
function chooseCategory (){
    quizSection.appendChild(SELECT);
    for (let i = 0; i < arrCategory.length; i++) {
        let option = document.createElement('option');
        SELECT.appendChild(option);
        option.textContent=option.value = arrCategory[i];
    }
}

function updateCategorySelection(){
    quiz.category=SELECT.value;
}


 function generateAutherAndName() {
     debugger;
    let userInfo = localStorage.getItem('currentUserId');
    let user = localStorage.getItem('userInfo');
    user = JSON.parse(user);
    userInfo = parseInt(userInfo);
    console.log(userInfo);
   

    quiz.author = user[userInfo].name;
       quiz.name=  document.getElementById('QuizName').value;
   
}


function generateId()  {
    debugger;
    let allQuizzes = localStorage.getItem('allQuizzes');
    allQuizzes = JSON.parse(allQuizzes);
    quiz.id = parseInt(allQuizzes[allQuizzes.length-1].id +1);
    allQuizzes.push(Quiz.all[0]);
    localStorage.setItem('allQuizzes',allQuizzes);
}

// generateAuther();
chooseCategory();
quiz.generatefields();

