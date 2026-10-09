import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'kz-castor-bass',
    name: 'KZ Castor Bass Edition',
    brand: 'KZ',
    category: 'iem-audio',
    subcategory: 'In-Ear Monitors',
    price: 36.00,
    originalPrice: 48.00,
    image: '/src/assets/images/product_kz_castor_iem_1790823813192.jpg',
    idealFor: 'Bajos profundos, música urbana y juegos competitivos (escuchar pasos claros).',
    description: 'Los audífonos in-ear más recomendados por su sonido potente y nítido. Cuentan con doble parlante interno y 4 interruptores físicos para ajustar la intensidad de los bajos según tu gusto.',
    features: [
      'Doble parlante dinámico interno para bajos y agudos separados',
      '4 interruptores para subir o bajar los bajos físicamente',
      'Cable trenzado reforzado y desmontable (fácil de cambiar)',
      'Aíslan el ruido exterior para disfrutar tu música sin distracciones'
    ],
    specs: {
      'Uso Recomendado': 'Celular, PC, Gaming, Música',
      'Interruptores': '4 switches para calibrar bajos',
      'Conexión': 'Cable desmontable 2-pin',
      'Compatibilidad': 'Universal (Android, iPhone, PC, consolas)'
    },
    colors: [
      { name: 'Negro Ahumado (Smoke Black)', hex: '#262626', inStock: true },
      { name: 'Transparente (Crystal Clear)', hex: '#e2e8f0', inStock: true },
      { name: 'Cyan Esmeralda', hex: '#06b6d4', inStock: true }
    ],
    formats: [
      { name: 'Con Micrófono (Para llamadas y juegos)', priceDelta: 0, inStock: true },
      { name: 'Sin Micrófono (Solo para música)', priceDelta: -2, inStock: true },
      { name: 'Para Celular Tipo-C (Con chip digital HD)', priceDelta: 6, inStock: true }
    ],
    stock: 24,
    rating: 4.9,
    reviewsCount: 88,
    badge: 'Más Recomendado',
    isFeatured: true,
    soundSignature: 'bass-head'
  },
  {
    id: 'kz-edx-pro',
    name: 'KZ EDX Pro Hi-Fi',
    brand: 'KZ',
    category: 'iem-audio',
    subcategory: 'In-Ear Monitors',
    price: 18.00,
    originalPrice: 26.00,
    image: '/src/assets/images/hero_iem_showcase_1790823801977.jpg',
    idealFor: 'Económicos, excelente sonido para el día a día, Discord, clases y música.',
    description: 'El audífono favorito de entrada. Ofrece un volumen alto y claro, bajos contundentes y micrófono de alta definición para videollamadas, juegos y escuchar música con gran nitidez.',
    features: [
      'Sonido claro y potente con bajos marcados',
      'Micrófono con botón para pausar música y contestar llamadas',
      'Diseño ergonómico transparente que no se cae de la oreja',
      'Cable resistente que no se enreda'
    ],
    specs: {
      'Uso Recomendado': 'Uso diario, videollamadas, juegos',
      'Conector': 'Plug 3.5mm o Tipo-C',
      'Cable': '1.2 metros desmontable'
    },
    colors: [
      { name: 'Cyan Esmeralda', hex: '#0ea5e9', inStock: true },
      { name: 'Cristal Plateado', hex: '#cbd5e1', inStock: true },
      { name: 'Negro Carbón', hex: '#18181b', inStock: true }
    ],
    formats: [
      { name: 'Con Micrófono HD (Llamadas / Discord)', priceDelta: 0, inStock: true },
      { name: 'Sin Micrófono (Solo música)', priceDelta: -2, inStock: true },
      { name: 'Conector Tipo-C para celulares nuevos', priceDelta: 5, inStock: true }
    ],
    stock: 45,
    rating: 4.8,
    reviewsCount: 142,
    badge: 'Precio / Calidad',
    isFeatured: true,
    soundSignature: 'gaming'
  },
  {
    id: 'moondrop-chu-ii',
    name: 'Moondrop Chu II (Cuerpo de Metal)',
    brand: 'Moondrop',
    category: 'iem-audio',
    subcategory: 'In-Ear Monitors',
    price: 32.00,
    originalPrice: 42.00,
    image: '/src/assets/images/hero_iem_showcase_1790823801977.jpg',
    idealFor: 'Voces cristalinas, instrumentos acústicos y audio de estudio profesional.',
    description: 'Fabricados en metal sólido con un acabado premium. Su afinación acústica es famosa en todo el mundo por reproducir cada detalle de la voz e instrumentos con total naturalidad sin cansar el oído.',
    features: [
      'Carcasa de aleación de zinc de tacto frío y duradero',
      'Fidelidad acústica natural para músicos y cantantes',
      'Cable desmontable para fácil reemplazo',
      'Afinación suave y descansada para largas horas de uso'
    ],
    specs: {
      'Material': 'Metal fundido pulido',
      'Sonido': 'Neutral con gran definición',
      'Cable': 'Desmontable estándar 2 pines'
    },
    colors: [
      { name: 'Negro Metálico Mate', hex: '#1e293b', inStock: true },
      { name: 'Plateado Pulido', hex: '#e2e8f0', inStock: true }
    ],
    formats: [
      { name: 'Entrada normal 3.5mm para PC o Celular', priceDelta: 0, inStock: true },
      { name: 'Entrada Tipo-C para celulares sin conector 3.5', priceDelta: 8, inStock: true }
    ],
    stock: 19,
    rating: 4.9,
    reviewsCount: 76,
    badge: 'Calidad Estudio',
    isFeatured: true,
    soundSignature: 'balanced'
  },
  {
    id: 'qkz-x-hbb-bass',
    name: 'QKZ x HBB Bass Edition',
    brand: 'QKZ',
    category: 'iem-audio',
    subcategory: 'In-Ear Monitors',
    price: 24.00,
    originalPrice: 32.00,
    image: '/src/assets/images/product_kz_castor_iem_1790823813192.jpg',
    idealFor: 'Música electrónica, reggaeton, hip-hop y amantes de los bajos con pegada.',
    description: 'Diseñados especialmente para quienes disfrutan sentir los golpes de batería y bajos con fuerza en el pecho, manteniendo las voces nítidas y presentes.',
    features: [
      'Bajos contundentes y envolventes',
      'Diseño elegante con detalles dorados',
      'Almohadillas de ajuste cómodo para no cansar la oreja'
    ],
    specs: {
      'Enfoque': 'Bajos potentes y ritmo musical',
      'Cable': 'Desmontable con micrófono opcional'
    },
    colors: [
      { name: 'Negro con Detalles Dorados', hex: '#111827', inStock: true }
    ],
    formats: [
      { name: 'Con Micrófono HD para llamadas', priceDelta: 0, inStock: true },
      { name: 'Sin Micrófono', priceDelta: -2, inStock: true }
    ],
    stock: 16,
    rating: 4.7,
    reviewsCount: 53,
    badge: 'Super Bajos',
    soundSignature: 'bass-head'
  },
  {
    id: 'qkz-ak6-bass',
    name: 'QKZ AK6 Hi-Fi Bass Extra',
    brand: 'QKZ',
    category: 'iem-audio',
    subcategory: 'In-Ear Monitors',
    price: 12.00,
    originalPrice: 18.00,
    image: '/src/assets/images/product_kz_castor_iem_1790823813192.jpg',
    idealFor: 'Bajos potentes y contundentes para reggaetón, hip-hop, electrónica y uso diario al mejor precio.',
    description: 'El audífono in-ear más vendido por su relación precio-calidad. Equipado con driver dinámico optimizado para entregar graves profundos con pegada sólida y cable de cobre libre de oxígeno con micrófono HD.',
    features: [
      'Bajos profundos y vibrantes ideales para música urbana',
      'Cable con micrófono y botón multifunción para llamadas',
      'Gancho ergonómico que se adapta a la oreja para correr o entrenar',
      'Incluye estuche plástico rígido y gomitas intercambiables'
    ],
    specs: {
      'Firma de Sonido': 'Bass-Head (Bajos marcados)',
      'Conector': 'Plug 3.5mm dorado estandar',
      'Micrófono': 'Integrado en cable con cancelación de eco',
      'Compatibilidad': 'Universal (Android, iPhone, PC, Consolas)'
    },
    colors: [
      { name: 'Negro Translúcido', hex: '#18181b', inStock: true },
      { name: 'Azul Eléctrico', hex: '#0284c7', inStock: true },
      { name: 'Rojo Carmesí', hex: '#dc2626', inStock: true }
    ],
    formats: [
      { name: 'Con Micrófono HD (Estándar 3.5mm)', priceDelta: 0, inStock: true },
      { name: 'Con Adaptador Tipo-C para Celulares Nuevos', priceDelta: 5, inStock: true }
    ],
    stock: 35,
    rating: 4.8,
    reviewsCount: 119,
    badge: 'Ultra Económico',
    isFeatured: true,
    soundSignature: 'bass-head'
  },
  {
    id: 'kz-zsn-pro-x-monitoring',
    name: 'KZ ZSN Pro X (Monitoreo & Voces)',
    brand: 'KZ',
    category: 'iem-audio',
    subcategory: 'In-Ear Monitors',
    price: 28.00,
    originalPrice: 38.00,
    image: '/src/assets/images/hero_iem_showcase_1790823801977.jpg',
    idealFor: 'Monitoreo de escenario, cantantes, podcasters y claridad de voces e instrumentos acústicos.',
    description: 'Configuración híbrida (1 parlante dinámico + 1 armadura balanceada) que separa los agudos de los medios. Excelente para músicos de iglesia, cantantes en vivo o quienes buscan escuchar cada respiración y detalle de la voz sin distorsión.',
    features: [
      'Arquitectura híbrida dual para separación quirúrgica de instrumentos',
      'Voces adelantadas y claras sin opacarse por los instrumentos',
      'Carcasa de aleación de zinc y resina acústica de alta densidad',
      'Cable trenzado de plata de 4 núcleos desmontable'
    ],
    specs: {
      'Firma de Sonido': 'Monitoreo Analítico & Voces Nítidas',
      'Configuración': '1 Driver Dinámico + 1 Driver Balanced Armature',
      'Conector': '2 pines 0.75mm desmontable (Pin C)',
      'Aislamiento': 'Atenuación pasiva hasta 26dB'
    },
    colors: [
      { name: 'Oro Real (Gold & Clear)', hex: '#eab308', inStock: true },
      { name: 'Negro Metálico', hex: '#27272a', inStock: true }
    ],
    formats: [
      { name: 'Con Micrófono HD para transmisión / llamadas', priceDelta: 0, inStock: true },
      { name: 'Sin Micrófono (Uso Monitoreo de Escenario)', priceDelta: -2, inStock: true },
      { name: 'Con Adaptador Tipo-C Hi-Res', priceDelta: 6, inStock: true }
    ],
    stock: 20,
    rating: 4.9,
    reviewsCount: 84,
    badge: 'Monitoreo Escenario',
    isFeatured: true,
    soundSignature: 'monitoring'
  },
  {
    id: 'cable-dac-cx31993',
    name: 'Adaptador DAC Hi-Res Tipo-C (Mejora de Sonido)',
    brand: 'Nexus',
    category: 'accesorios-audio',
    subcategory: 'Cables & DACs',
    price: 15.00,
    originalPrice: 22.00,
    image: '/src/assets/images/product_hub_dac_gear_1790823888555.jpg',
    idealFor: 'Conectar audífonos a celulares nuevos (iPhone 15/16, Samsung, Xiaomi) con más volumen y nitidez.',
    description: '¿Tu celular no tiene entrada de audífonos redonda? Este pequeño adaptador Tipo-C incluye un chip de sonido de alta fidelidad que no solo te permite conectar tus audífonos, sino que aumenta el volumen y quita el ruido de fondo.',
    features: [
      'Funciona al instante sin instalar nada (Plug & Play)',
      'Aumenta la potencia y claridad del sonido de tus audífonos',
      'Compatible con iPhone 15/16, Android, iPad y computadores',
      'Cable trenzado con puntas metálicas reforzadas'
    ],
    specs: {
      'Entrada': 'USB Tipo-C',
      'Salida': 'Jack 3.5mm para audífonos',
      'Compatibilidad': 'iPhone 15/16, Android, PC, Mac'
    },
    colors: [
      { name: 'Plata Titanio', hex: '#94a3b8', inStock: true },
      { name: 'Negro Mate', hex: '#18181b', inStock: true }
    ],
    formats: [
      { name: 'Para Celular Tipo-C', priceDelta: 0, inStock: true },
      { name: 'Para Celular + Adaptador para PC USB normal', priceDelta: 3, inStock: true }
    ],
    stock: 38,
    rating: 4.9,
    reviewsCount: 94,
    badge: 'Indispensable',
    isFeatured: true
  },
  {
    id: 'kz-hardcase-pouch',
    name: 'Estuche Antigolpes KZ para Audífonos',
    brand: 'KZ',
    category: 'accesorios-audio',
    subcategory: 'Fundas & Protección',
    price: 6.00,
    originalPrice: 9.00,
    image: '/src/assets/images/product_hub_dac_gear_1790823888555.jpg',
    idealFor: 'Guardar y proteger tus audífonos en el bolsillo o bolso para que no se dañen ni enreden.',
    description: 'Estuche rígido con cierre resistente y textura de fibra de carbono. En su interior cuenta con bolsillo de malla para llevar tus audífonos, cables y adaptadores bien ordenados y seguros contra golpes.',
    features: [
      'Carcasa rígida que resiste aplastamientos y caídas',
      'Bolsillo interno elástico para guardar accesorios',
      'Tamaño de bolsillo fácil de llevar a todos lados'
    ],
    specs: {
      'Tamaño': '8.5 x 7.5 cm (Cabe en cualquier bolsillo)',
      'Material': 'Rígido con cierre'
    },
    colors: [
      { name: 'Negro Fibra de Carbono', hex: '#0f172a', inStock: true },
      { name: 'Gris Grafito', hex: '#475569', inStock: true }
    ],
    formats: [
      { name: 'Estuche Individual', priceDelta: 0, inStock: true }
    ],
    stock: 50,
    rating: 4.8,
    reviewsCount: 61,
    badge: 'Protección'
  },
  {
    id: 'memory-foam-tips-kz',
    name: 'Almohadillas de Espuma Suave Memory Foam (3 Pares)',
    brand: 'KZ',
    category: 'accesorios-audio',
    subcategory: 'Almohadillas',
    price: 7.00,
    originalPrice: 11.00,
    image: '/src/assets/images/product_kz_castor_iem_1790823813192.jpg',
    idealFor: 'Hacer tus audífonos más cómodos, aislar el ruido exterior y aumentar los bajos.',
    description: 'Se amoldan a la forma exacta de tu oído con el calor corporal. Sellan mucho mejor que las gomitas de silicona comunes, haciendo que los bajos suenen más fuertes y que no te molesten al usarlos por horas.',
    features: [
      'Espuma viscoelástica súper suave que no cansa el oído',
      'Mayor aislamiento acústico del ruido de la calle u oficina',
      'Pack incluye 3 tamaños: Pequeño, Mediano y Grande'
    ],
    specs: {
      'Contenido': '3 pares (S / M / L)',
      'Compatibilidad': 'Universal para audífonos in-ear'
    },
    colors: [
      { name: 'Negro Carbón', hex: '#18181b', inStock: true }
    ],
    formats: [
      { name: 'Pack Completo 3 Pares (S, M, L)', priceDelta: 0, inStock: true }
    ],
    stock: 60,
    rating: 4.9,
    reviewsCount: 47,
    badge: 'Más Comodidad'
  },
  {
    id: 'mouse-nexus-aero-49g',
    name: 'Mouse Gamer Ultraliviano Nexus Aero 49g',
    brand: 'Nexus',
    category: 'perifericos',
    subcategory: 'Mice Gamer',
    price: 49.00,
    originalPrice: 65.00,
    image: '/src/assets/images/product_gaming_setup_1790823877180.jpg',
    idealFor: 'Jugar en PC con máxima rapidez de movimiento sin cansar la muñeca.',
    description: 'Pesa solo 49 gramos para que puedas apuntar y moverte con total agilidad. Funciona sin cables (inalámbrico de alta velocidad sin retrasos), por Bluetooth y también con cable recargable con batería de larga duración.',
    features: [
      'Peso pluma de 49 gramos (ultra liviano)',
      'Conexión inalámbrica veloz de 1ms sin retardo',
      'Deslizamiento súper suave en cualquier pad mouse',
      'Batería recargable con hasta 70 horas de juego continuo'
    ],
    specs: {
      'Peso': '49 gramos',
      'Conexión': 'Inalámbrico 2.4G + Bluetooth + Cable',
      'Compatibilidad': 'Windows, Mac, Laptops'
    },
    colors: [
      { name: 'Negro Mate', hex: '#09090b', inStock: true },
      { name: 'Blanco Ártico', hex: '#f8fafc', inStock: true }
    ],
    formats: [
      { name: 'Versión Inalámbrica Estándar', priceDelta: 0, inStock: true }
    ],
    stock: 22,
    rating: 4.9,
    reviewsCount: 71,
    badge: 'Ultra Ligero',
    isFeatured: true
  },
  {
    id: 'teclado-nexus-chroma-75',
    name: 'Teclado Mecánico Compacto 75% Nexus',
    brand: 'Nexus',
    category: 'perifericos',
    subcategory: 'Teclados Mecánicos',
    price: 68.00,
    originalPrice: 89.00,
    image: '/src/assets/images/product_gaming_setup_1790823877180.jpg',
    idealFor: 'Escribir y jugar con sonido suave y agradable, perilla de volumen y luces RGB.',
    description: 'Teclado mecánico compacto que ahorra espacio en tu mesa. Sus teclas tienen un sonido suave y satisfactorio al escribir, incluye perilla metálica para subir o bajar el volumen fácilmente y luces de colores ajustables.',
    features: [
      'Tamaño 75%: compacto pero con teclas de flecha y perilla',
      'Sonido suave amortiguado con capas de espuma interna',
      'Luces RGB con múltiples efectos de color',
      'Cable desmontable para transportarlo fácilmente'
    ],
    specs: {
      'Teclas': 'Compacto 75% con perilla de volumen',
      'Conexión': 'Cable USB Tipo-C desmontable',
      'Compatibilidad': 'Windows, Mac, Laptops'
    },
    colors: [
      { name: 'Gris Oscuro con Cyan', hex: '#0f172a', inStock: true }
    ],
    formats: [
      { name: 'Teclas Suaves y Silenciosas (Switches Red)', priceDelta: 0, inStock: true },
      { name: 'Teclas con Sonido Cremoso (Switches Yellow)', priceDelta: 4, inStock: true }
    ],
    stock: 15,
    rating: 4.8,
    reviewsCount: 39,
    badge: 'Tacto Suave',
    isFeatured: true
  },
  {
    id: 'hub-usbc-8en1-nexus',
    name: 'Hub Adaptador Multipuerto 8 en 1 para Laptop',
    brand: 'Nexus',
    category: 'adaptadores-hubs',
    subcategory: 'Hubs USB-C',
    price: 38.00,
    originalPrice: 52.00,
    image: '/src/assets/images/product_hub_dac_gear_1790823888555.jpg',
    idealFor: 'Conectar pantallas, memorias USB, internet por cable y cargador a tu laptop con 1 solo puerto.',
    description: 'Convierte un solo puerto de tu computador en 8 conexiones útiles: salida HDMI para televisores y monitores, 3 puertos USB para mouse y memorias, lector de tarjetas de fotos, puerto de red de internet y carga rápida.',
    features: [
      'Salida HDMI para conectar televisores y pantallas en alta definición',
      '3 puertos USB para conectar mouse, teclado y memorias',
      'Puerto de red de cable para internet rápido y estable',
      'Carcasa de aluminio que no se calienta'
    ],
    specs: {
      'Puertos': 'HDMI, 3x USB, Red Ethernet, Lector Memorias, Carga',
      'Compatibilidad': 'MacBook, Laptops Windows, iPad, tablets'
    },
    colors: [
      { name: 'Gris Espacial (Aluminio)', hex: '#475569', inStock: true }
    ],
    formats: [
      { name: 'Versión 8 en 1 Completa', priceDelta: 0, inStock: true }
    ],
    stock: 28,
    rating: 4.9,
    reviewsCount: 65,
    badge: 'Multipuerto',
    isFeatured: true
  },
  {
    id: 'adaptador-8k-usbc-hdmi',
    name: 'Cable Adaptador USB-C a HDMI 4K / 8K',
    brand: 'UGREEN',
    category: 'adaptadores-hubs',
    subcategory: 'Adaptadores de Video',
    price: 22.00,
    originalPrice: 29.00,
    image: '/src/assets/images/product_hub_dac_gear_1790823888555.jpg',
    idealFor: 'Ver la pantalla de tu celular, tablet o laptop en tu televisor o monitor con máxima calidad.',
    description: 'Conecta tu dispositivo directamente a un monitor o TV. Soporta video ultra nítido sin cortes ni retrasos, perfecto para ver series, películas, presentaciones de trabajo o videojuegos en pantalla grande.',
    features: [
      'Imagen ultra nítida en 4K y 8K',
      'Conexión instantánea sin necesidad de configurar nada',
      'Cable reforzado y conectores dorados duraderos'
    ],
    specs: {
      'Conexión': 'De USB-C hacia HDMI TV/Monitor',
      'Resolución': 'Hasta 4K / 8K Ultra HD'
    },
    colors: [
      { name: 'Gris Titanio', hex: '#64748b', inStock: true }
    ],
    formats: [
      { name: 'Adaptador Compacto (Dongle)', priceDelta: 0, inStock: true }
    ],
    stock: 31,
    rating: 4.8,
    reviewsCount: 42,
    badge: 'Video 4K'
  },
  {
    id: 'audifonos-diadema-anc-nexus',
    name: 'Audífonos Inalámbricos de Diadema Nexus Apex',
    brand: 'Nexus',
    category: 'iem-audio',
    subcategory: 'Diademas Inalámbricas',
    price: 59.00,
    originalPrice: 79.00,
    image: '/src/assets/images/hero_iem_showcase_1790823801977.jpg',
    idealFor: 'Viajes, oficina y descanso con cancelación de ruido y 60 horas de batería.',
    description: 'Audífonos de diadema con cancelación activa de ruido que apaga el sonido del entorno con un botón. Almohadillas acolchadas de espuma suave para usarlos todo el día sin molestias y batería que dura semanas.',
    features: [
      'Cancelación de ruido para apagar el ruido de la calle o transporte',
      'Batería gigante con hasta 60 horas de música continua',
      'Bluetooth inalámbrico y entrada auxiliar por cable incluida',
      'Micrófono integrado para llamadas claras'
    ],
    specs: {
      'Batería': 'Hasta 60 horas de uso',
      'Conexión': 'Bluetooth 5.3 + Cable 3.5mm auxiliar',
      'Almohadillas': 'Cuero suave con memoria'
    },
    colors: [
      { name: 'Negro Mate', hex: '#09090b', inStock: true },
      { name: 'Blanco Lunar', hex: '#e2e8f0', inStock: true }
    ],
    formats: [
      { name: 'Versión con Estuche de Tela', priceDelta: 0, inStock: true },
      { name: 'Con Estuche Rígido de Viaje', priceDelta: 8, inStock: true }
    ],
    stock: 18,
    rating: 4.9,
    reviewsCount: 52,
    badge: 'Sin Ruido',
    soundSignature: 'monitoring'
  },
  {
    id: 'cpu-amd-ryzen-5600',
    name: 'Procesador AMD Ryzen 5 5600 (6 Núcleos / 12 Hilos 4.4GHz)',
    brand: 'AMD',
    category: 'componentes-pc',
    subcategory: 'Procesadores',
    price: 135.00,
    originalPrice: 165.00,
    image: '/src/assets/images/product_gaming_setup_1790823877180.jpg',
    idealFor: 'Gamer competitivo, streaming, diseño y edición de video con máxima eficiencia.',
    description: 'Procesador de alto rendimiento para socket AM4 con 6 núcleos y 12 hilos, 35MB de caché total y soporte PCIe 4.0. Ideal para jugar a más de 144 FPS en Warzone, Valorant y CS2.',
    features: [
      '6 núcleos y 12 hilos con frecuencia turbo hasta 4.4 GHz',
      'Excelente temperatura y bajo consumo energético',
      'Compatible con placas madre AM4 B450, B550 y X570',
      'Incluye disipador de calor original Wraith Stealth'
    ],
    specs: {
      'Socket': 'AM4',
      'Núcleos / Hilos': '6C / 12T',
      'Frecuencia Base': '3.5 GHz (Boost 4.4 GHz)',
      'TDP': '65W'
    },
    colors: [
      { name: 'Original Sellado en Caja', hex: '#ef4444', inStock: true }
    ],
    formats: [
      { name: 'Caja Sellada con Disipador Original', priceDelta: 0, inStock: true }
    ],
    stock: 12,
    rating: 5.0,
    reviewsCount: 38,
    badge: 'Alto Rendimiento',
    isFeatured: true
  },
  {
    id: 'pasta-termica-arctic-mx4',
    name: 'Pasta Térmica Arctic MX-4 4g de Alto Rendimiento',
    brand: 'Arctic',
    category: 'componentes-pc',
    subcategory: 'Enfriamiento & Pastas',
    price: 9.00,
    originalPrice: 14.00,
    image: '/src/assets/images/product_hub_dac_gear_1790823888555.jpg',
    idealFor: 'Bajar las temperaturas de procesadores y tarjetas de video de laptops y computadoras.',
    description: 'La pasta térmica más confiable y vendida del mundo. No conduce electricidad, dura más de 8 años sin secarse y logra reducir de 5°C a 12°C la temperatura de tu procesador o tarjeta gráfica.',
    features: [
      'Conductividad térmica superior sin riesgo de cortocircuitos',
      'Fácil de aplicar con su jeringa dosificadora',
      'Rinde para más de 6 mantenimientos de PC o laptop',
      'Durabilidad comprobada de hasta 8 años'
    ],
    specs: {
      'Contenido': '4 gramos',
      'Conductividad': 'No conductora de electricidad (100% segura)',
      'Compatibilidad': 'CPU, GPU, Consolas (PS4, PS5, Xbox)'
    },
    colors: [
      { name: 'Gris Carbón', hex: '#64748b', inStock: true }
    ],
    formats: [
      { name: 'Jeringa 4g con Espátula de Aplicación', priceDelta: 0, inStock: true }
    ],
    stock: 40,
    rating: 4.9,
    reviewsCount: 82,
    badge: 'Máximo Enfriamiento',
    isFeatured: true
  },
  {
    id: 'ram-kingston-fury-16gb',
    name: 'Memoria RAM Kingston Fury Beast DDR4 16GB (3200MHz)',
    brand: 'Kingston',
    category: 'componentes-pc',
    subcategory: 'Memorias RAM',
    price: 45.00,
    originalPrice: 58.00,
    image: '/src/assets/images/product_gaming_setup_1790823877180.jpg',
    idealFor: 'Acelerar juegos pesados, multitarea fluida y navegación sin cuelgues.',
    description: 'Módulo de memoria DDR4 de 16GB a 3200MHz con disipador térmico de aluminio negro de bajo perfil. Certificada para Intel XMP y AMD Ryzen para estabilidad garantizada.',
    features: [
      'Velocidad de 3200 MHz para juegos y programas exigentes',
      'Disipador de aluminio negro que mantiene la memoria fresca',
      'Perfil bajo compatible con cualquier disipador de CPU',
      'Plug and Play con overclocking automático'
    ],
    specs: {
      'Capacidad': '16 GB (1x16GB o expandible)',
      'Tipo': 'DDR4 3200MHz CL16',
      'Compatibilidad': 'Intel y AMD Ryzen'
    },
    colors: [
      { name: 'Negro Mate Beast', hex: '#18181b', inStock: true }
    ],
    formats: [
      { name: 'Módulo Individual 16GB 3200MHz', priceDelta: 0, inStock: true },
      { name: 'Kit Dual Channel 2x8GB (16GB)', priceDelta: 4, inStock: true }
    ],
    stock: 25,
    rating: 4.9,
    reviewsCount: 46,
    badge: 'Velocidad Pura'
  }
];
