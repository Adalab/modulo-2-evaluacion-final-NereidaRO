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

function writeAnime (array) {
    let html ='';
    //hay que hacer un filter para coger la imagen (array.image.jpg.image_url) jpg es otro objeto
    for (let i=0; i<= array.length; i++){
        html += `<li>
        <img src="${array.images}" />
        <h6>${array.title}<h6>
        </li>`;
    }
    return html;
}

function renderAnime (list, array) {
    list.innerHTML = writeAnime(array);
}

//Relacionado al servidor

function searchAnime () {
    const searchValue = inputSearch.value.toLowerCase();
    fetch(`https://api.jikan.moe/v4/anime?q=${searchValue}`)
    .then ((response) => response.json())
    .then ((dataReturned) => {
        foundedAnimes = dataReturned.data;
        console.log(foundedAnimes);
        renderAnime (searchListHTML, foundedAnimes);
    });

} //ya no replica los resultados, pero la img sale rota

//Funciones manejadoras

function handleSearch (event) {
    event.preventDefault();
    searchAnime ();
}

//Eventos

buttonSearch.addEventListener('click', handleSearch);