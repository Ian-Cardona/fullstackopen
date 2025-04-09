import { useState } from "react";

const Persons = ({ persons }) =>
  persons.map((person) => (
    <p key={person.id}>
      {person.name} {person.number}
    </p>
  ));

const PersonForm = ({
  handleNameChange,
  handleNumberChange,
  addNewPerson,
  newName,
  newNumber,
}) => (
  <form onSubmit={addNewPerson}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <button type="submit">add</button>
  </form>
);

const Filter = ({ handleFilterChange }) => (
  <div>
    filter shown with <input onChange={handleFilterChange} />
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const addNewPerson = (event) => {
    event.preventDefault();
    if (persons.some((p) => p.name === newName || p.number === newNumber)) {
      alert(`${newName} or ${newNumber} is already added to phonebook`);
      return;
    }
    setPersons([...persons, { name: newName, number: newNumber }]);
    setNewName("");
    setNewNumber("");
  };

  const handleFilterChange = (event) => setFilter(event.target.value);

  const filteredPersons = filter
    ? persons.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        handleNameChange={(e) => setNewName(e.target.value)}
        handleNumberChange={(e) => setNewNumber(e.target.value)}
        addNewPerson={addNewPerson}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
