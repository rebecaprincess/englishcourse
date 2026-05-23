import { useState } from 'react';
import { Building2, Globe, Users, HeartPulse, FlaskConical, Volume2, ChevronDown, ChevronUp } from 'lucide-react';

const menariniFacts = [
  { icon: Building2, title: 'Fundada', value: '1886', detail: 'En Florencia, Italia, por la familia Menarini.', detailEn: 'In Florence, Italy, by the Menarini family.' },
  { icon: Globe, title: 'Presencia Global', value: '140+', detail: 'Países donde opera Menarini en todo el mundo.', detailEn: 'Countries where Menarini operates worldwide.' },
  { icon: Users, title: 'Empleados', value: '17,000+', detail: 'Profesionales trabajando alrededor del mundo.', detailEn: 'Professionals working around the world.' },
  { icon: HeartPulse, title: 'Áreas Terapéuticas', value: '7+', detail: 'Incluyendo cardiología, oncología, gastroenterología y dermatología.', detailEn: 'Including cardiology, oncology, gastroenterology, and dermatology.' },
];

const keyPhrases = [
  { en: 'Menarini is a leading pharmaceutical company.', es: 'Menarini es una empresa farmacéutica líder.' },
  { en: 'We operate in over 140 countries worldwide.', es: 'Operamos en más de 140 países en todo el mundo.' },
  { en: 'Our mission is to improve patients\' lives.', es: 'Nuestra misión es mejorar la vida de los pacientes.' },
  { en: 'The company was founded in Florence in 1886.', es: 'La empresa fue fundada en Florencia en 1886.' },
  { en: 'We focus on several key therapeutic areas.', es: 'Nos enfocamos en varias áreas terapéuticas clave.' },
  { en: 'Patient safety is our top priority.', es: 'La seguridad del paciente es nuestra principal prioridad.' },
  { en: 'Our R&D team develops innovative treatments.', es: 'Nuestro equipo de I+D desarrolla tratamientos innovadores.' },
  { en: 'We are committed to healthcare excellence.', es: 'Estamos comprometidos con la excelencia en salud.' },
];

const therapeuticAreas = [
  { name: 'Cardiology', nameEs: 'Cardiología', desc: 'Enfermedades del corazón y vasos sanguíneos', descEn: 'Heart and blood vessel diseases' },
  { name: 'Oncology', nameEs: 'Oncología', desc: 'Diagnóstico y tratamiento del cáncer', descEn: 'Cancer diagnosis and treatment' },
  { name: 'Gastroenterology', nameEs: 'Gastroenterología', desc: 'Trastornos del sistema digestivo', descEn: 'Digestive system disorders' },
  { name: 'Dermatology', nameEs: 'Dermatología', desc: 'Condiciones y tratamientos de la piel', descEn: 'Skin conditions and treatments' },
  { name: 'Respiratory', nameEs: 'Respiratorio', desc: 'Condiciones pulmonares y respiratorias', descEn: 'Lung and breathing conditions' },
  { name: 'Pain Management', nameEs: 'Manejo del Dolor', desc: 'Tratamiento del dolor crónico y agudo', descEn: 'Chronic and acute pain treatment' },
];

