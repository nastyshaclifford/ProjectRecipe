const WEATHER_API_KEY = '5198b692fb4bbe012667fee277eb1b13';
export async function getWeather(lat, lon) {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=ru`);
        const data = await res.json();
        if (data.cod !== 200) throw new Error(data.message);
        return data;
    } catch (error) {
        console.error('Ошибка при получении погоды:', error);
        return null;
    }
}