import { useState } from "react";
import CountryDetails from "./CountryDetails";

const CountryListItem = ({countryData}) => {

  const [showDetails, setShowDetails] = useState(false);

  return (
    <li>
      {countryData.name.common}<button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'show'}</button>
      {showDetails && <CountryDetails countryData={countryData} />}
    </li>
  )
}

export default CountryListItem