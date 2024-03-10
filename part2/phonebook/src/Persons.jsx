import personsServices from "./services/persons.js";

const Persons = ({ persons, search, setPersons, setNotification }) => {
  const personsToShow = search.length === 0
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()));
  
  const handleDelete = (person) => {
    const deleteConfirmation = confirm(`Delete ${person.name} ?`);
    if (deleteConfirmation) {
      personsServices
        .deletePerson(person.id)
        .then(data => setPersons(persons.filter(p => p.id != data.id)))
        .catch(() => {
          setNotification({
            type: "error",
            message: `Information of ${person.name} has already been removed from server`
          });
          setPersons(persons.filter(p => p.id != person.id));
          setTimeout(() => {
            setNotification({});
          }, 5000);
        })
    }
  }

  return (
    <div>
      {personsToShow.map(person => (
        <div key={person.id}>
          {person.name} {person.number} <button onClick={() => handleDelete(person)}>delete</button>
        </div>
      ))}
    </div>
  );
}
export default Persons;