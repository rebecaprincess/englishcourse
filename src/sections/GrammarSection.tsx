import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const grammarTopics = [
  {
    title: 'Present Tenses',
    esTitle: 'Presente Simple y Continuo',
    description: 'Hablar sobre rutinas, hechos y acciones en curso.',
    examples: [
      { en: 'I work at Menarini.', es: 'Trabajo en Menarini.' },
      { en: 'She is managing the content team.', es: 'Ella está gestionando el equipo de contenido.' },
    ],
  },
  {
    title: 'Past Tenses',
    esTitle: 'Pasado Simple y Perfecto',
    description: 'Describir experiencias y acciones completadas.',
    examples: [
      { en: 'I studied marketing last year.', es: 'Estudié marketing el año pasado.' },
      { en: 'We have launched three campaigns.', es: 'Hemos lanzado tres campañas.' },
    ],
  },
  {
    title: 'Future Forms',
    esTitle: 'Futuro con Will y Going to',
    description: 'Planificar y predecir acciones futuras.',
    examples: [
      { en: 'I will attend the meeting tomorrow.', es: 'Asistiré a la reunión mañana.' },
      { en: 'We are going to optimize the SEO strategy.', es: 'Vamos a optimizar la estrategia de SEO.' },
    ],
  },
  {
    title: 'Conditionals',
    esTitle: 'Condicionales (1º y 2º)',
    description: 'Expresar situaciones reales e hipotéticas.',
    examples: [
      { en: 'If you practice daily, you will improve.', es: 'Si practicas diariamente, mejorarás.' },
      { en: 'If I were the manager, I would hire her.', es: 'Si fuera el gerente, la contrataría.' },
    ],
  },
];

export default function GrammarSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const helperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;
    const headline = headlineRef.current;
    const caption = captionRef.current;
    const image = imageRef.current;
    const helper = helperRef.current;
    const content = contentRef.current;
    if (!section || !label || !headline || !caption || !image || !helper || !content) return;

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

      // ENTRANCE (0%-30%)
      scrollTl.fromTo(image, { y: '60vh', opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, ease: 'none' }, 0);
      scrollTl.fromTo(headline, { y: '-18vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0);
      scrollTl.fromTo(caption, { y: '10vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.05);
      scrollTl.fromTo(label, { opacity: 0 }, { opacity: 1, ease: 'none' }, 0.1);
      scrollTl.fromTo(helper, { opacity: 0 }, { opacity: 0.5, ease: 'none' }, 0.15);
      scrollTl.fromTo(content, { x: '30vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.1);

      // SETTLE (30%-70%) - hold

      // EXIT (70%-100%)
      scrollTl.fromTo(image, { y: 0, opacity: 1 }, { y: '-26vh', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(headline, { y: 0, opacity: 1 }, { y: '-12vh', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(caption, { y: 0, opacity: 1 }, { y: '-8vh', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(content, { x: 0, opacity: 1 }, { x: '-20vw', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(label, { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.8);
      scrollTl.fromTo(helper, { opacity: 0.5 }, { opacity: 0, ease: 'power2.in' }, 0.8);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="program" className="pinned-section" style={{ zIndex: 20 }}>
      {/* Label */}
      <div ref={labelRef} className="absolute top-[7vh] left-1/2 -translate-x-1/2 z-20 opacity-0">
        <span className="micro-tag">Lección 01</span>
      </div>

      {/* Headline */}
      <h2
        ref={headlineRef}
        className="absolute top-[14vh] left-1/2 -translate-x-1/2 z-20 font-serif font-500 text-[clamp(42px,5vw,78px)] leading-[0.98] text-[#111111] text-center opacity-0"
      >
        Grammar Foundations
      </h2>

      {/* Caption */}
      <p
        ref={captionRef}
        className="absolute top-[24vh] left-1/2 -translate-x-1/2 z-20 text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.55] text-[#6E6A63] text-center max-w-[48ch] px-6 opacity-0"
      >
        Partes de la oración, estructura de frases y las reglas que lo mantienen todo unido.
      </p>

      {/* Hero Image */}
      <img
        ref={imageRef}
        src="/images/grammar_hands_writing.jpg"
        alt="Escribiendo gramática"
        className="hero-image absolute top-[52vh] left-[8vw] z-10 opacity-0"
        style={{ width: '40vw', maxWidth: '640px' }}
      />

      {/* Interactive Content Panel */}
      <div
        ref={contentRef}
        className="absolute top-[18vh] right-[6vw] w-[38vw] max-w-[480px] z-20 opacity-0"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={16} className="text-[#A02B8A]" strokeWidth={1.5} />
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#6E6A63]">
              Temas Clave — Nivel B1
            </span>
          </div>
          <div className="space-y-2">
            {grammarTopics.map((topic, index) => (
              <div key={index} className="border border-[#111111]/8 rounded-md overflow-hidden">
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-[#F6F4EF] transition-colors"
                >
                  <div>
                    <p className="text-[13px] font-500 text-[#111111]">{topic.title}</p>
                    <p className="text-[11px] text-[#6E6A63]">{topic.esTitle}</p>
                  </div>
                  {expandedIndex === index ? (
                    <ChevronUp size={14} className="text-[#6E6A63]" />
                  ) : (
                    <ChevronDown size={14} className="text-[#6E6A63]" />
                  )}
                </button>
                {expandedIndex === index && (
                  <div className="px-3 pb-3 border-t border-[#111111]/6">
                    <p className="text-[12px] text-[#6E6A63] mt-2 mb-2">{topic.description}</p>
                    {topic.examples.map((ex, i) => (
                      <div key={i} className="grammar-example my-1.5">
                        <p className="text-[12px] font-500 text-[#111111]">{ex.en}</p>
                        <p className="text-[11px] text-[#6E6A63] italic">{ex.es}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Helper */}
      <div ref={helperRef} className="absolute bottom-[4vh] left-1/2 -translate-x-1/2 z-20 opacity-0">
        <span className="font-mono text-[11px] text-[#6E6A63]/50">Desplaza para continuar</span>
      </div>
    </section>
  );
}
