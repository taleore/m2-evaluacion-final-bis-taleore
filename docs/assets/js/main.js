"use strict";const selectNumber=document.querySelectorAll(".radioNum"),btnStart=document.querySelector(".btn-start");let cardImage=[];const urlImage="https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB.";function numberCard(){for(let e=0;e<selectNumber.length;e++)if(selectNumber[e].checked)return selectNumber[e].value}const getDatafromServer=e=>{e.preventDefault();const t=numberCard();return fetch(`https://raw.githubusercontent.com/Adalab/cards-data/master/${t}.json`).then(e=>e.json()).then(e=>{console.log(e),e=formatData(e),saveDataIncardImage(e),paintCard(),localStorage.setItem("numberSelected",t)})},formatData=e=>{const t=[];for(let a=0;a<e.length;a+=1)t.push({image:e[a].image});return console.log("Format JSON data and return it as array >>> Return",t),t},saveDataIncardImage=e=>{cardImage=e,console.log("Save data in cardImage array >> cardImage",cardImage)},paintCard=()=>{const e=document.querySelector(".showCards__list");let t="";for(let e=0;e<cardImage.length;e++)t+=`<li class="cards__list-card js-card">\n    <img  class="card__img js-card-img " src="${urlImage}">\n    <img class="card__img js-card-img hidden"\n    src="${cardImage[e].image}"></li>`;e.innerHTML=t;const a=document.querySelectorAll(".js-card");for(const e of a)e.addEventListener("click",cardClicked)};function cardClicked(e){const t=e.currentTarget.querySelectorAll(".js-card-img");for(const e of t)e.classList.toggle("hidden")}function getLevelFromLocalStorage(){const e=localStorage.getItem("numberSelected");document.querySelector(`[value="${e}"]`).checked=!0}getLevelFromLocalStorage(),btnStart.addEventListener("click",getDatafromServer);