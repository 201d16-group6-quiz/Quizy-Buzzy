let imagesLi = document.getElementById('categoryContainer');
 let dropdown = document.getElementById('redirectToCategory');
 imagesLi.addEventListener('click',redirectToCategory);
 dropdown.addEventListener('click',redirectToCategory);
function redirectToCategory(event){
    // id = '';
    
    if(event.target.tagName.toLowerCase() === 'img' || event.target.tagName.toLowerCase() === 'a'){
    let id = event.target.id;
   
    localStorage.setItem('id',id);
    window.location="../category.html";
    }   

    else if (event.target.tagName.toLowerCase() === 'p') {
        let id = event.target.previousElementSibling.id;
        localStorage.setItem('id',id);

        window.location="../category.html";
    }
}


