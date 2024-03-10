import { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './Filter';
import PersonForm from './PersonForm.jsx';
import Persons from './Persons.jsx';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => setPersons(response.data));
  }, []);
  
  
  return (
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

