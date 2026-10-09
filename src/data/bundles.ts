import { MagicBundle } from '../types';

export const MAGIC_BUNDLES: MagicBundle[] = [
  {
    id: 'set-monitoreo-pro',
    title: 'Set Monitoreo Pro Audio',
    tagline: 'La combinación definitiva para músicos, cantantes y audiófilos de estudio',
    description: 'Equípate como los profesionales con los galardonados KZ EDX Pro, un cable DAC Hi-Res con chip Conexant de 32 bits para máxima pureza sonora sin distorsión y el estuche protector oficial KZ.',
    category: 'audiophile',
    badge: '18% Descuento Especial',
    discountPercentage: 18,
    regularPrice: 39.00,
    bundlePrice: 32.00,
    items: [
      {
        productId: 'kz-edx-pro',
        productName: 'Audífonos In-Ear KZ EDX Pro',
        role: 'Monitores In-Ear de alta sensibilidad',
        defaultColor: 'Cyan Esmeralda',
        defaultFormat: 'Sin Micrófono (Plug Dorado 3.5mm)'
      },
      {
        productId: 'cable-dac-cx31993',
        productName: 'Cable DAC Hi-Res Conexant CX31993',
        role: 'Procesador de audio 32bit / 384kHz Tipo-C',
        defaultColor: 'Plata Pura & Titanio',
        defaultFormat: 'Tipo-C a Jack 3.5mm Hi-Res'
      },
      {
        productId: 'kz-hardcase-pouch',
        productName: 'Estuche Rígido Antigolpes KZ Original',
        role: 'Protección rígida con bolsillo para accesorios',
        defaultColor: 'Carbon Black (Negro Fibra de Carbono)',
        defaultFormat: 'Estuche Individual'
      }
    ]
  },
  {
    id: 'set-bajos-profundos',
    title: 'Set Monitoreo de Bajos & Bass-Head',
    tagline: 'Impacto acústico con sub-bajos retumbantes y sellado perfecto',
    description: 'Diseñado para productores de música urbana, bajistas, bateristas y amantes de los graves profundos. Combina los KZ Castor de doble driver dinámico con interruptores de bajos físicos, almohadillas memory foam que aumentan +4dB de sub-bass y el DAC CX31993.',
    category: 'bass-head',
    badge: 'Recomendado por Audiófilos',
    discountPercentage: 20,
    regularPrice: 58.00,
    bundlePrice: 46.00,
    items: [
      {
        productId: 'kz-castor-bass',
        productName: 'KZ Castor Bass Edition (Doble Driver Dinámico)',
        role: 'IEMs con 4 interruptores físicos de sub-bajos',
        defaultColor: 'Smoke Black (Gris Ahumado)',
        defaultFormat: 'Jack 3.5mm Con Micrófono HD'
      },
      {
        productId: 'memory-foam-tips-kz',
        productName: 'Almohadillas Memory Foam (Pack 3 Pares)',
        role: 'Sellado hermético y ganancia de bajas frecuencias',
        defaultColor: 'Negro Carbón Pro',
        defaultFormat: 'Pack Trío S/M/L (3 Pares)'
      },
      {
        productId: 'cable-dac-cx31993',
        productName: 'Cable DAC Hi-Res Conexant CX31993',
        role: 'Decodificador Tipo-C de alta potencia 65mW',
        defaultColor: 'Plata Pura & Titanio',
        defaultFormat: 'Tipo-C a Jack 3.5mm Hi-Res'
      }
    ]
  },
  {
    id: 'set-gamer-esports-pro',
    title: 'Set Gamer Competitivo Esports',
    tagline: 'Precisión milimétrica de 49 gramos, respuesta de 1ms y expansión total',
    description: 'Domina cualquier lobby competitivo en CS2, Valorant o Warzone. El mouse ultraligero Nexus Aero de 49g con sensor PAW3395 insignia, teclado custom 75% con switches pre-lubricados y hub multipuerto para no quedarte sin puertos.',
    category: 'gaming',
    badge: 'Ahorro de $30 USD',
    discountPercentage: 20,
    regularPrice: 155.00,
    bundlePrice: 124.00,
    items: [
      {
        productId: 'mouse-nexus-aero-49g',
        productName: 'Mouse Gamer Ultraligero Nexus Aero 49g',
        role: 'Sensor PAW3395 26K DPI & Tri-Mode Wireless',
        defaultColor: 'Matte Stealth Black',
        defaultFormat: 'Versión 1000Hz Polling Rate'
      },
      {
        productId: 'teclado-nexus-chroma-75',
        productName: 'Teclado Mecánico Custom 75% Nexus Chroma',
        role: 'Estructura Gasket Mount con switches lubricados',
        defaultColor: 'Dark Slate & Cyan',
        defaultFormat: 'Switches Gateron Yellow (Lineales cremosos 50g)'
      },
      {
        productId: 'hub-usbc-8en1-nexus',
        productName: 'Hub USB-C Multipuerto 8 en 1 Nexus Pro',
        role: '4K@60Hz HDMI + Ethernet Gigabit de baja latencia',
        defaultColor: 'Space Gray (Gris Espacial)',
        defaultFormat: 'Versión 8 en 1 Estándar (HDMI 4K 60Hz)'
      }
    ]
  },
  {
    id: 'set-moondrop-starter',
    title: 'Set Moondrop Audiophile Starter',
    tagline: 'Timbre neutral acústico de referencia con diafragma de carbono diamante',
    description: 'La puerta de entrada a la mítica afinación VDSF de Moondrop. Los auriculares Chu II con cuerpo de metal pulido emparejados con el amplificador DAC Conexant para exprimir cada detalle de tus pistas en formato FLAC o Tidal Hi-Res.',
    category: 'starter',
    badge: 'Sonido Alta Fidelidad',
    discountPercentage: 15,
    regularPrice: 47.00,
    bundlePrice: 40.00,
    items: [
      {
        productId: 'moondrop-chu-ii',
        productName: 'Moondrop Chu II (Cuerpo Metálico & Diafragma DLC)',
        role: 'Monitores In-Ear de referencia con boquillas de latón',
        defaultColor: 'Matte Black Alloy',
        defaultFormat: 'Estándar 3.5mm Jack Bañado en Oro'
      },
      {
        productId: 'cable-dac-cx31993',
        productName: 'Cable DAC Hi-Res Conexant CX31993',
        role: 'Procesamiento de sonido de 32-bit a 384kHz',
        defaultColor: 'Negro Matte & Oro',
        defaultFormat: 'Tipo-C a Jack 3.5mm Hi-Res'
      }
    ]
  },
  {
    id: 'set-streamer-workstation',
    title: 'Set Streamer & Estación 4K 144Hz',
    tagline: 'Máxima productividad, video fluido sin latencia y audio inalámbrico',
    description: 'El combo ideal para creadores de contenido, streamers y laptops gamer. Adaptador de video 8K/4K 144Hz para monitores ultra-rápidos, Hub 8 en 1 con Ethernet por cable y audífonos de diadema con cancelación activa de ruido.',
    category: 'streaming',
    badge: 'Combo Pro Creator',
    discountPercentage: 16,
    regularPrice: 119.00,
    bundlePrice: 99.00,
    items: [
      {
        productId: 'hub-usbc-8en1-nexus',
        productName: 'Hub USB-C Multipuerto 8 en 1 Nexus Pro',
        role: 'Conexión a periféricos y red Gigabit por cable',
        defaultColor: 'Space Gray (Gris Espacial)',
        defaultFormat: 'Versión 8 en 1 Estándar (HDMI 4K 60Hz)'
      },
      {
        productId: 'adaptador-8k-usbc-hdmi',
        productName: 'Adaptador Video 8K 60Hz / 4K 144Hz HDMI 2.1',
        role: 'Salida de video fluida a 144Hz sin tearing',
        defaultColor: 'Titanium Grey Anodizado',
        defaultFormat: 'Cable Adaptador 20cm (Dongle)'
      },
      {
        productId: 'audifonos-diadema-anc-nexus',
        productName: 'Audífonos Inalámbricos Diadema Nexus Apex ANC',
        role: 'Cancelación de ruido de fondo y 60h de batería',
        defaultColor: 'Deep Matte Black',
        defaultFormat: 'Estuche Blando de Microfibra Incluido'
      }
    ]
  }
];
