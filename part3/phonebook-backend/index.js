import express from "express";
import morgan from "morgan";
import cors from 'cors'

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

app.use(cors());

app.use(express.static('dist'));

app.use(express.json());

morgan.token('req-body', function (req, res) {
  return Object.keys(req.body).length !== 0 ? JSON.stringify(req.body) : null;
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));

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
  const person =  persons.find(p => p.id = id);
  persons = persons.filter(p => p !== p);
  res.status(204).json(person);
});

const generateId = () => Math.floor(Math.random() * 1000000);

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name missing" });
  }
  if (!number) {
    return res.status(400).json({ error: "Number missing" });
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
  res.status(201).json(person);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running in ${PORT}`);
});