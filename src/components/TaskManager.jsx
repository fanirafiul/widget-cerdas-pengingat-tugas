import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import './TaskManager.css'

function TaskManager() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    category: ''
  })
  const [filter, setFilter] = useState('all')
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    setTasks(savedTasks)
    generateSuggestions(savedTasks)
  }, [])

  const saveTasks = (updatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
    setTasks(updatedTasks)
    generateSuggestions(updatedTasks)
  }

  const generateSuggestions = (taskList) => {
    const suggestionsList = []
    
    // Suggest based on time of day
    const hour = new Date().getHours()
    if (hour >= 6 && hour < 12) {
      suggestionsList.push({
        text: 'Waktu pagi yang baik untuk tugas-tugas penting!',
        type: 'time'
      })
    } else if (hour >= 12 && hour < 18) {
      suggestionsList.push({
        text: 'Sore hari cocok untuk tugas yang membutuhkan fokus tinggi.',
        type: 'time'
      })
    }

    // Suggest based on task count
    const pendingCount = taskList.filter(t => !t.completed).length
    if (pendingCount > 10) {
      suggestionsList.push({
        text: `Anda memiliki ${pendingCount} tugas pending. Pertimbangkan untuk fokus pada prioritas tinggi.`,
        type: 'count'
      })
    }

    // Suggest based on overdue tasks
    const overdue = taskList.filter(t => 
      !t.completed && t.dueDate && new Date(t.dueDate) < new Date()
    )
    if (overdue.length > 0) {
      suggestionsList.push({
        text: `Ada ${overdue.length} tugas terlambat. Prioritaskan untuk menyelesaikannya!`,
        type: 'overdue'
      })
    }

    setSuggestions(suggestionsList)
  }

  const addTask = () => {
    if (!newTask.title.trim()) return

    const task = {
      id: Date.now(),
      ...newTask,
      completed: false,
      createdAt: new Date().toISOString()
    }

    // Auto-detect priority based on keywords
    const title = task.title.toLowerCase()
    if (title.includes('penting') || title.includes('urgent') || title.includes('segera')) {
      task.priority = 'high'
    } else if (title.includes('biasa') || title.includes('nanti')) {
      task.priority = 'low'
    }

    // Auto-detect category
    if (!task.category) {
      if (title.includes('kerja') || title.includes('work')) task.category = 'Kerja'
      else if (title.includes('belajar') || title.includes('study')) task.category = 'Belajar'
      else if (title.includes('belanja') || title.includes('shopping')) task.category = 'Belanja'
      else if (title.includes('olahraga') || title.includes('exercise')) task.category = 'Kesehatan'
      else task.category = 'Umum'
    }

    saveTasks([...tasks, task])
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      category: ''
    })
  }

  const toggleTask = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed,
          completedAt: !task.completed ? new Date().toISOString() : null
        }
      }
      return task
    })
    saveTasks(updatedTasks)
  }

  const deleteTask = (id) => {
    if (confirm('Yakin ingin menghapus tugas ini?')) {
      saveTasks(tasks.filter(task => task.id !== id))
    }
  }

  const getFilteredTasks = () => {
    switch (filter) {
      case 'pending':
        return tasks.filter(t => !t.completed)
      case 'completed':
        return tasks.filter(t => t.completed)
      case 'high':
        return tasks.filter(t => !t.completed && t.priority === 'high')
      default:
        return tasks
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

  return (
    <div className="task-manager">
      <div className="task-header">
        <h2>📋 Task Manager Cerdas</h2>
        {suggestions.length > 0 && (
          <div className="suggestions">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="suggestion-badge">
                💡 {suggestion.text}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="task-form">
        <div className="form-row">
          <input
            type="text"
            placeholder="Judul tugas..."
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            className="task-input"
          />
          <button onClick={addTask} className="add-btn">+ Tambah</button>
        </div>
        
        <div className="form-row">
          <input
            type="text"
            placeholder="Deskripsi (opsional)"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="task-input"
          />
        </div>

        <div className="form-row">
          <select
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            className="task-select"
          >
            <option value="low">Prioritas Rendah</option>
            <option value="medium">Prioritas Sedang</option>
            <option value="high">Prioritas Tinggi</option>
          </select>
          
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            className="task-input"
          />
          
          <input
            type="text"
            placeholder="Kategori (opsional)"
            value={newTask.category}
            onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
            className="task-input"
          />
        </div>
      </div>

      <div className="task-filters">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          Semua
        </button>
        <button
          className={filter === 'pending' ? 'active' : ''}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Selesai
        </button>
        <button
          className={filter === 'high' ? 'active' : ''}
          onClick={() => setFilter('high')}
        >
          Prioritas Tinggi
        </button>
      </div>

      <div className="tasks-list">
        {getFilteredTasks().length === 0 ? (
          <div className="empty-state">
            <p>📭 Tidak ada tugas</p>
          </div>
        ) : (
          getFilteredTasks()
            .sort((a, b) => {
              // Sort by priority and due date
              if (!a.completed && !b.completed) {
                const priorityOrder = { high: 3, medium: 2, low: 1 }
                if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
                  return priorityOrder[b.priority] - priorityOrder[a.priority]
                }
                if (a.dueDate && b.dueDate) {
                  return new Date(a.dueDate) - new Date(b.dueDate)
                }
              }
              return a.completed ? 1 : -1
            })
            .map(task => (
              <div
                key={task.id}
                className={`task-item ${task.completed ? 'completed' : ''}`}
              >
                <div className="task-checkbox">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                </div>
                <div className="task-content">
                  <h3>{task.title}</h3>
                  {task.description && <p>{task.description}</p>}
                  <div className="task-meta">
                    {task.category && (
                      <span className="task-category">{task.category}</span>
                    )}
                    {task.dueDate && (
                      <span className={`task-date ${new Date(task.dueDate) < new Date() && !task.completed ? 'overdue' : ''}`}>
                        📅 {format(new Date(task.dueDate), 'dd MMM yyyy')}
                      </span>
                    )}
                    <span
                      className="task-priority"
                      style={{ backgroundColor: getPriorityColor(task.priority) }}
                    >
                      {task.priority === 'high' ? 'Tinggi' : task.priority === 'medium' ? 'Sedang' : 'Rendah'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="delete-btn"
                >
                  🗑️
                </button>
              </div>
            ))
        )}
      </div>
    </div>
  )
}

export default TaskManager

