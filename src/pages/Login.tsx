import { useRef, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router';
import gsap from 'gsap';
import { useAuth } from '../contexts/AuthContext';
import { LogIn } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { user, signInWithGoogle } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo('.login-fade', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' });
    }, containerRef);
    return () => ctx.revert();
  }, [user, navigate]);

  const handleLogin = () => {
    signInWithGoogle();
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F6F4EF] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative elotes / corn easter eggs floating */}
      <div className="absolute top-10 left-6 text-4xl opacity-20 animate-bounce" style={{ animationDuration: '3s' }}>🌽</div>
      <div className="absolute top-24 right-10 text-3xl opacity-15 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>🌽</div>
      <div className="absolute bottom-20 left-12 text-2xl opacity-10 animate-bounce" style={{ animationDuration: '5s', animationDelay: '0.5s' }}>🌽</div>
      <div className="absolute bottom-32 right-16 text-4xl opacity-15 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1.5s' }}>🌽</div>
      <div className="absolute top-1/3 left-1/4 text-xl opacity-10 animate-bounce" style={{ animationDuration: '6s' }}>🌽</div>

      {/* Mulan-inspired decorative red brush stroke accent */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#C41E3A] via-[#FFD700] to-[#C41E3A] opacity-80" />

      <div className="max-w-sm w-full relative z-10">
        <div className="text-center mb-10">
          <p className="login-fade font-mono text-[11px] uppercase tracking-[0.2em] text-[#6E6A63] mb-4">
            English Academy
          </p>
          <h1 className="login-fade font-serif text-[clamp(32px,6vw,48px)] leading-tight text-[#111111] mb-3">
            Bienvenida,<br />
            <span className="italic text-[#A02B8A]">Princesita</span>
          </h1>
          <p className="login-fade text-sm text-[#6E6A63] leading-relaxed">
            "El guerrero más valiente es aquel que conquista su propio destino."
          </p>
        </div>

        <div className="login-fade bg-white rounded-2xl border border-[#111111]/5 p-6 shadow-sm">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-[#A02B8A]/10 flex items-center justify-center">
              <span className="text-3xl">👸</span>
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-2.5 bg-[#111111] text-[#F6F4EF] px-6 py-3.5 rounded-xl text-[15px] font-medium hover:bg-[#333] transition-all"
          >
            <LogIn size={18} />
            Entrar con Google
          </button>

          <p className="mt-4 text-center text-[11px] text-[#6E6A63]">
            Solo necesitas tu cuenta de Google para empezar.
          </p>
        </div>

        <div className="login-fade mt-8 text-center">
          <p className="text-[11px] text-[#6E6A63]/60 font-mono">
            "¿Quién es esa chica que veo?" — Refleja tu potencial
          </p>
          <p className="text-[10px] text-[#6E6A63]/40 mt-2">
            🌽 alucino a elotes 🌽
          </p>
        </div>
      </div>
    </div>
  );
}
