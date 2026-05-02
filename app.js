import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost/pizzak.php";

// 🍕 PIZZA CRUD COMPONENT
function PizzaCRUD() {
  const [pizzak, setPizzak] = useState([]);
  const [nev, setNev] = useState("");
  const [ar, setAr] = useState("");
  const [id, setId] = useState(null);

  const loadPizzak = async () => {
    const res = await axios.get(API_URL);
    setPizzak(res.data);
  };

  useEffect(() => {
    loadPizzak();
  }, []);

  const handleSubmit = async () => {
    if (id) {
      await axios.put(API_URL, { id, nev, ar });
    } else {
      await axios.post(API_URL, { nev, ar });
    }
    resetForm();
    loadPizzak();
  };

  const deletePizza = async (id) => {
    await axios.delete(`${API_URL}?id=${id}`);
    loadPizzak();
  };

  const editPizza = (pizza) => {
    setId(pizza.id);
    setNev(pizza.nev);
    setAr(pizza.ar);
  };

  const resetForm = () => {
    setId(null);
    setNev("");
    setAr("");
  };

  return (
    <div>
      <h2>Pizza CRUD</h2>

      <input
        placeholder="Név"
        value={nev}
        onChange={(e) => setNev(e.target.value)}
      />
      <input
        placeholder="Ár"
        value={ar}
        onChange={(e) => setAr(e.target.value)}
      />

      <button onClick={handleSubmit}>
        {id ? "Módosítás" : "Hozzáadás"}
      </button>

      <ul>
        {pizzak.map((pizza) => (
          <li key={pizza.id}>
            {pizza.nev} - {pizza.ar} Ft
            <button onClick={() => editPizza(pizza)}>✏️</button>
            <button onClick={() => deletePizza(pizza.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 🧮 CALCULATOR
function Calculator() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  return (
    <div>
      <h2>Calculator</h2>
      <input type="number" onChange={(e) => setA(+e.target.value)} />
      <input type="number" onChange={(e) => setB(+e.target.value)} />
      <p>Eredmény: {a + b}</p>
    </div>
  );
}

// 🎮 MINI APP
function MiniApp() {
  const [text, setText] = useState("");

  return (
    <div>
      <h2>Mini App</h2>
      <input onChange={(e) => setText(e.target.value)} />
      <p>{text}</p>
    </div>
  );
}

// 🚀 MAIN APP (SPA)
function App() {
  const [menu, setMenu] = useState("pizza");

  return (
    <div>
      <h1>Webalkalmazás</h1>

      <button onClick={() => setMenu("pizza")}>Pizza CRUD</button>
      <button onClick={() => setMenu("calc")}>Calculator</button>
      <button onClick={() => setMenu("mini")}>Mini App</button>

      {menu === "pizza" && <PizzaCRUD />}
      {menu === "calc" && <Calculator />}
      {menu === "mini" && <MiniApp />}
    </div>
  );
}

export default App;