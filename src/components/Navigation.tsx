import { useState, useEffect } from 'react';
import { BookOpen, Gamepad2, HelpCircle } from 'lucide-react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? 'bg-[#F6F4EF]/90 backdrop-blur-md border-b border-[#111111]/5'
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-6 lg:px-10 py-4">
        <a href="#" className="font-serif text-xl font-600 text-[#111111] tracking-tight">
          Princesita
        </a>
        <div className="flex items-center gap-6 lg:gap-8">
          <a
            href="#program"
            className="hidden sm:flex items-center gap-2 text-sm text-[#6E6A63] hover:text-[#111111] transition-colors"
          >
            <BookOpen size={16} strokeWidth={1.5} />
            <span>Programa</span>
          </a>
          <a
            href="#games"
            className="hidden sm:flex items-center gap-2 text-sm text-[#6E6A63] hover:text-[#111111] transition-colors"
          >
            <Gamepad2 size={16} strokeWidth={1.5} />
            <span>Juegos</span>
          </a>
          <a
            href="#support"
            className="flex items-center gap-2 text-sm text-[#6E6A63] hover:text-[#111111] transition-colors"
          >
            <HelpCircle size={16} strokeWidth={1.5} />
            <span className="hidden sm:inline">Apoyo</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
