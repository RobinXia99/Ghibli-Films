
const activePage = window.location.pathname;

var windowWidth = window.matchMedia("(max-width: 500px)");

const filmsUrl = "https://ghibliapi.herokuapp.com/films";

const navItems = document.querySelectorAll('nav a');

const dropdownItems = document.querySelectorAll('.nav_dropdown_item');

const filmList = document.getElementsByClassName('film');

const filmCatalog = document.getElementById('scrollbar');

const mobileFilmCatalog = document.getElementById('mobile_filmlist');

const mobileShowListBtn = document.getElementById('mobile_filmlist_btn');

const background = document.getElementById("backgroundCover");

const filmInfo = document.getElementById("filmInfo_wrapper");


for(let navItem of navItems) {
    if(activePage.includes(navItem.innerText.toLowerCase())) {
        navItem.classList.add("active");
    } else {
        console.log(navItem.innerText);
    }
}

for(let item of dropdownItems) {
    if(activePage.includes(item.innerText.toLowerCase())) {
        item.classList.add("nav_dropdown_item_active");
    } else {
        console.log(item.innerText);
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

        let index = (this.list).findIndex(function(item, index) {
            return item.id === film.id;
        })
        setInfo(this.list[index]);
       
    },
};

window.addEventListener('load', async e => {

    films.list = await fetchFilms(filmsUrl);

    for(let film of films.list) {

        let option = document.createElement("li");
        option.classList.add('film');
        option.innerText = film.title;
        option.id = film.id;

        if(windowWidth.matches) {
            mobileFilmCatalog.appendChild(option);
        } else {
            filmCatalog.appendChild(option);
        }
        

        
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


function setInfo(film) {

    filmInfo.innerHTML = "";

    let infoTypes = ['Director', 'Producer', 'Release Date', 'Running Time', 'Rating'];

    let filmTitle = document.createElement('header');

    let filmCover = document.createElement('img');

    let filmTable = document.createElement('table');

    let tableBody = document.createElement('tbody');

    let synopsis = document.createElement('p');

    filmTitle.classList.add('filmTitle');
    filmTitle.innerText = `${film.title} - ${film.original_title}`

    filmCover.classList.add('filmCover');
    filmCover.src = film.image;

    for(let type of infoTypes) {
        let value;
        switch (type) {
            case 'Director':
                value = film.director;
                break;
            case 'Producer':
                value = film.producer;
                break;
            case 'Release Date':
                value = film.release_date;
                break;
            case 'Running Time':
                value = `${film.running_time}min`;
                break;
            case 'Rating':
                value = `${film.rt_score}/100`;
                break;
        }

        let tableRow = document.createElement('tr');
        let tableDataType = document.createElement('td');
        let tableData = document.createElement('td');

        tableDataType.innerText = type;
        tableData.innerText = value;

        tableRow.appendChild(tableDataType);
        tableRow.appendChild(tableData);
        
        tableBody.appendChild(tableRow);
    }

    filmTable.classList.add('film_infoTable');
    filmTable.appendChild(tableBody);

    synopsis.classList.add('film_synopsis');
    synopsis.innerText = film.description;

    filmInfo.append(filmTitle, filmCover, filmTable, synopsis);
    

}

mobileShowListBtn.addEventListener('click', function() {
    let innerText = mobileShowListBtn.innerText;

    if(innerText == "Select Film") {
        mobileShowListBtn.innerHTML = "Close";
        mobileFilmCatalog.style.display = 'inline';
        mobileShowListBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    } else {
        mobileShowListBtn.innerText = "Select Film"
        mobileFilmCatalog.style.display = 'none';
        mobileShowListBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    }
})
