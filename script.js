document.addEventListener("DOMContentLoaded", function () {
    const foodSearch = document.getElementById("foodSearch");
    const foodSuggestions = document.getElementById("foodSuggestions");

    let foodDatabase = [];

    // Replace with your Google Sheet ID
    const SHEET_ID = "1DTFFkqGEeJrFpUpwwySLRr_p-LRfOVjZfjEy9tdN3J0";
    const SHEET_URL = `https://docs.google.com/spreadsheets/d/1DTFFkqGEeJrFpUpwwySLRr_p-LRfOVjZfjEy9tdN3J0/gviz/tq?tqx=out:json`;

    // Fetch food data from Google Sheets
    fetch(https://docs.google.com/spreadsheets/d/1DTFFkqGEeJrFpUpwwySLRr_p-LRfOVjZfjEy9tdN3J0/gviz/tq?tqx=out:json)
        .then(response => response.text())
        .then(data => {
            const jsonData = JSON.parse(data.substring(47, data.length - 2)); // Clean Google Sheets response
            const rows = jsonData.table.rows;
            
            foodDatabase = rows.map(row => ({
                name: row.c[0].v, // First column: Food Name
                calories: row.c[1].v, // Second column: Calories
                protein: row.c[2].v, // Third column: Protein
                carbs: row.c[3].v, // Fourth column: Carbs
                fats: row.c[4].v // Fifth column: Fats
            }));
        });

    // Search functionality
    foodSearch.addEventListener("input", function () {
        const query = foodSearch.value.toLowerCase();
        foodSuggestions.innerHTML = "";
        if (query.length > 1) {
            const filteredFoods = foodDatabase.filter(food => food.name.toLowerCase().includes(query));
            filteredFoods.forEach(food => {
                const div = document.createElement("div");
                div.textContent = food.name;
                div.addEventListener("click", function () {
                    foodSearch.value = food.name;
                    foodSuggestions.innerHTML = "";
                });
                foodSuggestions.appendChild(div);
            });
        }
    });
});
