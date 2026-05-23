import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gamepad2, Check, X, RotateCcw, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Fill in the blanks game
const fillBlankQuestions = [
  { sentence: 'She _____ (work) as a content manager at Menarini.', answer: 'works', options: ['work', 'works', 'working', 'worked'] },
  { sentence: 'We _____ (launch) the new campaign last week.', answer: 'launched', options: ['launch', 'launches', 'launched', 'launching'] },
  { sentence: 'They _____ (optimize) the SEO strategy next month.', answer: 'will optimize', options: 'will optimize', hint: 'Use will + verb' },
  { sentence: 'If I _____ (be) the manager, I would hire more designers.', answer: 'were', options: ['was', 'were', 'am', 'be'] },
  { sentence: 'The team _____ (meet) every Monday at 9 AM.', answer: 'meets', options: ['meet', 'meets', 'meeting', 'met'] },
];

// Word matching game
const wordPairs = [
  { en: 'Backlink', es: 'Enlace entrante' },
  { en: 'Bounce Rate', es: 'Tasa de rebote' },
  { en: 'Conversion', es: 'Conversión' },
  { en: 'Landing Page', es: 'Página de destino' },
  { en: 'Keyword', es: 'Palabra clave' },
  { en: 'Analytics', es: 'Analítica' },
  { en: 'Campaign', es: 'Campaña' },
  { en: 'Strategy', es: 'Estrategia' },
];

type GameType = 'blanks' | 'match';

