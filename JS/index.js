const movieInputNode = document.getElementById('movieInput');
const addButtonNode = document.getElementById('addButton');
const moviesNode = document.getElementById('movies');

let movies = [];

if (localStorage.getItem('movies')) {
  movies = JSON.parse(localStorage.getItem('movies'));
  renderMovies();
}

addButtonNode.addEventListener('click', function () {
  createNewMovie();
  clearInput();
});

function createNewMovie() {
  const newMovie = {
    text: movieInputNode.value,
    checked: false,
  };

  movies.push(newMovie);
  saveMoviesToLocalStorage();
  renderMovies();
}

movieInputNode.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    createNewMovie();
    clearInput();
  }
});

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
}

function saveMoviesToLocalStorage() {
  localStorage.setItem('movies', JSON.stringify(movies));
}
