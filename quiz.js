/* ═══════════════════════════════════════════════
   GEARHEAD QUIZ - quiz.js
   15 Personal Questions · 15 Car Results
═══════════════════════════════════════════════ */

"use strict";

// ══════════════════════════════════════════════
// CANVAS BACKGROUND - Particle Grid
// ══════════════════════════════════════════════
(function initCanvas() {
  const canvas = document.getElementById("bgCanvas");
  const ctx = canvas.getContext("2d");
  let W, H, particles = [], lines = [];
  const PARTICLE_COUNT = 60;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.4 + 0.1
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,40,0,${0.04 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,40,0,${p.alpha})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", () => { resize(); createParticles(); });
  resize();
  createParticles();
  draw();
})();

// ══════════════════════════════════════════════
// 15 PERSONAL QUESTIONS
// ══════════════════════════════════════════════
const QUESTIONS = [
  {
    cat: "KEPRIBADIAN DASAR",
    text: "Teman-temanmu sering bilang kamu itu...",
    sub: "Jujur, pilih yang paling sering diucapkan orang-orang terdekatmu.",
    emoji: "👥",
    opts: [
      { text: "Tenang, kalem, tapi sekali gerak semua kaget", score: { cool: 3 } },
      { text: "Energik, gila-gilaan, selalu bikin situasi hidup", score: { aggro: 3 } },
      { text: "Detail-oriented, perfeksionis, nggak bisa asal", score: { precision: 3 } },
      { text: "Punya selera sendiri, nggak bisa dipaksa ikut arus", score: { style: 3 } }
    ]
  },
  {
    cat: "SITUASI DARURAT",
    text: "Kamu lagi di tol, ban belakang mulai slip di tikungan basah. Instingmu?",
    sub: "Ini bukan soal pengalaman, ini soal karakter aslimu.",
    emoji: "🌧️",
    opts: [
      { text: "Counter-steer, gas dijaga, selesaikan tikungan", score: { precision: 3 } },
      { text: "Full throttle, ban slip = lebih seru", score: { aggro: 2, style: 1 } },
      { text: "Rem perlahan, pinggir dulu, evaluasi situasi", score: { cool: 3 } },
      { text: "Sudah hafal karakteristik ban ini, antisipasi dari awal", score: { tuner: 3 } }
    ]
  },
  {
    cat: "RUTINITAS PAGI",
    text: "Alarm berbunyi jam 5 pagi. Kamu...",
    sub: "Sekecil apapun kebiasaan pagi, ia mencerminkan caramu menyalakan mesin hidup.",
    emoji: "☀️",
    opts: [
      { text: "Langsung bangun, sudah planned semua dari malam", score: { precision: 3 } },
      { text: "Tidur lagi 10 menit, tapi kemudian bergerak cepat", score: { aggro: 2, cool: 1 } },
      { text: "Kopi dulu, kontemplasinya panjang, tapi outputnya dahsyat", score: { elegant: 3 } },
      { text: "Nggak pernah tidur cukup, selalu ada yang dikerjain sampai subuh", score: { tuner: 3 } }
    ]
  },
  {
    cat: "CARA MENGAMBIL KEPUTUSAN",
    text: "Kamu harus beli mobil hari ini, budget sama. Kamu pilih berdasarkan...",
    sub: "Ini yang membedakan cara berpikirmu dari orang lain.",
    emoji: "🤔",
    opts: [
      { text: "Spek teknis, angka 0-100, bobot, power-to-weight ratio", score: { precision: 3 } },
      { text: "Feeling waktu pertama kali duduk di dalamnya", score: { style: 2, cool: 1 } },
      { text: "Potensi modifikasi jangka panjang", score: { tuner: 3 } },
      { text: "Reputasi, heritage, dan statement yang ia bawa", score: { elegant: 3 } }
    ]
  },
  {
    cat: "SOUNDTRACK JIWA",
    text: "Lagu yang paling menggambarkan energimu saat ini:",
    sub: "Bukan yang kamu sukai, tapi yang paling jujur mencerminkan kondisimu.",
    emoji: "🎵",
    opts: [
      { text: "Sesuatu yang lambat tapi berat - deep bass, no hurry", score: { cool: 3 } },
      { text: "Hard rock atau metal yang bikin adrenaline meledak", score: { aggro: 3 } },
      { text: "Electronic / techno yang terstruktur dan precise", score: { precision: 2, tuner: 1 } },
      { text: "Jazz atau soul - sophisticated, nggak perlu buru-buru", score: { elegant: 3 } }
    ]
  },
  {
    cat: "IDENTITAS DI JALANAN",
    text: "Di komunitas otomotif, kamu dikenal sebagai...",
    sub: "Versi dirimu yang paling otentik di lingkungan car enthusiast.",
    emoji: "🏎️",
    opts: [
      { text: "Yang mobilnya selalu dimodif dan nggak pernah selesai", score: { tuner: 3 } },
      { text: "Yang selalu menang, atau paling enggak bikin orang tegang", score: { aggro: 2, cool: 1 } },
      { text: "Yang mobilnya kelihatan biasa tapi bisa mati-matian di track", score: { precision: 3 } },
      { text: "Yang mobilnya jadi bahan foto semua orang", score: { style: 3 } }
    ]
  },
  {
    cat: "FILOSOFI KECEPATAN",
    text: "Bagimu, kecepatan adalah...",
    sub: "Satu kalimat yang paling jujur menggambarkan hubunganmu dengan kecepatan.",
    emoji: "⚡",
    opts: [
      { text: "Alat untuk buktikan diri, bukan untuk dinikmati", score: { aggro: 2, cool: 1 } },
      { text: "Hasil dari setup yang sempurna, bukan sekadar tenaga mesin", score: { precision: 3 } },
      { text: "Freedom, dunia terasa benar waktu kamu ngebut", score: { cool: 3 } },
      { text: "Seni, ada cara yang indah dan ada yang tidak", score: { elegant: 2, style: 1 } }
    ]
  },
  {
    cat: "REAKSI TERHADAP MASALAH",
    text: "Projectmu hancur total di malam sebelum deadline. Kamu...",
    sub: "Ini yang paling jujur tentang cara kamu handle tekanan nyata.",
    emoji: "💥",
    opts: [
      { text: "All-nighter, kerjain ulang dari nol, bisa selesai", score: { aggro: 2, tuner: 1 } },
      { text: "Diagnosa dulu, pecah masalah per bagian, execute", score: { precision: 3 } },
      { text: "Kalem, tapi fokus penuh - panik itu buang waktu", score: { cool: 3 } },
      { text: "Pivot - temukan solusi yang bahkan lebih elegan dari plan awal", score: { elegant: 3 } }
    ]
  },
  {
    cat: "HUBUNGAN DENGAN RISIKO",
    text: "Kamu dapat info tentang jalan kosong di gunung jam 2 pagi. Kamu...",
    sub: "Bukan soal apakah kamu melakukannya, tapi apa yang langsung ada di benakmu.",
    emoji: "🌙",
    opts: [
      { text: "Langsung gas - ini yang kamu tunggu-tunggu", score: { aggro: 3 } },
      { text: "Pergi, tapi cek dulu kondisi ban dan cuaca", score: { precision: 2, tuner: 1 } },
      { text: "Pergi, santai, nikmati momen - bukan untuk balapan", score: { cool: 3 } },
      { text: "Tunggu - ada waktu dan tempat yang lebih proper untuk ini", score: { elegant: 2 } }
    ]
  },
  {
    cat: "CARA MEMBUKTIKAN DIRI",
    text: "Waktu kamu perlu buktikan sesuatu, kamu melakukannya dengan...",
    sub: "Di luar konteks otomotif - ini soal caramu secara umum.",
    emoji: "🏆",
    opts: [
      { text: "Hasil - angka, laptime, output nyata", score: { precision: 3 } },
      { text: "Kehadiran - masuk ruangan dan semua orang sadar kamu ada", score: { aggro: 2, elegant: 1 } },
      { text: "Diam - biarkan karya bicara tanpa perlu promosi", score: { cool: 3 } },
      { text: "Proses - show how deep your knowledge goes", score: { tuner: 3 } }
    ]
  },
  {
    cat: "TIPE PERJALANAN IDEAL",
    text: "Road trip impian yang paling cocok denganmu:",
    sub: "Ini cerminan bagaimana kamu menikmati hidup di kecepatan tertingginya.",
    emoji: "🗺️",
    opts: [
      { text: "Solo di pegunungan, tikungan tajam, tidak ada GPS", score: { cool: 3 } },
      { text: "Convoy dengan squad, kompetitif, siapa tiba duluan", score: { aggro: 3 } },
      { text: "Rute yang sudah di-research detail, tahu setiap tikungan", score: { precision: 3 } },
      { text: "Kota ke kota, temukan scene keren, foto dan cerita", score: { style: 2, elegant: 1 } }
    ]
  },
  {
    cat: "PANDANGAN TENTANG KESEMPURNAAN",
    text: "Menurutmu, setup kendaraan yang sempurna adalah...",
    sub: "Satu pandangan yang paling mendekati filosofimu.",
    emoji: "🔩",
    opts: [
      { text: "Stock yang dirawat sempurna - original is sacred", score: { cool: 2, elegant: 1 } },
      { text: "Full build dengan power besar - lebih selalu lebih baik", score: { aggro: 3 } },
      { text: "Balanced - handling, power, dan look semuanya naik bareng", score: { tuner: 3 } },
      { text: "Presisi tinggi tanpa kompromi - dialed to perfection", score: { precision: 3 } }
    ]
  },
  {
    cat: "KARAKTER FAST & FURIOUS",
    text: "Jika kamu ada di franchise Fast & Furious, peranmu adalah...",
    sub: "Bukan siapa yang kamu ingin jadi, tapi siapa yang paling mirip kamu.",
    emoji: "🎬",
    opts: [
      { text: "Dom Toretto - pemimpin, loyal, nggak kenal mundur", score: { cool: 2, aggro: 1 } },
      { text: "Brian O'Conner - skilled, adaptable, tenang di bawah tekanan", score: { precision: 3 } },
      { text: "Han Lue - stylish, misterius, always two steps ahead", score: { style: 2, elegant: 1 } },
      { text: "Tej - tech genius, tahu cara kerja setiap mesin", score: { tuner: 3 } }
    ]
  },
  {
    cat: "DEFINISI MENANG",
    text: "Kamu baru saja menang balapan. Perasaanmu yang dominan adalah...",
    sub: "Jujur tentang inner world-mu, ini yang paling sering diabaikan.",
    emoji: "🏁",
    opts: [
      { text: "Relief, semua persiapan dan kalkulasi terbayar", score: { precision: 3 } },
      { text: "Euforia total, ini yang bikin kamu hidup", score: { aggro: 3 } },
      { text: "Tenang, kamu sudah tahu hasilnya bahkan sebelum mulai", score: { cool: 3 } },
      { text: "Bangga, bukan karena menang, tapi caranya indah", score: { elegant: 2, style: 1 } }
    ]
  },
  {
    cat: "WARISAN YANG DITINGGALKAN",
    text: "Terakhir, kamu ingin diingat sebagai...",
    sub: "Ini bukan soal mobil. Ini soal siapa kamu sebenarnya.",
    emoji: "💭",
    opts: [
      { text: "Yang paling kencang di zamannya", score: { aggro: 2 } },
      { text: "Yang tidak bisa ditiru caranya berkendara", score: { precision: 2, cool: 1 } },
      { text: "Yang paling dalam passion-nya terhadap mesin", score: { tuner: 3 } },
      { text: "Yang mengubah definisi indah dalam dunia otomotif", score: { style: 2, elegant: 1 } }
    ]
  }
];

