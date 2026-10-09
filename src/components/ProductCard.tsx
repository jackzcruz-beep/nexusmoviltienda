import React from 'react';
import { Product, SoundSignature } from '../types';
import { useStore } from '../context/StoreContext';
import { LazyImage } from './LazyImage';
import { Star, MessageCircle, ArrowRight, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const getSoundSignatureTag = (sig?: SoundSignature) => {
  switch (sig) {
    case 'bass-head':
      return { emoji: '💥', label: 'Bass-Head' };
    case 'balanced':
      return { emoji: '⚖️', label: 'Balanceado' };
    case 'gaming':
      return { emoji: '🎮', label: 'Gaming FPS' };
    case 'monitoring':
      return { emoji: '🎙️', label: 'Monitoreo' };
    default:
      return null;
  }
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setSelectedProductModal, settings } = useStore();
  const soundTag = getSoundSignatureTag(product.soundSignature);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleDirectWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cleanPhone = (settings.whatsappNumber || '+584164761875').replace(/[^0-9]/g, '') || '584164761875';
    const text = `*👋 ¡Hola NexusMóvil! Me interesa comprar este artículo:* \n\n` +
      `*Producto:* ${product.name}\n` +
      `*Precio:* $${product.price.toFixed(2)} USD\n\n` +
      `¿Tienen disponibilidad para envío inmediato? ¡Gracias!`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <article
      onClick={() => setSelectedProductModal(product)}
      className="group relative flex flex-col illuminated-card rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Subtle corner light halo on hover */}
      <div className="absolute -top-10 -right-10 w-24 h-24 ambient-orb-cyan rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />

      {/* Product Image with progressive lazy loading */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#070b12]">
        <LazyImage
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-300"
        />

        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1422] via-transparent to-transparent opacity-70 pointer-events-none" />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {product.badge ? (
            <span className="text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-full bg-slate-900/90 text-cyan-300 border border-cyan-500/30 backdrop-blur-xs">
              {product.badge}
            </span>
          ) : (
            <span />
          )}

          {discountPercent > 0 && (
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-950/90 text-rose-300 border border-rose-800/40 backdrop-blur-xs">
              -{discountPercent}%
            </span>
          )}
        </div>
      </div>

      {/* Card Info */}
      <div className="flex flex-col flex-1 p-3 sm:p-4 justify-between space-y-2 sm:space-y-3">
        <div>
          {/* Brand & Stars */}
          <div className="flex items-center justify-between text-xs mb-1">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="font-semibold text-cyan-400 uppercase text-[9px] sm:text-[10px] tracking-wider truncate max-w-[85px]">
                {product.brand}
              </span>
              {soundTag && (
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-950/70 border border-cyan-800/40 text-cyan-300 font-medium truncate shrink-0">
                  {soundTag.emoji} {soundTag.label}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-amber-400 font-mono shrink-0 ml-1">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 leading-snug">
            {product.name}
          </h3>

          {/* Plain-Language Friendly Benefit */}
          <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 sm:mt-1 line-clamp-2 leading-relaxed">
            {product.idealFor || product.description}
          </p>
        </div>

        {/* Price & Primary Action */}
        <div className="pt-2 sm:pt-2.5 border-t border-slate-800/80 flex items-center justify-between gap-1.5">
          <div className="min-w-0">
            <div className="flex items-baseline gap-1">
              <span className="text-base sm:text-lg font-extrabold text-white font-mono tabular-nums">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-[9px] sm:text-[10px] text-slate-400 font-sans hidden xs:inline">USD</span>
            </div>
            {product.originalPrice && (
              <span className="text-[9px] sm:text-[10px] text-slate-500 line-through font-mono block">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <button
              onClick={handleDirectWhatsApp}
              className="p-1.5 sm:p-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white transition-all cursor-pointer shadow-xs"
              title="Pedir por WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={() => setSelectedProductModal(product)}
              className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-[11px] sm:text-xs transition-all cursor-pointer shadow-sm shadow-cyan-500/20"
            >
              <span>Ver</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
