import { useState, useEffect } from "react";
import Note from "./components/Note";
import Footer from "./components/Footer";
import Notification from "./components/Notification";
import noteService from "./services/persons";
// import notes from "./services/notes";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    // const [names, setNames] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [messageType, setMessageType] = useState("");

    useEffect(() => {
        noteService.getAll().then((initialPersons) => {
            // console.log(initialPersons);
            setPersons(initialPersons);
        });
    }, []);

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

    const handleDelete = (id) => {
        // DELETE method
        noteService
            .deleteObject(id)
            .then((response) => {
                const deletedPerson = persons.find(
                    (person) => person.id === id
                );
                setErrorMessage(
                    `Person '${deletedPerson.name}' was successfully deleted from the server`
                );
                setMessageType("green");
                setTimeout(() => {
                    setErrorMessage(null);
                }, 4000);
                setMessageType(null);
            })
            .then(() => {
                setPersons(persons.filter((p) => p.id !== id));
            });
    };

    const addPerson = (event) => {
        event.preventDefault();

        const oldPerson = persons.find(
            (person) => person.name.toLowerCase() === newName.toLowerCase()
        );

        if (oldPerson) {
            // confirm msg
            const confirmUpdate = window.confirm(
                `${newName} is already added to the phonbook. Replace the old number with a new one?`
            );

            // if user said YES
            if (confirmUpdate) {
                const updatedPerson = {
                    ...oldPerson,
                    number: newNumber,
                };

                noteService
                    .update(oldPerson.id, updatedPerson)
                    .then((returnedPerson) => {
                        setPersons(
                            persons.map((person) =>
                                person.id === oldPerson.id
                                    ? returnedPerson
                                    : person
                            )
                        );
                        setNewName("");
                        setNewNumber("");
                    })
                    .catch((error) => {
                        setErrorMessage(
                            `Person '${oldPerson.name}' was already removed from server`
                        );
                        setMessageType("red");
                        setTimeout(() => {
                            setErrorMessage(null);
                        }, 4000);
                        setMessageType(null);
                        setPersons(
                            persons.filter((p) => p.id !== oldPerson.id)
                        );
                    });
            }

            return;
        }

        // if this name hasn't been added to the server yet ==> brand NEW name
        const newPerson = {
            name: newName,
            number: newNumber,
            id: String(persons.length + 1), // json-server handles ID automatically
        };

        noteService.create(newPerson).then((response) => {
            setErrorMessage(
                `Person '${newPerson.name}' was successfully added to the server`
            );
            setMessageType("green");
            setTimeout(() => {
                setErrorMessage(null);
            }, 4000);
            setMessageType(null);
            setPersons(persons.concat(response));
            setNewName("");
            setNewNumber("");
        });
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={errorMessage} type={messageType} />
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
                        <Note
                            key={note.id}
                            note={note}
                            handleDelete={() => handleDelete(note.id)}
                        />
                    ))}
            </ul>
            <Footer />
        </div>
    );
};

export default App;

////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import { useState, useEffect } from "react";
// import axios from "axios";
// import Note from "./components/Note";
// import noteService from "./services/notes";

// const App = () => {
//     const [notes, setNotes] = useState([]);
//     const [newNote, setNewNote] = useState("");
//     const [showAll, setShowAll] = useState(true);

//     useEffect(() => {
//         noteService.getAll().then((initialNotes) => {
//             setNotes(initialNotes);
//         });
//     }, []);

//     const addNote = (event) => {
//         event.preventDefault();
//         const noteObject = {
//             content: newNote,
//             important: Math.random() > 0.5,
//         };

//         noteService.create(noteObject).then((returnedNote) => {
//             setNotes(notes.concat(returnedNote));
//             setNewNote("");
//         });
//     };

//     const handleNoteChange = (event) => {
//         setNewNote(event.target.value);
//     };

//     const notesToShow = showAll
//         ? notes
//         : notes.filter((note) => note.important);

//     const toggleImportanceOf = (id) => {
//         const note = notes.find((n) => n.id === id);
//         const changedNote = { ...note, important: !note.important };

//         noteService
//             .update(id, changedNote)
//             .then((returnedNote) => {
//                 setNotes(
//                     notes.map((note) => (note.id === id ? returnedNote : note))
//                 );
//             })
//             .catch((error) => {
//                 console.log(error);
//                 setNotes(notes.filter((n) => n.id !== id));
//             });
//     };

//     return (
//         <div>
//             <h1>Notes</h1>
//             <div>
//                 <button onClick={() => setShowAll(!showAll)}>
//                     show {showAll ? "important" : "all"}
//                 </button>
//             </div>
//             <ul>
//                 {notesToShow.map((note) => (
//                     <Note
//                         key={note.id}
//                         note={note}
//                         toggleImportance={() => toggleImportanceOf(note.id)}
//                     />
//                 ))}
//             </ul>
//             <form onSubmit={addNote}>
//                 <input value={newNote} onChange={handleNoteChange} />
//                 <button type="submit">save</button>
//             </form>
//         </div>
//     );
// };

// export default App;
