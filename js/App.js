let table = document.getElementsByTagName('table')[0];

table.addEventListener('click',changeColor);
function changeColor(event){
    debugger;
    // console.log(event.target);
    let id = event.target.id;
   
    localStorage.setItem('id',id);
    }
