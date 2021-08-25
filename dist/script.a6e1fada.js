// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/languages.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.languages = void 0;
var languages = [{
  id: '1',
  title: 'RU',
  bgBtn: 'Заставка',
  pageTitle: 'Прогноз погоды',
  searchInput: 'Поиск',
  feelsLike: 'ОЩУЩАЕТСЯ КАК',
  humidity: 'ВЛАЖНОСТЬ',
  wind: 'ВЕТЕР',
  clearHistory: 'Очистить историю',
  daysOfWeek: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  months: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']
}, {
  id: '2',
  title: 'EN',
  bgBtn: 'Background',
  pageTitle: "Weather forecast",
  searchInput: 'Search',
  feelsLike: 'FEELS LIKE',
  humidity: 'HUMIDITY',
  wind: 'WIND',
  clearHistory: 'Clear history',
  daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  months: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
}];
exports.languages = languages;
},{}],"scripts/temperature.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTemperature = getTemperature;
var $temperatureList = document.querySelector('[data-type="temperature"]');
var $cels = document.querySelector('[data-type="cels"]');
var $fahr = document.querySelector('[data-type="fahr"]');
var $feelsLike = document.querySelector('[data-type="feels_like"]');
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

function getTemperature() {
  if ($cels.classList.contains('choosen_temperature')) {
    return $cels;
  }

  if ($fahr.classList.contains('choosen_temperature')) {
    return $fahr;
  }
}
},{}],"scripts/history.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHistory = createHistory;
exports.searchFromHistory = searchFromHistory;
exports.deleteHistory = deleteHistory;

var _city_searching = require("./city_searching");

var $historyList = document.querySelector('[data-type="historyList"]');
var $searchInput = document.querySelector('[data-type="input"]');
var $search = document.querySelector('[data-type="search"]');
var $clearHistory = document.querySelector('[data-type="clearHistory"]');
var $historyContainer = document.querySelector('.history');

function createHistory(historyArray) {
  var list = historyArray.map(function (item) {
    return "<li class=\"history__item\" data-type=\"historyItem\"><div class=\"chooseMyCity\" data-type=\"chooseMyCity\"></div><p class=\"cityName\">".concat(item, "</p><span class=\"deleteItem\" data-type=\"deleteItem\">&times;</span></li>");
  });
  $historyContainer.classList.add('showHistory');
  $clearHistory.style.display = "block";
  return $historyList.innerHTML = list.join("");
}

function searchFromHistory(event) {
  if (event.target.dataset.type === 'historyItem') {
    $searchInput.value = event.target.childNodes[1].innerHTML;

    var index = _city_searching.historyListArray.indexOf("".concat(event.target.childNodes[1].innerHTML));

    _city_searching.historyListArray.splice(index, 1);

    $search.click();
  }

  if (event.target.dataset.type === 'deleteItem') {
    deleteItemFromHistory(event);
  }

  if (event.target.dataset.type === 'chooseMyCity') {
    rememberMyCity(event);
  }
}

function deleteHistory() {
  $historyContainer.classList.remove('showHistory');

  _city_searching.historyListArray.splice(0, _city_searching.historyListArray.length);
}

function deleteItemFromHistory(event) {
  var cityValue = event.target.parentNode.childNodes[1].innerHTML;

  var index = _city_searching.historyListArray.indexOf("".concat(cityValue));

  _city_searching.historyListArray.splice(index, 1);

  if (_city_searching.historyListArray.length === 0) {
    deleteHistory();
  } else {
    createHistory(_city_searching.historyListArray);
  }
}

function rememberMyCity(event) {
  var city = event.target.parentNode;
  var rememberBtn = city.querySelector('[data-type="chooseMyCity"]');

  if (!rememberBtn.classList.contains('remember')) {
    rememberBtn.classList.add('remember');
  } else {
    rememberBtn.classList.remove('remember');
  }
}
},{"./city_searching":"scripts/city_searching.js"}],"scripts/city_searching.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findCity = findCity;
exports.currentItem = currentItem;
exports.appendData = appendData;
exports.historyListArray = void 0;

