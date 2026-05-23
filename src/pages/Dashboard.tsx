import { Link } from 'react-router';
import {
  TrendingUp,
  Target,
  BookOpen,
  CheckCircle2,
  Circle,
  AlertCircle,
  ArrowRight,
  FileCheck,
  Clock,
  BarChart3,
} from 'lucide-react';
import { modules } from '../data/lessons';
import { useProgress } from '../hooks/useProgress';

// Learning objectives
const objectives = [
  {
    id: 'obj-1',
    title: 'Completar Fundamentos',
    desc: 'Terminar las 3 lecciones del módulo Fundamentos',
    progress: 67,
    due: 'Semana 1',
    status: 'in-progress',
  },
  {
    id: 'obj-2',
    title: 'Dominar vocabulario de Menarini',
    desc: 'Aprender 20+ términos farmacéuticos y de la empresa',
    progress: 30,
    due: 'Semana 2',
    status: 'in-progress',
  },
  {
    id: 'obj-3',
    title: 'Gramática B1 completa',
    desc: 'Finalizar tiempos pasados, futuro, condicionales y pasiva',
    progress: 0,
    due: 'Semana 3',
    status: 'pending',
  },
  {
    id: 'obj-4',
    title: 'Simulacro de examen B1',
    desc: 'Realizar el examen de prueba completo de escritura',
    progress: 0,
    due: 'Semana 4',
    status: 'pending',
  },
];

// Upcoming exams/tests
const upcomingTests = [
  {
    id: 'test-1',
    title: 'Test de Gramática Básica',
    module: 'Fundamentos',
    type: 'evaluacion',
    duration: '15 min',
    questions: 12,
    status: 'available',
  },
  {
    id: 'test-2',
    title: 'Vocabulario: Menarini & Pharma',
    module: 'Menarini & Pharma',
    type: 'evaluacion',
    duration: '10 min',
    questions: 15,
    status: 'locked',
  },
  {
    id: 'test-3',
    title: 'Simulacro de Escritura B1',
    module: 'Escritura Profesional',
    type: 'simulacro',
    duration: '40 min',
    questions: 2,
    status: 'locked',
  },
];

// Skill progress (derived from real progress)
const skillAreas = [
  { name: 'Gramática', progress: 35, color: '#DC2626' },
  { name: 'Vocabulario', progress: 20, color: '#2563EB' },
  { name: 'Escritura', progress: 10, color: '#7C3AED' },
  { name: 'Comprensión', progress: 25, color: '#005C3D' },
];

