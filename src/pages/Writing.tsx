import { useState, useRef, useCallback } from 'react';
import { PenLine, Eraser, Download, Undo, Eye, EyeOff, Lightbulb } from 'lucide-react';
import { writingPrompts } from '../data/lessons';

export default function Writing() {
  const [activePrompt, setActivePrompt] = useState(0);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [showModel, setShowModel] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasHistory, setCanvasHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const prompt = writingPrompts[activePrompt];
  const wordCount = typedAnswer.trim().split(/\s+/).filter(Boolean).length;
  const targetWords = prompt.wordCount.split('-').map((n) => parseInt(n));
  const wordProgress = targetWords[0] ? Math.min(100, (wordCount / targetWords[0]) * 100) : 0;

  const handleTypedChange = (text: string) => {
    setTypedAnswer(text);
  };

  // Canvas
  const getCtx = useCallback(() => canvasRef.current?.getContext('2d'), []);

  const saveCanvasState = () => {
    const ctx = getCtx();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setCanvasHistory((prev) => {
      const next = prev.slice(0, historyIndex + 1);
      next.push(data);
      return next;
    });
    setHistoryIndex((i) => i + 1);
  };

  const startDrawing = (e: React.PointerEvent) => {
    const ctx = getCtx();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    setIsDrawing(true);
  };

  const draw = (e: React.PointerEvent) => {
    if (!isDrawing) return;
    const ctx = getCtx();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveCanvasState();
    }
  };

  const clearCanvas = () => {
    const ctx = getCtx();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasHistory([]);
    setHistoryIndex(-1);
  };

  const undoCanvas = () => {
    if (historyIndex <= 0) {
      clearCanvas();
      return;
    }
    const ctx = getCtx();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    const prevIndex = historyIndex - 1;
    if (canvasHistory[prevIndex]) {
      ctx.putImageData(canvasHistory[prevIndex], 0, 0);
    }
    setHistoryIndex(prevIndex);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `writing-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="space-y-5 max-w-[800px] mx-auto">
      <div>
        <h1 className="text-2xl font-serif font-semibold text-[#111111]">Práctica de Escritura</h1>
        <p className="text-sm text-[#6E6A63] mt-1">Ejercicios de escritura para el examen B1 First</p>
      </div>

      {/* Prompt Selector */}
      <div className="flex flex-wrap gap-1.5">
        {writingPrompts.map((p, i) => (
          <button
            key={p.id}
            onClick={() => {
              setActivePrompt(i);
              setTypedAnswer('');
              setShowModel(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activePrompt === i ? 'bg-[#111111] text-white' : 'bg-white text-[#6E6A63] border border-[#111111]/5 hover:bg-gray-50'
            }`}
          >
            {p.titleEs}
          </button>
        ))}
      </div>

      {/* Prompt Card */}
      <div className="bg-white rounded-xl border border-[#111111]/5 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb size={14} className="text-[#A02B8A]" />
          <span className="text-[10px] font-semibold text-[#6E6A63] uppercase tracking-wider">{prompt.type.toUpperCase()}</span>
          <span className="text-[10px] text-[#6E6A63] ml-auto">{prompt.wordCount}</span>
        </div>
        <p className="text-sm text-[#111111] leading-relaxed mb-1">{prompt.prompt}</p>
        <p className="text-xs text-[#6E6A63] mb-3">{prompt.promptEs}</p>
        <div className="flex flex-wrap gap-1">
          {prompt.keywords.map((kw) => (
            <span key={kw} className="word-chip">{kw}</span>
          ))}
        </div>
        {prompt.modelAnswer && (
          <button
            onClick={() => setShowModel(!showModel)}
            className="mt-3 flex items-center gap-1.5 text-xs text-[#A02B8A] hover:underline"
          >
            {showModel ? <EyeOff size={11} /> : <Eye size={11} />}
            {showModel ? 'Ocultar modelo' : 'Ver respuesta modelo'}
          </button>
        )}
        {showModel && prompt.modelAnswer && (
          <div className="mt-3 p-4 bg-gray-50 rounded-xl text-xs text-[#111111]/70 leading-relaxed whitespace-pre-line">
            {prompt.modelAnswer}
          </div>
        )}
      </div>

      {/* Writing Area */}
      <div className="bg-white rounded-xl border border-[#111111]/5 p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <PenLine size={14} className="text-[#111111]" />
            <span className="text-sm font-medium text-[#111111]">Tu respuesta</span>
            <span className="text-[10px] text-[#6E6A63]">({wordCount} palabras)</span>
          </div>
          <div className="flex gap-1">
            <button onClick={undoCanvas} className="p-1.5 rounded-lg hover:bg-gray-100" title="Deshacer">
              <Undo size={12} className="text-gray-400" />
            </button>
            <button onClick={clearCanvas} className="p-1.5 rounded-lg hover:bg-gray-100" title="Borrar">
              <Eraser size={12} className="text-gray-400" />
            </button>
            <button onClick={downloadCanvas} className="p-1.5 rounded-lg hover:bg-gray-100" title="Descargar">
              <Download size={12} className="text-gray-400" />
            </button>
          </div>
        </div>

        <div className="h-1 bg-gray-100 rounded-full mb-3 overflow-hidden">
          <div className="h-full bg-[#111111] rounded-full transition-all" style={{ width: `${wordProgress}%` }} />
        </div>

        <textarea
          value={typedAnswer}
          onChange={(e) => handleTypedChange(e.target.value)}
          placeholder="Escribe tu respuesta aquí..."
          className="w-full h-28 p-3 bg-gray-50 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#111111]/10 mb-3"
        />

        <div className="border-2 border-dashed border-gray-200 rounded-xl overflow-hidden bg-white relative">
          <canvas
            ref={canvasRef}
            width={760}
            height={220}
            className="writing-canvas w-full"
            style={{ height: '180px', touchAction: 'none' }}
            onPointerDown={startDrawing}
            onPointerMove={draw}
            onPointerUp={stopDrawing}
            onPointerLeave={stopDrawing}
          />
          {canvasHistory.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-[11px] text-gray-300">Escribe aquí con Apple Pencil o dedo</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
