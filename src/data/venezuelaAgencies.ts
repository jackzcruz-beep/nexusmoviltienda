export type CourierCompany = 'MRW' | 'Zoom' | 'Tealca';

export interface CourierAgency {
  id: string;
  courier: CourierCompany;
  name: string;
  code: string;
  state: string;
  city: string;
  address: string;
  phone: string;
  schedule: string;
  lat: number;
  lng: number;
}

export const VENEZUELA_AGENCIES: CourierAgency[] = [
  // --- CARACAS / DISTRITO CAPITAL & MIRANDA ---
  {
    id: 'mrw-0101',
    courier: 'MRW',
    name: 'MRW Chacao',
    code: '0101000',
    state: 'Miranda / Caracas',
    city: 'Caracas (Chacao)',
    address: 'Av. Francisco de Miranda, Edif. Centro Perú, PB Local 3, Chacao',
    phone: '0212-2631234',
    schedule: 'Lun a Vie 8:00 AM - 5:00 PM | Sáb 9:00 AM - 1:00 PM',
    lat: 10.4925,
    lng: -66.8530
  },
  {
    id: 'zoom-2010',
    courier: 'Zoom',
    name: 'Zoom Chacao Centro Lido',
    code: '2010',
    state: 'Miranda / Caracas',
    city: 'Caracas (Chacao)',
    address: 'Av. Francisco de Miranda, Centro Lido, Nivel Galería, Local G-14',
    phone: '0212-9524411',
    schedule: 'Lun a Vie 8:30 AM - 5:00 PM',
    lat: 10.4908,
    lng: -66.8622
  },
  {
    id: 'tealca-0102',
    courier: 'Tealca',
    name: 'Tealca Chacao',
    code: '0102',
    state: 'Miranda / Caracas',
    city: 'Caracas (Chacao)',
    address: 'Calle Pantin, Edif. Grupo Tealca, Galpón 4, Chacao',
    phone: '0212-2678900',
    schedule: 'Lun a Vie 8:00 AM - 4:30 PM',
    lat: 10.4912,
    lng: -66.8554
  },
  {
    id: 'mrw-0105',
    courier: 'MRW',
    name: 'MRW Las Mercedes',
    code: '0105000',
    state: 'Miranda / Caracas',
    city: 'Caracas (Las Mercedes)',
    address: 'Calle París con Calle New York, Edif. Las Mercedes, PB',
    phone: '0212-9915522',
    schedule: 'Lun a Vie 8:00 AM - 5:00 PM',
    lat: 10.4812,
    lng: -66.8645
  },
  {
    id: 'zoom-2015',
    courier: 'Zoom',
    name: 'Zoom Las Mercedes',
    code: '2015',
    state: 'Miranda / Caracas',
    city: 'Caracas (Las Mercedes)',
    address: 'Av. Principal de Las Mercedes, C.C. Paseo Las Mercedes, PB',
    phone: '0212-9938811',
    schedule: 'Lun a Vie 8:30 AM - 5:00 PM',
    lat: 10.4795,
    lng: -66.8660
  },
  {
    id: 'tealca-0105',
    courier: 'Tealca',
    name: 'Tealca Los Ruices (Sede Principal)',
    code: '0100',
    state: 'Miranda / Caracas',
    city: 'Caracas (Los Ruices)',
    address: 'Av. Principal de Los Ruices, Edif. Tealca, PB (frente a VTV)',
    phone: '0212-2800000',
    schedule: 'Lun a Vie 8:00 AM - 5:00 PM | Sáb 9:00 AM - 2:00 PM',
    lat: 10.4880,
    lng: -66.8290
  },
  {
    id: 'zoom-2001',
    courier: 'Zoom',
    name: 'Zoom La Urbina (Sede Principal)',
    code: '2001',
    state: 'Miranda / Caracas',
    city: 'Caracas (La Urbina)',
    address: 'Calle 3A con Calle 4, Edif. Grupo Zoom, La Urbina',
    phone: '0212-2046711',
    schedule: 'Lun a Vie 8:00 AM - 5:30 PM | Sáb 8:30 AM - 1:00 PM',
    lat: 10.4862,
    lng: -66.8145
  },
  {
    id: 'mrw-0110',
    courier: 'MRW',
    name: 'MRW La Candelaria',
    code: '0110000',
    state: 'Distrito Capital',
    city: 'Caracas (La Candelaria)',
    address: 'Av. Urdaneta, Esq. Peligro a Pele el Ojo, Edif. Doral Centro, PB',
    phone: '0212-5764422',
    schedule: 'Lun a Vie 8:00 AM - 5:00 PM',
    lat: 10.5065,
    lng: -66.9035
  },
  {
    id: 'zoom-2020',
    courier: 'Zoom',
    name: 'Zoom Plaza Venezuela',
    code: '2020',
    state: 'Distrito Capital',
    city: 'Caracas (Plaza Venezuela)',
    address: 'Av. Las Acacias, Torre Lincoln, PB Local 2, Plaza Venezuela',
    phone: '0212-7935511',
    schedule: 'Lun a Vie 8:00 AM - 4:30 PM',
    lat: 10.4950,
    lng: -66.8820
  },
  {
    id: 'tealca-0115',
    courier: 'Tealca',
    name: 'Tealca San Bernardino',
    code: '0115',
    state: 'Distrito Capital',
    city: 'Caracas (San Bernardino)',
    address: 'Av. Panteón con Av. Gamboa, Edif. San Bernardino, PB',
    phone: '0212-5517788',
    schedule: 'Lun a Vie 8:00 AM - 4:30 PM',
    lat: 10.5120,
    lng: -66.9010
  },
  {
    id: 'mrw-0120',
    courier: 'MRW',
    name: 'MRW Los Teques',
    code: '0120000',
    state: 'Miranda',
    city: 'Los Teques',
    address: 'Calle Independencia con Calle Miquilén, Edif. Don José, Local 4',
    phone: '0212-3224411',
    schedule: 'Lun a Vie 8:00 AM - 5:00 PM',
    lat: 10.3440,
    lng: -67.0420
  },
  {
    id: 'zoom-2035',
    courier: 'Zoom',
    name: 'Zoom Los Teques Centro',
    code: '2035',
    state: 'Miranda',
    city: 'Los Teques',
    address: 'Av. Bolívar, C.C. Hito, Nivel PB Local 12',
    phone: '0212-3215588',
    schedule: 'Lun a Vie 8:30 AM - 4:30 PM',
    lat: 10.3465,
    lng: -67.0410
  },
  {
    id: 'tealca-0130',
    courier: 'Tealca',
    name: 'Tealca Guarenas / Guatire',
    code: '0130',
    state: 'Miranda',
    city: 'Guarenas / Guatire',
    address: 'Intercomunal Guarenas-Guatire, C.C. Oasis Center, PB',
    phone: '0212-3631122',
    schedule: 'Lun a Vie 8:30 AM - 4:30 PM',
    lat: 10.4680,
    lng: -66.5780
  },

  // --- TÁCHIRA (SAN CRISTÓBAL) ---
  {
    id: 'mrw-5001',
    courier: 'MRW',
    name: 'MRW San Cristóbal Barrio Obrero',
    code: '5001000',
    state: 'Táchira',
    city: 'San Cristóbal',
    address: 'Carrera 20 entre Calles 10 y 11, Edif. Don Manuel, Barrio Obrero',
    phone: '0276-3554411',
    schedule: 'Lun a Vie 8:00 AM - 5:00 PM | Sáb 9:00 AM - 1:00 PM',
    lat: 7.7715,
    lng: -72.2245
  },
  {
    id: 'zoom-5002',
    courier: 'Zoom',
    name: 'Zoom San Cristóbal Centro',
    code: '5002',
    state: 'Táchira',
    city: 'San Cristóbal',
    address: '7ma Avenida con Calle 8, Torre Unión, PB',
    phone: '0276-3438811',
    schedule: 'Lun a Vie 8:00 AM - 5:00 PM',
    lat: 7.7660,
    lng: -72.2330
  },
  {
    id: 'tealca-5003',
    courier: 'Tealca',
    name: 'Tealca San Cristóbal La Concordia',
    code: '5001',
    state: 'Táchira',
    city: 'San Cristóbal',
    address: 'Prolongación 5ta Avenida con Calle 2, La Concordia',
    phone: '0276-3467799',
    schedule: 'Lun a Vie 8:00 AM - 5:00 PM',
    lat: 7.7550,
    lng: -72.2370
  },
  {
    id: 'mrw-5004',
    courier: 'MRW',
    name: 'MRW San Cristóbal Pirineos',
    code: '5004000',
    state: 'Táchira',
    city: 'San Cristóbal',
    address: 'Av. Principal de Pirineos, C.C. Baratta, Nivel Sótano 1',
    phone: '0276-3531122',
    schedule: 'Lun a Vie 8:30 AM - 5:00 PM',
    lat: 7.7840,
    lng: -72.2130
  },

  // --- ZULIA (MARACAIBO) ---
  {
    id: 'mrw-4001',
    courier: 'MRW',
    name: 'MRW Maracaibo Bella Vista',
    code: '4001000',
    state: 'Zulia',
    city: 'Maracaibo',
    address: 'Av. 4 Bella Vista entre Calles 67 y 68, Edif. Torre Cristal, PB',
    phone: '0261-7924411',
    schedule: 'Lun a Vie 8:00 AM - 5:00 PM',
    lat: 10.6650,
    lng: -71.6140
  },
  {
    id: 'zoom-4002',
    courier: 'Zoom',
    name: 'Zoom Maracaibo 5 de Julio',
    code: '4002',
    state: 'Zulia',
    city: 'Maracaibo',
    address: 'Calle 77 (5 de Julio) con Av. 15 Delicias, Torre Empresarial Claret',
    phone: '0261-7975522',
    schedule: 'Lun a Vie 8:00 AM - 5:00 PM',
    lat: 10.6685,
    lng: -71.6280
  },
  {
    id: 'tealca-4003',
    courier: 'Tealca',
    name: 'Tealca Maracaibo La Limpia',
    code: '4001',
    state: 'Zulia',
    city: 'Maracaibo',
    address: 'Av. La Limpia, C.C. Galerías Mall, Local PB-32',
    phone: '0261-7538800',
    schedule: 'Lun a Vie 8:30 AM - 5:00 PM',
    lat: 10.6580,
    lng: -71.6540
  },
  {
    id: 'mrw-4004',
    courier: 'MRW',
    name: 'MRW San Francisco',
    code: '4004000',
    state: 'Zulia',
    city: 'San Francisco (Maracaibo Sur)',
    address: 'Av. 5 de San Francisco, frente a la Plaza Bolívar, Local 3',
    phone: '0261-7621188',
    schedule: 'Lun a Vie 8:00 AM - 4:30 PM',
    lat: 10.5820,
    lng: -71.6360
  },

  // --- CARABOBO (VALENCIA) ---
  {
    id: 'mrw-2001',
    courier: 'MRW',
    name: 'MRW Valencia El Viñedo',
    code: '2001000',
    state: 'Carabobo',
    city: 'Valencia',
    address: 'Av. Carlos Sanda con Calle López Latouche, C.C. El Viñedo, Local 7',
    phone: '0241-8245511',
    schedule: 'Lun a Vie 8:00 AM - 5:00 PM',
    lat: 10.2180,
    lng: -68.0060
  },
  {
    id: 'zoom-2002',
    courier: 'Zoom',
    name: 'Zoom Valencia Av. Bolívar Norte',
    code: '2002',
    state: 'Carabobo',
    city: 'Valencia',
    address: 'Av. Bolívar Norte, C.C. Camoruco, Nivel PB Local 15',
    phone: '0241-8254433',
    schedule: 'Lun a Vie 8:00 AM - 5:00 PM',
    lat: 10.2120,
    lng: -68.0020
  },
  {
    id: 'tealca-2003',
    courier: 'Tealca',
    name: 'Tealca Valencia San Diego',
    code: '2001',
    state: 'Carabobo',
    city: 'San Diego / Valencia',
    address: 'Av. Don Julio Centeno, C.C. Metro Plaza, Módulo B Local 4',
    phone: '0241-8716677',
    schedule: 'Lun a Vie 8:30 AM - 5:00 PM',
    lat: 10.2450,
    lng: -67.9540
  },
  {
    id: 'mrw-2004',
    courier: 'MRW',
    name: 'MRW Naguanagua',
    code: '2004000',
    state: 'Carabobo',
    city: 'Naguanagua',
    address: 'Av. Universidad con Calle La Entrada, C.C. Cristal, Nivel 1',
    phone: '0241-8671199',
    schedule: 'Lun a Vie 8:00 AM - 4:30 PM',
    lat: 10.2520,
    lng: -68.0120
  },

  // --- LARA (BARQUISIMETO) ---
  {
    id: 'mrw-3001',
    courier: 'MRW',
    name: 'MRW Barquisimeto Este',
    code: '3001000',
    state: 'Lara',
    city: 'Barquisimeto',
    address: 'Av. Los Leones con Av. Caroní, C.C. Paseo Los Leones, PB',
    phone: '0251-2543322',
    schedule: 'Lun a Vie 8:00 AM - 5:00 PM',
    lat: 10.0710,
    lng: -69.2940
  },
  {
    id: 'zoom-3002',
    courier: 'Zoom',
    name: 'Zoom Barquisimeto Carrera 19',
    code: '3002',
    state: 'Lara',
    city: 'Barquisimeto',
    address: 'Carrera 19 entre Calles 14 y 15, Edif. Zoom, PB',
    phone: '0251-2521144',
    schedule: 'Lun a Vie 8:00 AM - 5:00 PM',
    lat: 10.0650,
    lng: -69.3180
  },
  {
    id: 'tealca-3003',
    courier: 'Tealca',
    name: 'Tealca Barquisimeto Cabudare',
    code: '3001',
    state: 'Lara',
    city: 'Cabudare / Barquisimeto',
    address: 'Av. Intercomunal Barquisimeto-Cabudare, C.C. Terepaima, PB',
    phone: '0251-2615588',
    schedule: 'Lun a Vie 8:30 AM - 5:00 PM',
    lat: 10.0380,
    lng: -69.2620
  },

  // --- ARAGUA (MARACAY) ---
  {
    id: 'mrw-2101',
    courier: 'MRW',
    name: 'MRW Maracay Las Delicias',
    code: '2101000',
    state: 'Aragua',
    city: 'Maracay',
    address: 'Av. Las Delicias con Calle Delicias Norte, C.C. Andrés Bello, PB Local 8',
    phone: '0243-2415511',
    schedule: 'Lun a Vie 8:00 AM - 5:00 PM',
    lat: 10.2640,
    lng: -67.5920
  },
  {
    id: 'zoom-2102',
    courier: 'Zoom',
    name: 'Zoom Maracay Centro',
    code: '2102',
    state: 'Aragua',
    city: 'Maracay',
    address: 'Calle López Aveledo Sur entre Av. Bolívar y Miranda, Edif. Don Ángel',
    phone: '0243-2468822',
    schedule: 'Lun a Vie 8:00 AM - 5:00 PM',
    lat: 10.2480,
    lng: -67.5980
  },
  {
    id: 'tealca-2103',
    courier: 'Tealca',
    name: 'Tealca Maracay San Jacinto',
    code: '2101',
    state: 'Aragua',
    city: 'Maracay',
    address: 'Av. Bolívar Este con Av. San Jacinto, C.C. Parque Aragua, PB',
    phone: '0243-2334499',
    schedule: 'Lun a Vie 8:30 AM - 5:00 PM',
    lat: 10.2420,
    lng: -67.5810
  },

  // --- ANZOÁTEGUI (LECHERÍA / PUERTO LA CRUZ / BARCELONA) ---
  {
    id: 'mrw-6001',
    courier: 'MRW',
    name: 'MRW Lechería',
    code: '6001000',
    state: 'Anzoátegui',
    city: 'Lechería',
    address: 'Av. Principal de Lechería con Calle 3, C.C. Morro Mar, PB Local 6',
    phone: '0281-2864411',
    schedule: 'Lun a Vie 8:00 AM - 5:00 PM',
    lat: 10.1980,
    lng: -64.6910
  },
  {
    id: 'zoom-6002',
    courier: 'Zoom',
    name: 'Zoom Puerto La Cruz Paseo Colón',
    code: '6002',
    state: 'Anzoátegui',
    city: 'Puerto La Cruz',
    address: 'Calle Freites con Paseo Colón, Edif. El Faro, PB',
    phone: '0281-2675533',
    schedule: 'Lun a Vie 8:00 AM - 5:00 PM',
    lat: 10.2190,
    lng: -64.6360
  },
  {
    id: 'tealca-6003',
    courier: 'Tealca',
    name: 'Tealca Barcelona Centro',
    code: '6001',
    state: 'Anzoátegui',
    city: 'Barcelona',
    address: 'Av. Fuerzas Armadas, frente al C.C. Puente Real, PB',
    phone: '0281-2748800',
    schedule: 'Lun a Vie 8:30 AM - 5:00 PM',
    lat: 10.1340,
    lng: -64.6850
  },

  // --- MÉRIDA (MÉRIDA) ---
  {
    id: 'mrw-5101',
    courier: 'MRW',
    name: 'MRW Mérida Las Américas',
    code: '5101000',
    state: 'Mérida',
    city: 'Mérida',
    address: 'Av. Las Américas, C.C. Plaza Mayor, Nivel Planta, Local 18',
    phone: '0274-2443311',
    schedule: 'Lun a Vie 8:00 AM - 5:00 PM',
    lat: 8.5860,
    lng: -71.1620
  },
  {
    id: 'zoom-5102',
    courier: 'Zoom',
    name: 'Zoom Mérida Centro',
    code: '5102',
    state: 'Mérida',
    city: 'Mérida',
    address: 'Av. 4 entre Calles 21 y 22, Edif. Los Andes, PB',
    phone: '0274-2527744',
    schedule: 'Lun a Vie 8:00 AM - 5:00 PM',
    lat: 8.5970,
    lng: -71.1440
  },
  {
    id: 'tealca-5103',
    courier: 'Tealca',
    name: 'Tealca El Vigía',
    code: '5102',
    state: 'Mérida',
    city: 'El Vigía',
    address: 'Av. Bolívar con Calle 5, Edif. Don Pedro, PB',
    phone: '0275-8813355',
    schedule: 'Lun a Vie 8:30 AM - 5:00 PM',
    lat: 8.6210,
    lng: -71.6490
  },

  // --- BOLÍVAR (CIUDAD GUAYANA / PUERTO ORDAZ) ---
  {
    id: 'mrw-8001',
    courier: 'MRW',
    name: 'MRW Puerto Ordaz Alta Vista',
    code: '8001000',
    state: 'Bolívar',
    city: 'Puerto Ordaz',
    address: 'Av. Guayana, C.C. Alta Vista I, Nivel Mezzanina Local M-12',
    phone: '0286-9624411',
    schedule: 'Lun a Vie 8:00 AM - 5:00 PM',
    lat: 8.2980,
    lng: -62.7350
  },
  {
    id: 'zoom-8002',
    courier: 'Zoom',
    name: 'Zoom Puerto Ordaz Castillito',
    code: '8002',
    state: 'Bolívar',
    city: 'Puerto Ordaz',
    address: 'Calle Ciudad Piar con Carrera El Palmar, Edif. Zoom, Castillito',
    phone: '0286-9231188',
    schedule: 'Lun a Vie 8:00 AM - 5:00 PM',
    lat: 8.3120,
    lng: -62.7110
  },
  {
    id: 'tealca-8003',
    courier: 'Tealca',
    name: 'Tealca San Félix',
    code: '8001',
    state: 'Bolívar',
    city: 'San Félix',
    address: 'Av. Manuel Piar con Calle Cedeño, Edif. Don Juan, PB',
    phone: '0286-9345522',
    schedule: 'Lun a Vie 8:30 AM - 5:00 PM',
    lat: 8.3580,
    lng: -62.6540
  },

  // --- MONAGAS (MATURÍN) ---
  {
    id: 'mrw-6201',
    courier: 'MRW',
    name: 'MRW Maturín Tipuro',
    code: '6201000',
    state: 'Monagas',
    city: 'Maturín',
    address: 'Av. Alirio Ugarte Pelayo, C.C. Petroriente, Local PB 14',
    phone: '0291-6423311',
    schedule: 'Lun a Vie 8:00 AM - 5:00 PM',
    lat: 9.7780,
    lng: -63.1780
  },
  {
    id: 'zoom-6202',
    courier: 'Zoom',
    name: 'Zoom Maturín Centro',
    code: '6202',
    state: 'Monagas',
    city: 'Maturín',
    address: 'Calle Monagas con Calle Azcúe, Edif. Don Pepe, PB',
    phone: '0291-6415522',
    schedule: 'Lun a Vie 8:00 AM - 5:00 PM',
    lat: 9.7460,
    lng: -63.1840
  },
  {
    id: 'tealca-6203',
    courier: 'Tealca',
    name: 'Tealca Maturín',
    code: '6201',
    state: 'Monagas',
    city: 'Maturín',
    address: 'Av. Bicentenario con Calle Pichincha, C.C. Galerías Bicentenario, PB',
    phone: '0291-6438844',
    schedule: 'Lun a Vie 8:30 AM - 5:00 PM',
    lat: 9.7510,
    lng: -63.1790
  },

  // --- NUEVA ESPARTA (MARGARITA / PORLAMAR) ---
  {
    id: 'mrw-6301',
    courier: 'MRW',
    name: 'MRW Porlamar 4 de Mayo',
    code: '6301000',
    state: 'Nueva Esparta',
    city: 'Porlamar (Margarita)',
    address: 'Av. 4 de Mayo, C.C. Jumbo, Nivel PB Local 22, Porlamar',
    phone: '0295-2634411',
    schedule: 'Lun a Vie 8:00 AM - 4:30 PM',
    lat: 10.9620,
    lng: -63.8580
  },
  {
    id: 'zoom-6302',
    courier: 'Zoom',
    name: 'Zoom Pampatar Sambil Margarita',
    code: '6302',
    state: 'Nueva Esparta',
    city: 'Pampatar (Margarita)',
    address: 'Av. Jovito Villalba, C.C. Sambil Margarita, Entrada Playa El Agua, Local P-4',
    phone: '0295-2605588',
    schedule: 'Lun a Vie 9:00 AM - 5:00 PM | Sáb 10:00 AM - 2:00 PM',
    lat: 10.9980,
    lng: -63.8190
  }
];

// Haversine formula to compute great-circle distance between two GPS coordinates in kilometers
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)} metros`;
  }
  return `${km.toFixed(1)} km`;
}
