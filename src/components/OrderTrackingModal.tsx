import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { OrderStatus } from '../types';
import {
  X,
  Search,
  PackageCheck,
  CheckCircle2,
  Clock,
  Truck,
  MessageCircle,
  MapPin,
  Calendar,
  AlertCircle
} from 'lucide-react';

const STATUS_STEPS: { status: OrderStatus; label: string; icon: any }[] = [
  { status: 'recibido', label: 'Recibido', icon: Clock },
  { status: 'confirmado_whatsapp', label: 'Confirmado WhatsApp', icon: MessageCircle },
  { status: 'en_preparacion', label: 'En Preparación', icon: PackageCheck },
  { status: 'despachado', label: 'Despachado', icon: Truck },
  { status: 'en_camino', label: 'En Camino', icon: MapPin },
  { status: 'entregado', label: 'Entregado', icon: CheckCircle2 }
];

export const OrderTrackingModal: React.FC = () => {
  const {
    isTrackingOpen,
    setIsTrackingOpen,
    activeTrackingId,
    setActiveTrackingId,
    getOrderById,
    orders,
    settings
  } = useStore();

  const [inputCode, setInputCode] = useState(activeTrackingId || 'NX-8492');

  if (!isTrackingOpen) return null;

  const currentOrder = getOrderById(inputCode) || orders[0];

  const getStepIndex = (status: OrderStatus) => {
    return STATUS_STEPS.findIndex(s => s.status === status);
  };

  const currentStepIdx = currentOrder ? getStepIndex(currentOrder.status) : 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = getOrderById(inputCode);
    if (found) {
      setActiveTrackingId(found.id);
    }
  };

  const handleContactWhatsApp = () => {
    if (!currentOrder) return;
    const cleanPhone = (settings.whatsappNumber || '+584164761875').replace(/[^0-9]/g, '') || '584164761875';
    const message = `*👋 ¡Hola NexusMóvil! Deseo consultar el estado de mi pedido:* \n\n` +
      `*Código de Pedido:* #${currentOrder.id}\n` +
      `*Cliente:* ${currentOrder.customerName}\n` +
      `*Destino:* ${currentOrder.shippingCity}\n\n` +
      `¿Podrían indicarme novedades de entrega? ¡Muchas gracias!`;

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#0d131f] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#090d16]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
              <PackageCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Rastreo de Pedidos en Tiempo Real
              </h2>
              <p className="text-xs text-slate-400">
                Consulta el estado de despacho, guía y entrega de tus compras NexusMóvil
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsTrackingOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search bar */}
        <div className="p-4 sm:px-6 bg-[#0b0f17] border-b border-slate-800/80">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                placeholder="Ingresa tu código de pedido (ej: NX-8492)"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all cursor-pointer whitespace-nowrap"
            >
              Consultar
            </button>
          </form>

          {/* Quick chips of existing recent orders */}
          {orders.length > 0 && (
            <div className="flex items-center gap-2 mt-2.5 overflow-x-auto text-[11px] text-slate-400">
              <span className="shrink-0 text-slate-500 font-mono">Pedidos recientes:</span>
              {orders.slice(0, 4).map(o => (
                <button
                  key={o.id}
                  onClick={() => {
                    setInputCode(o.id);
                    setActiveTrackingId(o.id);
                  }}
                  className={`px-2 py-0.5 rounded font-mono transition-colors cursor-pointer ${
                    currentOrder?.id === o.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  #{o.id}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {currentOrder ? (
            <>
              {/* Order Status Banner */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                    <span>Pedido #{currentOrder.id}</span>
                    <span className="text-slate-600">·</span>
                    <span>{currentOrder.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Cliente: {currentOrder.customerName}
                  </h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{currentOrder.shippingCity} — {currentOrder.shippingAddress}</span>
                  </p>
                </div>

                <div className="bg-[#0b0f17] p-3 rounded-lg border border-slate-800 text-right sm:shrink-0">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">
                    Transportadora
                  </span>
                  <span className="text-xs font-semibold text-cyan-300">
                    {currentOrder.courier || 'Asignando transportadora'}
                  </span>
                  {currentOrder.trackingCode && (
                    <span className="text-[11px] font-mono text-slate-400 block mt-0.5">
                      Guía: {currentOrder.trackingCode}
                    </span>
                  )}
                </div>
              </div>

              {/* Visual Progress Stepper */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 sm:p-5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">
                  Progreso del Envío
                </h4>

                {/* Stepper bar */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {STATUS_STEPS.map((step, idx) => {
                    const isCompleted = idx <= currentStepIdx;
                    const isCurrent = idx === currentStepIdx;
                    const StepIcon = step.icon;

                    return (
                      <div
                        key={step.status}
                        className={`flex flex-col items-center text-center p-2.5 rounded-lg border transition-all ${
                          isCurrent
                            ? 'bg-cyan-500/15 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/10'
                            : isCompleted
                            ? 'bg-slate-900 border-emerald-500/30 text-emerald-400'
                            : 'bg-slate-950/40 border-slate-800/80 text-slate-600'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center mb-1.5 ${
                            isCurrent
                              ? 'bg-cyan-400 text-slate-950'
                              : isCompleted
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-slate-800 text-slate-500'
                          }`}
                        >
                          <StepIcon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[11px] font-semibold leading-tight">
                          {step.label}
                        </span>
                        {isCurrent && (
                          <span className="text-[9px] font-mono text-cyan-400 uppercase mt-1">
                            En curso
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Timeline Log Events */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Historial de Actualizaciones
                </h4>
                <div className="space-y-3 pl-2 border-l border-cyan-500/30">
                  {currentOrder.history.map((event, idx) => (
                    <div key={idx} className="relative pl-5">
                      {/* Timeline dot */}
                      <div className="absolute -left-[9px] top-1 w-3.5 h-3.5 rounded-full bg-slate-900 border-2 border-cyan-400" />
                      <div className="flex items-baseline justify-between">
                        <h5 className="text-xs font-semibold text-white">{event.title}</h5>
                        <span className="text-[10px] font-mono text-slate-400">
                          {event.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{event.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items in this Order */}
              <div className="pt-3 border-t border-slate-800">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                  Artículos del Pedido
                </h4>
                <div className="space-y-2">
                  {currentOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/50 border border-slate-800 text-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={item.image}
                          alt={item.productName}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-md object-cover bg-slate-950 shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-white truncate max-w-[240px]">
                            {item.quantity}x {item.productName}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {item.color} · {item.format}
                          </p>
                        </div>
                      </div>
                      <span className="font-mono font-semibold text-cyan-300 tabular-nums shrink-0">
                        ${item.subtotal.toFixed(2)} USD
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="py-12 text-center">
              <AlertCircle className="w-10 h-10 text-amber-400 mx-auto mb-2" />
              <h3 className="text-base font-bold text-white mb-1">
                No encontramos el pedido #{inputCode}
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
                Verifica el código asignado en tu mensaje de WhatsApp o selecciona uno de los pedidos de ejemplo arriba.
              </p>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-[#090d16] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            ¿Tienes dudas con tu entrega? Habla con nuestro equipo en tiempo real.
          </div>
          <button
            onClick={handleContactWhatsApp}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-500 transition-all cursor-pointer shadow-md shadow-emerald-600/20"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consultar por WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
