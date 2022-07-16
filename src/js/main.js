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

//Relacionado al servidor

function renderAnime () {}; //tal vez esta va al cargar

function searchAnime () {
    const searchValue = inputSearch.value;
    fetch(`https://api.jikan.moe/v4/anime?q=${searchValue}`)
    .then ((response) => response.json)
    .then ((data) => {
        foundedAnimes.push(data);
        //hay que renderizar lo que devuelva el server: solo el título y la img y en lugares concretos de la tarjeta
    });

}


//Al cargar la página