import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import countriesService from './services/countriesService'
import CountrySearchBar from './components/CountrySearchBar'
import CountryList from './components/CountryList'
import CountryDetails from './components/CountryDetails'

function App() {

  const [countriesData, setCountriesData] = useState([])
  const [searchString, setSearchString] = useState('')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countriesService.getAll()
    .then(data => {
      setCountriesData(data)
    })
  },[])

  const getFilteredCountries = (filter) => filter.length > 0 
  ? countriesData.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  : []

  let filteredCountries = getFilteredCountries(searchString)

  const changeSearchHandler = (e) => {
    let newSearchString = e.target.value
    setSearchString(newSearchString)

    let countries = getFilteredCountries(newSearchString)  
    if(countries.length === 1) {
      let latLon = countries[0].capitalInfo.latlng
      if(latLon) {
        countriesService.getWeather(latLon[0],latLon[1])
        .then(data => {
          setWeather(data)
        })
      }
      else {
        setWeather(null)
      }
    }
  }

  return (
    <div>
      <CountrySearchBar searchString={searchString} onChange={changeSearchHandler} />
      <CountryList countriesData={filteredCountries} />
      {filteredCountries.length === 1 && <CountryDetails countryData={filteredCountries[0]} weather={weather} />}
    </div>
  )
}

export default App
