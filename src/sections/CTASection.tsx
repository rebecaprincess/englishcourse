import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, BookOpen, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const lotusRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const subhead = subheadRef.current;
    const cta = ctaRef.current;
    const lotus = lotusRef.current;
    if (!section || !headline || !subhead || !cta || !lotus) return;

    const ctx = gsap.context(() => {
      // Flowing scroll animation
      gsap.fromTo(
        headline,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        subhead,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        cta,
        { opacity: 0, y: 20, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        lotus,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="support"
      className="relative w-full min-h-[80vh] flex items-center justify-center py-[12vh] px-6"
      style={{ background: '#111111', zIndex: 100 }}
    >
      {/* Mulan Easter Egg - lotus in the corner */}
      <div ref={lotusRef} className="absolute bottom-[8%] right-[8%] lotus-easter-egg opacity-0">
        <div className="text-center">
          <Heart size={16} className="text-[#A02B8A]/40 mx-auto mb-1" fill="#A02B8A" fillOpacity={0.2} />
          <p className="text-[9px] text-[#F6F4EF]/20 font-mono">The flower that blooms in adversity</p>
        </div>
      </div>

      <div className="text-center max-w-[600px]">
        <h2
          ref={headlineRef}
          className="font-serif font-500 text-[clamp(36px,5vw,64px)] leading-[1.05] text-[#F6F4EF] mb-6 opacity-0"
        >
          Empieza a aprender hoy.
        </h2>

        <p
          ref={subheadRef}
          className="text-[15px] sm:text-[16px] leading-[1.6] text-[#F6F4EF]/60 mb-10 opacity-0"
        >
          Gramática. Vocabulario. Preparación para el examen de escritura. Una sesión tranquila a la vez.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
          <a
            href="#program"
            className="btn-primary flex items-center gap-2"
          >
            <BookOpen size={16} strokeWidth={1.5} />
            Comenzar Ahora
          </a>
          <a
            href="#"
            className="flex items-center gap-2 text-[14px] text-[#F6F4EF]/50 hover:text-[#F6F4EF] transition-colors"
          >
            Ver Currículum
            <ArrowRight size={14} />
          </a>
        </div>

        {/* Personal message for Rebeca */}
        <div className="mt-16 pt-8 border-t border-[#F6F4EF]/10">
          <p className="text-[12px] text-[#F6F4EF]/30 font-mono uppercase tracking-[0.14em] mb-2">
            Para mi princesita
          </p>
          <p className="text-[13px] text-[#F6F4EF]/40 italic leading-relaxed max-w-[400px] mx-auto">
            "Como Mulan demostró su valentía, tú demostrarás tu dominio del inglés. Este es tu momento de brillar en Menarini."
          </p>
        </div>
      </div>
    </section>
  );
}
