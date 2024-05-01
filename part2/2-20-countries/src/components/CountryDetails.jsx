const CountryDetails = ({countryData}) => {

  const currency = countryData.currencies 
  ? Object.entries(countryData.currencies).map(([key, value]) => `${value.name} (${key})`)[0] 
  : null

  const languages = Object.values(countryData.languages).map(value => value)

  const capital = countryData.capital ? countryData.capital : null

  return (
    <div>
      <h1>{countryData.name.common}</h1>
      <p>area: {countryData.area} km²</p>
      {capital && <p>capital: {capital}</p>}
      {currency && <p>currency: {currency}</p>}
      <h2>Languages</h2>
      <ul>
        {languages.map(language => <li key={language}>{language}</li>)}
      </ul>
      <h2>Flag</h2>
      <img src={countryData.flags.png} alt={countryData.flags.alt} height={150} />
    </div>
  )
}

export default CountryDetails