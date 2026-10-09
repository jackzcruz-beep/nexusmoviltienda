import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CategoryId,
  SoundSignature,
  CartItem,
  Order,
  OrderStatus,
  UserProfile,
  MagicBundle,
  StoreSettings,
  PromoSlide,
  GoogleReview
} from '../types';
import { INITIAL_PRODUCTS } from '../data/initialProducts';
import { MAGIC_BUNDLES } from '../data/bundles';
import { PROMO_SLIDES } from '../data/promos';
import { GOOGLE_REVIEWS } from '../data/reviews';
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  isAuthorizedAdmin,
  AUTHORIZED_ADMIN_EMAIL,
  type FirebaseUser
} from '../lib/firebase';

export const ADMIN_EMAILS = [
  AUTHORIZED_ADMIN_EMAIL
];

export const MASTER_ADMIN_DEFAULT_PASS = 'NexusAdmin2026!';

interface StoreContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => string;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetProductsToDefault: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, selectedColor: string, selectedFormat: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  addBundleToCart: (bundle: MagicBundle) => void;

  // Orders & Tracking
  orders: Order[];
  createOrder: (customer: {
    name: string;
    cedula?: string;
    phone: string;
    email?: string;
    city: string;
    address: string;
    notes?: string;
    paymentMethod: string;
  }) => { order: Order; whatsappUrl: string };
  updateOrderStatus: (
    orderId: string,
    newStatus: OrderStatus,
    trackingCode?: string,
    courier?: string,
    note?: string
  ) => void;
  getOrderById: (orderId: string) => Order | undefined;

  // User Profile & Auth
  currentUser: UserProfile | null;
  isAdmin: boolean;
  isAdminAuthenticated: boolean;
  adminEmails: string[];
  firebaseUser: FirebaseUser | null;
  loginWithGoogle: (customData?: Partial<UserProfile>) => void;
  loginWithFirebaseGoogle: () => Promise<{ success: boolean; error?: string }>;
  loginWithFirebaseEmail: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  registerWithFirebaseEmail: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginAdminWithPassword: (email: string, pass: string) => boolean;
  updateAdminPassword: (currentPass: string, newPass: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;

  // Hero Slides (Galería Principal)
  promoSlides: PromoSlide[];
  addPromoSlide: (slide: Omit<PromoSlide, 'id'>) => void;
  updatePromoSlide: (id: string, updates: Partial<PromoSlide>) => void;
  deletePromoSlide: (id: string) => void;
  resetPromoSlidesToDefault: () => void;

  // Google Reviews
  reviews: GoogleReview[];
  addReview: (review: {
    author: string;
    avatar?: string;
    rating: number;
    comment: string;
    productPurchased: string;
  }) => void;
  deleteReview: (id: string) => void;

  // Modals & Navigation
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedProductModal: Product | null;
  setSelectedProductModal: (prod: Product | null) => void;
  isTrackingOpen: boolean;
  setIsTrackingOpen: (open: boolean) => void;
  activeTrackingId: string;
  setActiveTrackingId: (id: string) => void;
  isBundleModalOpen: boolean;
  setIsBundleModalOpen: (open: boolean) => void;
  isGiveawayModalOpen: boolean;
  setIsGiveawayModalOpen: (open: boolean) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  isGoogleLoginOpen: boolean;
  setIsGoogleLoginOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAgencyFinderOpen: boolean;
  setIsAgencyFinderOpen: (open: boolean) => void;
  isCableModalOpen: boolean;
  setIsCableModalOpen: (open: boolean) => void;
  cableModalInitialDevice: string;
  setCableModalInitialDevice: (deviceId: string) => void;

  // Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: CategoryId;
  setSelectedCategory: (cat: CategoryId) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  selectedSubcategory: string;
  setSelectedSubcategory: (sub: string) => void;
  selectedSoundSignature: SoundSignature | 'todos';
  setSelectedSoundSignature: (sig: SoundSignature | 'todos') => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name';
  setSortBy: (sort: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name') => void;

  // Settings
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const DEFAULT_SETTINGS: StoreSettings = {
  storeName: 'nexusmóvil',
  whatsappNumber: '+584164761875',
  whatsappGreeting: 'Hola NexusMóvil, deseo coordinar mi pedido',
  currencySymbol: '$',
  currencyCode: 'USD',
  freeShippingThreshold: 50,
  standardShippingCost: 4,
  instagramUser: 'nexusmovil',
  tiktokUser: 'nexusmovil',
  address: 'San Cristóbal, Estado Táchira, Venezuela',
  businessHours: '9:00 AM a 7:00 PM (Lunes a Domingo)',
  customLogoUrl: '',
  exchangeRateBs: 40.50,
  pagoMovilBanco: 'Banesco (0134) / BDV (0102)',
  pagoMovilTelefono: '0416-4761875',
  pagoMovilCedula: 'V-20123456',
  pagoMovilTitular: 'NexusMóvil Inversiones',
  binancePayId: '54289104 (nexusmovil)',
  wallyEmail: 'nexusmoviltienda@gmail.com',
  bancolombiaDetails: 'Ahorros 241-000123-45 (NexusMóvil)',
  nequiNumber: 'Enlace Nequi'
};

const DEFAULT_ADMIN_USER: UserProfile = {
  id: 'usr-admin-jack',
  name: 'Jack Cruz',
  email: 'jackzcruz@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
  phone: '+584164761875',
  city: 'Caracas / San Cristóbal',
  address: 'Sede NexusMóvil',
  orders: ['NX-8492']
};

const SAMPLE_ORDERS: Order[] = [
  {
    id: 'NX-8492',
    date: '2026-09-28 14:32',
    customerName: 'Jack Cruz',
    customerPhone: '+584164761875',
    customerEmail: 'jackzcruz@gmail.com',
    shippingCity: 'Caracas',
    shippingAddress: 'Av. Principal, Edif. Torre Nexus, Piso 4',
    deliveryNotes: 'Dejar en recepción si no atiendo llamada.',
    paymentMethod: 'Binance Pay / USDT',
    items: [
      {
        productId: 'kz-castor-bass',
        productName: 'KZ Castor Bass Edition',
        brand: 'KZ',
        color: 'Smoke Black (Gris Ahumado)',
        format: 'Para Celular Tipo-C (Con chip digital HD)',
        quantity: 1,
        unitPrice: 42.00,
        subtotal: 42.00,
        image: '/src/assets/images/product_kz_castor_iem_1790823813192.jpg'
      },
      {
        productId: 'kz-hardcase-pouch',
        productName: 'Estuche Antigolpes KZ para Audífonos',
        brand: 'KZ',
        color: 'Negro Fibra de Carbono',
        format: 'Estuche Individual',
        quantity: 1,
        unitPrice: 6.00,
        subtotal: 6.00,
        image: '/src/assets/images/product_hub_dac_gear_1790823888555.jpg'
      }
    ],
    subtotal: 48.00,
    shippingCost: 4.00,
    total: 52.00,
    status: 'en_camino',
    trackingCode: 'MRW-94827104',
    courier: 'MRW Express / Zoom',
    history: [
      {
        status: 'recibido',
        timestamp: '28 Sep 2026, 02:32 PM',
        title: 'Pedido recibido por la web',
        description: 'La orden fue registrada y el mensaje enviado a WhatsApp.'
      },
      {
        status: 'confirmado_whatsapp',
        timestamp: '28 Sep 2026, 02:40 PM',
        title: 'Confirmado por WhatsApp',
        description: 'Pago recibido por Binance USDT y verificado por el asesor.'
      },
      {
        status: 'en_preparacion',
        timestamp: '28 Sep 2026, 04:15 PM',
        title: 'En preparación & empaque',
        description: 'Artículos verificados en bodega y empacados con sellos de garantía.'
      },
      {
        status: 'despachado',
        timestamp: '29 Sep 2026, 09:20 AM',
        title: 'Despachado a transportadora',
        description: 'Entregado a MRW Express con guía MRW-94827104.'
      },
      {
        status: 'en_camino',
        timestamp: '30 Sep 2026, 08:30 AM',
        title: 'En ruta de entrega a destino',
        description: 'La encomienda viaja hacia la agencia de destino.'
      }
    ],
    whatsappMessage: ''
  }
];

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('nexus_products');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading products from localStorage', e);
    }
    return INITIAL_PRODUCTS;
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('nexus_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading orders from localStorage', e);
    }
    return SAMPLE_ORDERS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('nexus_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading cart', e);
    }
    return [];
  });

  // Current User (Defaults to null so normal visitors are not logged in as admin)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('nexus_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading user profile', e);
    }
    return null;
  });

  // Admin session authentication flag (requires password or Firebase admin token verification)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('nexus_admin_authenticated') === 'true';
    } catch {
      return false;
    }
  });

  // Firebase Auth state listener
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        const email = fbUser.email?.toLowerCase().trim() || '';
        const isMaster = isAuthorizedAdmin(email);
        if (isMaster) {
          const adminProfile: UserProfile = {
            id: fbUser.uid,
            name: fbUser.displayName || 'Jack Cruz',
            email: fbUser.email || AUTHORIZED_ADMIN_EMAIL,
            avatar: fbUser.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
            phone: '+584164761875',
            city: 'San Cristóbal, Táchira',
            address: 'Venezuela, Táchira, La Ermita calle 10 con carrera 3 y 4',
            orders: ['NX-8492']
          };
          setCurrentUser(adminProfile);
          setIsAdminAuthenticated(true);
          try {
            localStorage.setItem('nexus_user', JSON.stringify(adminProfile));
            localStorage.setItem('nexus_admin_authenticated', 'true');
          } catch (e) {}
        } else {
          // Regular client - NEVER grant admin
          const clientProfile: UserProfile = {
            id: fbUser.uid,
            name: fbUser.displayName || email.split('@')[0] || 'Cliente Google',
            email: fbUser.email || email,
            avatar: fbUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fbUser.displayName || email)}`,
            phone: '+584164761875',
            city: 'Venezuela',
            address: '',
            orders: []
          };
          setCurrentUser(clientProfile);
          setIsAdminAuthenticated(false);
          try {
            localStorage.setItem('nexus_user', JSON.stringify(clientProfile));
            localStorage.removeItem('nexus_admin_authenticated');
          } catch (e) {}
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Check if current user is the verified authorized admin
  const isAdmin = Boolean(
    currentUser &&
    currentUser.email &&
    isAuthorizedAdmin(currentUser.email) &&
    isAdminAuthenticated
  );

  // Settings
  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('nexus_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure the verified WhatsApp number and business hours are active
        parsed.whatsappNumber = '+584164761875';
        parsed.pagoMovilTelefono = parsed.pagoMovilTelefono || '0416-4761875';
        parsed.address = parsed.address || 'San Cristóbal, Estado Táchira, Venezuela';
        parsed.businessHours = '9:00 AM a 7:00 PM (Lunes a Domingo)';
        return { ...DEFAULT_SETTINGS, ...parsed };
      }
    } catch (e) {
      console.error('Error loading settings', e);
    }
    return DEFAULT_SETTINGS;
  });

  // Hero Slides (Galería Principal)
  const [promoSlides, setPromoSlides] = useState<PromoSlide[]>(() => {
    try {
      const saved = localStorage.getItem('nexus_promo_slides');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading promo slides', e);
    }
    return PROMO_SLIDES;
  });

  // Google Reviews (Nexusmóvil Tienda)
  const [reviews, setReviews] = useState<GoogleReview[]>(() => {
    try {
      const saved = localStorage.getItem('nexus_google_reviews');
      if (saved) {
        const parsed: GoogleReview[] = JSON.parse(saved);
        const hasFresh = parsed.some(r => r.comment.includes('San Cristóbal') || r.comment.includes('4164761875'));
        if (hasFresh) return parsed;
        const userAdded = parsed.filter(r => !r.id.startsWith('rev-'));
        return [...userAdded, ...GOOGLE_REVIEWS];
      }
    } catch (e) {
      console.error('Error loading reviews', e);
    }
    return GOOGLE_REVIEWS;
  });

  // Modal UI States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [activeTrackingId, setActiveTrackingId] = useState('NX-8492');
  const [isBundleModalOpen, setIsBundleModalOpen] = useState(false);
  const [isGiveawayModalOpen, setIsGiveawayModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isGoogleLoginOpen, setIsGoogleLoginOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAgencyFinderOpen, setIsAgencyFinderOpen] = useState(false);
  const [isCableModalOpen, setIsCableModalOpen] = useState(false);
  const [cableModalInitialDevice, setCableModalInitialDevice] = useState('iphone-15-16');

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('todos');
  const [selectedBrand, setSelectedBrand] = useState('todos');
  const [selectedSubcategory, setSelectedSubcategory] = useState('todos');
  const [selectedSoundSignature, setSelectedSoundSignature] = useState<SoundSignature | 'todos'>('todos');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name'>('featured');

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Sync products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nexus_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nexus_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nexus_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Sync user to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('nexus_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('nexus_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  // Sync promo slides to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nexus_promo_slides', JSON.stringify(promoSlides));
    } catch (e) {
      console.error(e);
    }
  }, [promoSlides]);

  // Sync reviews to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nexus_google_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  // Sync settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nexus_settings', JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
  }, [settings]);

  // Product management
  const addProduct = (newProdData: Omit<Product, 'id'>): string => {
    const newId = `nx-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newProduct: Product = {
      ...newProdData,
      id: newId
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast(`Artículo "${newProduct.name}" agregado con éxito`);
    return newId;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Producto actualizado correctamente');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Producto eliminado del catálogo');
  };

  const resetProductsToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    showToast('Catálogo restablecido al predeterminado');
  };

  // Promo slides management (Galería Principal)
  const addPromoSlide = (slideData: Omit<PromoSlide, 'id'>) => {
    const newSlide: PromoSlide = {
      ...slideData,
      id: `slide-${Date.now()}`
    };
    setPromoSlides(prev => [...prev, newSlide]);
    showToast('Nuevo banner agregado a la galería');
  };

  const updatePromoSlide = (id: string, updates: Partial<PromoSlide>) => {
    setPromoSlides(prev =>
      prev.map(s => (s.id === id ? { ...s, ...updates } : s))
    );
    showToast('Banner de la galería actualizado');
  };

  const deletePromoSlide = (id: string) => {
    if (promoSlides.length <= 1) {
      showToast('Debe haber al menos 1 banner en la galería');
      return;
    }
    setPromoSlides(prev => prev.filter(s => s.id !== id));
    showToast('Banner eliminado de la galería');
  };

  const resetPromoSlidesToDefault = () => {
    setPromoSlides(PROMO_SLIDES);
    showToast('Galería restablecida a los banners iniciales');
  };

  // Google Reviews management
  const addReview = (newReview: {
    author: string;
    avatar?: string;
    rating: number;
    comment: string;
    productPurchased: string;
  }) => {
    const reviewItem: GoogleReview = {
      id: `rev-${Date.now()}`,
      author: newReview.author,
      avatar: newReview.avatar || currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      rating: newReview.rating,
      date: 'Reciente',
      comment: newReview.comment,
      productPurchased: newReview.productPurchased,
      likes: 1,
      verified: true
    };
    setReviews(prev => [reviewItem, ...prev]);
    showToast('¡Gracias por tu opinión! Reseña publicada con éxito');
  };

  const deleteReview = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
    showToast('Reseña eliminada');
  };

  // Cart operations
  const addToCart = (
    product: Product,
    selectedColor: string,
    selectedFormat: string,
    quantity: number = 1
  ) => {
    const currentFormatObj = product.formats.find(f => f.name === selectedFormat);
    const unitPrice = product.price + (currentFormatObj?.priceDelta || 0);
    const cartItemId = `${product.id}__${selectedColor}__${selectedFormat}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          product,
          selectedColor,
          selectedFormat,
          quantity,
          unitPrice
        }
      ];
    });

    showToast(`"${product.name}" añadido al carrito`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addBundleToCart = (bundle: MagicBundle) => {
    bundle.items.forEach(bundleItem => {
      const product = products.find(p => p.id === bundleItem.productId);
      if (product) {
        const color = bundleItem.defaultColor || product.colors[0]?.name || 'Estándar';
        const format = bundleItem.defaultFormat || product.formats[0]?.name || 'Estándar';
        const discountFactor = (100 - bundle.discountPercentage) / 100;
        const baseUnitPrice = product.price * discountFactor;

        const cartItemId = `${product.id}__${color}__${format}__bundle-${bundle.id}`;
        setCart(prev => {
          const existing = prev.find(i => i.id === cartItemId);
          if (existing) {
            return prev.map(i =>
              i.id === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
            );
          }
          return [
            ...prev,
            {
              id: cartItemId,
              productId: product.id,
              product,
              selectedColor: color,
              selectedFormat: `${format} (${bundle.badge})`,
              quantity: 1,
              unitPrice: Number(baseUnitPrice.toFixed(2))
            }
          ];
        });
      }
    });

    setIsBundleModalOpen(false);
    setIsCartOpen(true);
    showToast(`¡${bundle.title} añadido con ${bundle.discountPercentage}% de descuento!`);
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Orders
  const createOrder = (customer: {
    name: string;
    cedula?: string;
    phone: string;
    email?: string;
    city: string;
    address: string;
    notes?: string;
    paymentMethod: string;
  }) => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const orderId = `NX-${randomCode}`;
    const now = new Date();
    const dateFormatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const shippingCost = cartTotal >= settings.freeShippingThreshold ? 0 : settings.standardShippingCost;
    const finalTotal = cartTotal + shippingCost;
    const totalBs = (finalTotal * settings.exchangeRateBs).toFixed(2);

    const itemsSummary = cart.map(item => {
      return `• ${item.quantity}x ${item.product.name}\n  └ Color: ${item.selectedColor} | Opción: ${item.selectedFormat}\n  └ Precio: $${(item.unitPrice * item.quantity).toFixed(2)} USD`;
    }).join('\n\n');

    const whatsappMessage = `*👋 ¡HOLA NEXUSMÓVIL! DESEO FINALIZAR MI COMPRA*\n\n` +
      `*📦 CÓDIGO DE PEDIDO:* #${orderId}\n` +
      `*📅 Fecha:* ${dateFormatted}\n\n` +
      `*👤 DATOS DEL CLIENTE:*\n` +
      `• Nombre: ${customer.name}\n` +
      (customer.cedula ? `• Cédula: ${customer.cedula}\n` : '') +
      `• Teléfono: ${customer.phone}\n` +
      (customer.email ? `• Correo: ${customer.email}\n` : '') +
      `• Ciudad: ${customer.city}\n` +
      `• Dirección / Sede de entrega: ${customer.address}\n` +
      (customer.notes ? `• Notas: ${customer.notes}\n` : '') +
      `• Método de pago: ${customer.paymentMethod}\n\n` +
      `*🛒 ARTÍCULOS SELECCIONADOS:*\n${itemsSummary}\n\n` +
      `----------------------------------------\n` +
      `*Subtotal Artículos:* $${cartTotal.toFixed(2)} USD\n` +
      `*Costo de Envío:* ${shippingCost === 0 ? '¡GRATIS! 🎉' : `$${shippingCost.toFixed(2)} USD`}\n` +
      `*💰 TOTAL USD:* $${finalTotal.toFixed(2)} USD\n` +
      `*🇻🇪 APROX EN BOLÍVARES (Tasa ${settings.exchangeRateBs} Bs):* Bs. ${totalBs}\n` +
      `----------------------------------------\n\n` +
      `¿Podrían confirmarme los datos para procesar el pago y despachar a esta dirección? ¡Muchas gracias!`;

    const newOrder: Order = {
      id: orderId,
      date: dateFormatted,
      customerName: customer.name,
      customerCedula: customer.cedula,
      customerPhone: customer.phone,
      customerEmail: customer.email,
      shippingCity: customer.city,
      shippingAddress: customer.address,
      deliveryNotes: customer.notes,
      paymentMethod: customer.paymentMethod,
      items: cart.map(item => ({
        productId: item.productId,
        productName: item.product.name,
        brand: item.product.brand,
        color: item.selectedColor,
        format: item.selectedFormat,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        subtotal: item.unitPrice * item.quantity,
        image: item.product.image
      })),
      subtotal: cartTotal,
      shippingCost,
      total: finalTotal,
      status: 'recibido',
      history: [
        {
          status: 'recibido',
          timestamp: 'Justo ahora',
          title: 'Pedido registrado en la web',
          description: 'Orden creada y enviada a WhatsApp.'
        }
      ],
      whatsappMessage
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveTrackingId(orderId);
    clearCart();

    const cleanNumber = (settings.whatsappNumber || '+584164761875').replace(/[^0-9]/g, '') || '584164761875';
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    return { order: newOrder, whatsappUrl };
  };

  const updateOrderStatus = (
    orderId: string,
    newStatus: OrderStatus,
    trackingCode?: string,
    courier?: string,
    note?: string
  ) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;
        const now = new Date();
        const dateFormatted = `${now.getDate()} ${['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'][now.getMonth()]} ${now.getFullYear()}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        const statusTitles: Record<OrderStatus, string> = {
          recibido: 'Pedido registrado',
          confirmado_whatsapp: 'Confirmado por WhatsApp',
          en_preparacion: 'En preparación en bodega',
          despachado: 'Despachado a transportadora',
          en_camino: 'En camino a tu dirección',
          entregado: 'Entregado con éxito',
          cancelado: 'Pedido cancelado'
        };

        const newHistoryEvent = {
          status: newStatus,
          timestamp: dateFormatted,
          title: statusTitles[newStatus] || 'Estado actualizado',
          description: note || `El pedido cambió a estado: ${newStatus}`
        };

        return {
          ...ord,
          status: newStatus,
          trackingCode: trackingCode || ord.trackingCode,
          courier: courier || ord.courier,
          history: [newHistoryEvent, ...ord.history]
        };
      })
    );
    showToast(`Orden #${orderId} actualizada a: ${newStatus}`);
  };

  const getOrderById = (orderId: string) => {
    return orders.find(o => o.id.toLowerCase() === orderId.toLowerCase());
  };

  // Auth & Profile
  const loginWithGoogle = (customData?: Partial<UserProfile>) => {
    const isJackEmail = customData?.email?.toLowerCase().trim() === 'jackzcruz@gmail.com';
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: customData?.name || 'Cliente Google',
      email: customData?.email || 'cliente@gmail.com',
      avatar: customData?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      phone: customData?.phone || '+584164761875',
      city: customData?.city || 'Ciudad',
      address: customData?.address || '',
      orders: []
    };
    setCurrentUser(newUser);
    try {
      localStorage.setItem('nexus_user', JSON.stringify(newUser));
    } catch (e) {}

    // Notice: If it's Jack's email, do NOT auto-grant admin without password!
    if (!isJackEmail) {
      setIsAdminAuthenticated(false);
      try {
        localStorage.removeItem('nexus_admin_authenticated');
      } catch (e) {}
    }

    setIsGoogleLoginOpen(false);
    showToast(`Sesión iniciada como ${newUser.name}`);
  };

  const loginAdminWithPassword = (email: string, pass: string): boolean => {
    const cleanEmail = email.toLowerCase().trim();
    if (cleanEmail !== 'jackzcruz@gmail.com') {
      showToast('Error: Este correo no está autorizado como Administrador.');
      return false;
    }
    const currentPass = localStorage.getItem('nexus_admin_password') || MASTER_ADMIN_DEFAULT_PASS;
    if (pass !== currentPass) {
      showToast('Contraseña de Administrador incorrecta.');
      return false;
    }

    const adminUser: UserProfile = {
      id: 'usr-admin-jack',
      name: 'Jack Cruz',
      email: 'jackzcruz@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      phone: '+584164761875',
      city: 'San Cristóbal, Táchira',
      address: 'Venezuela, Táchira, La Ermita calle 10 con carrera 3 y 4',
      orders: ['NX-8492']
    };

    setCurrentUser(adminUser);
    setIsAdminAuthenticated(true);
    try {
      localStorage.setItem('nexus_user', JSON.stringify(adminUser));
      localStorage.setItem('nexus_admin_authenticated', 'true');
    } catch (e) {}

    setIsGoogleLoginOpen(false);
    showToast('Bienvenido, Jack. Panel de Administración desbloqueado.');
    return true;
  };

  const updateAdminPassword = (currentPass: string, newPass: string): boolean => {
    const activePass = localStorage.getItem('nexus_admin_password') || MASTER_ADMIN_DEFAULT_PASS;
    if (currentPass !== activePass) {
      showToast('Error: La contraseña actual es incorrecta.');
      return false;
    }
    if (newPass.length < 6) {
      showToast('Error: La nueva contraseña debe tener mínimo 6 caracteres.');
      return false;
    }

    try {
      localStorage.setItem('nexus_admin_password', newPass);
    } catch (e) {}
    showToast('Contraseña maestra de Administrador actualizada correctamente.');
    return true;
  };

  // Firebase Authentication methods
  const loginWithFirebaseGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const email = res.user.email?.toLowerCase().trim();
      if (isAuthorizedAdmin(email)) {
        setIsAdminAuthenticated(true);
        showToast('Firebase Auth: Administrador Jack Cruz autenticado con éxito');
      } else {
        setIsAdminAuthenticated(false);
        showToast(`Sesión iniciada con Google (${res.user.email})`);
      }
      setIsGoogleLoginOpen(false);
      return { success: true };
    } catch (err: any) {
      console.warn('Firebase signInWithPopup error:', err);
      const errorMsg =
        err?.code === 'auth/popup-blocked'
          ? 'La ventana emergente de Google fue bloqueada por el navegador. Habilita ventanas emergentes o usa correo y contraseña.'
          : err?.code === 'auth/popup-closed-by-user'
          ? 'Ventana de inicio de sesión cerrada.'
          : err?.message || 'Error al conectar con Google Firebase';
      return { success: false, error: errorMsg };
    }
  };

  const loginWithFirebaseEmail = async (email: string, pass: string) => {
    try {
      const cleanEmail = email.trim();
      const res = await signInWithEmailAndPassword(auth, cleanEmail, pass);
      const userEmail = res.user.email?.toLowerCase().trim();
      if (isAuthorizedAdmin(userEmail)) {
        setIsAdminAuthenticated(true);
        showToast('Firebase Auth: Acceso concedido al Administrador Jack Cruz');
      } else {
        setIsAdminAuthenticated(false);
        showToast(`Sesión iniciada en Firebase como ${cleanEmail}`);
      }
      setIsGoogleLoginOpen(false);
      return { success: true };
    } catch (err: any) {
      console.warn('Firebase signInWithEmailAndPassword error:', err);
      let errorMsg = 'Error al verificar credenciales con Firebase';
      if (err?.code === 'auth/user-not-found' || err?.code === 'auth/invalid-credential') {
        errorMsg = 'Credenciales no encontradas en Firebase Auth. Puedes registrarla o verificar la contraseña.';
      } else if (err?.code === 'auth/wrong-password') {
        errorMsg = 'Contraseña incorrecta en Firebase.';
      } else if (err?.message) {
        errorMsg = err.message;
      }
      return { success: false, error: errorMsg };
    }
  };

  const registerWithFirebaseEmail = async (email: string, pass: string) => {
    try {
      const cleanEmail = email.trim();
      const res = await createUserWithEmailAndPassword(auth, cleanEmail, pass);
      const userEmail = res.user.email?.toLowerCase().trim();
      if (isAuthorizedAdmin(userEmail)) {
        setIsAdminAuthenticated(true);
        showToast('Firebase Auth: Usuario Administrador registrado en Firebase');
      } else {
        setIsAdminAuthenticated(false);
        showToast('Cuenta de cliente registrada con éxito en Firebase');
      }
      setIsGoogleLoginOpen(false);
      return { success: true };
    } catch (err: any) {
      console.warn('Firebase createUserWithEmailAndPassword error:', err);
      let errorMsg = 'Error al registrar en Firebase';
      if (err?.code === 'auth/email-already-in-use') {
        errorMsg = 'Este correo ya está registrado en Firebase. Inicia sesión directamente.';
      } else if (err?.code === 'auth/weak-password') {
        errorMsg = 'La contraseña debe tener al menos 6 caracteres.';
      } else if (err?.message) {
        errorMsg = err.message;
      }
      return { success: false, error: errorMsg };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {}
    setCurrentUser(null);
    setIsAdminAuthenticated(false);
    setFirebaseUser(null);
    try {
      localStorage.removeItem('nexus_user');
      localStorage.removeItem('nexus_admin_authenticated');
    } catch (e) {}
    setIsProfileOpen(false);
    setIsAdminOpen(false);
    showToast('Sesión cerrada correctamente');
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    try {
      localStorage.setItem('nexus_user', JSON.stringify(updated));
    } catch (e) {}
    showToast('Perfil actualizado correctamente');
  };

  // Settings
  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings(prev => {
      const merged = { ...prev, ...newSettings };
      try {
        localStorage.setItem('nexus_settings', JSON.stringify(merged));
      } catch (e) {}
      return merged;
    });
    showToast('Configuraciones de NexusMóvil guardadas');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        addBundleToCart,
        orders,
        createOrder,
        updateOrderStatus,
        getOrderById,
        currentUser,
        isAdmin,
        isAdminAuthenticated,
        adminEmails: ADMIN_EMAILS,
        firebaseUser,
        loginWithGoogle,
        loginWithFirebaseGoogle,
        loginWithFirebaseEmail,
        registerWithFirebaseEmail,
        loginAdminWithPassword,
        updateAdminPassword,
        logout,
        updateProfile,
        promoSlides,
        addPromoSlide,
        updatePromoSlide,
        deletePromoSlide,
        resetPromoSlidesToDefault,
        reviews,
        addReview,
        deleteReview,
        isCartOpen,
        setIsCartOpen,
        selectedProductModal,
        setSelectedProductModal,
        isTrackingOpen,
        setIsTrackingOpen,
        activeTrackingId,
        setActiveTrackingId,
        isBundleModalOpen,
        setIsBundleModalOpen,
        isGiveawayModalOpen,
        setIsGiveawayModalOpen,
        isProfileOpen,
        setIsProfileOpen,
        isGoogleLoginOpen,
        setIsGoogleLoginOpen,
        isAdminOpen,
        setIsAdminOpen,
        isAgencyFinderOpen,
        setIsAgencyFinderOpen,
        isCableModalOpen,
        setIsCableModalOpen,
        cableModalInitialDevice,
        setCableModalInitialDevice,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedBrand,
        setSelectedBrand,
        selectedSubcategory,
        setSelectedSubcategory,
        selectedSoundSignature,
        setSelectedSoundSignature,
        sortBy,
        setSortBy,
        settings,
        updateSettings,
        toastMessage,
        showToast
      }}
    >
      {children}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-slate-900/95 border border-cyan-500/40 text-white text-xs font-medium shadow-2xl backdrop-blur-md flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
