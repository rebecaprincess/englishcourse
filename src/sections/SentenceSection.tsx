import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, X, RotateCcw } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const sentenceExercises = [
  {
    instruction: 'Ordena las palabras para formar una oración correcta:',
    words: ['team', 'the', 'content', 'I', 'manage'],
    correct: 'I manage the content team.',
    translation: 'Yo gestiono el equipo de contenido.',
  },
  {
    instruction: 'Completa con la palabra correcta:',
    sentence: 'She _______ (work) in the marketing department.',
    options: ['works', 'work', 'working', 'worked'],
    correct: 'works',
    translation: 'Ella trabaja en el departamento de marketing.',
  },
  {
    instruction: 'Elige la oración correcta:',
    options: [
      'The SEO strategy are effective.',
      'The SEO strategy is effective.',
      'The SEO strategy be effective.',
    ],
    correct: 'The SEO strategy is effective.',
    translation: 'La estrategia de SEO es efectiva.',
  },
];

export default function SentenceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [currentEx, setCurrentEx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);

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

      // ENTRANCE (0%-30%): image from right
      scrollTl.fromTo(image, { x: '55vw', opacity: 0, scale: 0.98 }, { x: 0, opacity: 1, scale: 1, ease: 'none' }, 0);
      scrollTl.fromTo(headline, { y: '-18vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0);
      scrollTl.fromTo(caption, { y: '10vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.05);
      scrollTl.fromTo(label, { opacity: 0 }, { opacity: 1, ease: 'none' }, 0.1);
      scrollTl.fromTo(content, { x: '-25vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.1);

      // EXIT (70%-100%)
      scrollTl.fromTo(image, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(headline, { y: 0, opacity: 1 }, { y: '-12vh', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(caption, { y: 0, opacity: 1 }, { y: '-8vh', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(content, { x: 0, opacity: 1 }, { x: '20vw', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(label, { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.8);
    }, section);

    return () => ctx.revert();
  }, []);

  const checkSentenceOrder = (selectedOrder: string[]) => {
    const answer = selectedOrder.join(' ');
    setUserAnswer(answer);
    if (answer === sentenceExercises[0].correct) {
      setShowResult('correct');
      setScore((s) => s + 1);
    } else {
      setShowResult('incorrect');
    }
  };

  const resetExercise = () => {
    setUserAnswer('');
    setShowResult(null);
  };

  const nextExercise = () => {
    setCurrentEx((prev) => (prev + 1) % sentenceExercises.length);
    setUserAnswer('');
    setShowResult(null);
  };

  return (
    <section ref={sectionRef} className="pinned-section" style={{ zIndex: 30 }}>
      <div ref={labelRef} className="absolute top-[7vh] left-1/2 -translate-x-1/2 z-20 opacity-0">
        <span className="micro-tag">Lección 02</span>
      </div>

      <h2
        ref={headlineRef}
        className="absolute top-[14vh] left-1/2 -translate-x-1/2 z-20 font-serif font-500 text-[clamp(42px,5vw,78px)] leading-[0.98] text-[#111111] text-center opacity-0"
      >
        Sentence Building
      </h2>

      <p
        ref={captionRef}
        className="absolute top-[24vh] left-1/2 -translate-x-1/2 z-20 text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.55] text-[#6E6A63] text-center max-w-[48ch] px-6 opacity-0"
      >
        Sujeto + verbo + objeto. Luego añade cláusulas, conectores y estilo.
      </p>

      <img
        ref={imageRef}
        src="/images/sentence_notebook.jpg"
        alt="Cuaderno con oraciones"
        className="hero-image absolute top-[52vh] right-[6vw] z-10 opacity-0"
        style={{ width: '38vw', maxWidth: '600px' }}
      />

      {/* Exercise Panel */}
      <div
        ref={contentRef}
        className="absolute top-[18vh] left-[6vw] w-[40vw] max-w-[500px] z-20 opacity-0"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-5 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#A02B8A]">
              Ejercicio {currentEx + 1} / {sentenceExercises.length}
            </span>
            <span className="pill text-[10px]">Puntuación: {score}</span>
          </div>

          <div className="mb-4">
            <p className="text-[13px] text-[#6E6A63] mb-3">
              {sentenceExercises[currentEx].instruction}
            </p>

            {currentEx === 0 && (
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(sentenceExercises as Array<{words: string[]}>)[0].words.map((word, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        const newOrder = [...(userAnswer ? userAnswer.split(' ') : []), word];
                        if (newOrder.length === (sentenceExercises as Array<{words: string[]}>)[0].words.length) {
                          checkSentenceOrder(newOrder);
                        }
                        setUserAnswer(newOrder.join(' '));
                      }}
                      className="px-3 py-1.5 bg-[#F6F4EF] border border-[#111111]/10 rounded text-[13px] hover:bg-[#A02B8A]/10 hover:border-[#A02B8A]/30 transition-all"
                    >
                      {word}
                    </button>
                  ))}
                </div>
                {userAnswer && (
                  <div className="p-3 bg-[#F6F4EF] rounded-md">
                    <p className="text-[13px] font-500 text-[#111111]">{userAnswer}</p>
                    {showResult === 'correct' && (
                      <div className="flex items-center gap-1 mt-1 text-green-600">
                        <Check size={14} />
                        <span className="text-[11px]">{sentenceExercises[0].translation}</span>
                      </div>
                    )}
                    {showResult === 'incorrect' && (
                      <div className="flex items-center gap-1 mt-1 text-red-500">
                        <X size={14} />
                        <span className="text-[11px]">Intenta de nuevo. Correcto: {sentenceExercises[0].correct}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {currentEx === 1 && (
              <div>
                <p className="text-[14px] font-500 text-[#111111] mb-3">{sentenceExercises[1].sentence}</p>
                <div className="grid grid-cols-2 gap-2">
                  {sentenceExercises[1].options?.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setUserAnswer(opt);
                        if (opt === sentenceExercises[1].correct) {
                          setShowResult('correct');
                          setScore((s) => s + 1);
                        } else {
                          setShowResult('incorrect');
                        }
                      }}
                      className={`p-2 rounded text-[12px] border transition-all ${
                        userAnswer === opt
                          ? opt === sentenceExercises[1].correct
                            ? 'bg-green-50 border-green-300 text-green-700'
                            : 'bg-red-50 border-red-300 text-red-700'
                          : 'bg-[#F6F4EF] border-[#111111]/10 hover:bg-[#A02B8A]/10'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {showResult === 'correct' && (
                  <p className="text-[11px] text-green-600 mt-2">{sentenceExercises[1].translation}</p>
                )}
              </div>
            )}

            {currentEx === 2 && (
              <div>
                <div className="space-y-2">
                  {sentenceExercises[2].options?.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setUserAnswer(opt);
                        if (opt === sentenceExercises[2].correct) {
                          setShowResult('correct');
                          setScore((s) => s + 1);
                        } else {
                          setShowResult('incorrect');
                        }
                      }}
                      className={`w-full text-left p-3 rounded text-[12px] border transition-all ${
                        userAnswer === opt
                          ? opt === sentenceExercises[2].correct
                            ? 'bg-green-50 border-green-300 text-green-700'
                            : 'bg-red-50 border-red-300 text-red-700'
                          : 'bg-[#F6F4EF] border-[#111111]/10 hover:bg-[#A02B8A]/10'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {showResult === 'correct' && (
                  <p className="text-[11px] text-green-600 mt-2">{sentenceExercises[2].translation}</p>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={resetExercise}
              className="flex items-center gap-1 px-3 py-2 text-[11px] text-[#6E6A63] hover:text-[#111111] transition-colors"
            >
              <RotateCcw size={12} /> Reiniciar
            </button>
            <button
              onClick={nextExercise}
              className="ml-auto px-4 py-2 bg-[#A02B8A] text-white rounded text-[12px] hover:bg-[#8a2474] transition-colors"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