var _temperature = require("./temperature");

var _history = require("./history");

var _languages = require("./languages");

var $form = document.querySelector('[data-type="form"]');
var $searchInput = document.querySelector('[data-type="input"]');
var $search = document.querySelector('[data-type="search"]');
var $header = document.querySelector('.forecast__header');
var $description = document.querySelector('.forecast__description');
var historyListArray = [];
exports.historyListArray = historyListArray;
$form.addEventListener('submit', findCity);

function findCity(event) {
  event.preventDefault();
  var inputVal = $searchInput.value;
  var apiKey = 'de29390a32a003bb4da54a21b0abe2bc';
  var url = "https://api.openweathermap.org/data/2.5/weather?q=".concat(inputVal, "&appid=").concat(apiKey, "&units=metric");
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (data) {
    var selectedDegree = (0, _temperature.getTemperature)();
    appendData(event, data, selectedDegree);
  }).catch(function (error) {
    console.log(error.message);
  });
}

var langItem = _languages.languages[1];

function currentItem(item) {
  var $currentCity = document.querySelector('[data-type="current-city"]');
  langItem = item;

  if ($currentCity) {
    $searchInput.value = $currentCity.textContent;
    $search.click();
  }
}

function appendData(event, data, selectedDegree) {
  if (data.cod === '404') {
    return;
  }

  console.log(data);
  $searchInput.value = '';
  var shortDes = data.weather[0].description.toUpperCase();

  if (!historyListArray.includes(data.name.toUpperCase())) {
    historyListArray.unshift(data.name.toUpperCase());
    (0, _history.createHistory)(historyListArray);
  }

  $header.innerHTML = "\n    <h1 data-type=\"current-city\">".concat(data.name, "</h1>\n    <p data-type=\"dateAndTime\"></p>\n    ");
  setInterval(getDateOfTimezone(data.timezone), 1000);
  $description.innerHTML = "\n    <p>".concat(shortDes, "</p>\n    <p data-type=\"feels_like\">").concat(langItem.feelsLike, ": ").concat(data.main.feels_like, " ").concat(selectedDegree.innerHTML, "</p>\n    <p data-type=\"humidity\">").concat(langItem.humidity, ": ").concat(data.main.humidity, "%</p>\n    <p data-type=\"wind\">").concat(langItem.wind, ": ").concat(data.wind.speed, " m/s</p>\n    ");
}

function getDateOfTimezone(timezone) {
  var date = new Date();
  var milliseconds = date.getTime();
  milliseconds += timezone * 1000 - 7200000;
  var cityDate = new Date(milliseconds);
  var currDate = cityDate.getDate();
  var month = cityDate.getMonth();
  var monthString = langItem.months[month];
  var day = cityDate.getDay();
  var dayString = langItem.daysOfWeek[day];
  var hours = cityDate.getHours();
  hours = hours.toString().split('');

  if (hours.length === 1) {
    hours.unshift('0');
  }

  var minutes = cityDate.getMinutes();
  minutes = minutes.toString().split('');

  if (minutes.length === 1) {
    minutes.unshift('0');
  }

  var seconds = cityDate.getSeconds();
  seconds = seconds.toString().split('');

  if (seconds.length === 1) {
    seconds.unshift('0');
  }

  var dateAndTime = document.querySelector('[data-type="dateAndTime"]');
  dateAndTime.innerHTML = "".concat(dayString, " ").concat(currDate, " ").concat(monthString, " ").concat(hours.join(''), ":").concat(minutes.join(''), "<span class=\"secondSemicolon\">:</span>").concat(seconds.join(''));
}
},{"./temperature":"scripts/temperature.js","./history":"scripts/history.js","./languages":"scripts/languages.js"}],"scripts/select.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.select = select;
exports.createList = createList;

var _languages = require("./languages");

var _city_searching = require("./city_searching");

