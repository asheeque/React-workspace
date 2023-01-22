import React, { useState } from "react";
import AddBirthday from "./components/AddBirthday/AddBirthday";
import data from "./data";
import List from "./List";
function App() {
  const [people, setPeople] = useState([]);
  const [onAddBirthday, setOnAddBirthday] = useState(false);
  const addPerson = (obj) =>{

    setPeople((prev) =>{

      if(prev){
        return [...prev,obj]
      }

      return obj
    })
    setOnAddBirthday(!onAddBirthday)
  }
  return (
    <main>
      <section className="container">
        {!onAddBirthday && <h3>{people.length} birthdays in total</h3>}
        {!onAddBirthday && <List people={people} />}
        {onAddBirthday && <AddBirthday addPerson={addPerson} />}

        {!onAddBirthday && (
          <button onClick={() => setOnAddBirthday(!onAddBirthday)}>
            Add more
          </button>
        )}
        {!onAddBirthday && (
          <button onClick={() => setPeople([])}>Clear All</button>
        )}
        {onAddBirthday && (
          <button onClick={() => setOnAddBirthday(!onAddBirthday)}>
            Cancel
          </button>
        )}
      </section>
    </main>
  );
}

export default App;
