document.addEventListener('DOMContentLoaded', function() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesList = document.getElementById('favoritesList');

    if (favorites.length === 0) {
        favoritesList.innerHTML = 'Добавьте рецепты'; 
    } else { 
        favorites.forEach(recipe => {
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
            
            favoritesList.appendChild(recipeCard);
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
    };
})



