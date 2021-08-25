const $input = document.querySelector('[data-type="input"]');
const $langTitle = document.querySelector('[data-type="langTitle"]')

const recognition = new webkitSpeechRecognition();
recognition.interimResults = true;

function recognitionLang() {
    if ($langTitle.textContent === 'EN') {
        return recognition.lang = 'en-US';
    };
    if ($langTitle.textContent === 'RU') {
        return recognition.lang = 'ru-RU';
    };
}


export function recognize() {
    recognitionLang();

    recognition.addEventListener('result', (e) => {
        const text = e.results[0][0].transcript;
        $input.value = text;
        console.log($input.textContent);
    })

    recognition.start();
}

export function clearInput() {
    $input.value = '';
}