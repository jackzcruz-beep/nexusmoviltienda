export type CategoryId = 
  | 'todos'
  | 'iem-audio'
  | 'perifericos'
  | 'adaptadores-hubs'
  | 'accesorios-audio'
  | 'componentes-pc';

export type SoundSignature = 'bass-head' | 'balanced' | 'gaming' | 'monitoring';

export interface ProductVariantColor {
  name: string;
  hex: string;
  inStock: boolean;
}

export interface ProductVariantFormat {
  name: string;
  priceDelta?: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: CategoryId;
  subcategory: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  colors: ProductVariantColor[];
  formats: ProductVariantFormat[];
  stock: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  isFeatured?: boolean;
  idealFor?: string;
  soundSignature?: SoundSignature;
}

export interface CartItem {
  id: string; // unique item id (productId + color + format)
  productId: string;
  product: Product;
  selectedColor: string;
  selectedFormat: string;
  quantity: number;
  unitPrice: number;
}

export interface MagicBundle {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'audiophile' | 'gaming' | 'bass-head' | 'streaming' | 'starter';
  items: {
    productId: string;
    productName: string;
    role: string;
    defaultColor?: string;
    defaultFormat?: string;
  }[];
  regularPrice: number;
  bundlePrice: number;
  discountPercentage: number;
  badge: string;
}

export type OrderStatus = 
  | 'recibido'
  | 'confirmado_whatsapp'
  | 'en_preparacion'
  | 'despachado'
  | 'en_camino'
  | 'entregado'
  | 'cancelado';

export interface OrderStatusEvent {
  status: OrderStatus;
  timestamp: string;
  title: string;
  description: string;
}

export interface Order {
  id: string; // e.g. NX-8429
  date: string;
  customerName: string;
  customerCedula?: string;
  customerPhone: string;
  customerEmail?: string;
  shippingCity: string;
  shippingAddress: string;
  deliveryNotes?: string;
  paymentMethod: string;
  items: {
    productId: string;
    productName: string;
    brand: string;
    color: string;
    format: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    image: string;
  }[];
  subtotal: number;
  shippingCost: number;
  total: number;
  status: OrderStatus;
  trackingCode?: string;
  courier?: string;
  history: OrderStatusEvent[];
  whatsappMessage: string;
}

export interface GoogleReview {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  productPurchased: string;
  likes: number;
  verified: boolean;
}

export interface PromoSlide {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  ctaText: string;
  actionType: 'category' | 'bundle' | 'giveaway' | 'product';
  actionTarget: string;
  image: string;
  accent: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  city: string;
  address: string;
  orders: string[]; // Order IDs
}

export interface StoreSettings {
  storeName: string;
  whatsappNumber: string;
  whatsappGreeting: string;
  currencySymbol: string;
  currencyCode: string;
  freeShippingThreshold: number;
  standardShippingCost: number;
  instagramUser: string;
  tiktokUser: string;
  address: string;
  businessHours: string;
  customLogoUrl?: string;
  exchangeRateBs: number;
  pagoMovilBanco: string;
  pagoMovilTelefono: string;
  pagoMovilCedula: string;
  pagoMovilTitular: string;
  binancePayId: string;
  wallyEmail: string;
  bancolombiaDetails: string;
  nequiNumber: string;
}
