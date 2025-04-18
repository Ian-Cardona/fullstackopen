import { useEffect, useState } from "react";
import Input from "./components/Input";
import countries from "./services/countries";

function App() {
  const [search, setSearch] = useState("");
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    countries.getAll().then((data) => {
      setAllCountries(data);
    });
  }, []);

  const handleChange = (value) => {
    setSearch(value);

    if (value.length < 1) {
      setAllCountries([]);
      return;
    }
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <p>find countries</p>
      <Input value={search} onChange={handleChange} />
      <ul>
        {allCountries.map((country, index) => (
          <li key={index}>{country.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
