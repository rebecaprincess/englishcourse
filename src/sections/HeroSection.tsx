import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flower2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const creditRef = useRef<HTMLDivElement>(null);
  const lotusRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;
    const headline = headlineRef.current;
    const caption = captionRef.current;
    const image = imageRef.current;
    const credit = creditRef.current;
    const lotus = lotusRef.current;
    if (!section || !label || !headline || !caption || !image || !credit) return;

    const ctx = gsap.context(() => {
      // Initial states (hidden)
      gsap.set([label, headline, caption, image, credit, lotus], { opacity: 0 });
      gsap.set(label, { y: -12 });
      gsap.set(headline, { y: 28 });
      gsap.set(caption, { y: 18 });
      gsap.set(image, { y: 40, scale: 0.98 });
      gsap.set(lotus, { y: 10, scale: 0.9 });

      // AUTO-PLAY entrance animation on page load
      const loadTl = gsap.timeline({ delay: 0.2 });
      loadTl.to(label, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
      loadTl.to(headline, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4');
      loadTl.to(caption, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');
      loadTl.to(image, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' }, '-=0.4');
      loadTl.to(lotus, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out' }, '-=0.5');
      loadTl.to(credit, { opacity: 0.5, duration: 0.5, ease: 'power2.out' }, '-=0.3');

      // Scroll-driven EXIT animation (pinned)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([label, headline, caption, image, credit, lotus], { opacity: 1, y: 0, scale: 1, x: 0 });
          },
        },
      });

      // EXIT phase (70%-100%): elements exit upward
      scrollTl.fromTo(
        headline,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        caption,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        image,
        { y: 0, scale: 1, opacity: 1 },
        { y: '-22vh', scale: 0.96, opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        label,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.8
      );
      scrollTl.fromTo(
        credit,
        { opacity: 0.5 },
        { opacity: 0, ease: 'power2.in' },
        0.8
      );
      scrollTl.fromTo(
        lotus,
        { opacity: 1, scale: 1 },
        { opacity: 0, scale: 0.8, ease: 'power2.in' },
        0.75
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="pinned-section" style={{ zIndex: 10 }}>
      {/* Mulan Easter Egg - subtle lotus */}
      <div
        ref={lotusRef}
        className="absolute top-[5vh] right-[8vw] lotus-easter-egg opacity-0"
        title="Reflection shows who you are inside"
      >
        <Flower2 size={20} strokeWidth={1.2} className="text-[#A02B8A]/30" />
      </div>

      {/* Label */}
      <div
        ref={labelRef}
        className="absolute top-[7vh] left-1/2 -translate-x-1/2 z-20"
      >
        <span className="micro-tag">Princesita English Academy</span>
      </div>

      {/* Headline */}
      <h1
        ref={headlineRef}
        className="absolute top-[14vh] left-1/2 -translate-x-1/2 z-20 font-serif font-500 text-[clamp(48px,6.8vw,104px)] leading-[0.95] tracking-[-0.01em] text-[#111111] text-center whitespace-nowrap"
      >
        Learn English
      </h1>

      {/* Caption */}
      <p
        ref={captionRef}
        className="absolute top-[26vh] left-1/2 -translate-x-1/2 z-20 text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.55] text-[#6E6A63] text-center max-w-[52ch] px-6"
      >
        Un camino moderno y tranquilo hacia la gramática, el vocabulario y la confianza para tu examen de escritura.
      </p>

      {/* Hero Image */}
      <img
        ref={imageRef}
        src="/images/hero_cover_study.jpg"
        alt="Estudiando inglés"
        className="hero-image absolute top-[54vh] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      />

      {/* Credit */}
      <div
        ref={creditRef}
        className="absolute bottom-[4vh] left-1/2 -translate-x-1/2 z-20"
      >
        <span className="font-mono text-[11px] text-[#6E6A63]/60">
          Para Rebeca — Tu momento de brillar
        </span>
      </div>
    </section>
  );
}
