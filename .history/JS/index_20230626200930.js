// const movieInputNode = document.getElementById('movieInput');
// const addButtonNode = document.getElementById('addButton');
// const moviesNode = document.getElementById('movies');

// let movies = JSON.parse(localStorage.getItem('movies')) || [];

// addButtonNode.addEventListener('click', createNewMovie);
// movieInputNode.addEventListener('keydown', function (e) {
//   if (e.key === 'Enter') createNewMovie();
// });

// function createNewMovie() {
//   const text = movieInputNode.value.trim();

//   if (text !== '') {
//     movies.push({ text, checked: false });
//     saveMoviesToLocalStorage();
//     clearInput();
//     renderMovies();
//   }
// }

// function clearInput() {
//   movieInputNode.value = '';
// }

// function renderMovies() {
//   moviesNode.innerHTML = '';

//   movies.forEach((movie, index) => {
//     const li = document.createElement('li');
//     li.classList.add('close__Movie');

//     const div = document.createElement('div');
//     div.classList.add('form-checkbox');

//     const label = document.createElement('label');
//     label.classList.add('checkbox-label');
//     label.setAttribute('for', `item_${index}`);

//     const input = document.createElement('input');
//     input.type = 'checkbox';
//     input.classList.add('form-default');
//     input.id = `item_${index}`;
//     input.checked = movie.checked;
//     input.addEventListener('change', function () {
//       movies[index].checked = this.checked;
//       saveMoviesToLocalStorage();
//     });

//     const span = document.createElement('span');
//     span.classList.add('form-custom');

//     const p = document.createElement('p');
//     p.classList.add('movies__text');
//     p.textContent = movie.text;

//     span.appendChild(p);
//     label.appendChild(input);
//     label.appendChild(span);
//     div.appendChild(label);
//     li.appendChild(div);

//     const button = document.createElement('button');
//     button.classList.add('close');
//     button.dataset.action = 'delete';
//     button.dataset.index = index.toString();
//     button.addEventListener('click', deleteMovie);
//     li.appendChild(button);

//     moviesNode.appendChild(li);
//   });
// }

// function deleteMovie(event) {
//   const index = parseInt(event.target.dataset.index);
//   movies.splice(index, 1);
//   saveMoviesToLocalStorage();
//   renderMovies();
// }
// console.log(JSON.parse(localStorage.getItem('movies')));

// function saveMoviesToLocalStorage() {
//   localStorage.setItem('movies', JSON.stringify(movies));
// }

// renderMovies();

// Получение элементов из DOM
const movieInputNode = document.getElementById('movieInput');
const addButtonNode = document.getElementById('addButton');
const moviesNode = document.getElementById('movies');

// Инициализация массива фильмов
let movies = [];

// Добавление обработчиков событий
addButtonNode.addEventListener('click', createNewMovie);
movieInputNode.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') createNewMovie();
});

// Функция создания нового фильма
function createNewMovie() {
  const text = movieInputNode.value.trim();

  if (text !== '') {
    movies.push({ text, checked: false });
    saveMoviesToLocalStorage();
    clearInput();
    renderMovies();
  }
}

// Функция очистки ввода фильма
function clearInput() {
  movieInputNode.value = '';
}

// Функция отрисовки списка фильмов
function renderMovies() {
  moviesNode.innerHTML = '';

  movies.forEach((movie) => {
    const li = document.createElement('li');
    li.textContent = movie.text;
    moviesNode.appendChild(li);
  });
}

// Функция сохранения списка фильмов в локальное хранилище
function saveMoviesToLocalStorage() {
  localStorage.setItem('movies', JSON.stringify(movies));
}

// Инициализация списка фильмов
renderMovies();
