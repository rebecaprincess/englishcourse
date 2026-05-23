import { useRef, useLayoutEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PenLine, Eraser, Download, Undo } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const writingPrompts = [
  {
    title: 'Self Introduction',
    esTitle: 'Presentación Personal',
    prompt: 'Write a short paragraph (80-100 words) introducing yourself for your new role at Menarini. Mention your background, your team, and your goals.',
    hint: 'Use: My name is... / I am responsible for... / My team includes... / I look forward to...',
  },
  {
    title: 'Email to Team',
    esTitle: 'Email al Equipo',
    prompt: 'Write an email (100-120 words) to your team (web master, designer) about a new content project deadline.',
    hint: 'Use: Dear team, / I would like to inform you... / The deadline is... / Please let me know... / Best regards,',
  },
  {
    title: 'SEO Report',
    esTitle: 'Reporte de SEO',
    prompt: 'Write a brief report (120-150 words) about the website SEO performance and recommendations.',
    hint: 'Use: The current SEO performance... / We have observed... / Our recommendations include... / We expect...',
  },
  {
    title: 'Meeting Summary',
    esTitle: 'Resumen de Reunión',
    prompt: 'Write a meeting summary (100-130 words) with your team about the content strategy for next quarter.',
    hint: 'Use: Attendees:... / The main points discussed were... / Action items:... / Next meeting:...',
  },
];

export default function WritingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activePrompt, setActivePrompt] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasData, setCanvasData] = useState<ImageData | null>(null);

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

  // Canvas drawing functions
  const getCanvasContext = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext('2d');
  }, []);

  const startDrawing = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const ctx = getCanvasContext();
    if (!ctx) return;
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = '#111111';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    setIsDrawing(true);
  }, [getCanvasContext]);

  const draw = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const ctx = getCanvasContext();
    if (!ctx) return;
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    ctx.lineTo(x, y);
    ctx.stroke();
  }, [isDrawing, getCanvasContext]);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
    const ctx = getCanvasContext();
    const canvas = canvasRef.current;
    if (ctx && canvas) {
      setCanvasData(ctx.getImageData(0, 0, canvas.width, canvas.height));
    }
  }, [getCanvasContext]);

  const clearCanvas = useCallback(() => {
    const ctx = getCanvasContext();
    const canvas = canvasRef.current;
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setCanvasData(null);
    }
  }, [getCanvasContext]);

  const undoLast = useCallback(() => {
    const ctx = getCanvasContext();
    const canvas = canvasRef.current;
    if (ctx && canvas && canvasData) {
      ctx.putImageData(canvasData, 0, 0);
    }
  }, [getCanvasContext, canvasData]);

  const downloadCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `princesita-writing-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  }, []);

  const prompt = writingPrompts[activePrompt];

  return (
    <section ref={sectionRef} id="writing" className="pinned-section" style={{ zIndex: 70 }}>
      <div ref={labelRef} className="absolute top-[7vh] left-1/2 -translate-x-1/2 z-20 opacity-0">
        <span className="micro-tag">Práctica</span>
      </div>

      <h2
        ref={headlineRef}
        className="absolute top-[14vh] left-1/2 -translate-x-1/2 z-20 font-serif font-500 text-[clamp(42px,5vw,78px)] leading-[0.98] text-[#111111] text-center opacity-0"
      >
        Writing Practice
      </h2>

      <p
        ref={captionRef}
        className="absolute top-[24vh] left-1/2 -translate-x-1/2 z-20 text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.55] text-[#6E6A63] text-center max-w-[48ch] px-6 opacity-0"
      >
        Prompts diarios, respuestas modelo y práctica con tu Apple Pencil.
      </p>

      <img
        ref={imageRef}
        src="/images/writing_hand_pen.jpg"
        alt="Práctica de escritura"
        className="hero-image absolute top-[52vh] left-[5vw] z-10 opacity-0"
        style={{ width: '34vw', maxWidth: '520px' }}
      />

      {/* Writing Panel */}
      <div
        ref={contentRef}
        className="absolute top-[14vh] right-[3vw] w-[50vw] max-w-[600px] z-20 opacity-0"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <PenLine size={15} className="text-[#A02B8A]" strokeWidth={1.5} />
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#6E6A63]">
                Práctica de Escritura
              </span>
            </div>
            <div className="flex gap-1">
              <button onClick={undoLast} className="p-1.5 rounded hover:bg-[#F6F4EF] text-[#6E6A63]" title="Deshacer">
                <Undo size={13} />
              </button>
              <button onClick={clearCanvas} className="p-1.5 rounded hover:bg-[#F6F4EF] text-[#6E6A63]" title="Borrar">
                <Eraser size={13} />
              </button>
              <button onClick={downloadCanvas} className="p-1.5 rounded hover:bg-[#F6F4EF] text-[#6E6A63]" title="Descargar">
                <Download size={13} />
              </button>
            </div>
          </div>

          {/* Prompt Selector */}
          <div className="flex gap-1 mb-3">
            {writingPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => setActivePrompt(i)}
                className={`px-2 py-1 rounded text-[9px] font-mono uppercase transition-all ${
                  activePrompt === i
                    ? 'bg-[#A02B8A] text-white'
                    : 'bg-[#F6F4EF] text-[#6E6A63]'
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>

          {/* Prompt */}
          <div className="p-3 bg-[#F6F4EF] rounded-md mb-3">
            <p className="text-[11px] font-500 text-[#111111] mb-1">{prompt.title}</p>
            <p className="text-[10px] text-[#6E6A63] italic mb-1.5">{prompt.esTitle}</p>
            <p className="text-[11px] text-[#111111] leading-relaxed mb-2">{prompt.prompt}</p>
            <p className="text-[10px] text-[#A02B8A]">{prompt.hint}</p>
          </div>

          {/* Canvas for writing */}
          <div className="relative border-2 border-dashed border-[#111111]/15 rounded-md overflow-hidden bg-white">
            <canvas
              ref={canvasRef}
              width={560}
              height={200}
              className="writing-canvas w-full"
              style={{ height: '160px', touchAction: 'none' }}
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
            {!canvasData && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-[11px] text-[#6E6A63]/40">Escribe aquí con tu dedo o Apple Pencil</p>
              </div>
            )}
          </div>

          <p className="text-[9px] text-[#6E6A63]/50 mt-2 text-center">
            Compatible con Apple Pencil y entrada táctil
          </p>
        </div>
      </div>
    </section>
  );
}
