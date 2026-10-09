import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { LazyImage } from './LazyImage';
import {
  X,
  Star,
  ShoppingBag,
  MessageCircle,
  Truck,
  CheckCircle2
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductModal,
    setSelectedProductModal,
    addToCart,
    settings
  } = useStore();

  const product = selectedProductModal;

  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedFormat, setSelectedFormat] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]?.name || 'Estándar');
      setSelectedFormat(product.formats[0]?.name || 'Estándar');
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  // Calculate current unit price with format modifier
  const currentFormatObj = product.formats.find(f => f.name === selectedFormat);
  const unitPrice = product.price + (currentFormatObj?.priceDelta || 0);
  const totalPrice = unitPrice * quantity;
  const totalBs = (totalPrice * settings.exchangeRateBs).toFixed(2);
  const unitBs = (unitPrice * settings.exchangeRateBs).toFixed(2);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedFormat, quantity);
  };

  const handleBuyNowWhatsApp = () => {
    const cleanPhone = (settings.whatsappNumber || '+584164761875').replace(/[^0-9]/g, '') || '584164761875';
    const message = `*👋 ¡Hola NexusMóvil! Quiero pedir este producto:* \n\n` +
      `*Artículo:* ${product.name}\n` +
      `*Marca:* ${product.brand}\n` +
      `*Color:* ${selectedColor}\n` +
      `*Conector / Opción:* ${selectedFormat}\n` +
      `*Cantidad:* ${quantity} unidad(es)\n` +
      `*Total:* $${totalPrice.toFixed(2)} USD (~ Bs. ${totalBs})\n\n` +
      `¿Tienen disponibilidad y me facilitan los datos de pago (Pago Móvil / Binance USDT / Wally / Bancolombia)? ¡Gracias!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${cleanPhone}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0c121e] border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Simple Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-[#080d16]">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-cyan-400 uppercase tracking-wider font-mono">
              {product.brand}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-300 font-medium">{product.subcategory}</span>
          </div>
          <button
            onClick={() => setSelectedProductModal(null)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Simple, Concise, Direct */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-start">
            {/* Left: Product Image */}
            <div className="space-y-2">
              <div className="relative h-56 sm:h-64 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                <LazyImage
                  src={product.image}
                  alt={product.name}
                  priority={true}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-slate-900/90 text-cyan-300 border border-cyan-500/40 text-xs font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Delivery notice */}
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-300">
                <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Retiro en tienda o envío nacional asegurado</span>
              </div>
            </div>

            {/* Right: Selectors & Buy */}
            <div className="space-y-3.5">
              <div>
                <div className="flex items-center gap-1.5 text-amber-400 text-xs mb-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-slate-500 text-[11px]">({product.reviewsCount} opiniones de clientes)</span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {product.name}
                </h2>

                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {product.idealFor || product.description}
                </p>
              </div>

              {/* Price Banner */}
              <div className="p-3 rounded-2xl bg-[#080d16] border border-cyan-500/20 flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">PRECIO</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-extrabold text-white font-mono tabular-nums">
                      ${unitPrice.toFixed(2)}
                    </span>
                    <span className="text-xs text-slate-400 font-sans">USD</span>
                    <span className="text-xs text-cyan-400 font-mono ml-2">
                      (~ Bs. {unitBs})
                    </span>
                  </div>
                </div>

                {quantity > 1 && (
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-mono">TOTAL ({quantity} un.)</span>
                    <span className="text-lg font-bold text-cyan-300 font-mono">
                      ${totalPrice.toFixed(2)} USD
                    </span>
                  </div>
                )}
              </div>

              {/* Selector 1: Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Color disponible:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {product.colors.map(col => {
                      const isSelected = selectedColor === col.name;
                      return (
                        <button
                          key={col.name}
                          type="button"
                          onClick={() => setSelectedColor(col.name)}
                          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-cyan-500/20 border-cyan-400 text-white font-semibold'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span
                            className="w-3 h-3 rounded-full border border-slate-600"
                            style={{ backgroundColor: col.hex }}
                          />
                          <span>{col.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Selector 2: Connector / Format */}
              {product.formats && product.formats.length > 0 && (
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Tipo de conector / opción:
                  </label>
                  <div className="space-y-1.5">
                    {product.formats.map(fmt => {
                      const isSelected = selectedFormat === fmt.name;
                      return (
                        <button
                          key={fmt.name}
                          type="button"
                          onClick={() => setSelectedFormat(fmt.name)}
                          className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition-all text-left cursor-pointer border ${
                            isSelected
                              ? 'bg-cyan-950/50 border-cyan-400 text-cyan-200 font-semibold shadow-xs'
                              : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-cyan-400 bg-cyan-400' : 'border-slate-600'
                            }`}>
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                            </span>
                            <span>{fmt.name}</span>
                          </div>
                          {fmt.priceDelta !== undefined && fmt.priceDelta !== 0 && (
                            <span className="font-mono text-[11px] text-cyan-300 ml-2">
                              {fmt.priceDelta > 0 ? `+$${fmt.priceDelta}.00` : `-$${Math.abs(fmt.priceDelta)}.00`}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Selector 3: Quantity */}
              <div className="flex items-center gap-3 pt-1">
                <span className="text-xs font-semibold text-slate-300">Cantidad:</span>
                <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-2.5 py-1 text-slate-300 hover:text-white text-xs cursor-pointer font-bold"
                  >
                    -
                  </button>
                  <span className="px-2.5 font-mono text-xs text-white tabular-nums font-bold">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                    className="px-2.5 py-1 text-slate-300 hover:text-white text-xs cursor-pointer font-bold"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-emerald-400 font-medium">
                  ✓ Disponible en bodega
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Direct & Clear */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* WhatsApp direct purchase */}
              <button
                type="button"
                onClick={handleBuyNowWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-500 active:scale-98 transition-all shadow-lg shadow-emerald-950/60 cursor-pointer border border-emerald-400/30"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Pedir directo por WhatsApp</span>
              </button>

              {/* Add to cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:scale-98 transition-all shadow-md shadow-cyan-950/40 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Añadir al Carrito</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              Coordinamos tu pago (Pago Móvil, Binance USDT, Wally, Bancolombia) y entrega directamente con el operador de NexusMóvil.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