// ══════════════════════════════════════════════
// 15 CAR RESULTS
// ══════════════════════════════════════════════
const CARS = {
  // ── AGGRO DOMINANT
  aggro_high: {
    name: "Dodge Charger SRT Hellcat",
    sub: "6.2L SUPERCHARGED V8 · 717 HP · RWD",
    tagline: '"Kamu tidak minta izin. Kamu tidak butuh validasi. Kamu datang, kamu jalankan, kamu tinggalkan tanda."',
    desc: "Hellcat adalah manifestasi dari energi yang tidak bisa dikompres. 717 tenaga kuda yang selalu siap meledak hanya dari satu sentuhan pedal, itulah kamu. Kamu bukan tipe yang hitung-hitungan terlalu lama sebelum bergerak. Di ruangan manapun kamu masuk, getaranmu sudah terasa bahkan sebelum kamu bicara. Orang-orang mungkin tidak selalu setuju denganmu, tapi mereka tidak bisa mengabaikanmu. Itu bukan kebetulan, itulah DNA-mu.",
    specs: [
      { l: "Tenaga",    v: "717",   u: "HP" },
      { l: "Torsi",     v: "881",   u: "Nm" },
      { l: "0–100",     v: "3.6",   u: "detik" },
      { l: "Top Speed", v: "328",   u: "km/h" },
      { l: "Mesin",     v: "6.2L",  u: "V8 SC" },
      { l: "Drive",     v: "RWD",   u: "" }
    ],
    traits: ["DOMINANT", "FEARLESS", "LOUD", "UNSTOPPABLE", "ALPHA"],
    hot: ["DOMINANT", "FEARLESS"],
    ff: "Charger hitam Dom Toretto yang meluncur dari pesawat kargo adalah salah satu momen paling ikonik Fast Saga. Bukan karena teknologinya, tapi karena pure intimidation factor-nya. Kamu adalah energi itu.",
    img: "https://images.unsplash.com/photo-1612825173281-9a193378527e?w=1400&q=80",
    color: "#ff2800",
    meter: [
      { l: "RAW POWER",   p: 98 },
      { l: "PRESENCE",    p: 95 },
      { l: "AGGRESSION",  p: 92 },
      { l: "ENDURANCE",   p: 75 }
    ]
  },

  // ── PRECISION DOMINANT
  precision_high: {
    name: "Nissan GT-R R35",
    sub: "3.8L TWIN-TURBO V6 · 562 HP · AWD",
    tagline: '"Data tidak pernah berbohong. Laptime tidak kenal kompromi. Kamu adalah kalkulasi yang berjalan."',
    desc: "GT-R lahir dari filosofi bahwa performa sejati bukan soal berteriak, tapi soal eksekusi presisi di setiap titik. ATTESA E-TS AWD-nya membaca kondisi traksi ribuan kali per detik, sama seperti cara otakmu bekerja dalam menganalisis situasi. Kamu tidak panik karena kamu sudah antisipasi. Orang melihatmu dan berpikir kamu tenang, padahal kamu sudah tiga langkah ke depan dari semua orang.",
    specs: [
      { l: "Tenaga",    v: "562",   u: "HP" },
      { l: "Torsi",     v: "637",   u: "Nm" },
      { l: "0-100",     v: "2.7",   u: "detik" },
      { l: "Top Speed", v: "315",   u: "km/h" },
      { l: "Mesin",     v: "3.8L",  u: "VR38DETT" },
      { l: "Drive",     v: "AWD",   u: "ATTESA" }
    ],
    traits: ["CALCULATED", "PRECISE", "ANALYTICAL", "RELIABLE", "COLD-BLOODED"],
    hot: ["CALCULATED", "PRECISE"],
    ff: "GT-R hadir di Fast Five dan Fast & Furious 6 sebagai senjata pilihan untuk misi yang membutuhkan akurasi tinggi, bukan sekadar kencang, tapi kencang dengan kontrol penuh. Seperti cara kamu bergerak.",
    img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1400&q=80",
    color: "#00e5ff",
    meter: [
      { l: "PRECISION",    p: 99 },
      { l: "CONSISTENCY",  p: 95 },
      { l: "INTELLIGENCE", p: 97 },
      { l: "RAW POWER",    p: 78 }
    ]
  },

  // ── COOL DOMINANT
  cool_high: {
    name: "Toyota Supra MK4",
    sub: "3.0L 2JZ-GTE INLINE-6 · 330HP STOCK · 1000HP POTENTIAL",
    tagline: '"Kamu tidak butuh tepuk tangan. Tapi mereka tidak bisa berhenti membicarakanmu."',
    desc: "Supra MK4 adalah simbol kedewasaan sejati dalam dunia otomotif, hadir diam-diam, pergi meninggalkan bekas yang tidak bisa dilupakan. 2JZ engine-nya yang mampu handle 1000+ HP dengan modifikasi adalah metafora sempurna: ada kedalaman di balik eksterior yang tidak semua orang bisa baca. Kamu seperti itu. Kehadiranmu tidak berisik, tapi setiap orang di ruangan tahu kamu ada, dan mereka penasaran.",
    specs: [
      { l: "Tenaga Stock",  v: "330",   u: "HP" },
      { l: "Torsi",         v: "427",   u: "Nm" },
      { l: "Potensi",       v: "1000+", u: "HP" },
      { l: "0-100",         v: "4.6",   u: "detik" },
      { l: "Mesin",         v: "3.0L",  u: "2JZ-GTE" },
      { l: "Drive",         v: "RWD",   u: "" }
    ],
    traits: ["UNDERSTATED", "ICONIC", "DEEP", "LOYAL", "TIMELESS"],
    hot: ["ICONIC", "UNDERSTATED"],
    ff: "Supra kuning Brian O'Conner di film pertama adalah momen yang mengubah sejarah car culture. Bukan mobil paling mahal dalam film itu, tapi jadi yang paling diingat. Karena ada sesuatu yang lebih dari sekadar spesifikasi. Seperti kamu.",
    img: "https://images.unsplash.com/photo-1632245889029-e406faaa34cd?w=1400&q=80",
    color: "#ffd600",
    meter: [
      { l: "COOL FACTOR",  p: 99 },
      { l: "DEPTH",        p: 96 },
      { l: "LOYALTY",      p: 98 },
      { l: "AGGRESSION",   p: 60 }
    ]
  },

  // ── TUNER DOMINANT
  tuner_high: {
    name: "Mitsubishi Lancer Evolution IX",
    sub: "2.0L 4G63T TURBO · AWD · 500HP POTENTIAL",
    tagline: '"The build is never done. Itulah mengapa kamu tidak pernah bosan."',
    desc: "EVO bukan sekadar mobil, ia adalah kanvas. Platform AWD agresif dengan ACD dan AYC-nya menjadi fondasi yang bisa terus dikembangkan tanpa batas. Kamu adalah jiwa builder sejati: tidak pernah puas dengan status quo, selalu ada komponen yang bisa dioptimalkan, selalu ada data yang perlu dianalisis lebih dalam. Passion-mu bukan tentang pamer, ini tentang proses. Dan proses itu tidak pernah selesai.",
    specs: [
      { l: "Tenaga",    v: "286",   u: "HP Stock" },
      { l: "Torsi",     v: "366",   u: "Nm" },
      { l: "Potensi",   v: "500+",  u: "HP Built" },
      { l: "0-100",     v: "4.7",   u: "detik" },
      { l: "Mesin",     v: "2.0L",  u: "4G63T" },
      { l: "Drive",     v: "AWD",   u: "ACD+AYC" }
    ],
    traits: ["BUILDER", "PASSIONATE", "NEVER DONE", "TECHNICAL", "OBSESSIVE"],
    hot: ["BUILDER", "PASSIONATE"],
    ff: "Karakter-karakter Fast & Furious adalah tuner sejati, dari Brian yang selalu ada di bawah kap sampai Dom yang hafal suara setiap mesin. EVO adalah representasi dari jiwa itu: tidak pernah berhenti berkembang.",
    img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1400&q=80",
    color: "#ff9500",
    meter: [
      { l: "KNOWLEDGE",   p: 99 },
      { l: "DEDICATION",  p: 97 },
      { l: "BUILD SKILL", p: 95 },
      { l: "SHOWMANSHIP", p: 65 }
    ]
  },

  // ── ELEGANT DOMINANT
  elegant_high: {
    name: "Lamborghini Aventador LP700-4",
    sub: "6.5L V12 NATURALLY ASPIRATED · 700HP · AWD",
    tagline: '"Kamu tidak memakai mobil itu. Kamu adalah mobil itu."',
    desc: "Aventador adalah deklarasi. Bukan pertanyaan. Setiap sudut body-nya yang agresif, suara V12-nya yang operatik, dan scissor door yang membuka ke atas, semua adalah pernyataan dari seseorang yang menolak untuk tidak berkesan. Kamu percaya bahwa hidup terlalu pendek untuk hal-hal biasa. Kamu tidak hanya ingin berhasil, kamu ingin hasilnya indah, memorable, dan tidak terlupakan oleh siapapun yang menyaksikannya.",
    specs: [
      { l: "Tenaga",    v: "700",   u: "HP" },
      { l: "Torsi",     v: "690",   u: "Nm" },
      { l: "0-100",     v: "2.9",   u: "detik" },
      { l: "Top Speed", v: "350",   u: "km/h" },
      { l: "Mesin",     v: "6.5L",  u: "V12 NA" },
      { l: "Drive",     v: "AWD",   u: "" }
    ],
    traits: ["VISIONARY", "AMBITIOUS", "LEGENDARY", "BOLD", "UNFORGETTABLE"],
    hot: ["VISIONARY", "UNFORGETTABLE"],
    ff: "Lamborghini hadir di Fast & Furious 6 dan The Fast Saga sebagai simbol dari karakter yang sudah melampaui kebutuhan pembuktian diri. Mereka tidak berkendara, mereka berdeklamasi.",
    img: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=1400&q=80",
    color: "#c9a84c",
    meter: [
      { l: "PRESENCE",    p: 100 },
      { l: "AMBITION",    p: 98 },
      { l: "AESTHETICS",  p: 99 },
      { l: "SUBTLETY",    p: 10 }
    ]
  },

  // ── STYLE DOMINANT
  style_high: {
    name: "Mazda RX-7 FD3S",
    sub: "1.3L 13B-REW ROTARY · 255HP · RWD",
    tagline: '"Kamu tidak mengikuti tren. Kamu hadir, dan tren mengikutimu."',
    desc: "RX-7 FD adalah masterpiece yang memilih pemiliknya. Rotary engine yang unik, pop-up headlights yang ikonik, body lines yang tetap segar bahkan tiga dekade kemudian. Kamu punya selera yang tidak bisa diajarkan dari buku atau kursus, itu keluar dari dalam. Kamu bukan anti-mainstream karena ingin berbeda; kamu autentik karena kamu tidak bisa pura-pura menjadi orang lain. Dan itu jauh lebih langka dari apapun.",
    specs: [
      { l: "Tenaga",    v: "255",   u: "HP" },
      { l: "Torsi",     v: "294",   u: "Nm" },
      { l: "0-100",     v: "5.3",   u: "detik" },
      { l: "Berat",     v: "1280",  u: "kg" },
      { l: "Mesin",     v: "1.3L",  u: "13B Rotary" },
      { l: "Drive",     v: "RWD",   u: "" }
    ],
    traits: ["AUTHENTIC", "TASTE-MAKER", "UNIQUE", "ARTISTIC", "ORIGINAL"],
    hot: ["AUTHENTIC", "UNIQUE"],
    ff: "Han Seoul-Oh dan RX-7 adalah salah satu pasangan paling ikonik di seluruh franchise. Han tidak memilih RX-7 karena paling kencang atau paling mahal. Dia memilihnya karena paling dia. Character over spec, itulah filosofimu.",
    img: "https://images.unsplash.com/photo-1493238792000-8113da705763?w=1400&q=80",
    color: "#ff6b35",
    meter: [
      { l: "AUTHENTICITY", p: 99 },
      { l: "AESTHETICS",   p: 97 },
      { l: "ORIGINALITY",  p: 98 },
      { l: "PRACTICALITY", p: 45 }
    ]
  },

  // ── PRECISION + COOL
  pc_mix: {
    name: "Porsche 911 GT3 RS",
    sub: "4.0L FLAT-6 NA · 525HP · RWD · 9000 RPM",
    tagline: '"Performa sejati tidak membutuhkan ornamen. Angka-angka berbicara sendiri."',
    desc: "GT3 RS adalah definisi precision sebagai seni. Mesin flat-6 yang berteriak hingga 9000 RPM, bobot yang dioptimalkan ke gram, aerodinamika yang tidak ada satu komponen pun tanpa tujuan. Kamu adalah tipe yang bicara sedikit tapi setiap kata bermakna. Tidak ada noise, tidak ada drama, hanya hasil yang konsisten dan mengagumkan setiap kali.",
    specs: [
      { l: "Tenaga",    v: "525",   u: "HP" },
      { l: "Torsi",     v: "470",   u: "Nm" },
      { l: "0-100",     v: "3.2",   u: "detik" },
      { l: "Red Line",  v: "9000",  u: "RPM" },
      { l: "Mesin",     v: "4.0L",  u: "Flat-6 NA" },
      { l: "Drive",     v: "RWD",   u: "PDK/Man" }
    ],
    traits: ["METHODICAL", "CONSISTENT", "ENGINEERED", "PURPOSEFUL", "ELITE"],
    hot: ["METHODICAL", "PURPOSEFUL"],
    ff: "Porsche hadir sebagai kendaraan pilihan karakter dengan kepala dingin dan tangan yang stabil. Ketika semua orang panik, mereka bereksekusi. Itulah kamu di bawah tekanan.",
    img: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1400&q=80",
    color: "#ffffff",
    meter: [
      { l: "PRECISION",    p: 100 },
      { l: "CONSISTENCY",  p: 99 },
      { l: "COMPOSURE",    p: 97 },
      { l: "SHOWMANSHIP",  p: 55 }
    ]
  },

  // ── COOL + TUNER
  ct_mix: {
    name: "Nissan Skyline GT-R R34",
    sub: "2.6L RB26DETT · AWD · ICON STATUS",
    tagline: '"Legenda tidak perlu memperkenalkan diri."',
    desc: "R34 adalah mungkin salah satu mobil paling ikonik dalam sejarah, bukan karena dia yang paling cepat atau paling mahal, tapi karena kombinasi kepribadian, kemampuan, dan heritage-nya yang tidak tertandingi. Kamu adalah tipe yang sudah melampaui fase 'perlu membuktikan diri' kamu hanya perlu hadir. Dan kehadiranmu sudah cukup untuk membuat semua orang tahu mereka berada di dekat sesuatu yang luar biasa.",
    specs: [
      { l: "Tenaga",    v: "280",   u: "HP (factory)" },
      { l: "Actual",    v: "330+",  u: "HP" },
      { l: "0-100",     v: "4.9",   u: "detik" },
      { l: "Mesin",     v: "2.6L",  u: "RB26DETT" },
      { l: "Drive",     v: "AWD",   u: "ATTESA ET-S" },
      { l: "Status",    v: "ICON",  u: "" }
    ],
    traits: ["LEGENDARY", "DEEP ROOTS", "RESPECTED", "TIMELESS", "REVERED"],
    hot: ["LEGENDARY", "REVERED"],
    ff: "R34 GT-R Brian O'Conner di Fast & Furious 4 adalah momen fanservice terbesar dalam sejarah franchise, karena semua orang tahu, ada beberapa mobil yang sudah beyond hype. Sudah menjadi bagian dari warisan.",
    img: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1400&q=80",
    color: "#00e5ff",
    meter: [
      { l: "LEGACY",       p: 100 },
      { l: "COOL FACTOR",  p: 98 },
      { l: "TUNER BASE",   p: 95 },
      { l: "AVAILABILITY", p: 20 }
    ]
  },

  // ── AGGRO + STYLE
  as_mix: {
    name: "Ford Mustang Shelby GT500",
    sub: "5.2L SUPERCHARGED V8 · 760HP · RWD",
    tagline: '"Berisik, indah, dan tidak meminta maaf untuk keduanya."',
    desc: "GT500 adalah contradiksi yang sempurna: cukup kasar untuk membuat semua kepala menoleh, namun cukup refined untuk disebut karya seni. Seperti kamu, kamu punya energi yang meluap-luap, tapi ada estetika di balik setiap gerakanmu. Kamu tidak hanya ingin menang. Kamu ingin menang dengan cara yang akan dibicarakan orang-orang bertahun-tahun kemudian.",
    specs: [
      { l: "Tenaga",    v: "760",   u: "HP" },
      { l: "Torsi",     v: "848",   u: "Nm" },
      { l: "0–100",     v: "3.3",   u: "detik" },
      { l: "Top Speed", v: "290",   u: "km/h" },
      { l: "Mesin",     v: "5.2L",  u: "Supercharged" },
      { l: "Drive",     v: "RWD",   u: "" }
    ],
    traits: ["POWERFUL", "DRAMATIC", "AUDACIOUS", "AMERICAN", "STATEMENT"],
    hot: ["POWERFUL", "STATEMENT"],
    ff: "Mustang hadir di berbagai iterasi Fast Saga sebagai simbol kekuatan Amerika yang tidak perlu penjelasan. Ketika kamu dengar suaranya, kamu sudah tahu siapa yang datang.",
    img: "https://images.unsplash.com/photo-1547744152-14d985cb937f?w=1400&q=80",
    color: "#ff2800",
    meter: [
      { l: "POWER",       p: 97 },
      { l: "DRAMA",       p: 99 },
      { l: "SOUND",       p: 100 },
      { l: "SUBTLETY",    p: 5 }
    ]
  },

  // ── ELEGANT + PRECISION
  ep_mix: {
    name: "Ferrari 488 Pista",
    sub: "3.9L TWIN-TURBO V8 · 710HP · RWD",
    tagline: '"Excellence bukan tujuan. Excellence adalah minimum acceptable."',
    desc: "Pista, bahasa Italia untuk 'track'. Ferrari tidak membangun Pista untuk jalanan biasa. Mereka membangunnya untuk orang-orang yang tidak bisa kompromi dalam hal performa. Kamu punya standar yang orang lain pikir tidak masuk akal, tapi bagimu itu hanya baseline. Kamu tidak suka setengah-setengah. Kalau kamu melakukan sesuatu, itu harus sempurna, atau tidak usah sama sekali.",
    specs: [
      { l: "Tenaga",    v: "710",   u: "HP" },
      { l: "Torsi",     v: "770",   u: "Nm" },
      { l: "0-100",     v: "2.85",  u: "detik" },
      { l: "Top Speed", v: "340",   u: "km/h" },
      { l: "Mesin",     v: "3.9L",  u: "F154CD" },
      { l: "Drive",     v: "RWD",   u: "" }
    ],
    traits: ["UNCOMPROMISING", "REFINED", "ELITE", "PASSIONATE", "MAJESTIC"],
    hot: ["UNCOMPROMISING", "ELITE"],
    ff: "Ferrari hadir sebagai kendaraan antagonis pilihan dalam beberapa film karena mereka mewakili puncak dari apa yang bisa dicapai, mesin yang tidak pernah meminta keringanan.",
    img: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1400&q=80",
    color: "#c9a84c",
    meter: [
      { l: "REFINEMENT", p: 100 },
      { l: "PRECISION",  p: 98 },
      { l: "PASSION",    p: 99 },
      { l: "EVERYDAY USE", p: 30 }
    ]
  },

  // ── TUNER + STYLE
  ts_mix: {
    name: "Subaru Impreza WRX STi",
    sub: "2.5L EJ257 TURBO · AWD · RALLY DNA",
    tagline: '"Dari jalanan lumpur dunia ke jalanan kota, nggak ada yang berubah."',
    desc: "STi lahir dari rally, sirkuit sesungguhnya dimana mobil bertemu kondisi paling ekstrem. Bukan track mulus, tapi jalanan tidak terduga yang butuh keputusan cepat dan build yang solid. Kamu punya jiwa yang sama: selalu siap dengan situasi apapun, tahu cara kerja setiap komponen mobilmu, dan ketika keadaan memburuk kamu malah semakin hidup.",
    specs: [
      { l: "Tenaga",    v: "305",   u: "HP Stock" },
      { l: "Torsi",     v: "407",   u: "Nm" },
      { l: "0-100",     v: "4.7",   u: "detik" },
      { l: "Potensi",   v: "500+",  u: "HP" },
      { l: "Mesin",     v: "2.5L",  u: "EJ257 Boxer" },
      { l: "Drive",     v: "AWD",   u: "DCCD" }
    ],
    traits: ["VERSATILE", "RALLY-BRED", "TACTICAL", "UNDERGROUND", "REAL"],
    hot: ["RALLY-BRED", "REAL"],
    ff: "STi adalah mobil yang sering muncul di background scene underground FF, bukan yang jadi pusat perhatian, tapi selalu ada di antara orang-orang yang serius. Sama seperti kamu: tidak berisik, tapi selalu diakui oleh mereka yang tahu.",
    img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1400&q=80",
    color: "#0066ff",
    meter: [
      { l: "VERSATILITY", p: 95 },
      { l: "BUILD BASE",  p: 97 },
      { l: "RALLY DNA",   p: 100 },
      { l: "LUXURY",      p: 30 }
    ]
  },

  // ── COOL + ELEGANT
  ce_mix: {
    name: "Aston Martin DB11",
    sub: "5.2L TWIN-TURBO V12 · 630HP · AWD",
    tagline: '"Kecepatan bisa dipelajari. Kelas tidak bisa dibeli."',
    desc: "DB11 adalah pernyataan bahwa kekuatan tertinggi tidak harus berteriak. 630 HP V12 yang dibungkus dalam desain yang sudah sempurna sejak hari pertama keluar dari pabrik. Kamu adalah tipe yang tahu persis kapan harus bergerak cepat dan kapan membiarkan kehadiranmu saja yang bicara. Kamu sudah di luar fase kompetisi dengan orang lain, kamu hanya bersaing dengan versi terbaikmu sendiri.",
    specs: [
      { l: "Tenaga",    v: "630",   u: "HP" },
      { l: "Torsi",     v: "700",   u: "Nm" },
      { l: "0-100",     v: "3.7",   u: "detik" },
      { l: "Top Speed", v: "334",   u: "km/h" },
      { l: "Mesin",     v: "5.2L",  u: "Twin-V12" },
      { l: "Drive",     v: "AWD",   u: "" }
    ],
    traits: ["COMPOSED", "CLASSY", "POWERFUL", "SOPHISTICATED", "BEYOND HYPE"],
    hot: ["COMPOSED", "BEYOND HYPE"],
    ff: "Aston Martin mewakili karakter yang sudah melampaui drama kecepatan biasa. Mereka tidak perlu balapan di lampu merah untuk membuktikan sesuatu, semua orang sudah tahu.",
    img: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1400&q=80",
    color: "#c9a84c",
    meter: [
      { l: "CLASS",        p: 100 },
      { l: "COMPOSURE",    p: 99 },
      { l: "POWER",        p: 88 },
      { l: "STREET CRED",  p: 75 }
    ]
  },

  // ── AGGRO + PRECISION
  ap_mix: {
    name: "McLaren 720S",
    sub: "4.0L TWIN-TURBO V8 · 720HP · RWD",
    tagline: '"Seratus persen komitmen. Tidak ada plan B."',
    desc: "720S adalah senjata. Bukan show car, bukan daily driver, ini adalah mesin yang dirancang dengan satu tujuan: membuat waktu laptime sesingkat mungkin dengan cara yang paling mengagumkan. MonoCell II carbon chassis, active aerodynamics, dan 720 HP yang terasa seperti ribuan, kamu adalah tipe yang all-in dalam apapun yang kamu lakukan. Tidak ada setengah hati. Tidak ada exit strategy.",
    specs: [
      { l: "Tenaga",    v: "720",   u: "HP" },
      { l: "Torsi",     v: "770",   u: "Nm" },
      { l: "0-100",     v: "2.9",   u: "detik" },
      { l: "0-200",     v: "7.8",   u: "detik" },
      { l: "Mesin",     v: "4.0L",  u: "M840T V8" },
      { l: "Drive",     v: "RWD",   u: "" }
    ],
    traits: ["ALL-IN", "RELENTLESS", "TECHNICAL", "FEARLESS", "COMMITTED"],
    hot: ["ALL-IN", "RELENTLESS"],
    ff: "McLaren muncul di Fast Saga sebagai simbol dari teknologi yang tidak berkompromi, mobil yang terasa lebih seperti fighter jet dari pada kendaraan jalan raya. Kamu memahami energi itu.",
    img: "https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?w=1400&q=80",
    color: "#ff6b00",
    meter: [
      { l: "AGGRESSION",  p: 96 },
      { l: "PRECISION",   p: 98 },
      { l: "ALL-IN",      p: 100 },
      { l: "COMPROMISE",  p: 2 }
    ]
  },

  // ── BALANCED / DEFAULT
  balanced: {
    name: "Honda NSX Type R NA1",
    sub: "3.0L C30A V6 · 290HP · RWD · HUMAN MACHINE INTERFACE",
    tagline: '"Tidak ada yang berlebih. Tidak ada yang kurang. Semua di tempat yang seharusnya."',
    desc: "NSX dirancang dengan satu filosofi: the perfect conversation between human and machine. Ayrton Senna sendiri ikut dalam pengembangan dinamika berkendara NSX. Ia bukan yang paling bertenaga, bukan yang paling ekstrem, tapi ia adalah yang paling jujur. Kamu adalah tipe yang punya berbagai dimensi: bisa cool, bisa presisi, bisa passionate. Tidak ada satu karakter yang mendominasi, karena kamu sudah melampaui kebutuhan untuk didefinisikan.",
    specs: [
      { l: "Tenaga",    v: "290",   u: "HP" },
      { l: "Torsi",     v: "285",   u: "Nm" },
      { l: "Berat",     v: "1370",  u: "kg" },
      { l: "Mesin",     v: "3.0L",  u: "C30A V6" },
      { l: "Drive",     v: "RWD",   u: "" },
      { l: "Heritage",  v: "SENNA", u: "tested" }
    ],
    traits: ["BALANCED", "HUMANISTIC", "HONEST", "VERSATILE", "COMPLETE"],
    hot: ["BALANCED", "HONEST"],
    ff: "NSX mewakili karakter yang tidak perlu dikelompokkan mereka adalah enigma yang semua orang ingin pahami tapi tidak ada yang berhasil sepenuhnya. Itulah yang membuatmu tak tertandingi.",
    img: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1400&q=80",
    color: "#ffffff",
    meter: [
      { l: "BALANCE",     p: 100 },
      { l: "PRECISION",   p: 93 },
      { l: "SOUL",        p: 99 },
      { l: "EXTREMITY",   p: 50 }
    ]
  },

  // ── STYLE + ELEGANT
  se_mix: {
    name: "Koenigsegg Agera RS",
    sub: "5.0L TWIN-TURBO V8 · 1360HP · RWD",
    tagline: '"Kamu tidak berada di puncak food chain. Kamu adalah puncak itu."',
    desc: "Agera RS memegang rekor produksi mobil tercepat di dunia 447 km/h. Tapi lebih dari angka itu, ia adalah statement dari seorang jenius yang menolak untuk diberitahu batas kemungkinan. Koenigsegg membangun setiap mobil dengan tangan. Setiap unit adalah karya seni. Kamu adalah tipe yang melihat sesuatu yang belum ada, dan membuatnya ada lalu membuatnya indah.",
    specs: [
      { l: "Tenaga",       v: "1360",  u: "HP" },
      { l: "0-400-0",      v: "36.44", u: "detik" },
      { l: "Top Speed",    v: "447",   u: "km/h" },
      { l: "Mesin",        v: "5.0L",  u: "TT V8" },
      { l: "Unit",         v: "HAND",  u: "built" },
      { l: "Drive",        v: "RWD",   u: "" }
    ],
    traits: ["VISIONARY", "LIMITLESS", "HANDCRAFTED", "RECORD-BREAKING", "LEGENDARY"],
    hot: ["VISIONARY", "LIMITLESS"],
    ff: "Koenigsegg hadir di fast saga sebagai ultimate benchmark ketika semua orang pikir sudah ada yang terkencang, tiba-tiba ada yang masuk dan mengubah semua definisi. Kamu adalah disruption itu.",
    img: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=1400&q=80",
    color: "#c9a84c",
    meter: [
      { l: "VISION",      p: 100 },
      { l: "ARTISTRY",    p: 100 },
      { l: "PERFORMANCE", p: 100 },
      { l: "ACCESSIBILITY", p: 1 }
    ]
  }
};

