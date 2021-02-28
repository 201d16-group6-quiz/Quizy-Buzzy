let table = document.getElementById('category');

table.addEventListener('click',changeColor);
function changeColor(event){
    let id = event.target.id;
   
    localStorage.setItem('id',id);
    }
