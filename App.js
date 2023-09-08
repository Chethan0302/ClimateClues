// Weather function
async function weatherReport() {
    // Fetching weather and location API
    try {
        //Fetching Elements from DOM
        const elementIds = ['img', 'Temperature', 'Condition', 'Loc', 'Wind', 'Humidity', 'Feel', 'Description', 'Pressure', 'Lat', 'Lon', 'Max', 'Min', 'rise', 'set', 'Visibility', 'inp'];
        let weatherData = {};
        elementIds.forEach(id => {
            weatherData[id] = document.getElementById(id);
            if (id === 'img') {
                weatherData[id].src = '';
            }
            else {
                weatherData[id].innerText = '';
            }
        });
        let State = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${inp.value.trim()}&APPID=d092a2d1219fceb3877c07106c328d54`)
        State = await State.json()
        // console.log(State)
        let [{ lat, lon }] = State
        let place = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=d092a2d1219fceb3877c07106c328d54&units=metric`)
        place = await place.json()
        // console.log(place)
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
            Max.innerText = `${temp_max}° C`;
            Min.innerText = `${temp_min}° C`;
            rise.innerText = `Rise ${sunrise}`;
            set.innerText = `Set ${sunset}`;
            Visibility.innerText = `${visibility / 1000} km`;
            if (!state) {
                Loc.innerText = `${name} (${country})`;
            }
            if (!country) {
                Loc.innerText = `${name} (${state})`;
            }
            if (!state && !country) {
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