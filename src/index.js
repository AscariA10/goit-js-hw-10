import Notiflix from 'notiflix';
import './css/styles.css';
import { countryFetch } from './countryFetch.js';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const placeForCountryCard = document.querySelector('.country-info');
const placeForCountryList = document.querySelector('.country-list');
const userInput = document.querySelector('#search-box');

userInput.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
   placeForCountryList.innerHTML = '';
   placeForCountryCard.innerHTML = '';
   if (event.target.value.length > 0) {
      countryFetch(event.target.value.trim())
         .then(info => {
            if (info.length > 10) {
               Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            } else if (info.length >= 2 && info.length <= 10) {
               placeForCountryList.innerHTML = '';
               placeForCountryList.insertAdjacentHTML('afterbegin', coutryListRender(info));
            } else {
               placeForCountryList.innerHTML = '';
               placeForCountryCard.innerHTML = '';
               placeForCountryCard.insertAdjacentHTML('afterbegin', countryCardRender(info[0]));
            }
         })
         .catch(err => console.log(err));
   }
}

// function countryFetch(countryName) {
//    return fetch(`${BASIC_URL}${countryName}${MY_FILTERS}`)
//       .then(data => {
//          return data.json();
//       })

//       .catch(err => console.log(err));
// }

function countryCardRender(country) {
   let card = `<div>
    <h2>${country.name.official}</h2>
    <img src="${country.flags.svg}" alt="${country.name.official}" width=200>
    <h3>Capital: ${country.capital}</h3>
  <h3>Population ${country.population}</h3>
  <h3>Languages: ${Object.values(country.languages)}</h3>
  </div>`;
   return card;
}

function coutryListRender(listOfCountries) {
   let listMarkup = listOfCountries.map(country => {
      return `<li><img src="${country.flags.svg}" alt="${country.name.official}" width=100><h2>${country.name.official}</h2></li>`;
   });
   return listMarkup;
}
