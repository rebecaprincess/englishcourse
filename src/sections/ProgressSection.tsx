import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Flame, Target, Star, TrendingUp, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { label: 'Grammar Master', es: 'Maestra de Gramática', icon: Target, completed: true, progress: 100 },
  { label: 'Sentence Builder', es: 'Constructora de Oraciones', icon: Star, completed: true, progress: 100 },
  { label: 'Tense Expert', es: 'Experta en Tiempos', icon: TrendingUp, completed: false, progress: 75 },
  { label: 'Vocabulary Pro', es: 'Pro de Vocabulario', icon: Award, completed: false, progress: 60 },
  { label: 'Exam Ready', es: 'Lista para el Examen', icon: Trophy, completed: false, progress: 40 },
];

const weeklyProgress = [
  { day: 'Lun', minutes: 30 },
  { day: 'Mar', minutes: 45 },
  { day: 'Mié', minutes: 20 },
  { day: 'Jue', minutes: 60 },
  { day: 'Vie', minutes: 35 },
  { day: 'Sáb', minutes: 50 },
  { day: 'Dom', minutes: 15 },
];

export default function ProgressSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [streakDays] = useState(7);

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

      // ENTRANCE (0%-30%): image scales up
      scrollTl.fromTo(image, { scale: 0.92, opacity: 0, y: 40 }, { scale: 1, opacity: 1, y: 0, ease: 'none' }, 0);
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

  const totalMinutes = weeklyProgress.reduce((sum, d) => sum + d.minutes, 0);
  const maxMinutes = Math.max(...weeklyProgress.map((d) => d.minutes));

  return (
    <section ref={sectionRef} className="pinned-section" style={{ zIndex: 80 }}>
      {/* Badge Pills */}
      <div className="absolute left-[6%] top-[12%] z-30">
        <span className="pill flex items-center gap-1.5 bg-[#A02B8A]/10 text-[#A02B8A]">
          <Flame size={12} /> {streakDays}-day streak
        </span>
      </div>
      <div className="absolute right-[8%] bottom-[14%] z-30">
        <span className="pill flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200">
          <Target size={12} /> B1 Ready
        </span>
      </div>

      <div ref={labelRef} className="absolute top-[7vh] left-1/2 -translate-x-1/2 z-20 opacity-0">
        <span className="micro-tag">Milestones</span>
      </div>

      <h2
        ref={headlineRef}
        className="absolute top-[14vh] left-1/2 -translate-x-1/2 z-20 font-serif font-500 text-[clamp(42px,5vw,78px)] leading-[0.98] text-[#111111] text-center opacity-0"
      >
        Progress & Badges
      </h2>

      <p
        ref={captionRef}
        className="absolute top-[24vh] left-1/2 -translate-x-1/2 z-20 text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.55] text-[#6E6A63] text-center max-w-[48ch] px-6 opacity-0"
      >
        Pequeñas victorias, estadísticas claras y una racha que querrás mantener viva.
      </p>

      <img
        ref={imageRef}
        src="/images/badge_medal_paper.jpg"
        alt="Medalla de logro"
        className="hero-image absolute top-[52vh] left-[6vw] z-10 opacity-0"
        style={{ width: '34vw', maxWidth: '520px' }}
      />

      {/* Progress Dashboard */}
      <div
        ref={contentRef}
        className="absolute top-[14vh] right-[3vw] w-[48vw] max-w-[580px] z-20 opacity-0"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Trophy size={15} className="text-[#A02B8A]" strokeWidth={1.5} />
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#6E6A63]">
              Panel de Progreso
            </span>
          </div>

          {/* Weekly Activity */}
          <div className="mb-4 p-3 bg-[#F6F4EF] rounded-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-500 text-[#111111]">Actividad Semanal</span>
              <span className="text-[10px] text-[#6E6A63]">{totalMinutes} min total</span>
            </div>
            <div className="flex items-end gap-2 h-[60px]">
              {weeklyProgress.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-[#A02B8A] rounded-t-sm transition-all"
                    style={{ height: `${(d.minutes / maxMinutes) * 50}px`, opacity: d.minutes > 0 ? 0.7 + (d.minutes / maxMinutes) * 0.3 : 0.2 }}
                  />
                  <span className="text-[8px] text-[#6E6A63]">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div className="space-y-2 max-h-[30vh] overflow-y-auto pr-1">
            {milestones.map((m, i) => {
              const Icon = m.icon;
              return (
                <div key={i} className="flex items-center gap-3 p-2 bg-[#F6F4EF] rounded-md">
                  <div className={`p-1.5 rounded-full ${m.completed ? 'bg-[#A02B8A]/10' : 'bg-[#111111]/5'}`}>
                    <Icon size={14} className={m.completed ? 'text-[#A02B8A]' : 'text-[#6E6A63]'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-500 text-[#111111]">{m.label}</p>
                      <span className="text-[9px] text-[#6E6A63]">{m.progress}%</span>
                    </div>
                    <p className="text-[9px] text-[#6E6A63]">{m.es}</p>
                    <div className="progress-bar mt-1">
                      <div className="progress-bar-fill" style={{ width: `${m.progress}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