// ══════════════════════════════════════════════
// SCORING ENGINE  Map scores to car result
// ══════════════════════════════════════════════
function determineResult(scores) {
  const { aggro=0, precision=0, cool=0, tuner=0, elegant=0, style=0 } = scores;
  const total = aggro + precision + cool + tuner + elegant + style || 1;

  // Normalize
  const a = aggro / total;
  const p = precision / total;
  const c = cool / total;
  const t = tuner / total;
  const e = elegant / total;
  const s = style / total;

  // Find top two categories
  const sorted = [
    { k: "aggro", v: a },
    { k: "precision", v: p },
    { k: "cool", v: c },
    { k: "tuner", v: t },
    { k: "elegant", v: e },
    { k: "style", v: s }
  ].sort((x, y) => y.v - x.v);

  const top1 = sorted[0].k;
  const top2 = sorted[1].k;
  const top1v = sorted[0].v;
  const top2v = sorted[1].v;

  // Dominant (>42%) → pure archetype
  if (top1v > 0.42) {
    if (top1 === "aggro")     return CARS.aggro_high;
    if (top1 === "precision") return CARS.precision_high;
    if (top1 === "cool")      return CARS.cool_high;
    if (top1 === "tuner")     return CARS.tuner_high;
    if (top1 === "elegant")   return CARS.elegant_high;
    if (top1 === "style")     return CARS.style_high;
  }

  // Mixed archetypes
  const pair = [top1, top2].sort().join("_");
  const mixMap = {
    "cool_precision":   CARS.pc_mix,
    "cool_tuner":       CARS.ct_mix,
    "aggro_style":      CARS.as_mix,
    "elegant_precision":CARS.ep_mix,
    "style_tuner":      CARS.ts_mix,
    "cool_elegant":     CARS.ce_mix,
    "aggro_precision":  CARS.ap_mix,
    "elegant_style":    CARS.se_mix
  };
  if (mixMap[pair]) return mixMap[pair];

  // Fallback balanced
  return CARS.balanced;
}

