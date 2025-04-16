const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
// мне надо как-то сделать, навернре, чтобы при клике на сердечко у меня рецепт добавлялся в localstorage

function displayFavorites() {
    const favoritesList = document.getElementById('favorites-list');
    favoritesList.innerHTML = ''; // Очищаем список перед отображением

    favorites.forEach(recipe => {
        const li = document.createElement('li');
        li.textContent = recipe;
        favoritesList.appendChild(li);
    });
}

displayFavorites();