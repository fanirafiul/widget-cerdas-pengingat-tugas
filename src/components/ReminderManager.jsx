import { useState, useEffect, useRef } from 'react'
import { format } from 'date-fns'
import { requestNotificationPermission, checkAndSendReminders, sendReminderNotification, openNotificationSettings } from '../utils/notifications'
import './ReminderManager.css'

function ReminderManager() {
  const [reminders, setReminders] = useState([])
  const [notificationPermission, setNotificationPermission] = useState('default')
  const [notificationStatus, setNotificationStatus] = useState('')
  const intervalRef = useRef(null)
  
  const [newReminder, setNewReminder] = useState({
    title: '',
    description: '',
    dateTime: '',
    repeat: 'none',
    priority: 'medium'
  })

  useEffect(() => {
    const savedReminders = JSON.parse(localStorage.getItem('reminders') || '[]')
    setReminders(savedReminders)
    
    // Check notification permission
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission)
    }
    
    // Check immediately
    checkRemindersForNotification(savedReminders)
  }, [])

  useEffect(() => {
    // Setup interval untuk check reminders setiap 30 detik
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    
    intervalRef.current = setInterval(() => {
      const currentReminders = JSON.parse(localStorage.getItem('reminders') || '[]')
      checkRemindersForNotification(currentReminders)
    }, 30000)
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const checkRemindersForNotification = (reminderList) => {
    if (!reminderList || reminderList.length === 0) return
    
    const sentIds = checkAndSendReminders(reminderList)
    
    if (sentIds && sentIds.length > 0) {
      // Mark as notified
      const updated = reminderList.map(r => 
        sentIds.includes(r.id) ? { ...r, notified: true } : r
      )
      saveReminders(updated)
    }
  }

  const handleRequestPermission = async () => {
    const result = await requestNotificationPermission()
    setNotificationPermission(result.permission || Notification.permission)
    setNotificationStatus(result.message)
    
    if (result.permission === 'granted') {
      setTimeout(() => setNotificationStatus(''), 3000)
      // Test notification
      setTimeout(() => {
        sendReminderNotification({
          id: 'test',
          title: 'Notifikasi Berhasil Diaktifkan!',
          description: 'Anda akan menerima notifikasi saat pengingat tiba.',
          dateTime: new Date().toISOString(),
          priority: 'medium'
        })
      }, 500)
    }
  }

  const handleTestNotification = () => {
    if (Notification.permission === 'granted') {
      sendReminderNotification({
        id: 'test',
        title: 'Test Notifikasi',
        description: 'Ini adalah notifikasi uji coba. Notifikasi Anda berfungsi dengan baik!',
        dateTime: new Date().toISOString(),
        priority: 'medium'
      })
      setNotificationStatus('Notifikasi uji coba dikirim!')
      setTimeout(() => setNotificationStatus(''), 3000)
    } else {
      setNotificationStatus('Silakan aktifkan notifikasi terlebih dahulu')
      setTimeout(() => setNotificationStatus(''), 3000)
    }
  }

  const handleOpenSettings = async () => {
    const result = await openNotificationSettings()
    
    // Tampilkan pesan dengan instruksi
    let fullMessage = result.message
    if (result.instruction) {
      fullMessage += '\n\n' + result.instruction
    }
    if (result.url) {
      fullMessage += '\n\n' + result.url
    }
    
    setNotificationStatus(fullMessage)
    
    // Jika ada URL, coba copy ke clipboard dan buka
    if (result.url) {
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(result.url)
        }
      } catch (e) {
        console.log('Tidak bisa copy ke clipboard')
      }
    }
    
    // Refresh permission status setelah beberapa detik
    const checkInterval = setInterval(() => {
      if ('Notification' in window) {
        const currentPermission = Notification.permission
        if (currentPermission !== notificationPermission) {
          setNotificationPermission(currentPermission)
          setNotificationStatus('')
          clearInterval(checkInterval)
        }
      }
    }, 1000)
    
    // Clear setelah 10 detik
    setTimeout(() => {
      clearInterval(checkInterval)
      if (notificationStatus === fullMessage) {
        setNotificationStatus('')
      }
    }, 10000)
  }


  const saveReminders = (updatedReminders) => {
    localStorage.setItem('reminders', JSON.stringify(updatedReminders))
    setReminders(updatedReminders)
  }

  const addReminder = () => {
    if (!newReminder.title.trim() || !newReminder.dateTime) return

    const reminder = {
      id: Date.now(),
      ...newReminder,
      notified: false,
      createdAt: new Date().toISOString()
    }

    // Smart suggestion for optimal time
    const reminderTime = new Date(reminder.dateTime)
    const hour = reminderTime.getHours()
    let suggestion = ''
    
    if (hour < 6) {
      suggestion = '💡 Saran: Waktu sangat pagi, pertimbangkan untuk mengatur ulang.'
    } else if (hour >= 22) {
      suggestion = '💡 Saran: Waktu sudah malam, pastikan tidak mengganggu istirahat.'
    }

    saveReminders([...reminders, reminder])
    setNewReminder({
      title: '',
      description: '',
      dateTime: '',
      repeat: 'none',
      priority: 'medium'
    })

    if (suggestion) {
      setTimeout(() => alert(suggestion), 100)
    }
  }

  const deleteReminder = (id) => {
    if (confirm('Yakin ingin menghapus pengingat ini?')) {
      saveReminders(reminders.filter(r => r.id !== id))
    }
  }

  const getReminderStatus = (reminder) => {
    const now = new Date()
    const reminderTime = new Date(reminder.dateTime)
    const diff = reminderTime - now

    if (diff < 0) {
      return { status: 'past', text: 'Sudah lewat' }
    } else if (diff < 3600000) {
      return { status: 'soon', text: 'Segera' }
    } else if (diff < 86400000) {
      return { status: 'today', text: 'Hari ini' }
    } else {
      return { status: 'upcoming', text: 'Mendatang' }
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#f87171'
      case 'medium': return '#fbbf24'
      case 'low': return '#60a5fa'
      default: return '#9ca3af'
    }
  }

  const sortedReminders = [...reminders].sort((a, b) => {
    return new Date(a.dateTime) - new Date(b.dateTime)
  })

  return (
    <div className="reminder-manager">
      <div className="reminder-header">
        <h2>⏰ Reminder Cerdas</h2>
        <p className="subtitle">Atur pengingat dengan notifikasi cerdas</p>
        
        <div className="notification-controls">
          {notificationPermission === 'granted' ? (
            <>
              <div className="notification-status granted">
                ✅ Notifikasi Aktif
              </div>
              <button 
                onClick={handleTestNotification}
                className="test-notification-btn"
              >
                🧪 Uji Notifikasi
              </button>
            </>
          ) : notificationPermission === 'denied' ? (
            <>
              <div className="notification-status denied">
                ❌ Notifikasi Ditolak
                <small>Silakan aktifkan di pengaturan browser</small>
              </div>
              <button 
                onClick={handleOpenSettings}
                className="open-settings-btn"
              >
                ⚙️ Buka Pengaturan Browser
              </button>
            </>
          ) : (
            <button 
              onClick={handleRequestPermission}
              className="enable-notification-btn"
            >
              🔔 Aktifkan Notifikasi
            </button>
          )}
          {notificationStatus && (
            <div className="notification-message">{notificationStatus}</div>
          )}
        </div>
      </div>

      <div className="reminder-form">
        <div className="form-row">
          <input
            type="text"
            placeholder="Judul pengingat..."
            value={newReminder.title}
            onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
            className="reminder-input"
          />
        </div>
        
        <div className="form-row">
          <input
            type="text"
            placeholder="Deskripsi (opsional)"
            value={newReminder.description}
            onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
            className="reminder-input"
          />
        </div>

        <div className="form-row">
          <input
            type="datetime-local"
            value={newReminder.dateTime}
            onChange={(e) => setNewReminder({ ...newReminder, dateTime: e.target.value })}
            className="reminder-input"
          />
          
          <select
            value={newReminder.repeat}
            onChange={(e) => setNewReminder({ ...newReminder, repeat: e.target.value })}
            className="reminder-select"
          >
            <option value="none">Tidak diulang</option>
            <option value="daily">Harian</option>
            <option value="weekly">Mingguan</option>
            <option value="monthly">Bulanan</option>
          </select>
          
          <select
            value={newReminder.priority}
            onChange={(e) => setNewReminder({ ...newReminder, priority: e.target.value })}
            className="reminder-select"
          >
            <option value="low">Prioritas Rendah</option>
            <option value="medium">Prioritas Sedang</option>
            <option value="high">Prioritas Tinggi</option>
          </select>
        </div>

        <button onClick={addReminder} className="add-reminder-btn">
          + Tambah Pengingat
        </button>
      </div>

      <div className="reminders-list">
        <h3>Daftar Pengingat ({reminders.length})</h3>
        {sortedReminders.length === 0 ? (
          <div className="empty-state">
            <p>📭 Tidak ada pengingat</p>
          </div>
        ) : (
          sortedReminders.map(reminder => {
            const status = getReminderStatus(reminder)
            return (
              <div
                key={reminder.id}
                className={`reminder-item ${status.status}`}
              >
                <div className="reminder-content">
                  <div className="reminder-header-item">
                    <h3>{reminder.title}</h3>
                    <span
                      className={`reminder-status ${status.status}`}
                    >
                      {status.text}
                    </span>
                  </div>
                  {reminder.description && (
                    <p className="reminder-desc">{reminder.description}</p>
                  )}
                  <div className="reminder-meta">
                    <span className="reminder-time">
                      📅 {format(new Date(reminder.dateTime), 'dd MMM yyyy, HH:mm')}
                    </span>
                    {reminder.repeat !== 'none' && (
                      <span className="reminder-repeat">
                        🔁 {reminder.repeat === 'daily' ? 'Harian' : 
                            reminder.repeat === 'weekly' ? 'Mingguan' : 'Bulanan'}
                      </span>
                    )}
                    <span
                      className="reminder-priority"
                      style={{ backgroundColor: getPriorityColor(reminder.priority) }}
                    >
                      {reminder.priority === 'high' ? 'Tinggi' : 
                       reminder.priority === 'medium' ? 'Sedang' : 'Rendah'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => deleteReminder(reminder.id)}
                  className="delete-reminder-btn"
                >
                  🗑️
                </button>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default ReminderManager

