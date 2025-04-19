
document.addEventListener('DOMContentLoaded', function() {
  // Подключение header
  fetch("./components/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;
    });

  // Подключение footer
  fetch("./components/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
    });

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