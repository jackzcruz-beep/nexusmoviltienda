import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Gift, CheckCircle2, Sparkles, Trophy } from 'lucide-react';

export const GiveawayModal: React.FC = () => {
  const { isGiveawayModalOpen, setIsGiveawayModalOpen, currentUser } = useStore();

  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [instagram, setInstagram] = useState('');
  const [ticketCode, setTicketCode] = useState<string | null>(null);

  if (!isGiveawayModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    const randomTicket = `NX-TICKET-${Math.floor(10000 + Math.random() * 90000)}`;
    setTicketCode(randomTicket);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0e1424] border border-indigo-500/40 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-7">
        <button
          onClick={() => {
            setIsGiveawayModalOpen(false);
            setTicketCode(null);
          }}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {!ticketCode ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800">
                  Dinámica Exclusiva NexusMóvil
                </span>
                <h3 className="text-lg font-bold text-white leading-tight mt-0.5">
                  Sorteo Mensual: Set Audiófilo Pro KZ
                </h3>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 mb-5 text-xs text-slate-300 space-y-1.5">
              <p className="font-semibold text-cyan-300 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-400" />
                Premio de este mes:
              </p>
              <p>• 1x Audífonos KZ Castor Bass Edition con 4 switches acústicos</p>
              <p>• 1x Cable DAC Hi-Res Conexant CX31993 de 32-bit</p>
              <p>• 1x Estuche Rígido oficial KZ Antigolpes con cierre reforzado</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Nombre completo:</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre completo"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Número de WhatsApp:</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+57 300 000 0000"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Usuario de Instagram o TikTok (opcional):</label>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="@tu_usuario"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/30"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Registrarme y Obtener Número de Boleta</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4 animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-1">
                ¡Registro Completado con Éxito!
              </h3>
              <p className="text-xs text-slate-400">
                Tu boleto digital ha sido generado para el sorteo en vivo de este mes por nuestro Instagram y WhatsApp.
              </p>
            </div>

            <div className="p-4 bg-slate-950 border-2 border-dashed border-indigo-400/60 rounded-xl inline-block w-full">
              <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                Tu Número de Participación
              </span>
              <span className="text-xl sm:text-2xl font-mono font-extrabold text-amber-300 tracking-wider">
                {ticketCode}
              </span>
              <span className="text-[11px] text-slate-400 block mt-1">
                Registrado a: {name} ({phone})
              </span>
            </div>

            <button
              onClick={() => {
                setIsGiveawayModalOpen(false);
                setTicketCode(null);
              }}
              className="px-6 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 cursor-pointer"
            >
              Listo, volver a la tienda
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
