// Utility untuk menangani notifikasi browser

export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    return {
      supported: false,
      message: 'Browser Anda tidak mendukung notifikasi'
    }
  }

  if (Notification.permission === 'granted') {
    return {
      supported: true,
      permission: 'granted',
      message: 'Notifikasi sudah diaktifkan'
    }
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission()
    return {
      supported: true,
      permission,
      message: permission === 'granted' 
        ? 'Notifikasi berhasil diaktifkan!' 
        : 'Izin notifikasi ditolak'
    }
  }

  return {
    supported: true,
    permission: 'denied',
    message: 'Izin notifikasi ditolak. Silakan aktifkan di pengaturan browser.'
  }
}

export const sendNotification = (title, options = {}) => {
  if (!('Notification' in window)) {
    console.warn('Browser tidak mendukung notifikasi')
    return null
  }

  if (Notification.permission !== 'granted') {
    console.warn('Izin notifikasi belum diberikan')
    return null
  }

  const notificationOptions = {
    body: options.body || '',
    icon: options.icon || '/favicon.ico',
    badge: options.badge || '/favicon.ico',
    tag: options.tag || 'reminder',
    requireInteraction: options.requireInteraction || false,
    silent: options.silent || false,
    ...options
  }

  const notification = new Notification(title, notificationOptions)

  // Auto close setelah 5 detik jika tidak requireInteraction
  if (!notificationOptions.requireInteraction) {
    setTimeout(() => {
      notification.close()
    }, 5000)
  }

  // Handle click
  notification.onclick = () => {
    window.focus()
    notification.close()
  }

  return notification
}

export const sendReminderNotification = (reminder) => {
  const title = `⏰ ${reminder.title}`
  const body = reminder.description 
    ? reminder.description 
    : `Pengingat pada ${new Date(reminder.dateTime).toLocaleString('id-ID')}`
  
  const priority = reminder.priority || 'medium'
  const requireInteraction = priority === 'high'

  return sendNotification(title, {
    body,
    tag: `reminder-${reminder.id}`,
    requireInteraction,
    badge: '/favicon.ico',
    icon: '/favicon.ico'
  })
}

export const checkAndSendReminders = (reminders) => {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return
  }

  const now = new Date()
  const sentNotifications = []

  reminders.forEach(reminder => {
    if (reminder.notified) return

    const reminderTime = new Date(reminder.dateTime)
    const diff = reminderTime - now

    // Kirim notifikasi jika sudah waktunya (dalam 1 menit)
    if (diff <= 60000 && diff >= -60000) {
      sendReminderNotification(reminder)
      sentNotifications.push(reminder.id)
    }
  })

  return sentNotifications
}

export const openNotificationSettings = async () => {
  // Deteksi browser dan buka pengaturan notifikasi
  const userAgent = navigator.userAgent.toLowerCase()
  
  // Chrome/Edge/Opera
  if (userAgent.includes('chrome') || userAgent.includes('edg') || userAgent.includes('opr')) {
    const url = 'chrome://settings/content/notifications'
    
    // Coba copy URL ke clipboard
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url)
        return { 
          success: true, 
          message: '✅ URL pengaturan sudah disalin! Tempel di address bar browser Anda dan tekan Enter.',
          url,
          instruction: '1. Klik address bar\n2. Tempel (Ctrl+V)\n3. Tekan Enter\n4. Aktifkan notifikasi untuk situs ini'
        }
      }
    } catch (e) {
      console.log('Clipboard tidak tersedia')
    }
    
    // Fallback: tampilkan instruksi
    return { 
      success: true, 
      message: '📋 Salin URL ini ke address bar:',
      url,
      instruction: '1. Salin: chrome://settings/content/notifications\n2. Tempel di address bar\n3. Tekan Enter\n4. Aktifkan notifikasi untuk situs ini'
    }
  }
  
  // Firefox
  if (userAgent.includes('firefox')) {
    return {
      success: true,
      message: '📋 Instruksi untuk Firefox:',
      instruction: '1. Klik ikon gembok 🔒 di address bar\n2. Pilih "Izin"\n3. Centang "Notifikasi"\n4. Refresh halaman ini'
    }
  }
  
  // Safari
  if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
    return {
      success: true,
      message: '📋 Instruksi untuk Safari:',
      instruction: '1. Buka Safari → Preferences (⌘,)\n2. Pilih tab "Websites"\n3. Pilih "Notifications" di sidebar\n4. Pilih "Allow" untuk situs ini\n5. Refresh halaman ini'
    }
  }
  
  // Default/Unknown browser
  return {
    success: true,
    message: '📋 Instruksi umum:',
    instruction: '1. Buka pengaturan browser Anda\n2. Cari opsi "Notifikasi" atau "Notifications"\n3. Aktifkan notifikasi untuk situs ini\n4. Refresh halaman ini'
  }
}

