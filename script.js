const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById('main');
const img = document.getElementsByTagName('img');

const API_URL = 'https://api.themoviedb.org/3//discover/movie?sort_by=popularity.desc&api_key=793addc9d6fc76d3fd9ab2fbf26a4913&page=1'

const IMG_URL = 'https://image.tmdb.org/t/p/w1280'

const SEARCH_URL = 'https://api.themoviedb.org/3//search/movie?api_key=793addc9d6fc76d3fd9ab2fbf26a4913&query="'

getMovies(API_URL);

async function getMovies(url){
    const response = await fetch(url);
    const data = await response.json();
    showMovies(data.results);
}

function showMovies(movies){
    main.innerHTML = '';
    console.log(1);
    movies.forEach(movie => {
        const {poster_path, title, vote_average, overview} = movie;
        
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `<img src="${IMG_URL+poster_path}" alt="${title}"/>
        
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByVote(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>`
        main.appendChild(movieEl);
    })
}

function getClassByVote(vote){
    if(vote >= 8){
        return 'green';
    }else if(vote > 5){
        return 'orange';
    }else{
        return 'red';
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if(searchTerm && searchTerm !== ''){
        console.log(SEARCH_URL + searchTerm);
        getMovies(SEARCH_URL + searchTerm);
        search.value = '';
    }else{
        window.location.reload;
    }
});