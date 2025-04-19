const btnRandomRecipe = document.getElementById('loadRandomRecipeBtn');
const btnWeatherRecipe = document.getElementById('loadWeatherRecipeBtn');
const recipeContainer = document.getElementById('recipeContainer');
const weatherContainer = document.getElementById('weatherContainer');

import { getRecipe } from "./api/recipesAPI.js";
import { translateText } from "./api/translateAPI.js";
import { getWeather } from "./api/weatherAPI.js";

btnRandomRecipe.addEventListener('click', async () => {
    recipeContainer.innerHTML = '<div class="card">Загрузка...</div>';

    try {
        const res = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=e7889d5a7e1842fdaf440b0a8b547ac8&number=1`);
        const data = await res.json();
        const recipe = data.recipes[0];

        const translatedTitle = await translateText(recipe.title);
        const translatedInstructions = recipe.instructions
            ? await translateText(recipe.instructions)
            : 'Нет инструкций 😢';

        recipeContainer.innerHTML =
            `<div class="card">
                <h2>${translatedTitle}</h2>
                <img src="${recipe.image}" alt="${translatedTitle}">
                <p>${translatedInstructions}</p>
            </div>`;
    } catch (error) {
        recipeContainer.innerHTML = '<div class="card">Ошибка при загрузке рецепта 😔</div>';
        console.error(error);
    }
});

btnWeatherRecipe.addEventListener('click', async () => {
    weatherContainer.innerHTML = '<div class="card">Загрузка...</div>';

    navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const weather = await getWeather(latitude, longitude);

        if (!weather) {
            weatherContainer.innerHTML = '<div class="card">Не удалось получить погоду.</div>';
            return;
        }

        let recipeType = 'random';
        const temp = weather.main.temp;
        const condition = weather.weather[0].main.toLowerCase();

        if (temp < 20 || condition === 'rain' || condition === 'snow') {
            recipeType = 'soup';
        } else if (temp >= 20 || condition === 'clear') {
            recipeType = 'salad';
        }

        const recipe = await getRecipe(recipeType);

        if (recipe) {
            const translatedTitle = await translateText(recipe.title);
            const translatedInstructions = recipe.instructions
                ? await translateText(recipe.instructions)
                : 'Нет инструкций 😢';

            weatherContainer.innerHTML =
                `<div class="card">
                    <h2>Погода: ${weather.main.temp}°C, ${weather.weather[0].description}</h2>
                    <h3>Блюдо: ${translatedTitle}</h3>
                    <img src="${recipe.image}" alt="${translatedTitle}">
                    <p>${translatedInstructions}</p>
                </div>`;
        } else {
            weatherContainer.innerHTML = '<div class="card">Не удалось найти рецепт 😔</div>';
        }
    }, (error) => {
        console.error('Ошибка геолокации:', error);
        weatherContainer.innerHTML = '<div class="card">Не удалось получить местоположение.</div>';
    });
});

document.addEventListener("DOMContentLoaded", () => {
    fetch('./components/header.html')
      .then(res => res.text())
      .then(data => {
        document.getElementById('header').innerHTML = data;
      });
  
    fetch('./components/footer.html')
      .then(res => res.text())
      .then(data => {
        document.getElementById('footer').innerHTML = data;
      });
  });
  