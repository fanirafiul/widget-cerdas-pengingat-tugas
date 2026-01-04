# 📖 Buku Panduan Penggunaan

## Widget Cerdas Pengingat Tugas

---

## 📑 Daftar Isi

1. [Pengenalan Aplikasi](#pengenalan-aplikasi)
2. [Memulai Aplikasi](#memulai-aplikasi)
3. [Dashboard Personal](#dashboard-personal)
4. [Task Manager Cerdas](#task-manager-cerdas)
5. [Reminder Cerdas dengan Notifikasi](#reminder-cerdas-dengan-notifikasi)
6. [Weather & Aktivitas](#weather--aktivitas)
7. [Smart Notes](#smart-notes)
8. [Tips & Trik](#tips--trik)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 Pengenalan Aplikasi

**Widget Cerdas Pengingat Tugas** adalah aplikasi web modern yang membantu Anda mengelola tugas, pengingat, dan aktivitas sehari-hari dengan fitur sistem cerdas yang otomatis.

### Fitur Utama:

- ✅ Manajemen tugas dengan prioritas otomatis
- ⏰ Pengingat dengan notifikasi browser
- 🌤️ Informasi cuaca dan rekomendasi aktivitas
- 📝 Catatan dengan kategorisasi otomatis
- 📊 Dashboard dengan insight cerdas

---

## 🚀 Memulai Aplikasi

### 1. Instalasi

```bash
# Install dependencies
npm install

# Jalankan aplikasi
npm run dev
```

### 2. Membuka Aplikasi

1. Buka browser Anda (Chrome, Firefox, Edge, atau Safari)
2. Akses aplikasi di: `http://localhost:5173`
3. Aplikasi siap digunakan!

### 3. Struktur Navigasi

Aplikasi memiliki 5 tab utama:

- 📊 **Dashboard** - Ringkasan dan insight
- ✅ **Tugas** - Manajemen tugas
- ⏰ **Pengingat** - Pengingat dengan notifikasi
- 🌤️ **Cuaca** - Informasi cuaca
- 📝 **Catatan** - Catatan cerdas

---

## 📊 Dashboard Personal

Dashboard memberikan ringkasan aktivitas Anda dan insight cerdas.

### Fitur Dashboard:

#### Statistik Harian

- **Tugas Pending**: Jumlah tugas yang belum selesai
- **Selesai Hari Ini**: Tugas yang sudah diselesaikan hari ini
- **Total Pengingat**: Jumlah pengingat yang aktif
- **Total Catatan**: Jumlah catatan yang tersimpan

#### Insight Cerdas

Dashboard secara otomatis menganalisis aktivitas Anda dan memberikan insight:

- ⚠️ **Peringatan**: Jika tingkat penyelesaian tugas rendah
- 🎉 **Pujian**: Jika produktivitas tinggi
- 🚨 **Alert**: Jika ada tugas yang terlambat
- ⏰ **Info**: Pengingat yang akan datang
- 🔥 **Prioritas**: Tugas dengan prioritas tinggi

#### Aksi Cepat

- **🔄 Refresh Data**: Memuat ulang semua data
- **🗑️ Reset Data**: Menghapus semua data (hati-hati!)

---

## ✅ Task Manager Cerdas

Fitur untuk mengelola tugas dengan sistem cerdas yang otomatis.

### Menambah Tugas Baru

1. **Masukkan Judul Tugas**

   - Ketik judul tugas di kolom "Judul tugas..."
   - Tekan Enter atau klik tombol "+ Tambah"

2. **Deskripsi (Opsional)**

   - Tambahkan detail tugas jika diperlukan

3. **Atur Prioritas**

   - **Rendah**: Tugas tidak mendesak
   - **Sedang**: Tugas normal
   - **Tinggi**: Tugas penting dan mendesak

4. **Tanggal Deadline**

   - Pilih tanggal kapan tugas harus selesai

5. **Kategori (Opsional)**
   - Biarkan kosong untuk kategorisasi otomatis
   - Atau masukkan kategori manual

### Fitur Cerdas Task Manager

#### Deteksi Prioritas Otomatis

Sistem akan otomatis mendeteksi prioritas dari kata kunci:

- Kata "penting", "urgent", "segera" → Prioritas **Tinggi**
- Kata "biasa", "nanti" → Prioritas **Rendah**

#### Kategorisasi Otomatis

Sistem akan otomatis mengkategorikan tugas berdasarkan kata kunci:

- "kerja", "work" → Kategori **Kerja**
- "belajar", "study" → Kategori **Belajar**
- "belanja", "shopping" → Kategori **Belanja**
- "olahraga", "exercise" → Kategori **Kesehatan**
- Lainnya → Kategori **Umum**

#### Saran Cerdas

Sistem memberikan saran berdasarkan:

- **Waktu**: Saran aktivitas berdasarkan jam
- **Jumlah Tugas**: Peringatan jika terlalu banyak tugas
- **Tugas Terlambat**: Peringatan untuk tugas yang sudah melewati deadline

### Mengelola Tugas

#### Filter Tugas

- **Semua**: Menampilkan semua tugas
- **Pending**: Hanya tugas yang belum selesai
- **Selesai**: Hanya tugas yang sudah selesai
- **Prioritas Tinggi**: Tugas dengan prioritas tinggi

#### Menandai Tugas Selesai

- Centang checkbox di sebelah kiri tugas
- Tugas akan otomatis dipindah ke bawah dan dicoret

#### Menghapus Tugas

- Klik ikon 🗑️ di sebelah kanan tugas
- Konfirmasi penghapusan

#### Sorting Otomatis

Tugas diurutkan secara otomatis:

1. Prioritas (Tinggi → Sedang → Rendah)
2. Deadline terdekat
3. Tugas selesai di bawah

---

## ⏰ Reminder Cerdas dengan Notifikasi

Fitur pengingat dengan notifikasi browser real-time.

### Mengaktifkan Notifikasi

1. Buka tab **⏰ Pengingat**
2. Klik tombol **"🔔 Aktifkan Notifikasi"**
3. Izinkan notifikasi saat browser meminta izin
4. Notifikasi berhasil diaktifkan! ✅

### Status Notifikasi

- **✅ Notifikasi Aktif**: Notifikasi sudah diaktifkan
- **❌ Notifikasi Ditolak**: Notifikasi ditolak, klik "⚙️ Buka Pengaturan Browser"

### Mengatur Pengingat

1. **Judul Pengingat**

   - Masukkan judul pengingat (wajib)

2. **Deskripsi (Opsional)**

   - Tambahkan detail pengingat

3. **Waktu & Tanggal**

   - Pilih tanggal dan waktu pengingat
   - Format: Tanggal dan Jam

4. **Pengulangan**

   - **Tidak diulang**: Pengingat sekali saja
   - **Harian**: Setiap hari pada waktu yang sama
   - **Mingguan**: Setiap minggu pada hari dan waktu yang sama
   - **Bulanan**: Setiap bulan pada tanggal dan waktu yang sama

5. **Prioritas**
   - **Rendah**: Notifikasi otomatis tertutup setelah 5 detik
   - **Sedang**: Notifikasi otomatis tertutup setelah 5 detik
   - **Tinggi**: Notifikasi tetap terbuka sampai ditutup manual

### Fitur Cerdas Reminder

#### Saran Waktu Optimal

Sistem memberikan saran jika:

- Waktu terlalu pagi (< 6 AM): Saran untuk mengatur ulang
- Waktu terlalu malam (≥ 10 PM): Peringatan untuk tidak mengganggu istirahat

#### Notifikasi Otomatis

- Sistem memeriksa pengingat setiap 30 detik
- Notifikasi dikirim saat waktu pengingat tiba (dalam ±1 menit)
- Pengingat otomatis ditandai sebagai "sudah dikirim"

#### Status Pengingat

- **Segera**: Pengingat dalam 1 jam ke depan (warna merah)
- **Hari ini**: Pengingat hari ini (warna kuning)
- **Mendatang**: Pengingat di masa depan (warna biru)
- **Sudah lewat**: Pengingat yang sudah lewat (abu-abu)

### Menguji Notifikasi

1. Klik tombol **"🧪 Uji Notifikasi"**
2. Notifikasi uji coba akan muncul
3. Jika muncul, berarti notifikasi berfungsi dengan baik!

### Mengatasi Notifikasi Ditolak

Jika notifikasi ditolak:

1. Klik tombol **"⚙️ Buka Pengaturan Browser"**
2. Ikuti instruksi yang muncul:
   - **Chrome/Edge**: URL akan disalin, tempel di address bar
   - **Firefox**: Ikuti langkah-langkah yang ditampilkan
   - **Safari**: Ikuti instruksi untuk macOS
3. Aktifkan notifikasi untuk situs ini
4. Refresh halaman aplikasi

---

## 🌤️ Weather & Aktivitas

Fitur untuk melihat cuaca dan mendapatkan rekomendasi aktivitas.

### Menggunakan Weather Widget

1. Buka tab **🌤️ Cuaca**
2. Masukkan nama kota di kolom pencarian
3. Klik **"🔍 Cari"** atau tekan Enter
4. Informasi cuaca akan ditampilkan

### Informasi yang Ditampilkan

- **Kondisi Cuaca**: Cerah, Berawan, Hujan, atau Mendung
- **Suhu**: Temperatur dalam derajat Celsius
- **Kelembaban**: Persentase kelembaban udara
- **Kecepatan Angin**: Kecepatan angin dalam km/jam

### Rekomendasi Aktivitas Cerdas

Sistem memberikan rekomendasi berdasarkan:

#### Berdasarkan Cuaca

- **Hujan**:
  - 💡 Bawa payung
  - 🏠 Aktivitas dalam ruangan
- **Cerah**:
  - 🏃 Olahraga luar ruangan
  - 🧴 Gunakan sunscreen
- **Berawan**:
  - 🚶 Jalan-jalan

#### Berdasarkan Suhu

- **Suhu Tinggi (>30°C)**:
  - 💧 Tetap terhidrasi
- **Suhu Rendah (<25°C)**:
  - 🧥 Pakai jaket

#### Berdasarkan Waktu

- **Pagi (6-10 AM)**: Waktu yang baik untuk aktivitas produktif
- **Siang (10 AM-2 PM)**: Hindari aktivitas di bawah sinar matahari langsung
- **Sore (2-6 PM)**: Waktu yang baik untuk aktivitas

### Tips Harian

Widget juga menampilkan tips harian:

- 🌡️ Periksa cuaca sebelum keluar rumah
- ⏰ Waktu terbaik untuk aktivitas luar ruangan
- 💧 Pentingnya minum air yang cukup

---

## 📝 Smart Notes

Fitur catatan dengan kategorisasi otomatis dan pencarian cerdas.

### Menambah Catatan

1. **Judul Catatan**

   - Masukkan judul catatan
   - Bisa dikosongkan (akan menjadi "Catatan Tanpa Judul")

2. **Isi Catatan**

   - Tulis isi catatan di textarea
   - Mendukung beberapa baris

3. **Kategori (Opsional)**

   - Biarkan kosong untuk kategorisasi otomatis
   - Atau masukkan kategori manual

4. Klik **"+ Tambah Catatan"**

### Kategorisasi Otomatis

Sistem akan otomatis mengkategorikan catatan berdasarkan kata kunci:

- "kerja", "meeting", "proyek" → **Kerja**
- "belajar", "kuliah", "tugas" → **Belajar**
- "belanja", "shopping", "makanan" → **Belanja**
- "ide", "rencana", "proyek" → **Ide**
- "pribadi", "personal" → **Pribadi**
- Lainnya → **Umum**

### Mencari Catatan

1. Gunakan kolom **"🔍 Cari catatan..."**
2. Ketik kata kunci
3. Sistem akan mencari di:
   - Judul catatan
   - Isi catatan
   - Kategori

### Filter Kategori

- Klik kategori untuk menampilkan hanya catatan dari kategori tersebut
- Klik **"Semua"** untuk menampilkan semua catatan

### Mengelola Catatan

- **Menghapus**: Klik ikon 🗑️ di pojok kanan bawah catatan
- **Urutan**: Catatan diurutkan berdasarkan waktu update terbaru

### Statistik

Di bagian bawah daftar catatan, ditampilkan:

- Total catatan
- Jumlah catatan yang ditampilkan (setelah filter)

---

## 💡 Tips & Trik

### 1. Manfaatkan Fitur Cerdas

- Biarkan sistem mendeteksi prioritas dan kategori secara otomatis
- Gunakan kata kunci yang jelas untuk hasil yang lebih akurat

### 2. Gunakan Notifikasi

- Aktifkan notifikasi untuk tidak melewatkan pengingat penting
- Set prioritas tinggi untuk pengingat yang sangat penting

### 3. Organisasi Tugas

- Gunakan kategori untuk mengelompokkan tugas
- Atur deadline yang realistis
- Tandai tugas selesai segera setelah selesai

### 4. Dashboard Insight

- Periksa dashboard secara rutin untuk melihat insight
- Gunakan insight untuk meningkatkan produktivitas

### 5. Weather Widget

- Periksa cuaca sebelum merencanakan aktivitas luar ruangan
- Ikuti rekomendasi aktivitas untuk hari yang lebih produktif

### 6. Smart Notes

- Gunakan pencarian untuk menemukan catatan lama dengan cepat
- Manfaatkan kategorisasi otomatis untuk organisasi yang lebih baik

### 7. Data Lokal

- Semua data disimpan di browser Anda (localStorage)
- Data tidak akan hilang kecuali:
  - Menghapus data browser
  - Menggunakan mode incognito/private
  - Menggunakan tombol "Reset Data"

---

## 🔧 Troubleshooting

### Notifikasi Tidak Muncul

**Masalah**: Notifikasi tidak muncul meskipun sudah diaktifkan

**Solusi**:

1. Pastikan browser mendukung notifikasi
2. Periksa izin notifikasi di pengaturan browser
3. Pastikan aplikasi tidak dalam mode incognito/private
4. Refresh halaman aplikasi
5. Coba uji notifikasi dengan tombol "🧪 Uji Notifikasi"

### Data Hilang

**Masalah**: Tugas, pengingat, atau catatan hilang

**Solusi**:

1. Periksa apakah menggunakan mode incognito/private
2. Periksa apakah data browser dihapus
3. Data disimpan di localStorage browser
4. Jika menggunakan browser berbeda, data tidak akan tersinkron

### Dropdown Prioritas Tidak Terlihat

**Masalah**: Teks di dropdown prioritas tidak terlihat

**Solusi**:

1. Refresh halaman
2. Pastikan menggunakan browser terbaru
3. Teks seharusnya berwarna putih dan terlihat jelas

### Weather Tidak Update

**Masalah**: Informasi cuaca tidak berubah

**Solusi**:

1. Weather widget menggunakan data simulasi
2. Untuk data cuaca real-time, perlu integrasi dengan API cuaca
3. Coba cari kota lain untuk melihat variasi

### Aplikasi Lambat

**Masalah**: Aplikasi terasa lambat

**Solusi**:

1. Tutup tab lain yang tidak digunakan
2. Refresh halaman
3. Hapus data lama jika sudah terlalu banyak
4. Gunakan browser terbaru

### Notifikasi Terlalu Banyak

**Masalah**: Terlalu banyak notifikasi

**Solusi**:

1. Hapus pengingat yang tidak diperlukan
2. Atur prioritas yang sesuai
3. Gunakan pengulangan dengan bijak

---

## 📞 Bantuan Tambahan

### Fitur yang Tersedia

- ✅ Task Manager dengan prioritas otomatis
- ⏰ Reminder dengan notifikasi browser
- 🌤️ Weather widget dengan rekomendasi
- 📝 Smart Notes dengan kategorisasi otomatis
- 📊 Dashboard dengan insight cerdas

### Teknologi

- React 18
- Vite
- LocalStorage untuk penyimpanan
- Web Notifications API

### Catatan Penting

- Aplikasi ini adalah aplikasi web yang berjalan di browser
- Data disimpan secara lokal di browser Anda
- Tidak memerlukan koneksi internet setelah dimuat (kecuali untuk weather)
- Tidak memerlukan akun atau login
- Gratis dan open source

---

## 🎉 Selamat Menggunakan!

Aplikasi **Widget Cerdas Pengingat Tugas** dirancang untuk membantu Anda menjadi lebih produktif dan terorganisir. Manfaatkan semua fitur cerdas yang tersedia untuk pengalaman terbaik!

**Tips Terakhir**:

- Gunakan aplikasi secara konsisten
- Review dashboard secara rutin
- Aktifkan notifikasi untuk pengingat penting
- Manfaatkan fitur otomatis untuk efisiensi maksimal

---

**Versi**: 1.0.0  
**Terakhir Diupdate**: 2026
