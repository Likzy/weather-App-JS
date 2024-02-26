const api = {
    key: "52e8b5c99091a553b5d107b500c3a107",
    base: "https://api.openweathermap.org/data/2.5/"
}

const search = document.querySelector(".search");
const btn = document.querySelector(".btn");
btn.addEventListener("click", getInput);

function getInput (event) {
    event.preventDefault();
    if (event.type == "click") {
        getData(search.value);
        // console.log(search.value);
    }
}

function getData () {
    fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`)
        .then(response => {
            return response.json();
        }).then(displayData);
        
}

function displayData (response) {
    console.log(response);
    if (response.cod === "404") {
        const error = document.querySelector(".error");
        error.textContent = "Please enter a valid city";
        search.value = "";
    }else{
        const city = document.querySelector('.city');
        city.innerText = `${response.name}, ${response.sys.country} `;
        
        
        
        const temp = document.querySelector('.temp');
        temp.innerHTML = `Temp: ${Math.round(response.main.temp)} <span>°C</span>`;
        const weather = document.querySelector('.weather');
        weather.innerText = `Weather: ${response.weather[0].main}`;

        const tempRange = document.querySelector('.temp-range');
        tempRange.innerText = `Temp Range: ${Math.round(response.main.temp_min)}°C / ${Math.round(response.main.feels_like)}°C`;

        const weatherIcon = document.querySelector('.weather-icon');
        const iconURL = "http://openweathermap.org/img/w/";
        weatherIcon.src = iconURL + response.weather[0].icon + ".png";

        search.value = "";
    }
}

function dateFunction(d){
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
}


const element = document.querySelector('.main-container');
const rand = Math.floor(Math.random()*100000);
element.style.background = `url(https://picsum.photos/1200/1200)`;
const today = new Date();
const date = document.querySelector('.date');
date.innerText = dateFunction(today);
