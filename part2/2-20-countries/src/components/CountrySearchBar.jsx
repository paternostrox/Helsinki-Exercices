const CountrySearchBar = ({searchString, onChange}) => {
  
  return (
    <div>
      find countries <input value={searchString} onChange={onChange}></input>
    </div>
  )
}

export default CountrySearchBar