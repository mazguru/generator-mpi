/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Layers, 
  CheckCircle, 
  Download, 
  HelpCircle, 
  ChevronRight, 
  ChevronLeft, 
  Compass, 
  Award, 
  Image as ImageIcon, 
  PlayCircle, 
  Plus, 
  BookOpenCheck,
  RefreshCw,
  Trophy,
  BrainCircuit,
  Volume2
} from "lucide-react";
import { LearningModule, QuizQuestion } from "./types";
import { sampleModules } from "./templates";
import ModuleGenerator from "./components/ModuleGenerator";
import InteractiveWidgetPlayer from "./components/InteractiveWidgetPlayer";

// Fallback high-fidelity asset design generator based on the material illustration prompt
function getAssetIllustration(sectionTitle: string) {
  const lowercase = sectionTitle.toLowerCase();
  if (lowercase.includes("matahari") || lowercase.includes("pusat")) {
    return (
      <div className="w-full h-48 rounded-xl bg-gradient-to-br from-amber-600 via-orange-500 to-amber-900 relative overflow-hidden flex items-center justify-center p-4 border border-amber-500/20">
        <div className="absolute w-24 h-24 bg-amber-400 rounded-full blur-xl opacity-60 animate-pulse"></div>
        <div className="relative text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-300 to-orange-500 rounded-full mx-auto shadow-2xl border-4 border-yellow-200 flex items-center justify-center">
            <span className="text-white text-xs font-bold font-mono">1.39M km</span>
          </div>
          <p className="text-[10px] text-amber-200 mt-2 font-mono uppercase tracking-wider font-bold">Model Surya Elips</p>
        </div>
      </div>
    );
  }
  if (lowercase.includes("klasifikasi") || lowercase.includes("planet") || lowercase.includes("terestrial")) {
    return (
      <div className="w-full h-48 rounded-xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 relative overflow-hidden flex items-center justify-center p-4 border border-indigo-500/20">
        <div className="flex gap-4 items-center">
          <div className="text-center">
            <div className="w-8 h-8 rounded-full bg-blue-400 border border-blue-200 shadow-lg mx-auto"></div>
            <span className="text-[9px] text-slate-300 block mt-1">Terestrial</span>
          </div>
          <div className="w-1 h-8 bg-dashed bg-slate-600"></div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-indigo-500 border border-indigo-300 shadow-2xl relative mx-auto">
              <div className="absolute w-16 h-1 bg-white/20 -left-2 top-5 rotate-15"></div>
            </div>
            <span className="text-[9px] text-slate-300 block mt-1">Jovian Gas</span>
          </div>
        </div>
      </div>
    );
  }
  if (lowercase.includes("kepler") || lowercase.includes("orbit")) {
    return (
      <div className="w-full h-48 rounded-xl bg-gradient-to-br from-slate-950 to-indigo-950 relative overflow-hidden flex items-center justify-center p-4 border border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="w-36 h-20 rounded-full border-2 border-dashed border-indigo-500/30 flex items-center justify-center relative">
          <div className="w-6 h-6 rounded-full bg-amber-500 absolute left-4"></div>
          <div className="w-4 h-4 rounded-full bg-blue-400 absolute right-4 animate-bounce"></div>
        </div>
      </div>
    );
  }
  if (lowercase.includes("ruas") || lowercase.includes("timbangan") || lowercase.includes("keseimbangan")) {
    return (
      <div className="w-full h-48 rounded-xl bg-gradient-to-br from-lime-950 via-slate-900 to-emerald-950 relative overflow-hidden flex items-center justify-center p-4 border border-lime-800/30">
        <div className="text-center">
          <div className="w-20 h-2 bg-lime-400 rounded-full mx-auto"></div>
          <div className="w-2 h-10 bg-slate-700 mx-auto"></div>
          <div className="w-8 h-2 bg-slate-600 mx-auto rounded"></div>
          <span className="text-[10px] text-lime-400 font-mono block mt-2">Setimbang x = y</span>
        </div>
      </div>
    );
  }
  if (lowercase.includes("isolasi") || lowercase.includes("variabel")) {
    return (
      <div className="w-full h-48 rounded-xl bg-gradient-to-br from-emerald-950 to-slate-900 relative overflow-hidden flex items-center justify-center p-4 border border-emerald-800/20">
        <div className="text-center">
          <div className="inline-flex p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400 mb-2">
            <span className="text-lg font-extrabold font-mono font-sans">x</span>
          </div>
          <p className="text-[10px] text-slate-300 font-mono">Variabel Terisolasi Mandiri</p>
        </div>
      </div>
    );
  }
  
  // Generic beautiful eco/science graphic placeholder
  return (
    <div className="w-full h-48 rounded-xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 relative overflow-hidden flex items-center justify-center p-4 border border-indigo-500/20">
      <div className="absolute inset-0 bg-radial-gradient from-indigo-500/10 to-transparent"></div>
      <div className="text-center space-y-2 z-10">
        <Compass className="w-10 h-10 text-indigo-400 mx-auto animate-spin" style={{ animationDuration: "12s" }} />
        <span className="bg-indigo-500/20 text-indigo-300 rounded px-2 py-0.5 text-[9px] font-mono border border-indigo-500/30 block uppercase tracking-wider font-bold">
          Visualisasi {sectionTitle.slice(0, 20)}...
        </span>
      </div>
    </div>
  );
}

