document.addEventListener('DOMContentLoaded', () => {
        if (!document.querySelector(".page-wrapper")) {
          const wrapper = document.createElement("div");
          wrapper.classList.add("page-wrapper");
      
          while (document.body.firstChild) {
            wrapper.appendChild(document.body.firstChild);
          } 
          document.body.appendChild(wrapper);
        }
      
        fetch("./components/header.html")
          .then((res) => res.text())
          .then((data) => {
            const header = document.getElementById("header");
            if (header) header.innerHTML = data;
          });
      
        fetch("./components/footer.html")
          .then((res) => res.text())
          .then((data) => {
            const footer = document.getElementById("footer");
            if (footer) footer.innerHTML = data;
          });

      


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
            const favorites = JSON.parse(localStorage.getItem('favorites'));
            data.recipes.forEach(recipe => {
                const recipeCard = document.createElement('div');
                recipeCard.className = 'recipe-card';
                

                const heartSvg = `
                    <svg enable-background="new 0 0 50 50" height="50px" version="1.1" viewBox="0 0 50 50" width="50px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <rect fill="none" height="50" width="50"/>
                        <path d="M35,8  c-4.176,0-7.851,2.136-10,5.373C22.851,10.136,19.176,8,15,8C8.373,8,3,13.373,3,20c0,14,16,21,22,26c6-5,22-12,22-26  C47,13.373,41.627,8,35,8z" fill="currentColor" stroke="red" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>
                    </svg>
                `
                const foundRecipe = favorites.find((item) => item.id === recipe.id);
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
                            <button class="${foundRecipe ?'favorite':""}" data-recipe="${encodeURIComponent(JSON.stringify(recipe))
                            }" id="heart">${heartSvg}</button>
                            

                            <button class="view-recipe">Посмотреть</button>
                        </div>
                    </div>
                `;
                
                recipesContainer.appendChild(recipeCard);
            });
            const heartButtons = document.querySelectorAll('#heart');
            heartButtons.forEach((button) => {
                button.addEventListener("click", function(event){
                    const recipe = JSON.parse(decodeURIComponent(this.dataset.recipe));

                    console.log(recipe)
                    const favoritesRecipe = JSON.parse(localStorage.getItem('favorites')) || [];
                    console.log(favoritesRecipe)
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
                        console.log(favoritesRecipe, recipe)
                    }
                    localStorage.setItem("favorites", JSON.stringify(newFavoritesRecipe))
                })
            })
        })
        .catch(error => {
            console.error('Ошибка:', error);
            recipesContainer.innerHTML = '<div class="error">Не удалось загрузить рецепты</div>';
        });
});




