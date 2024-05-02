import axios from 'axios'

const baseUrl = `https://studies.cs.helsinki.fi/restcountries`
const baseWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?`
const apiKey = import.meta.env.VITE_KEY

const getAll = () => {
  return axios.get(`${baseUrl}/api/all`)
  .then(response => response.data)
}

const getWeather = (lat, lon) => {
  return axios.get(`${baseWeatherUrl}units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`)
  .then(response => response.data)
}

export default {
  getAll,
  getWeather
}