// Clean Custom Markdown Parser and Element Formatter
function MarkdownRenderer({ content }: { content: string }) {
  const lineBlocks = content.split("\n");
  return (
    <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
      {lineBlocks.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-2" />;

        // Header ###
        if (trimmed.startsWith("###")) {
          return (
            <h4 key={idx} className="text-base font-bold text-slate-800 pt-3 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-indigo-500 rounded-full"></span>
              {trimmed.replace(/^###\s*/, "")}
            </h4>
          );
        }

        // Header ##
        if (trimmed.startsWith("##")) {
          return (
            <h3 key={idx} className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-1.5 pt-4">
              {trimmed.replace(/^##\s*/, "")}
            </h3>
          );
        }

        // Bullet point *
        if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
          const rawText = trimmed.replace(/^[\*\-]\s*/, "");
          // Bold matches
          return (
            <li key={idx} className="list-disc list-inside ml-4 text-slate-600 text-sm space-y-1">
              <span className="font-semibold text-slate-800">{rawText.split("**")[1] || ""}</span> 
              <span>{rawText.split("**")[2] || rawText}</span>
            </li>
          );
        }

        // Ordered list numbers
        if (/^\d+\.\s*/.test(trimmed)) {
          const rawText = trimmed.replace(/^\d+\.\s*/, "");
          return (
            <div key={idx} className="flex gap-2 text-sm pl-2">
              <span className="font-bold text-indigo-600 font-mono">{trimmed.match(/^\d+/)?.toString()}.</span>
              <p className="text-slate-600">{rawText}</p>
            </div>
          );
        }

        // Quote blockquote
        if (trimmed.startsWith("> ")) {
          return (
            <blockquote key={idx} className="border-l-4 border-indigo-500 bg-indigo-50/50 p-3 rounded-r-lg text-xs italic text-slate-700/90 leading-relaxed font-sans">
              {trimmed.replace(/^>\s*/, "")}
            </blockquote>
          );
        }

        // Regular paragraph with bold ** support
        if (trimmed.toLowerCase().includes("**")) {
          const segments = trimmed.split("**");
          return (
            <p key={idx} className="text-slate-600 leading-relaxed">
              {segments.map((seg, sIdx) => 
                sIdx % 2 === 1 ? <strong key={sIdx} className="font-extrabold text-slate-900">{seg}</strong> : seg
              )}
            </p>
          );
        }

        return <p key={idx} className="text-slate-600 leading-relaxed">{trimmed}</p>;
      })}
    </div>
  );
}

export default function App() {
  // Store generated modules and preset modules altogether
  const [modules, setModules] = useState<LearningModule[]>([]);
  const [selectedModuleId, setSelectedModuleId] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"materi" | "flashcards" | "kuis" | "simulasi">("materi");
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
  
  // Flashcard Flip State
  const [isFlipped, setIsFlipped] = useState<{ [key: string]: boolean }>({});
  
  // States to load AI generator
  const [isGeneratorActive, setIsGeneratorActive] = useState<boolean>(false);

  // Kuis engine state
  const [answeredMap, setAnsweredMap] = useState<{ [qId: string]: string }>({});
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);

  // Matching game state variables
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<{ [left: string]: string }>({});
  const [matchingError, setMatchingError] = useState<string | null>(null);

  // Load modules from initial templates or localStorage on mount
  useEffect(() => {
    const cached = localStorage.getItem("aistudio_modules");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.length > 0) {
          setModules([...sampleModules, ...parsed]);
          setSelectedModuleId(parsed[0].id || sampleModules[0].id);
          return;
        }
      } catch (e) {
        console.error("Error reading cache", e);
      }
    }
    setModules(sampleModules);
    setSelectedModuleId(sampleModules[0].id);
  }, []);

  // Save new client modules to localStorage
  const saveModulesToLocal = (newModules: LearningModule[]) => {
    const onlyUsers = newModules.filter(m => !m.id.startsWith("tmpl_"));
    localStorage.setItem("aistudio_modules", JSON.stringify(onlyUsers));
  };

  const handleModuleGenerated = (newModule: LearningModule) => {
    const updated = [newModule, ...modules];
    setModules(updated);
    saveModulesToLocal(updated);
    setSelectedModuleId(newModule.id);
    setIsGeneratorActive(false);
    
    // Reset page states
    setActiveTab("materi");
    setCurrentSectionIndex(0);
    resetQuizStates();
  };

  const activeModule = modules.find(m => m.id === selectedModuleId) || modules[0] || sampleModules[0];

  const toggleCardFlip = (cardId: string) => {
    setIsFlipped(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const currentSection = activeModule?.sections?.[currentSectionIndex] || activeModule?.sections?.[0];

  // Quiz Engine Logic
  const resetQuizStates = () => {
    setAnsweredMap({});
    setQuizScore(0);
    setQuizSubmitted(false);
    setCurrentQuizIndex(0);
    setSelectedLeft(null);
    setMatchedPairs({});
    setMatchingError(null);
  };

  const handleSelectQuizOption = (qId: string, optionLetter: string) => {
    if (quizSubmitted) return;
    setAnsweredMap(prev => ({
      ...prev,
      [qId]: optionLetter
    }));
  };

  const handleSelectTrueFalse = (qId: string, value: string) => {
    if (quizSubmitted) return;
    setAnsweredMap(prev => ({
      ...prev,
      [qId]: value
    }));
  };

  // --- MATCHING GAME EVENT ---
  const handleItemClickMatchingLeft = (leftItem: string) => {
    if (quizSubmitted) return;
    setSelectedLeft(leftItem);
    setMatchingError(null);
  };

  const handleItemClickMatchingRight = (rightItem: string, q: QuizQuestion) => {
    if (!selectedLeft || quizSubmitted) return;

    // Check if correct matching pair
    const matchingQuiz = q.matchingPairs?.find(pair => pair.left === selectedLeft);
    if (matchingQuiz && matchingQuiz.right === rightItem) {
      // It is a match!
      setMatchedPairs(prev => ({
        ...prev,
        [selectedLeft]: rightItem
      }));
      setSelectedLeft(null);
    } else {
      setMatchingError(`"${selectedLeft}" kurang cocok dipasangkan dengan "${rightItem}". Coba cari kesesuaian lain!`);
      setTimeout(() => setMatchingError(null), 3000);
      setSelectedLeft(null);
    }
  };

  const handleSubmitQuiz = () => {
    if (quizSubmitted) return;

    let score = 0;
    activeModule.quiz.forEach((q) => {
      if (q.type === "multiple-choice" || q.type === "true-false") {
        const studentAns = answeredMap[q.id];
        if (studentAns === q.correctAnswer) {
          score += 1;
        }
      } else if (q.type === "matching" && q.matchingPairs) {
        // Evaluate completed pairs
        let pairsCorrect = true;
        q.matchingPairs.forEach(pair => {
          if (matchedPairs[pair.left] !== pair.right) {
            pairsCorrect = false;
          }
        });
        if (pairsCorrect && Object.keys(matchedPairs).length === q.matchingPairs.length) {
          score += 1;
        }
      }
    });

    setQuizScore(score);
    setQuizSubmitted(true);
  };

  // Trigger JSON download file of compiling module
  const downloadModuleJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(activeModule, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${activeModule.title.toLowerCase().replace(/\s+/g, "_")}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 font-sans overflow-hidden">
      
      {/* Top Header Navigation Bar */}
      <nav className="h-16 flex items-center justify-between px-6 bg-white border-b border-slate-200 shadow-sm shrink-0 z-10">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white font-extrabold text-base tracking-wider font-mono">MPI</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 tracking-tight flex items-center gap-2">
              EduGenius Media
              <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full text-slate-500 font-mono font-normal">v2.4</span>
            </h1>
            <p className="text-[10px] text-slate-400">Penyusun & Simulator Pembelajaran Interaktif Hebat</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-slate-100 rounded-full border border-slate-200/50">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-slate-600">Simulasi: Aktif</span>
          </div>
          
          <button 
            onClick={() => setIsGeneratorActive(true)}
            id="top-init-generator-btn"
            className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Buat Materi AI
          </button>
        </div>
      </nav>

      {/* Main Container Workspace layout */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFTSIDE BAR - Controls, preset templates selection, CP checklists */}
        <aside className="w-72 bg-white border-r border-slate-200 flex flex-col p-5 shrink-0 select-none">
          <div className="space-y-6 flex-1 overflow-y-auto pr-1">
            
            {/* Header controls select */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2.5">
                Peta Pembelajaran Terbuka
              </label>
              <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1 scrollbar-thin">
                {modules.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setSelectedModuleId(m.id);
                      setIsGeneratorActive(false);
                      setCurrentSectionIndex(0);
                      resetQuizStates();
                    }}
                    id={`sidebar-select-module-${m.id}`}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition flex flex-col space-y-1 cursor-pointer ${
                      selectedModuleId === m.id && !isGeneratorActive
                        ? "bg-indigo-50 border-indigo-200 text-indigo-900 shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/50"
                    }`}
                  >
                    <span className="truncate block font-bold">{m.title}</span>
                    <span className="text-[9px] text-slate-400 font-mono flex items-center justify-between">
                      <span>{m.subject}</span>
                      <span className="italic">{m.gradeLevel}</span>
                    </span>
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setIsGeneratorActive(true)}
                id="sidebar-add-new-btn"
                className={`w-full mt-3 py-2.5 rounded-xl border-2 border-dashed text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  isGeneratorActive 
                    ? "bg-indigo-50/40 border-indigo-400/50 text-indigo-700" 
                    : "border-slate-300 text-slate-500 hover:border-slate-400 hover:bg-slate-50"
                }`}
              >
                <Plus className="w-4 h-4" /> Susun Topik Sukses
              </button>
            </div>

            {/* Current Active Module Specification Panel */}
            {!isGeneratorActive && activeModule && (
              <div className="space-y-4 border-t border-slate-100 pt-4">
                <div>
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">
                    Detail Media Terpilih
                  </span>
                  <p className="text-sm font-extrabold text-slate-800 leading-snug">{activeModule.title}</p>
                  <p className="text-xs text-indigo-600 font-semibold mt-1 bg-indigo-50/50 inline-block px-2 py-0.5 rounded-full border border-indigo-100/30">
                    {activeModule.subject} • {activeModule.gradeLevel}
                  </p>
                </div>

                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                    Capaian Pelajaran (CP)
                  </span>
                  <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-200/50">
                    {activeModule.learningObjectives?.map((obj) => (
                      <div key={obj.id} className="flex gap-2 items-start text-[11px] text-slate-600">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{obj.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Prompt Generator Link anchor bottom */}
          <div className="mt-auto border-t border-slate-100 pt-4">
            <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                <BrainCircuit className="w-4 h-4 text-blue-600 animate-pulse" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[9px] font-mono font-bold uppercase text-slate-400 block tracking-widest">INSTRUKTUR AI</span>
                <p className="text-[11px] font-medium text-slate-600 truncate">Gemini 3.5 Active</p>
              </div>
            </div>
          </div>
        </aside>

        {/* CENTER MODULE AREA - Interactive Media Editor Window */}
        <main className="flex-1 bg-slate-100 p-8 flex flex-col overflow-y-auto">
          
          {/* Main Workspace Frame */}
          {isGeneratorActive ? (
            <div className="flex-1 flex items-center justify-center">
              <ModuleGenerator 
                onModuleGenerated={handleModuleGenerated} 
                onCancel={() => setIsGeneratorActive(false)} 
              />
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              
              {/* Slides / Tabs Controller headers */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-4 shrink-0">
                <div className="flex bg-white/70 p-1 rounded-xl border border-slate-200/60 shadow-sm space-x-1">
                  <button
                    onClick={() => setActiveTab("materi")}
                    id="tab-materi-btn"
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      activeTab === "materi" 
                        ? "bg-white text-slate-800 shadow-sm border border-slate-100" 
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" /> Materi Multimedia
                  </button>
                  <button
                    onClick={() => setActiveTab("flashcards")}
                    id="tab-flashcards-btn"
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      activeTab === "flashcards"
                        ? "bg-white text-slate-800 shadow-sm border border-slate-100"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" /> Kartu Pintar (Flashcard)
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("kuis");
                      setSelectedLeft(null);
                      setMatchingError(null);
                    }}
                    id="tab-kuis-btn"
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer/70 relative cursor-pointer ${
                      activeTab === "kuis"
                        ? "bg-white text-slate-800 shadow-sm border border-slate-100"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <BookOpenCheck className="w-3.5 h-3.5" /> Kuis Otomatis
                  </button>
                  <button
                    onClick={() => setActiveTab("simulasi")}
                    id="tab-simulasi-btn"
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      activeTab === "simulasi"
                        ? "bg-white text-slate-800 shadow-sm border border-slate-100"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <PlayCircle className="w-3.5 h-3.5" /> Lab Game Simulasi
                  </button>
                </div>

                <div className="text-[11px] text-slate-400 font-mono tracking-wide italic select-none">
                  Sumbu Responsif: 1920x1080 (16:9 Canvas)
                </div>
              </div>

              {/* Interactive Virtual Canvas Frame exactly styled like Sleek Interface */}
              <div className="flex-1 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative flex flex-col">
                
                {/* Simulated Canvas Browser Ribbon */}
                <div className="h-11 bg-slate-900 flex items-center px-4 justify-between select-none shrink-0">
                  <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-[9px] text-indigo-300 tracking-widest uppercase font-bold text-center">
                    Pratinjau Interaktif Media Pembelajaran
                  </div>
                  <div className="w-10"></div>
                </div>

                {/* --- CANVAS CONTENT TAB 1: MATERI BUKU AJAR MULYIMEDIA --- */}
                {activeTab === "materi" && (
                  <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                    {/* Lesson Section side index navigation list */}
                    <div className="w-full md:w-56 bg-slate-50 border-r border-slate-200/70 p-4 shrink-0 flex flex-col justify-between overflow-y-auto">
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2">
                          Materi Sub-Bagian
                        </span>
                        {activeModule.sections?.map((sec, index) => (
                          <button
                            key={sec.id}
                            onClick={() => setCurrentSectionIndex(index)}
                            className={`w-full text-left p-2.5 rounded-lg text-xs font-bold transition block ${
                              currentSectionIndex === index
                                ? "bg-indigo-600 text-white shadow"
                                : "text-slate-600 hover:bg-slate-200/50"
                            }`}
                          >
                            {sec.title}
                          </button>
                        ))}
                      </div>

                      {/* Lesson guide metadata */}
                      <div className="hidden md:block p-3 bg-indigo-50 border border-indigo-100 rounded-xl mt-6 text-[11px] text-indigo-800 leading-snug">
                        <p className="font-extrabold mb-1">💡 Tips Belajar:</p>
                        Setelah membaca materi di sebelah kanan, silakan uji hafalan cepat Anda menggunakan kartu pintar flashcard di tab atas.
                      </div>
                    </div>

                    {/* Lesson Section view pane */}
                    <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
                      
                      {/* Multimedia Header */}
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                        <div>
                          <span className="text-xs font-mono text-indigo-500 font-bold uppercase tracking-wider">
                            Aspek {currentSectionIndex + 1} dari {activeModule.sections.length}
                          </span>
                          <h2 className="text-xl md:text-2xl font-bold text-slate-800 font-sans tracking-tight leading-tight mt-0.5">
                            {currentSection?.title || "Judul Sub Materi"}
                          </h2>
                        </div>
                        
                        {/* Pagination buttons */}
                        <div className="flex gap-2">
                          <button
                            disabled={currentSectionIndex === 0}
                            onClick={() => setCurrentSectionIndex(prev => prev - 1)}
                            className="p-1.5 border border-slate-200 hover:bg-slate-50 text-slate-600 disabled:opacity-30 rounded-lg transition"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            disabled={currentSectionIndex === activeModule.sections.length - 1}
                            onClick={() => setCurrentSectionIndex(prev => prev + 1)}
                            className="p-1.5 border border-slate-200 hover:bg-slate-50 text-slate-600 disabled:opacity-30 rounded-lg transition"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Main multimedia presentation grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Text component */}
                        <div className="lg:col-span-7 bg-white">
                          <MarkdownRenderer content={currentSection?.content || "Memuat konten materi..."} />
                        </div>

                        {/* Interactive dynamic illustrations sidebar */}
                        <div className="lg:col-span-5 space-y-6">
                          
                          {/* Rich Visual graphic board */}
                          <div className="space-y-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                              Media Grafis Pendukung
                            </span>
                            {getAssetIllustration(currentSection?.title || "")}
                            <p className="text-[10.5px] italic text-slate-500/90 leading-snug bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                              <strong>Saran Gambar AI:</strong> "{currentSection?.illustrationPrompt || "Potret ilustrasi tematik konseptual"}"
                            </p>
                          </div>

                          {/* Mini Flashcard deck contextual container */}
                          {currentSection?.flashcards && currentSection.flashcards.length > 0 && (
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2 font-mono">
                                Hafalan Cepat Sub-Materi (Flashcards)
                              </span>
                              <div className="space-y-2">
                                {currentSection.flashcards.map((fc) => {
                                  const flipped = isFlipped[fc.id];
                                  return (
                                    <div
                                      key={fc.id}
                                      onClick={() => toggleCardFlip(fc.id)}
                                      className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer flex justify-between items-center ${
                                        flipped
                                          ? "bg-slate-900 border-slate-950 text-indigo-300"
                                          : "bg-white border-slate-200 text-slate-700 hover:border-indigo-300"
                                      }`}
                                    >
                                      <div className="text-xs">
                                        <span className="font-bold block text-[9px] uppercase tracking-wider text-indigo-500 mb-0.5">
                                          {flipped ? "Jawaban / Arti" : "Istilah Kunci"}
                                        </span>
                                        <p className="font-semibold leading-relaxed">
                                          {flipped ? fc.back : fc.front}
                                        </p>
                                      </div>
                                      <span className="text-[9px] font-mono font-bold text-indigo-500 uppercase px-2 py-0.5 bg-indigo-50 rounded select-none shrink-0 border border-indigo-100 animate-pulse">
                                        {flipped ? "Balik" : "Bukak"}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* --- CANVAS CONTENT TAB 2: FLASHCARDS INTERAKTIF UTAMA --- */}
                {activeTab === "flashcards" && (
                  <div className="flex-1 p-6 md:p-12 bg-slate-950 text-white flex flex-col items-center justify-center overflow-y-auto space-y-8 select-none">
                    <div className="text-center max-w-md">
                      <h3 className="text-2xl font-bold text-white tracking-tight">Akademi Kartu Hafalan</h3>
                      <p className="text-xs text-slate-400 mt-2">
                        Klik pada kartu pengingat di bawah ini untuk membalikkan posisi depan-belakang, melatih daya pemahaman sinapsis secara offline.
                      </p>
                    </div>

                    {/* Large Grid of All Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
                      {activeModule.sections?.flatMap(s => s.flashcards || []).map((fc, index) => {
                        const flipped = isFlipped[fc.id];
                        return (
                          <div
                            key={fc.id}
                            onClick={() => toggleCardFlip(fc.id)}
                            className="perspective-1000 h-40 cursor-pointer transform hover:scale-103 transition duration-300"
                          >
                            <div className={`relative w-full h-full text-center transition-transform duration-500 preserve-3d ${
                              flipped ? "rotate-y-180" : ""
                            }`}>
                              
                              {/* Card Front Side */}
                              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-indigo-950 border border-indigo-500/40 rounded-2xl p-6 flex flex-col justify-between backface-hidden shadow-lg">
                                <div className="text-[10px] font-mono tracking-widest text-indigo-300 font-bold uppercase flex justify-between">
                                  <span>KARTU MEMORI</span>
                                  <span>#{index + 1}</span>
                                </div>
                                <p className="text-sm font-extrabold tracking-wide text-white leading-relaxed my-auto">
                                  {fc.front}
                                </p>
                                <div className="text-[10px] font-mono text-indigo-400">
                                  Klik untuk Membalik
                                </div>
                              </div>

                              {/* Card Back Side */}
                              <div className="absolute inset-0 bg-slate-900 border border-slate-700 rounded-2xl p-6 flex flex-col justify-between backface-hidden rotate-y-180 shadow-inner">
                                <div className="text-[10px] font-mono tracking-widest text-emerald-400 font-bold uppercase">
                                  PENJELASAN SAINS
                                </div>
                                <p className="text-xs text-slate-250 leading-relaxed font-semibold my-auto">
                                  {fc.back}
                                </p>
                                <div className="text-[10px] text-slate-400 font-mono">
                                  Klik untuk Mengulang
                                </div>
                              </div>

                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => {
                        // Reset flips
                        setIsFlipped({});
                      }}
                      className="px-5 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold tracking-wider transition inline-flex items-center gap-1.5 border border-white/10"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Set Ulang Seluruh Kartu
                    </button>
                  </div>
                )}

                {/* --- CANVAS CONTENT TAB 3: ASESMEN KUIS OTOMATIS --- */}
                {activeTab === "kuis" && (
                  <div className="flex-1 p-6 md:p-10 overflow-y-auto flex flex-col justify-between">
                    
                    {quizSubmitted ? (
                      /* Quiz score success screen layout */
                      <div className="flex-1 flex flex-col items-center justify-center text-center py-8 space-y-6">
                        <div className="relative">
                          <div className="absolute inset-0 bg-indigo-500 rounded-full blur-2xl opacity-10 animate-pulse"></div>
                          <div className="relative bg-indigo-50 border border-indigo-200/50 p-6 rounded-full w-24 h-24 flex items-center justify-center shadow">
                            <Trophy className="w-12 h-12 text-indigo-600 animate-bounce" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Kuis Selesai!</h3>
                          <p className="text-sm text-slate-500 max-w-md mx-auto">
                            Evaluasi instan telah diproses. Berikut ringkasan keberhasilan Anda dalam memahami materi secara komprehensif.
                          </p>
                        </div>

                        {/* Interactive Scoreboard metric */}
                        <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl w-full max-w-sm grid grid-cols-2 gap-4">
                          <div className="text-center border-r border-slate-200">
                            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Benar / Soal</span>
                            <p className="text-3xl font-extrabold text-slate-800 font-mono mt-1">
                              {quizScore} <span className="text-slate-400 text-lg">/ {activeModule.quiz.length}</span>
                            </p>
                          </div>
                          <div className="text-center">
                            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Persentase</span>
                            <p className="text-3xl font-extrabold text-indigo-600 font-mono mt-1">
                              {Math.round((quizScore / activeModule.quiz.length) * 100)}%
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3 justify-center">
                          <button
                            onClick={resetQuizStates}
                            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition shadow-sm cursor-pointer"
                          >
                            Coba Kuis Lagi
                          </button>
                          <button
                            onClick={() => setActiveTab("materi")}
                            className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold rounded-xl transition cursor-pointer"
                          >
                            Kembali ke Modul Teks
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Active Question Engine Layout */
                      <div className="flex-1 flex flex-col justify-between space-y-6">
                        
                        {/* Upper Progress tracker bar */}
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-800">
                              Pertanyaan {currentQuizIndex + 1} dari {activeModule.quiz.length}
                            </span>
                            <span className="text-[10px] bg-slate-100 px-2.5 py-0.5 rounded-full text-indigo-600 font-semibold uppercase tracking-wider">
                              {activeModule.quiz[currentQuizIndex]?.type}
                            </span>
                          </div>
                          
                          {/* Quick question dots navigator */}
                          <div className="flex gap-1">
                            {activeModule.quiz.map((q, idx) => (
                              <button
                                key={q.id}
                                onClick={() => setCurrentQuizIndex(idx)}
                                className={`w-2.5 h-2.5 rounded-full transition ${
                                  currentQuizIndex === idx 
                                    ? "bg-indigo-600" 
                                    : answeredMap[q.id] || (q.type === "matching" && Object.keys(matchedPairs).length > 0)
                                      ? "bg-slate-400" 
                                      : "bg-slate-200 hover:bg-slate-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Middle Slide Block: Quiz details depending on type */}
                        {(() => {
                          const q = activeModule.quiz[currentQuizIndex];
                          if (!q) return <p className="text-slate-400 text-xs">Error loading question.</p>;

                          return (
                            <div className="space-y-6 flex-1 flex flex-col justify-center">
                              
                              {/* Question Heading Statement */}
                              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/50">
                                <h4 className="text-base md:text-lg font-bold text-slate-800 leading-snug">
                                  {q.question}
                                </h4>
                              </div>

                              {/* MCQ Options representation */}
                              {q.type === "multiple-choice" && q.options && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {q.options.map((option) => {
                                    const letter = option.charAt(0); // A, B, C or D
                                    const isSelected = answeredMap[q.id] === letter;
                                    return (
                                      <button
                                        key={option}
                                        onClick={() => handleSelectQuizOption(q.id, letter)}
                                        className={`w-full text-left p-4 rounded-xl border text-sm font-semibold transition cursor-pointer ${
                                          isSelected
                                            ? "bg-indigo-600 border-indigo-700 text-white shadow-md shadow-indigo-100"
                                            : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                                        }`}
                                      >
                                        {option}
                                      </button>
                                    );
                                  })}
                                </div>
                              )}

                              {/* True / False Selection */}
                              {q.type === "true-false" && (
                                <div className="flex gap-4 max-w-md mx-auto w-full pt-4">
                                  <button
                                    onClick={() => handleSelectTrueFalse(q.id, "Benar")}
                                    className={`flex-1 py-4 rounded-xl border text-base font-bold transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                                      answeredMap[q.id] === "Benar"
                                        ? "bg-emerald-600 border-emerald-700 text-white shadow-lg shadow-emerald-150"
                                        : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                                    }`}
                                  >
                                    <span>Benar</span>
                                    <span className="text-[10px] font-normal opacity-85">Pernyataan valid ilmiah</span>
                                  </button>
                                  <button
                                    onClick={() => handleSelectTrueFalse(q.id, "Salah")}
                                    className={`flex-1 py-4 rounded-xl border text-base font-bold transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                                      answeredMap[q.id] === "Salah"
                                        ? "bg-rose-600 border-rose-700 text-white shadow-lg shadow-rose-150"
                                        : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                                    }`}
                                  >
                                    <span>Salah</span>
                                    <span className="text-[10px] font-normal opacity-85">Pernyataan keliru</span>
                                  </button>
                                </div>
                              )}

                              {/* --- MATCHING GAME INTERACTIVE INTERNET COMPONENT --- */}
                              {q.type === "matching" && q.matchingPairs && (
                                <div className="space-y-4">
                                  <p className="text-xs text-slate-500 italic">
                                    Cara Bermain: Klik satu kartu di sebelah **Kiri (Subjek)**, lalu pasangkan dengan mengklik kartu yang dirasa cocok di sebelah **Kanan (Keterangan)**.
                                  </p>

                                  {/* Error tracking prompt matcher */}
                                  {matchingError && (
                                    <p className="text-xs text-rose-500 font-semibold bg-rose-50 p-2 border border-rose-200 rounded-lg">
                                      {matchingError}
                                    </p>
                                  )}

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                    
                                    {/* Left Column (Entities to Pair) */}
                                    <div className="space-y-2">
                                      <span className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wider">ENTITAS KIRI (SUBJEK)</span>
                                      {q.matchingPairs.map((pair) => {
                                        const isCompleted = matchedPairs[pair.left] !== undefined;
                                        const isCurrentSelected = selectedLeft === pair.left;

                                        return (
                                          <button
                                            key={pair.left}
                                            disabled={isCompleted}
                                            onClick={() => handleItemClickMatchingLeft(pair.left)}
                                            className={`w-full text-left p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition cursor-pointer select-none ${
                                              isCompleted
                                                ? "bg-emerald-50 border-emerald-200 text-emerald-800 disabled:opacity-80"
                                                : isCurrentSelected
                                                  ? "bg-indigo-600 border-indigo-700 text-white"
                                                  : "bg-slate-50 border-slate-200 hover:bg-indigo-50/40 text-slate-700"
                                            }`}
                                          >
                                            <span>{pair.left}</span>
                                            {isCompleted ? (
                                              <span className="text-[9px] uppercase font-mono font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">Berpasangan ✅</span>
                                            ) : isCurrentSelected ? (
                                              <span className="text-[9px] tracking-wide animate-pulse">Menunggu Pasangan...</span>
                                            ) : (
                                              <span className="text-[9px] text-slate-400">Pilih</span>
                                            )}
                                          </button>
                                        );
                                      })}
                                    </div>

                                    {/* Right Column (Definitions / Values) */}
                                    <div className="space-y-2">
                                      <span className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wider">ENTITAS KANAN (ASOSIASI)</span>
                                      {/* Present rights dynamically or naturally sorted, checking matched records */}
                                      {q.matchingPairs.map((pair) => {
                                        // Check if this right item is already matched to ANY left item
                                        const isAlreadyMatched = Object.values(matchedPairs).includes(pair.right);

                                        return (
                                          <button
                                            key={pair.right}
                                            disabled={isAlreadyMatched || !selectedLeft}
                                            onClick={() => handleItemClickMatchingRight(pair.right, q)}
                                            className={`w-full text-left p-3 rounded-xl border text-xs font-semibold transition select-none ${
                                              isAlreadyMatched
                                                ? "bg-emerald-50 border-emerald-100 text-slate-400 opacity-60"
                                                : selectedLeft
                                                  ? "border-indigo-400 bg-indigo-50/20 hover:bg-indigo-50 hover:border-indigo-500 text-indigo-950 cursor-pointer"
                                                  : "border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
                                            }`}
                                          >
                                            {pair.right}
                                          </button>
                                        );
                                      })}
                                    </div>

                                  </div>
                                </div>
                              )}

                            </div>
                          );
                        })()}

                        {/* Lower navigation pane inside quiz view */}
                        <div className="border-t border-slate-100 pt-4 flex justify-between items-center bg-white">
                          <button
                            disabled={currentQuizIndex === 0}
                            onClick={() => {
                              setCurrentQuizIndex(prev => prev - 1);
                              setMatchingError(null);
                            }}
                            className="px-4 py-2 border border-slate-200 text-slate-600 disabled:opacity-30 rounded-xl text-xs font-bold tracking-wide transition flex items-center gap-1 cursor-pointer"
                          >
                            <ChevronLeft className="w-4 h-4" /> Sebelumnya
                          </button>

                          {currentQuizIndex < activeModule.quiz.length - 1 ? (
                            <button
                              onClick={() => {
                                setCurrentQuizIndex(prev => prev + 1);
                                setMatchingError(null);
                              }}
                              className="px-4 py-2 bg-slate-100 hover:bg-slate-200/80 text-slate-700 rounded-xl text-xs font-bold tracking-wide transition flex items-center gap-1 cursor-pointer"
                            >
                              Pertanyaan Berikut <ChevronRight className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={handleSubmitQuiz}
                              id="btn-submit-active-quiz"
                              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold tracking-wider transition shadow-sm cursor-pointer"
                            >
                              Kirim Seluruh Jawaban
                            </button>
                          )}
                        </div>

                      </div>
                    )}

                  </div>
                )}

                {/* --- CANVAS CONTENT TAB 4: SIMULASI GAME WIDGET PLAYER --- */}
                {activeTab === "simulasi" && (
                  <div className="flex-1 p-6 md:p-8 overflow-y-auto flex flex-col justify-center bg-slate-900">
                    <div className="max-w-xl mx-auto w-full">
                      {activeModule.widget ? (
                        <InteractiveWidgetPlayer widget={activeModule.widget} />
                      ) : (
                        <div className="text-center py-10 text-slate-400 text-sm">
                          Simulasi interaktif tidak terkonseptualisasi untuk modul ini. Silakan buat modul baru via AI instan.
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

        </main>

        {/* RIGHT BAR: Multimedia Asset Library, JSON Compiler & system capacity */}
        <aside className="w-80 bg-white border-l border-slate-200 flex flex-col overflow-hidden shrink-0 select-none">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between shrink-0">
            <h3 className="text-xs font-extrabold tracking-wider text-slate-800 uppercase flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-500" />
              Perpustakaan Media
            </h3>
            <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-bold font-mono">
              3 Item Terpakai
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            
            {/* Direct metadata compiler downloader */}
            <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl space-y-2">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Simpan Paket Modul</span>
              <p className="text-[11px] text-slate-500 leading-normal">
                Kompilasi seluruh materi teks, flashcard, kode kuis otomatis, serta simulator dalam satu berkas terarsip.
              </p>
              <button
                onClick={downloadModuleJson}
                id="right-download-json-btn"
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-[11px] text-white font-bold rounded-lg transition inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Download className="w-3.5 h-3.5" /> Unduh Pembelajaran (.JSON)
              </button>
            </div>

            {/* Generated visual resources listing based on prompts */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block font-mono">
                Asset Visual & Video AI
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                
                {/* Visual item 1 mock */}
                <div className="p-3 border border-slate-100 rounded-xl hover:border-slate-200 transition flex items-center gap-3 bg-slate-50/60 select-auto">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center shrink-0 border border-orange-200 text-orange-600">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-mono text-orange-600 block leading-none font-bold uppercase mb-0.5">FOTO INFOGRAFIS</span>
                    <p className="text-xs font-bold text-slate-700 truncate leading-tight">Diagram_Vektor_{activeModule?.id}.png</p>
                    <span className="text-[9px] text-slate-400 font-mono">Generative Art • 1.2 MB</span>
                  </div>
                </div>

                {/* Visual item 2 mock */}
                <div className="p-3 border border-slate-100 rounded-xl hover:border-slate-200 transition flex items-center gap-3 bg-slate-50/60 select-auto">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 border border-blue-200 text-blue-600">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-mono text-blue-600 block leading-none font-bold uppercase mb-0.5">KOMPARASI FISIK</span>
                    <p className="text-xs font-bold text-slate-700 truncate leading-tight">Metode_Analog_{activeModule?.id}.jpg</p>
                    <span className="text-[9px] text-slate-400 font-mono">Skeletal Render • 840 KB</span>
                  </div>
                </div>

                {/* Visual item 3 mock  */}
                <div className="p-3 border border-slate-100 rounded-xl hover:border-slate-200 transition flex items-center gap-3 bg-slate-50/60 select-auto">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0 border border-indigo-200 text-indigo-600">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-mono text-indigo-600 block leading-none font-bold uppercase mb-0.5">NARASI MATERI</span>
                    <p className="text-xs font-bold text-slate-700 truncate leading-tight">TTS_Suara_Pengantar.mp3</p>
                    <span className="text-[9px] text-slate-400 font-mono">Narasi AI • 2.6 MB</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Simulated Quiz review scoreboard summary */}
            {activeTab === "kuis" && (
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl space-y-1">
                <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-widest font-mono">Asisten Evaluator</span>
                <p className="text-[11px] text-emerald-800 leading-relaxed font-semibold">
                  Materi ini dilengkapi dengan asesmen otomatis. Silakan klik semua pertanyaan dan akhiri tes untuk meregistrasikan nilai Anda ke sistem dacir rapor digital.
                </p>
              </div>
            )}

          </div>

          {/* Cloud capacity and metrics exactly matching Sleek Interface theme */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 shrink-0 select-none">
            <div className="text-xs text-slate-600 font-bold flex justify-between">
              <span>Penyimpanan Workspace</span>
              <span className="font-mono text-indigo-600">85% Terpakai</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2">
              <div className="w-[85%] h-full bg-indigo-500 rounded-full transition-all"></div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
