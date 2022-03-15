const activePage = window.location.pathname;

const filmsUrl = "https://ghibliapi.herokuapp.com/films";

const navItems = document.querySelectorAll('nav a');

const filmList = document.getElementsByClassName('film');

const filmCatalog = document.getElementById('scrollbar');

const background = document.getElementById("backgroundCover");

const filmInfo = document.getElementById("filmInfo_wrapper");

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

` <header id="filmTitle">Ponyo - 崖の上のポニョ</header>
<img id="filmCover" src="ponyocover.png" alt="">
<table class="film_infoTable">
    <tbody>
        <tr>
            <td>Director</td>
            <td id="directorsName">Name</td>
        </tr>
        <tr>
            <td>Producer</td>
            <td id="producersName">Name</td>
        </tr>
        <tr>
            <td>Release Date</td>
            <td id="releaseDate">1999</td>
        </tr>
        <tr>
            <td>Running Time</td>
            <td id="runTime">120min</td>
        </tr>
        <tr>
            <td>Rating</td>
            <td id="rating">10/10</td>
        </tr>
    </tbody>
</table>
<p id="filmSynopsis">
    The son of a sailor, 5-year old Sosuke lives a quiet life on an oceanside cliff with his mother Lisa. 
    One fateful day, he finds a beautiful goldfish trapped in a bottle on the beach and upon rescuing her, 
    names her Ponyo. But she is no ordinary goldfish. The daughter of a masterful wizard and a sea goddess, 
    Ponyo uses her father's magic to transform herself into a young girl and quickly falls in love with Sosuke, 
    but the use of such powerful sorcery causes a dangerous imbalance in the world. 
    As the moon steadily draws nearer to the earth and Ponyo's father sends the ocean's mighty waves to find his daughter, 
    the two children embark on an adventure of a lifetime to save the world and fulfill Ponyo's dreams of becoming human.
</p>`




