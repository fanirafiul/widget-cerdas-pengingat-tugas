import { useState, useEffect } from 'react'
import './WeatherWidget.css'

function WeatherWidget() {
  const [weather, setWeather] = useState(null)
  const [location, setLocation] = useState('Jakarta')
  const [loading, setLoading] = useState(false)
  const [recommendations, setRecommendations] = useState([])

  useEffect(() => {
    fetchWeather('Jakarta')
  }, [])

  const fetchWeather = async (city) => {
    setLoading(true)
    try {
      // Simulated weather data (in real app, use actual weather API)
      const weatherData = generateWeatherData(city)
      setWeather(weatherData)
      generateRecommendations(weatherData)
    } catch (error) {
      console.error('Error fetching weather:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateWeatherData = (city) => {
    // Simulate weather data
    const conditions = ['Cerah', 'Berawan', 'Hujan', 'Mendung']
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)]
    const baseTemp = randomCondition === 'Hujan' ? 25 : randomCondition === 'Cerah' ? 32 : 28
    
    return {
      city,
      condition: randomCondition,
      temperature: baseTemp + Math.floor(Math.random() * 5) - 2,
      humidity: 60 + Math.floor(Math.random() * 30),
      windSpeed: Math.floor(Math.random() * 20) + 5,
      icon: getWeatherIcon(randomCondition)
    }
  }

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Cerah': return '☀️'
      case 'Berawan': return '⛅'
      case 'Hujan': return '🌧️'
      case 'Mendung': return '☁️'
      default: return '🌤️'
    }
  }

  const generateRecommendations = (weatherData) => {
    const recs = []
    const hour = new Date().getHours()

    // Weather-based recommendations
    if (weatherData.condition === 'Hujan') {
      recs.push({
        icon: '🌂',
        title: 'Bawa Payung',
        description: 'Hari ini akan hujan, pastikan membawa payung atau jas hujan.'
      })
      recs.push({
        icon: '🏠',
        title: 'Aktivitas Dalam Ruangan',
        description: 'Sempurna untuk aktivitas dalam ruangan seperti membaca atau menonton film.'
      })
    } else if (weatherData.condition === 'Cerah') {
      recs.push({
        icon: '🏃',
        title: 'Olahraga Luar Ruangan',
        description: 'Cuaca cerah, cocok untuk jogging atau aktivitas luar ruangan.'
      })
      recs.push({
        icon: '🧴',
        title: 'Gunakan Sunscreen',
        description: 'Suhu tinggi, jangan lupa menggunakan sunscreen untuk melindungi kulit.'
      })
    } else if (weatherData.condition === 'Berawan') {
      recs.push({
        icon: '🚶',
        title: 'Jalan-jalan',
        description: 'Cuaca berawan, nyaman untuk berjalan-jalan atau aktivitas ringan.'
      })
    }

    // Temperature-based recommendations
    if (weatherData.temperature > 30) {
      recs.push({
        icon: '💧',
        title: 'Tetap Terhidrasi',
        description: 'Suhu tinggi, pastikan minum air yang cukup sepanjang hari.'
      })
    } else if (weatherData.temperature < 25) {
      recs.push({
        icon: '🧥',
        title: 'Pakai Jaket',
        description: 'Suhu cukup dingin, pertimbangkan untuk memakai jaket.'
      })
    }

    // Time-based recommendations
    if (hour >= 6 && hour < 10) {
      recs.push({
        icon: '🌅',
        title: 'Waktu Pagi yang Baik',
        description: 'Waktu yang sempurna untuk memulai aktivitas produktif.'
      })
    } else if (hour >= 10 && hour < 14) {
      recs.push({
        icon: '☀️',
        title: 'Puncak Siang',
        description: 'Hindari aktivitas di bawah sinar matahari langsung jika memungkinkan.'
      })
    }

    setRecommendations(recs)
  }

  const handleSearch = () => {
    if (location.trim()) {
      fetchWeather(location)
    }
  }

  return (
    <div className="weather-widget">
      <div className="weather-header">
        <h2>🌤️ Cuaca & Rekomendasi Aktivitas</h2>
        <p className="subtitle">Dapatkan informasi cuaca dan saran aktivitas cerdas</p>
      </div>

      <div className="weather-search">
        <input
          type="text"
          placeholder="Masukkan nama kota..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="location-input"
        />
        <button onClick={handleSearch} className="search-btn">
          🔍 Cari
        </button>
      </div>

      {loading ? (
        <div className="loading">Memuat data cuaca...</div>
      ) : weather ? (
        <>
          <div className="weather-card">
            <div className="weather-main">
              <div className="weather-icon">{weather.icon}</div>
              <div className="weather-info">
                <h3>{weather.city}</h3>
                <p className="weather-condition">{weather.condition}</p>
                <p className="weather-temp">{weather.temperature}°C</p>
              </div>
            </div>
            
            <div className="weather-details">
              <div className="detail-item">
                <span className="detail-label">Kelembaban</span>
                <span className="detail-value">{weather.humidity}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Kecepatan Angin</span>
                <span className="detail-value">{weather.windSpeed} km/jam</span>
              </div>
            </div>
          </div>

          <div className="recommendations-section">
            <h3>💡 Rekomendasi Aktivitas Cerdas</h3>
            <div className="recommendations-list">
              {recommendations.length > 0 ? (
                recommendations.map((rec, index) => (
                  <div key={index} className="recommendation-card">
                    <span className="rec-icon">{rec.icon}</span>
                    <div className="rec-content">
                      <h4>{rec.title}</h4>
                      <p>{rec.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-recommendations">
                  <p>Tidak ada rekomendasi khusus untuk saat ini.</p>
                </div>
              )}
            </div>
          </div>

          <div className="weather-tips">
            <h3>📌 Tips Harian</h3>
            <div className="tips-list">
              <div className="tip-item">
                <span>🌡️</span>
                <p>Periksa cuaca sebelum keluar rumah untuk mempersiapkan pakaian yang tepat.</p>
              </div>
              <div className="tip-item">
                <span>⏰</span>
                <p>Waktu terbaik untuk aktivitas luar ruangan adalah pagi hari (6-10 AM) atau sore hari (4-6 PM).</p>
              </div>
              <div className="tip-item">
                <span>💧</span>
                <p>Minum setidaknya 8 gelas air per hari, terutama saat cuaca panas.</p>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default WeatherWidget

