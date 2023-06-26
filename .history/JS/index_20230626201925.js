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
    movies.push({ text, checked: false });
    saveMoviesToLocalStorage();
    clearInput();
    renderMovies();
  }
}

function clearInput() {
  movieInputNode.value = '';
}

function renderMovies() {
    let renderMessage = '';
  
    movies.forEach(function (item, i) {
      renderMessage += `
        <li class='close__Movie'>
          <div class="form-checkbox">
            <label class="checkbox-label" for='item_${i}'>
              <input type='checkbox' class="form-default" id='item_${i}' ${item.checked ? 'checked' : ''}>
              <span class="form-custom">
                <p class='movies__text'>${item.text}</p>
              </span>
            </label>
          </div>
          <button class='close' data-action='delete'></button>
        </li>
      `;
    });
  
    moviesNode.innerHTML = renderMessage;
  }
  

function deleteMovie(event) {
  const index = parseInt(event.target.dataset.index);
  movies.splice(index, 1);
  saveMoviesToLocalStorage();
  renderMovies();
}
console.log(JSON.parse(localStorage.getItem('movies')));

function saveMoviesToLocalStorage() {
  localStorage.setItem('movies', JSON.stringify(movies));
}

renderMovies();
