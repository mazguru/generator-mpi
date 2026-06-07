import { LearningModule } from "./types";

export const sampleModules: LearningModule[] = [
  {
    id: "tmpl_tatasurya",
    title: "Sistem Tata Surya & Orbit Planet",
    subject: "IPA (Fisika Astronomi)",
    gradeLevel: "Kelas VII SMP",
    description: "Modul interaktif untuk menjelajahi tatanan benda langit di lingkungan Matahari kita, memahami revolusi, rotasi, serta karakteristik fisik planet-planet di dalam galaksi Bima Sakti.",
    learningObjectives: [
      { id: "obj_1", text: "Menjelaskan komponen-komponen penyusun sistem Tata Surya kita." },
      { id: "obj_2", text: "Membandingkan karakteristik planet terestrial (dalam) dengan planet raksasa gas (luar)." },
      { id: "obj_3", text: "Menganalisis keterkaitan jarak planet dari Matahari dengan waktu revolusinya." }
    ],
    sections: [
      {
        id: "sec_1",
        title: "1. Matahari sebagai Pusat Tata Surya Kekaisaran Gravitasi",
        content: `Matahari adalah bintang induk di pusat Tata Surya berbentuk bola plasma membara dengan diameter sekitar **1,39 juta kilometer**. Gravitasi Matahari yang ultra-besar bertindak sebagai jangkar perekat kosmik yang mengikat planet, komet, asteroid, dan debu angkasa dalam garis edar (orbit) yang teratur.

### Fakta Kunci Matahari:
* **Suhu Inti:** Mencapai **15 juta derajat Celsius** akibat reaksi fusi termonuklir yang berkelanjutan.
* **Gaya Gravitasi:** Sekitar **28 kali lipat** gravitasi Bumi.
* **Komposisi Gas:** Terdiri dari Hidrogen (~73%) dan Helium (~25%).

Matahari memancarkan energi radiasi elektromagnetik yang menopang kehidupan di Bumi melalui proses fotosintesis tumbuhan dan memicu dinamika cuaca iklim global.`,
        illustrationPrompt: "Infografis pusat tata surya yang menunjukkan Matahari membara di bagian tengah dengan lingkaran-lingkaran lintasan planet elips yang rapi.",
        flashcards: [
          { id: "fc_1_1", front: "Bintang Pusat Tata Surya", back: "Matahari" },
          { id: "fc_1_2", front: "Suhu Inti Matahari", back: "15 Juta Derajat Celsius" },
          { id: "fc_1_3", front: "Sumber Energi Matahari", back: "Reaksi Fusi Nuklir Hidrogen menjadi Helium" }
        ]
      },
      {
        id: "sec_2",
        title: "2. Klasifikasi Planet: Logam Terestrial vs Raksasa Gas",
        content: `Delapan planet dalam sistem tata surya kita terbagi tajam menjadi dua kategori utama berdasarkan susunan kimiawi dan struktur fisiknya:

### A. Planet Dalam (Terestrial / Kebumian)
Terdiri dari **Merkurius, Venus, Bumi, dan Mars**. Karakteristik utamanya adalah permukaan padat berbatu, memiliki kepadatan massa yang tinggi, ukurannya relatif kecil, dan punya sangat sedikit pengawal (satelit).

### B. Planet Luar (Jovian / Raksasa Gas)
Terdiri dari **Yupiter, Saturnus, Uranus, dan Neptunus**. Ciri dominannya adalah tidak memiliki permukaan padat yang pasti (didominasi cairan gas tebal), ukuran raksasa, memiliki sistem cincin debu es, serta satelit pengiring yang melimpah.`,
        illustrationPrompt: "Gambar komparasi horizontal yang menjejajarkan 4 planet dalam berbatu berukuran kecil, terpisah sabuk asteroid dari 4 planet gas raksasa bercincin.",
        flashcards: [
          { id: "fc_2_1", front: "Urutan Planet Dekat ke Jauh", back: "Merkurius, Venus, Bumi, Mars, Yupiter, Saturnus, Uranus, Neptunus" },
          { id: "fc_2_2", front: "Planet Terbesar di Tata Surya", back: "Yupiter" },
          { id: "fc_2_3", front: "Sebutan Planet Berbatu", back: "Planet Terestrial (Kebumian)" }
        ]
      },
      {
        id: "sec_3",
        title: "3. Hukum Kepler dan Periodisitas Revolusi",
        content: `Semesta bekerja dengan harmoni matematika yang ketat. **Hukum Johannes Kepler** menerangkan bahwa lintasan planet mengitari matahari tidaklah bulat sempurna melainkan berbentuk **Elips**. 

Sesuai dengan Hukum III Kepler, terdapat perbandingan harmonis yang melahirkan kesimpulan: **Semakin jauh posisi sebuah planet dari dekapan Matahari, maka kecepatan mengorbitnya semakin lambat, dan periode satu kali revolusi lengkapnya (satu tahun planet) akan memakan waktu bumi yang jauh lebih lama.**

* Merkurius hanya perlu **88 hari Bumi** untuk berevolusi.
* Bumi memerlukan **365,25 hari**.
* Neptunus terjauh memerlukan waktu hingga **165 tahun Bumi**!`,
        illustrationPrompt: "Diagram ilmiah lintasan elips planet mengitari matahari dengan tanda panah kecepatan gerak orbit di perihelion (cepat) dan aphelion (lambat).",
        flashcards: [
          { id: "fc_3_1", front: "Bentuk Orbit Planet", back: "Elips (Lonjong)" },
          { id: "fc_3_2", front: "Penemu Hukum Gerak Planet", back: "Johannes Kepler" },
          { id: "fc_3_3", front: "Efek Jarak Orbit Panjang", back: "Waktu revolusi memakan waktu bertahun-tahun lebih lama" }
        ]
      }
    ],
    quiz: [
      {
        id: "q_1",
        type: "multiple-choice",
        question: "Berdasarkan jaraknya dari Matahari, urutan planet yang dikategorikan sebagai raksasa gas yang tepat adalah...",
        options: [
          "A. Bumi, Mars, Yupiter, Saturnus",
          "B. Yupiter, Saturnus, Uranus, Neptunus",
          "C. Merkurius, Venus, Bumi, Mars",
          "D. Saturnus, Uranus, Neptunus, Pluto"
        ],
        correctAnswer: "B",
        explanation: "Planet luar atau Jovian (Raksasa Gas) yang tidak memiliki permukaan batuan yang keras adalah Yupiter, Saturnus, Uranus, dan Neptunus."
      },
      {
        id: "q_2",
        type: "true-false",
        question: "Planet Merkurius memiliki periode revolusi mengelilingi Matahari yang paling singkat di antara planet lainnya.",
        options: ["Benar", "Salah"],
        correctAnswer: "Benar",
        explanation: "Karena Merkurius terletak paling dekat dengan pusat gravitasi Matahari, lintasannya paling pendek dan mengalami percepatan orbit tertinggi sesuai hukum alam, memakan waktu hanya 88 hari Bumi."
      },
      {
        id: "q_3",
        type: "multiple-choice",
        question: "Hukum fisika yang membuktikan bahwa bentuk orbit planet berbentuk elips dikemukakan oleh...",
        options: [
          "A. Sir Isaac Newton",
          "B. Albert Einstein",
          "C. Johannes Kepler",
          "D. Galileo Galilei"
        ],
        correctAnswer: "C",
        explanation: "Hukum I Kepler menerangkan secara matematis bahwa orbit setiap planet adalah elips dengan Matahari berada pada salah satu fokusnya."
      },
      {
        id: "q_4",
        type: "matching",
        question: "Cocokkan karakteristik planet unik berikut dengan nama planet yang paling sesuai!",
        correctAnswer: "matching_game",
        explanation: "Venus memiliki efek rumah kaca ekstrem, Saturnus memiliki cincin termegah, Mars dikenal merah berkarat besi, sedangkan Yupiter adalah raja badai gas raksasa.",
        matchingPairs: [
          { left: "Venus", right: "Suhu terpanas akibat efek rumah kaca ekstrem" },
          { left: "Saturnus", right: "Cincin spektakuler yang terbuat dari es dan debu" },
          { left: "Mars", right: "Planet Merah yang kaya oksida besi" },
          { left: "Yupiter", right: "Raksasa gas dengan badai bintik merah raksasa" }
        ]
      }
    ],
    widget: {
      type: "sorting",
      title: "Klasifikasi Kosmis Planet",
      description: "Klasifikasikan planet di bawah ini ke kelompok yang benar: Terestrial (Mempunyai permukaan padat berbatu) atau Jovian (Mempunyai volume gas tebal tanpa pijakan keras)!",
      data: {
        categories: ["Planet Terestrial", "Planet Jovian"],
        items: ["Bumi", "Yupiter", "Mars", "Saturnus", "Venus", "Neptunus", "Merkurius", "Uranus"]
      }
    },
    createdAt: "2026-06-07T12:00:00Z"
  },
  {
    id: "tmpl_aljabar",
    title: "Penyeimbangan Persamaan Aljabar Linier",
    subject: "Matematika",
    gradeLevel: "Kelas VIII SMP",
    description: "Belajar konsep aljabar dasar melalui analogi visual neraca keseimbangan. Memahami bahwa sisi kiri dan sisi kanan harus bernilai sama saat memanipulasi variabel x.",
    learningObjectives: [
      { id: "obj_algebra_1", text: "Mengidentifikasi konstanta dan variabel dalam persamaan linier satu variabel." },
      { id: "obj_algebra_2", text: "Menjelaskan konsep keadilan operasi aritmatika pada kedua ruas persamaan." },
      { id: "obj_algebra_3", text: "Menentukan nilai variabel x yang memenuhi persamaan secara presisi." }
    ],
    sections: [
      {
        id: "sec_a1",
        title: "1. Konsep Ruas Kiri dan Kanan pada Timbangan",
        content: `Sebuah persamaan matematika disimbolkan oleh tanda **sama dengan (=)**. Tanda ini bekerja persis seperti timbangan dacin atau neraca dua lengan yang setimbang.

Agar timbangan tersebut konstan horizontal (seimbang):
* Segala perubahan di **ruas kiri** harus diikuti oleh perubahan yang bernilai persis sama di **ruas kanan**.
* Apabila Anda menambah beban sebesar 5kg pada lengan kiri, Anda wajib menaruh beban 5kg pula di lengan kanan agar tidak miring.

Prinsip keadilan inilah yang melandasi penyelesaian matematika untuk mencari nilai variabel pengisi misterius.`,
        illustrationPrompt: "Grafis timbangan neraca kuno dengan dua wadah datar yang sejajar setara, menampilkan angka aljabar di masing-masing wadahnya.",
        flashcards: [
          { id: "fc_a1_1", front: "Simbol Keseimbangan", back: "Sama Dengan (=)" },
          { id: "fc_a1_2", front: "Definisi Variabel", back: "Simbol huruf (seperti x atau y) pengganti angka misterius" },
          { id: "fc_a1_3", front: "Hukum Manipulasi Persamaan", back: "Kedua ruas wajib diperlakukan sama dalam operasi aritmatika" }
        ]
      },
      {
        id: "sec_a2",
        title: "2. Menisolasi Variabel X",
        content: `Tujuan inti memecahkan aljabar linier adalah membuat variabel misterius $x$ terisolasi sendirian di satu sisi ruangan, sementara angka penyelesaian berkumpul di sisi lainnya.

Langkah ideal mengisolasi variabel:
1. Singkirkan pengganggu konstanta yang menempel di dekat $x$ menggunakan operasi berlawanan:
   * Menetralkan $+5$ dikurangi dengan $5$.
   * Menetralkan $-3$ dijumlahkan dengan $3$.
2. Selalu terapkan pengurangan atau penjumlahan angka penyeimbang tersebut di **KEDUA RUAS** sekaligus!`,
        illustrationPrompt: "Langkah infografis animasi satu-dua-tiga menggeser angka menyeberangi jembatan sama dengan sehingga tanda aritmatika berubah menjadi kebalikannya.",
        flashcards: [
          { id: "fc_a2_1", front: "Isolasi Variabel", back: "Menyisakan variabel sendirian di satu sisi ruas persamaan" },
          { id: "fc_a2_2", front: "Lawan dari Penjumlahan (+)", back: "Pengurangan (-)" },
          { id: "fc_a2_3", front: "Lawan dari Perkalian (x)", back: "Pembagian (:)" }
        ]
      }
    ],
    quiz: [
      {
        id: "q_a1",
        type: "multiple-choice",
        question: "Jika diberikan persamaan 2x + 4 = 12, maka nilai variabel x yang memenuhi adalah...",
        options: [
          "A. x = 2",
          "B. x = 4",
          "C. x = 6",
          "D. x = 8"
        ],
        correctAnswer: "B",
        explanation: "Kurangi kedua ruas dengan 4: 2x = 8. Lalu bagi kedua ruas dengan 2: x = 4. Pemeriksaan: 2(4) + 4 = 12 (Benar)."
      },
      {
        id: "q_a2",
        type: "true-false",
        question: "Dalam menyelesaikan persamaan aljabar x - 8 = 20, kita harus mengurangi angka 8 dari kedua ruas.",
        options: ["Benar", "Salah"],
        correctAnswer: "Salah",
        explanation: "Kebalikan dari kurang 8 adalah tambah 8. Maka, kita harus menjumlahkan kedua ruas dengan 8 sehingga x = 20 + 8 = 28."
      },
      {
        id: "q_a3",
        type: "matching",
        question: "Jodohkan persamaan linier sederhana berikut dengan kunci penyelesaian x yang pas!",
        correctAnswer: "matching_game",
        explanation: "3x = 15 berarti x = 5. x + 7 = 10 berarti x = 3. 2x - 3 = 11 berarti x = 7.",
        matchingPairs: [
          { left: "3x = 15", right: "x = 5" },
          { left: "x + 7 = 10", right: "x = 3" },
          { left: "2x - 3 = 11", right: "x = 7" },
          { left: "10 - x = 2", right: "x = 8" }
        ]
      }
    ],
    widget: {
      type: "balancer",
      title: "Neraca Aljabar Linier",
      description: "Seimbangkan timbangan persamaan aljabar di bawah ini dengan mengubah variabel x agar Ruas Kiri menyamai Ruas Kanan secara presisi!",
      data: {
        balancerEquations: [
          { leftSide: "3x + 2", rightSide: "14", balancedCoefficients: [4] },
          { leftSide: "5x - 3", rightSide: "17", balancedCoefficients: [4] },
          { leftSide: "2x + 7", rightSide: "19", balancedCoefficients: [6] }
        ]
      }
    },
    createdAt: "2026-06-07T11:00:00Z"
  },
  {
    id: "tmpl_ekologi",
    title: "Aliran Energi & Rantai Makanan",
    subject: "IPA (Biologi Ekologi)",
    gradeLevel: "Kelas V SD",
    description: "Memahami bagaimana energi matahari mengalir dari organisme produsen, melompat melalui berbagai tingkat konsumen dalam jaring rantai makanan ekosistem hutan.",
    learningObjectives: [
      { id: "obj_eko_1", text: "Mengidentifikasi peran organisme sebagai produsen, konsumen, dan dekomposer." },
      { id: "obj_eko_2", text: "Menyusun skema urutan pengaliran energi pada rantai makanan darat." },
      { id: "obj_eko_3", text: "Menjelaskan dampak kepunahan salah satu makhluk hidup dalam kelangsungan ekosistem." }
    ],
    sections: [
      {
        id: "sec_e1",
        title: "1. Produsen: Pabrik Energi Hijau Alami",
        content: `Rantai makanan selalu diawali oleh organisme spesial yang dijuluki **Produsen**. Tumbuhan hijau adalah produsen utama di daratan karena memiliki zat **klorofil**.

Dengan klorofil dan bantuan sinar matahari, tumbuhan mampu melakukan **fotosintesis**: mengubah karbon dioksida dan air menjadi molekul gula penampung energi kimiawi langsung. Tanpa adanya produsen, jaring-jaring kehidupan akan runtuh seketika karena tidak ada pasokan energi baru bagi makhluk hidup pemakan daging maupun tumbuhan lainnya.`,
        illustrationPrompt: "Ilustrasi pohon hijau yang menyerap matahari, air, karbon dioksida dan mengeluarkan gas oksigen segar.",
        flashcards: [
          { id: "fc_e1_1", front: "Produsen Utama Darat", back: "Tumbuhan Hijau" },
          { id: "fc_e1_2", front: "Zat Hijau Daun", back: "Klorofil" },
          { id: "fc_e1_3", front: "Proses Pembuatan Makanan", back: "Fotosintesis" }
        ]
      },
      {
        id: "sec_e2",
        title: "2. Tingkatan Konsumen dan Aliran Energi yang Menyusut",
        content: `Hewan tidak bisa membuat makanannya sendiri, sehingga mereka berperan sebagai **Konsumen**:

* **Konsumen I (Herbivora):** Hewan pemakan tumbuhan langsung. Contoh: Belalang, ulat, kambing.
* **Konsumen II (Karnivora kecil / Omnivora):** Hewan pemakan konsumen tingkat pertama. Contoh: Katak, ayam.
* **Konsumen III / Puncak (Karnivora puncak):** Predator di ujung puncak teratas. Contoh: Elang, singa.

Ketika energi melompat dari satu tingkat ke tingkat di atasnya, hanya sekitar **10% energi** saja yang berhasil diwarisi dan disimpan menjadi jaringan tubuh baru, sementara sisanya terbuang sebagai panas sisa metabolisme gerak tubuh organisme tersebut.`,
        illustrationPrompt: "Visual piramida ekologi yang menyempit dari tumbuhan di bagian paling bawah menuju herbivora di tengah dan elang gagah di ujung lancip teratas.",
        flashcards: [
          { id: "fc_e2_1", front: "Konsumen Tingkat I", back: "Hewan Herbivora (Pemakan Tumbuhan)" },
          { id: "fc_e2_2", front: "Pengurai Jasad Mati", back: "Dekomposer (Bakteri & Jamur)" },
          { id: "fc_e2_3", front: "Hukum 10 Persen Lemak Energi", back: "Hanya 10% energi yang berhasil ditransfer ke tingkat trofik berikutnya" }
        ]
      }
    ],
    quiz: [
      {
        id: "q_e1",
        type: "multiple-choice",
        question: "Makhluk hidup manakah di bawah ini yang berperan memproduksi energi dasar dalam rantai makanan ekosistem sawah?",
        options: [
          "A. Tikus sawah",
          "B. Padi",
          "C. Katak hijau",
          "D. Jamur tanah"
        ],
        correctAnswer: "B",
        explanation: "Padi berperan sebagai produsen karena memiliki klorofil untuk mensintesis makanannya sendiri dari cahaya matahari."
      },
      {
        id: "q_e2",
        type: "true-false",
        question: "Konsumen puncak seperti macan memperoleh 100% energi utuh dari rumput yang dimakan oleh mangsanya.",
        options: ["Benar", "Salah"],
        correctAnswer: "Salah",
        explanation: "Setiap perpindahan rantai makanan membuang 90% energi untuk beraktivitas dan panas, sehingga predator puncak hanya mewarisi jatah konsumsi energi terkecil (~0.1%)."
      },
      {
        id: "q_e3",
        type: "matching",
        question: "Jodohkan peran makhluk hidup berikut dengan kategorinya dalam mata rantai kehidupan!",
        correctAnswer: "matching_game",
        explanation: "Pohon kelapa adalah produsen, ulat bulu adalah konsumen primer, burung pipit adalah konsumen sekunder, dan jamur adalah dekomposer.",
        matchingPairs: [
          { left: "Pohon Mangga", right: "Produsen penyedia energi" },
          { left: "Ulat Daun", right: "Konsumen I (Herbivora)" },
          { left: "Burung Prenjak", right: "Konsumen II (Karnivora kecil)" },
          { left: "Cacing Tanah", right: "Dekomposer / Pengurai tanah" }
        ]
      }
    ],
    widget: {
      type: "timeline",
      title: "Rantai Energi Alami",
      description: "Urutkan siklus aliran energi dan rantai makanan di bawah ini dari hulu produsen paling awal menuju pemakan dan pengurai akhir!",
      data: {
        sortedTimeline: [
          { year: "Urutan 1", event: "Rumput hijau menyerap sinar matahari untuk fotosintesis (Produsen)" },
          { year: "Urutan 2", event: "Belalang padang memakan helaian rumput hijau (Konsumen Linier I)" },
          { year: "Urutan 3", event: "Katak lumpur memangsa belalang yang melompat di daun (Konsumen Linier II)" },
          { year: "Urutan 4", event: "Ular kobra menyerang dan menelan katak lumpur bulat-bulat (Konsumen Linier III)" },
          { year: "Urutan 5", event: "Bakteri pembusuk menguraikan jasad ular kobra yang mati (Pengurai/Dekomposer)" }
        ]
      }
    },
    createdAt: "2026-06-07T10:30:00Z"
  }
];
