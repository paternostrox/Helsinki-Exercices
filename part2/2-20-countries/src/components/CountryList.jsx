import CountryDetails from "./CountryDetails"

const CountryList = ({countriesData}) => {

  if(countriesData.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if(countriesData.length <= 10 && countriesData.length > 1) {
    return (
      <ul>
        {countriesData.map(country => <li key={country.name.official}>{country.name.common}</li>)}
      </ul>
    )
  }

  if(countriesData.length == 1) {
    return <CountryDetails countryData={countriesData[0]} />
  }

  return null
}

export default CountryList