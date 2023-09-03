//Fetching Elements from DOM
let image = document.getElementById('img');
let Temperature = document.getElementById('Temperature');
let Condition = document.getElementById('Condition');
let Loc = document.getElementById('Loc');
let Wind = document.getElementById('Wind');
let Humidity = document.getElementById('Humidity');
let Feel = document.getElementById('Feel');
let Description = document.getElementById('Description');
let Pressure = document.getElementById('Pressure');
let Lat = document.getElementById('Lat');
let Lon = document.getElementById('Lon');
let Max = document.getElementById('Max');
let Min = document.getElementById('Min');
let rise = document.getElementById('rise');
let set = document.getElementById('set');
let Visibility = document.getElementById('Visibility');
let inp = document.getElementById('inp')
// Weather function
async function weatherReport() {
    // Clearing previous results
    Temperature.innerText = ''
    Condition.innerText = ''
    Loc.innerText = ''
    Lat.innerText = ''
    Lon.innerText = ''
    Wind.innerText = ''
    Humidity.innerText = ''
    Feel.innerText = ''
    Description.innerText = ''
    Pressure.innerText = ''
    Max.innerText = ''
    Min.innerText = ''
    rise.innerText = ''
    set.innerText = ''
    Visibility.innerText = ''
    image.src = ''
    // Fetching weather and location API
    try {
        let place = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inp.value.trim()}&APPID=d092a2d1219fceb3877c07106c328d54&units=metric`)
        place = await place.json()
        let State = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${inp.value.trim()}&APPID=d092a2d1219fceb3877c07106c328d54`)
        State = await State.json()
        // console.log(place)
        // console.log(State)
        // If there is any issue with the  API
        if (place.message === `Internal error`) {
            throw new Error(place.message)
        }
        // If user clicks on search icon without entering anything
        else if (place.cod === '400') {
            Loc.innerText = `Enter a city`
        }
        // If user enters invalid city
        else if (place.cod === '404') {
            Loc.innerText = `Invalid Location`;
        }
        // If user enters everything properly then
        else {
            // Destructruring required properties from JSON object
            let { coord: { lon, lat }, main: { temp, humidity, pressure, temp_min, temp_max, feels_like }, visibility, wind: { speed }, name, sys: { country, sunrise, sunset } } = place
            let [{ main, description, icon }] = place.weather
            let [{ state }] = State;
            // Adding properties to their respective elements
            img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
            Temperature.innerText = `${temp}° C`;
            Condition.innerText = main;
            Loc.innerText = `${name} (${state},${country})`;
            Wind.innerText = `${speed} m/s`
            Humidity.innerText = `${humidity} %`;
            Feel.innerText = `${feels_like}° C`;
            Description.innerText = `${description.slice(0, 1).toUpperCase()}${description.slice(1)}`;
            Pressure.innerText = `${pressure} hPa`;
            Lat.innerText = `Lat ${lat}`;
            Lon.innerText = `Lon ${lon}`;
            Max.innerText = temp_max;
            Min.innerText = temp_min;
            rise.innerText = `Rise ${sunrise}`;
            set.innerText = `Set ${sunset}`;
            Visibility.innerText = `${visibility / 1000} km`;
            if (!state) {
                Loc.innerText = `${name} (${country})`;
            }
            if(!country){
                Loc.innerText = `${name} (${state})`;
            }
            if(!state && !country) { 
                Loc.innerText = `${name}`;
            }
        }
    }
    // If any error while fetching API
    catch (err) {
        Loc.innerText = `Check API or Internet`
    }
}
// After typing in search box user can hit 'Enter' button
inp.addEventListener('keydown', function (event) {
    {
        if (event.key === 'Enter') {
            weatherReport()
        }
    }
})

