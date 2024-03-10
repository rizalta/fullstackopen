const Persons = ({ persons, search }) => {
  const personsToShow = search.length === 0
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()));  

  return (
    <div>
      {personsToShow.map(person => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
}
export default Persons;