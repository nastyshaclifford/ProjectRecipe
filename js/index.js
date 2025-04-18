document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('ingredients-input');
    const findBtn = document.getElementById('find-by-ingredients-btn');
    const suggestionsList = document.getElementById('ingredient-suggestions');
    let selectedIngredients = [];
    const apiKey = '38e779a68fe4449390ee43137602db00';
    let debounceTimer;
    input.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(async () => {
            const value = input.value.trim();
        if (value.length === 0) {
            suggestionsList.innerHTML = '';
            return;
        }
        try {
            const response = await fetch(`https://api.spoonacular.com/food/ingredients/autocomplete?query=${encodeURIComponent(value)}&number=5&apiKey=${apiKey}`);
            if (!response.ok) {
                throw new Error('Ошибка запроса: ' + response.status);
            }
            const data = await response.json();
            suggestionsList.innerHTML = '';
            data.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item.name; 
                li.classList.add('suggestion-item');
                li.addEventListener('click', () => {
                    input.value = item.name;
                    suggestionsList.innerHTML = '';
                });
                suggestionsList.appendChild(li);
            });
            } catch (error) {
                console.error('Произошла ошибка при запросе к API:', error);
            }
        }, 300);});
//клик
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".ingredients-search")) {
            suggestionsList.innerHTML = '';
        }
    });
    // Переход на страницу с рецептами
    findBtn.addEventListener("click", () => {
        let inputValue = input.value.trim();
        if (inputValue) {
            selectedIngredients = inputValue.split(',').map(item => item.trim()).filter(Boolean);
        }

        if (selectedIngredients.length === 0) {
            alert("Пожалуйста, введите хотя бы один ингредиент.");
        return;
        }

        const query = encodeURIComponent(selectedIngredients.join(","));
        window.location.href = `recipes.html?ingredients=${query}`;
    });});

document.addEventListener('DOMContentLoaded', function() {
    const API_KEY = 'd5693c13e955483fbeaab9c3dfb26bd7'; 
    const recipesContainer = document.querySelector('.recipes-grid');
    
    if (!recipesContainer) {
        console.error('Рецепты не найдены');
        return;
    }

    recipesContainer.innerHTML = '<div class="loading">Загрузка рецептов...</div>';

    fetch(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=6`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка загрузки рецептов');
            }
            return response.json();
        })
        .then(data => {
            recipesContainer.innerHTML = '';
            
            if (!data.recipes || data.recipes.length === 0) {
                recipesContainer.innerHTML = '<div class="no-recipes">Рецепты не найдены</div>';
                return;
            }
            data.recipes.forEach(recipe => {
                const recipeCard = document.createElement('div');
                recipeCard.className = 'recipe-card';
                
                recipeCard.innerHTML = `
                    <div class="recipe-img">
                        <img src="${recipe.image || 'https://via.placeholder.com/300x200?text=No+Image'}" alt="${recipe.title}">
                    </div>
                    <div class="recipe-info">
                        <h3 class="recipe-title">${recipe.title || 'Без названия'}</h3>
                        <div class="recipe-meta">
                            <span>${recipe.readyInMinutes || '--'} мин</span>
                            <span>${recipe.servings || '--'} порций</span>
                        </div>
                        <div class="recipe-actions">
                            <button class="view-recipe">Посмотреть</button>
                        </div>
                    </div>
                `;
                
                recipesContainer.appendChild(recipeCard);
            });
        })
        .catch(error => {
            console.error('Ошибка:', error);
            recipesContainer.innerHTML = '<div class="error">Не удалось загрузить рецепты</div>';
        });
});