const  movieInputNode = document.getElementById('movieInput');
const addButtonNode = document.getElementById('addButton');
const moviesNode = document.getElementById('movies');


let movies = [];

if(localStorage.getItem('movies')){
    movies = JSON.parse(localStorage.getItem('movies'));
    renderMessage();
}

addButtonNode.addEventListener('click', function(){
    createNewMovie();

    clearInput();

    renderMessage();
        
    
});



function createNewMovie(){
    let newMovie = {
        text: movieInputNode.value,
        checked: false
    };
    
    movies.push(newMovie);
    renderMessage();
    localStorage.setItem('movies', JSON.stringify(movies));
}


movieInputNode.addEventListener('keydown', function(e){
    if(e.key === 'Enter'){
        createNewMovie();
        clearInput();
    }    
});



function clearInput(){
    movieInputNode.value = '';
}

function renderMessage() {
    let renderMessage = '';

    movies.forEach(function(item, i){
       renderMessage += `
            <li id='validations' class='close__Movie active'>
            <div class="form-checkbox">
                <label class="checkbox-label" for='item_${i}'>
                    <input type='checkbox' class="form-default" id='item_${i}' ${item.checked ? 'checked' : 2}>
                    <span class="form-custom">
                    <p class='movies__text'>${item.text}</p>
                    </span>
                </label>
            </div>
                <button class='close' data-action='delete'></button>
            </li>
       `;
        moviesNode.innerHTML = renderMessage;
    });
}



function deleteMovie(event){
    if(event.target.dataset.action === 'delete') {
        console.log('delete')
        const parentNode = event.target.closest('.close__Movie');
        movies.splice('close__Movies', 1);
        parentNode.remove();
    }
}

moviesNode.addEventListener('click', deleteMovie);
