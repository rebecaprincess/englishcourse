import { NavLink } from 'react-router';
import {
  LayoutDashboard,
  BookOpen,
  Languages,
  PenLine,
  Gamepad2,
  Building2,
  Flame,
  Star,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { path: '/', label: 'Dashboard', labelEs: 'Panel', icon: LayoutDashboard },
  { path: '/lecciones', label: 'Lessons', labelEs: 'Lecciones', icon: BookOpen },
  { path: '/vocabulario', label: 'Vocabulary', labelEs: 'Vocabulario', icon: Languages },
  { path: '/escritura', label: 'Writing', labelEs: 'Escritura', icon: PenLine },
  { path: '/juegos', label: 'Games', labelEs: 'Juegos', icon: Gamepad2 },
  { path: '/menarini', label: 'Menarini', labelEs: 'Menarini', icon: Building2 },
];

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalXP = 120;
  const streak = 7;

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-[110] p-2 bg-white rounded-lg shadow-md"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-[105]"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-100 z-[106] transition-transform duration-300 w-[240px] flex flex-col ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#A02B8A] flex items-center justify-center">
                <Star size={16} className="text-white" fill="white" />
              </div>
              <div>
                <h1 className="text-[15px] font-bold text-[#1a1a2e] leading-tight">Princesita</h1>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">English Academy</p>
              </div>
            </div>
            <button onClick={() => setMobileOpen(false)} className="lg:hidden p-1">
              <X size={18} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="px-4 py-3 flex gap-3 border-b border-gray-50">
          <div className="flex-1 bg-amber-50 rounded-lg px-3 py-2 flex items-center gap-2">
            <Flame size={14} className="text-amber-500 flame-pulse" fill="#f59e0b" />
            <div>
              <p className="text-[11px] font-bold text-amber-700">{streak}</p>
              <p className="text-[9px] text-amber-500">días</p>
            </div>
          </div>
          <div className="flex-1 bg-purple-50 rounded-lg px-3 py-2 flex items-center gap-2">
            <Star size={14} className="text-[#A02B8A]" fill="#A02B8A" />
            <div>
              <p className="text-[11px] font-bold text-[#A02B8A]">{totalXP}</p>
              <p className="text-[9px] text-[#A02B8A]/60">XP</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `nav-item ${isActive ? 'active' : ''}`
                }
              >
                <Icon size={18} strokeWidth={1.8} />
                <div>
                  <p className="leading-tight">{item.label}</p>
                  <p className="text-[10px] opacity-60 leading-tight">{item.labelEs}</p>
                </div>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <div className="bg-gradient-to-br from-[#A02B8A]/10 to-[#005C3D]/10 rounded-xl p-3">
            <p className="text-[10px] text-gray-500 mb-1">Objetivo diario</p>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-[#1a1a2e]">15 / 30 min</span>
              <span className="text-[10px] text-[#A02B8A]">50%</span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#A02B8A] rounded-full transition-all" style={{ width: '50%' }} />
            </div>
          </div>
          <p className="text-[9px] text-center text-gray-300 mt-3">
            Para Rebeca - Tu momento de brillar
          </p>
        </div>
      </aside>
    </>
  );
}