// ══════════════════════════════════════════════
// QUIZ STATE
// ══════════════════════════════════════════════
let scores = { aggro:0, precision:0, cool:0, tuner:0, elegant:0, style:0 };
let currentQ = 0;
let answers  = new Array(15).fill(null);

// ══════════════════════════════════════════════
// BUILD QUIZ DOM
// ══════════════════════════════════════════════
function buildQuiz() {
  const stage = document.getElementById("quizStage");
  stage.innerHTML = "";

  QUESTIONS.forEach((q, qi) => {
    const block = document.createElement("div");
    block.className = "q-block" + (qi === 0 ? " active" : "");
    block.id = "qb" + qi;

    const letters = ["A","B","C","D"];
    const optsBtns = q.opts.map((opt, oi) => `
      <button class="opt-btn" data-letter="${letters[oi]}" onclick="selectOpt(${qi},${oi},this)">
        <span class="opt-check">✓</span>
        <span class="opt-label">${letters[oi]}</span>
        <span class="opt-text">${opt.text}</span>
      </button>
    `).join("");

    block.innerHTML = `
      <div class="q-num-big">0${qi < 9 ? "0" : ""}${qi+1}</div>
      <div class="q-content">
        <div class="q-category">⚙ ${q.cat}</div>
        <h2 class="q-text">${q.text}</h2>
        <p class="q-sub">${q.sub}</p>
        <div class="options-wrap">${optsBtns}</div>
        <div class="btn-next-wrap">
          <button class="btn-next" id="btnNext${qi}" onclick="nextQ(${qi})">
            ${qi < 14 ? "LANJUT &nbsp;→" : "LIHAT HASIL &nbsp;🏁"}
          </button>
          <span class="hint-text">${answers[qi] === null ? "PILIH DULU" : ""}</span>
        </div>
      </div>
    `;
    stage.appendChild(block);
  });
}

