import CountryDetails from "./CountryDetails"
import CountryListItem from "./CountryListItem"

const CountryList = ({countriesData}) => {

  if(countriesData.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if(countriesData.length <= 10 && countriesData.length > 1) {
    return (
      <ul>
        {countriesData.map(country => 
          <CountryListItem key={country.name.official} countryData={country} />
        )}
      </ul>
    )
  }

  if(countriesData.length == 1) {
    return <CountryDetails countryData={countriesData[0]} />
  }

  return null
}

export default CountryList