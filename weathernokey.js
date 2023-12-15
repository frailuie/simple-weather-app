const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

const convert = document.querySelector('#toggleFtoC');

search.addEventListener('click', () => {

    const APIKey = 'put your own key';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            const feelsLike = document.querySelector('.weather-details .feels-like span');

            

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'icons/sun.png';
                    break;
            
                case 'Rain':
                    image.src = 'icons/rain.png';
                    break;
            
                case 'Snow':
                    image.src = 'icons/snow.png';
                    break;
            
                case 'Clouds':
                    image.src = 'icons/cloudy.png';
                    break;
            
                case 'Windy':
                    image.src = 'icons/windy.png';
                    break;
            
                case 'Smoke':
                    image.src = 'icons/advisory.png';
                    break;
                
                case 'Tornado':
                    image.src = 'icons/tornado.png';
                    break;

                case 'Haze':
                    image.src = 'icons/fog.png';
                    break;

                case 'Fog':
                    image.src = 'icons/fog.png';
                    break;

                case 'Mist':
                    image.src = 'icons/fog.png';
                    break;

                case 'Drizzle':
                    image.src = 'icons/drizzle.png';
                    break;

                case 'Thunderstorm':
                    image.src = 'icons/thunderstorm.png';
                    break;
            
                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°F</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}m/h`;
            feelsLike.innerHTML = `${parseInt(json.main.feels_like)}<span> °F</span>`;


            convert.addEventListener("change", function FtoC() {
                if (this.checked) {
                    let fahrenheit = parseInt(json.main.temp);
                    let celsius = Math.round((fahrenheit - 32) / 1.8);
                    temperature.innerHTML = `${celsius}<span>°C</span>`;
                
                    let feelsLikeF = parseInt(json.main.feels_like);
                    let feelsLikeC = Math.round((feelsLikeF - 32) / 1.8);
                    feelsLike.innerHTML = `${feelsLikeC}<span>°C</span>`;
                };
            });

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px'; 

        });
        
});






