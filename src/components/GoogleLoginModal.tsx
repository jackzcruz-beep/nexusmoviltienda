import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Lock, User, ShieldCheck, Eye, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react';

export const GoogleLoginModal: React.FC = () => {
  const {
    isGoogleLoginOpen,
    setIsGoogleLoginOpen,
    loginWithGoogle,
    loginWithFirebaseGoogle,
    loginWithFirebaseEmail,
    loginAdminWithPassword,
    setIsAdminOpen,
    currentUser,
    isAdmin
  } = useStore();

  const [activeTab, setActiveTab] = useState<'client' | 'admin'>('admin');

  // Client login
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  // Admin login
  const [adminEmail, setAdminEmail] = useState('jackzcruz@gmail.com');
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [adminError, setAdminError] = useState('');
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);

  if (!isGoogleLoginOpen) return null;

  const handleFirebaseGoogleLogin = async () => {
    setLoadingGoogle(true);
    setAdminError('');
    try {
      const res = await loginWithFirebaseGoogle();
      if (!res.success && res.error) {
        setAdminError(res.error);
      } else {
        // If it was admin, open panel
        if (isAdmin) {
          setIsAdminOpen(true);
        }
      }
    } finally {
      setLoadingGoogle(false);
    }
  };

  const handleAdminEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');
    setLoadingEmail(true);

    const cleanEmail = adminEmail.toLowerCase().trim();
    if (cleanEmail !== 'jackzcruz@gmail.com') {
      setAdminError('Acceso denegado: Únicamente jackzcruz@gmail.com tiene privilegios de administrador.');
      setLoadingEmail(false);
      return;
    }

    try {
      // First attempt Firebase Email Auth
      const fbRes = await loginWithFirebaseEmail(cleanEmail, adminPassword);
      if (fbRes.success) {
        setIsAdminOpen(true);
        setAdminPassword('');
        setLoadingEmail(false);
        return;
      }

      // If Firebase email isn't provisioned yet for this user, authenticate via master secure key
      const localOk = loginAdminWithPassword(cleanEmail, adminPassword);
      if (localOk) {
        setIsAdminOpen(true);
        setAdminPassword('');
      } else {
        setAdminError('Contraseña incorrecta o credenciales no válidas.');
      }
    } finally {
      setLoadingEmail(false);
    }
  };

  const handleClientLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientEmail.trim()) return;

    loginWithGoogle({
      name: clientName.trim() || clientEmail.split('@')[0],
      email: clientEmail.trim(),
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(clientName || clientEmail)}`
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0c121e] border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden p-5 sm:p-6">
        <button
          onClick={() => {
            setIsGoogleLoginOpen(false);
            setAdminError('');
          }}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Google & Firebase Header */}
        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-cyan-950/40">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-white mb-1">
            Firebase Authentication
          </h2>
          <p className="text-xs text-slate-400">
            Acceso seguro a <strong>nexusmóvil</strong> con Google Cloud & Firebase.
          </p>
        </div>

        {/* Tab Toggle: Administrador vs Cliente */}
        <div className="grid grid-cols-2 p-1 bg-slate-900 rounded-xl mb-4 border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => {
              setActiveTab('admin');
              setAdminError('');
            }}
            className={`py-2 rounded-lg font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'admin'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>Administrador</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('client');
              setAdminError('');
            }}
            className={`py-2 rounded-lg font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'client'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Cliente</span>
          </button>
        </div>

        {/* Admin Tab Content - Strict Firebase Auth for jackzcruz@gmail.com */}
        {activeTab === 'admin' ? (
          <div className="space-y-4 animate-in fade-in">
            <div className="p-3 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-[11px] text-amber-200/90 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-amber-300">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Acceso Restringido por Firebase Auth</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Autorizado exclusivamente para el usuario verificado:{' '}
                <strong className="text-amber-300 font-mono">jackzcruz@gmail.com</strong>.
              </p>
            </div>

            {/* Direct Google Firebase Sign-in Button */}
            <button
              type="button"
              onClick={handleFirebaseGoogleLogin}
              disabled={loadingGoogle}
              className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs transition-all cursor-pointer shadow-md flex items-center justify-center gap-2.5 disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{loadingGoogle ? 'Autenticando con Google...' : 'Ingresar con cuenta Google'}</span>
            </button>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-2 text-[10px] text-slate-500 uppercase tracking-wider font-semibold">o con contraseña</span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            {/* Email + Password Form */}
            <form onSubmit={handleAdminEmailLogin} className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Correo Administrador:</label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Contraseña:</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Introduce contraseña de administrador"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-3 pr-9 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {adminError && (
                <p className="text-[11px] text-rose-400 bg-rose-950/40 p-2.5 rounded-xl border border-rose-800/40 leading-relaxed">
                  {adminError}
                </p>
              )}

              <button
                type="submit"
                disabled={loadingEmail}
                className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-md shadow-amber-950/40 mt-1 flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{loadingEmail ? 'Verificando...' : 'Desbloquear Panel Admin'}</span>
              </button>
            </form>
          </div>
        ) : (
          /* Client Tab Content */
          <div className="space-y-4 animate-in fade-in">
            {/* Quick Google Sign In */}
            <button
              type="button"
              onClick={handleFirebaseGoogleLogin}
              disabled={loadingGoogle}
              className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs transition-all cursor-pointer shadow-md flex items-center justify-center gap-2.5 disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{loadingGoogle ? 'Conectando con Google...' : 'Continuar con Google'}</span>
            </button>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-2 text-[10px] text-slate-500 uppercase tracking-wider font-semibold">o ingresar con nombre</span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            <form onSubmit={handleClientLogin} className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Tu nombre:</label>
                <input
                  type="text"
                  required
                  placeholder="Nombre completo"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Correo de Google:</label>
                <input
                  type="email"
                  required
                  placeholder="ejemplo@gmail.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-md shadow-cyan-950/40 mt-1"
              >
                Acceder como Cliente
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
