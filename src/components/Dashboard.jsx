import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import './Dashboard.css'

function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [reminders, setReminders] = useState([])
  const [insights, setInsights] = useState([])

  useEffect(() => {
    // Load data from localStorage
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    const savedReminders = JSON.parse(localStorage.getItem('reminders') || '[]')
    
    setTasks(savedTasks)
    setReminders(savedReminders)
    
    // Generate smart insights
    generateInsights(savedTasks, savedReminders)
  }, [])

  const generateInsights = (tasks, reminders) => {
    const insightsList = []
    
    // Insight 1: Task completion rate
    const completedTasks = tasks.filter(t => t.completed).length
    const totalTasks = tasks.length
    if (totalTasks > 0) {
      const completionRate = (completedTasks / totalTasks) * 100
      if (completionRate < 50) {
        insightsList.push({
          type: 'warning',
          icon: '⚠️',
          title: 'Tingkat Penyelesaian Rendah',
          message: `Hanya ${Math.round(completionRate)}% tugas yang selesai. Fokus pada prioritas tinggi!`
        })
      } else if (completionRate >= 80) {
        insightsList.push({
          type: 'success',
          icon: '🎉',
          title: 'Produktivitas Tinggi!',
          message: `${Math.round(completionRate)}% tugas sudah selesai. Pertahankan!`
        })
      }
    }

    // Insight 2: Overdue tasks
    const overdueTasks = tasks.filter(t => 
      !t.completed && t.dueDate && new Date(t.dueDate) < new Date()
    )
    if (overdueTasks.length > 0) {
      insightsList.push({
        type: 'error',
        icon: '🚨',
        title: 'Tugas Terlambat',
        message: `Ada ${overdueTasks.length} tugas yang sudah melewati deadline.`
      })
    }

    // Insight 3: Upcoming reminders
    const upcomingReminders = reminders.filter(r => {
      const reminderTime = new Date(r.dateTime)
      const now = new Date()
      const diff = reminderTime - now
      return diff > 0 && diff < 3600000 // Within 1 hour
    })
    if (upcomingReminders.length > 0) {
      insightsList.push({
        type: 'info',
        icon: '⏰',
        title: 'Pengingat Mendatang',
        message: `Ada ${upcomingReminders.length} pengingat dalam 1 jam ke depan.`
      })
    }

    // Insight 4: High priority tasks
    const highPriorityTasks = tasks.filter(t => 
      !t.completed && t.priority === 'high'
    )
    if (highPriorityTasks.length > 0) {
      insightsList.push({
        type: 'priority',
        icon: '🔥',
        title: 'Tugas Prioritas Tinggi',
        message: `Ada ${highPriorityTasks.length} tugas dengan prioritas tinggi yang perlu perhatian.`
      })
    }

    setInsights(insightsList)
  }

  const pendingTasks = tasks.filter(t => !t.completed).length
  const completedToday = tasks.filter(t => 
    t.completed && 
    format(new Date(t.completedAt || Date.now()), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  ).length

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard Personal</h2>
        <p className="date">{format(new Date(), 'EEEE, d MMMM yyyy')}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>{pendingTasks}</h3>
            <p>Tugas Pending</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{completedToday}</h3>
            <p>Selesai Hari Ini</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⏰</div>
          <div className="stat-content">
            <h3>{reminders.length}</h3>
            <p>Total Pengingat</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>{JSON.parse(localStorage.getItem('notes') || '[]').length}</h3>
            <p>Total Catatan</p>
          </div>
        </div>
      </div>

      <div className="insights-section">
        <h3>💡 Insight Cerdas</h3>
        <div className="insights-list">
          {insights.length > 0 ? (
            insights.map((insight, index) => (
              <div key={index} className={`insight-card ${insight.type}`}>
                <span className="insight-icon">{insight.icon}</span>
                <div className="insight-content">
                  <h4>{insight.title}</h4>
                  <p>{insight.message}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="insight-card info">
              <span className="insight-icon">✨</span>
              <div className="insight-content">
                <h4>Semuanya Berjalan Baik!</h4>
                <p>Tidak ada insight khusus saat ini. Tetap produktif!</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="quick-actions">
        <h3>⚡ Aksi Cepat</h3>
        <div className="actions-grid">
          <button className="action-btn" onClick={() => window.location.reload()}>
            🔄 Refresh Data
          </button>
          <button className="action-btn" onClick={() => {
            if (confirm('Yakin ingin menghapus semua data?')) {
              localStorage.clear()
              window.location.reload()
            }
          }}>
            🗑️ Reset Data
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

