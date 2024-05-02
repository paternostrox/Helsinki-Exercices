
const CountryDetails = ({countryData, weather}) => {

  const currency = countryData.currencies 
  ? Object.entries(countryData.currencies).map(([key, value]) => `${value.name} (${key})`)[0] 
  : null

  const languages = Object.values(countryData.languages).map(value => value)

  const capital = countryData.capital ? countryData.capital : null

  const temperature = weather?.list[0].main.temp || null
  const weatherDescription = weather?.list[0].weather[0].description || null
  const weatherIcon = weather?.list[0].weather[0].icon || null

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
      {weather && 
        <>
          <h2>Weather</h2>
          <p>temperature: {temperature} °C</p>
          <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}></img>
          <p>{weatherDescription}</p>
        </>
      }
    </div>
  )
}

export default CountryDetails