// ══════════════════════════════════════════════
// INTERACTIONS
// ══════════════════════════════════════════════
function selectOpt(qi, oi, btn) {
  btn.closest(".options-wrap").querySelectorAll(".opt-btn").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
  answers[qi] = oi;

  const nextBtn = document.getElementById("btnNext" + qi);
  nextBtn.classList.add("enabled");
  nextBtn.nextElementSibling.textContent = "";
}

function nextQ(qi) {
  if (answers[qi] === null) return;

  // Apply score
  const opt = QUESTIONS[qi].opts[answers[qi]];
  Object.entries(opt.score).forEach(([k, v]) => { scores[k] = (scores[k] || 0) + v; });

  if (qi < 14) {
    document.getElementById("qb" + qi).classList.remove("active");
    currentQ = qi + 1;
    document.getElementById("qb" + currentQ).classList.add("active");
    updateProgress();
    smoothScrollTop();
  } else {
    showCalcScreen();
  }
}

function updateProgress() {
  const pct = (currentQ / 15) * 100;
  const fill = document.getElementById("progressFill");
  const glow = document.getElementById("progressGlow");
  if (fill) fill.style.width = pct + "%";
  if (glow) { glow.style.left = pct + "%"; }
  const lbl = document.getElementById("progressLabel");
  if (lbl) lbl.textContent = currentQ + " / 15";
  const cur = document.getElementById("qCur");
  if (cur) cur.textContent = String(currentQ + 1).padStart(2, "0");
}

