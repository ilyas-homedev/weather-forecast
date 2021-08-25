import { historyListArray } from './city_searching';

const $historyList = document.querySelector('[data-type="historyList"]');
const $searchInput = document.querySelector('[data-type="input"]');
const $search = document.querySelector('[data-type="search"]');
const $clearHistory = document.querySelector('[data-type="clearHistory"]');
const $historyContainer = document.querySelector('.history');

export function createHistory(historyArray) {
    const list = historyArray.map(item => {
        return `<li class="history__item" data-type="historyItem"><div class="chooseMyCity" data-type="chooseMyCity"></div><p class="cityName">${item}</p><span class="deleteItem" data-type="deleteItem">&times;</span></li>`;
    })
    $historyContainer.classList.add('showHistory');
    $clearHistory.style.display = "block";
    return $historyList.innerHTML = list.join("");
}

export function searchFromHistory(event) {
    if (event.target.dataset.type === 'historyItem') {
        $searchInput.value = event.target.childNodes[1].innerHTML;
        const index = historyListArray.indexOf(`${event.target.childNodes[1].innerHTML}`);
        historyListArray.splice(index, 1);
        $search.click();
    }
    if (event.target.dataset.type === 'deleteItem') {
        deleteItemFromHistory(event);
    }

    if (event.target.dataset.type === 'chooseMyCity') {
        rememberMyCity(event);
    }
}

export function deleteHistory() {
    $historyContainer.classList.remove('showHistory');
    historyListArray.splice(0, historyListArray.length);
}

function deleteItemFromHistory(event) {
    const cityValue = event.target.parentNode.childNodes[1].innerHTML;
    const index = historyListArray.indexOf(`${cityValue}`);
    historyListArray.splice(index, 1);
    if (historyListArray.length === 0) {
        deleteHistory();
    } else {
        createHistory(historyListArray);
    }
}

function rememberMyCity(event) {
    const city = event.target.parentNode;
    const rememberBtn = city.querySelector('[data-type="chooseMyCity"]');
    if (!rememberBtn.classList.contains('remember')) {
        rememberBtn.classList.add('remember');
    } else {
        rememberBtn.classList.remove('remember');
    }
    
}