const CountrySearchBar = ({searchString, onChange}) => {
  
  return (
    <div>
      find countries <input value={searchString} onChange={(e) => onChange(e.target.value)}></input>
    </div>
  )
}

export default CountrySearchBar