import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather'
const AIR_POLLUTION_URL = 'https://api.openweathermap.org/data/2.5/air_pollution'
const OPEN_METEO_URL = 'https://api.open-meteo.com/v1/forecast'

const checkApiKey = () => {
  if (!API_KEY) {
    throw new Error('OpenWeather API 키를 확인해 주세요.')
  }
}

const convertWeatherStatus = (weatherMain) => {
  if (weatherMain === 'Clear') {
    return '맑음'
  }

  if (['Rain', 'Drizzle', 'Thunderstorm'].includes(weatherMain)) {
    return '비'
  }

  if (weatherMain === 'Snow') {
    return '눈'
  }

  return '흐림'
}

const getCurrentWeather = async (lat, lon) => {
  checkApiKey()

  const response = await axios.get(WEATHER_URL, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: 'metric',
      lang: 'kr',
    },
  })

  return response.data
}

export const fetchBasicWeather = async (location) => {
  const currentWeather = await getCurrentWeather(location.lat, location.lon)

  return {
    ...location,
    temp: Math.round(currentWeather.main.temp),
    status: convertWeatherStatus(currentWeather.weather[0].main),
  }
}

export const fetchDetailedWeather = async (location) => {
  checkApiKey()

  const [currentWeather, airPollutionResponse, openMeteoResponse] = await Promise.all([
    getCurrentWeather(location.lat, location.lon),
    axios.get(AIR_POLLUTION_URL, {
      params: {
        lat: location.lat,
        lon: location.lon,
        appid: API_KEY,
      },
    }),
    axios.get(OPEN_METEO_URL, {
      params: {
        latitude: location.lat,
        longitude: location.lon,
        daily: 'temperature_2m_max,temperature_2m_min',
        timezone: 'auto',
        forecast_days: 1,
      },
    }),
  ])

  const airPollution = airPollutionResponse.data.list[0]
  const dailyWeather = openMeteoResponse.data.daily

  return {
    ...location,
    temp: Math.round(currentWeather.main.temp),
    status: convertWeatherStatus(currentWeather.weather[0].main),
    humidity: currentWeather.main.humidity,
    wind: currentWeather.wind.speed,
    fineDust: Math.round(airPollution.components.pm10),
    minTemp: Math.round(dailyWeather.temperature_2m_min[0]),
    maxTemp: Math.round(dailyWeather.temperature_2m_max[0]),
  }
}

export const getWeatherSymbol = (status) => {
  if (status === '맑음') return '☀'
  if (status === '비') return '☂'
  if (status === '눈') return '❄'
  return '☁'
}
