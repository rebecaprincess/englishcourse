import { useState } from 'react';
import { Check, X, RotateCcw, Zap, Trophy } from 'lucide-react';

// Fill in blanks questions
const blanksQuestions = [
  { q: 'She _____ (work) as a content manager at Menarini.', es: 'Completa con la forma correcta.', ans: 'works', opts: ['work', 'works', 'working', 'worked'] },
  { q: 'Menarini was _____ in Florence in 1886.', es: 'Usa la voz pasiva.', ans: 'founded', opts: ['founded', 'found', 'founds', 'founding'] },
  { q: 'We are going to _____ the new SEO strategy next month.', es: 'Elige el verbo correcto.', ans: 'implement', opts: ['implements', 'implement', 'implementing', 'implemented'] },
  { q: 'If I _____ (be) the manager, I would hire more people.', es: 'Segundo condicional.', ans: 'were', opts: ['am', 'were', 'was', 'be'] },
  { q: 'Our organic traffic has _____ by 35% this quarter.', es: 'Presente perfecto.', ans: 'increased', opts: ['increase', 'increases', 'increased', 'increasing'] },
  { q: 'The content team ______ every Monday at 9 AM.', es: 'Presente simple.', ans: 'meets', opts: ['meet', 'meets', 'meeting', 'met'] },
  { q: 'Please let me know if you ______ any questions.', es: 'Frase formal.', ans: 'have', opts: ['has', 'have', 'had', 'having'] },
  { q: 'The marketing campaign ______ last month.', es: 'Pasado simple pasivo.', ans: 'was launched', opts: ['launched', 'was launched', 'is launched', 'has launched'] },
];

// Word match pairs
const matchPairs = [
  { en: 'Backlink', es: 'Enlace entrante' },
  { en: 'Bounce Rate', es: 'Tasa de rebote' },
  { en: 'Conversion', es: 'Conversión' },
  { en: 'Landing Page', es: 'Página de destino' },
  { en: 'Keyword', es: 'Palabra clave' },
  { en: 'Analytics', es: 'Analítica' },
  { en: 'Campaign', es: 'Campaña' },
  { en: 'Engagement', es: 'Interacción' },
];

type GameType = 'blanks' | 'match';

