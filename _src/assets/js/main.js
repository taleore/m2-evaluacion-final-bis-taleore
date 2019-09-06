"use strict";

const selectNumber = document.querySelectorAll(".radioNum");
const btnStart = document.querySelector(".btn-start");
let cardImage = [];
const urlImage =
  "https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB.";

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
      image: data[i].image
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

const paintCard = () => {
  const cardList = document.querySelector(".showCards__list");
  let htmlCode = "";
  for (let cardIndex = 0; cardIndex < cardImage.length; cardIndex++) {
    htmlCode += `<li class="cards__list-card js-card">
    <img  class="card__img js-card-img " src="${urlImage}">
    <img class="card__img js-card-img hidden"
    src="${cardImage[cardIndex].image}"></li>`;
  }
  cardList.innerHTML = htmlCode;

  const cardsArray = document.querySelectorAll(".js-card");
  for (const item of cardsArray) {
    item.addEventListener("click", cardClicked);
  }
};

function cardClicked(event) {
  const clickedImage = event.currentTarget.querySelectorAll(".js-card-img");
  for (const item of clickedImage) {
    item.classList.toggle("hidden");
  }
}

function getLevelFromLocalStorage() {
  const numberSelected = localStorage.getItem("numberSelected");
  const radioToSelect = document.querySelector(`[value="${numberSelected}"]`);
  radioToSelect.checked = true;
}
getLevelFromLocalStorage();

btnStart.addEventListener("click", getDatafromServer);
