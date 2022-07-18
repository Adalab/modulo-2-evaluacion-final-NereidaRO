'use strict';

console.log('The script is linked!');

//Variables globales

const searchListHTML = document.querySelector('.js-search-list');
const favListHTML = document.querySelector('.js-fav-list');
const inputSearch = document.querySelector('.js-input-search');
const buttonSearch = document.querySelector('.js-button-search');
const buttonReset = document.querySelector('.js-button-reset');
const savedFavs = JSON.parse(localStorage.getItem('saved'));

//Llamada al localStorage

function onLoad () {
    if(savedFavs){
        favourites = savedFavs
        renderAnime(favourites, favListHTML);
    } 
}
onLoad();


//Arrays principales

let foundedAnimes = [];
let favourites = [];

//Lo que puede leerse al cargar la página

function writeAnime (array) {
    let html ='';

    //console.log(array.image);

    for (const oneAnime of array){
        console.log(oneAnime.image);
      if (oneAnime.image === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") {
            html += `<li class="js-li-anime" id="${oneAnime.id}">
        <img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" />
        <h6>${oneAnime.title}<h6>
        </li>`
        } else {
            html += `<li class="js-li-anime" id="${oneAnime.id}">
        <img src="${oneAnime.image}" />
        <h6>${oneAnime.title}<h6>
        </li>`
        }

    };
    return html;
}

function listenAnime () {
    const liAnime = document.querySelectorAll('.js-li-anime');
    for (const oneAnime of liAnime){
        oneAnime.addEventListener('click', handleFav);
    };
};

function renderAnime (array, list) {
    list.innerHTML = writeAnime(array);
    listenAnime();
}

function saveFav () {
    if (savedFavs === null){
        localStorage.setItem("saved", JSON.stringify(favourites));
    }
}

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
    localStorage.removeItem("savedFavs");
    foundedAnimes = [];
    favourites = [];
    inputSearch.value = '';
}

function handleFav (event) {
    const idSelected = event.currentTarget.id;
    const animeSelected = foundedAnimes.find((anime) => anime.id === parseInt(idSelected));
    const favSelected = favourites.findIndex ((fav) => fav.id === parseInt(idSelected));

    console.log(animeSelected);
    console.log (favSelected);

    if (favSelected === -1) {
        favourites.push(animeSelected);
        console.log(favourites);
    } else {
        favourites.splice(favSelected, 1);
    };
    saveFav();
    renderAnime(favourites, favListHTML);
}

//Eventos globales

buttonSearch.addEventListener('click', handleSearch);
buttonReset.addEventListener('click', handleReset);