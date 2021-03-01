let table = document.getElementById('categoryContainer');

table.addEventListener('click',changeColor);

function changeColor(event){
    debugger;
    if(event.target.tagName.toLowerCase() === 'img'){
    let id = event.target.id;
   
    localStorage.setItem('id',id);
    window.location="../category.html";
    }   
}

