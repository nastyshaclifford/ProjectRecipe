const params = new URLSearchParams(window.location.search);
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