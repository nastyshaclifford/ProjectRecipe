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

        // const favorites = JSON.parse(localStorage.getItem('favorites'));

        const translatedTitle = await translateText(recipe.title);
        const translatedInstructions = recipe.instructions
            ? await translateText(recipe.instructions)
            : 'Нет инструкций 😢';

            const heartSvg = `
            <svg enable-background="new 0 0 50 50" height="50px" version="1.1" viewBox="0 0 50 50" width="50px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <rect fill="none" height="50" width="50"/>
                <path d="M35,8  c-4.176,0-7.851,2.136-10,5.373C22.851,10.136,19.176,8,15,8C8.373,8,3,13.373,3,20c0,14,16,21,22,26c6-5,22-12,22-26  C47,13.373,41.627,8,35,8z" fill="currentColor" stroke="red" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>
            </svg>
        `
        // const foundRecipe = favorites.find((item) => item.id === recipe.id);
        recipeContainer.innerHTML =
            `<div class="card">
                <h2>${translatedTitle}</h2>
                <img src="${recipe.image}" alt="${translatedTitle}">
                <p>${translatedInstructions}</p>
                <button id="heart">${heartSvg}</button>
            </div>`;
            
            const heartButtons = document.querySelectorAll('#heart');
            heartButtons.forEach((button) => {
                button.addEventListener("click", function(event){
                    // const recipe = JSON.parse(decodeURIComponent(this.dataset.recipe));
                    const favoritesRecipe = JSON.parse(localStorage.getItem('favorites')) || [];
                    const foundRecipe = favoritesRecipe.find((favoriteRecipe) => favoriteRecipe.id === recipe.id
                    );
                    let newFavoritesRecipe;
                    if (foundRecipe) {
                        newFavoritesRecipe = favoritesRecipe.filter(favoriteRecipe => favoriteRecipe.id !== foundRecipe.id)
                        this.classList.remove('favorite');
                    } else {
                        favoritesRecipe.push(recipe)
                        newFavoritesRecipe = favoritesRecipe
                        this.classList.add('favorite');
                    }
                    localStorage.setItem("favorites", JSON.stringify(newFavoritesRecipe))
                })
            })

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
  