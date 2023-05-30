const movies = [];


const addMoviesInput = document.getElementById('movieInput');
const addMovieButton = document.getElementById('movieButton');
const moviesNode = document.getElementById('movies');



addMovieButton.addEventListener('click', function(){
const moviesFromUser = getMoviesFromUser;

addMovie(moviesFromUser);


renderMovie();
});




function getMoviesFromUser(){
    const text = addMoviesInput.value;

    return {
        text:text
    };
};


function addMovie({text}) {
    movies.push({
        text
    });
}

function getMovie(){
    return movies;
}

function renderMovie(){
    const movies = getMovie();

    let moviesHTML ='';

    movies.forEach(movie => {
        moviesHTML +=  `
                <div class='movies'>
                    <input type="checkbox">
                    <p class='movies__text'>${movie.text}</p>
                </div>
    `;
    });
        moviesNode.innerHTML = moviesHTML; 
}
console.log(movies);


// function clearInputs() {
//     addMoviesInput.value = '';
// }

// addMoviesInput.addEventListener('input', () =>  {
//     const count = addMoviesInput.value.length;
// })