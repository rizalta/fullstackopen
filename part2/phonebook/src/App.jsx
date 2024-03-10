import { useState } from 'react'

import Filter from './Filter';
import PersonForm from './PersonForm.jsx';
import Persons from './Persons.jsx';

const App = () => {
  const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  
  
  return(
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch} />
      <PersonForm
        newName = {newName} newNumber = {newNumber}
        setNewName = {setNewName} setNewNumber = {setNewNumber}
        persons = {persons} setPersons = {setPersons}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} />
    </div>
  );
}

export default App

