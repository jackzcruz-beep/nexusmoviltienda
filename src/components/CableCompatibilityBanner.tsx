import React from 'react';
import { useStore } from '../context/StoreContext';
import { HelpCircle, Sparkles, ChevronRight, MessageCircle, Smartphone } from 'lucide-react';

export const CableCompatibilityBanner: React.FC = () => {
  const {
    setIsCableModalOpen,
    setCableModalInitialDevice,
    settings
  } = useStore();

  const handleOpenDevice = (deviceId: string) => {
    setCableModalInitialDevice(deviceId);
    setIsCableModalOpen(true);
  };

  const cleanPhone = (settings.whatsappNumber || '+584164761875').replace(/[^0-9]/g, '') || '584164761875';
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hola NexusMóvil, tengo dudas sobre qué cable o adaptador DAC necesito para mi teléfono celular.')}`;

  return (
    <section
      aria-label="Guía interactiva de compatibilidad de cables"
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0d1627] via-[#0a1120] to-[#0d1c2f] border border-cyan-500/30 p-4 sm:p-5 shadow-lg shadow-cyan-950/20"
    >
      {/* Subtle background glow effect */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Headline & Explanation */}
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Guía Rápida Anti-Errores
            </span>
            <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
              ✓ Evita devoluciones
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
            🎧 ¿Qué cable o adaptador DAC necesitas para tu celular?
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed">
            Si tienes <strong>iPhone 15/16</strong>, <strong>Samsung Galaxy</strong> o <strong>Xiaomi</strong> sin conector redondo 3.5mm, te indicamos al instante el adaptador con chip digital DAC exacto para disfrutar tus audífonos con máxima potencia.
          </p>

          {/* Quick interactive device pills */}
          <div className="pt-1.5 flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-[11px] font-medium text-slate-400 mr-1 hidden sm:inline">
              Toca tu equipo:
            </span>

            <button
              type="button"
              onClick={() => handleOpenDevice('iphone-15-16')}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-900/90 hover:bg-cyan-950/80 text-slate-200 hover:text-cyan-300 border border-slate-700/80 hover:border-cyan-500/50 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <span>🍎</span>
              <span>iPhone 15 / 16 (USB-C)</span>
            </button>

            <button
              type="button"
              onClick={() => handleOpenDevice('android-no-jack')}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-900/90 hover:bg-cyan-950/80 text-slate-200 hover:text-cyan-300 border border-slate-700/80 hover:border-cyan-500/50 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <span>🤖</span>
              <span>Samsung / Xiaomi sin jack</span>
            </button>

            <button
              type="button"
              onClick={() => handleOpenDevice('iphone-lightning')}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-900/90 hover:bg-cyan-950/80 text-slate-200 hover:text-cyan-300 border border-slate-700/80 hover:border-cyan-500/50 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <span>🍏</span>
              <span>iPhone Lightning</span>
            </button>

            <button
              type="button"
              onClick={() => handleOpenDevice('phone-with-jack')}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-900/90 hover:bg-cyan-950/80 text-slate-200 hover:text-cyan-300 border border-slate-700/80 hover:border-cyan-500/50 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <span>📱</span>
              <span>Celular con jack 3.5mm</span>
            </button>
          </div>
        </div>

        {/* Right: Primary Call to Action buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0 justify-center">
          <button
            type="button"
            onClick={() => {
              setCableModalInitialDevice('iphone-15-16');
              setIsCableModalOpen(true);
            }}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:scale-95 transition-all shadow-md shadow-cyan-400/20 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Abrir Asistente de Compatibilidad</span>
            <ChevronRight className="w-4 h-4 ml-0.5" />
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 hover:bg-emerald-950/60 border border-emerald-800/40 transition-colors cursor-pointer text-center"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Asesoría 1 a 1 por WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
