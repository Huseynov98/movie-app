const  movieInputNode = document.getElementById('movieInput');
const addButtonNode = document.getElementById('addButton');
const moviesNode = document.getElementById('movies');

let movies = [];

if(localStorage.getItem('movies')){
    movies = JSON.parse(localStorage.getItem('movies'));
    renderMessage();
}

function onMoviesChange() {
    localStorage.setItem('movies', JSON.stringify(movies));
    renderMessage();
}

function deleteMovie(event){
    if(event.target.dataset.action === 'delete') {
        console.log('delete')
        const parentNode = event.target.closest('.close__Movie');
        movies.splice('close__Movies', 1);
        parentNode.remove();
    }
}
function checkMovie(index) {
    const item = movies[index];
    movies.splice(index, 1, {
        text: item.text,
        checked: !checkMovie
    });
    onMoviesChange();
}

function createMovie() {
    movies.push({text: movieInputNode.value, checked: false});
    movieInputNode.value = '';
    onMoviesChange();
}


function renderMessage() {
    let renderMessage = '';

    movies.forEach(function(item, i, index){
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
                <button class='close' data-action='delete'></button>
            </li>
       `;
    });
    
    moviesNode.innerHTML = renderMessage;
}

function toggleCheckbox(event) {
    if (event.target.classList.contains('form-default')){
        const taskElement = event.target.closest(".task");
        const taskIndex = getTaskIndex(taskElement);
        tasks[taskIndex].checked = event.target.checked;
    
        taskElement
          .querySelector(".task__name")
          .classList.toggle("task__name_checked");
        taskElement
          .querySelector(".del-btn__line")
          .classList.toggle("del-btn__line_checked");
        taskElement.classList.toggle("task_checked");
    }
}  


addButtonNode.addEventListener('click', function(){
    createMovie();
});


movieInputNode.addEventListener('keydown', function(e){
    if(e.key === 'Enter'){
        createMovie();
    }    
});
moviesNode.addEventListener('click', deleteMovie);


// const  movieInputNode = document.getElementById('movieInput');
// const addButtonNode = document.getElementById('addButton');
// const moviesNode = document.getElementById('movies');


// let movies = [];

// if(localStorage.getItem('movies')){
//     movies = JSON.parse(localStorage.getItem('movies'));
//     renderMessage();
// }

// addButtonNode.addEventListener('click', function(){
//     createNewMovie();

//     clearInput();

//     renderMessage();
        
    
// });



// function createNewMovie(){
//     let newMovie = {
//         text: movieInputNode.value,
//         checked: false
//     };
    
//     movies.push(newMovie);
//     renderMessage();
//     localStorage.setItem('movies', JSON.stringify(movies));
// }


// movieInputNode.addEventListener('keydown', function(e){
//     if(e.key === 'Enter'){
//         createNewMovie();
//         clearInput();
//     }    
// });



// function clearInput(){
//     movieInputNode.value = '';
// }

// function renderMessage() {
//     let renderMessage = '';

//     movies.forEach(function(item, i){
//        renderMessage += `
//             <li id='validations' class='close__Movie active'>
//             <div class="form-checkbox">
//                 <label class="checkbox-label" for='item_${i}'>
//                     <input type='checkbox' class="form-default" id='item_${i}' ${item.checked ? 'checked' : 2}>
//                     <span class="form-custom">
//                     <p class='movies__text'>${item.text}</p>
//                     </span>
//                 </label>
//             </div>
//                 <button class='close' data-action='delete'></button>
//             </li>
//        `;
//         moviesNode.innerHTML = renderMessage;
//     });
// }



// function deleteMovie(event){
//     if(event.target.dataset.action === 'delete') {
//         console.log('delete')
//         const parentNode = event.target.closest('.close__Movie');
//         movies.splice('close__Movies', 1);
//         parentNode.remove();
//     }
// }

// moviesNode.addEventListener('click', deleteMovie);
