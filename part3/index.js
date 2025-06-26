// const express = require("express");
// const app = express();

// //
// app.use(express.json());

// let notes = [
//     {
//         id: "1",
//         content: "HTML is easy",
//         important: true,
//     },
//     {
//         id: "2",
//         content: "Browser can execute only JavaScript",
//         important: false,
//     },
//     {
//         id: "3",
//         content: "GET and POST are the most important methods of HTTP protocol",
//         important: true,
//     },
// ];

// app.get("/", (request, response) => {
//     response.send("<h1>Hello World!</h1>");
// });

// app.get("/api/notes", (request, response) => {
//     response.json(notes);
// });

// // test
// // app.post("/api/notes", (req, res) => {
// //     const note = req.body;
// //     console.log(note);
// //     res.json(note);
// // });

// // my POST
// app.post("/api/notes/", (req, res) => {
//     const lastId = notes.length > 0 ? notes[notes.length - 1].id : 0;
//     const body = req.body;
//     if (!body.content) {
//         return res.status(400).json({
//             error: "content missing",
//         });
//     }
//     const note = {
//         id: String(Number(lastId) + 1),
//         important: body.important || false,
//         ...body,
//     };
//     notes = [...notes, note];
//     console.log(notes);
//     res.json(notes);
// });

// app.get("/api/notes/:id", (req, res) => {
//     const id = req.params.id;
//     const note = notes.find((note) => note.id === id);
//     if (note) {
//         res.json(note);
//     } else {
//         res.statusMessage = "Testing...";
//         res.status(404).end();
//     }
// });

// app.delete("/api/notes/:id", (req, res) => {
//     const id = req.params.id;
//     notes = notes.filter((note) => note.id !== id);
//     res.status(204).end();
// });

// const PORT = 3001;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

// EX 3.1 - 3.6
const express = require("express");
var morgan = require("morgan");
const cors = require("cors");
const app = express();

//
app.use(express.json());

// Cross-origin resource sharing (CORS)
app.use(cors());

// ex 3.7
morgan.token("type", function (req, res) {
    return JSON.stringify(req.body);
});
// app.use(morgan(":type"));

app.use(
    morgan(
        ":method :url :status :res[content-length] - :response-time ms :type"
    )
);

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
];

app.get("/", (req, res) => {
    res.send("hello world!");
});

app.get("/api/persons", (req, res) => {
    res.json(persons);
});

app.get("/api/info", (req, res) => {
    const currTime = Date();
    console.log(currTime);
    const message = `Phonebook has info for ${persons.length} people.<br>${currTime}`;
    res.send(message);
});

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const person = persons.find((person) => person.id === id);
    if (!person) {
        return res.status(400).send(`Person with ${id} not found...`);
    }
    res.send(person);
});

app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    persons = persons.filter((person) => person.id !== id);
    res.status(204).end();
});

// helper function to generate random id(=Number)
const getRandomInt = () => {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
};

app.post("/api/persons", (req, res) => {
    const body = req.body; // { id: '', name: 'Harry Cho', number: '510-123-4567' }
    if (!body.name || !body.number) {
        return res.status(400).send("Name or number is missing...");
    }
    if (persons.find((person) => person.name === body.name)) {
        // return res
        //     .status(400)
        //     .send(`Person with name ${body.name} already exists...`);
        // or
        return res.status(400).json({ error: "name must be unique" });
    }
    const newPerson = {
        ...body,
        id: String(getRandomInt()),
    };
    persons = persons.concat(newPerson);
    /* Implement error handling for creating new entries. The request is not allowed to succeed, if:
    - The name or number is missing
    - The name already exists in the phonebook */
    res.send(persons);
});

//
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

// const PORT = 3001;

// to host our Node server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
