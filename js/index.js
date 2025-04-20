document.addEventListener('DOMContentLoaded', async () => {
    try {
        const [headerHTML, footerHTML] = await Promise.all([
            fetch('./components/header.html').then(r => r.ok ? r.text() : Promise.reject(r.status)),
            fetch('./components/footer.html').then(r => r.ok ? r.text() : Promise.reject(r.status))
        ]);

        document.getElementById('header').innerHTML = headerHTML;
        document.getElementById('footer').innerHTML = footerHTML;
    } catch (err) {
        console.log('ошибка');
    }

    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    const input = document.getElementById('ingredients-input');
    const findBtn = document.getElementById('find-by-ingredients-btn');
    const suggestionsList = document.getElementById('ingredient-suggestions');
    if (input && findBtn && suggestionsList) {
        const apiKey = '38e779a68fe4449390ee43137602db00';
        let debounceTimer = null;

        input.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(async () => {
                const q = input.value.trim();
                if (!q) {
                    suggestionsList.innerHTML = '';
                    return;
                }
                try {
                    const resp = await fetch(
                        `https://api.spoonacular.com/food/ingredients/autocomplete?` +
                        `query=${encodeURIComponent(q)}&number=5&apiKey=${apiKey}`
                    );
                    if (!resp.ok) throw new Error(resp.status);
                    const data = await resp.json();
                    suggestionsList.innerHTML = data
                        .map(item => `<li class="suggestion-item">${item.name}</li>`)
                        .join('');
                    suggestionsList.querySelectorAll('.suggestion-item')
                        .forEach(li => {
                            li.addEventListener('click', () => {
                                input.value = li.textContent;
                                suggestionsList.innerHTML = '';
                            });
                        });
                } catch (e) {
                    console.error('Ошибка:', e);
                }
            }, 300);
        });

        document.addEventListener('click', e => {
            if (!e.target.closest('.ingredients-search')) {
                suggestionsList.innerHTML = '';
            }
        });

        findBtn.addEventListener('click', () => {
            const vals = input.value
                .split(',')
                .map(s => s.trim())
                .filter(Boolean);
            if (!vals.length) {
                alert('Пожалуйста, введите хотя бы один ингредиент.');
                return;
            }
            const query = encodeURIComponent(vals.join(','));
            window.location.href = `recipes.html?ingredients=${query}`;  
        });
    }

    const recipesContainer = document.querySelector('.recipes-grid');
    if (recipesContainer) {
        const API_KEY = 'd5693c13e955483fbeaab9c3dfb26bd7';
        recipesContainer.innerHTML = '<div class="loading">Загрузка рецептов...</div>';

        try {
            const resp = await fetch(
                `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=6`  
            );
            if (!resp.ok) throw new Error(resp.status);
            const { recipes } = await resp.json();
            recipesContainer.innerHTML = recipes.length
                ? recipes.map(recipe => `
                    <div class="recipe-card">
                        <div class="recipe-img">
                            <img src="${recipe.image ||
                                'https://via.placeholder.com/300x200?text=No+Image'}"
                                alt="${recipe.title || 'Без названия'}">
                        </div>
                        <div class="recipe-info">
                            <h3 class="recipe-title">${recipe.title}</h3>
                            <div class="recipe-meta">
                                <span>${recipe.readyInMinutes || '--'} мин</span>
                                <span>${recipe.servings || '--'} порций</span>
                            </div>
                            <div class="recipe-actions">
                                <button class="view-recipe">Посмотреть</button>
                            </div>
                        </div>
                    </div>
                `).join('')
            : '<div class="no-recipes">Рецепты не найдены</div>';
        } catch (e) {
            console.error('Ошибка загрузки рецептов:', e);
            recipesContainer.innerHTML = '<div class="error">Не удалось загрузить рецепты</div>';
        }
    }
});


