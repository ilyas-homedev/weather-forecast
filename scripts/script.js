import { languages } from './languages';
import { select, createList } from './select';
import { recognize, clearInput } from './recognition';
import { searchFromHistory, deleteHistory } from './history';
import './city_searching';
import './temperature';

// VARIABLES
// Select language btn
const $select = document.querySelector('[data-type="select"]');
const $list = document.querySelector('[data-type="list"]');
const $overlay = document.querySelector('.overlay');
// Search input
const $microphone = document.querySelector('[data-type="microphone"]');
const $crossTimes = document.querySelector('[data-type="cross"]');

// History
const $historyList = document.querySelector('[data-type="historyList"]');
const $clearHistory = document.querySelector('[data-type="clearHistory"]');
const $rememberCity = document.querySelector('[data-type="chooseMyCity"]');

// LISTENERS
// Select listeners
$select.addEventListener('click', select);
$list.addEventListener('click', select);
$overlay.addEventListener('click', select);
// Search input listeners
$microphone.addEventListener('click', recognize);
$crossTimes.addEventListener('click', clearInput);
// History listeners
$historyList.addEventListener('click', searchFromHistory);
$clearHistory.addEventListener('click', deleteHistory);

createList(languages);

