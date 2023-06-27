const movieInputNode = document.getElementById('movieInput');
const addButtonNode = document.getElementById('addButton');
const moviesNode = document.getElementById('movies');

let movies = [];




addButtonNode.addEventListener('click', function () {
  createNewMovie();
  clearInput();
});

function createNewMovie() {
  const movieText = movieInputNode.value.trim(); // Удаление лишных пробелов и пустых строк

  if (movieText !== '') { // Проверяем, что строка не пустая
    const newMovie = {
      text: movieText,
      checked: false,
    };

    movies.push(newMovie);
    saveMoviesToLocalStorage();
    renderMovies();
  } else {
    // Отображаем всплывающее окно с сообщением об ошибке
    showAlert('Пожалуйста, введите название фильма.');
  }
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

  // Обновляем значения data-index у кнопок удаления
  const deleteButtons = moviesNode.querySelectorAll('.close');
  deleteButtons.forEach(function (button, newIndex) {
    button.dataset.index = newIndex;
  });
}

function saveMoviesToLocalStorage() {
  localStorage.setItem('movies', JSON.stringify(movies));
  loadMoviesFromLocalStorage();
  renderMovies();
}

function loadMoviesFromLocalStorage() {
  if (localStorage.getItem('movies')) {
    movies = JSON.parse(localStorage.getItem('movies'));
  }
}

function showAlert(message) {
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.textContent = message;

  document.body.appendChild(popup);

  setTimeout(function () {
    popup.remove();
  }, 2000);
}
