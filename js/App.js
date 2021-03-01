let table = document.getElementById('categoryContainer');
let dropdown = document.getElementById('redirectToCategory');
table.addEventListener('click',redirectToCategory);
dropdown.addEventListener('click',redirectToCategory);
function redirectToCategory(event){
    debugger;
    if(event.target.tagName.toLowerCase() === 'img' || event.target.tagName.toLowerCase() === 'a'){
    let id = event.target.id;
   
    localStorage.setItem('id',id);
    window.location="../category.html";
    }   
}



