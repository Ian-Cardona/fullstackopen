const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.static("dist"));
app.use(cors());

morgan.token("body", (req) => JSON.stringify(req.body));

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
const persons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" },
];

const generateId = () => String(Math.floor(Math.random() * 10000));

// Routes
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const person = persons.find((p) => p.id === req.params.id);
  person
    ? res.json(person)
    : res.status(404).json({ error: "Person not found" });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const index = persons.findIndex((person) => person.id === id);

  if (index !== -1) {
    persons.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ error: "Person not found" });
  }
});

app.get("/info", (req, res) => {
  const personsCount = persons.length;
  const dateTime = new Date();
  res.send(
    `<p>Phonebook has info for ${personsCount} people</p><p>${dateTime}</p>`
  );
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "Name or number is missing" });
  }

  if (persons.some((person) => person.name === name)) {
    return res.status(400).json({ error: "Name must be unique" });
  }

  const newPerson = { id: generateId(), name, number };
  persons.push(newPerson);
  res.json(newPerson);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
