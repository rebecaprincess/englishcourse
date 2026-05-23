import { useRef, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAuth } from '../contexts/AuthContext';
import {
  ArrowRight,
  PenLine,
  FileText,
  Languages,
  Target,
  ChevronRight,
  Sparkles,
  Crown,
  Sword,
  Flame,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const programModules = [
  {
    num: '01',
    title: 'Fundamentos',
    desc: 'Presentaciones, rutinas diarias, gramática básica. Desde cero hasta construir oraciones completas.',
    lessons: 3,
    icon: Sparkles,
  },
  {
    num: '02',
    title: 'Menarini & Pharma',
    desc: 'Vocabulario de la industria farmacéutica. Historia, áreas terapéuticas, portafolio de productos.',
    lessons: 3,
    icon: Crown,
  },
  {
    num: '03',
    title: 'SEO & Marketing',
    desc: 'Optimización para motores de búsqueda, estrategia de contenido, redes sociales y engagement.',
    lessons: 3,
    icon: Target,
  },
  {
    num: '04',
    title: 'Gramática B1',
    desc: 'Tiempos pasados, futuro, condicionales, voz pasiva. Todo lo necesario para el examen Cambridge.',
    lessons: 4,
    icon: Sword,
  },
  {
    num: '05',
    title: 'Escritura Profesional',
    desc: 'Emails formales, redacción de artículos, estrategias de examen y práctica guiada.',
    lessons: 3,
    icon: PenLine,
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const modulesRef = useRef<HTMLDivElement>(null);
  const examRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(
        '.hero-label',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 }
      );
      gsap.fromTo(
        '.hero-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.4 }
      );
      gsap.fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.6 }
      );
      gsap.fromTo(
        '.hero-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.8 }
      );
      gsap.fromTo(
        '.hero-image',
        { opacity: 0, scale: 0.97, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power2.out', delay: 0.5 }
      );

      // Section reveals
      const sections = [
        { ref: aboutRef, class: '.about-el' },
        { ref: modulesRef, class: '.module-el' },
        { ref: examRef, class: '.exam-el' },
        { ref: ctaRef, class: '.cta-el' },
      ];

      sections.forEach(({ ref, class: cls }) => {
        if (!ref.current) return;
        gsap.fromTo(
          ref.current.querySelectorAll(cls),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const handleStart = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="bg-[#F6F4EF]">
      {/* Decorative top accent — Imperial red + Disney gold */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-gradient-to-r from-[#C41E3A] via-[#FFD700] to-[#C41E3A]" />

      {/* Nav */}
      <nav className="fixed top-1 left-0 right-0 z-50 bg-[#F6F4EF]/80 backdrop-blur-md border-b border-[#111111]/5">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-serif text-lg font-semibold text-[#111111]">Princesita</span>
          <div className="hidden sm:flex items-center gap-8 text-sm text-[#6E6A63]">
            <a href="#programa" className="hover:text-[#111111] transition-colors">Programa</a>
            <a href="#evaluacion" className="hover:text-[#111111] transition-colors">Evaluación</a>
            <a href="#menarini" className="hover:text-[#111111] transition-colors">Menarini</a>
          </div>
          <button
            onClick={handleStart}
            className="text-sm bg-[#111111] text-[#F6F4EF] px-5 py-2 rounded-lg hover:bg-[#333] transition-colors"
          >
            {user ? 'Panel' : 'Comenzar'}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-10 relative overflow-hidden">
        {/* Floating corn easter eggs */}
        <div className="absolute top-28 left-8 text-2xl opacity-20 animate-bounce" style={{ animationDuration: '4s' }}>🌽</div>
        <div className="absolute bottom-40 right-10 text-3xl opacity-15 animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}>🌽</div>
        <div className="absolute top-1/2 right-[15%] text-xl opacity-10 animate-bounce" style={{ animationDuration: '6s', animationDelay: '0.5s' }}>🌽</div>

        <div className="text-center max-w-3xl mx-auto relative z-10">
          <p className="hero-label font-mono text-[11px] uppercase tracking-[0.2em] text-[#6E6A63] mb-6">
            English Academy — Para Rebeca
          </p>
          <h1 className="hero-title font-serif text-[clamp(48px,8vw,90px)] leading-[0.95] text-[#111111] mb-6">
            Domina el inglés
            <br />
            <span className="italic text-[#A02B8A]">como Mulan</span>
            <br />
            <span className="text-[#C41E3A]">dominó su destino</span>
          </h1>
          <p className="hero-subtitle text-[17px] text-[#6E6A63] leading-relaxed max-w-xl mx-auto mb-8">
            Un programa intensivo de gramática, vocabulario profesional y escritura,
            diseñado para tu posición como Jefa de Comunicación de Contenido en Menarini.
            <span className="block mt-2 text-sm italic text-[#A02B8A]/70">
              "Donde los sueños se hacen realidad... y el inglés también."
            </span>
          </p>
          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleStart}
              className="flex items-center gap-2 bg-[#111111] text-[#F6F4EF] px-8 py-3.5 rounded-xl text-[15px] font-medium hover:bg-[#333] transition-all"
            >
              {user ? 'Ir al panel' : 'Iniciar programa'} <ArrowRight size={16} />
            </button>
            <a href="#programa" className="text-[15px] text-[#6E6A63] hover:text-[#111111] transition-colors flex items-center gap-1">
              Ver contenido <ChevronRight size={14} />
            </a>
          </div>
        </div>

        <div className="hero-image mt-16 w-full max-w-4xl mx-auto relative">
          <img
            src="/images/hero_cover_study.jpg"
            alt="Estudiando"
            className="w-full aspect-[16/9] object-cover rounded-2xl shadow-lg"
          />
          {/* Hakuna Matata easter egg badge */}
          <div className="absolute -bottom-3 -right-3 bg-[#FFD700] text-[#111111] px-3 py-1.5 rounded-full text-[11px] font-semibold shadow-md flex items-center gap-1.5">
            <Flame size={12} />
            Hakuna Matata al aprender
          </div>
        </div>
      </section>

      {/* About / Context */}
      <section id="menarini" ref={aboutRef} className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="about-el font-mono text-[11px] uppercase tracking-[0.2em] text-[#005C3D] mb-4">
              Tu Contexto Profesional
            </p>
            <h2 className="about-el font-serif text-[clamp(32px,4vw,48px)] leading-tight text-[#111111] mb-6">
              Preparada para <span className="italic text-[#005C3D]">Menarini</span>
            </h2>
            <div className="space-y-4">
              <p className="about-el text-[15px] text-[#6E6A63] leading-relaxed">
                Menarini es una empresa farmacéutica italiana fundada en 1886 en Florencia.
                Opera en más de 140 países con más de 17,000 empleados, liderando áreas
                terapéuticas como cardiología, oncología y gastroenterología.
              </p>
              <p className="about-el text-[15px] text-[#6E6A63] leading-relaxed">
                Todo el vocabulario, ejemplos y ejercicios están contextualizados para tu
                rol: comunicación de contenido, SEO digital, gestión de equipos y la
                industria farmacéutica.
              </p>
              {/* Mulan easter egg */}
              <p className="about-el text-[13px] text-[#C41E3A] italic leading-relaxed border-l-2 border-[#C41E3A] pl-3">
                "Traer honor a la familia... y a tu equipo de contenido."
              </p>
            </div>
            <div className="about-el mt-8 grid grid-cols-3 gap-6">
              <div>
                <p className="text-3xl font-serif text-[#111111]">16</p>
                <p className="text-[11px] text-[#6E6A63]">lecciones</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-[#111111]">5</p>
                <p className="text-[11px] text-[#6E6A63]">módulos</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-[#111111]">B1</p>
                <p className="text-[11px] text-[#6E6A63]">objetivo</p>
              </div>
            </div>
          </div>
          <div className="about-el relative">
            <img
              src="/images/tenses_desk_scene.jpg"
              alt="Escritorio de trabajo"
              className="w-full aspect-[4/3] object-cover rounded-2xl shadow-md"
            />
            {/* Hidden elote easter egg */}
            <div className="absolute top-3 right-3 text-2xl opacity-30 rotate-12">🌽</div>
          </div>
        </div>
      </section>

      {/* Program */}
      <section id="programa" ref={modulesRef} className="py-24 px-6 bg-white relative overflow-hidden">
        {/* Subtle background pattern — Disney magic sparkles */}
        <div className="absolute top-10 right-10 text-[#FFD700]/20 text-6xl select-none">✦</div>
        <div className="absolute bottom-20 left-10 text-[#C41E3A]/10 text-5xl select-none">✦</div>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="module-el font-mono text-[11px] uppercase tracking-[0.2em] text-[#A02B8A] mb-4">
              Currículum
            </p>
            <h2 className="module-el font-serif text-[clamp(32px,4vw,48px)] leading-tight text-[#111111]">
              5 módulos para dominar el inglés
            </h2>
            <p className="module-el text-sm text-[#6E6A63] mt-3 max-w-lg mx-auto">
              Cada módulo es una batalla ganada en tu camino hacia el B1.
              <span className="italic text-[#C41E3A]"> "El guerrero más valiente eres tú."</span>
            </p>
          </div>
          <div className="space-y-4">
            {programModules.map((mod, i) => {
              const Icon = mod.icon;
              return (
                <div
                  key={i}
                  className="module-el flex items-start gap-6 p-6 rounded-2xl hover:bg-gray-50 transition-all cursor-pointer group"
                  onClick={handleStart}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#F6F4EF] flex items-center justify-center shrink-0 group-hover:bg-[#A02B8A]/10 transition-colors">
                    <Icon size={20} className="text-[#A02B8A]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[10px] font-mono text-[#6E6A63] uppercase tracking-wider">{mod.num}</span>
                      <h3 className="text-lg font-semibold text-[#111111]">{mod.title}</h3>
                      <span className="text-[10px] text-[#6E6A63] bg-gray-100 px-2 py-0.5 rounded-full">
                        {mod.lessons} lecciones
                      </span>
                    </div>
                    <p className="text-sm text-[#6E6A63] leading-relaxed">{mod.desc}</p>
                  </div>
                  <ArrowRight size={18} className="text-gray-300 group-hover:text-[#A02B8A] transition-colors shrink-0 mt-1" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Exam */}
      <section id="evaluacion" ref={examRef} className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="exam-el order-2 lg:order-1 relative">
            <img
              src="/images/exam_paper_highlighter.jpg"
              alt="Preparación de examen"
              className="w-full aspect-[4/3] object-cover rounded-2xl shadow-md"
            />
            {/* Reflection easter egg */}
            <div className="absolute -bottom-4 -left-4 bg-white border border-[#111111]/5 rounded-xl px-4 py-3 shadow-sm max-w-[200px]">
              <p className="text-[11px] text-[#6E6A63] italic leading-relaxed">
                "¿Quién es esa chica que veo? Reflejada en el examen B1..."
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="exam-el font-mono text-[11px] uppercase tracking-[0.2em] text-[#A02B8A] mb-4">
              Evaluación
            </p>
            <h2 className="exam-el font-serif text-[clamp(32px,4vw,48px)] leading-tight text-[#111111] mb-6">
              Preparación para el <span className="italic">Cambridge B1</span>
            </h2>
            <div className="space-y-4">
              <p className="exam-el text-[15px] text-[#6E6A63] leading-relaxed">
                Cada módulo incluye ejercicios prácticos, tests de evaluación y exámenes
                simulados. Practica escritura con prompts reales, recibe retroalimentación
                instantánea y mide tu progreso hacia el nivel B1.
              </p>
            </div>
            <div className="exam-el mt-8 space-y-3">
              {[
                { icon: FileText, text: 'Tests de gramática con corrección inmediata' },
                { icon: PenLine, text: 'Ejercicios de escritura con respuestas modelo' },
                { icon: Languages, text: '40+ términos de vocabulario SEO y farmacéutico' },
                { icon: Target, text: 'Simulacros de examen Cambridge B1 First' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#A02B8A]/10 flex items-center justify-center shrink-0">
                      <Icon size={14} className="text-[#A02B8A]" />
                    </div>
                    <p className="text-sm text-[#111111]">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section ref={ctaRef} className="py-32 px-6 bg-[#111111] relative overflow-hidden">
        {/* Golden sparkles */}
        <div className="absolute top-10 left-[10%] text-[#FFD700]/20 text-4xl animate-pulse">✦</div>
        <div className="absolute top-20 right-[15%] text-[#FFD700]/15 text-3xl animate-pulse" style={{ animationDelay: '1s' }}>✦</div>
        <div className="absolute bottom-16 left-[20%] text-[#C41E3A]/20 text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>🌽</div>

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="cta-el font-serif text-[clamp(32px,5vw,56px)] leading-tight text-[#F6F4EF] mb-6">
            Empieza hoy.
            <br />
            <span className="italic text-[#A02B8A]">Un paso a la vez.</span>
          </h2>
          <p className="cta-el text-[15px] text-[#F6F4EF]/50 leading-relaxed mb-10 max-w-md mx-auto">
            Gramática, vocabulario profesional y escritura. Todo contextualizado
            para tu rol en Menarini.
          </p>
          <div className="cta-el">
            <button
              onClick={handleStart}
              className="inline-flex items-center gap-2 bg-[#F6F4EF] text-[#111111] px-10 py-4 rounded-xl text-[16px] font-medium hover:bg-white transition-colors"
            >
              {user ? 'Continuar aprendiendo' : 'Comenzar a aprender'} <ArrowRight size={18} />
            </button>
          </div>
          <p className="cta-el mt-8 text-[11px] text-[#F6F4EF]/20 font-mono">
            Para mi princesita — El momento de brillar en Menarini
          </p>
          <p className="cta-el mt-2 text-[10px] text-[#F6F4EF]/15 italic">
            "El honor de la familia está en tus manos... y también tu inglés."
          </p>
        </div>
      </section>
    </div>
  );
}
