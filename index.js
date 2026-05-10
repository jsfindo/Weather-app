function askUserForCity(){
    const city = prompt("Enter City: ")
    return city
}

async function findCoordinates(city){
    try{
    const GeoURL =`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
    const geoResponse = await fetch(GeoURL);
    const geoData = await geoResponse.json()

    if (!geoData.results) {
            console.log("City not found!");
            return;
}

    

    const { latitude, longitude, name, country } = geoData.results[0];
        console.log(`Found: ${name}, ${country} (${latitude}, ${longitude})`)
    
    return { latitude, longitude, name, country }
} catch (error) {
        console.error("Something went wrong:", error);
}
}


async function getWeatherdata({ latitude, longitude, name, country }){

    try{
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();


        const temp = weatherData.current.temperature_2m;
        console.log(`The current temperature in ${name} is ${temp}°C`)






    }catch (error) {
        console.error("Something went wrong:", error);
}





}



async function main(){
    try{
        const city = askUserForCity()
        const locationData = await findCoordinates(city)
        await getWeatherdata(locationData)
    }catch(error){
        console.error("Something went wrong:", error)
    }
}


main()