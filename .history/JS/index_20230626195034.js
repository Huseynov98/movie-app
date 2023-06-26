const movieInputNode = document.getElementById('movieInput');
const addButtonNode = document.getElementById('addButton');
const moviesNode = document.getElementById('movies');

let movies = JSON.parse(localStorage.getItem('movies')) || [];

addButtonNode.addEventListener('click', createNewMovie);
movieInputNode.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') createNewMovie();
});

function createNewMovie() {
  const text = movieInputNode.value.trim();

  if (text !== '') {
    const newMovie = { text, checked: false };
    movies.push(newMovie);
    saveMoviesToLocalStorage();
    clearInput();
    renderMovie(newMovie);
  }
}

function clearInput() {
  movieInputNode.value = '';
}

function renderMovie(movie) {
  const li = document.createElement('li');
  li.classList.add('close__Movie');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('form-default');
  checkbox.checked = movie.checked;
  checkbox.addEventListener('change', function () {
    movie.checked = this.checked;
    saveMoviesToLocalStorage();
  });

  const label = document.createElement('label');
  label.classList.add('checkbox-label');
  label.appendChild(checkbox);
  label.appendChild(document.createTextNode(movie.text));

  const closeButton = document.createElement('button');
  closeButton.classList.add('close');
  closeButton.dataset.action = 'delete';
  closeButton.addEventListener('click', deleteMovie);

  li.appendChild(label);
  li.appendChild(closeButton);
  moviesNode.appendChild(li);
}

function deleteMovie(event) {
  const movieElement = event.target.parentNode;
  const index = Array.from(movieElement.parentNode.children).indexOf(movieElement);
  movies.splice(index, 1);
  saveMoviesToLocalStorage();
  movieElement.remove();
}

function saveMoviesToLocalStorage() {
  localStorage.setItem('movies', JSON.stringify(movies));
}

function initializeMovies() {
  movies.forEach(renderMovie);
}

initializeMovies();
