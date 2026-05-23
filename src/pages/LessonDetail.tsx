import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, CheckCircle2, XCircle, Volume2, Lightbulb, ChevronRight, RotateCcw } from 'lucide-react';
import { modules } from '../data/lessons';
import { useProgress } from '../hooks/useProgress';

export default function LessonDetail() {
  const { id } = useParams<{ id: string }>();
  const { completeLesson, completeExercise } = useProgress();
  const [currentStep, setCurrentStep] = useState<'theory' | 'exercise' | 'result'>('theory');
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [orderedWords, setOrderedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);

  // Find lesson
  let lesson = null;
  let moduleColor = '#111111';
  let moduleTitle = '';
  for (const mod of modules) {
    const found = mod.lessons.find((l) => l.id === id);
    if (found) {
      lesson = found;
      moduleColor = mod.color;
      moduleTitle = mod.titleEs;
      break;
    }
  }

  if (!lesson) {
    return (
      <div className="text-center py-20">
        <p className="text-[#6E6A63]">Lección no encontrada</p>
        <Link to="/lecciones" className="text-sm text-[#A02B8A] mt-2 inline-block hover:underline">
          Volver a lecciones
        </Link>
      </div>
    );
  }

  const exercise = lesson.exercises[currentExIndex];
  const totalExercises = lesson.exercises.length;
  const progress = currentStep === 'theory' ? 5 : currentStep === 'result' ? 100 : ((currentExIndex + 1) / totalExercises) * 100;

  const handleCheck = () => {
    if (!selectedAnswer && orderedWords.length === 0) return;
    let answer = selectedAnswer || orderedWords.join(' ');
    const isCorrect = answer.toLowerCase().trim() === exercise.correctAnswer.toLowerCase().trim();
    if (isCorrect) {
      setCorrectCount((c) => c + 1);
      completeExercise(exercise.id);
    }
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentExIndex < totalExercises - 1) {
      setCurrentExIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setOrderedWords([]);
      setAvailableWords([]);
    } else {
      setCurrentStep('result');
      completeLesson(lesson.id, lesson.xp);
    }
  };

  const startExercises = () => {
    setCurrentStep('exercise');
    if (exercise.type === 'order-words' && exercise.options) {
      setAvailableWords([...exercise.options].sort(() => Math.random() - 0.5));
    }
  };

  const resetExercise = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setOrderedWords([]);
    if (exercise.type === 'order-words' && exercise.options) {
      setAvailableWords([...exercise.options].sort(() => Math.random() - 0.5));
    }
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-5 max-w-[700px] mx-auto">
      {/* Back + Progress */}
      <div className="flex items-center gap-3">
        <Link
          to="/lecciones"
          className="w-8 h-8 rounded-lg bg-white border border-[#111111]/5 flex items-center justify-center hover:bg-gray-50 shrink-0"
        >
          <ArrowLeft size={15} />
        </Link>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-[#6E6A63]">
              {currentStep === 'theory' ? 'Teoría' : currentStep === 'result' ? 'Resultado' : `Ejercicio ${currentExIndex + 1}/${totalExercises}`}
            </span>
            <span className="text-[10px] text-[#6E6A63]">{moduleTitle}</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${progress}%`, backgroundColor: moduleColor }}
            />
          </div>
        </div>
      </div>

      {/* THEORY */}
      {currentStep === 'theory' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-[#111111]/5 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${moduleColor}15` }}>
                <Lightbulb size={15} style={{ color: moduleColor }} />
              </div>
              <div>
                <h1 className="text-base font-semibold text-[#111111]">{lesson.title}</h1>
                <p className="text-[11px] text-[#6E6A63]">{lesson.titleEs}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: `${moduleColor}08` }}>
              <p className="text-sm text-[#111111] leading-relaxed mb-2">{lesson.content.theory}</p>
              <p className="text-xs text-[#6E6A63] leading-relaxed">{lesson.content.theoryEs}</p>
            </div>

            {/* Keywords */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {lesson.content.keywords.map((kw) => (
                <button key={kw} onClick={() => speak(kw)} className="word-chip hover:bg-gray-100 transition-colors">
                  {kw} <Volume2 size={9} className="text-gray-400" />
                </button>
              ))}
            </div>

            {/* Examples */}
            <div className="space-y-2">
              <p className="text-[10px] font-semibold text-[#6E6A63] uppercase tracking-wider">Ejemplos</p>
              {lesson.content.examples.map((ex, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <button onClick={() => speak(ex.en)} className="mt-0.5 shrink-0">
                      <Volume2 size={12} className="text-[#A02B8A]" />
                    </button>
                    <div>
                      <p className="text-xs text-[#111111] leading-relaxed">{ex.en}</p>
                      <p className="text-[10px] text-[#6E6A63] italic">{ex.es}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={startExercises}
            className="w-full py-3 rounded-xl text-white text-sm font-medium hover:opacity-90 transition-opacity"
            style={{ backgroundColor: moduleColor }}
          >
            Empezar ejercicios <ChevronRight size={14} className="inline" />
          </button>
        </div>
      )}

      {/* EXERCISE */}
      {currentStep === 'exercise' && exercise && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-[#111111]/5 p-5">
            <p className="text-[11px] text-[#6E6A63] mb-1">{exercise.questionEs}</p>
            <p className="text-sm font-medium text-[#111111] leading-relaxed mb-4">{exercise.question}</p>

            {/* Multiple Choice / Fill Blank */}
            {(exercise.type === 'multiple-choice' || exercise.type === 'fill-blank') && exercise.options && (
              <div className="space-y-2">
                {exercise.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => !showFeedback && setSelectedAnswer(opt)}
                    disabled={showFeedback}
                    className={`exercise-option ${
                      showFeedback
                        ? opt === exercise.correctAnswer
                          ? 'correct'
                          : opt === selectedAnswer
                          ? 'incorrect'
                          : ''
                        : opt === selectedAnswer
                        ? 'selected'
                        : ''
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* True/False */}
            {exercise.type === 'true-false' && exercise.options && (
              <div className="grid grid-cols-2 gap-3">
                {exercise.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => !showFeedback && setSelectedAnswer(opt)}
                    disabled={showFeedback}
                    className={`exercise-option text-center ${
                      showFeedback
                        ? opt === exercise.correctAnswer
                          ? 'correct'
                          : opt === selectedAnswer
                          ? 'incorrect'
                          : ''
                        : opt === selectedAnswer
                        ? 'selected'
                        : ''
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Order Words */}
            {exercise.type === 'order-words' && (
              <div className="space-y-3">
                <div className="min-h-[44px] p-3 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex flex-wrap gap-1.5">
                  {orderedWords.length === 0 ? (
                    <span className="text-xs text-gray-400">Haz clic en las palabras en orden</span>
                  ) : (
                    orderedWords.map((w, i) => (
                      <span key={`${w}-${i}`} className="px-2 py-1 bg-white rounded-md text-xs font-medium border shadow-sm">
                        {w}
                      </span>
                    ))
                  )}
                </div>

                {!showFeedback && (
                  <div className="flex flex-wrap gap-1.5">
                    {availableWords.map((word, i) => (
                      <button
                        key={`${word}-${i}`}
                        onClick={() => {
                          setOrderedWords((prev) => [...prev, word]);
                          setAvailableWords((prev) => prev.filter((_, idx) => idx !== i));
                        }}
                        className="px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg text-xs transition-all"
                      >
                        {word}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Feedback */}
            {showFeedback && (
              <div
                className={`mt-4 p-3 rounded-lg flex items-start gap-2 ${
                  (selectedAnswer || orderedWords.join(' ')).toLowerCase().trim() === exercise.correctAnswer.toLowerCase().trim()
                    ? 'bg-emerald-50 border border-emerald-200'
                    : 'bg-red-50 border border-red-200'
                }`}
              >
                {(selectedAnswer || orderedWords.join(' ')).toLowerCase().trim() === exercise.correctAnswer.toLowerCase().trim() ? (
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle size={15} className="text-red-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="text-xs font-medium text-[#111111]">
                    {(selectedAnswer || orderedWords.join(' ')).toLowerCase().trim() === exercise.correctAnswer.toLowerCase().trim()
                      ? 'Correcto'
                      : `Respuesta: ${exercise.correctAnswer}`}
                  </p>
                  <p className="text-[10px] text-[#6E6A63] mt-0.5">{exercise.explanationEs}</p>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {!showFeedback ? (
              <>
                <button
                  onClick={resetExercise}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gray-100 text-[#111111] text-xs hover:bg-gray-200 transition-colors"
                >
                  <RotateCcw size={12} /> Reiniciar
                </button>
                <button
                  onClick={handleCheck}
                  disabled={!selectedAnswer && orderedWords.length === 0}
                  className="flex-1 py-2.5 rounded-xl bg-[#111111] text-white text-xs font-medium hover:bg-[#333] transition-colors disabled:opacity-30"
                >
                  Comprobar
                </button>
              </>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 py-2.5 rounded-xl bg-[#111111] text-white text-xs font-medium hover:bg-[#333] transition-colors"
              >
                {currentExIndex < totalExercises - 1 ? 'Siguiente' : 'Ver resultado'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* RESULT */}
      {currentStep === 'result' && (
        <div className="bg-white rounded-xl border border-[#111111]/5 p-6 text-center">
          <h2 className="text-lg font-serif font-semibold text-[#111111] mb-1">Lección completada</h2>
          <p className="text-xs text-[#6E6A63] mb-6">{lesson.title}</p>

          <div className="mb-6">
            <p className="text-4xl font-serif font-semibold text-[#111111] mb-1">
              {correctCount}/{totalExercises}
            </p>
            <p className="text-xs text-[#6E6A63]">respuestas correctas</p>
          </div>

          <Link
            to="/lecciones"
            className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-[#111111] text-white rounded-xl text-xs font-medium hover:bg-[#333] transition-colors"
          >
            Continuar <ChevronRight size={12} />
          </Link>
        </div>
      )}
    </div>
  );
}
