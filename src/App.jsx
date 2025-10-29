import React, { useState } from 'react'
import WeatherCard from './components/WeatherCard'

export default function App() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [locationName, setLocationName] = useState('')

  // Geocoding: Open-Meteo geocoding endpoint
  // https://geocoding-api.open-meteo.com/v1/search?name={name}&count=5

  async function handleSearch(e) {
    e?.preventDefault()
    if (!query.trim()) return setError('Please enter a city name')

    setLoading(true)
    setError('')
    setWeatherData(null)

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          query
        )}&count=5`
      )
      if (!geoRes.ok) throw new Error('Geocoding API error')
      const geoJson = await geoRes.json()

      if (!geoJson.results || geoJson.results.length === 0) {
        setError('No locations found')
        setLoading(false)
        return
      }

      // Pick the first result (closest match)
      const place = geoJson.results[0]
      const { latitude, longitude, name, country, admin1 } = place

      setLocationName(`${name}${admin1 ? ', ' + admin1 : ''}, ${country}`)

      // Fetch current weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      )
      if (!weatherRes.ok) throw new Error('Weather API error')
      const weatherJson = await weatherRes.json()

      if (!weatherJson.current_weather) {
        setError('Weather data not available for this location')
        setLoading(false)
        return
      }

      // ✅ This part was missing in your version:
      setWeatherData(weatherJson.current_weather)
    } catch (err) {
      console.error(err)
      setError('Unable to fetch weather. Check your connection or try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-root">
      <header className="header">
        <h1>WeatherNow</h1>
        <p className="subtitle">Quick current weather — powered by Open-Meteo</p>
      </header>

      <main className="container">
        <form className="search-form" onSubmit={handleSearch}>
          <input
            aria-label="City name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter city (e.g., Hyderabad,India)"
            className="search-input"
          />
          <button type="submit" className="search-btn" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {error && <div className="error">{error}</div>}

        {locationName && <div className="location">{locationName}</div>}

        {weatherData && <WeatherCard data={weatherData} />}

        <footer className="help">
          Note: The app uses Open-Meteo's free geocoding and weather endpoints.
        </footer>
      </main>
    </div>
  )
}
