const result = document.querySelector('.result');
const form = document.querySelector('.get-weather');
const nameCity = document.querySelector('#city');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (nameCity.value === '') {
        showError('¡Vacío!');
        return;
    }

    callAPI(nameCity.value);
})


function callAPI(city){
    const apiId = '41d1d7f5c2475b3a16167b30bc4f265c';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiId}`;
    fetch(url)
        .then(data => {
            return data.json()
        })
        .then(dataJSON => {
            if (dataJSON.cod === '404') {
                showError('Ciudad no encontrada...');
            } else {
                clearHTML();
                showWeather(dataJSON);
            }
        })
        .catch(error => {
            console.log(error);
        })
}

function showWeather(data){
    const {
        name, main:{
            temp, 
            temp_min,
            temp_max},
            dt, 
            weather:[arr]} = data;
    //const day = new Date(dt)
    const degrees = kelvinToCentigrade(temp);
    const min = kelvinToCentigrade(temp_min);
    const max = kelvinToCentigrade(temp_max);

    const content = document.createElement('div');
    content.innerHTML = `
        <div class=container>
            <h5>weather in ${name}</h5>
            <div class="img">
                <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
            </div>
            <h2>${degrees}°C</h2>
            <p>Max: ${max}°C</p>
            <p>Min: ${min}°C</p>
        </div>
    `;

    result.appendChild(content);
}

function showError(message){
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

function kelvinToCentigrade(temp){
    return parseInt(temp - 273.15);
}

function clearHTML(){
    result.innerHTML = '';
}