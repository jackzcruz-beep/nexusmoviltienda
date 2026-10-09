import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  HelpCircle,
  Smartphone,
  Laptop,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  Zap,
  Info
} from 'lucide-react';

interface DeviceOption {
  id: string;
  name: string;
  description: string;
  port: string;
  icon: string;
  recommendation: {
    title: string;
    description: string;
    dacRequired: boolean;
    recommendedProductId?: string;
    tips: string[];
  };
}

const DEVICE_OPTIONS: DeviceOption[] = [
  {
    id: 'iphone-15-16',
    name: 'iPhone 15 o iPhone 16 (Toda la serie)',
    description: 'iPhone 15, 15 Pro, 16, 16 Pro con puerto USB-C',
    port: 'USB Tipo-C (Sin jack redondo 3.5mm)',
    icon: '🍎',
    recommendation: {
      title: 'Requiere Adaptador DAC Tipo-C Digital',
      description: 'Los iPhone 15 y 16 cambiaron a USB-C y no tienen entrada redonda. Necesitas un adaptador con chip DAC digital para convertir el audio sin pérdida de volumen.',
      dacRequired: true,
      recommendedProductId: 'cable-dac-cx31993',
      tips: [
        'Conecta y reproduce al instante (Plug & Play, no requiere apps).',
        'El chip DAC interno entrega mayor potencia y volumen que el audio Bluetooth.',
        'También puedes comprar cualquier audífono KZ eligiendo la opción "Tipo-C" al agregarlo.'
      ]
    }
  },
  {
    id: 'android-no-jack',
    name: 'Samsung Galaxy / Xiaomi / Pixel (Sin conector 3.5)',
    description: 'Samsung S21/S22/S23/S24, Xiaomi gama media/alta, etc.',
    port: 'USB Tipo-C exclusivo',
    icon: '🤖',
    recommendation: {
      title: 'Requiere Adaptador DAC Hi-Res Tipo-C',
      description: 'Los teléfonos modernos sin conector redondo requieren un adaptador con chip decodificador de sonido digital para que no dé error de "dispositivo no compatible".',
      dacRequired: true,
      recommendedProductId: 'cable-dac-cx31993',
      tips: [
        'Nuestro DAC Hi-Res Nexus cuenta con chip de sonido HD compatible con Samsung y Xiaomi.',
        'Elimina ruidos de estática y amplifica los bajos.',
        'Funciona para música, micrófono de llamadas y juegos sin latencia.'
      ]
    }
  },
  {
    id: 'iphone-lightning',
    name: 'iPhone 14, 13, 12, 11 o anterior',
    description: 'Modelos con el puerto tradicional Lightning',
    port: 'Puerto Lightning de Apple',
    icon: '🍏',
    recommendation: {
      title: 'Compatible con Adaptador Lightning oficial',
      description: 'Puedes conectar cualquiera de nuestros audífonos KZ o Moondrop usando el adaptador Lightning a 3.5mm de Apple o un cable Lightning para audífonos IEM.',
      dacRequired: false,
      tips: [
        'Cualquier modelo KZ con cable 3.5mm estándar funciona conectándolo a tu adaptador Lightning.',
        'Conserva la función de micrófono para llamadas y notas de voz.'
      ]
    }
  },
  {
    id: 'phone-with-jack',
    name: 'Celular con entrada redonda 3.5mm',
    description: 'Xiaomi Redmi, Motorola, POCO o modelos con jack tradicional',
    port: 'Jack de audio redondo 3.5mm incluido',
    icon: '📱',
    recommendation: {
      title: '¡100% Compatible Directo (Sin adaptadores)!',
      description: 'Tu celular ya tiene la entrada de sonido redonda tradicional. Puedes conectar directamente cualquier audífono KZ, QKZ o Moondrop con su cable estándar.',
      dacRequired: false,
      tips: [
        'No necesitas gastar en adaptadores adicionales.',
        'Recomendamos elegir la opción "Con Micrófono" para llamadas y Discord.'
      ]
    }
  },
  {
    id: 'pc-laptop',
    name: 'Computadora / Laptop / PC Gamer',
    description: 'Cualquier laptop Windows, Mac o torre de escritorio',
    port: 'Jack 3.5mm o puerto USB',
    icon: '💻',
    recommendation: {
      title: 'Conexión Directa o Mejora con DAC USB',
      description: 'Puedes conectar tus audífonos directamente a la salida de tu laptop. Si tu PC de escritorio tiene tarjeta de sonido básica, conectar el DAC por USB aumentará el detalle para escuchar pasos en juegos.',
      dacRequired: false,
      recommendedProductId: 'cable-dac-cx31993',
      tips: [
        'En laptops con 1 solo puerto combinado, el micrófono funciona al instante.',
        'Para escuchar pasos en FPS (CS2, Valorant, Warzone), los IEMs KZ Castor o EDX Pro son ideales.'
      ]
    }
  }
];

