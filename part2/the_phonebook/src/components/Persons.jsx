const Persons = ({ persons, handleDeletePerson }) => {
  return persons.map((person) => (
    <div key={person.id} style={{ display: "flex", gap: "10px" }}>
      <p style={{ margin: 0 }}>
        {person.name} {person.number}
      </p>
      <button onClick={() => handleDeletePerson(person.id)}>delete</button>
    </div>
  ));
};

export default Persons;
