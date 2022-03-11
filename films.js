const activePage = window.location.pathname;

const filmsUrl = "https://ghibliapi.herokuapp.com/films";

const navItems = document.querySelectorAll('nav a');

const filmOptions = document.getElementById('scrollbar');

for(let navItem of navItems) {
    if(activePage.includes(navItem.innerText.toLowerCase())) {
        navItem.classList.add("active");
    } else {
        console.log(navItem.innerText);
    }
}

let activeFilm = "";

window.addEventListener('load', async e => {

    let films = await fetchFilms(filmsUrl);

    let index = 0;

    for(let film of films) {
        let option = document.createElement("li");
        option.classList.add('film');
        option.innerText = film.title;

        if(index == 0) {
            option.classList.add('film__active');
            index++;
        }

        filmOptions.appendChild(option);
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