export default function Dashboard() {
  const { progress } = useProgress();
  const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0);
  const completedLessons = progress.completedLessons.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif font-semibold text-[#111111]">Panel de Aprendizaje</h1>
        <p className="text-sm text-[#6E6A63] mt-1">
          Tu progreso hacia el nivel B1 · {completedLessons} de {totalLessons} lecciones completadas
        </p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-4 border border-[#111111]/5">
          <div className="flex items-center gap-2 mb-2">
            <Target size={14} className="text-[#A02B8A]" />
            <span className="text-[10px] text-[#6E6A63] uppercase tracking-wider">Nivel actual</span>
          </div>
          <p className="text-2xl font-serif font-semibold text-[#111111]">A2+</p>
          <p className="text-[10px] text-[#6E6A63]">Objetivo: B1 First</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#111111]/5">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen size={14} className="text-[#005C3D]" />
            <span className="text-[10px] text-[#6E6A63] uppercase tracking-wider">Lecciones</span>
          </div>
          <p className="text-2xl font-serif font-semibold text-[#111111]">{completedLessons}/{totalLessons}</p>
          <p className="text-[10px] text-[#6E6A63]">{Math.round((completedLessons/totalLessons)*100)}% completado</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#111111]/5">
          <div className="flex items-center gap-2 mb-2">
            <FileCheck size={14} className="text-[#2563EB]" />
            <span className="text-[10px] text-[#6E6A63] uppercase tracking-wider">Evaluaciones</span>
          </div>
          <p className="text-2xl font-serif font-semibold text-[#111111]">1/8</p>
          <p className="text-[10px] text-[#6E6A63]">Tests completados</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#111111]/5">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={14} className="text-amber-500" />
            <span className="text-[10px] text-[#6E6A63] uppercase tracking-wider">Tiempo total</span>
          </div>
          <p className="text-2xl font-serif font-semibold text-[#111111]">{progress.totalXP} XP</p>
          <p className="text-[10px] text-[#6E6A63]">Puntos acumulados</p>
        </div>
      </div>

      {/* Two columns */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Objectives + Skill areas */}
        <div className="lg:col-span-2 space-y-6">
          {/* Objectives */}
          <div className="bg-white rounded-xl border border-[#111111]/5">
            <div className="p-4 border-b border-[#111111]/5 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[#111111] flex items-center gap-2">
                <Target size={15} className="text-[#A02B8A]" />
                Objetivos de aprendizaje
              </h2>
              <span className="text-[10px] text-[#6E6A63]">{objectives.filter(o => o.progress > 0).length} activos</span>
            </div>
            <div className="divide-y divide-[#111111]/5">
              {objectives.map((obj) => (
                <div key={obj.id} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-2.5">
                      {obj.status === 'completed' ? (
                        <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                      ) : obj.status === 'in-progress' ? (
                        <TrendingUp size={15} className="text-[#A02B8A] shrink-0 mt-0.5" />
                      ) : (
                        <Circle size={15} className="text-gray-300 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="text-[13px] font-medium text-[#111111]">{obj.title}</p>
                        <p className="text-[11px] text-[#6E6A63]">{obj.desc}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#6E6A63] bg-gray-50 px-2 py-0.5 rounded-full shrink-0">
                      {obj.due}
                    </span>
                  </div>
                  <div className="ml-[26px]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-[#6E6A63]">{obj.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${obj.progress}%`,
                          backgroundColor: obj.status === 'completed' ? '#10b981' : obj.status === 'in-progress' ? '#A02B8A' : '#d1d5db',
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Areas */}
          <div className="bg-white rounded-xl border border-[#111111]/5 p-4">
            <h2 className="text-sm font-semibold text-[#111111] flex items-center gap-2 mb-4">
              <BarChart3 size={15} className="text-[#A02B8A]" />
              Progreso por área
            </h2>
            <div className="space-y-3">
              {skillAreas.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[12px] text-[#111111]">{skill.name}</span>
                    <span className="text-[11px] text-[#6E6A63]">{skill.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${skill.progress}%`, backgroundColor: skill.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Upcoming tests + Quick access */}
        <div className="space-y-6">
          {/* Upcoming Tests */}
          <div className="bg-white rounded-xl border border-[#111111]/5">
            <div className="p-4 border-b border-[#111111]/5 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[#111111] flex items-center gap-2">
                <FileCheck size={15} className="text-[#2563EB]" />
                Próximas evaluaciones
              </h2>
            </div>
            <div className="divide-y divide-[#111111]/5">
              {upcomingTests.map((test) => (
                <div key={test.id} className="p-4">
                  <div className="flex items-start gap-2.5">
                    {test.status === 'available' ? (
                      <AlertCircle size={15} className="text-[#2563EB] shrink-0 mt-0.5" />
                    ) : (
                      <Circle size={15} className="text-gray-300 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className={`text-[12px] font-medium ${test.status === 'available' ? 'text-[#111111]' : 'text-gray-400'}`}>
                        {test.title}
                      </p>
                      <p className="text-[10px] text-[#6E6A63]">{test.module}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-[9px] text-[#6E6A63] flex items-center gap-1">
                          <Clock size={8} /> {test.duration}
                        </span>
                        <span className="text-[9px] text-[#6E6A63]">{test.questions} preguntas</span>
                      </div>
                    </div>
                  </div>
                  {test.status === 'available' && (
                    <Link
                      to="/examenes"
                      className="mt-2 ml-[22px] inline-flex items-center gap-1 text-[11px] text-[#2563EB] hover:underline"
                    >
                      Realizar test <ArrowRight size={10} />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Access */}
          <div className="bg-white rounded-xl border border-[#111111]/5 p-4">
            <h2 className="text-sm font-semibold text-[#111111] mb-3">Acceso rápido</h2>
            <div className="space-y-1.5">
              {[
                { path: '/lecciones', label: 'Continuar lección 3', desc: 'Numbers, Dates & Times' },
                { path: '/vocabulario', label: 'Repasar vocabulario', desc: '12 términos pendientes' },
                { path: '/escritura', label: 'Práctica de escritura', desc: 'Email de presentación' },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-[#111111] group-hover:text-[#A02B8A] transition-colors">
                      {item.label}
                    </p>
                    <p className="text-[10px] text-[#6E6A63]">{item.desc}</p>
                  </div>
                  <ArrowRight size={12} className="text-gray-300 group-hover:text-[#A02B8A] transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          {/* Study Tip */}
          <div className="bg-[#111111] rounded-xl p-4">
            <p className="text-[10px] text-[#F6F4EF]/40 uppercase tracking-wider mb-2">Consejo de estudio</p>
            <p className="text-[12px] text-[#F6F4EF]/80 leading-relaxed">
              Practica 20-30 minutos diarios. La consistencia es más importante
              que la intensidad. Usa el vocabulario en contexto real.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
