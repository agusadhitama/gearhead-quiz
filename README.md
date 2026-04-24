# GEARHEAD - Mobil Apa Kamu?

> **Fast & Furious Personality Quiz** Temukan mobil ikonik yang paling mencerminkan kepribadianmu.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![No Framework](https://img.shields.io/badge/No_Framework-Pure_Vanilla-ff3118?style=for-the-badge)

---

## 🔥 Preview

```
  ███╗   ███╗ ██████╗ ██████╗ ██╗██╗
  ████╗ ████║██╔═══██╗██╔══██╗██║██║
  ██╔████╔██║██║   ██║██████╔╝██║██║
  ██║╚██╔╝██║██║   ██║██╔══██╗██║██║
  ██║ ╚═╝ ██║╚██████╔╝██████╔╝██║███████╗
  ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚═╝╚══════╝
        APA KAMU?
```

---

## 📖 Tentang Project

**GEARHEAD** adalah web quiz interaktif bertema **Fast & Furious** yang mencocokkan kepribadian pengguna dengan mobil ikonik berdasarkan 15 pertanyaan personal. Dibangun sepenuhnya dengan **HTML, CSS, dan JavaScript vanilla** tanpa framework atau library eksternal.

Quiz ini menggunakan sistem scoring 6 dimensi kepribadian:

| Dimensi | Deskripsi |
|---|---|
| `aggro` | Dominan, powerful, fearless |
| `precision` | Kalkulatif, analitis, terstruktur |
| `cool` | Tenang, ikonik, understated |
| `tuner` | Builder, passionate, detail-oriented |
| `elegant` | Visioner, ambisius, berkelas |
| `style` | Autentik, taste-maker, artistik |

---

## 🚗 Daftar 15 Hasil Mobil

| # | Mobil | Tipe Kepribadian |
|---|---|---|
| 1 | Dodge Charger SRT Hellcat | Aggro dominan |
| 2 | Nissan GT-R R35 | Precision dominan |
| 3 | Toyota Supra MK4 | Cool dominan |
| 4 | Mitsubishi Lancer EVO IX | Tuner dominan |
| 5 | Lamborghini Aventador LP700 | Elegant dominan |
| 6 | Mazda RX-7 FD3S | Style dominan |
| 7 | Porsche 911 GT3 RS | Precision + Cool |
| 8 | Nissan Skyline GT-R R34 | Cool + Tuner |
| 9 | Ford Mustang Shelby GT500 | Aggro + Style |
| 10 | Ferrari 488 Pista | Elegant + Precision |
| 11 | Subaru Impreza WRX STi | Tuner + Style |
| 12 | Aston Martin DB11 | Cool + Elegant |
| 13 | McLaren 720S | Aggro + Precision |
| 14 | Koenigsegg Agera RS | Style + Elegant |
| 15 | Honda NSX Type R NA1 | Balanced / Mixed |

---

## ✨ Fitur

- **15 pertanyaan personal** berbasis karakter dan kebiasaan nyata, bukan pertanyaan generik
- **15 hasil mobil berbeda** dengan sistem scoring kombinasi 6 dimensi
- **Profil lengkap** nama, tahun, tagline, deskripsi kepribadian, spesifikasi teknis, traits, dan penampilan di film Fast & Furious
- **Match Meter** bar animasi yang menunjukkan persentase kecocokan per dimensi
- **Animated Canvas Background** particle grid dinamis yang responsif
- **Cinematic Loading Screen** radar sweep + progress bar saat menghitung hasil
- **Full Responsive** optimal di desktop maupun mobile
- **Pure Vanilla** zero dependency, zero framework, zero library

---

## 🗂️ Struktur Project

```
gearhead-quiz/
│
├── index.html       ← Struktur HTML semua screen
├── style.css        ← Semua styling, animasi & layout
├── quiz.js          ← Logic quiz, data soal, data mobil
└── README.md
```

### Penjelasan File

**`index.html`**
Berisi 4 screen utama yang di-toggle via JavaScript:
- `#s-intro` Landing page dengan judul & tombol mulai
- `#s-quiz` Screen pertanyaan dengan progress bar
- `#s-calc` Loading screen radar saat menghitung
- `#s-result` Halaman hasil lengkap

**`style.css`**
- CSS Variables untuk theming konsisten
- Cinematic dark aesthetic (`#08080f` base)
- Kontras teks tinggi: putih / off-white di atas background gelap
- Animasi: `riseIn`, `qIn`, `radarSpin`, `calcLoad`, `match-bar`
- Fully responsive dengan breakpoint 720px dan 420px

**`quiz.js`**
- Canvas particle system (IIFE, auto-resize)
- Array `QUESTIONS` 15 objek pertanyaan dengan skor per opsi
- Object `CARS` 15 profil mobil lengkap
- `determineResult()` scoring engine berbasis normalisasi + mapping kombinasi
- DOM builder + event handler murni tanpa jQuery

---

## 🚀 Cara Deploy ke GitHub Pages

### 1. Clone / Download
```bash
git clone https://github.com/USERNAME/gearhead-quiz.git
cd gearhead-quiz
```

### 2. Pastikan struktur file benar
```
gearhead-quiz/
├── index.html   ✓
├── style.css    ✓
└── quiz.js      ✓
```

### 3. Push ke GitHub
```bash
git add .
git commit -m "feat: initial commit - gearhead quiz"
git push origin main
```

### 4. Aktifkan GitHub Pages
1. Buka repo di GitHub
2. Klik **Settings** → **Pages**
3. Di bagian **Source**, pilih `Deploy from a branch`
4. Branch: `main` Folder: `/ (root)`
5. Klik **Save**

### 5. Akses
```
https://USERNAME.github.io/gearhead-quiz
```
> Tunggu 1–3 menit setelah push pertama untuk GitHub Pages aktif.

---

## 🛠️ Cara Jalankan Secara Lokal

Tidak perlu server atau install apapun. Cukup:

```bash
# Buka langsung di browser
open index.html

# Atau gunakan Live Server di VS Code
# Install extension "Live Server" → klik kanan index.html → Open with Live Server
```

---

## 🎨 Design System

| Elemen | Nilai |
|---|---|
| Background root | `#08080f` |
| Card/panel | `#13131f` |
| Teks utama | `#ffffff` |
| Teks isi | `#dcdcf0` |
| Teks muted | `#9898b8` |
| Aksen merah | `#ff3118` |
| Aksen amber | `#ffb300` |
| Font display | Black Ops One |
| Font UI | Rajdhani |
| Font mono | Share Tech Mono |

---

## 📱 Browser Support

| Browser | Status |
|---|---|
| Chrome 90+ | ✅ Full support |
| Firefox 88+ | ✅ Full support |
| Safari 14+ | ✅ Full support |
| Edge 90+ | ✅ Full support |
| Mobile Chrome/Safari | ✅ Responsive |

---

## 👤 Author

**Agus Satria Adhitama**

> *"You don't need a framework to build something fast."*

---

## 📄 License

MIT License - bebas digunakan, dimodifikasi, dan didistribusikan.
