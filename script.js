document.addEventListener("DOMContentLoaded", function () {
    const foodForm = document.getElementById("foodForm");
    const foodTable = document.getElementById("foodTable");
    const foodSearch = document.getElementById("foodSearch");
    const foodSuggestions = document.getElementById("foodSuggestions");
    const dateInput = document.getElementById("date");
    const timeInput = document.getElementById("time");
    
    let foodDatabase = [];
    
    // Load food data from Google Sheets
    fetch("https://docs.google.com/spreadsheets/d/1DTFFkqGEeJrFpUpwwySLRr_p-LRfOVjZfjEy9tdN3J0/gviz/tq?tqx=out:json")
        .then(response => response.text())
        .then(data => {
            const json = JSON.parse(data.substr(47).slice(0, -2));
            foodDatabase = json.table.rows.map(row => ({ name: row.c[0].v }));
        });

    // Set current date and time by default
    const now = new Date();
    dateInput.value = now.toISOString().split("T")[0];
    timeInput.value = now.toTimeString().split(" ")[0].slice(0,5);

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
        const date = dateInput.value;
        const time = timeInput.value;

        if (!food || !quantity) return;

        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${date}</td>
            <td>${time}</td>
            <td>${food}</td>
            <td>${quantity} ${unit}</td>
        `;

        foodTable.appendChild(newRow);
        
        // Send data to Google Apps Script
        fetch("https://script.google.com/macros/s/AKfycbwrLGhyxiwjDrdfIhA_1bHepUHbvubYz2ad4snAeLxf3RgPmAxR2xfdUJVllyuHQ5kieA/exec", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ date, time, food, quantity, unit })
        }).then(response => response.text())
          .then(console.log);

        foodForm.reset();
        dateInput.value = now.toISOString().split("T")[0];
        timeInput.value = now.toTimeString().split(" ")[0].slice(0,5);
    });
});