// ══════════════════════════════════════════════
// CALCULATING SCREEN
// ══════════════════════════════════════════════
const calcMessages = [
  "Memuat profil karakter...",
  "Menganalisis pola keputusan...",
  "Mencocokkan DNA berkendara...",
  "Menemukan mesin yang resonan...",
  "Finalisasi hasil..."
];

function showCalcScreen() {
  showScreen("s-calc");
  let i = 0;
  const statusEl = document.getElementById("calcStatus");
  const interval = setInterval(() => {
    i++;
    if (i < calcMessages.length && statusEl) {
      statusEl.textContent = calcMessages[i];
    }
    if (i >= calcMessages.length) {
      clearInterval(interval);
      setTimeout(showResult, 500);
    }
  }, 480);
}

// ══════════════════════════════════════════════
// RESULT SCREEN
// ══════════════════════════════════════════════
function showResult() {
  const car = determineResult(scores);

  // Set content
  document.getElementById("resCarName").textContent  = car.name;
  document.getElementById("resCarSub").textContent   = car.sub;
  document.getElementById("resTagline").textContent  = car.tagline;
  document.getElementById("resDesc").textContent     = car.desc;
  document.getElementById("resFF").innerHTML = `<strong style="font-family:var(--font-display);font-size:13px;letter-spacing:3px;color:var(--c-amber);display:block;margin-bottom:8px;">🎬 DI LAYAR LEBAR</strong>${car.ff}`;

  // Hero image
  const img = document.getElementById("resHeroImg");
  img.src = car.img;
  img.alt = car.name;

  // Hero BG glow
  document.getElementById("resHeroBg").style.background =
    `radial-gradient(ellipse 60% 60% at 30% 60%, ${car.color}22 0%, transparent 70%), var(--c-bg)`;

  // Specs
  const specsEl = document.getElementById("resSpecs");
  specsEl.innerHTML = car.specs.map(s => `
    <div class="spec-cell">
      <div class="spec-lbl">${s.l}</div>
      <div class="spec-val">${s.v}<span class="spec-unit">${s.u}</span></div>
    </div>
  `).join("");

  // Traits
  const traitsEl = document.getElementById("resTraits");
  traitsEl.innerHTML = car.traits.map(t => `
    <span class="trait-pill${car.hot.includes(t) ? " hot" : ""}">${t}</span>
  `).join("");

  // Match meter
  const meterEl = document.getElementById("resMatchMeter");
  meterEl.innerHTML = car.meter.map(m => `
    <div class="match-bar-item">
      <div class="match-bar-header">
        <span>${m.l}</span><span>${m.p}%</span>
      </div>
      <div class="match-bar-track">
        <div class="match-bar-fill" style="width:${m.p}%"></div>
      </div>
    </div>
  `).join("");

  showScreen("s-result");

  // Animate bars after render
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.querySelectorAll(".match-bar-fill").forEach((el, i) => {
        setTimeout(() => { el.classList.add("animate"); }, i * 150);
      });
    }, 300);
  });
}

// ══════════════════════════════════════════════
// UTILITY
// ══════════════════════════════════════════════
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const el = document.getElementById(id);
  if (el) el.classList.add("active");
  window.scrollTo({ top: 0 });
}

function smoothScrollTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetQuiz() {
  scores  = { aggro:0, precision:0, cool:0, tuner:0, elegant:0, style:0 };
  currentQ = 0;
  answers  = new Array(15).fill(null);
  buildQuiz();
  updateProgress();
  showScreen("s-intro");
}

// ══════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnStart").addEventListener("click", () => {
    buildQuiz();
    updateProgress();
    showScreen("s-quiz");
  });
  document.getElementById("btnRetry").addEventListener("click", resetQuiz);
});
