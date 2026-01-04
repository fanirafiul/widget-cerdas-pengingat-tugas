import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import './SmartNotes.css'

function SmartNotes() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    category: ''
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]')
    setNotes(savedNotes)
  }, [])

  const saveNotes = (updatedNotes) => {
    localStorage.setItem('notes', JSON.stringify(updatedNotes))
    setNotes(updatedNotes)
  }

  const autoCategorize = (title, content) => {
    const text = (title + ' ' + content).toLowerCase()
    
    if (text.includes('kerja') || text.includes('meeting') || text.includes('proyek')) {
      return 'Kerja'
    } else if (text.includes('belajar') || text.includes('kuliah') || text.includes('tugas')) {
      return 'Belajar'
    } else if (text.includes('belanja') || text.includes('shopping') || text.includes('makanan')) {
      return 'Belanja'
    } else if (text.includes('ide') || text.includes('rencana') || text.includes('proyek')) {
      return 'Ide'
    } else if (text.includes('pribadi') || text.includes('personal')) {
      return 'Pribadi'
    } else {
      return 'Umum'
    }
  }

  const addNote = () => {
    if (!newNote.title.trim() && !newNote.content.trim()) return

    const category = newNote.category || autoCategorize(newNote.title, newNote.content)
    
    const note = {
      id: Date.now(),
      title: newNote.title || 'Catatan Tanpa Judul',
      content: newNote.content,
      category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    saveNotes([...notes, note])
    setNewNote({
      title: '',
      content: '',
      category: ''
    })
  }

  const updateNote = (id, updatedContent) => {
    const updatedNotes = notes.map(note => {
      if (note.id === id) {
        return {
          ...note,
          ...updatedContent,
          updatedAt: new Date().toISOString()
        }
      }
      return note
    })
    saveNotes(updatedNotes)
  }

  const deleteNote = (id) => {
    if (confirm('Yakin ingin menghapus catatan ini?')) {
      saveNotes(notes.filter(note => note.id !== id))
    }
  }

  const getFilteredNotes = () => {
    let filtered = notes

    // Filter by category
    if (filterCategory !== 'all') {
      filtered = filtered.filter(note => note.category === filterCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query) ||
        note.category.toLowerCase().includes(query)
      )
    }

    return filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  }

  const getCategories = () => {
    const categories = ['all', ...new Set(notes.map(note => note.category))]
    return categories
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Kerja': '#3b82f6',
      'Belajar': '#10b981',
      'Belanja': '#f59e0b',
      'Ide': '#8b5cf6',
      'Pribadi': '#ec4899',
      'Umum': '#6b7280'
    }
    return colors[category] || '#6b7280'
  }

  const filteredNotes = getFilteredNotes()

  return (
    <div className="smart-notes">
      <div className="notes-header">
        <h2>📝 Smart Notes</h2>
        <p className="subtitle">Catatan dengan kategorisasi otomatis dan pencarian cerdas</p>
      </div>

      <div className="notes-form">
        <input
          type="text"
          placeholder="Judul catatan..."
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          className="note-input"
        />
        <textarea
          placeholder="Tulis catatan Anda di sini..."
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
          className="note-textarea"
          rows="4"
        />
        <div className="form-actions">
          <input
            type="text"
            placeholder="Kategori (opsional, akan terdeteksi otomatis)"
            value={newNote.category}
            onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
            className="note-input category-input"
          />
          <button onClick={addNote} className="add-note-btn">
            + Tambah Catatan
          </button>
        </div>
      </div>

      <div className="notes-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Cari catatan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="category-filters">
          {getCategories().map(category => (
            <button
              key={category}
              className={filterCategory === category ? 'active' : ''}
              onClick={() => setFilterCategory(category)}
              style={filterCategory === category && category !== 'all' ? {
                backgroundColor: getCategoryColor(category)
              } : {}}
            >
              {category === 'all' ? 'Semua' : category}
            </button>
          ))}
        </div>
      </div>

      <div className="notes-list">
        {filteredNotes.length === 0 ? (
          <div className="empty-state">
            <p>📭 {searchQuery ? 'Tidak ada catatan yang cocok' : 'Tidak ada catatan'}</p>
          </div>
        ) : (
          <div className="notes-grid">
            {filteredNotes.map(note => (
              <div key={note.id} className="note-card">
                <div className="note-header">
                  <h3>{note.title}</h3>
                  <span
                    className="note-category"
                    style={{ backgroundColor: getCategoryColor(note.category) }}
                  >
                    {note.category}
                  </span>
                </div>
                <div className="note-content">
                  {note.content.split('\n').map((line, index) => (
                    <p key={index}>{line || '\u00A0'}</p>
                  ))}
                </div>
                <div className="note-footer">
                  <span className="note-date">
                    {format(new Date(note.updatedAt), 'dd MMM yyyy, HH:mm')}
                  </span>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="delete-note-btn"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {notes.length > 0 && (
        <div className="notes-stats">
          <p>Total: {notes.length} catatan | Ditampilkan: {filteredNotes.length}</p>
        </div>
      )}
    </div>
  )
}

export default SmartNotes

