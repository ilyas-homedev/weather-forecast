import {apiKey} from './config';
import { getTemperature } from "./temperature";
import { createHistory } from './history';
import { languages } from './languages';

const $form = document.querySelector('[data-type="form"]');
const $searchInput = document.querySelector('[data-type="input"]');
const $search = document.querySelector('[data-type="search"]');
const $header = document.querySelector('.forecast__header');
const $description = document.querySelector('.forecast__description');

export const historyListArray = [];

$form.addEventListener('submit', findCity)

export function findCity(event) {
    event.preventDefault();
    const inputVal = $searchInput.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const selectedDegree = getTemperature();
        appendData(event, data, selectedDegree);
    })
    .catch((error) => {
        console.log(error.message);
    })
}

let langItem = languages[1];
export function currentItem(item) {
    const $currentCity = document.querySelector('[data-type="current-city"]');
    langItem = item;
    if ($currentCity) {
        $searchInput.value = $currentCity.textContent;
        $search.click();
    }
}

export function appendData(event, data, selectedDegree) {
    if (data.cod === '404') {
        return;
    }

    console.log(data);

    $searchInput.value = '';

    const shortDes = data.weather[0].description.toUpperCase();

    if (!historyListArray.includes(data.name.toUpperCase())) {
        historyListArray.unshift(data.name.toUpperCase());
        createHistory(historyListArray);
    }

    $header.innerHTML = `
    <h1 data-type="current-city">${data.name}</h1>
    <p data-type="dateAndTime"></p>
    `;
    
    setInterval(getDateOfTimezone(data.timezone), 1000);

    $description.innerHTML = `
    <p>${shortDes}</p>
    <p data-type="feels_like">${langItem.feelsLike}: ${data.main.feels_like} ${selectedDegree.innerHTML}</p>
    <p data-type="humidity">${langItem.humidity}: ${data.main.humidity}%</p>
    <p data-type="wind">${langItem.wind}: ${data.wind.speed} m/s</p>
    `;
}

function getDateOfTimezone(timezone) {
    let date = new Date();
    let milliseconds = date.getTime();
    milliseconds += (timezone * 1000 - 7200000);
    let cityDate = new Date(milliseconds);

    let currDate = cityDate.getDate();
    let month = cityDate.getMonth();
    let monthString = langItem.months[month];
    let day = cityDate.getDay();
    let dayString = langItem.daysOfWeek[day];
    let hours = cityDate.getHours();
    hours = hours.toString().split('');
    if (hours.length === 1) {
        hours.unshift('0');
    }
    let minutes = cityDate.getMinutes();
    minutes = minutes.toString().split('');
    if (minutes.length === 1) {
        minutes.unshift('0');
    }
    let seconds = cityDate.getSeconds();
    seconds = seconds.toString().split('');
    if (seconds.length === 1) {
        seconds.unshift('0');
    }
    
    const dateAndTime = document.querySelector('[data-type="dateAndTime"]');
    dateAndTime.innerHTML = `${dayString} ${currDate} ${monthString} ${hours.join('')}:${minutes.join('')}<span class="secondSemicolon">:</span>${seconds.join('')}`;
}
