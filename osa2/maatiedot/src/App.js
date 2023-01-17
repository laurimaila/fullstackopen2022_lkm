import { useState, useEffect } from 'react'
import axios from 'axios'
import React from 'react'
import CapitalWeather from './components/CapitalWeather'

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled and data set')
        setCountries(response.data)
      })
  }, [])
  const onChangeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div>
      <h1>Countries</h1>

      <Filter filter={filter} setFilter={setFilter} />

      <Countries countries={countries} filter={filter} onChangeFilter={onChangeFilter} />

    </div>

  )

}

const Filter = ({ filter, setFilter }) => (
  <div>
    Find countries: <input
      value={filter}
      onChange={event => setFilter(event.target.value)}
    />
  </div>

)

const Countries = ({ countries, filter, onChangeFilter }) => {
  const [responseData, setResponseData] = useState('')
  const filteredCountries = countries.filter(f => f.name.common.toLowerCase().includes(filter.toLowerCase()))

  if (filteredCountries.length > 10) {
    return (<div>Too many matches, specify another filter</div>)
  }

  if (filteredCountries.length < 11 && filteredCountries.length > 1) {
    return (<dl>
      {filteredCountries.map(f => (
        <React.Fragment key={f.name.common}>
          <li>{f.name.common} <button onClick={() =>
            onChangeFilter(f.name.common)}>show</button></li>
        </React.Fragment>
      ))}
    </dl>)
  }

  if (filteredCountries.length === 1) {
    const country = filteredCountries[0]
    return (<div>

      <h2>{country.name.common}</h2>
      <p>Capital {country.capital}</p>
      <p>Area {country.area} km²</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map(f => <li key={f}>{f}</li>)}
      </ul>
      <img src={country.flags.svg} alt="flag" height="150" />
      <CapitalWeather city = {country.capital}/>

    </div>)
  }
}

export default App