import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const tensesData = [
  {
    tense: 'Present Simple',
    es: 'Presente Simple',
    use: 'Hábitos, rutinas, hechos generales',
    form: 'Sujeto + verbo(base) + ...',
    example: 'She manages the content team at Menarini.',
    translation: 'Ella gestiona el equipo de contenido en Menarini.',
    signal: ['every day', 'usually', 'always', 'often'],
  },
  {
    tense: 'Present Continuous',
    es: 'Presente Continuo',
    use: 'Acciones en curso en este momento',
    form: 'Sujeto + am/is/are + -ing',
    example: 'We are optimizing the website SEO right now.',
    translation: 'Estamos optimizando el SEO del sitio web ahora mismo.',
    signal: ['now', 'at the moment', 'currently', 'today'],
  },
  {
    tense: 'Past Simple',
    es: 'Pasado Simple',
    use: 'Acciones completadas en el pasado',
    form: 'Sujeto + verbo(ed/irregular) + ...',
    example: 'The marketing campaign launched last month.',
    translation: 'La campaña de marketing se lanzó el mes pasado.',
    signal: ['yesterday', 'last week', 'in 2023', 'ago'],
  },
  {
    tense: 'Present Perfect',
    es: 'Presente Perfecto',
    use: 'Experiencias, acciones con resultado presente',
    form: 'Sujeto + have/has + participio',
    example: 'I have worked in pharmaceutical marketing for 5 years.',
    translation: 'He trabajado en marketing farmacéutico durante 5 años.',
    signal: ['ever', 'never', 'already', 'yet', 'since', 'for'],
  },
  {
    tense: 'Future (Will)',
    es: 'Futuro con Will',
    use: 'Decisiones espontáneas, predicciones, promesas',
    form: 'Sujeto + will + verbo(base)',
    example: 'I will send you the content calendar tomorrow.',
    translation: 'Te enviaré el calendario de contenido mañana.',
    signal: ['tomorrow', 'next week', 'soon', 'in the future'],
  },
  {
    tense: 'Future (Going to)',
    es: 'Futuro con Going to',
    use: 'Planes intencionales, predicciones basadas en evidencia',
    form: 'Sujeto + am/is/are + going to + verbo',
    example: 'We are going to implement a new SEO strategy.',
    translation: 'Vamos a implementar una nueva estrategia de SEO.',
    signal: ['going to', 'plan to', 'intend to'],
  },
];

export default function TensesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTense, setActiveTense] = useState(0);

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

      // ENTRANCE (0%-30%): image from left
      scrollTl.fromTo(image, { x: '-55vw', opacity: 0, scale: 0.98 }, { x: 0, opacity: 1, scale: 1, ease: 'none' }, 0);
      scrollTl.fromTo(headline, { y: '-18vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0);
      scrollTl.fromTo(caption, { y: '10vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.05);
      scrollTl.fromTo(label, { opacity: 0 }, { opacity: 1, ease: 'none' }, 0.1);
      scrollTl.fromTo(content, { x: '25vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.1);

      // EXIT (70%-100%)
      scrollTl.fromTo(image, { x: 0, opacity: 1 }, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(headline, { y: 0, opacity: 1 }, { y: '-12vh', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(caption, { y: 0, opacity: 1 }, { y: '-8vh', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(content, { x: 0, opacity: 1 }, { x: '-20vw', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(label, { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.8);
    }, section);

    return () => ctx.revert();
  }, []);

  const tense = tensesData[activeTense];

  return (
    <section ref={sectionRef} className="pinned-section" style={{ zIndex: 40 }}>
      <div ref={labelRef} className="absolute top-[7vh] left-1/2 -translate-x-1/2 z-20 opacity-0">
        <span className="micro-tag">Lección 03</span>
      </div>

      <h2
        ref={headlineRef}
        className="absolute top-[14vh] left-1/2 -translate-x-1/2 z-20 font-serif font-500 text-[clamp(42px,5vw,78px)] leading-[0.98] text-[#111111] text-center opacity-0"
      >
        Tenses & Patterns
      </h2>

      <p
        ref={captionRef}
        className="absolute top-[24vh] left-1/2 -translate-x-1/2 z-20 text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.55] text-[#6E6A63] text-center max-w-[48ch] px-6 opacity-0"
      >
        Presente, pasado, futuro — y las frases que hacen fluir tu escritura.
      </p>

      <img
        ref={imageRef}
        src="/images/tenses_desk_scene.jpg"
        alt="Escritorio con tiempos verbales"
        className="hero-image absolute top-[52vh] left-[6vw] z-10 opacity-0"
        style={{ width: '38vw', maxWidth: '600px' }}
      />

      {/* Tenses Explorer */}
      <div
        ref={contentRef}
        className="absolute top-[16vh] right-[5vw] w-[42vw] max-w-[520px] z-20 opacity-0"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Clock size={15} className="text-[#A02B8A]" strokeWidth={1.5} />
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#6E6A63]">
              Explorador de Tiempos Verbales
            </span>
          </div>

          {/* Tense Selector */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tensesData.map((t, i) => (
              <button
                key={i}
                onClick={() => setActiveTense(i)}
                className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider transition-all ${
                  activeTense === i
                    ? 'bg-[#A02B8A] text-white'
                    : 'bg-[#F6F4EF] text-[#6E6A63] hover:bg-[#A02B8A]/10'
                }`}
              >
                {t.tense}
              </button>
            ))}
          </div>

          {/* Tense Detail */}
          <div className="space-y-3">
            <div>
              <p className="text-[16px] font-serif font-600 text-[#111111]">{tense.tense}</p>
              <p className="text-[11px] text-[#6E6A63]">{tense.es}</p>
            </div>

            <div className="p-3 bg-[#F6F4EF] rounded-md">
              <p className="text-[10px] font-mono uppercase text-[#A02B8A] mb-1">Uso</p>
              <p className="text-[12px] text-[#111111]">{tense.use}</p>
            </div>

            <div className="p-3 bg-[#F6F4EF] rounded-md">
              <p className="text-[10px] font-mono uppercase text-[#A02B8A] mb-1">Forma</p>
              <p className="text-[12px] font-mono text-[#111111]">{tense.form}</p>
            </div>

            <div className="grammar-example">
              <p className="text-[12px] font-500 text-[#111111]">{tense.example}</p>
              <p className="text-[11px] text-[#6E6A63] italic">{tense.translation}</p>
            </div>

            <div className="flex flex-wrap gap-1">
              {tense.signal.map((s, i) => (
                <span key={i} className="pill text-[9px]">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
