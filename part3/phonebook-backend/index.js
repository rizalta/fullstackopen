import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

import Person from "./models/person.js";

const app = express();

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

morgan.token('req-body', function (req, res) {
  return Object.keys(req.body).length !== 0 ? JSON.stringify(req.body) : null;
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));


app.get("/api/persons", (req, res) => {
  Person.find({}).then(results => {
    res.json(results);
  });
});

app.get("/info", (req, res) => {
  Person.countDocuments({})
  .then(count => {
    res.send(
      `Phonebook has info for ${count} people
      <br/><br/>
      ${new Date()}`
    );
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
  .then(person => {
    if (person) {
      res.json(person);
    } else {
      res.status(404).end();
    }
  })
  .catch(err => next(err))
});
  
app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
  .then(person => {
    if (person) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  })
  .catch(err => next(err));
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: "Name missing" });
  }
  if (!number) {
    return res.status(400).json({ error: "Number missing" });
  }
  
  const person = new Person({
    name,
    number,
  });
  person.save().then(person => res.json(person));
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;
  const person = {
    name,
    number,
  }
  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson);
    })
    .catch(err => next(err));
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
}

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  if (error.name === "CastError") {
    return res.status(400).send({ error : "malformatted id" });
  }
}

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running in ${PORT}`);
});