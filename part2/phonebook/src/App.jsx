import { useState, useEffect } from 'react';
import personsService from "./services/persons.js";

import Filter from './Filter';
import PersonForm from './PersonForm.jsx';
import Persons from './Persons.jsx';
import Notification from './Notification.jsx'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState({});

  useEffect(() => {
    personsService
      .getAll()
      .then(data => setPersons(data));
  }, []);
  
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter search={search} setSearch={setSearch} />
      <PersonForm
        newName = {newName} newNumber = {newNumber}
        setNewName = {setNewName} setNewNumber = {setNewNumber}
        persons = {persons} setPersons = {setPersons}
        setNotification = {setNotification}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons} search={search}
        setPersons={setPersons}
        setNotification={setNotification}
      />
    </div>
  );
}

export default App

