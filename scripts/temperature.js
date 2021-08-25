const $temperatureList = document.querySelector('[data-type="temperature"]');
const $cels = document.querySelector('[data-type="cels"]');
const $fahr = document.querySelector('[data-type="fahr"]');
const $feelsLike = document.querySelector('[data-type="feels_like"]');

$temperatureList.addEventListener('click', setTemperature);

function setTemperature(event) {
    if (event.target.dataset.type === 'cels') {
        $cels.classList.add('choosen_temperature');
        $fahr.classList.remove('choosen_temperature');
    }

    if (event.target.dataset.type === 'fahr') {
        $cels.classList.remove('choosen_temperature');
        $fahr.classList.add('choosen_temperature');
    }
}

export function getTemperature() {
    if ($cels.classList.contains('choosen_temperature')) {
        return $cels;
    }
    if ($fahr.classList.contains('choosen_temperature')) {
        return $fahr;
    }
}