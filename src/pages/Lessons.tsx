import { Link } from 'react-router';
import { CheckCircle2, Circle, Clock, ArrowRight } from 'lucide-react';
import { modules } from '../data/lessons';
import { useProgress } from '../hooks/useProgress';

export default function Lessons() {
  const { progress, isLessonCompleted } = useProgress();
  const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0);
  const completedLessons = progress.completedLessons.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-serif font-semibold text-[#111111]">Lecciones</h1>
          <p className="text-sm text-[#6E6A63] mt-1">
            {completedLessons} de {totalLessons} completadas · {modules.length} módulos
          </p>
        </div>
        <div className="hidden sm:block text-right">
          <p className="text-xs text-[#6E6A63]">Nivel actual</p>
          <p className="text-sm font-semibold text-[#111111]">A2+ → B1</p>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="bg-white rounded-xl border border-[#111111]/5 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[#6E6A63]">Progreso general</span>
          <span className="text-xs font-medium text-[#111111]">{Math.round((completedLessons / totalLessons) * 100)}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#111111] rounded-full transition-all"
            style={{ width: `${(completedLessons / totalLessons) * 100}%` }}
          />
        </div>
      </div>

      {/* Modules */}
      <div className="space-y-6">
        {modules.map((mod) => {
          const modCompleted = mod.lessons.filter((l) => isLessonCompleted(l.id)).length;
          const modProgress = Math.round((modCompleted / mod.lessons.length) * 100);

          return (
            <div key={mod.id}>
              {/* Module Header */}
              <div className="module-header">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: mod.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-semibold text-[#111111]">{mod.title}</h2>
                    <span className="text-[10px] text-gray-400">({mod.titleEs})</span>
                  </div>
                  <p className="text-xs text-[#6E6A63] truncate">{mod.descriptionEs}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-medium" style={{ color: mod.color }}>
                    {modCompleted}/{mod.lessons.length}
                  </p>
                </div>
              </div>

              {/* Module Progress */}
              <div className="h-1 bg-gray-100 rounded-full mb-3 mx-1 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${modProgress}%`, backgroundColor: mod.color }}
                />
              </div>

              {/* Lessons */}
              <div className="grid sm:grid-cols-2 gap-2">
                {mod.lessons.map((lesson, lessonIndex) => {
                  const completed = isLessonCompleted(lesson.id);
                  const lessonLocked = lessonIndex > modCompleted && !completed;

                  return (
                    <Link
                      key={lesson.id}
                      to={lessonLocked ? '#' : `/leccion/${lesson.id}`}
                      onClick={(e) => lessonLocked && e.preventDefault()}
                    >
                      <div
                        className={`lesson-card flex items-start gap-3 ${
                          lessonLocked ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:shadow-sm'
                        }`}
                      >
                        <div className="shrink-0 mt-0.5">
                          {completed ? (
                            <CheckCircle2 size={16} className="text-emerald-500" />
                          ) : lessonLocked ? (
                            <Circle size={16} className="text-gray-300" />
                          ) : (
                            <div
                              className="w-4 h-4 rounded-full border-2 mt-0.5"
                              style={{ borderColor: mod.color }}
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-medium text-[#111111] leading-tight truncate">
                            {lesson.title}
                          </p>
                          <p className="text-[10px] text-[#6E6A63]">{lesson.titleEs}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-[9px] text-[#6E6A63] flex items-center gap-0.5">
                              <Clock size={8} /> {lesson.duration} min
                            </span>
                            <span
                              className="level-badge"
                              style={{
                                backgroundColor: lesson.level === 'beginner' ? '#dcfce7' : lesson.level === 'intermediate' ? '#fef3c7' : '#fee2e2',
                                color: lesson.level === 'beginner' ? '#15803d' : lesson.level === 'intermediate' ? '#b45309' : '#dc2626',
                              }}
                            >
                              {lesson.level}
                            </span>
                          </div>
                        </div>
                        {!lessonLocked && <ArrowRight size={13} className="text-gray-300 shrink-0 mt-1" />}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
