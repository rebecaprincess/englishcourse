import { Outlet, NavLink, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import {
  LayoutDashboard,
  BookOpen,
  Languages,
  PenLine,
  FileCheck,
  Building2,
  ArrowLeft,
  LogOut,
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Panel', icon: LayoutDashboard },
  { path: '/lecciones', label: 'Lecciones', icon: BookOpen },
  { path: '/examenes', label: 'Exámenes', icon: FileCheck },
  { path: '/vocabulario', label: 'Vocabulario', icon: Languages },
  { path: '/escritura', label: 'Escritura', icon: PenLine },
  { path: '/menarini', label: 'Menarini', icon: Building2 },
];

export default function AppLayout() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#F6F4EF]">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-[220px] bg-white border-r border-[#111111]/6 z-50 hidden lg:flex flex-col">
        {/* Logo */}
        <div className="p-5 border-b border-[#111111]/5">
          <NavLink to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#111111] flex items-center justify-center">
              <span className="text-white text-[13px] font-serif font-bold">P</span>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#111111] leading-tight">Princesita</p>
              <p className="text-[9px] text-gray-400 uppercase tracking-[0.1em]">English Academy</p>
            </div>
          </NavLink>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] transition-all ${
                    isActive
                      ? 'bg-[#111111] text-white font-medium'
                      : 'text-[#6E6A63] hover:text-[#111111] hover:bg-gray-50'
                  }`
                }
              >
                <Icon size={16} strokeWidth={1.8} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div className="p-4 border-t border-[#111111]/5 space-y-3">
          {user && (
            <div className="flex items-center gap-2.5">
              {user.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="avatar"
                  className="w-7 h-7 rounded-full object-cover border border-gray-200"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-[#A02B8A]/10 flex items-center justify-center text-[10px] font-bold text-[#A02B8A]">
                  {user.email?.charAt(0).toUpperCase() ?? 'U'}
                </div>
              )}
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-[#111111] truncate">
                  {user.user_metadata?.full_name ?? user.email ?? 'Usuario'}
                </p>
                <p className="text-[9px] text-[#6E6A63] truncate">{user.email}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-[11px] text-[#6E6A63] hover:text-red-500 transition-colors w-full"
          >
            <LogOut size={12} /> Cerrar sesión
          </button>
          <NavLink
            to="/"
            className="flex items-center gap-2 text-[11px] text-[#6E6A63] hover:text-[#111111] transition-colors"
          >
            <ArrowLeft size={12} /> Volver a la landing
          </NavLink>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-[#111111]/5 z-50 flex items-center justify-between px-4">
        <span className="font-serif text-base font-semibold">Princesita</span>
        <div className="flex gap-3 items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `p-2 rounded-lg transition-all ${isActive ? 'text-[#111111]' : 'text-gray-300'}`
                }
              >
                <Icon size={18} />
              </NavLink>
            );
          })}
          {user?.user_metadata?.avatar_url ? (
            <img src={user.user_metadata.avatar_url} alt="avatar" className="w-7 h-7 rounded-full object-cover border border-gray-200" />
          ) : (
            <div className="w-7 h-7 rounded-full bg-[#A02B8A]/10 flex items-center justify-center text-[10px] font-bold text-[#A02B8A]">
              {user?.email?.charAt(0).toUpperCase() ?? 'U'}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <main className="lg:ml-[220px] min-h-screen pt-14 lg:pt-0">
        <div className="max-w-[900px] mx-auto px-5 py-6 lg:py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
