
const addMoviesInput = document.getElementById('movieInput');
const addMovieButton = document.getElementById('movieButton');
const moviesNode = document.getElementById('movies');
const closeButtonNode = document.getElementById('closeButton');

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

addMovie();

function getMovie () {
    return movies;
}

function renderMovies () {
    const movies = getMovie();

    let moviesHTML ='';

    movies.forEach(movie => {
        moviesHTML +=  `
                <li class='movies'>
                <label class="checkbox-label">
                    <div class="form-checkbox">
                      <input id="switch" class="form-default" type="checkbox" required>
                      <span class="form-custom">
                      <p class='movies__text'>${movie.text}</p>
                      </span>
                      </div>
                  </label>
                    <button type="button" id="CloseButton" class="close__input-btn" onclick="JavaScript:return Validator(this.id);"></button>
                </li>
    `;
});
    moviesNode.innerHTML = moviesHTML; 
}
console.log(addMovie());

function  clearInput(){
    addMoviesInput.value = '';
};

function