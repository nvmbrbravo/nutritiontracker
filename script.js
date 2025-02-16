document.addEventListener("DOMContentLoaded", function () {
    const foodForm = document.getElementById("foodForm");
    const foodTable = document.getElementById("foodTable");
    const foodSearch = document.getElementById("foodSearch");
    const foodSuggestions = document.getElementById("foodSuggestions");
    
    let foodDatabase = [];
    
    // Load food data from Google Sheets (dummy URL for now)
    fetch("https://your-google-sheets-api-url")
        .then(response => response.json())
        .then(data => {
            foodDatabase = data;
        });

    // Search for food
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

    foodForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const food = foodSearch.value;
        const quantity = document.getElementById("quantity").value;
        const unit = document.getElementById("unit").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;

        if (!food || !quantity) return;

        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${date}</td>
            <td>${time}</td>
            <td>${food}</td>
            <td>${quantity} ${unit}</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        `;

        foodTable.appendChild(newRow);
        foodForm.reset();
    });
});
