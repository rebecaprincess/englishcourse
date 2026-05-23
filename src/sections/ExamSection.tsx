import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, CheckCircle, AlertCircle, Timer } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const examTips = [
  {
    icon: 'plan',
    title: 'Planifica tu respuesta',
    esTitle: 'Plan your answer',
    description: 'Lee cuidadosamente la pregunta. Haz un esquema con introducción, desarrollo y conclusión antes de empezar a escribir.',
    time: '5 min',
  },
  {
    icon: 'time',
    title: 'Gestiona el tiempo',
    esTitle: 'Manage your time',
    description: 'El examen de escritura tiene tiempo limitado. Dedica 5 min a planificar, 20 min a escribir y 5 min a revisar.',
    time: '30 min',
  },
  {
    icon: 'grammar',
    title: 'Revisa la gramática',
    esTitle: 'Check your grammar',
    description: 'Verifica concordancia sujeto-verbo, tiempos verbales correctos y uso de preposiciones. Lee en voz baja mentalmente.',
    time: '5 min',
  },
  {
    icon: 'vocab',
    title: 'Varía el vocabulario',
    esTitle: 'Use varied vocabulary',
    description: 'Evita repetir palabras. Usa sinónimos y conectores (however, furthermore, in addition) para mostrar fluidez.',
    time: 'siempre',
  },
  {
    icon: 'calm',
    title: 'Mantén la calma',
    esTitle: 'Stay calm',
    description: 'Respira profundo. Si te bloqueas, pasa a la siguiente pregunta y vuelve después. La confianza es clave.',
    time: 'siempre',
  },
];

const writingTasks = [
  {
    type: 'Email',
    prompt: 'Escribe un email a tu equipo (120-150 palabras) informando sobre la nueva estrategia de contenido para Menarini.',
    keywords: ['strategy', 'team', 'deadline', 'content', 'goals'],
  },
  {
    type: 'Article',
    prompt: 'Escribe un artículo (150-180 palabras) sobre la importancia del SEO en la industria farmacéutica.',
    keywords: ['SEO', 'pharmaceutical', 'patients', 'online', 'information'],
  },
  {
    type: 'Essay',
    prompt: 'Escribe un ensayo (180-200 palabras): "The role of a content manager in a pharmaceutical company."',
    keywords: ['content manager', 'responsibilities', 'team', 'communication', 'brand'],
  },
];

export default function ExamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'tips' | 'practice'>('tips');
  const [selectedTask, setSelectedTask] = useState(0);

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

  return (
    <section ref={sectionRef} className="pinned-section" style={{ zIndex: 60 }}>
      <div ref={labelRef} className="absolute top-[7vh] left-1/2 -translate-x-1/2 z-20 opacity-0">
        <span className="micro-tag">Exam Prep</span>
      </div>

      <h2
        ref={headlineRef}
        className="absolute top-[14vh] left-1/2 -translate-x-1/2 z-20 font-serif font-500 text-[clamp(42px,5vw,78px)] leading-[0.98] text-[#111111] text-center opacity-0"
      >
        Exam Strategies
      </h2>

      <p
        ref={captionRef}
        className="absolute top-[24vh] left-1/2 -translate-x-1/2 z-20 text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.55] text-[#6E6A63] text-center max-w-[48ch] px-6 opacity-0"
      >
        Planifica tu respuesta, gestiona el tiempo, revisa la gramática y mantén la calma.
      </p>

      <img
        ref={imageRef}
        src="/images/exam_paper_highlighter.jpg"
        alt="Examen con marcador"
        className="hero-image absolute top-[52vh] right-[5vw] z-10 opacity-0"
        style={{ width: '36vw', maxWidth: '560px' }}
      />

      {/* Exam Content Panel */}
      <div
        ref={contentRef}
        className="absolute top-[16vh] left-[5vw] w-[46vw] max-w-[540px] z-20 opacity-0"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <FileText size={15} className="text-[#A02B8A]" strokeWidth={1.5} />
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#6E6A63]">
              Preparación para el Examen B1
            </span>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setActiveTab('tips')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded text-[10px] font-mono uppercase tracking-wider transition-all ${
                activeTab === 'tips'
                  ? 'bg-[#A02B8A] text-white'
                  : 'bg-[#F6F4EF] text-[#6E6A63] hover:bg-[#A02B8A]/10'
              }`}
            >
              <CheckCircle size={10} /> Consejos
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded text-[10px] font-mono uppercase tracking-wider transition-all ${
                activeTab === 'practice'
                  ? 'bg-[#A02B8A] text-white'
                  : 'bg-[#F6F4EF] text-[#6E6A63] hover:bg-[#A02B8A]/10'
              }`}
            >
              <Timer size={10} /> Práctica
            </button>
          </div>

          {activeTab === 'tips' ? (
            <div className="space-y-2 max-h-[42vh] overflow-y-auto pr-1">
              {examTips.map((tip, i) => (
                <div key={i} className="p-3 bg-[#F6F4EF] rounded-md">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-[12px] font-500 text-[#111111]">{tip.title}</p>
                      <p className="text-[10px] text-[#6E6A63] italic mb-1">{tip.esTitle}</p>
                      <p className="text-[11px] text-[#6E6A63] leading-relaxed">{tip.description}</p>
                    </div>
                    <span className="pill text-[9px] ml-2 shrink-0">{tip.time}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <div className="flex gap-1 mb-3">
                {writingTasks.map((task, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedTask(i)}
                    className={`px-2 py-1 rounded text-[9px] font-mono uppercase transition-all ${
                      selectedTask === i
                        ? 'bg-[#A02B8A] text-white'
                        : 'bg-[#F6F4EF] text-[#6E6A63]'
                    }`}
                  >
                    {task.type}
                  </button>
                ))}
              </div>
              <div className="p-3 bg-[#F6F4EF] rounded-md mb-3">
                <p className="text-[11px] text-[#6E6A63] mb-2">{writingTasks[selectedTask].prompt}</p>
                <div className="flex flex-wrap gap-1">
                  {writingTasks[selectedTask].keywords.map((kw, i) => (
                    <span key={i} className="pill text-[9px]">{kw}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 bg-amber-50 border border-amber-200 rounded-md">
                <AlertCircle size={12} className="text-amber-600 shrink-0" />
                <p className="text-[10px] text-amber-700">
                  Practica esta tarea en la sección "Writing Practice" con tu Apple Pencil.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
