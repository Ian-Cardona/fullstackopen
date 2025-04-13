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

export default PersonForm;
