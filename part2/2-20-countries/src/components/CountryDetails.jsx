const CountryDetails = ({countryData}) => {

  const currencies = Object.entries(countryData.currencies).map(([key, value]) => `${value.name} (${key})`)

  const languages = Object.values(countryData.languages).map(value => value)

  return (
    <div>
      <h1>{countryData.name.common}</h1>
      <p>capital: {countryData.capital[0]}</p>
      <p>area: {countryData.area} km²</p>
      <p>currency: {currencies[0]}</p>
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