export default function Menarini() {
  const [expandedFact, setExpandedFact] = useState<number | null>(null);
  const [expandedArea, setExpandedArea] = useState<number | null>(null);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#005C3D] flex items-center justify-center">
            <Building2 size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-semibold text-[#111111]">Menarini</h1>
            <p className="text-[11px] text-[#6E6A63]">Menarini Group · Pharmaceutical Company</p>
          </div>
        </div>
        <p className="text-sm text-[#6E6A63] leading-relaxed">
          Aprende el vocabulario y contexto sobre Menarini, la empresa farmacéutica italiana
          donde trabajarás como Jefa de Comunicación de Contenido.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {menariniFacts.map((fact, i) => {
          const Icon = fact.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-xl border border-[#111111]/5 p-4 cursor-pointer hover:shadow-sm transition-all"
              onClick={() => setExpandedFact(expandedFact === i ? null : i)}
            >
              <div className="w-7 h-7 rounded-lg bg-[#005C3D]/10 flex items-center justify-center mb-2">
                <Icon size={13} className="text-[#005C3D]" />
              </div>
              <p className="text-xl font-serif font-semibold text-[#111111]">{fact.value}</p>
              <p className="text-[10px] text-[#6E6A63]">{fact.title}</p>
              {expandedFact === i && (
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <p className="text-[10px] text-[#111111] leading-relaxed">{fact.detailEn}</p>
                  <p className="text-[10px] text-[#6E6A63] italic">{fact.detail}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Key Phrases */}
      <div className="bg-white rounded-xl border border-[#111111]/5 p-5">
        <h2 className="text-sm font-semibold text-[#111111] mb-3 flex items-center gap-2">
          <Globe size={14} className="text-[#005C3D]" />
          Frases Clave sobre Menarini
        </h2>
        <div className="space-y-1.5">
          {keyPhrases.map((phrase, i) => (
            <div key={i} className="p-3 bg-gray-50 rounded-lg flex items-start gap-2">
              <button onClick={() => speak(phrase.en)} className="mt-0.5 shrink-0">
                <Volume2 size={11} className="text-[#005C3D]" />
              </button>
              <div>
                <p className="text-xs text-[#111111] leading-relaxed">{phrase.en}</p>
                <p className="text-[10px] text-[#6E6A63] italic">{phrase.es}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Therapeutic Areas */}
      <div className="bg-white rounded-xl border border-[#111111]/5 p-5">
        <h2 className="text-sm font-semibold text-[#111111] mb-3 flex items-center gap-2">
          <FlaskConical size={14} className="text-[#005C3D]" />
          Áreas Terapéuticas
        </h2>
        <div className="grid sm:grid-cols-2 gap-2">
          {therapeuticAreas.map((area, i) => (
            <div
              key={i}
              className="p-3 border border-gray-100 rounded-xl cursor-pointer hover:border-[#005C3D]/30 transition-all"
              onClick={() => setExpandedArea(expandedArea === i ? null : i)}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-[#111111]">{area.name}</p>
                {expandedArea === i ? <ChevronUp size={11} className="text-gray-400" /> : <ChevronDown size={11} className="text-gray-400" />}
              </div>
              <p className="text-[10px] text-[#6E6A63]">{area.nameEs}</p>
              {expandedArea === i && (
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <p className="text-[10px] text-[#111111]">{area.descEn}</p>
                  <p className="text-[10px] text-[#6E6A63] italic">{area.desc}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speak(`Menarini has a strong ${area.name} department.`);
                    }}
                    className="mt-2 flex items-center gap-1 text-[10px] text-[#005C3D] hover:underline"
                  >
                    <Volume2 size={8} /> Escuchar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Role Context */}
      <div className="bg-gradient-to-br from-[#005C3D] to-[#003D28] rounded-xl p-5 text-white">
        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <HeartPulse size={14} />
          Tu Rol en Menarini
        </h2>
        <div className="space-y-2">
          <p className="text-xs text-white/80 leading-relaxed">
            Como <strong className="text-white">Jefa de Comunicación de Contenido</strong>, liderarás
            un equipo de 5 personas incluyendo web master y diseñador.
          </p>
          <p className="text-xs text-white/80 leading-relaxed">
            Tu misión será crear contenido de alta calidad que comunique los valores
            y productos de Menarini en el ámbito digital.
          </p>
          <div className="mt-3 pt-3 border-t border-white/15">
            <p className="text-[10px] text-white/50 uppercase tracking-wider mb-2">Keywords de tu rol:</p>
            <div className="flex flex-wrap gap-1.5">
              {['Content Strategy', 'Team Leadership', 'SEO', 'Digital Marketing', 'Brand Communication', 'Analytics'].map((kw) => (
                <button
                  key={kw}
                  onClick={() => speak(kw)}
                  className="px-2 py-1 bg-white/10 rounded-md text-[10px] text-white/80 hover:bg-white/20 transition-colors"
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
