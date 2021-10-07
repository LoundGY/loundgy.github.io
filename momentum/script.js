// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  nameF = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  author = document.querySelector('.citation__author'),
  citation = document.querySelector('.citation__text'),
  city = document.querySelector('.weather-inp'),
  date = document.querySelector('.date-time');
let i = Math.floor(Math.random() * (18 + 1));
const base = 'assets/images/';
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let period;
shuffle(images);
// Options
const showAmPm = false;

function getWeekDay(date) {
  let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  return days[date];
}
function getMonth(date) {
  let moths = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
  return moths[date];
}
// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds(),
    day = today.getDate(),
    month = getMonth(today.getMonth()),
    weekDay = getWeekDay(today.getDay());

  // Output Time
  time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} ${showAmPm ? amPm : ''}`;
  date.innerHTML = `${weekDay}, ${day} ${month}`;
  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}
function getPeriod() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
  if (hour < 6) {
    // Night
    period = "night/";
    if (addZero(min) == '00' && addZero(sec) == "00") {
      setBgGreet();
    }
  }
  else if (hour < 12) {
    // Morning
    period = "morning/";
    if (addZero(min) == '00' && addZero(sec) == "00") {
      setBgGreet();
    }
  } else if (hour < 18) {
    // Afternoon
    period = "day/";
    if (addZero(min) == '00' && addZero(sec) == "00") {
      setBgGreet();
    }
  } else {
    // Evening
    period = "evening/";
    if (addZero(min) == '00' && addZero(sec) == "00") {
      setBgGreet();
    }
  }
  setTimeout(getPeriod, 1000);
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();
  if (hour < 6) {
    // Night
    getImage();
    greeting.textContent = 'Доброй ночи, ';
  }
  else if (hour < 12) {
    // Morning
    getImage();
    greeting.textContent = 'Доброе утро, ';
  } else if (hour < 18) {
    // Afternoon
    getImage();
    greeting.textContent = 'Добрый день, ';
  } else {
    // Evening
    getImage();
    greeting.textContent = 'Добрый вечер, ';
  }
  setTimeout(setBgGreet, 1000 * 60 * 60);
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    nameF.value = '';
  } else {
    nameF.value = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (nameF.value.length > 0) {
        localStorage.setItem('name', nameF.value);
        nameF.blur();
      } else {
        nameF.value = localStorage.getItem('name');
      }
    }
  } else {
    if (nameF.value.length > 0) {
      localStorage.setItem('name', nameF.value);
    } else {
      nameF.value = localStorage.getItem('name');
    }
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.value = '';
  } else {
    focus.value = localStorage.getItem('focus');
  }
}
//shuffle array
function shuffle(arr) {
  var j, temp;
  for (var i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}
// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (focus.value.length > 0) {
        localStorage.setItem('focus', e.target.value);
        focus.blur();
      } else {
        focus.value = localStorage.getItem('focus');
      }
    }
  } else {
    if (focus.value.length > 0) {
      localStorage.setItem('focus', e.target.value);
    }
    else {
      focus.value = localStorage.getItem('focus');
    }
  }
}
function viewBgImage(data) {
  const body = document.querySelector('body');
  const src = data;
  const img = document.createElement('img');
  img.src = src;
  img.onload = () => {
    body.style.backgroundImage = `url(${src})`;
  };
}
function getImage() {
  const index = i % images.length;
  const imageSrc = base + period + images[index];
  viewBgImage(imageSrc);
  i++;
  bgImg.disabled = true;
  setTimeout(function () { bgImg.disabled = false }, 1000);
}

function getCitation() {
  let request = new XMLHttpRequest(),
    url = "https://quote-garden.herokuapp.com/api/v2/quotes/random";
  request.open('GET', url);
  request.responseType = 'text';
  request.onload = function () {
    let a = JSON.parse(request.response);
    citation.innerHTML = a["quote"]["quoteText"];
    author.innerHTML = a["quote"]["quoteAuthor"];
  };
  request.send();
  bgCit.disabled = true;
  setTimeout(function () { bgCit.disabled = false }, 1000);
}
//get city for weather
function getCity() {
  if (localStorage.getItem('city') === null) {
    city.value = '';
  } else {
    city.value = localStorage.getItem('city');
    getWeather();
  }
}

// Set Name
function setCity(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (city.value.length > 0) {
        localStorage.setItem('city', city.value);
        city.blur();
        getWeather();
      } else {
        city.value = localStorage.getItem('city');
      }
    }
  } else {
    if (city.value.length > 0) {
      localStorage.setItem('city', city.value);
      getWeather();
    } else {
      city.value = localStorage.getItem('city');
    }
  }
}

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=`+city.value+`&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
}

const bgImg = document.querySelector('.bg-img'),
  bgCit = document.querySelector('.bg-citation');

bgImg.addEventListener('click', getImage);
bgCit.addEventListener('click', getCitation);
nameF.addEventListener('keypress', setName);
nameF.addEventListener('blur', setName);
city.addEventListener('blur', setCity);
city.addEventListener('keypress', setCity);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Run
getPeriod();
showTime();
setBgGreet();
getCity();
getName();
getFocus();
getCitation();