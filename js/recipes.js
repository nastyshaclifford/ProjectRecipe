/*const params = new URLSearchParams(window.location.search);
    const ingredients = params.get("ingredients");
    const apiKey = "38e779a68fe4449390ee43137602db00"; 

    fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=10&apiKey=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById("recipes-results");
        if (data.length === 0) {
          container.innerHTML = "<p>Ничего не найдено.</p>";
          return;
        }

        data.forEach(recipe => {
          const card = document.createElement("div");
          card.className = "recipe-card";
          card.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}" style="width:100%; height:auto;">
            <p>Использовано: ${recipe.usedIngredientCount} / Пропущено: ${recipe.missedIngredientCount}</p>
          `;
          container.appendChild(card);
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
      });*/

      const params = new URLSearchParams(window.location.search);
      const ingredients = params.get("ingredients");  // Получаем список ингредиентов
      if (!ingredients) {
        alert("Не переданы ингредиенты в URL!");
        return;
      } // Получаем список ингредиентов
      const apiKey = "38e779a68fe4449390ee43137602db00"; 
    
      const ingredientList = ingredients.split(',').map(ingredient => ingredient.trim()).join(',');
      
      fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientList}&number=10&apiKey=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById("recipes-results");
        if (data.length === 0) {
          container.innerHTML = "<p>Ничего не найдено.</p>";
          return;
        }
    
        data.forEach(recipe => {
          const card = document.createElement("div");
          card.className = "recipe-card";
          card.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}" style="width:100%; height:auto;">
            <p>Использовано продуктов: ${recipe.usedIngredientCount}</p>
          `;
          container.appendChild(card);
        });
      })
      .catch(error => {
        console.error('Ошибка при запросе данных:', error);
        const container = document.getElementById("recipes-results");
        container.innerHTML = "<p>Произошла ошибка при загрузке данных.</p>";
      });