import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import countriesService from './services/countriesService'
import CountrySearchBar from './components/CountrySearchBar'
import CountryList from './components/CountryList'

function App() {

  const [countriesData, setCountriesData] = useState([])
  const [searchString, setSearchString] = useState('')

  useEffect(() => {
    countriesService.getAll()
    .then(data => {
      setCountriesData(data)
    })
  },[])

  const filteredCountries = searchString.length > 0 
  ? countriesData.filter(country => country.name.common.toLowerCase().includes(searchString.toLowerCase()))
  : []

  console.log(filteredCountries)

  return (
    <div>
      <CountrySearchBar searchString={searchString} onChange={(newName) => setSearchString(newName)} />
      <CountryList countriesData={filteredCountries} />
    </div>
  )
}

export default App
