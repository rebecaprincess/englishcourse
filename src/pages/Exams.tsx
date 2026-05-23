import { useState } from 'react';
import { FileCheck, CheckCircle2, XCircle, ArrowRight, RotateCcw, Clock, AlertCircle } from 'lucide-react';

interface ExamQuestion {
  id: string;
  question: string;
  questionEs: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  explanationEs: string;
  category: string;
}

interface Exam {
  id: string;
  title: string;
  titleEs: string;
  description: string;
  level: string;
  duration: number;
  questionCount: number;
  questions: ExamQuestion[];
  completed: boolean;
  score: number | null;
}

const grammarExam: Exam = {
  id: 'exam-grammar-1',
  title: 'Grammar Assessment A2→B1',
  titleEs: 'Evaluación de Gramática A2→B1',
  description: 'Test de gramática cubriendo presente, pasado, futuro y estructuras básicas.',
  level: 'A2-B1',
  duration: 20,
  questionCount: 8,
  completed: false,
  score: null,
  questions: [
    {
      id: 'q1',
      question: 'She ______ (work) as a content manager at Menarini.',
      questionEs: 'Completa con la forma correcta del verbo en presente.',
      options: ['work', 'works', 'working', 'worked'],
      correctAnswer: 'works',
      explanation: 'Third person singular adds -s to the verb in Present Simple.',
      explanationEs: 'La tercera persona del singular añade -s al verbo en Presente Simple.',
      category: 'Present Simple',
    },
    {
      id: 'q2',
      question: 'Menarini was ______ in Florence in 1886.',
      questionEs: 'Usa la voz pasiva correcta.',
      options: ['founded', 'found', 'founds', 'founding'],
      correctAnswer: 'founded',
      explanation: 'Past passive: was/were + past participle. "Founded" is the past participle of "found".',
      explanationEs: 'Pasado pasivo: was/were + participio pasado.',
      category: 'Passive Voice',
    },
    {
      id: 'q3',
      question: 'If I ______ (be) the manager, I would hire more designers.',
      questionEs: 'Segundo condicional: elige la forma correcta de "be".',
      options: ['am', 'were', 'was', 'be'],
      correctAnswer: 'were',
      explanation: 'In Second Conditional, use "were" for all persons (I/he/she/it were).',
      explanationEs: 'En el Segundo Condicional, usa "were" para todas las personas.',
      category: 'Conditionals',
    },
    {
      id: 'q4',
      question: 'We ______ (launch) the new SEO strategy next month.',
      questionEs: 'Elige la forma de futuro correcta para un plan.',
      options: ['will launch', 'are going to launch', 'launch', 'launched'],
      correctAnswer: 'are going to launch',
      explanation: '"Going to" is used for planned intentions and predictions with evidence.',
      explanationEs: '"Going to" se usa para intenciones planificadas.',
      category: 'Future Forms',
    },
    {
      id: 'q5',
      question: 'I ______ (finish) the report before the meeting started.',
      questionEs: 'Elige el tiempo correcto para una acción completada antes de otra en el pasado.',
      options: ['finished', 'have finished', 'had finished', 'was finishing'],
      correctAnswer: 'had finished',
      explanation: 'Past Perfect (had + past participle) for an action completed before another past action.',
      explanationEs: 'Pasado Perfecto para una acción completada antes de otra en el pasado.',
      category: 'Past Perfect',
    },
    {
      id: 'q6',
      question: 'The content team ______ every Monday at 9 AM.',
      questionEs: 'Presente simple para rutinas.',
      options: ['meet', 'meets', 'meeting', 'is meeting'],
      correctAnswer: 'meets',
      explanation: 'Third person singular (the team = it) takes -s in Present Simple for routines.',
      explanationEs: 'La tercera persona singular lleva -s en Presente Simple.',
      category: 'Present Simple',
    },
    {
      id: 'q7',
      question: '"Our organic traffic has increased by 35%" is an example of:',
      questionEs: '"Nuestro tráfico orgánico ha aumentado un 35%" es un ejemplo de:',
      options: ['Present Simple', 'Past Simple', 'Present Perfect', 'Future Simple'],
      correctAnswer: 'Present Perfect',
      explanation: '"Has increased" = have/has + past participle. Used for actions with present relevance.',
      explanationEs: '"Has increased" = have/has + participio pasado. Se usa para acciones con relevancia presente.',
      category: 'Present Perfect',
    },
    {
      id: 'q8',
      question: 'Complete: ______ you have any questions, please let me know.',
      questionEs: 'Completa la frase formal con la conjunción correcta.',
      options: ['If', 'Although', 'Unless', 'Because'],
      correctAnswer: 'If',
      explanation: '"If" introduces a condition. This is a polite conditional request common in professional emails.',
      explanationEs: '"If" introduce una condición. Muy común en emails profesionales.',
      category: 'Conditionals',
    },
  ],
};

