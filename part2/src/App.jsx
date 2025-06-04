import { useState } from "react";
import Note from "./components/Note";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [names, setNames] = useState([]);
    const [searchName, setSearchName] = useState("");

    const handleNameChange = (event) => {
        // console.log(event.target.value);
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    const handleSearchNameChange = (event) => {
        setSearchName(event.target.value);
    };

    const addPerson = (event) => {
        event.preventDefault();
        const newPerson = {
            name: newName,
            number: newNumber,
            id: String(persons.length + 1),
        };

        if (names.includes(newName)) {
            alert(`${newName} already exists in the Phonebook`);
            setNewName("");
            setNewNumber("");

            return;
        }

        setPersons(persons.concat(newPerson));
        setNames(names.concat(newName.toLowerCase()));
        setNewName("");
        setNewNumber("");
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                search:
                <input value={searchName} onChange={handleSearchNameChange} />
            </div>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    number:
                    <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <br />
                <div>
                    <button type="submit">add</button>
                </div>
            </form>

            <h2>Numbers</h2>
            <ul>
                {persons
                    .filter((note) =>
                        note.name
                            .toLowerCase()
                            .includes(searchName.toLowerCase())
                    )
                    .map((note) => (
                        <Note key={note.id} note={note} />
                    ))}
            </ul>
        </div>
    );
};

export default App;
