const movieInputNode = document.getElementById('movieInput');
const addButtonNode = document.getElementById('addButton');
const moviesNode = document.getElementById('movies');

let movies = [];

init();

addButtonNode.addEventListener('click', function () {
  createNewMovie();
  clearInput();
});

function init() {
  if (localStorage.getItem('movies')) {
    movies = JSON.parse(localStorage.getItem('movies'));
  }
  renderMovies();
}

function createNewMovie() {
  const movieText = movieInputNode.value.trim();

  if (movieText !== '') {
    const newMovie = {
      text: movieText,
      checked: false,
    };

    movies.push(newMovie);
    saveMoviesToLocalStorage();
    renderMovies();
  } else {
    showAlert('Пожалуйста, введите название фильма.');
  }
}

function clearInput() {
  movieInputNode.value = '';
}

function renderMovies() {
  let renderHTML = '';

  movies.forEach(function (movie, index) {
    renderHTML += `
      <li class='close__Movie'>
        <div class="form-checkbox">
          <label class="checkbox-label" for='item_${index}'>
            <input type='checkbox' class="form-default" id='item_${index}' ${
      movie.checked ? 'checked' : ''
    }>
            <span class="form-custom">
              <p class='movies__text'>${movie.text}</p>
            </span>
          </label>
        </div>
        <button class='close' data-action='delete' data-index='${index}'></button>
      </li>
    `;
  });

  moviesNode.innerHTML = renderHTML;

  const deleteButtons = moviesNode.querySelectorAll('.close');
  deleteButtons.forEach(function (button) {
    button.addEventListener('click', deleteMovie);
  });

  const checkboxes = moviesNode.querySelectorAll('.form-default');
  checkboxes.forEach(function (checkbox, index) {
    checkbox.addEventListener('change', function () {
      movies[index].checked = this.checked;
      saveMoviesToLocalStorage();
    });
  });
}

function deleteMovie(event) {
  const index = parseInt(event.target.dataset.index);
  movies.splice(index, 1);
  saveMoviesToLocalStorage();
  renderMovies();

  const deleteButtons = moviesNode.querySelectorAll('.close');
  deleteButtons.forEach(function (button, newIndex) {
    button.dataset.index = newIndex;
  });
}

function saveMoviesToLocalStorage() {
  localStorage.setItem('movies', JSON.stringify(movies));
}

// function loadMoviesFromLocalStorage() {
//   if (localStorage.getItem('movies')) {
//     movies = JSON.parse(localStorage.getItem('movies'));
//   }
// }

function showAlert(message) {
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.textContent = message;

  document.body.appendChild(popup);

  setTimeout(function () {
    popup.remove();
  }, 2000);
}
