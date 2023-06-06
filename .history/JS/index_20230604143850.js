const addMoviesInput = document.getElementById('movieInput');
const addMovieButton = document.getElementById('movieButton');
const moviesNode = document.getElementById('movies');
const deleteBtn = document.getElementById('submit');

const movies = [];


addMovieButton.addEventListener ('click', function() {
    const moviesFromUser = getMoviesFromUser();

    addMovie(moviesFromUser);

    renderMovies();
    
    clearInput();

    
});




function getMoviesFromUser (){
    const text = addMoviesInput.value;

    return {
        text: text
    };
};


function addMovie ({text}) {
    movies.push({
        text
    });
}


function getMovie () {
    return movies;
}

function renderMovies () {
    const movies = getMovie();

    let moviesHTML ='';

    movies.forEach(movie => {
        moviesHTML +=  `
                <li class='movies' id='closeMovies'>
                <label class="checkbox-label">
                    <div class="form-checkbox">
                      <input id="switch" class="form-default" type="checkbox">
                      <span class="form-custom">
                      <p class='movies__text'>${movie.text}</p>
                      </span>
                      </div>
                  </label>
                    <button type="submit" id="submit" class="close__input-btn" onclick='buttonClear()'></button>
                </li>
    `;
});
    moviesNode.innerHTML = moviesHTML; 
}

function  clearInput() {
    addMoviesInput.value = '';
};

// function buttonClear() {
//     movies.splice('closeMovies', 1); // Удаляет первый добавленый массив из списка
//     renderMovies();
// }

moviesNode.addEventListener('click', function(event){
    if(event.target.className === 'close__input-btn'){
        const id = event.target.dataset.id;
        deleteMovie(id);
    }
})