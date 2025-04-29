export async function getRecipe(type) {
    try {
        const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=e7889d5a7e1842fdaf440b0a8b547ac8&query=${type}&number=5`);
        const data = await res.json();
        return data.results[Math.floor(Math.random() * data.results.length)];
    } catch (error) {
        console.error('Ошибка получения рецепта:', error);
        return null;
    }
}