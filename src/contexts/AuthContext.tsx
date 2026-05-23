import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

interface User {
  email: string;
  name: string;
  picture?: string;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => void;
  signOut: () => void;
}

// Emails autorizados (igual que en remisa)
const AUTHORIZED_EMAILS = [
  'guelug@gmail.com',
  'rrebecaalvaradobussiness@gmail.com',
  'ralvarado@remisa.com',
];

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const GOOGLE_CLIENT_ID = '137627786866-4ptnvbujm0f0tphpvdamdivlntothqeb.apps.googleusercontent.com';

function AuthProviderInner({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar sesión del localStorage al iniciar
  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Verificar que no haya expirado (30 días)
        if (parsed.expires && new Date(parsed.expires) > new Date()) {
          setUser({ email: parsed.email, name: parsed.name, picture: parsed.picture });
        } else {
          localStorage.removeItem('user');
        }
      } catch {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Obtener info del usuario con el access token
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const userinfo = await res.json();

        const email = userinfo.email?.toLowerCase().trim();
        const name = userinfo.name || email?.split('@')[0] || 'Usuario';

        if (!email) {
          alert('No se pudo obtener el email de tu cuenta Google');
          return;
        }

        // Validar email autorizado (igual que remisa)
        if (!AUTHORIZED_EMAILS.includes(email)) {
          alert('🔒 Acceso no autorizado. Tu cuenta no tiene acceso a este sistema.');
          return;
        }

        const userData: User = {
          email,
          name,
          picture: userinfo.picture,
        };

        // Guardar sesión en localStorage (30 días)
        localStorage.setItem('user', JSON.stringify({
          ...userData,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        }));

        setUser(userData);
      } catch (err) {
        console.error('Error en login:', err);
        alert('Error al iniciar sesión. Intenta de nuevo.');
      }
    },
    onError: () => {
      alert('Error al iniciar sesión con Google');
    },
  });

  const signInWithGoogle = () => {
    googleLogin();
  };

  const signOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProviderInner>{children}</AuthProviderInner>
    </GoogleOAuthProvider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
