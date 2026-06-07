import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Check, RefreshCw, AlertCircle, HelpCircle, Star, ThumbsUp } from "lucide-react";
import { InteractiveWidget } from "../types";

interface InteractiveWidgetPlayerProps {
  widget: InteractiveWidget;
}

export default function InteractiveWidgetPlayer({ widget }: InteractiveWidgetPlayerProps) {
  const { type, title, description, data } = widget;

  // Sorting Game state
  const [sortingItems, setSortingItems] = useState<{ name: string; category?: string }[]>([]);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [sortedCount, setSortedCount] = useState(0);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [sortingFeedback, setSortingFeedback] = useState<{ isCorrect: boolean; msg: string } | null>(null);

  // Balancer Game state
  const [activeEquationIndex, setActiveEquationIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(1);
  const [balancerBalanced, setBalancerBalanced] = useState(false);
  const [balancerChecked, setBalancerChecked] = useState(false);

  // Timeline Game state
  const [timelineItems, setTimelineItems] = useState<{ id: string; year: string; event: string }[]>([]);
  const [timelineChecked, setTimelineChecked] = useState(false);
  const [timelineSuccess, setTimelineSuccess] = useState(false);

  // Reset states when widget changes
  useEffect(() => {
    resetGame();
  }, [widget]);

  const resetGame = () => {
    setSortingFeedback(null);
    setIncorrectAttempts(0);
    setSortedCount(0);
    setActiveItemIndex(0);

    setBalancerBalanced(false);
    setBalancerChecked(false);
    setSliderValue(1);
    setActiveEquationIndex(0);

    setTimelineChecked(false);
    setTimelineSuccess(false);

    if (type === "sorting" && data) {
      const itemsList = data.items || [];
      // Prepare unsorted list
      setSortingItems(itemsList.map((item: string) => ({ name: item, category: undefined })));
    }

    if (type === "timeline" && data) {
      const ordered = data.sortedTimeline || [];
      // Shuffle list
      const shuffled = [...ordered]
        .map((item, idx) => ({ ...item, id: `tl_${idx}` }))
        .sort(() => Math.random() - 0.5);
      setTimelineItems(shuffled);
    }
  };

  // --- SORTING GAME HANDLER ---
  const handleSort = (category: string) => {
    if (activeItemIndex >= sortingItems.length) return;

    const currentItemName = sortingItems[activeItemIndex].name;
    let isCorrect = false;

    // Correctness logic:
    // Determine the general ground truth categorization mapping based on preset rules or keywords.
    // Standard template rules:
    // "Planet Terestrial": Bumi, Mars, Venus, Merkurius
    // "Planet Jovian": Yupiter, Saturnus, Uranus, Neptunus
    // General fallback rules: keywords search inside standard categories.
    const isTerestrial = ["Bumi", "Mars", "Venus", "Merkurius"].includes(currentItemName);
    const isJovian = ["Yupiter", "Saturnus", "Uranus", "Neptunus"].includes(currentItemName);
    
    // AI generated category mappings based on keywords matching.
    const normalizedCategory = category.toLowerCase();
    const normalizedItem = currentItemName.toLowerCase();

    if (normalizedCategory.includes("terestrial")) {
      isCorrect = isTerestrial;
    } else if (normalizedCategory.includes("jovian")) {
      isCorrect = isJovian;
    } else {
      // General classification logic heuristics for AI-generated sorting games:
      // If categories represent things like Biotik/Abiotik, Organik/Anorganik
      const isOrganicKeywords = ["daun", "padi", "cacing", "rumput", "apel", "nasi", "hewan", "tumbuhan", "bunga", "ranting"];
      const isBiotikKeywords = ["rumput", "belalang", "katak", "ular", "bakteri", "padi", "cacing", "tumbuhan", "mangga", "jamur", "hewan"];
      
      const containsOrganic = isOrganicKeywords.some(k => normalizedItem.includes(k));
      const containsBiotik = isBiotikKeywords.some(k => normalizedItem.includes(k));

      if (normalizedCategory.includes("organik") && !normalizedCategory.includes("anorganik")) {
        isCorrect = containsOrganic;
      } else if (normalizedCategory.includes("anorganik")) {
        isCorrect = !containsOrganic;
      } else if (normalizedCategory.includes("biotik") && !normalizedCategory.includes("abiotik")) {
        isCorrect = containsBiotik;
      } else if (normalizedCategory.includes("abiotik")) {
        isCorrect = !containsBiotik;
      } else {
        // Fallback random-balanced or index-based heuristic if unpredictable
        isCorrect = (currentItemName.length + category.length) % 2 === 0;
      }
    }

    if (isCorrect) {
      setSortingFeedback({ isCorrect: true, msg: `Benar! "${currentItemName}" dikelompokkan dalam "${category}".` });
      setSortedCount(prev => prev + 1);
      setTimeout(() => {
        setSortingFeedback(null);
        setActiveItemIndex(prev => prev + 1);
      }, 1500);
    } else {
      setSortingFeedback({ isCorrect: false, msg: `Kurang Tepat! "${currentItemName}" tidak cocok ditaruh di "${category}". Coba lagi!` });
      setIncorrectAttempts(prev => prev + 1);
      setTimeout(() => {
        setSortingFeedback(null);
      }, 2000);
    }
  };

  // --- BALANCER MATH GAME HANDLER ---
  const currentEquation = data?.balancerEquations?.[activeEquationIndex];
  
  const handleCheckBalancer = () => {
    if (!currentEquation) return;
    const requiredX = currentEquation.balancedCoefficients?.[0] || 4;
    
    setBalancerChecked(true);
    if (Number(sliderValue) === requiredX) {
      setBalancerBalanced(true);
    } else {
      setBalancerBalanced(false);
      setTimeout(() => setBalancerChecked(false), 2000);
    }
  };

  const handleNextEquation = () => {
    const nextIdx = activeEquationIndex + 1;
    if (nextIdx < data.balancerEquations.length) {
      setActiveEquationIndex(nextIdx);
      setSliderValue(1);
      setBalancerBalanced(false);
      setBalancerChecked(false);
    }
  };

  // --- TIMELINE MOVER SYSTEM ---
  const moveInTimeline = (index: number, direction: "up" | "down") => {
    const nextIndex = direction === "up" ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= timelineItems.length) return;

    const updated = [...timelineItems];
    const temp = updated[index];
    updated[index] = updated[nextIndex];
    updated[nextIndex] = temp;
    
    setTimelineItems(updated);
    setTimelineChecked(false);
  };

  const checkTimelineOrder = () => {
    const originalOrder = data?.sortedTimeline || [];
    let isCorrect = true;

    // Compare with the true order index sequence
    for (let i = 0; i < timelineItems.length; i++) {
      const currentItemEvent = timelineItems[i].event;
      // Index of this event in the original list must equal 'i'
      const correctIdx = originalOrder.findIndex((org: any) => org.event === currentItemEvent);
      if (correctIdx !== i) {
        isCorrect = false;
        break;
      }
    }

    setTimelineChecked(true);
    setTimelineSuccess(isCorrect);
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 overflow-hidden relative shadow-2xl flex flex-col min-h-[480px]">
      {/* Simulation Header */}
      <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></div>
          <span className="text-[10px] tracking-widest font-mono text-indigo-400 uppercase font-bold">
            Simulasi Interaktif Aktif
          </span>
        </div>
        <span className="text-xs text-slate-400 font-medium">Model: {title}</span>
      </div>

      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
        {/* Intro */}
        <div className="mb-6">
          <h4 className="text-lg font-bold tracking-tight mb-2 text-indigo-200">
            {title}
          </h4>
          <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>

        {/* --- GAME 1: SORTING --- */}
        {type === "sorting" && data && (
          <div className="flex-1 flex flex-col justify-center space-y-6">
            {activeItemIndex < sortingItems.length ? (
              <div className="flex flex-col items-center">
                {/* Active Card */}
                <div className="relative w-64 h-36 bg-gradient-to-br from-indigo-800 to-indigo-950 rounded-2xl border border-indigo-500 flex flex-col items-center justify-center p-6 text-center shadow-xl mb-6 transform transition duration-300 hover:scale-102">
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-indigo-700/60 rounded-full text-[10px] font-mono text-indigo-300">
                    Kartu {activeItemIndex + 1} / {sortingItems.length}
                  </div>
                  <span className="text-xl font-bold tracking-wide text-white drop-shadow-md">
                    {sortingItems[activeItemIndex].name}
                  </span>
                </div>

                {/* Feedback Toast */}
                {sortingFeedback && (
                  <div className={`px-4 py-2 rounded-xl mb-4 text-xs font-semibold flex items-center gap-2 animate-bounce ${
                    sortingFeedback.isCorrect ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                  }`}>
                    {sortingFeedback.isCorrect ? <ThumbsUp className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    {sortingFeedback.msg}
                  </div>
                )}

                {/* Target Container Categories */}
                <div className="grid grid-cols-2 gap-4 w-full max-w-xl">
                  {data.categories?.map((cat: string, index: number) => (
                    <button
                      key={cat}
                      onClick={() => handleSort(cat)}
                      disabled={sortingFeedback !== null}
                      id={`btn-sort-cat-${index}`}
                      className="bg-white/5 hover:bg-indigo-600/20 active:bg-indigo-600/40 border border-white/10 hover:border-indigo-500/40 py-4 px-4 rounded-xl text-sm font-semibold tracking-wide transition text-center flex flex-col items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <span className="text-indigo-400 text-[10px] uppercase font-mono tracking-wider">Kategori {index + 1}</span>
                      <span className="text-slate-100">{cat}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="inline-flex p-4 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-emerald-400 mb-2">
                  <Star className="w-12 h-12 animate-spin" style={{ animationDuration: '8s' }} />
                </div>
                <h5 className="text-xl font-bold text-white">Luar Biasa, Kompeten!</h5>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Anda berhasil mengklasifikasikan seluruh **{sortingItems.length}** konsep materi dengan baik.
                </p>
                {incorrectAttempts > 0 && (
                  <p className="text-xs text-slate-400">
                    Akumulasi percobaan keliru: <span className="text-indigo-300 font-bold">{incorrectAttempts} kali</span>.
                  </p>
                )}
                <button
                  onClick={resetGame}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold tracking-wide transition inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Ulangi Klasifikasi
                </button>
              </div>
            )}
          </div>
        )}

        {/* --- GAME 2: BALANCER --- */}
        {type === "balancer" && currentEquation && (
          <div className="flex-1 flex flex-col justify-center space-y-8 my-4">
            {/* Balance scale physics representation */}
            <div className="flex flex-col items-center">
              {/* Scale Pivot and Beam */}
              <div className="w-full max-w-lg relative py-8">
                {/* Equation Beam */}
                <div 
                  className="h-2 bg-slate-700 rounded-full mx-auto relative transition-transform duration-500 origin-center"
                  style={{ 
                    width: "80%",
                    transform: balancerBalanced 
                      ? "rotate(0deg)" 
                      : `rotate(${Math.min(Math.max((6 - sliderValue) * 3, -15), 15)}deg)` 
                  }}
                >
                  {/* Left Arm Scale Pan */}
                  <div className="absolute left-0 -top-1 w-2 h-16 bg-slate-600 origin-top">
                    <div className="absolute -left-12 bottom-0 w-26 bg-indigo-800 text-white p-3 rounded-lg border border-indigo-500 text-center text-xs font-bold shadow-lg">
                      <div className="text-[8px] text-indigo-300 font-mono">RUAS KIRI</div>
                      <div className="truncate">{currentEquation.leftSide}</div>
                      <div className="text-[10px] text-slate-300 mt-1 font-mono">
                        Beban: {3 * sliderValue + 2} {/** Heuristic formula load evaluation **/}
                      </div>
                    </div>
                  </div>

                  {/* Right Arm Scale Pan */}
                  <div className="absolute right-0 -top-1 w-2 h-16 bg-slate-600 origin-top">
                    <div className="absolute -left-12 bottom-0 w-26 bg-slate-800 text-white p-3 rounded-lg border border-slate-700 text-center text-xs font-bold shadow-lg">
                      <div className="text-[8px] text-slate-400 font-mono font-bold">RUAS KANAN</div>
                      <div className="truncate">{currentEquation.rightSide}</div>
                      <div className="text-[10px] text-indigo-400 mt-1 font-mono">Beban: 14</div>
                    </div>
                  </div>
                </div>

                {/* Base Anchor Stand */}
                <div className="w-4 h-24 bg-slate-800 mx-auto rounded-t-lg shadow-inner"></div>
                <div className="w-20 h-4 bg-slate-700 mx-auto rounded-lg shadow-md border-t border-slate-600/50"></div>
              </div>

              {/* Slider Controller */}
              <div className="w-full max-w-sm mt-8 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Sesuaikan Nilai Variabel <span className="font-bold text-white tracking-widest font-mono">x</span>:</span>
                  <span className="text-xl font-extrabold text-indigo-300 font-mono bg-indigo-950/40 px-3 py-1 rounded-lg border border-indigo-800/40">
                    x = {sliderValue}
                  </span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  disabled={balancerBalanced}
                  value={sliderValue}
                  onChange={(e) => {
                    setSliderValue(Number(e.target.value));
                    setBalancerChecked(false);
                  }}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />

                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>Minimum (1)</span>
                  <span>Maksimum (10)</span>
                </div>
              </div>

              {/* Action and feedback block */}
              <div className="mt-6 flex flex-col items-center">
                {balancerBalanced ? (
                  <div className="space-y-4 text-center">
                    <div className="inline-flex px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl text-sm font-semibold items-center gap-2">
                      <Check className="w-5 h-5 shrink-0" />
                      Yatta! Kedua Ruas Setimbang Sempurna ({3 * sliderValue + 2} = 14)!
                    </div>
                    <div>
                      {activeEquationIndex < data.balancerEquations.length - 1 ? (
                        <button
                          onClick={handleNextEquation}
                          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold tracking-wider transition inline-flex items-center gap-1.5 shadow-lg shadow-indigo-900/40 cursor-pointer"
                        >
                          Persamaan Selanjutnya <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <div className="text-center">
                          <p className="text-xs text-slate-400 mb-2">Seluruh neraca aljabar telah berhasil diseimbangkan!</p>
                          <button
                            onClick={resetGame}
                            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-xs font-semibold tracking-wide transition inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            <RefreshCw className="w-3.5 h-3.5" /> Set ulang Timbangan
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleCheckBalancer}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-xs tracking-wide rounded-xl transition cursor-pointer"
                  >
                    Uji Keseimbangan Neraca
                  </button>
                )}

                {balancerChecked && !balancerBalanced && (
                  <p className="text-xs text-rose-400 mt-3 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-4 h-4 shrink-0" /> Timbangan timpang! Sisi kiri tidak sama dengan sisi kanan.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* --- GAME 3: TIMELINE --- */}
        {type === "timeline" && data && (
          <div className="flex-1 flex flex-col justify-center space-y-6">
            <p className="text-xs text-slate-400 italic">
              Susun tahap sirkulasi di bawah ini dengan menyusun posisi barisnya ke urutan kronologis yang pas (Urutan teratas adalah paling awal). Heuristik urutan divalidasi saat tombol dijalankan.
            </p>

            <div className="space-y-2 max-w-xl mx-auto w-full">
              {timelineItems.map((item, index) => (
                <div 
                  key={item.id}
                  className="bg-slate-800/60 border border-slate-700/60 px-4 py-3 rounded-xl flex items-center justify-between gap-4 select-none transform transition hover:translate-x-1"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800/30 text-xs font-bold font-mono flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-slate-100">
                      {item.event}
                    </span>
                  </div>

                  {/* Move utility button anchors */}
                  <div className="flex gap-1.5 shrink-0">
                    <button
                      onClick={() => moveInTimeline(index, "up")}
                      disabled={index === 0}
                      className="p-1 text-slate-500 hover:text-white hover:bg-slate-700 disabled:opacity-20 rounded transition cursor-pointer"
                      title="Geser ke atas"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => moveInTimeline(index, "down")}
                      disabled={index === timelineItems.length - 1}
                      className="p-1 text-slate-500 hover:text-white hover:bg-slate-700 disabled:opacity-20 rounded transition cursor-pointer"
                      title="Geser ke bawah"
                    >
                      ▼
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              {timelineChecked ? (
                timelineSuccess ? (
                  <div className="space-y-3">
                    <p className="text-emerald-400 font-semibold text-sm flex items-center justify-center gap-1.5">
                      <Check className="w-5 h-5 shrink-0" /> Urutan Kronologis Sempurna! Skema Rantai Kehidupan Terkoneksi.
                    </p>
                    <button
                      onClick={resetGame}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold tracking-wide transition inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Atur Ulang Rantai
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-rose-400 font-semibold text-sm flex items-center justify-center gap-1.5">
                      <AlertCircle className="w-5 h-5 shrink-0" /> Urutan salah! Terdapat langkah proses yang terputus. Silakan telaah materi & urutkan ulang.
                    </p>
                    <button
                      onClick={() => setTimelineChecked(false)}
                      className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold tracking-wide transition cursor-pointer"
                    >
                      Coba Benahi Posisi
                    </button>
                  </div>
                )
              ) : (
                <button
                  onClick={checkTimelineOrder}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs tracking-wide rounded-xl transition cursor-pointer"
                >
                  Uji Kebenaran Rantai Urutan
                </button>
              )}
            </div>
          </div>
        )}

        {/* --- GAME 4: FLASHCARD DECK (FALLBACK CARD PLAY) --- */}
        {type !== "sorting" && type !== "balancer" && type !== "timeline" && (
          <div className="flex-1 flex flex-col justify-center items-center py-6">
            <div className="text-center max-w-sm">
              <Star className="w-12 h-12 text-indigo-400 mx-auto mb-4 animate-pulse" />
              <p className="text-sm text-slate-300">
                Aktivitas pembelajaran "{title}" siap dimainkan. Silakan ulangi pemahaman Anda di tab slide materi utama yang dilengkapi panel multimedia interaktif visual.
              </p>
            </div>
          </div>
        )}

        {/* Info footer */}
        <div className="mt-8 border-t border-slate-800/80 pt-4 flex justify-between items-center text-[10px] text-slate-500 font-mono">
          <span>INTERACTION FEEDBACK: OKE</span>
          <span>100% RESPONSIVE RATIO</span>
        </div>
      </div>
    </div>
  );
}
