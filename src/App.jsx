import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import TaskManager from './components/TaskManager'
import ReminderManager from './components/ReminderManager'
import WeatherWidget from './components/WeatherWidget'
import SmartNotes from './components/SmartNotes'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🤖 Widget Cerdas Pengingat Tugas</h1>
          <p>Asisten Pribadi untuk Kehidupan Sehari-hari</p>
        </div>
      </header>

      <nav className="app-nav">
        <button 
          className={activeTab === 'dashboard' ? 'active' : ''}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Dashboard
        </button>
        <button 
          className={activeTab === 'tasks' ? 'active' : ''}
          onClick={() => setActiveTab('tasks')}
        >
          ✅ Tugas
        </button>
        <button 
          className={activeTab === 'reminders' ? 'active' : ''}
          onClick={() => setActiveTab('reminders')}
        >
          ⏰ Pengingat
        </button>
        <button 
          className={activeTab === 'weather' ? 'active' : ''}
          onClick={() => setActiveTab('weather')}
        >
          🌤️ Cuaca
        </button>
        <button 
          className={activeTab === 'notes' ? 'active' : ''}
          onClick={() => setActiveTab('notes')}
        >
          📝 Catatan
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'tasks' && <TaskManager />}
        {activeTab === 'reminders' && <ReminderManager />}
        {activeTab === 'weather' && <WeatherWidget />}
        {activeTab === 'notes' && <SmartNotes />}
      </main>
    </div>
  )
}

export default App

