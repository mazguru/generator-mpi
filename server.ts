/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));

// Lazy initializer for Gemini Client
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined. Please define it in your Secrets panel.");
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

// REST API for Learning Module Generation using Gemini 3.5 Flash
app.post("/api/generate-module", async (req, res) => {
  try {
    const { topic, gradeLevel, subject, extraInstructions } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "Topic / topik materi harus diisi!" });
    }

    const ai = getGeminiClient();

    const systemInstruction = `Anda adalah seorang ahli teknologi pendidikan, kurikulum merdeka Indonesia, dan instruktur pembelajaran interaktif kreatif. 
Tugas Anda adalah memformulasikan Media Pembelajaran Interaktif berbasis web berbentuk modul digital yang sangat kaya, murni dalam Bahasa Indonesia.
Modul harus disesuaikan untuk siswa kelas/tingkat [GradeLevel] pada mata pelajaran [Subject].

Setiap modul wajib berisikan:
1. Deskripsi menarik serta 3-4 Capaian Pembelajaran (CP) yang jelas.
2. 3 Bagian materi (sections) yang mendalam. Masing-masing bagian materi harus berisi penjelasan komprehensif dalam sintaks Markdown (gunakan heading h3/h4, blockquote, bullet points, dan penekanan teks). Setiap bagian juga harus dilengkapi konsep visual penjelas (illustrationPrompt) dan 3 Flashcard untuk belajar cepat.
3. 5 Soal kuis otomatis yang bervariasi:
   - Minimal 2 pilihan ganda (multiple-choice): cantumkan 4 opsi (A, B, C, D), jawaban benar ('A' atau 'B' dst), serta penjelasan rinci.
   - Minimal 1 Benar/Salah (true-false): isi dengan pernyataan menarik, jawaban benar ('Benar' atau 'Salah'), serta penjelasan pendukung.
   - Minimal 1 Menjodohkan (matching): sediakan 4 pasang kata kiri-kanan (left-right) yang dapat dipadukan siswa di UI.
4. 1 Mini-game interaktif (widget) yang dirancang cerdas sesuai topik untuk dimainkan langsung di aplikasi web. Pilih jenis widget yang paling relevan:
   - 'sorting': mengelompokkan beberapa item ke dalam 2-3 kategori yang tepat.
   - 'balancer': menyeimbangkan koefisien atau elemen (bagus untuk matematika/kimia/fisika).
   - 'timeline': mengurutkan rangkaian kejadian sejarah atau langkah ilmiah secara kronologis.
   - 'flashcard-deck': kumpulan kartu hafalan interaktif terfokus.
   Pastikan data pendukung untuk widget tersebut disediakan lengkap pada objek data.`;

    const prompt = `Buatkan modul pembelajaran interaktif berstruktur tinggi untuk topik berikut: 
Topik: "${topic}"
Subject/Mata Pelajaran: "${subject || "Umum"}"
Tingkat/Kelas: "${gradeLevel || "Umum"}"
Instruksi Tambahan: "${extraInstructions || "Visual dan interaktif yang padat, aplikatif"}"

Mohon penuhi kriteria tersebut dan kembalikan struktur data dalam model JSON yang tepat sesuai response schema yang didefinisikan. Semua teks konten harus menggunakan Bahasa Indonesia yang edukatif, ramah, dan memotivasi.`;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        title: { 
          type: Type.STRING, 
          description: "Judul modul pembelajaran yang inspiratif dan menarik, misal: 'Menjelajahi Keajaiban Ekosistem Hutan'" 
        },
        subject: { type: Type.STRING },
        gradeLevel: { type: Type.STRING },
        description: { 
          type: Type.STRING, 
          description: "Deskripsi umum atau pengantar modul pembelajaran interaktif yang memikat siswa." 
        },
        learningObjectives: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              text: { type: Type.STRING, description: "Tujuan pembelajaran, misal: 'Siswa mampu mengidentifikasi komponen biotik'" }
            },
            required: ["id", "text"]
          }
        },
        sections: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING, description: "Judul sub-materi/bagian" },
              content: { 
                type: Type.STRING, 
                description: "Konten materi edukasi mendalam disajikan dalam format Markdown lengkap dengan struktur penulisan yang apik." 
              },
              illustrationPrompt: { 
                type: Type.STRING, 
                description: "Deskripsi gambar/grafis pendukung yang mewakili materi ini untuk diilustrasikan secara visual di layar." 
              },
              flashcards: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    front: { type: Type.STRING, description: "Istilah, pertanyaan kunci sekilas" },
                    back: { type: Type.STRING, description: "Penjelasan ringkas padat" }
                  },
                  required: ["id", "front", "back"]
                }
              }
            },
            required: ["id", "title", "content", "illustrationPrompt", "flashcards"]
          }
        },
        quiz: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              type: { type: Type.STRING, description: "Wajib salah satu dari: 'multiple-choice', 'true-false', 'matching'" },
              question: { type: Type.STRING, description: "Pernyataan atau pertanyaan soal kuis" },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Berikan tepat 4 pilihan jawaban berupa teks lengkap jika tipenya 'multiple-choice'. Kosongkan jika tipe lain."
              },
              correctAnswer: { 
                type: Type.STRING, 
                description: "Untuk multiple-choice: opsi yang benar (A/B/C/D). Untuk true-false: 'Benar' atau 'Salah'. Untuk matching: string jawaban penggabung atau petunjuk pasokan kunci." 
              },
              explanation: { type: Type.STRING, description: "Penjelasan ilmiah atau logis mengapa jawaban tersebut benar." },
              matchingPairs: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    left: { type: Type.STRING, description: "Entitas kiri (misal: 'Bumi')" },
                    right: { type: Type.STRING, description: "Pasangan entitas kanan yang cocok (misal: 'Planet ketiga dari Matahari')" }
                  },
                  required: ["left", "right"]
                },
                description: "Sediakan tepat 3 sampai 4 pasangan menjodohkan jika tipe soal adalah 'matching'."
              }
            },
            required: ["id", "type", "question", "correctAnswer", "explanation"]
          }
        },
        widget: {
          type: Type.OBJECT,
          properties: {
            type: { 
              type: Type.STRING, 
              description: "Harus salah satu tipe mini-game yang paling sesuai topik: 'sorting', 'balancer', 'timeline', 'flashcard-deck'" 
            },
            title: { type: Type.STRING, description: "Nama aktivitas interaktif" },
            description: { type: Type.STRING, description: "Petunjuk cara bermain atau melakukan simulasi" },
            data: {
              type: Type.OBJECT,
              properties: {
                items: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Daftar kata/benda untuk game sorting, atau tahapan bebas."
                },
                categories: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Nama kategori pengelompokkan untuk game sorting (misal: ['Organik', 'Anorganik'])"
                },
                // Timeline data
                sortedTimeline: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      year: { type: Type.STRING, description: "Tahun atau Teks Urutan (misal: 'Tahap 1', '1945')" },
                      event: { type: Type.STRING, description: "Deskripsi peristiwa atau aktivitas" }
                    },
                    required: ["year", "event"]
                  },
                  description: "Rangkaian urutan peristiwa kronologis untuk diurutkan siswa (timeline)."
                },
                // Balancer data
                balancerEquations: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      leftSide: { type: Type.STRING, description: "Persamaan reaksi atau rumus sisi kiri, misal 'H2 + O2'" },
                      rightSide: { type: Type.STRING, description: "Persamaan hasil sisi kanan, misal 'H2O'" },
                      balancedCoefficients: { 
                        type: Type.ARRAY, 
                        items: { type: Type.NUMBER }, 
                        description: "Bilangan angka pengimbang koefisien, contoh: [2, 1, 2]" 
                      }
                    },
                    required: ["leftSide", "rightSide", "balancedCoefficients"]
                  }
                }
              }
            }
          },
          required: ["type", "title", "description", "data"]
        }
      },
      required: [
        "title",
        "subject",
        "gradeLevel",
        "description",
        "learningObjectives",
        "sections",
        "quiz",
        "widget"
      ]
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
      },
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("Gagal memperoleh respons materi dari AI.");
    }

    const generatedJson = JSON.parse(textOutput);
    
    // Inject custom attributes like unique ID and timestamp
    const completedModule = {
      ...generatedJson,
      id: "mod_" + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };

    return res.json(completedModule);
  } catch (error: any) {
    console.error("Error generating module:", error);
    return res.status(500).json({ error: error.message || "Gagal membuat modul pembelajaran." });
  }
});

// Serve frontend build output in production
if (process.env.NODE_ENV !== "production") {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
} else {
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// Start Listening
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
