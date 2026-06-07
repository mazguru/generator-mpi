import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, BookOpen, AlertTriangle, Cpu, GraduationCap, FileText, CheckCircle } from "lucide-react";
import { LearningModule } from "../types";

interface ModuleGeneratorProps {
  onModuleGenerated: (module: LearningModule) => void;
  onCancel: () => void;
}

const loadingSteps = [
  { icon: GraduationCap, label: "Menganalisis kompetensi dasar & menyusun Capaian Pembelajaran (CP)..." },
  { icon: FileText, label: "Menyusun materi teks terstruktur dalam sintaks Markdown komprehensif..." },
  { icon: Cpu, label: "Merancang rangkaian Flashcard cepat berdasarkan sub-materi..." },
  { icon: Sparkles, label: "Menformulasikan kuis otomatis (Pilihan Ganda & Menjodohkan)..." },
  { icon: Cpu, label: "Mengembangkan mini-game interaktif khusus sesuai tema materi..." },
  { icon: CheckCircle, label: "Menyelesaikan penyusunan media pembelajaran interaktif..." }
];

export default function ModuleGenerator({ onModuleGenerated, onCancel }: ModuleGeneratorProps) {
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("IPA (Sains)");
  const [gradeLevel, setGradeLevel] = useState("Kelas VII SMP");
  const [extraInstructions, setExtraInstructions] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Rotate loading instructions to keep user engaged
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
      }, 5000);
    } else {
      setCurrentStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError("Topik materi wajib diisi!");
      return;
    }

    setLoading(true);
    setError(null);
    setCurrentStep(0);

    try {
      const response = await fetch("/api/generate-module", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          subject,
          gradeLevel,
          extraInstructions,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal menghubungi server generator.");
      }

      onModuleGenerated(data);
    } catch (err: any) {
      console.error(err);
      setError(
        err.message || 
        "Gagal menyusun materi. Pastikan koneksi internet aktif atau 'GEMINI_API_KEY' telah terkonfigurasi dengan benar di panel Settings > Secrets."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    const ActiveStepIcon = loadingSteps[currentStep].icon;

    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 max-w-xl mx-auto text-center">
        <div className="relative mb-8">
          {/* Pulsating back glow */}
          <div className="absolute inset-0 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="relative bg-white dark:bg-slate-800 p-6 rounded-full border border-blue-100 shadow-xl flex items-center justify-center w-24 h-24 animate-bounce">
            <ActiveStepIcon className="w-12 h-12 text-blue-600" />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-slate-800 mb-2 font-sans tracking-tight">
          AI Sedang Merakit Media Pembelajaran
        </h3>
        
        <p className="text-sm text-slate-500 max-w-sm mb-8">
          Gemini 3.5 sedang memformulasikan peta pengajaran, materi multimedia, dan kode simulasi kuis interaktif Anda.
        </p>

        {/* Loading Progress Bar Container */}
        <div className="w-full bg-slate-100 p-1 rounded-full mb-6">
          <div 
            className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000"
            style={{ width: `${((currentStep + 1) / loadingSteps.length) * 100}%` }}
          ></div>
        </div>

        {/* Dynamic step labels */}
        <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl w-full min-h-[80px] flex items-center gap-3 text-left">
          <Sparkles className="w-6 h-6 text-indigo-500 shrink-0 animate-spin" style={{ animationDuration: '6s' }} />
          <div>
            <span className="text-xs font-mono text-slate-400 block uppercase tracking-wider font-semibold">
              Langkah {currentStep + 1} dari {loadingSteps.length}
            </span>
            <p className="text-slate-600 font-medium text-sm leading-snug">
              {loadingSteps[currentStep].label}
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-400 mt-6 italic">
          Proses ini biasanya memakan waktu sekitar 10-25 detik.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 rounded-xl">
          <Sparkles className="w-6 h-6 text-blue-600 animate-pulse" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 font-sans tracking-tight">
            Generator Pembelajaran AI
          </h2>
          <p className="text-sm text-slate-500">
            Rakit materi pelajaran interaktif lengkap dengan kuis otomatis & media simulasi dalam hitungan detik.
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm flex gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
          <div className="space-y-1">
            <p className="font-semibold">Kesalahan Pembuatan Modul:</p>
            <p className="leading-relaxed opacity-90">{error}</p>
            <p className="text-xs text-amber-700/80 mt-2 font-mono">
              Silakan pastikan variable GEMINI_API_KEY telah dimasukkan ke menu tab samping atau Settings sebelah atas.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-blue-500" />
            Topik Pembelajaran <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Contoh: Proses Fotosintesis, Kerajaan Majapahit, Hukum Newton II"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition"
          />
          <p className="text-xs text-slate-400 mt-1 italic">
            Semakin spesifik topik, semakin akurat AI menyusun materi & kuis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Mata Pelajaran (Subject)
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition"
            >
              <option value="IPA (Sains)">IPA (Sains)</option>
              <option value="IPS (Sejarah / Geografi)">IPS (Sejarah / Geografi)</option>
              <option value="Matematika">Matematika</option>
              <option value="Bahasa Indonesia">Bahasa Indonesia</option>
              <option value="Bahasa Inggris">Bahasa Inggris</option>
              <option value="Informatika / Teknologi">Informatika / Teknologi</option>
              <option value="Pendidikan Pancasila">Pendidikan Pancasila</option>
              <option value="Keahlian Produktif / SMK">Keahlian Produktif / SMK</option>
              <option value="Umum & Keterampilan">Umum & Keterampilan</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Tingkat Kelas (Grade Level)
            </label>
            <select
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition"
            >
              <option value="Kelas IV - VI SD">Kelas IV - VI SD</option>
              <option value="Kelas VII SMP">Kelas VII SMP</option>
              <option value="Kelas VIII SMP">Kelas VIII SMP</option>
              <option value="Kelas IX SMP">Kelas IX SMP</option>
              <option value="Kelas X SMA/SMK">Kelas X SMA/SMK</option>
              <option value="Kelas XI SMA/SMK">Kelas XI SMA/SMK</option>
              <option value="Kelas XII SMA/SMK">Kelas XII SMA/SMK</option>
              <option value="Tingkat Umum">Tingkat Umum</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Instruksi Khusus untuk AI (Opsional)
          </label>
          <textarea
            placeholder="Sebutkan kompetensi dasar yang ingin dimuat, bahasa lebih santai, contoh sehari-hari, muatan lokal, dll..."
            value={extraInstructions}
            onChange={(e) => setExtraInstructions(e.target.value)}
            rows={3}
            className="w-full px-4 py-2.5 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition placeholder:text-slate-400 text-sm"
          />
        </div>

        <div className="flex gap-3 justify-end pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium rounded-xl transition"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition flex items-center gap-2 justify-center shadow-sm hover:shadow-md cursor-pointer"
          >
            Mulai Buat Modul <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