interface CableCompatibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CableCompatibilityModal: React.FC<CableCompatibilityModalProps> = ({
  isOpen,
  onClose
}) => {
  const {
    setSelectedProductModal,
    setSelectedCategory,
    products,
    settings,
    cableModalInitialDevice
  } = useStore();
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>(cableModalInitialDevice || 'iphone-15-16');

  React.useEffect(() => {
    if (cableModalInitialDevice) {
      setSelectedDeviceId(cableModalInitialDevice);
    }
  }, [cableModalInitialDevice, isOpen]);

  if (!isOpen) return null;

  const currentOption = DEVICE_OPTIONS.find(d => d.id === selectedDeviceId) || DEVICE_OPTIONS[0];

  const handleOpenProduct = (productId: string) => {
    const prod = products.find(p => p.id === productId);
    if (prod) {
      setSelectedProductModal(prod);
      onClose();
    }
  };

  const handleWhatsAppConsult = () => {
    const cleanPhone = (settings.whatsappNumber || '+584164761875').replace(/[^0-9]/g, '') || '584164761875';
    const message = `*👋 ¡Hola NexusMóvil! Tengo una duda sobre compatibilidad de cables:*\n\n` +
      `• *Mi dispositivo es:* ${currentOption.name}\n` +
      `• *Tipo de puerto:* ${currentOption.port}\n\n` +
      `¿Qué audífonos y adaptador me recomiendan para mi teléfono? ¡Gracias!`;

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0e1422] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-[#090d16]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Guía de Compatibilidad: Cables y Adaptadores
              </h3>
              <p className="text-[11px] text-slate-400">
                Selecciona tu teléfono y te decimos exactamente qué necesitas
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {/* Step 1: Device Selector */}
          <div>
            <label className="block text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
              1. Selecciona tu teléfono o dispositivo:
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {DEVICE_OPTIONS.map(device => {
                const isSelected = device.id === selectedDeviceId;
                return (
                  <button
                    key={device.id}
                    type="button"
                    onClick={() => setSelectedDeviceId(device.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-400 ring-1 ring-cyan-400/50 shadow-xs'
                        : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xl shrink-0">{device.icon}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-white leading-tight">
                        {device.name}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                        {device.port}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Instant Diagnostic Result */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 space-y-3 animate-in fade-in">
            <div className="flex items-center gap-2">
              <span className="text-base">{currentOption.icon}</span>
              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                  Diagnóstico para tu equipo:
                </span>
                <h4 className="text-sm font-bold text-white">
                  {currentOption.recommendation.title}
                </h4>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {currentOption.recommendation.description}
            </p>

            {/* Tips / Advice list */}
            <div className="space-y-1.5 pt-1">
              {currentOption.recommendation.tips.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>

            {/* If DAC adapter is recommended, show quick card */}
            {currentOption.recommendation.recommendedProductId && (
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-3 bg-slate-950/60 p-3 rounded-xl border">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-lg">🔌</span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">
                      Adaptador DAC Hi-Res Tipo-C ($15 USD)
                    </p>
                    <p className="text-[10px] text-emerald-400 font-medium">
                      ✓ Probado y garantizado con tu teléfono
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenProduct(currentOption.recommendation.recommendedProductId!)}
                  className="px-3 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold shrink-0 transition-colors cursor-pointer"
                >
                  Ver Adaptador
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3 border-t border-slate-800 bg-[#090d16] flex items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={handleWhatsAppConsult}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Consultar con un asesor por WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedCategory('iem-audio');
              onClose();
              document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Explorar Audífonos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
