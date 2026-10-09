import React from 'react';
import { useStore } from '../context/StoreContext';
import { NexusLogo } from './NexusLogo';
import {
  MessageCircle,
  ShieldCheck,
  Truck,
  PackageCheck,
  Clock,
  MapPin,
  ExternalLink,
  Headphones
} from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    settings,
    setIsTrackingOpen,
    setIsAdminOpen,
    setSelectedCategory,
    isAdmin
  } = useStore();

  const cleanPhone = (settings.whatsappNumber || '+584164761875').replace(/[^0-9]/g, '') || '584164761875';
  const phoneDisplay = settings.whatsappNumber || '+58 416-4761875';
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hola NexusMóvil, deseo información sobre sus productos y envíos.')}`;
  const instagramUrl = `https://www.instagram.com/${settings.instagramUser || 'nexusmovil'}`;
  const tiktokUrl = `https://www.tiktok.com/@${settings.tiktokUser || 'nexusmovil'}`;
  const googleMapsUrl = settings.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('NexusMovil Venezuela')}`;

  return (
    <footer className="border-t border-slate-800 bg-[#070a11] text-slate-400 text-xs">
      {/* Trust bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-slate-800/80">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-cyan-300 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">100% Originales & Sellados</h4>
              <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                Distribución autorizada KZ, QKZ, Moondrop y componentes testeados.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-300 shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Atención por WhatsApp</h4>
              <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                Asesor personal asignado para validar tu pedido, pagos y comprobantes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-950/60 border border-indigo-800/40 flex items-center justify-center text-indigo-300 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Envíos a Todo el País</h4>
              <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                Retiro directo en tienda o encomienda nacional asegurada con número de guía.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-cyan-300 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Asesoría 1 a 1 Gratuita</h4>
              <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                Te ayudamos a elegir el conector y modelo según tu teléfono o gusto musical.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3">
            <NexusLogo size={52} showText={true} />
            <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
              Especialistas en monitores in-ear, audio de alta fidelidad, periféricos gamer ultraligeros y componentes de PC de alto rendimiento.
            </p>
            <div className="pt-2 text-[11px] text-slate-300 font-mono space-y-1.5">
              {settings.address && (
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-1.5 hover:text-cyan-400 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                  <span>{settings.address}</span>
                </a>
              )}
              <p className="flex items-center gap-1.5 text-cyan-300">
                <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Horario: {settings.businessHours || '9:00 AM a 7:00 PM (Lunes a Domingo)'}</span>
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                <span>WhatsApp: {phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-3">
              Catálogo de Productos
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('iem-audio');
                    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  In-Ear Monitors (KZ, QKZ, Moondrop)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('perifericos');
                    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Gaming (Mice Ultralivianos & Teclados 75%)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('accesorios-audio');
                    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Cables DAC Hi-Res Tipo-C & Accesorios
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('adaptadores-hubs');
                    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Hubs Multipuerto & Adaptadores HDMI
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('componentes-pc');
                    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Componentes PC (Procesadores & Pastas)
                </button>
              </li>
            </ul>
          </div>

          {/* Quick links & services */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-3">
              Servicios & Enlaces
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setIsTrackingOpen(true)}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <PackageCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Rastreador de Guías de Envío</span>
                </button>
              </li>
              <li>
                <a href="#reseñas" className="hover:text-cyan-400 transition-colors">
                  Opiniones Verificadas de Clientes
                </a>
              </li>
              <li>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                  <span>Ubicación en Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Panel de Administración {isAdmin && '✓'}
                </button>
              </li>
            </ul>
          </div>

          {/* Social media direct links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-3">
              Redes Sociales Oficiales
            </h4>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Síguenos para novedades, pruebas de sonido y disponibilidad en bodega:
            </p>

            <div className="space-y-2.5">
              {/* WhatsApp direct */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 hover:bg-emerald-900/40 transition-colors font-medium text-xs"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Oficial NexusMóvil</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
              </a>

              {/* Instagram */}
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-pink-950/30 border border-pink-800/30 text-pink-300 hover:bg-pink-900/40 transition-colors font-medium text-xs"
              >
                <svg className="w-4 h-4 fill-pink-400" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>@nexusmovil</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
              </a>

              {/* TikTok */}
              <a
                href={tiktokUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors font-medium text-xs"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.02 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
                <span>@nexusmovil</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} nexusmóvil. Envíos a Nivel Nacional.</p>
          <div className="flex items-center gap-4">
            <span>Envíos Nacionales</span>
            <span>·</span>
            <span>Atención WhatsApp</span>
            <span>·</span>
            <a href={googleMapsUrl} target="_blank" rel="noreferrer" className="hover:text-cyan-400">
              Google Maps
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