export default function GamesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [gameType, setGameType] = useState<GameType>('blanks');
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState<'correct' | 'incorrect' | null>(null);

  // Matching game state
  const [selectedEn, setSelectedEn] = useState<string | null>(null);
  const [selectedEs, setSelectedEs] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [matchAttempts, setMatchAttempts] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;
    const headline = headlineRef.current;
    const caption = captionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    if (!section || !label || !headline || !caption || !image || !content) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0%-30%): image from bottom
      scrollTl.fromTo(image, { y: '60vh', opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, ease: 'none' }, 0);
      scrollTl.fromTo(headline, { y: '-18vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0);
      scrollTl.fromTo(caption, { y: '10vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.05);
      scrollTl.fromTo(label, { opacity: 0 }, { opacity: 1, ease: 'none' }, 0.1);
      scrollTl.fromTo(content, { x: '-25vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.1);

      // EXIT (70%-100%)
      scrollTl.fromTo(image, { y: 0, opacity: 1 }, { y: '-26vh', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(headline, { y: 0, opacity: 1 }, { y: '-12vh', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(caption, { y: 0, opacity: 1 }, { y: '-8vh', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(content, { x: 0, opacity: 1 }, { x: '20vw', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(label, { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.8);
    }, section);

    return () => ctx.revert();
  }, []);

  const checkAnswer = (answer: string) => {
    if (showResult) return;
    const q = fillBlankQuestions[currentQ];
    const isCorrect = answer.toLowerCase().trim() === q.answer.toLowerCase().trim();
    setShowResult(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) setScore((s) => s + 1);
  };

  const nextQuestion = () => {
    setCurrentQ((prev) => (prev + 1) % fillBlankQuestions.length);
    setShowResult(null);
  };

  const handleMatch = (en: string, es: string) => {
    const pair = wordPairs.find((p) => p.en === en && p.es === es);
    setMatchAttempts((a) => a + 1);
    if (pair) {
      setMatchedPairs((prev) => [...prev, en]);
      setScore((s) => s + 1);
    }
    setSelectedEn(null);
    setSelectedEs(null);
  };

  const resetMatch = () => {
    setMatchedPairs([]);
    setMatchAttempts(0);
    setSelectedEn(null);
    setSelectedEs(null);
  };

  // Shuffle arrays for matching game
  const shuffledEn = [...wordPairs].sort(() => Math.random() - 0.5);
  const shuffledEs = [...wordPairs].sort(() => Math.random() - 0.5);

  return (
    <section ref={sectionRef} id="games" className="pinned-section" style={{ zIndex: 90 }}>
      <div ref={labelRef} className="absolute top-[7vh] left-1/2 -translate-x-1/2 z-20 opacity-0">
        <span className="micro-tag">Play</span>
      </div>

      <h2
        ref={headlineRef}
        className="absolute top-[14vh] left-1/2 -translate-x-1/2 z-20 font-serif font-500 text-[clamp(42px,5vw,78px)] leading-[0.98] text-[#111111] text-center opacity-0"
      >
        Mini Games
      </h2>

      <p
        ref={captionRef}
        className="absolute top-[24vh] left-1/2 -translate-x-1/2 z-20 text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.55] text-[#6E6A63] text-center max-w-[48ch] px-6 opacity-0"
      >
        Completa, empareja y supera el reloj — sin perder la calma.
      </p>

      <img
        ref={imageRef}
        src="/images/games_controller_notebook.jpg"
        alt="Juegos y aprendizaje"
        className="hero-image absolute top-[52vh] right-[5vw] z-10 opacity-0"
        style={{ width: '36vw', maxWidth: '560px' }}
      />

      {/* Games Panel */}
      <div
        ref={contentRef}
        className="absolute top-[14vh] left-[4vw] w-[48vw] max-w-[580px] z-20 opacity-0"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Gamepad2 size={15} className="text-[#A02B8A]" strokeWidth={1.5} />
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#6E6A63]">
                Juegos Interactivos
              </span>
            </div>
            <span className="pill text-[10px]">
              <Zap size={10} className="inline mr-1" />
              {score} pts
            </span>
          </div>

          {/* Game Selector */}
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setGameType('blanks')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded text-[10px] font-mono uppercase tracking-wider transition-all ${
                gameType === 'blanks'
                  ? 'bg-[#A02B8A] text-white'
                  : 'bg-[#F6F4EF] text-[#6E6A63] hover:bg-[#A02B8A]/10'
              }`}
            >
              Rellenar Espacios
            </button>
            <button
              onClick={() => { setGameType('match'); resetMatch(); }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded text-[10px] font-mono uppercase tracking-wider transition-all ${
                gameType === 'match'
                  ? 'bg-[#A02B8A] text-white'
                  : 'bg-[#F6F4EF] text-[#6E6A63] hover:bg-[#A02B8A]/10'
              }`}
            >
              Emparejar
            </button>
          </div>

          {gameType === 'blanks' ? (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-[#6E6A63]">
                  Pregunta {currentQ + 1} / {fillBlankQuestions.length}
                </span>
                <button onClick={nextQuestion} className="flex items-center gap-1 text-[10px] text-[#6E6A63] hover:text-[#A02B8A]">
                  <RotateCcw size={10} /> Siguiente
                </button>
              </div>

              <div className="p-3 bg-[#F6F4EF] rounded-md mb-3">
                <p className="text-[13px] text-[#111111] leading-relaxed">
                  {fillBlankQuestions[currentQ].sentence.split('_____').map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className="inline-block min-w-[60px] px-2 py-0.5 bg-white border-b-2 border-[#A02B8A] text-[#A02B8A] font-500 text-center mx-1">
                          {showResult ? fillBlankQuestions[currentQ].answer : '?'}
                        </span>
                      )}
                    </span>
                  ))}
                </p>
              </div>

              {'options' in fillBlankQuestions[currentQ] && Array.isArray(fillBlankQuestions[currentQ].options) ? (
                <div className="grid grid-cols-2 gap-2">
                  {(fillBlankQuestions[currentQ].options as string[]).map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => checkAnswer(opt)}
                      disabled={showResult !== null}
                      className={`p-2 rounded text-[12px] border transition-all ${
                        showResult !== null
                          ? opt === fillBlankQuestions[currentQ].answer
                            ? 'bg-green-50 border-green-300 text-green-700'
                            : 'bg-[#F6F4EF] border-[#111111]/10 text-[#6E6A63]'
                          : 'bg-[#F6F4EF] border-[#111111]/10 hover:bg-[#A02B8A]/10'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-2 bg-amber-50 border border-amber-200 rounded-md">
                  <p className="text-[11px] text-amber-700">
                    Escribe la respuesta: <span className="font-mono">{fillBlankQuestions[currentQ].options as string}</span>
                  </p>
                </div>
              )}

              {showResult === 'correct' && (
                <div className="flex items-center gap-1 mt-2 text-green-600">
                  <Check size={14} /> <span className="text-[11px]">¡Correcto!</span>
                </div>
              )}
              {showResult === 'incorrect' && (
                <div className="flex items-center gap-1 mt-2 text-red-500">
                  <X size={14} /> <span className="text-[11px]">Intenta de nuevo</span>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-[#6E6A63]">
                  Empareja inglés-español ({matchedPairs.length}/{wordPairs.length})
                </span>
                <span className="text-[10px] text-[#6E6A63]">Intentos: {matchAttempts}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* English column */}
                <div className="space-y-1.5">
                  <p className="text-[9px] font-mono uppercase text-[#A02B8A] mb-1">English</p>
                  {shuffledEn.map((p) => (
                    <button
                      key={p.en}
                      onClick={() => {
                        if (matchedPairs.includes(p.en)) return;
                        if (selectedEs) {
                          handleMatch(p.en, selectedEs);
                        } else {
                          setSelectedEn(p.en);
                        }
                      }}
                      className={`w-full text-left p-2 rounded text-[11px] border transition-all ${
                        matchedPairs.includes(p.en)
                          ? 'bg-green-50 border-green-300 text-green-700'
                          : selectedEn === p.en
                          ? 'bg-[#A02B8A]/10 border-[#A02B8A] text-[#A02B8A]'
                          : 'bg-[#F6F4EF] border-[#111111]/10 hover:bg-[#A02B8A]/5'
                      }`}
                    >
                      {p.en}
                    </button>
                  ))}
                </div>

                {/* Spanish column */}
                <div className="space-y-1.5">
                  <p className="text-[9px] font-mono uppercase text-[#A02B8A] mb-1">Español</p>
                  {shuffledEs.map((p) => (
                    <button
                      key={p.es}
                      onClick={() => {
                        if (matchedPairs.includes(p.en)) return;
                        if (selectedEn) {
                          handleMatch(selectedEn, p.es);
                        } else {
                          setSelectedEs(p.es);
                        }
                      }}
                      className={`w-full text-left p-2 rounded text-[11px] border transition-all ${
                        matchedPairs.some((en) => wordPairs.find((wp) => wp.en === en)?.es === p.es)
                          ? 'bg-green-50 border-green-300 text-green-700'
                          : selectedEs === p.es
                          ? 'bg-[#A02B8A]/10 border-[#A02B8A] text-[#A02B8A]'
                          : 'bg-[#F6F4EF] border-[#111111]/10 hover:bg-[#A02B8A]/5'
                      }`}
                    >
                      {p.es}
                    </button>
                  ))}
                </div>
              </div>

              {matchedPairs.length === wordPairs.length && (
                <div className="flex items-center gap-1 mt-2 text-green-600">
                  <Check size={14} /> <span className="text-[11px]">¡Completado! ¡Felicidades!</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
