import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookMarked, Volume2, RefreshCw } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const vocabCategories = [
  {
    name: 'SEO & Marketing',
    words: [
      { en: 'Search Engine Optimization', es: 'Optimización para motores de búsqueda', ex: 'SEO helps our website rank higher on Google.' },
      { en: 'Keyword', es: 'Palabra clave', ex: 'We need to research the best keywords for our content.' },
      { en: 'Backlink', es: 'Enlace entrante', ex: 'Quality backlinks improve our domain authority.' },
      { en: 'Bounce Rate', es: 'Tasa de rebote', ex: 'A high bounce rate means visitors leave quickly.' },
      { en: 'Conversion', es: 'Conversión', ex: 'Our goal is to increase conversion rates.' },
      { en: 'Landing Page', es: 'Página de destino', ex: 'The landing page must have a clear call to action.' },
      { en: 'Content Strategy', es: 'Estrategia de contenido', ex: 'Our content strategy focuses on patient education.' },
      { en: 'Analytics', es: 'Analítica', ex: 'We use Google Analytics to track performance.' },
    ],
  },
  {
    name: 'Pharmaceutical',
    words: [
      { en: 'Therapeutic Area', es: 'Área terapéutica', ex: 'Oncology is a key therapeutic area for Menarini.' },
      { en: 'Clinical Trial', es: 'Ensayo clínico', ex: 'The clinical trial showed positive results.' },
      { en: 'Patient', es: 'Paciente', ex: 'Patient safety is our top priority.' },
      { en: 'Treatment', es: 'Tratamiento', ex: 'This treatment is effective for chronic pain.' },
      { en: 'Research & Development', es: 'Investigación y desarrollo', ex: 'R&D is the heart of pharmaceutical innovation.' },
      { en: 'Regulatory', es: 'Regulatorio', ex: 'We must follow regulatory guidelines carefully.' },
    ],
  },
  {
    name: 'Leadership & Team',
    words: [
      { en: 'Team Leader', es: 'Líder de equipo', ex: 'As team leader, I coordinate all content projects.' },
      { en: 'Delegate', es: 'Delegar', ex: 'A good manager knows how to delegate tasks.' },
      { en: 'Deadline', es: 'Fecha límite', ex: 'We must meet the deadline for the campaign.' },
      { en: 'Feedback', es: 'Retroalimentación', ex: 'I gave constructive feedback to the designer.' },
      { en: 'Collaborate', es: 'Colaborar', ex: 'We collaborate with the web master on updates.' },
      { en: 'Meeting', es: 'Reunión', ex: 'Let\'s schedule a meeting to discuss the strategy.' },
    ],
  },
];

export default function VocabularySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

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
      scrollTl.fromTo(content, { x: '25vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.1);

      // EXIT (70%-100%)
      scrollTl.fromTo(image, { y: 0, opacity: 1 }, { y: '-26vh', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(headline, { y: 0, opacity: 1 }, { y: '-12vh', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(caption, { y: 0, opacity: 1 }, { y: '-8vh', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(content, { x: 0, opacity: 1 }, { x: '-20vw', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(label, { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.8);
    }, section);

    return () => ctx.revert();
  }, []);

  const speakWord = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <section ref={sectionRef} className="pinned-section" style={{ zIndex: 50 }}>
      <div ref={labelRef} className="absolute top-[7vh] left-1/2 -translate-x-1/2 z-20 opacity-0">
        <span className="micro-tag">Módulo</span>
      </div>

      <h2
        ref={headlineRef}
        className="absolute top-[14vh] left-1/2 -translate-x-1/2 z-20 font-serif font-500 text-[clamp(42px,5vw,78px)] leading-[0.98] text-[#111111] text-center opacity-0"
      >
        Vocabulary Expansion
      </h2>

      <p
        ref={captionRef}
        className="absolute top-[24vh] left-1/2 -translate-x-1/2 z-20 text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.55] text-[#6E6A63] text-center max-w-[48ch] px-6 opacity-0"
      >
        Aprende palabras en contexto. Practica colocaciones, sinónimos y frases para el examen.
      </p>

      <img
        ref={imageRef}
        src="/images/vocab_cards_desk.jpg"
        alt="Tarjetas de vocabulario"
        className="hero-image absolute top-[52vh] left-[6vw] z-10 opacity-0"
        style={{ width: '36vw', maxWidth: '560px' }}
      />

      {/* Vocabulary Panel */}
      <div
        ref={contentRef}
        className="absolute top-[16vh] right-[4vw] w-[46vw] max-w-[560px] z-20 opacity-0"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BookMarked size={15} className="text-[#A02B8A]" strokeWidth={1.5} />
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#6E6A63]">
                Tarjetas de Vocabulario
              </span>
            </div>
            <button
              onClick={() => setFlippedIndex(null)}
              className="flex items-center gap-1 text-[10px] text-[#6E6A63] hover:text-[#A02B8A] transition-colors"
            >
              <RefreshCw size={10} /> Reiniciar
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 mb-3">
            {vocabCategories.map((cat, i) => (
              <button
                key={i}
                onClick={() => { setActiveCategory(i); setFlippedIndex(null); }}
                className={`px-3 py-1.5 rounded text-[10px] font-mono uppercase tracking-wider transition-all ${
                  activeCategory === i
                    ? 'bg-[#A02B8A] text-white'
                    : 'bg-[#F6F4EF] text-[#6E6A63] hover:bg-[#A02B8A]/10'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Word Cards */}
          <div className="grid grid-cols-2 gap-2 max-h-[42vh] overflow-y-auto pr-1">
            {vocabCategories[activeCategory].words.map((word, i) => (
              <div
                key={i}
                onClick={() => setFlippedIndex(flippedIndex === i ? null : i)}
                className={`vocab-card cursor-pointer ${flippedIndex === i ? 'ring-2 ring-[#A02B8A]' : ''}`}
              >
                {flippedIndex !== i ? (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[12px] font-500 text-[#111111]">{word.en}</p>
                      <button
                        onClick={(e) => { e.stopPropagation(); speakWord(word.en); }}
                        className="text-[#A02B8A] hover:text-[#8a2474]"
                      >
                        <Volume2 size={12} />
                      </button>
                    </div>
                    <p className="text-[10px] text-[#6E6A63]">{word.es}</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-[10px] font-mono uppercase text-[#A02B8A] mb-1">Ejemplo</p>
                    <p className="text-[11px] text-[#111111] leading-relaxed">{word.ex}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
