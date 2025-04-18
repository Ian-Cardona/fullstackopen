import { useEffect, useState } from "react";
import personService from "./services/persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((value) => {
      console.log("promise fulfilled");
      console.log(value);
      setPersons(value);
    });
  }, []);

  const addNewPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(
      (p) => p.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (confirmUpdate) {
        personService
          .updatePerson(existingPerson.id, {
            ...existingPerson,
            number: newNumber,
          })
          .then((updatedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== existingPerson.id ? p : updatedPerson
              )
            );
            setErrorMessage(`Updated ${newName}'s number`);
            setTimeout(() => setErrorMessage(null), 5000);
            setNewName("");
            setNewNumber("");
          })
          .catch(() => {
            setErrorMessage(
              `Information of ${existingPerson.name} has already been removed from server`
            );
            setTimeout(() => setErrorMessage(null), 5000);
          });
      }
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personService
      .createPerson(newPerson)
      .then((addedPerson) => {
        setPersons(persons.concat(addedPerson));
        setErrorMessage(
          `Added ${addedPerson.name} with number ${addedPerson.number}`
        );
        setTimeout(() => setErrorMessage(null), 5000);
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        setErrorMessage(`${error.response.data.error}`);
        console.log(error.response.data.error);
        setTimeout(() => setErrorMessage(null), 5000);
      });
  };

  const handleDeletePerson = (id) => {
    console.log("delete", id);
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch(() => {
          setErrorMessage(
            `Information of ${person.name} has already been removed from server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  const handleFilterChange = (event) => setFilter(event.target.value);

  const filteredPersons = filter
    ? persons.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
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
      <Persons
        persons={filteredPersons}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
