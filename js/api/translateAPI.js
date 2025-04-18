export async function translateText(text, targetLang = 'ru') {
    try {
        const response = await fetch("https://google-translate113.p.rapidapi.com/api/v1/translator/text", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-rapidapi-host": "google-translate113.p.rapidapi.com",
                "x-rapidapi-key": '0eb5ec211dmshccc10bb0722767bp1073e4jsn0388a6c5847' //добавить цифру 9(чтобы не тратился лимит переводов ключ с ошибкой)
            },
            body: JSON.stringify({
                from: "en",
                to: targetLang,
                text: text
            })
        });

        const data = await response.json();
        return data?.trans || text;
    } catch {
        return text;
    }
}