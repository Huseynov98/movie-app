const  movieInputNode = document.getElementById('movieInput');
const addButtonNode = document.getElementById('addButton');
const moviesNode = document.getElementById('movies');

let movies = [];

if(localStorage.getItem('movies')){
    movies = JSON.parse(localStorage.getItem('movies'));
    renderMessage();
}

addButtonNode.addEventListener('click', function(){
    createNewMovie();

    clearInput();

    renderMessage();
        
    
});

function createNewMovie(){
    let newMovie = {
        text: movieInputNode.value,
        checked: false
    };
    
    movies.push(newMovie);
    renderMessage();
    localStorage.setItem('movies', JSON.stringify(movies));
}


movieInputNode.addEventListener('keydown', function(e){
    if(e.key === 'Enter'){
        createNewMovie();
        clearInput();
    }    
});



function clearInput(){
    movieInputNode.value = '';
}

function renderMessage() {
    let renderMessage = '';

    movies.forEach(function(item, i){
       renderMessage += `
            <li class='close__Movie'>
            <div class="form-checkbox">
                <input type='checkbox' class="form-default" id='item_${i}' ${item.checked ? 'checked' : 2}>
                <label class="checkbox-label" for='item_${i}'>${item.text}</label>
                <span class="form-custom"></span>
          </div>
                <button class='close' data-action='delete'></button>
            </li>
       `;
        moviesNode.innerHTML = renderMessage;
    });


    <li class='movies'>
    <label class="checkbox-label">
        <div class="form-checkbox">
          <input id="switch" class="form-default" type="checkbox">
          <span class="form-custom">
          <p class='movies__text'>${movie.text}</p>
          </span>
      </label>
        <button type="submit" id="submit" class="close__input-btn" onclick='buttonClear()'></button>
    </li>


}

moviesNode.addEventListener('click', deleteMovie);


function deleteMovie(event){
    if(event.target.dataset.action === 'delete') {
        console.log('delete')
     const parentNode = event.target.closest('.close__Movie');
     parentNode.remove();
    }
}