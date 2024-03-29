"use strict";

console.log("The script is linked");

//Variables globales

const searchListHTML = document.querySelector(".js-search-list");
const favListHTML = document.querySelector(".js-fav-list");
const inputSearch = document.querySelector(".js-input-search");
const buttonSearch = document.querySelector(".js-button-search");
const buttonReset = document.querySelector(".js-button-reset");
const savedFavs = JSON.parse(localStorage.getItem("saved"));

//Arrays principales

let foundedAnimes = [];
let favourites = [];

//Funciones para renderizar búsqueda y escuchadores

function writeAnime() {
  let html = "";

  for (const oneAnime of foundedAnimes) {
    if (
      oneAnime.image ===
      "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
    ) {
      html += `<li class="js-li-anime" id="${oneAnime.id}">
        <img class="main__img" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" />
        <h6 class="main__h6">${oneAnime.title}</h6>
        ${isAiring(oneAnime)};
        </li>`;
    } else {
      html += `<li class="js-li-anime" id="${oneAnime.id}">
        <img class="main__img" src="${oneAnime.image}" />
        <h6 class="main__h6">${oneAnime.title}</h6>
        ${isAiring(oneAnime)}
        </li>`;
    }
  }
  return html;
}

function isAiring(oneAnime) {
  let html = "";
  if (oneAnime.airing) {
    html += `<a href=${oneAnime.url}>Más detalles</a>`;
  } else {
    html += `No está en emisión`;
  }
  return html;
}

function listenAnime() {
  const liAnime = document.querySelectorAll(".js-li-anime");
  for (const oneAnime of liAnime) {
    oneAnime.addEventListener("click", handleFav);
  }
}

function renderAnime() {
  searchListHTML.innerHTML = writeAnime();
  listenAnime();
}

//Función para guardar los favoritos

function saveFav() {
  localStorage.setItem("saved", JSON.stringify(favourites)); //si ya existe, la machaca y le pone lo nuevo
} //hay que llamarla en dos ocasiones: poner un favorito y quitarlo

//Función para destacar favoritos en la lista de resultados de búsqueda

function compareArray() {
  const liAnime = document.querySelectorAll(".js-li-anime");
  for (const li of liAnime) {
    let liId = parseInt(li.id);
    const findFav = favourites.findIndex(
      (fav) => fav.id === liId
    ); /*si se cumple me da un número distinto de -1*/
    if (findFav !== -1) {
      li.classList.add("fav");
    } else {
      li.classList.remove("fav");
    }
  }
}

//Renderización de favoritos y las X

function writeFavs() {
  let html = "";

  for (const oneFav of favourites) {
    if (
      oneFav.image ===
      "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
    ) {
      html += `<li class="js-li-fav" id="${oneFav.id}"><i class="js-x fa-solid fa-xmark" id="${oneFav.id}"></i>
        <img class="main__img" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" />
        <h6 class="main__h6">${oneFav.title}</h6>
        </li>`;
    } else {
      html += `<li class="js-li-fav" id="${oneFav.id}"><i class="js-x fa-solid fa-xmark" id="${oneFav.id}"></i>
        <img class="main__img" src="${oneFav.image}" />
        <h6 class="main__h6">${oneFav.title}</h6>
        </li>`;
    }
  }

  return html;
}

function renderFavs() {
  favListHTML.innerHTML = writeFavs();
  const iconArray = document.querySelectorAll(".js-x");
  console.log(iconArray);
  listenIcons(iconArray);
  listenFav();
}

function listenIcons(iconArray) {
  for (const icon of iconArray) {
    icon.addEventListener("click", handleIcon);
  }
}

function listenFav() {
  const liFav = document.querySelectorAll(".js-li-fav");
  for (const fav of liFav) fav.addEventListener("click", handleConsole);
}

//Llamada al localStorage

function onLoad() {
  if (savedFavs) {
    favourites = savedFavs;
    renderFavs();
  }
}
onLoad();

//Relacionado al servidor

function searchAnime() {
  const searchValue = inputSearch.value.toLowerCase();
  fetch(`https://api.jikan.moe/v4/anime?q=${searchValue}`)
    .then((response) => response.json())
    .then((dataReturned) => {
      let dataAnimes = dataReturned.data;
      foundedAnimes = dataAnimes.map(
        ({ mal_id, title, images, airing, url }) => ({
          id: mal_id,
          title: title,
          image: images.jpg.image_url,
          airing: airing,
          url: url,
        })
      );
      console.log(foundedAnimes);
      renderAnime();
      compareArray();
    });
}

//Funciones manejadoras

function handleSearch(event) {
  event.preventDefault();
  searchAnime();
}

function handleReset(event) {
  event.preventDefault();
  localStorage.clear();
  foundedAnimes = [];
  favourites = [];
  inputSearch.value = "";
  renderAnime();
  renderFavs();
}

function handleFav(event) {
  const idSelected = event.currentTarget.id;
  const animeSelected = foundedAnimes.find(
    (anime) => anime.id === parseInt(idSelected)
  );
  const favSelected = favourites.findIndex(
    (fav) => fav.id === parseInt(idSelected)
  );

  console.log(animeSelected);
  console.log(favSelected);

  if (favSelected === -1) {
    favourites.push(animeSelected);
    console.log(favourites);
    compareArray();
  } else {
    favourites.splice(favSelected, 1);
    compareArray();
  }
  saveFav();
  renderFavs();
}

function handleIcon(event) {
  const idSelected = parseInt(event.currentTarget.id);
  console.log(idSelected);
  const iconXIndex = favourites.findIndex(
    (favourite) => favourite.id === idSelected
  );
  console.log(iconXIndex); //para poder hacer el splice (como en ej paletas y en compareArray)

  if (iconXIndex !== -1) {
    favourites.splice(iconXIndex, 1);
  }

  saveFav();
  renderFavs();
  compareArray();
}

function handleConsole(ev) {
  const targetFav = parseInt(ev.currentTarget.id);
  const titleSelected = favourites.findIndex(
    (favourite) => favourite.id === targetFav
  );
  if (titleSelected !== -1) {
    console.log(titleSelected);
    console.log(favourites[titleSelected].title);
  }
}

//Eventos globales

buttonSearch.addEventListener("click", handleSearch);
buttonReset.addEventListener("click", handleReset);
