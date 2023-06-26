const  movieInputNode = document.getElementById('movieInput');
const addButtonNode = document.getElementById('addButton');
const moviesNode = document.getElementById('movies');

let movies = [];


function saveLocalStorage () {
    if(localStorage.getItem('movies')){
        movies = JSON.parse(localStorage.getItem('movies'));
        renderMessage();
    }
} 

function onMoviesChange() {
    localStorage.setItem('movies', movies);
    renderMessage();
    saveLocalStorage();
}

function deleteMovie(index) {
    movies.splice(index, 1);
    onMoviesChange();
    saveLocalStorage();
}

function checkMovie(index) {
    const item = movies[index];
    movies.splice(index, 1, {
        text: item.text,
        checked: !checkMovie
    });
    onMoviesChange();
    saveLocalStorage();
}

function createMovie() {
    movies.push({text: movieInputNode.value, checked: false});
    movieInputNode.value = '';
    onMoviesChange();
}


function renderMessage() {
    let renderMessage = '';

    movies.forEach(function(item, i ,index){
       renderMessage += `
            <li class='close__Movie' onclick={checkMovie(${index})}>
            <div class="form-checkbox">
                <label class="checkbox-label" for='item_${i}'>
                    <input type='checkbox' class="form-default" id='item_${i}' ${item.checked ? 'checked' : ""} readOnly>
                    <span class="form-custom">
                    <p class='movies__text'>${item.text}</p>
                    </span>
                </label>
            </div>
                <button class='close' onclick="deleteMovie()"></button>
            </li>
       `;
    });
    
    moviesNode.innerHTML = renderMessage;
}


addButtonNode.addEventListener('click', function(){
    createMovie();
});


movieInputNode.addEventListener('keydown', function(e){
    if(e.key === 'Enter'){
        createMovie();
    }    
});