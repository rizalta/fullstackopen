const PersonForm = ({ newName, newNumber, setNewName, setNewNumber, persons, setPersons }) => {
  
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }
  
  const addPerson = (e) => {
    e.preventDefault();
    if (persons.some(person => person.name == newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      setPersons([...persons, newPerson]);
      setNewName("");
      setNewNumber("");
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