


let pizzas = [
    { name: "Margherita", price: 2100 },
    { name: "Salami", price: 2500 },
    { name: "Hawaii", price: 2400 },
    { name: "Quattro Formaggi", price: 2800 }
];


function displayPizzas() {
    const tbody = document.getElementById('pizzaBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    pizzas.forEach((pizza, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td><strong>${pizza.name}</strong></td>
                <td>${pizza.price.toLocaleString()} Ft</td>
                <td>
                    <button class="edit-btn" onclick="editPizza(${index})" title="Szerkesztés">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn" onclick="deletePizza(${index})" title="Törlés">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}


function savePizza() {
    const nameInput = document.getElementById('pizzaName');
    const priceInput = document.getElementById('pizzaPrice');
    const indexInput = document.getElementById('pizzaIndex');
    const saveBtn = document.getElementById('saveBtn');

    
    if (!nameInput.value.trim() || !priceInput.value) {
        alert("Kérjük, töltsön ki minden mezőt!");
        return;
    }

    const pizzaData = {
        name: nameInput.value.trim(),
        price: parseInt(priceInput.value)
    };

    if (indexInput.value === "") {
       
        pizzas.push(pizzaData);
    } else {
        
        const index = indexInput.value;
        pizzas[index] = pizzaData;
        
        // Visszaállítás alapállapotba
        indexInput.value = "";
        saveBtn.innerHTML = '<i class="fas fa-plus-circle"></i> Hozzáadás';
        saveBtn.style.background = "#27ae60"; 
    }

    // Form ürítése és táblázat frissítése
    nameInput.value = "";
    priceInput.value = "";
    displayPizzas();
}


function deletePizza(index) {
    if (confirm(`Biztosan törölni szeretné a(z) ${pizzas[index].name} pizzát?`)) {
        pizzas.splice(index, 1); // Törlés a tömbből [cite: 6]
        displayPizzas();
    }
}


function editPizza(index) {
    const pizza = pizzas[index];
    const saveBtn = document.getElementById('saveBtn');
    
    document.getElementById('pizzaName').value = pizza.name;
    document.getElementById('pizzaPrice').value = pizza.price;
    document.getElementById('pizzaIndex').value = index;

    
    saveBtn.innerHTML = '<i class="fas fa-save"></i> Módosítás mentése';
    saveBtn.style.background = "#3498db";
    
    
    document.getElementById('pizzaName').focus();
}


document.addEventListener('DOMContentLoaded', displayPizzas);