var $select = document.querySelector('[data-type="select"]');
var $list = document.querySelector('[data-type="list"]');
var $overlay = document.querySelector('.overlay');
var $langTitle = document.querySelector('[data-type="langTitle"]');
var $pageTitle = document.querySelector('[data-type="pageTitle"]');
var $bgBtn = document.querySelector('[data-type="bgBtn"]');
var $arrow = $select.querySelector('[data-type="arrow"]');
var $searchInput = document.querySelector('[data-type="input"]');
var $clearHistoryPrompt = document.querySelector('[data-type="clear-history-prompt"]');
var defaultLang = _languages.languages[1];
$langTitle.textContent = defaultLang.title;
$pageTitle.textContent = defaultLang.pageTitle;
$searchInput.setAttribute('placeholder', "".concat(defaultLang.searchInput));
$clearHistoryPrompt.innerHTML = defaultLang.clearHistory;

function select(event) {
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

function createList(options) {
  var items = options.map(function (item) {
    return "<li class=\"item\" id=\"".concat(item.id, "\" data-type=\"item\">").concat(item.title, "</li>");
  });
  var ul = document.querySelector('ul');
  return ul.innerHTML = items.join('');
}

function selectItem(id) {
  _languages.languages.forEach(function (item) {
    if (item.id === id) {
      (0, _city_searching.currentItem)(item);
      $langTitle.textContent = item.title;
      $pageTitle.textContent = item.pageTitle;
      $bgBtn.textContent = item.bgBtn;
      $searchInput.setAttribute('placeholder', "".concat(item.searchInput));
      $clearHistoryPrompt.innerHTML = item.clearHistory;
    }
  });
}
},{"./languages":"scripts/languages.js","./city_searching":"scripts/city_searching.js"}],"scripts/recognition.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recognize = recognize;
exports.clearInput = clearInput;
var $input = document.querySelector('[data-type="input"]');
var $langTitle = document.querySelector('[data-type="langTitle"]');
var recognition = new webkitSpeechRecognition();
recognition.interimResults = true;

function recognitionLang() {
  if ($langTitle.textContent === 'EN') {
    return recognition.lang = 'en-US';
  }

  ;

  if ($langTitle.textContent === 'RU') {
    return recognition.lang = 'ru-RU';
  }

  ;
}

function recognize() {
  recognitionLang();
  recognition.addEventListener('result', function (e) {
    var text = e.results[0][0].transcript;
    $input.value = text;
    console.log($input.textContent);
  });
  recognition.start();
}

function clearInput() {
  $input.value = '';
}
},{}],"scripts/script.js":[function(require,module,exports) {
"use strict";

var _languages = require("./languages");

var _select = require("./select");

var _recognition = require("./recognition");

var _history = require("./history");

require("./city_searching");

require("./temperature");

// VARIABLES
// Select language btn
var $select = document.querySelector('[data-type="select"]');
var $list = document.querySelector('[data-type="list"]');
var $overlay = document.querySelector('.overlay'); // Search input

var $microphone = document.querySelector('[data-type="microphone"]');
var $crossTimes = document.querySelector('[data-type="cross"]'); // History

var $historyList = document.querySelector('[data-type="historyList"]');
var $clearHistory = document.querySelector('[data-type="clearHistory"]');
var $rememberCity = document.querySelector('[data-type="chooseMyCity"]'); // LISTENERS
// Select listeners

$select.addEventListener('click', _select.select);
$list.addEventListener('click', _select.select);
$overlay.addEventListener('click', _select.select); // Search input listeners

$microphone.addEventListener('click', _recognition.recognize);
$crossTimes.addEventListener('click', _recognition.clearInput); // History listeners

$historyList.addEventListener('click', _history.searchFromHistory);
$clearHistory.addEventListener('click', _history.deleteHistory);
(0, _select.createList)(_languages.languages);
},{"./languages":"scripts/languages.js","./select":"scripts/select.js","./recognition":"scripts/recognition.js","./history":"scripts/history.js","./city_searching":"scripts/city_searching.js","./temperature":"scripts/temperature.js"}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49327" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/script.js"], null)
//# sourceMappingURL=/script.a6e1fada.js.map