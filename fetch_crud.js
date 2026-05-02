const API_URL = 'pizzak.php';


document.addEventListener('DOMContentLoaded', () => {
    loadPizzas();
});


async function loadPizzas() {
    try {
        const response = await fetch(API_URL);
        const pizzas = await response.json();
        const tbody = document.getElementById('fetchPizzaBody');
        
        if (!tbody) return;
        tbody.innerHTML = '';

        pizzas.forEach(pizza => {
            
            tbody.innerHTML += `
                <tr>
                    <td><strong>${pizza.nev}</strong></td>
                    <td>${pizza.kategorianev}</td>
                    <td>${pizza.vegetarianus == 1 ? '🌱 Igen' : '🥩 Nem'}</td>
                    <td>
                        <button class="edit-btn" onclick="prepareEdit('${pizza.nev}', '${pizza.kategorianev}', ${pizza.vegetarianus})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete-btn" onclick="deletePizza('${pizza.nev}')">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error('Hiba a letöltés során:', error);
    }
}

// 
async function handlePizzaSubmit() {
    const nev = document.getElementById('fetchPizzaName').value;
    const kategoria = document.getElementById('fetchPizzaCategory').value;
    const vega = document.getElementById('fetchPizzaVega').checked ? 1 : 0;

    if (!nev || !kategoria) {
        alert("Kérlek töltsd ki a mezőket!");
        return;
    }

    const pizzaData = {
        nev: nev,
        kategorianev: kategoria,
        vegetarianus: vega
    };

    try {
        await fetch(API_URL, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pizzaData)
        });
        
        
        document.getElementById('fetchPizzaName').value = '';
        loadPizzas(); 
    } catch (error) {
        console.error('Hiba a küldés során:', error);
    }
}


async function deletePizza(nev) {
    if (!confirm(`Biztosan törlöd a(z) ${nev} pizzát?`)) return;

    try {
        await fetch(API_URL, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nev: nev })
        });
        loadPizzas();
    } catch (error) {
        console.error('Hiba a törlés során:', error);
    }
}


function prepareEdit(nev, kategoria, vega) {
    document.getElementById('fetchPizzaName').value = nev;
    document.getElementById('fetchPizzaCategory').value = kategoria;
    document.getElementById('fetchPizzaVega').checked = (vega == 1);
}
