import { languages } from './languages';
import { currentItem } from './city_searching';

const $select = document.querySelector('[data-type="select"]');
const $list = document.querySelector('[data-type="list"]');
const $overlay = document.querySelector('.overlay');
const $langTitle = document.querySelector('[data-type="langTitle"]')
const $pageTitle = document.querySelector('[data-type="pageTitle"]');
const $bgBtn = document.querySelector('[data-type="bgBtn"]');
const $arrow = $select.querySelector('[data-type="arrow"]');
const $searchInput = document.querySelector('[data-type="input"]');
const $clearHistoryPrompt = document.querySelector('[data-type="clear-history-prompt"]');

const defaultLang = languages[1];

$langTitle.textContent = defaultLang.title;
$pageTitle.textContent = defaultLang.pageTitle;
$searchInput.setAttribute('placeholder', `${defaultLang.searchInput}`);
$clearHistoryPrompt.innerHTML = defaultLang.clearHistory;

export function select(event) {
    if ($list.classList.contains('opened')) {
        close();
    } else {
        open();
    }

    if (event.target.dataset.type === 'overlay') {
        close();
    }

    if (event.target.dataset.type === 'item') {
        selectItem(event.target.id);
        close();
    }
}

function open() {
    $list.classList.add('opened');
    $select.classList.add('border-bottom');
    $overlay.classList.add('shown');
    $arrow.classList.remove('fa-chevron-down');
    $arrow.classList.add('fa-chevron-up');
}

function close() {
    $list.classList.remove('opened');
    $select.classList.remove('border-bottom');
    $overlay.classList.remove('shown');
    $arrow.classList.remove('fa-chevron-up');
    $arrow.classList.add('fa-chevron-down');
}

export function createList(options) {
    const items = options.map(item => {
        return `<li class="item" id="${item.id}" data-type="item">${item.title}</li>`;
    });
    const ul = document.querySelector('ul');
    return ul.innerHTML = items.join('')
}

function selectItem(id) {
    languages.forEach(item => {
        if (item.id === id) {
            currentItem(item);
            $langTitle.textContent = item.title;
            $pageTitle.textContent = item.pageTitle;
            $bgBtn.textContent = item.bgBtn;
            $searchInput.setAttribute('placeholder', `${item.searchInput}`);
            $clearHistoryPrompt.innerHTML = item.clearHistory;
        }
    })
}
