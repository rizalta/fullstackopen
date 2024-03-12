import { useEffect, useState } from "react";
import axios from "axios";

import Country from "./components/Country";
import CountryList from "./components/CountryList";

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [results, setResults] = useState([]);

  const handleSearchChange = (value) => {
    setSearch(value);
  }

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(res => setCountries(res.data));
  }, []);

  useEffect(() => {
    setResults(countries.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase())));
  }, [search])

  return (
    <div>
      find countries <input type="text" value={search} onChange={(e) => handleSearchChange(e.target.value)} />
      <div>
        {search
          ? results.length === 1
            ? <Country country={results[0]} />
            : results.length <= 10
              ? <CountryList countries={results} setResults={setResults} />
              : <div>Too many matches specify another filter</div>
          : null
        }
      </div>
    </div>
  );
}
export default App;