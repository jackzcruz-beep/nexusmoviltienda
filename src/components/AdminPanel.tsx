import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { NexusLogo } from './NexusLogo';
import { Product, CategoryId, OrderStatus, PromoSlide } from '../types';
import {
  X,
  Plus,
  Trash2,
  Edit,
  Package,
  ShoppingBag,
  Settings,
  CheckCircle2,
  TrendingUp,
  MessageCircle,
  Truck,
  RotateCcw,
  Sparkles,
  Save,
  Image as ImageIcon,
  DollarSign,
  ShieldCheck,
  Star,
  Layers,
  CreditCard,
  Lock,
  Upload
} from 'lucide-react';

const PRESET_IMAGES = [
  { label: 'In-Ear Monitor Hi-Fi', url: '/src/assets/images/hero_iem_showcase_1790823801977.jpg' },
  { label: 'KZ Castor Acústico', url: '/src/assets/images/product_kz_castor_iem_1790823813192.jpg' },
  { label: 'Gaming Setup (Mouse & Teclado)', url: '/src/assets/images/product_gaming_setup_1790823877180.jpg' },
  { label: 'Hub USB-C Multipuerto & DAC', url: '/src/assets/images/product_hub_dac_gear_1790823888555.jpg' }
];

export const AdminPanel: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProductsToDefault,
    orders,
    updateOrderStatus,
    settings,
    updateSettings,
    currentUser,
    isAdmin,
    adminEmails,
    loginWithFirebaseGoogle,
    loginWithFirebaseEmail,
    loginAdminWithPassword,
    updateAdminPassword,
    promoSlides,
    addPromoSlide,
    updatePromoSlide,
    deletePromoSlide,
    resetPromoSlidesToDefault,
    reviews,
    deleteReview
  } = useStore();

  const [activeTab, setActiveTab] = useState<'products' | 'create' | 'gallery' | 'payments' | 'orders' | 'reviews'>('products');

  // Admin login state when restricted
  const [adminLoginEmail, setAdminLoginEmail] = useState('jackzcruz@gmail.com');
  const [adminLoginPass, setAdminLoginPass] = useState('');
  const [adminLoginError, setAdminLoginError] = useState('');
  const [showAdminPass, setShowAdminPass] = useState(false);

  // Admin password change state
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');

  // New Product Form State
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('KZ');
  const [category, setCategory] = useState<CategoryId>('iem-audio');
  const [subcategory, setSubcategory] = useState('In-Ear Monitors');
  const [price, setPrice] = useState<number | string>(28);
  const [originalPrice, setOriginalPrice] = useState<number | string>(38);
  const [image, setImage] = useState(PRESET_IMAGES[0].url);
  const [description, setDescription] = useState('');
  const [idealFor, setIdealFor] = useState('');
  const [badge, setBadge] = useState('Nuevo');
  const [stock, setStock] = useState<number>(20);

  // Features list
  const [featuresList, setFeaturesList] = useState<string[]>([
    'Sonido de alta definición y fidelidad acústica',
    'Cable desmontable reforzado',
    'Excelente aislamiento de ruido exterior'
  ]);
  const [newFeatureText, setNewFeatureText] = useState('');

  // Specs
  const [specsList, setSpecsList] = useState<{ key: string; val: string }[]>([
    { key: 'Conexión', val: 'Plug 3.5mm / Tipo-C' },
    { key: 'Compatibilidad', val: 'Universal' }
  ]);
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecVal, setNewSpecVal] = useState('');

  // Colors
  const [colorsList, setColorsList] = useState<{ name: string; hex: string }[]>([
    { name: 'Negro Mate', hex: '#18181b' },
    { name: 'Transparente', hex: '#e2e8f0' }
  ]);
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#06b6d4');

  // Formats
  const [formatsList, setFormatsList] = useState<{ name: string; priceDelta: number }[]>([
    { name: 'Con Micrófono HD (Llamadas y Juegos)', priceDelta: 0 },
    { name: 'Sin Micrófono (Solo Música)', priceDelta: -2 },
    { name: 'Para Celular Tipo-C con DAC', priceDelta: 5 }
  ]);
  const [newFormatName, setNewFormatName] = useState('');
  const [newFormatDelta, setNewFormatDelta] = useState<number>(0);

  // Settings & Payments Form
  const [settingsForm, setSettingsForm] = useState(settings);

  // Editing existing product
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Editing Promo Slide
  const [editingSlide, setEditingSlide] = useState<PromoSlide | null>(null);

  // Order status update state
  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.id || '');
  const [newStatus, setNewStatus] = useState<OrderStatus>('en_preparacion');
  const [trackingGuide, setTrackingGuide] = useState('');
  const [courierName, setCourierName] = useState('MRW / Zoom');
  const [statusNote, setStatusNote] = useState('');

  if (!isAdminOpen) return null;

  // Access Guard: If not admin, show secure Firebase Authentication gate
  if (!isAdmin) {
    const handleAdminGoogleLogin = async () => {
      setAdminLoginError('');
      const res = await loginWithFirebaseGoogle();
      if (!res.success && res.error) {
        setAdminLoginError(res.error);
      }
    };

    const handleAdminInlineLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setAdminLoginError('');
      const cleanEmail = adminLoginEmail.toLowerCase().trim();
      if (cleanEmail !== 'jackzcruz@gmail.com') {
        setAdminLoginError('Acceso denegado: Únicamente jackzcruz@gmail.com está autorizado como Administrador.');
        return;
      }

      // Try Firebase email first
      const fbRes = await loginWithFirebaseEmail(cleanEmail, adminLoginPass);
      if (fbRes.success) {
        setAdminLoginPass('');
        return;
      }

      // Fallback to local admin master verification
      const ok = loginAdminWithPassword(cleanEmail, adminLoginPass);
      if (!ok) {
        setAdminLoginError('Contraseña incorrecta o credenciales no válidas.');
      } else {
        setAdminLoginPass('');
      }
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
        <div className="relative w-full max-w-md bg-[#0c121e] border border-amber-500/40 rounded-3xl shadow-2xl p-6 text-center space-y-4">
          <button
            onClick={() => setIsAdminOpen(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 shadow-lg">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">Panel de Administración NexusMóvil</h3>
            <p className="text-xs text-slate-400 mt-1">
              Protegido con <strong>Firebase Authentication</strong> para <span className="text-amber-300 font-mono">jackzcruz@gmail.com</span>.
            </p>
          </div>

          {/* Quick Google Firebase Sign-in Button */}
          <button
            type="button"
            onClick={handleAdminGoogleLogin}
            className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs transition-all cursor-pointer shadow-md flex items-center justify-center gap-2.5"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Ingresar con Google (Firebase Auth)</span>
          </button>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-2 text-[10px] text-slate-500 uppercase tracking-wider font-semibold">o ingresar con contraseña</span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          <form onSubmit={handleAdminInlineLogin} className="space-y-3 text-left pt-1">
            <div>
              <label className="block text-[11px] font-medium text-slate-300 mb-1">Correo de Administrador:</label>
              <input
                type="email"
                required
                value={adminLoginEmail}
                onChange={(e) => setAdminLoginEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-300 mb-1">Contraseña:</label>
              <div className="relative">
                <input
                  type={showAdminPass ? 'text' : 'password'}
                  required
                  placeholder="Introduce tu clave de administrador"
                  value={adminLoginPass}
                  onChange={(e) => setAdminLoginPass(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-3 pr-9 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
                <button
                  type="button"
                  onClick={() => setShowAdminPass(!showAdminPass)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                >
                  {showAdminPass ? 'Ocultar' : 'Ver'}
                </button>
              </div>
            </div>

            {adminLoginError && (
              <p className="text-[11px] text-rose-400 bg-rose-950/40 p-2.5 rounded-xl border border-rose-800/40 leading-relaxed">
                {adminLoginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-md shadow-amber-950/40 mt-1 flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Desbloquear y Acceder</span>
            </button>
          </form>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="text-xs text-slate-400 hover:text-white py-1 block w-full text-center cursor-pointer transition-colors"
          >
            Volver a la tienda
          </button>
        </div>
      </div>
    );
  }

  const handleAddFeature = () => {
    if (newFeatureText.trim()) {
      setFeaturesList([...featuresList, newFeatureText.trim()]);
      setNewFeatureText('');
    }
  };

  const handleAddSpec = () => {
    if (newSpecKey.trim() && newSpecVal.trim()) {
      setSpecsList([...specsList, { key: newSpecKey.trim(), val: newSpecVal.trim() }]);
      setNewSpecKey('');
      setNewSpecVal('');
    }
  };

  const handleAddColor = () => {
    if (newColorName.trim()) {
      setColorsList([...colorsList, { name: newColorName.trim(), hex: newColorHex }]);
      setNewColorName('');
    }
  };

  const handleAddFormat = () => {
    if (newFormatName.trim()) {
      setFormatsList([...formatsList, { name: newFormatName.trim(), priceDelta: Number(newFormatDelta) }]);
      setNewFormatName('');
      setNewFormatDelta(0);
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const specsObj: Record<string, string> = {};
    specsList.forEach(s => {
      specsObj[s.key] = s.val;
    });

    addProduct({
      name: name.trim(),
      brand: brand.trim(),
      category,
      subcategory: subcategory.trim() || 'General',
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      image,
      idealFor: idealFor.trim() || undefined,
      description: description.trim() || `${name} de alta fidelidad y rendimiento garantizado por NexusMóvil.`,
      features: featuresList,
      specs: specsObj,
      colors: colorsList.map(c => ({ ...c, inStock: true })),
      formats: formatsList.map(f => ({ ...f, inStock: true })),
      stock: Number(stock),
      rating: 4.9,
      reviewsCount: 12,
      badge: badge.trim() || undefined,
      isFeatured: true
    });

    // Reset Form
    setName('');
    setDescription('');
    setIdealFor('');
    setActiveTab('products');
  };

  const handleUpdateOrderStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderId) return;
    updateOrderStatus(selectedOrderId, newStatus, trackingGuide, courierName, statusNote);
    setStatusNote('');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#0d131f] border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-slate-800 bg-[#090d16]">
          <div className="flex items-center gap-3">
            <NexusLogo size={38} showText={false} />
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>Panel de Administración NexusMóvil</span>
                <span className="text-[10px] font-mono bg-cyan-950/80 text-cyan-300 px-2 py-0.5 rounded-md border border-cyan-700/60 flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Firebase Auth: {currentUser?.email || 'jackzcruz@gmail.com'}</span>
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Gestión total de productos, banners del carrusel, pagos (Pago Móvil / Divisas) y órdenes.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 px-5 py-2.5 bg-slate-900 border-b border-slate-800 overflow-x-auto no-scrollbar text-xs">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer whitespace-nowrap transition-colors ${
              activeTab === 'products'
                ? 'bg-cyan-400 text-slate-950'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Productos ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('create')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer whitespace-nowrap transition-colors ${
              activeTab === 'create'
                ? 'bg-cyan-400 text-slate-950'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Nuevo Artículo</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer whitespace-nowrap transition-colors ${
              activeTab === 'gallery'
                ? 'bg-cyan-400 text-slate-950'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Galería Principal ({promoSlides.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer whitespace-nowrap transition-colors ${
              activeTab === 'payments'
                ? 'bg-cyan-400 text-slate-950'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Pagos & WhatsApp</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer whitespace-nowrap transition-colors ${
              activeTab === 'orders'
                ? 'bg-cyan-400 text-slate-950'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Pedidos & Envíos ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer whitespace-nowrap transition-colors ${
              activeTab === 'reviews'
                ? 'bg-cyan-400 text-slate-950'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Star className="w-3.5 h-3.5 text-amber-400" />
            <span>Reseñas Google ({reviews.length})</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {/* TAB 1: PRODUCT LIST & PRICING */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Inventario y Precios de NexusMóvil</h3>
                  <p className="text-xs text-slate-400">Modifica precios en vivo o elimina productos de la tienda.</p>
                </div>
                <button
                  onClick={resetProductsToDefault}
                  className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restablecer Catálogo</span>
                </button>
              </div>

              <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60">
                {products.map(prod => (
                  <div key={prod.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-900/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-12 h-12 rounded-lg object-cover bg-black shrink-0 border border-slate-800"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">{prod.brand}</span>
                          <span className="text-xs text-slate-400">· {prod.subcategory}</span>
                        </div>
                        <h4 className="text-xs font-bold text-white">{prod.name}</h4>
                        <p className="text-[11px] text-slate-400">{prod.idealFor || prod.description.substring(0, 60)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 justify-between sm:justify-end">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block">Precio Actual:</span>
                        <div className="flex items-baseline gap-1">
                          <input
                            type="number"
                            step="0.5"
                            defaultValue={prod.price}
                            onBlur={(e) => {
                              const val = parseFloat(e.target.value);
                              if (!isNaN(val) && val > 0) {
                                updateProduct(prod.id, { price: val });
                              }
                            }}
                            className="w-16 bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-xs text-white text-right font-mono"
                          />
                          <span className="text-xs text-slate-400">USD</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block">Stock:</span>
                        <input
                          type="number"
                          defaultValue={prod.stock}
                          onBlur={(e) => {
                            const val = parseInt(e.target.value);
                            if (!isNaN(val) && val >= 0) {
                              updateProduct(prod.id, { stock: val });
                            }
                          }}
                          className="w-14 bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-xs text-white text-right font-mono"
                        />
                      </div>

                      <button
                        onClick={() => deleteProduct(prod.id)}
                        className="p-2 text-slate-500 hover:text-rose-400 hover:bg-slate-900 rounded-lg transition-colors cursor-pointer"
                        title="Eliminar artículo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: CREATE PRODUCT */}
          {activeTab === 'create' && (
            <form onSubmit={handleCreateProduct} className="space-y-4 max-w-2xl">
              <div>
                <h3 className="text-sm font-bold text-white mb-0.5">Crear Nuevo Artículo en el Catálogo</h3>
                <p className="text-xs text-slate-400">Se agregará al inventario y se sincronizará con pedidos de WhatsApp.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Nombre del Producto *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. KZ ZS10 Pro X"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Marca *</label>
                  <input
                    type="text"
                    required
                    placeholder="KZ, Moondrop, Nexus, UGREEN..."
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Categoría</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategoryId)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  >
                    <option value="iem-audio">In-Ear & Audio</option>
                    <option value="perifericos">Periféricos Gamer</option>
                    <option value="adaptadores-hubs">Hubs & Video</option>
                    <option value="accesorios-audio">Accesorios & DAC</option>
                    <option value="componentes-pc">Componentes PC</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Precio (USD) *</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Stock Disponible</label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">¿Para qué sirve? (Frase sencilla para clientes casuales)</label>
                <input
                  type="text"
                  placeholder="Ej. Bajos profundos para juegos y música con micrófono para llamadas."
                  value={idealFor}
                  onChange={(e) => setIdealFor(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">URL de Imagen</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-md"
              >
                Guardar y Publicar en Catálogo
              </button>
            </form>
          )}

          {/* TAB 3: GALERÍA PRINCIPAL (CARRUSEL DE BANNERS) */}
          {activeTab === 'gallery' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Galería Principal (Banners del Carrusel)</h3>
                  <p className="text-xs text-slate-400">Edita los títulos, imágenes, botones y promociones de la portada.</p>
                </div>
                <button
                  onClick={resetPromoSlidesToDefault}
                  className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restablecer Banners</span>
                </button>
              </div>

              <div className="space-y-3">
                {promoSlides.map((slide, index) => (
                  <div key={slide.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-cyan-400">Slide #{index + 1} - ID: {slide.id}</span>
                      <button
                        onClick={() => deletePromoSlide(slide.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                        title="Eliminar banner"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="text-slate-400 block mb-1">Título Principal:</label>
                        <input
                          type="text"
                          defaultValue={slide.title}
                          onBlur={(e) => updatePromoSlide(slide.id, { title: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Etiqueta Badge:</label>
                        <input
                          type="text"
                          defaultValue={slide.badge}
                          onBlur={(e) => updatePromoSlide(slide.id, { badge: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-white"
                        />
                      </div>
                    </div>

                    <div className="text-xs">
                      <label className="text-slate-400 block mb-1">Subtítulo / Descripción:</label>
                      <textarea
                        rows={2}
                        defaultValue={slide.subtitle}
                        onBlur={(e) => updatePromoSlide(slide.id, { subtitle: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-white resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="text-slate-400 block mb-1">Texto del Botón CTA:</label>
                        <input
                          type="text"
                          defaultValue={slide.ctaText}
                          onBlur={(e) => updatePromoSlide(slide.id, { ctaText: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">URL de la Imagen:</label>
                        <input
                          type="text"
                          defaultValue={slide.image}
                          onBlur={(e) => updatePromoSlide(slide.id, { image: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-white font-mono text-[11px]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Slide Button */}
              <button
                type="button"
                onClick={() => {
                  addPromoSlide({
                    title: 'Nueva Promoción Especial NexusMóvil',
                    subtitle: 'Los mejores equipos de audio y tecnología disponibles con envíos inmediatos a todo el país.',
                    badge: 'Especial Nexus',
                    ctaText: 'Ver Productos',
                    actionType: 'category',
                    actionTarget: 'iem-audio',
                    image: '/src/assets/images/hero_iem_showcase_1790823801977.jpg',
                    accent: '#06b6d4'
                  });
                }}
                className="w-full py-2.5 rounded-xl border border-dashed border-cyan-500/50 text-cyan-300 hover:bg-cyan-950/20 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>+ Agregar Nuevo Banner al Carrusel</span>
              </button>
            </div>
          )}

          {/* TAB 4: MÉTODOS DE PAGO & WHATSAPP */}
          {activeTab === 'payments' && (
            <form onSubmit={handleSaveSettings} className="space-y-4 max-w-2xl">
              <div>
                <h3 className="text-sm font-bold text-white mb-0.5">Configuración de Tienda, Logo y Pagos</h3>
                <p className="text-xs text-slate-400">
                  Gestiona el logotipo oficial, el número de atención al cliente y las pasarelas de pago.
                </p>
              </div>

              {/* Logo Management Section */}
              <div className="p-4 bg-gradient-to-r from-purple-950/40 via-slate-900/60 to-cyan-950/40 rounded-xl border border-cyan-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                    <ImageIcon className="w-4 h-4 text-cyan-400" />
                    <span>Logotipo Oficial de NexusMóvil (PNG / SVG original sin fondo)</span>
                  </div>
                  {settingsForm.customLogoUrl && (
                    <button
                      type="button"
                      onClick={() => setSettingsForm({ ...settingsForm, customLogoUrl: '' })}
                      className="text-[10px] text-rose-400 hover:text-rose-300 underline cursor-pointer"
                    >
                      Restablecer al logotipo base
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Sube aquí tu imagen <strong>logo-sin-fondo.png</strong> original. Se integrará de inmediato en el encabezado (Navbar) y pie de página (Footer) con fondo transparente y tamaño proporcional sin ninguna distorsión.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-1">
                  {/* Preview container with dark background */}
                  <div className="w-24 h-24 rounded-xl border border-slate-700 bg-[#0b0f19] flex items-center justify-center p-2 shrink-0 shadow-inner">
                    <img
                      src={settingsForm.customLogoUrl || '/logo-sin-fondo.svg'}
                      alt="Vista previa del logo"
                      className="max-w-full max-h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,245,255,0.3)]"
                    />
                  </div>

                  <div className="flex-1 space-y-2 w-full">
                    <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold cursor-pointer transition-colors shadow-lg shadow-cyan-900/30">
                      <Upload className="w-4 h-4" />
                      <span>Cargar archivo original (logo-sin-fondo.png)</span>
                      <input
                        type="file"
                        accept="image/png,image/svg+xml,image/webp,image/jpeg"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              if (typeof reader.result === 'string') {
                                setSettingsForm({ ...settingsForm, customLogoUrl: reader.result });
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                    <span className="text-[10px] text-slate-400 block text-center sm:text-left">
                      {settingsForm.customLogoUrl
                        ? '✓ Logotipo personalizado cargado con éxito. Recuerda pulsar Guardar Cambios abajo.'
                        : 'Formatos admitidos: PNG transparente, SVG, WebP.'}
                    </span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Contact */}
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <MessageCircle className="w-4 h-4" />
                  <span>Número de Contacto de WhatsApp Oficial</span>
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Número con código de país:</label>
                  <input
                    type="text"
                    value={settingsForm.whatsappNumber}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                    placeholder="+58 416-4761875"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">
                    Número donde tus clientes recibirán los pedidos y atención por WhatsApp.
                  </span>
                </div>
              </div>

              {/* Bolívares Pago Móvil */}
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                    🇻🇪 Pago Móvil en Bolívares
                  </span>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-slate-400">Tasa Oficial (Bs/USD):</span>
                    <input
                      type="number"
                      step="0.1"
                      value={settingsForm.exchangeRateBs}
                      onChange={(e) => setSettingsForm({ ...settingsForm, exchangeRateBs: parseFloat(e.target.value) || 0 })}
                      className="w-16 bg-slate-950 border border-slate-700 rounded px-1.5 py-0.5 text-xs text-white text-right font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Banco(s):</label>
                    <input
                      type="text"
                      value={settingsForm.pagoMovilBanco}
                      onChange={(e) => setSettingsForm({ ...settingsForm, pagoMovilBanco: e.target.value })}
                      placeholder="Banesco / BDV / Mercantil"
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Teléfono Pago Móvil:</label>
                    <input
                      type="text"
                      value={settingsForm.pagoMovilTelefono}
                      onChange={(e) => setSettingsForm({ ...settingsForm, pagoMovilTelefono: e.target.value })}
                      placeholder="0416-4761875"
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Cédula / RIF:</label>
                    <input
                      type="text"
                      value={settingsForm.pagoMovilCedula}
                      onChange={(e) => setSettingsForm({ ...settingsForm, pagoMovilCedula: e.target.value })}
                      placeholder="V-20123456"
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Titular de la cuenta:</label>
                    <input
                      type="text"
                      value={settingsForm.pagoMovilTitular}
                      onChange={(e) => setSettingsForm({ ...settingsForm, pagoMovilTitular: e.target.value })}
                      placeholder="NexusMóvil Inversiones"
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Pagos en Divisas (Binance, Wally, Bancolombia, Nequi) */}
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  💵 Pagos en Divisas (Binance USDT, Wally, Bancolombia, Nequi)
                </span>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Binance Pay (ID / USDT):</label>
                    <input
                      type="text"
                      value={settingsForm.binancePayId}
                      onChange={(e) => setSettingsForm({ ...settingsForm, binancePayId: e.target.value })}
                      placeholder="ID: 54289104"
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Wally Tech (Correo):</label>
                    <input
                      type="text"
                      value={settingsForm.wallyEmail}
                      onChange={(e) => setSettingsForm({ ...settingsForm, wallyEmail: e.target.value })}
                      placeholder="nexusmoviltienda@gmail.com"
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Bancolombia (Cuenta):</label>
                    <input
                      type="text"
                      value={settingsForm.bancolombiaDetails}
                      onChange={(e) => setSettingsForm({ ...settingsForm, bancolombiaDetails: e.target.value })}
                      placeholder="Ahorros 241-000123-45"
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Nequi (Número / Enlace):</label>
                    <input
                      type="text"
                      value={settingsForm.nequiNumber}
                      onChange={(e) => setSettingsForm({ ...settingsForm, nequiNumber: e.target.value })}
                      placeholder="+58 416-4761875"
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Official Store Information & Socials */}
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                  📍 Información de la Tienda y Redes Oficiales
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Usuario Instagram (sin @):</label>
                    <input
                      type="text"
                      value={settingsForm.instagramUser}
                      onChange={(e) => setSettingsForm({ ...settingsForm, instagramUser: e.target.value })}
                      placeholder="nexusmovil"
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Usuario TikTok (sin @):</label>
                    <input
                      type="text"
                      value={settingsForm.tiktokUser}
                      onChange={(e) => setSettingsForm({ ...settingsForm, tiktokUser: e.target.value })}
                      placeholder="nexusmovil"
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-white font-mono"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[10px] text-slate-400 block mb-0.5">Dirección física (opcional):</label>
                    <input
                      type="text"
                      value={settingsForm.address}
                      onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                      placeholder="Ej: Centro de la ciudad / Tienda en línea con envíos nacionales"
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[10px] text-slate-400 block mb-0.5">Horarios de atención:</label>
                    <input
                      type="text"
                      value={settingsForm.businessHours}
                      onChange={(e) => setSettingsForm({ ...settingsForm, businessHours: e.target.value })}
                      placeholder="9:00 AM a 7:00 PM (Lunes a Domingo)"
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Password update section */}
              <div className="p-4 bg-amber-950/20 rounded-xl border border-amber-500/30 space-y-3">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Seguridad: Cambiar Contraseña Maestra de Administrador</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Contraseña Actual:</label>
                    <input
                      type="password"
                      placeholder="Clave actual"
                      value={currentPassInput}
                      onChange={(e) => setCurrentPassInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-white font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Nueva Contraseña:</label>
                    <input
                      type="password"
                      placeholder="Mínimo 6 caracteres"
                      value={newPassInput}
                      onChange={(e) => setNewPassInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-white font-mono text-xs"
                    />
                  </div>
                </div>
                {currentPassInput && newPassInput && (
                  <button
                    type="button"
                    onClick={() => {
                      const ok = updateAdminPassword(currentPassInput, newPassInput);
                      if (ok) {
                        setCurrentPassInput('');
                        setNewPassInput('');
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs cursor-pointer shadow-sm"
                  >
                    Actualizar Contraseña
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-md"
              >
                Guardar Configuración y Métodos de Pago
              </button>
            </form>
          )}

          {/* TAB 5: ORDERS & TRACKING */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white mb-0.5">Gestión de Pedidos & Envíos</h3>
                <p className="text-xs text-slate-400">Actualiza el estado de las órdenes para que los clientes las rastreen en tiempo real.</p>
              </div>

              {orders.length === 0 ? (
                <p className="text-xs text-slate-400">No hay pedidos registrados aún.</p>
              ) : (
                <div className="space-y-3">
                  {orders.map(ord => (
                    <div key={ord.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-cyan-400">#{ord.id}</span>
                          <span className="text-xs text-white font-semibold">{ord.customerName}</span>
                          <span className="text-[11px] text-slate-400 font-mono">({ord.customerPhone})</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-white">
                          ${ord.total.toFixed(2)} USD · <span className="text-cyan-300">{ord.paymentMethod}</span>
                        </span>
                      </div>

                      <div className="text-xs text-slate-300 space-y-1">
                        <p><strong>Destino:</strong> {ord.shippingCity} - {ord.shippingAddress}</p>
                        <p><strong>Artículos:</strong> {ord.items.map(i => `${i.quantity}x ${i.productName}`).join(', ')}</p>
                      </div>

                      {/* Status changer */}
                      <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                        <span className="text-slate-400">Estado:</span>
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-white font-semibold"
                        >
                          <option value="recibido">1. Recibido</option>
                          <option value="confirmado_whatsapp">2. Confirmado por WhatsApp</option>
                          <option value="en_preparacion">3. En preparación</option>
                          <option value="despachado">4. Despachado</option>
                          <option value="en_camino">5. En camino</option>
                          <option value="entregado">6. Entregado</option>
                          <option value="cancelado">Cancelado</option>
                        </select>

                        <input
                          type="text"
                          placeholder="Número de guía (ej. MRW-9482)"
                          defaultValue={ord.trackingCode || ''}
                          onBlur={(e) => updateOrderStatus(ord.id, ord.status, e.target.value)}
                          className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white font-mono text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: GOOGLE REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Reseñas de Google Maps / Clientes de NexusMóvil</h3>
                  <p className="text-xs text-slate-400">Visualiza los comentarios reales publicados por los compradores.</p>
                </div>
              </div>

              <div className="space-y-3">
                {reviews.map(rev => (
                  <div key={rev.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <img src={rev.avatar} alt={rev.author} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{rev.author}</span>
                          <span className="text-[10px] text-slate-400">{rev.date}</span>
                          <span className="text-[10px] text-amber-400 flex items-center">
                            {'★'.repeat(rev.rating)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">{rev.comment}</p>
                        <span className="text-[10px] text-cyan-400 font-mono mt-1 block">
                          Compró: {rev.productPurchased}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteReview(rev.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 cursor-pointer"
                      title="Eliminar reseña"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
