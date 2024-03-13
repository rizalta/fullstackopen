import express from "express";

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

const app = express();

app.use(express.json());

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  res.send(
    `Phonebook has info for ${persons.length} people
    <br/><br/>
    ${new Date()}`
  )
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);
  if (!person) {
    return res.status(404).json({ error: "Person not found" });
  }
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(p => p.id !== id);
  res.status(204).end();
});

const generateId = () => Math.floor(Math.random() * 1000000);

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "Name or number missing" });
  }

  const found = persons.find(p => p.name === name);

  if (found) {
    return res.status(409).json({ error: "Name must be unique" });
  }

  const person = {
    name,
    number,
    id: generateId(),
  }
  persons = persons.concat(person);
  res.status(201).json({ person });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running in ${PORT}`);
});