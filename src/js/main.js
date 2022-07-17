'use strict';

console.log('The script is linked!');

//Variables globales

const searchListHTML = document.querySelector('.js-search-list');
const favListHTML = document.querySelector('.js-fav-list');
const form = document.querySelector('.js-form');
const inputSearch = document.querySelector('.js-input-search');
const buttonSearch = document.querySelector('.js-button-search');
const buttonReset = document.querySelector('.js-button-reset');

//Llamada al localStorage

/*const saved = localStorage.getItem("saved");
console.log(saved);*/

//Arrays principales

let foundedAnimes = [];
let favourites = [];

//Lo que puede leerse al cargar la página

function writeAnime (array) {
    let html ='';

    for (const oneAnime of array){
        if (oneAnime.image === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") {
            html += `<li class="js-li-anime">
        <img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" />
        <h6>${oneAnime.title}<h6>
        </li>`
        } else {
            html += `<li class="js-li-anime">
        <img src="${oneAnime.image}" />
        <h6>${oneAnime.title}<h6>
        </li>`
        }

    };
    console.log(html);
    return html;
}

function listenAnime (array) {
    for (const oneAnime of array){
        oneAnime.addEventListener('click', handleFav);
    };
}; //dice que no es una función: duda GitHub

function renderAnime (array, list) {
    list.innerHTML = writeAnime(array);
    listenAnime(array);
} //supuestamente tienen el listener: duda en GitHub

//Relacionado al servidor

function searchAnime () {
    const searchValue = inputSearch.value.toLowerCase();
    fetch(`https://api.jikan.moe/v4/anime?q=${searchValue}`)
    .then ((response) => response.json())
    .then ((dataReturned) => {
        let dataAnimes = dataReturned.data;
        foundedAnimes = dataAnimes.map(({ mal_id, title, images }) => ({
            id: mal_id,
            title: title,
            image: images.jpg.image_url,
          }));
        console.log(foundedAnimes);
        renderAnime(foundedAnimes, searchListHTML);
    });
}

//Funciones manejadoras

function handleSearch (event) {
    event.preventDefault();
    searchAnime();
}

function handleReset(event){
    event.preventDefault();
    //duda en GitHub Project
}

function handleFav (event) {
    const idSelected = event.currentTarget.id;
    const animeSelected = foundedAnimes.find((anime) => anime.id === idSelected);
    const favSelected = favourites.findIndex ((fav) => fav.id === idSelected);

    console.log(animeSelected);
    console.log (favSelected);

    if (favSelected === -1) {
        favourites.push(animeSelected);
    } else {
        favourites.splice(favSelected, 1);
    };

    renderAnime(favourites, favListHTML);
}

//Eventos globales

buttonSearch.addEventListener('click', handleSearch);
buttonReset.addEventListener('click', handleReset);