export default function Games() {
  const [gameType, setGameType] = useState<GameType>('blanks');
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState<'correct' | 'incorrect' | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  // Match game state
  const [selectedEn, setSelectedEn] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [matchAttempts, setMatchAttempts] = useState(0);

  const q = blanksQuestions[currentQ];

  const checkAnswer = (answer: string) => {
    if (showResult) return;
    setSelected(answer);
    if (answer === q.ans) {
      setShowResult('correct');
      setScore((s) => s + 10);
    } else {
      setShowResult('incorrect');
    }
  };

  const nextQ = () => {
    setCurrentQ((prev) => (prev + 1) % blanksQuestions.length);
    setShowResult(null);
    setSelected(null);
  };

  const resetGame = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(null);
    setSelected(null);
    setMatchedPairs([]);
    setMatchAttempts(0);
    setSelectedEn(null);
  };

  const handleMatch = (en: string, es: string) => {
    const pair = matchPairs.find((p) => p.en === en && p.es === es);
    setMatchAttempts((a) => a + 1);
    if (pair) {
      setMatchedPairs((prev) => [...prev, en]);
      setScore((s) => s + 15);
    }
    setSelectedEn(null);
  };

  const shuffledEn = [...matchPairs].sort(() => Math.random() - 0.5);
  const shuffledEs = [...matchPairs].sort(() => Math.random() - 0.5);

  return (
    <div className="space-y-5 max-w-[600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a2e]">Mini Juegos</h1>
          <p className="text-sm text-gray-500 mt-0.5">Practica mientras te diviertes</p>
        </div>
        <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm">
          <Zap size={14} className="text-[#A02B8A]" />
          <span className="text-sm font-bold text-[#A02B8A]">{score}</span>
          <span className="text-[10px] text-gray-400">pts</span>
        </div>
      </div>

      {/* Game Selector */}
      <div className="flex gap-2">
        <button
          onClick={() => setGameType('blanks')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-medium transition-all ${
            gameType === 'blanks' ? 'bg-[#A02B8A] text-white' : 'bg-white text-gray-500'
          }`}
        >
          Rellenar Espacios
        </button>
        <button
          onClick={() => { setGameType('match'); resetGame(); }}
          className={`flex-1 py-2.5 rounded-xl text-xs font-medium transition-all ${
            gameType === 'match' ? 'bg-[#A02B8A] text-white' : 'bg-white text-gray-500'
          }`}
        >
          Emparejar
        </button>
      </div>

      {/* Game Area */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        {/* Score bar for blanks */}
        {gameType === 'blanks' && (
          <>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] text-gray-400 font-mono uppercase">
                Pregunta {currentQ + 1} / {blanksQuestions.length}
              </span>
              <button onClick={resetGame} className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-gray-600">
                <RotateCcw size={10} /> Reiniciar
              </button>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl mb-4">
              <p className="text-xs text-gray-400 mb-1">{q.es}</p>
              <p className="text-sm font-medium text-[#1a1a2e] leading-relaxed">{q.q}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {q.opts.map((opt) => (
                <button
                  key={opt}
                  onClick={() => checkAnswer(opt)}
                  disabled={showResult !== null}
                  className={`p-3 rounded-xl text-sm border-2 transition-all ${
                    showResult !== null
                      ? opt === q.ans
                        ? 'border-green-300 bg-green-50 text-green-800'
                        : opt === selected
                        ? 'border-red-300 bg-red-50 text-red-700'
                        : 'border-gray-100 bg-gray-50 text-gray-400'
                      : 'border-gray-100 hover:border-[#A02B8A]/30 hover:bg-[#A02B8A]/5'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {showResult === 'correct' && (
              <div className="flex items-center gap-2 text-green-600 p-3 bg-green-50 rounded-xl">
                <Check size={16} />
                <span className="text-xs font-medium">¡Correcto! +10 puntos</span>
              </div>
            )}
            {showResult === 'incorrect' && (
              <div className="flex items-start gap-2 text-red-600 p-3 bg-red-50 rounded-xl">
                <X size={16} className="shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium">Respuesta correcta: <span className="font-bold">{q.ans}</span></p>
                </div>
              </div>
            )}

            {showResult && (
              <button
                onClick={nextQ}
                className="w-full mt-3 py-2.5 bg-[#A02B8A] text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
              >
                {currentQ < blanksQuestions.length - 1 ? 'Siguiente' : 'Volver a empezar'}
              </button>
            )}
          </>
        )}

        {/* Match game */}
        {gameType === 'match' && (
          <>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] text-gray-400 font-mono uppercase">
                Empareja: {matchedPairs.length}/{matchPairs.length}
              </span>
              <span className="text-[10px] text-gray-400">Intentos: {matchAttempts}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* English */}
              <div className="space-y-2">
                <p className="text-[10px] text-[#A02B8A] font-mono uppercase mb-2">English</p>
                {shuffledEn.map((p) => (
                  <button
                    key={p.en}
                    onClick={() => {
                      if (matchedPairs.includes(p.en)) return;
                      if (selectedEn) handleMatch(p.en, selectedEn);
                      else setSelectedEn(p.en);
                    }}
                    className={`w-full text-left p-3 rounded-xl text-xs border-2 transition-all ${
                      matchedPairs.includes(p.en)
                        ? 'border-green-300 bg-green-50 text-green-700'
                        : selectedEn === null
                        ? 'border-gray-100 hover:border-[#A02B8A]/30'
                        : selectedEn === p.en
                        ? 'border-[#A02B8A] bg-[#A02B8A]/10 text-[#A02B8A]'
                        : 'border-gray-100 hover:border-[#A02B8A]/30'
                    }`}
                  >
                    {p.en}
                  </button>
                ))}
              </div>

              {/* Spanish */}
              <div className="space-y-2">
                <p className="text-[10px] text-[#A02B8A] font-mono uppercase mb-2">Español</p>
                {shuffledEs.map((p) => (
                  <button
                    key={p.es}
                    onClick={() => {
                      if (matchedPairs.some((en) => matchPairs.find((mp) => mp.en === en)?.es === p.es)) return;
                      if (selectedEn) handleMatch(selectedEn, p.es);
                    }}
                    className={`w-full text-left p-3 rounded-xl text-xs border-2 transition-all ${
                      matchedPairs.some((en) => matchPairs.find((mp) => mp.en === en)?.es === p.es)
                        ? 'border-green-300 bg-green-50 text-green-700'
                        : 'border-gray-100 hover:border-[#A02B8A]/30'
                    }`}
                  >
                    {p.es}
                  </button>
                ))}
              </div>
            </div>

            {matchedPairs.length === matchPairs.length && (
              <div className="mt-4 flex items-center gap-2 text-green-600 p-3 bg-green-50 rounded-xl">
                <Trophy size={16} />
                <span className="text-xs font-medium">¡Completado! ¡Excelente trabajo!</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