export default function Exams() {
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [examFinished, setExamFinished] = useState(false);

  const startExam = (exam: Exam) => {
    setActiveExam(exam);
    setCurrentQIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setAnswers({});
    setExamFinished(false);
  };

  const checkAnswer = () => {
    if (!selectedAnswer || !activeExam) return;
    setShowFeedback(true);
    setAnswers((prev) => ({ ...prev, [activeExam.questions[currentQIndex].id]: selectedAnswer }));
  };

  const nextQuestion = () => {
    if (!activeExam) return;
    if (currentQIndex < activeExam.questions.length - 1) {
      setCurrentQIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setExamFinished(true);
    }
  };

  const resetExam = () => {
    setActiveExam(null);
    setCurrentQIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setAnswers({});
    setExamFinished(false);
  };

  const calculateScore = () => {
    if (!activeExam) return 0;
    let correct = 0;
    activeExam.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    return correct;
  };

  // Exam list view
  if (!activeExam) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-serif font-semibold text-[#111111]">Evaluaciones</h1>
          <p className="text-sm text-[#6E6A63] mt-1">
            Tests y exámenes para medir tu progreso hacia el nivel B1
          </p>
        </div>

        <div className="space-y-3">
          {/* Grammar Test */}
          <div className="bg-white rounded-xl border border-[#111111]/5 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#DC2626]/10 flex items-center justify-center shrink-0">
                  <FileCheck size={18} className="text-[#DC2626]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#111111]">{grammarExam.title}</h3>
                  <p className="text-xs text-[#6E6A63]">{grammarExam.titleEs}</p>
                  <p className="text-[11px] text-[#6E6A63] mt-1 max-w-md">{grammarExam.description}</p>
                </div>
              </div>
              <span className="text-[10px] bg-gray-100 text-[#6E6A63] px-2 py-0.5 rounded-full shrink-0">
                {grammarExam.level}
              </span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[10px] text-[#6E6A63] flex items-center gap-1">
                <Clock size={10} /> {grammarExam.duration} min
              </span>
              <span className="text-[10px] text-[#6E6A63]">{grammarExam.questionCount} preguntas</span>
            </div>
            <button
              onClick={() => startExam(grammarExam)}
              className="inline-flex items-center gap-1.5 bg-[#111111] text-white px-5 py-2 rounded-lg text-[12px] font-medium hover:bg-[#333] transition-colors"
            >
              Comenzar test <ArrowRight size={12} />
            </button>
          </div>

          {/* Placeholder for future exams */}
          <div className="bg-white rounded-xl border border-[#111111]/5 p-5 opacity-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 flex items-center justify-center shrink-0">
                <FileCheck size={18} className="text-[#2563EB]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#111111]">Vocabulary Assessment</h3>
                <p className="text-xs text-[#6E6A63]">Evaluación de vocabulario SEO y farmacéutico</p>
              </div>
              <div className="ml-auto">
                <span className="text-[10px] bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <AlertCircle size={8} /> Próximamente
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#111111]/5 p-5 opacity-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#005C3D]/10 flex items-center justify-center shrink-0">
                <FileCheck size={18} className="text-[#005C3D]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#111111]">Writing Exam B1 Simulation</h3>
                <p className="text-xs text-[#6E6A63]">Simulacro de examen de escritura Cambridge B1</p>
              </div>
              <div className="ml-auto">
                <span className="text-[10px] bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <AlertCircle size={8} /> Próximamente
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Exam finished view
  if (examFinished) {
    const score = calculateScore();
    const total = activeExam.questions.length;
    const percentage = Math.round((score / total) * 100);

    return (
      <div className="max-w-[600px] mx-auto">
        <div className="bg-white rounded-xl border border-[#111111]/5 p-6 text-center">
          <h2 className="text-lg font-serif font-semibold text-[#111111] mb-1">Test completado</h2>
          <p className="text-xs text-[#6E6A63] mb-6">{activeExam.title}</p>

          <div className="mb-6">
            <p className="text-5xl font-serif font-semibold text-[#111111] mb-2">
              {score}/{total}
            </p>
            <div className="w-32 h-1.5 bg-gray-100 rounded-full mx-auto overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: percentage >= 70 ? '#10b981' : percentage >= 50 ? '#f59e0b' : '#DC2626',
                }}
              />
            </div>
            <p className="text-[11px] text-[#6E6A63] mt-2">{percentage}% correcto</p>
          </div>

          {/* Review answers */}
          <div className="text-left space-y-3 mb-6">
            {activeExam.questions.map((q, i) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.correctAnswer;
              return (
                <div key={q.id} className={`p-3 rounded-lg ${isCorrect ? 'bg-emerald-50' : 'bg-red-50'}`}>
                  <div className="flex items-start gap-2">
                    {isCorrect ? (
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle size={14} className="text-red-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="text-[11px] font-medium text-[#111111]">
                        {i + 1}. {q.question}
                      </p>
                      <p className="text-[10px] text-[#6E6A63]">
                        Tu respuesta: <span className={isCorrect ? 'text-emerald-600' : 'text-red-500'}>{userAnswer}</span>
                        {!isCorrect && (
                          <span className="text-emerald-600"> · Correcta: {q.correctAnswer}</span>
                        )}
                      </p>
                      <p className="text-[10px] text-[#6E6A63] mt-0.5">{q.explanationEs}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={resetExam}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-gray-100 text-[#111111] rounded-lg text-[12px] font-medium hover:bg-gray-200 transition-colors"
            >
              <RotateCcw size={13} /> Repetir test
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active exam view
  const question = activeExam.questions[currentQIndex];
  const qNum = currentQIndex + 1;
  const totalQ = activeExam.questions.length;

  return (
    <div className="max-w-[600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={resetExam}
          className="text-[11px] text-[#6E6A63] hover:text-[#111111] transition-colors"
        >
          Salir del test
        </button>
        <span className="text-[11px] text-[#6E6A63]">
          {qNum} / {totalQ}
        </span>
      </div>

      {/* Progress */}
      <div className="h-1.5 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-[#111111] rounded-full transition-all"
          style={{ width: `${(qNum / totalQ) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl border border-[#111111]/5 p-5 mb-4">
        <span className="text-[10px] text-[#A02B8A] font-medium uppercase tracking-wider">
          {question.category}
        </span>
        <p className="text-sm font-medium text-[#111111] mt-2 mb-1 leading-relaxed">
          {question.question}
        </p>
        <p className="text-[11px] text-[#6E6A63]">{question.questionEs}</p>

        <div className="space-y-2 mt-4">
          {question.options.map((opt) => (
            <button
              key={opt}
              onClick={() => !showFeedback && setSelectedAnswer(opt)}
              disabled={showFeedback}
              className={`w-full text-left p-3 rounded-lg text-sm border-2 transition-all ${
                showFeedback
                  ? opt === question.correctAnswer
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                    : opt === selectedAnswer
                    ? 'border-red-300 bg-red-50 text-red-700'
                    : 'border-gray-100 bg-gray-50 text-gray-400'
                  : opt === selectedAnswer
                  ? 'border-[#111111] bg-[#111111]/5'
                  : 'border-gray-100 hover:border-[#111111]/30 hover:bg-gray-50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {showFeedback && (
          <div
            className={`mt-4 p-3 rounded-lg ${
              selectedAnswer === question.correctAnswer
                ? 'bg-emerald-50 border border-emerald-200'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            <p className="text-[11px] font-medium text-[#111111] mb-0.5">
              {selectedAnswer === question.correctAnswer ? 'Correcto' : `Correcto: ${question.correctAnswer}`}
            </p>
            <p className="text-[10px] text-[#6E6A63]">{question.explanationEs}</p>
          </div>
        )}
      </div>

      {/* Actions */}
      {!showFeedback ? (
        <button
          onClick={checkAnswer}
          disabled={!selectedAnswer}
          className="w-full py-3 bg-[#111111] text-white rounded-xl text-sm font-medium hover:bg-[#333] transition-colors disabled:opacity-30"
        >
          Comprobar respuesta
        </button>
      ) : (
        <button
          onClick={nextQuestion}
          className="w-full py-3 bg-[#111111] text-white rounded-xl text-sm font-medium hover:bg-[#333] transition-colors"
        >
          {qNum < totalQ ? 'Siguiente pregunta' : 'Ver resultado'}
        </button>
      )}
    </div>
  );
}
