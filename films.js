const activePage = window.location.pathname;

const filmsUrl = "https://ghibliapi.herokuapp.com/films";

const navItems = document.querySelectorAll('nav a');

const filmList = document.getElementsByClassName('film');

const filmCatalog = document.getElementById('scrollbar');

const background = document.getElementById("backgroundCover");

for(let navItem of navItems) {
    if(activePage.includes(navItem.innerText.toLowerCase())) {
        navItem.classList.add("active");
    } else {
        console.log(navItem.innerText);
    }
}

//////////////////

let films = {
    list: {},
    activeFilm: "",
    selectFilm: function (film) {
        let currentFilm = document.querySelector('.film__active');

        if (currentFilm) {
            currentFilm.classList.remove('film__active');
        }
        
        film.classList.add('film__active');
        this.activeFilm = film.innerText;

        background.src = `images/${film.id}.png`;

        
        
       
    },
};

window.addEventListener('load', async e => {

    films.list = await fetchFilms(filmsUrl);


    for(let film of films.list) {

        let option = document.createElement("li");
        option.classList.add('film');
        option.innerText = film.title;
        option.id = film.id;

        filmCatalog.appendChild(option);

    }
    
    films.selectFilm(filmList[0]);
    

    for(let film of filmList) {
        film.addEventListener('click', function() {
            films.selectFilm(film);
            console.log(films.activeFilm);
        })
    }
})

async function fetchFilms(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
      return data;
}









