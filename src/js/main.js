'use strict';

console.log('>> Ready :)');

//Variables globales
const searchListHTML = document.querySelector('.js-search-list');
const favListHTML = document.querySelector('.js-fav-list');
const form = document.querySelector('.js-form');
const inputSearch = document.querySelector('.js-input-search');
const buttonSearch = document.querySelector('.js-button-search');
const buttonReset = document.querySelector('.js-button-reset');

//Arrays principales
let searched = [];
let favourites = [];

//Relacionado al servidor


//Al cargar la página