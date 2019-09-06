"use strict";

const selectNumber = document.querySelectorAll(".radioNum");
const btnStart = document.querySelector(".btn-start");
let cardImage = [];
const urlImage =
  "https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB.";
let pairNumber = [];

function numberCard() {
  for (let i = 0; i < selectNumber.length; i++) {
    if (selectNumber[i].checked) {
      return selectNumber[i].value;
    }
  }
}

const getDatafromServer = ev => {
  ev.preventDefault();
  const cardNumber = numberCard();

  const url = `https://raw.githubusercontent.com/Adalab/cards-data/master/${cardNumber}.json`;
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      data = formatData(data);
      saveDataIncardImage(data);
      paintCard();
      localStorage.setItem("numberSelected", cardNumber);
    });
};

const formatData = data => {
  const searchResult = [];
  for (let i = 0; i < data.length; i = i + 1) {
    searchResult.push({
      image: data[i].image,
      pair: data[i].pair
    });
  }
  console.log(
    "Format JSON data and return it as array >>> Return",
    searchResult
  );
  return searchResult;
};

const saveDataIncardImage = data => {
  cardImage = data;
  console.log("Save data in cardImage array >> cardImage", cardImage);
};

//cardImage[cardIndex].image(para que salgan los pokemon)
const paintCard = () => {
  const cardList = document.querySelector(".showCards__list");
  let htmlCode = "";
  for (let cardIndex = 0; cardIndex < cardImage.length; cardIndex++) {
    htmlCode += `<li class="cards__list-card js-card">
    <img  class="card__img back js-card-img " src="${urlImage}">
    <img class="card__img  front js-card-img hidden"
    src="${cardImage[cardIndex].image}" data-pair="${cardImage[cardIndex].pair}"></li>`;
  }
  cardList.innerHTML = htmlCode;
  //pruebas
  const cardsArray = document.querySelectorAll(".js-card");
  for (const item of cardsArray) {
    item.addEventListener("click", cardClicked);
  }
};

//cambio de carta
function cardClicked(event) {
  const clickedImageBack = event.currentTarget.querySelector(".back");
  const clickedImageFront = event.currentTarget.querySelector(".front");
  clickedImageBack.classList.toggle("hidden");
  clickedImageFront.classList.toggle("hidden");

  //bonus
  pairNumber.push(clickedImageFront.dataset.pair);
  console.log(pairNumber);

  if (pairNumber.length === 2) {
    comparePair();
  }

  function comparePair() {
    if (pairNumber[0] === pairNumber[1]) {
      console.log("Bien");
    } else {
      console.log("Mal");
    }
  }
}

btnStart.addEventListener("click", getDatafromServer);

function getLevelFromLocalStorage() {
  const numberSelected = localStorage.getItem("numberSelected");
  const radioToSelect = document.querySelector(`[value="${numberSelected}"]`);
  radioToSelect.checked = true;
}
getLevelFromLocalStorage();
