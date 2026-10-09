import React from 'react';
import { useStore } from '../context/StoreContext';
import { MessageCircle, ArrowRight } from 'lucide-react';

export const PurchaseAdvisorBanner: React.FC = () => {
  const { settings } = useStore();

  const cleanPhone = (settings.whatsappNumber || '+584164761875').replace(/[^0-9]/g, '') || '584164761875';
  const whatsappAdvisorUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    '👋 ¡Hola NexusMóvil! Deseo asesoría personalizada 1 a 1 para elegir los audífonos, DAC o accesorios ideales para mí.'
  )}`;

  return (
    <div className="w-full relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900/90 to-cyan-950/40 border border-emerald-500/30 shadow-lg shadow-black/40 p-3 sm:py-2.5 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      {/* Subtle ambient light */}
      <div className="absolute -left-10 -top-10 w-24 h-24 bg-emerald-500/20 rounded-full blur-xl pointer-events-none" />
      <div className="absolute -right-10 -bottom-10 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl pointer-events-none" />

      {/* Left: Direct text */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner">
          <MessageCircle className="w-4 h-4 fill-emerald-400/30 text-emerald-400" />
        </div>
        <div className="text-left">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Asesoría 1 a 1 en vivo
            </span>
            <span className="hidden md:inline text-slate-500 text-xs">·</span>
            <span className="hidden md:inline text-[11px] text-slate-400">Respuesta rápida sin bots</span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-200 leading-tight">
            ¿No sabes qué audífono, DAC o conector elegir para tu teléfono o PC?
          </p>
        </div>
      </div>

      {/* Right: Direct CTA Button */}
      <div className="relative z-10 flex items-center gap-2 self-end sm:self-auto shrink-0">
        <a
          href={whatsappAdvisorUrl}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-all shadow-md shadow-emerald-950/60 cursor-pointer whitespace-nowrap border border-emerald-400/30"
        >
          <span>Chatear por WhatsApp</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
};
