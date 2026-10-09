import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  Truck,
  ShieldCheck,
  ShoppingBag,
  ArrowRight,
  ChevronLeft,
  CreditCard,
  User,
  MapPin,
  Bike,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartTotal,
    cartCount,
    createOrder,
    currentUser,
    setIsTrackingOpen,
    settings
  } = useStore();

  // Step 1: 'cart' (artículos), Step 2: 'checkout' (gestiona tus datos de entrega)
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');

  // Customer Personal Info
  const [customerName, setCustomerName] = useState('');
  const [customerCedula, setCustomerCedula] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  // Delivery options: 'national_agency' (MRW/Zoom/Tealca) vs 'delivery_sc' (San Cristóbal)
  const [shippingMode, setShippingMode] = useState<'national_agency' | 'delivery_sc'>('national_agency');
  const [pickupOffice, setPickupOffice] = useState('');
  const [scAddress, setScAddress] = useState('');

  // Validation touched and submit attempt states
  const [touched, setTouched] = useState({
    name: false,
    cedula: false,
    phone: false,
    office: false
  });
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  // Field validations
  const isNameValid = customerName.trim().length >= 3;
  const isCedulaValid = customerCedula.trim().length >= 4;
  const isPhoneValid = customerPhone.trim().length >= 7;
  const isOfficeValid = shippingMode === 'national_agency'
    ? pickupOffice.trim().length >= 3
    : scAddress.trim().length >= 3;

  const isFormValid = isNameValid && isCedulaValid && isPhoneValid && isOfficeValid;

  // Specific error messages
  const nameError = (touched.name || hasAttemptedSubmit) && !isNameValid
    ? 'Ingresa tu nombre y apellido (mínimo 3 caracteres)'
    : null;

  const cedulaError = (touched.cedula || hasAttemptedSubmit) && !isCedulaValid
    ? 'La cédula es requerida para el retiro en taquilla (ej. V-18.456.789)'
    : null;

  const phoneError = (touched.phone || hasAttemptedSubmit) && !isPhoneValid
    ? 'Ingresa un número de WhatsApp válido (mínimo 7 dígitos)'
    : null;

  const officeError = (touched.office || hasAttemptedSubmit) && !isOfficeValid
    ? (shippingMode === 'national_agency'
        ? 'Indica la oficina o ciudad de retiro (ej. MRW Chacao o Zoom Barrio Obrero)'
        : 'Indica tu sector o dirección en San Cristóbal')
    : null;

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState('Pago Móvil (Bolívares)');

  // Autofill user info if logged in
  useEffect(() => {
    if (currentUser) {
      setCustomerName(currentUser.name || '');
      setCustomerPhone(currentUser.phone || '');
    }
  }, [currentUser]);

  if (!isCartOpen) return null;

  const freeShippingThreshold = settings.freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);
  const shippingCost = cartTotal >= freeShippingThreshold ? 0 : settings.standardShippingCost;
  const finalTotal = cartTotal + shippingCost;
  const totalBs = (finalTotal * settings.exchangeRateBs).toFixed(2);

  // Fast Checkout directly via WhatsApp with clear instructions requesting required shipping details
  const handleFastWhatsAppCheckout = () => {
    const cleanPhone = (settings.whatsappNumber || '+584164761875').replace(/[^0-9]/g, '') || '584164761875';
    const itemsList = cart.map(item =>
      `• *${item.product.name}*\n  Color: ${item.selectedColor} | Opción: ${item.selectedFormat}\n  Cantidad: x${item.quantity} | Subtotal: $${(item.unitPrice * item.quantity).toFixed(2)} USD`
    ).join('\n\n');

    const message = `*👋 ¡HOLA EQUIPO DE VENTAS NEXUSMÓVIL!* \n` +
      `_Deseo gestionar la compra de los artículos de mi carrito:_\n\n` +
      `🛒 *DETALLE DEL PEDIDO:*\n` +
      `${itemsList}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `💰 *RESUMEN DE PAGO:*\n` +
      `• *Subtotal:* $${cartTotal.toFixed(2)} USD\n` +
      `• *Envío Nacional:* ${shippingCost === 0 ? '¡GRATIS! 🎉' : `$${shippingCost.toFixed(2)} USD`}\n` +
      `• *TOTAL A PAGAR:* $${finalTotal.toFixed(2)} USD (~ Bs. ${totalBs})\n` +
      `  _(Tasa oficial del día: ${settings.exchangeRateBs} Bs/$)_\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `📋 *INSTRUCCIONES PARA EL CLIENTE:*\n` +
      `_Por favor, complete los siguientes 3 datos obligatorios para procesar su guía de despacho nacional:_\n\n` +
      `1️⃣ *Nombre y Apellido:* [Escriba su nombre y apellido completo aquí]\n` +
      `2️⃣ *Número de Cédula:* [Ejemplo: V-18.456.789 o E-XX.XXX.XXX]\n` +
      `3️⃣ *Oficina de Retiro Seleccionada:* \n` +
      `   ↳ *Empresa:* [Indique: MRW / Zoom / Tealca / o Delivery San Cristóbal]\n` +
      `   ↳ *Ciudad y Sede:* [Ejemplo: MRW Chacao (Caracas) / Zoom Barrio Obrero / Tealca Valencia]\n\n` +
      `4️⃣ *Teléfono de Contacto:* [Su número para avisos de entrega]\n` +
      `5️⃣ *Método de Pago Preferido:*\n` +
      `   [ ] Pago Móvil (Bolívares)\n` +
      `   [ ] Binance USDT\n` +
      `   [ ] Wally Tech\n` +
      `   [ ] Bancolombia / Nequi\n` +
      `   [ ] Efectivo en Divisas\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `💬 *Quedo a la espera de sus datos de cuenta para realizar el pago correspondiente y confirmar el envío. ¡Muchas gracias!*`;

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Detailed Submit with form data
  const handleDetailedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    if (!isFormValid) {
      return;
    }

    const cleanPhone = (settings.whatsappNumber || '+584164761875').replace(/[^0-9]/g, '') || '584164761875';

    const shippingDestination = shippingMode === 'national_agency'
      ? pickupOffice.trim()
      : scAddress.trim() || 'San Cristóbal (Táchira) - A coordinar punto';

    const finalAddress = shippingMode === 'national_agency'
      ? `Retiro en Oficina (MRW / Zoom / Tealca): ${shippingDestination}`
      : `Delivery San Cristóbal: ${shippingDestination}`;

    const { order } = createOrder({
      name: customerName.trim(),
      cedula: customerCedula.trim(),
      phone: customerPhone.trim(),
      city: shippingMode === 'national_agency' ? 'Nacional (Venezuela)' : 'San Cristóbal (Táchira)',
      address: finalAddress,
      paymentMethod
    });

    const itemsSummary = cart.map(item =>
      `• *${item.product.name}*\n  Color: ${item.selectedColor} | Opción: ${item.selectedFormat}\n  Cantidad: x${item.quantity} | Subtotal: $${(item.unitPrice * item.quantity).toFixed(2)} USD`
    ).join('\n\n');

    const professionalMessage = `*👋 ¡HOLA EQUIPO DE VENTAS NEXUSMÓVIL!* \n` +
      `*📦 NUEVO PEDIDO REGISTRADO:* #${order.id}\n` +
      `*📅 Fecha:* ${order.date}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *DATOS DEL CLIENTE PARA EL ENVÍO:*\n` +
      `• *Nombre y Apellido:* ${customerName.trim()}\n` +
      `• *Número de Cédula:* ${customerCedula.trim()}\n` +
      `• *Teléfono WhatsApp:* ${customerPhone.trim()}\n\n` +
      `🏢 *OFICINA DE RETIRO SELECCIONADA:*\n` +
      `• *Modalidad:* ${shippingMode === 'national_agency' ? 'Envío Nacional por Oficina (MRW / Zoom / Tealca)' : 'Delivery San Cristóbal (Táchira)'}\n` +
      `• *Sede / Destino de Retiro:* ${shippingDestination}\n` +
      `• *Instrucción de Entrega:* Retiro en taquilla con documento de identidad original laminado.\n\n` +
      `💳 *MÉTODO DE PAGO ELEGIDO:*\n` +
      `• ${paymentMethod}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `🛒 *DETALLE DE PRODUCTOS:*\n` +
      `${itemsSummary}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `💰 *RESUMEN TOTAL:*\n` +
      `• *Subtotal Artículos:* $${cartTotal.toFixed(2)} USD\n` +
      `• *Envío Nacional:* ${shippingCost === 0 ? '¡GRATIS! 🎉' : `$${shippingCost.toFixed(2)} USD`}\n` +
      `• *TOTAL A PAGAR:* $${finalTotal.toFixed(2)} USD (~ Bs. ${totalBs})\n` +
      `  _(Tasa oficial del día: ${settings.exchangeRateBs} Bs/$)_\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `💬 *Por favor, facilítenme los datos de cuenta correspondientes para realizar el pago y proceder con la emisión de la guía de despacho. ¡Muchas gracias!*`;

    setIsCartOpen(false);
    setStep('cart');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(professionalMessage)}`, '_blank');
    setIsTrackingOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Cart Drawer Container */}
      <div className="relative z-10 w-full sm:max-w-md h-full bg-[#0d131f] border-l border-slate-800/80 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Top Header */}
        <div className="p-3.5 sm:p-4 border-b border-slate-800 bg-[#090d16] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {step === 'checkout' ? (
              <button
                onClick={() => setStep('cart')}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer flex items-center gap-1 text-xs"
                title="Volver a los artículos"
              >
                <ChevronLeft className="w-5 h-5 text-cyan-400" />
                <span className="text-slate-300">Volver</span>
              </button>
            ) : (
              <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                <ShoppingBag className="w-4 h-4" />
              </div>
            )}
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>{step === 'cart' ? 'Tu Carrito' : 'Datos para tu Envío'}</span>
                <span className="text-[11px] font-mono bg-slate-800 text-cyan-300 px-2 py-0.5 rounded-full">
                  {cartCount} {cartCount === 1 ? 'artículo' : 'artículos'}
                </span>
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress bar */}
        {cart.length > 0 && (
          <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800/80">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="flex items-center gap-1.5 text-slate-300 text-[11px] font-medium">
                <Truck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                {remainingForFreeShipping > 0
                  ? `Faltan $${remainingForFreeShipping.toFixed(2)} USD para Envío GRATIS`
                  : '¡Tienes Envío GRATIS asegurado! 🎉'}
              </span>
              <span className="font-mono text-[10px] text-cyan-400 font-bold">
                {Math.min(100, Math.round((cartTotal / freeShippingThreshold) * 100))}%
              </span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full transition-all duration-300"
                style={{
                  width: `${Math.min(100, Math.round((cartTotal / freeShippingThreshold) * 100))}%`
                }}
              />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3">
          {cart.length === 0 ? (
            /* Empty State */
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-center text-slate-400 mb-3">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">Tu carrito está vacío</h3>
              <p className="text-xs text-slate-400 max-w-xs mb-5 leading-relaxed">
                Añade audífonos in-ear o periféricos para iniciar tu compra fácil por WhatsApp.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full max-w-xs py-3 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all cursor-pointer shadow-md shadow-cyan-500/20"
              >
                Ver Catálogo de Productos
              </button>
            </div>
          ) : step === 'cart' ? (
            /* STEP 1: CART ITEMS LIST */
            <div className="space-y-2.5">
              {cart.map(item => (
                <div
                  key={item.id}
                  className="p-3 bg-[#0e1422] border border-slate-800 rounded-xl flex gap-3 hover:border-slate-700 transition-colors"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    loading="lazy"
                    decoding="async"
                    className="w-16 h-16 sm:w-18 sm:h-18 rounded-lg object-cover bg-slate-950 shrink-0 border border-slate-800"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-white truncate max-w-[190px]">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                          title="Eliminar del carrito"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-0.5 text-[10px] text-slate-400">
                        <span className="px-1.5 py-0.5 rounded bg-slate-800/80 text-cyan-300">
                          {item.selectedColor}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-800/80 truncate max-w-[140px]">
                          {item.selectedFormat}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 mt-1.5">
                      <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-slate-300 hover:text-white active:bg-slate-800 rounded-l-lg transition-colors cursor-pointer"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center font-mono text-xs text-white tabular-nums font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-slate-300 hover:text-white active:bg-slate-800 rounded-r-lg transition-colors cursor-pointer"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="font-mono text-xs sm:text-sm font-bold text-white tabular-nums">
                        ${(item.unitPrice * item.quantity).toFixed(2)} USD
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-xs text-cyan-400 hover:text-cyan-300 cursor-pointer"
                >
                  + Seguir agregando productos
                </button>
                <button
                  onClick={clearCart}
                  className="text-[11px] text-slate-500 hover:text-rose-400 cursor-pointer"
                >
                  Vaciar todo
                </button>
              </div>
            </div>
          ) : (
            /* STEP 2: GESTIONA TUS DATOS DE ENTREGA (Súper simplificado y claro) */
            <form id="checkout-form" onSubmit={handleDetailedSubmit} className="space-y-4 animate-in fade-in duration-150">
              {/* SECCIÓN 1: TIPO DE ENTREGA */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <label className="block text-xs font-bold text-cyan-400 uppercase tracking-wide">
                  1. Modalidad de Entrega
                </label>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  {/* Opción 1: Envío Nacional por Oficina */}
                  <button
                    type="button"
                    onClick={() => setShippingMode('national_agency')}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      shippingMode === 'national_agency'
                        ? 'bg-cyan-500/20 border-cyan-400 ring-1 ring-cyan-400/50'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Truck className={`w-4 h-4 ${shippingMode === 'national_agency' ? 'text-cyan-400' : 'text-slate-400'}`} />
                      <span className="font-bold text-white text-xs">Envío Nacional</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight">
                      Retiro en oficina <strong className="text-slate-300">MRW, Zoom o Tealca</strong> en cualquier ciudad.
                    </p>
                  </button>

                  {/* Opción 2: Delivery San Cristóbal */}
                  <button
                    type="button"
                    onClick={() => setShippingMode('delivery_sc')}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      shippingMode === 'delivery_sc'
                        ? 'bg-cyan-500/20 border-cyan-400 ring-1 ring-cyan-400/50'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Bike className={`w-4 h-4 ${shippingMode === 'delivery_sc' ? 'text-cyan-400' : 'text-slate-400'}`} />
                      <span className="font-bold text-white text-xs">Delivery San Cristóbal</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight">
                      Entrega directa en <strong className="text-slate-300">San Cristóbal (Táchira)</strong>.
                    </p>
                  </button>
                </div>
              </div>

              {/* SECCIÓN 2: TUS DATOS PERSONALES */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wide">
                  <User className="w-4 h-4" />
                  <span>2. Datos de la Persona que Recibe</span>
                </div>

                {/* Nombre y Apellido */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-medium text-slate-300">
                      Nombre y Apellido <span className="text-rose-400">*</span>
                    </label>
                    {touched.name && isNameValid && (
                      <span className="text-[10px] text-emerald-400 flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" /> Válido
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Ej. Carlos Mendoza"
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                        if (!touched.name) setTouched(prev => ({ ...prev, name: true }));
                      }}
                      onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
                      className={`w-full bg-slate-950 border rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none transition-colors ${
                        nameError
                          ? 'border-rose-500 bg-rose-950/20 focus:border-rose-400 focus:ring-1 focus:ring-rose-500/40'
                          : touched.name && isNameValid
                          ? 'border-emerald-500/60 focus:border-emerald-400'
                          : 'border-slate-700 focus:border-cyan-400'
                      }`}
                    />
                    {nameError && (
                      <AlertCircle className="w-3.5 h-3.5 text-rose-400 absolute right-2.5 top-2.5 pointer-events-none" />
                    )}
                  </div>
                  {nameError && (
                    <p className="text-[10px] text-rose-400 mt-1 flex items-center gap-1 animate-in fade-in">
                      <span>{nameError}</span>
                    </p>
                  )}
                </div>

                {/* Cédula y Teléfono */}
                <div className="grid grid-cols-2 gap-2">
                  {/* Cédula */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-medium text-slate-300">
                        Cédula (V- o E-) <span className="text-rose-400">*</span>
                      </label>
                      {touched.cedula && isCedulaValid && (
                        <span className="text-[10px] text-emerald-400 flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="Ej. V-18.456.789"
                        value={customerCedula}
                        onChange={(e) => {
                          setCustomerCedula(e.target.value);
                          if (!touched.cedula) setTouched(prev => ({ ...prev, cedula: true }));
                        }}
                        onBlur={() => setTouched(prev => ({ ...prev, cedula: true }))}
                        className={`w-full bg-slate-950 border rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-none transition-colors ${
                          cedulaError
                            ? 'border-rose-500 bg-rose-950/20 focus:border-rose-400 focus:ring-1 focus:ring-rose-500/40'
                            : touched.cedula && isCedulaValid
                            ? 'border-emerald-500/60 focus:border-emerald-400'
                            : 'border-slate-700 focus:border-cyan-400'
                        }`}
                      />
                      {cedulaError && (
                        <AlertCircle className="w-3.5 h-3.5 text-rose-400 absolute right-2.5 top-2.5 pointer-events-none" />
                      )}
                    </div>
                    {cedulaError && (
                      <p className="text-[10px] text-rose-400 mt-1 flex items-center gap-1 animate-in fade-in leading-tight">
                        <span>{cedulaError}</span>
                      </p>
                    )}
                  </div>

                  {/* Teléfono WhatsApp */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-medium text-slate-300">
                        WhatsApp <span className="text-rose-400">*</span>
                      </label>
                      {touched.phone && isPhoneValid && (
                        <span className="text-[10px] text-emerald-400 flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        placeholder="0416-1234567"
                        value={customerPhone}
                        onChange={(e) => {
                          setCustomerPhone(e.target.value);
                          if (!touched.phone) setTouched(prev => ({ ...prev, phone: true }));
                        }}
                        onBlur={() => setTouched(prev => ({ ...prev, phone: true }))}
                        className={`w-full bg-slate-950 border rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-none transition-colors ${
                          phoneError
                            ? 'border-rose-500 bg-rose-950/20 focus:border-rose-400 focus:ring-1 focus:ring-rose-500/40'
                            : touched.phone && isPhoneValid
                            ? 'border-emerald-500/60 focus:border-emerald-400'
                            : 'border-slate-700 focus:border-cyan-400'
                        }`}
                      />
                      {phoneError && (
                        <AlertCircle className="w-3.5 h-3.5 text-rose-400 absolute right-2.5 top-2.5 pointer-events-none" />
                      )}
                    </div>
                    {phoneError && (
                      <p className="text-[10px] text-rose-400 mt-1 flex items-center gap-1 animate-in fade-in leading-tight">
                        <span>{phoneError}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Destino específico según la modalidad seleccionada */}
                {shippingMode === 'national_agency' ? (
                  <div className="pt-1">
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] text-slate-300 font-medium">
                        Oficina de retiro seleccionada (MRW / Zoom / Tealca) <span className="text-rose-400">*</span>
                      </label>
                      {touched.office && isOfficeValid && (
                        <span className="text-[10px] text-emerald-400 flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" /> Válido
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="Ej. MRW Chacao (Caracas), Zoom Barrio Obrero (San Cristóbal) o Tealca Valencia..."
                        value={pickupOffice}
                        onChange={(e) => {
                          setPickupOffice(e.target.value);
                          if (!touched.office) setTouched(prev => ({ ...prev, office: true }));
                        }}
                        onBlur={() => setTouched(prev => ({ ...prev, office: true }))}
                        className={`w-full bg-slate-950 border rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none placeholder-slate-500 transition-colors ${
                          officeError
                            ? 'border-rose-500 bg-rose-950/20 focus:border-rose-400 focus:ring-1 focus:ring-rose-500/40'
                            : touched.office && isOfficeValid
                            ? 'border-emerald-500/60 focus:border-emerald-400'
                            : 'border-slate-700 focus:border-cyan-400'
                        }`}
                      />
                      {officeError && (
                        <AlertCircle className="w-3.5 h-3.5 text-rose-400 absolute right-2.5 top-2.5 pointer-events-none" />
                      )}
                    </div>
                    {officeError ? (
                      <p className="text-[10px] text-rose-400 mt-1 flex items-center gap-1 animate-in fade-in">
                        <span>{officeError}</span>
                      </p>
                    ) : (
                      <span className="text-[10px] text-slate-400 block mt-1">
                        💡 Indícanos la empresa (MRW, Zoom o Tealca) y la sede/ciudad donde retirarás tu encomienda.
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="pt-1">
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] text-slate-300 font-medium">
                        Sector o dirección en San Cristóbal <span className="text-rose-400">*</span>
                      </label>
                      {touched.office && isOfficeValid && (
                        <span className="text-[10px] text-emerald-400 flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" /> Válido
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="Ej. Barrio Obrero, Pueblo Nuevo, La Concordia, Pirineos..."
                        value={scAddress}
                        onChange={(e) => {
                          setScAddress(e.target.value);
                          if (!touched.office) setTouched(prev => ({ ...prev, office: true }));
                        }}
                        onBlur={() => setTouched(prev => ({ ...prev, office: true }))}
                        className={`w-full bg-slate-950 border rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none placeholder-slate-500 transition-colors ${
                          officeError
                            ? 'border-rose-500 bg-rose-950/20 focus:border-rose-400 focus:ring-1 focus:ring-rose-500/40'
                            : touched.office && isOfficeValid
                            ? 'border-emerald-500/60 focus:border-emerald-400'
                            : 'border-slate-700 focus:border-cyan-400'
                        }`}
                      />
                      {officeError && (
                        <AlertCircle className="w-3.5 h-3.5 text-rose-400 absolute right-2.5 top-2.5 pointer-events-none" />
                      )}
                    </div>
                    {officeError ? (
                      <p className="text-[10px] text-rose-400 mt-1 flex items-center gap-1 animate-in fade-in">
                        <span>{officeError}</span>
                      </p>
                    ) : (
                      <span className="text-[10px] text-slate-400 block mt-1">
                        🛵 Puedes enviar tu punto de ubicación por WhatsApp luego de confirmar para entregarte en mano.
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* SECCIÓN 3: SELECCIONAR MÉTODO DE PAGO */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wide">
                    <CreditCard className="w-4 h-4" />
                    <span>3. Método de Pago</span>
                  </div>
                  <span className="text-[10px] text-slate-400">El gestor te enviará los datos</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'Pago Móvil (Bolívares)', label: '🇻🇪 Pago Móvil', sub: `Bs. ${totalBs} (Tasa ${settings.exchangeRateBs})` },
                    { id: 'Binance Pay / USDT', label: '💵 Binance USDT', sub: `$${finalTotal.toFixed(2)} USD` },
                    { id: 'Wally Tech', label: '💳 Wally Tech', sub: `$${finalTotal.toFixed(2)} USD` },
                    { id: 'Bancolombia', label: '🏦 Bancolombia', sub: 'Cuenta Ahorros' },
                    { id: 'Nequi', label: '📱 Nequi', sub: 'Enlace / Número' },
                    { id: 'Efectivo en Divisas', label: '💵 Efectivo Divisas', sub: 'Al recibir/retirar' }
                  ].map(method => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                        paymentMethod === method.id
                          ? 'bg-cyan-500/20 border-cyan-400 ring-1 ring-cyan-400/50'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <p className="font-bold text-white text-xs">{method.label}</p>
                      <p className="text-[10px] text-slate-400 truncate">{method.sub}</p>
                    </button>
                  ))}
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Footer Actions */}
        {cart.length > 0 && (
          <div className="p-3.5 sm:p-4 border-t border-slate-800 bg-[#090d16] space-y-2.5">
            {/* Price breakdown */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal ({cartCount} artículos)</span>
                <span className="font-mono text-white tabular-nums font-semibold">
                  ${cartTotal.toFixed(2)} USD
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>
                  {step === 'checkout' && shippingMode === 'delivery_sc'
                    ? 'Delivery San Cristóbal'
                    : 'Envío Nacional (MRW / Zoom / Tealca)'}
                </span>
                <span className="font-mono tabular-nums text-emerald-400 font-semibold">
                  {shippingCost === 0 ? 'GRATIS' : `$${shippingCost.toFixed(2)} USD`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-1.5 border-t border-slate-800">
                <div>
                  <span>Total a Pagar</span>
                  <span className="text-[11px] font-mono text-slate-400 block font-normal">
                    ≈ Bs. {totalBs} (Tasa: {settings.exchangeRateBs} Bs/$)
                  </span>
                </div>
                <span className="font-mono text-cyan-300 tabular-nums">
                  ${finalTotal.toFixed(2)} USD
                </span>
              </div>
            </div>

            {step === 'cart' ? (
              <div className="space-y-2 pt-1">
                {/* 1-Tap Fast Checkout */}
                <button
                  onClick={handleFastWhatsAppCheckout}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#25D366] hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 cursor-pointer active:scale-98"
                >
                  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>Comprar Rápido por WhatsApp</span>
                </button>

                {/* Secondary: "Gestiona tus datos de entrega" */}
                <button
                  onClick={() => setStep('checkout')}
                  className="w-full py-2.5 px-3 rounded-xl font-medium text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Gestiona tus datos de entrega</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                </button>
              </div>
            ) : (
              /* Final Submit in Step 2 */
              <div className="space-y-2 pt-1">
                {/* Missing required fields warning when button is disabled */}
                {!isFormValid && (
                  <div className="p-2 rounded-xl bg-amber-950/40 border border-amber-800/50 text-[11px] text-amber-300 flex items-center gap-2 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      Completa los campos obligatorios para continuar: <strong>{[
                        !isNameValid && 'Nombre',
                        !isCedulaValid && 'Cédula',
                        !isPhoneValid && 'WhatsApp',
                        !isOfficeValid && (shippingMode === 'national_agency' ? 'Oficina de retiro' : 'Dirección en San Cristóbal')
                      ].filter(Boolean).join(', ')}</strong>.
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  form="checkout-form"
                  disabled={!isFormValid}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                    isFormValid
                      ? 'text-white bg-[#25D366] hover:bg-[#20bd5a] shadow-lg shadow-emerald-950/40 cursor-pointer active:scale-98'
                      : 'text-slate-400 bg-slate-800/80 border border-slate-700/60 cursor-not-allowed opacity-60 shadow-none'
                  }`}
                  title={
                    isFormValid
                      ? 'Enviar pedido a WhatsApp'
                      : 'Completa tu Nombre, Cédula y Oficina de retiro para habilitar el envío'
                  }
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>
                    {isFormValid
                      ? 'Confirmar y Enviar Pedido por WhatsApp'
                      : 'Completa los campos para enviar pedido'}
                  </span>
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Atención personalizada por WhatsApp · Envíos seguros</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
