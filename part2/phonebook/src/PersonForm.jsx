import personsService from './services/persons.js';

const PersonForm = ({ newName, newNumber, setNewName, setNewNumber, persons, setPersons }) => {
  
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }
  
  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    const found = persons.find(person => person.name === newName)
    if (found) {
      const update = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if (update) {
        personsService
          .update(found.id, newPerson)
          .then(data => setPersons(persons.map(person => person.id != data.id ? person : data)));
      }
    } else {
      personsService
        .create(newPerson)
        .then(data => {
          setPersons([...persons, data]);
          setNewName("");
          setNewNumber("");
        })

    }
  }    

  return ( 
    <form onSubmit={addPerson}>
      <div>
        <div>
          name: <input type='text' value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input type='text' value={newNumber} onChange={handleNumberChange} />
        </div>
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
}

export default PersonForm;