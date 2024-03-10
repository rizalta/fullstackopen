import personsServices from "./services/persons.js";

const Persons = ({ persons, search, setPersons }) => {
  const personsToShow = search.length === 0
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()));
  
  const handleClick = (person) => {
    const deleteConfirmation = confirm(`Delete ${person.name} ?`);
    if (deleteConfirmation) {
      personsServices
        .deletePerson(person.id)
        .then(data => setPersons(persons.filter(person => person.id != data.id)));
    }
  }

  return (
    <div>
      {personsToShow.map(person => (
        <div key={person.id}>
          {person.name} {person.number} <button onClick={() => handleClick(person)}>delete</button>
        </div>
      ))}
    </div>
  );
}
export default Persons;