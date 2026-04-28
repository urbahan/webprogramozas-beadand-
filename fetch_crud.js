const API_URL = 'pizzak.php';


async function loadPizzas() {
    const response = await fetch(API_URL);
    const pizzas = await response.json();
    const tbody = document.getElementById('fetchPizzaBody');
    tbody.innerHTML = '';

    pizzas.forEach(pizza => {
        tbody.innerHTML += `
            <tr>
                <td>${pizza.id}</td>
                <td><strong>${pizza.nev}</strong></td>
                <td>${pizza.ar} Ft</td>
                <td>
                    <button class="edit-btn" onclick="prepareEdit(${pizza.id}, '${pizza.nev}', ${pizza.ar})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn" onclick="deletePizza(${pizza.id})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        `;
    });
}


async function handlePizzaSubmit() {
    const id = document.getElementById('fetchPizzaId').value;
    const nev = document.getElementById('fetchPizzaName').value;
    const ar = document.getElementById('fetchPizzaPrice').value;
    
    const method = id ? 'PUT' : 'POST';
    const body = JSON.stringify({ id, nev, ar });

    await fetch(API_URL, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: body
    });

    resetForm();
    loadPizzas();
}

async function deletePizza(id) {
    if (confirm('Biztosan törli?')) {
        await fetch(`${API_URL}?id=${id}`, { method: 'DELETE' });
        loadPizzas();
    }
}

function prepareEdit(id, nev, ar) {
    document.getElementById('fetchPizzaId').value = id;
    document.getElementById('fetchPizzaName').value = nev;
    document.getElementById('fetchPizzaPrice').value = ar;
    document.getElementById('fetchSaveBtn').innerHTML = '<i class="fas fa-save"></i> Módosítás mentése';
}

function resetForm() {
    document.getElementById('fetchPizzaId').value = '';
    document.getElementById('fetchPizzaName').value = '';
    document.getElementById('fetchPizzaPrice').value = '';
    document.getElementById('fetchSaveBtn').innerHTML = '<i class="fas fa-cloud-upload-alt"></i> Küldés a szerverre';
}

document.addEventListener('DOMContentLoaded', loadPizzas);