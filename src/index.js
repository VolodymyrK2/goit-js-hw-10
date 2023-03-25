import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce  from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';
const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector("input#search-box");
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(handleInput,DEBOUNCE_DELAY));

function handleInput(event) {
    const name = event.target.value.trim();
    clearMarkup();
    if (name === '') {
        return;
    };
    fetchCountries(name).then((countries => {
    renderCountriesList(countries);
    })).catch(error => {
        Notify.failure("Oops, there is no country with that name");
           })
}
function renderCountriesList(countries) {
        if (countries.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.");
        return;
    }
    if (countries.length === 1) {
        const markup = countries
            .map(({ flags: { svg: svgFlag }, name: { official: officialName }, capital, population, languages }) => {
                addGapToValue(languages);
        return `<div class = "country-title"><img src="${svgFlag}" alt="${officialName}" width="50">
              <h2>${officialName}</h2></div>
              <p><b>Capital:</b> ${capital}</p>
              <p><b>Population:</b> ${population}</p>
              <p><b>Languages:</b> ${Object.values(languages)}`;
    })
    .join("");
  countryInfoEl.innerHTML = markup;
    }
    if (countries.length <= 10 && countries.length >= 2) {
        const markup = countries
    .map(({ flags: { svg: svgFlag }, name: { official: officialName } }) => {
        return `<li>
           <img src="${svgFlag}" alt="${officialName}" width="50">
              <p>${officialName}</p>
                </li>`;
    })
    .join("");
  countryListEl.innerHTML = markup;  
    }
}
function addGapToValue(obj) {
    const keys = Object.keys(obj);
for (const key of keys) {
    obj[key] = ' '+obj[key];
}
}
function clearMarkup() {
    countryListEl.innerHTML = '';
    countryInfoEl.innerHTML = '';
}