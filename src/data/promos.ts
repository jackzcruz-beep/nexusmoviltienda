import { PromoSlide } from '../types';

export const PROMO_SLIDES: PromoSlide[] = [
  {
    id: 'promo-1',
    title: 'Sonido Puro de Estudio con KZ, QKZ & Moondrop',
    subtitle: 'Descubre los monitores In-Ear que están transformando la música y el gaming. Claridad acústica de grado audiófilo con entrega inmediata.',
    badge: 'Lanzamiento Especial',
    ctaText: 'Explorar Catálogo Hi-Fi',
    actionType: 'category',
    actionTarget: 'iem-audio',
    image: '/src/assets/images/hero_iem_showcase_1790823801977.jpg',
    accent: '#06b6d4'
  },
  {
    id: 'promo-2',
    title: 'Gran Sorteo Mensual: Gana un Set Audiófilo Pro KZ',
    subtitle: 'Participa gratis con tu cuenta o número de WhatsApp en la dinámica de este mes. Llévate unos KZ Castor + Cable DAC Hi-Res + Estuche Oficial.',
    badge: 'Dinámica Exclusiva 🎁',
    ctaText: 'Participar en la Dinámica',
    actionType: 'giveaway',
    actionTarget: 'giveaway-modal',
    image: '/src/assets/images/product_kz_castor_iem_1790823813192.jpg',
    accent: '#8b5cf6'
  },
  {
    id: 'promo-3',
    title: 'Periféricos Esports: 49g Ultraligero & PAW3395 Flagship',
    subtitle: 'Velocidad de reacción pura para competir sin concesiones. Teclados Custom con estructura Gasket y switches lubricados de fábrica.',
    badge: 'Gaming Alto Rendimiento',
    ctaText: 'Ver Periféricos Gamer',
    actionType: 'category',
    actionTarget: 'perifericos',
    image: '/src/assets/images/product_gaming_setup_1790823877180.jpg',
    accent: '#10b981'
  },
  {
    id: 'promo-4',
    title: 'Combos Especiales con Descuento Directo',
    subtitle: 'Llévate el paquete completo de audífonos + adaptador DAC + estuche protector listo para conectar y con precio rebajado.',
    badge: 'Ahorro Garantizado',
    ctaText: 'Ver Combos con Descuento',
    actionType: 'bundle',
    actionTarget: 'magic-bundles',
    image: '/src/assets/images/product_hub_dac_gear_1790823888555.jpg',
    accent: '#f59e0b'
  }
];
