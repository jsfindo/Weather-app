function askUserForCity(){
    const city = prompt("Enter City: ")
}

async function findCoordinates(city){
    const GeoURL =`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json()

    if (!geoData.results) {
            console.log("City not found!");
            return;
}