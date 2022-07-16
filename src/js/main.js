'use strict';

console.log('The script is linked!');

//Variables globales

const searchListHTML = document.querySelector('.js-search-list');
const favListHTML = document.querySelector('.js-fav-list');
const form = document.querySelector('.js-form');
const inputSearch = document.querySelector('.js-input-search');
const buttonSearch = document.querySelector('.js-button-search');
const buttonReset = document.querySelector('.js-button-reset');

//Arrays principales

let foundedAnimes = [];
let favourites = [];

//Al cargar la página

function renderAnime (array, list) {
    for (let i = 0; i <= array.length; i++){
        list.innerHTML += `<li>${array.image_url}<br>${array.title}</li>`;
    }
}

//Relacionado al servidor

function searchAnime () {
    const searchValue = inputSearch.value;
    fetch(`https://api.jikan.moe/v4/anime?q=${searchValue}`)
    .then ((response) => response.json)
    .then ((dataReturned) => {
        foundedAnimes.push(dataReturned.title);
        console.log(dataReturned.title);
        renderAnime(foundedAnimes, searchListHTML);
    }); //sale undefined y deja printear ochenta veces lo mismo

}

//Funciones manejadoras

function handleSearch (event) {
    event.preventDefault();
    searchAnime ();
};

//Eventos

buttonSearch.addEventListener('click', handleSearch);