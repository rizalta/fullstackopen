const CountryList = ({ countries, setResults }) => {
  const handleClick = (country) => {
    setResults([country]);
  }

  return (
    <div>
      {countries.map(country => (
        <div key={country.name.common}>
          {country.name.common}<button onClick={() => handleClick(country)}>show</button>
        </div>
      ))}
    </div>
  )
}
export default CountryList;