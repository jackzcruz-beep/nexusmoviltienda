import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Star, CheckCircle2, MessageSquare, ThumbsUp, MapPin, ExternalLink, Send } from 'lucide-react';

export const GoogleReviewsSection: React.FC = () => {
  const { reviews, addReview, currentUser, settings } = useStore();

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [authorName, setAuthorName] = useState(currentUser?.name || '');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [productPurchased, setProductPurchased] = useState('KZ Castor Bass Edition');

  const googleSearchUrl = 'https://www.google.com/search?q=nexusmovil+google';
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Nexusmovil San Cristobal Tachira Venezuela')}`;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addReview({
      author: authorName.trim() || currentUser?.name || 'Cliente Verificado de Google',
      avatar: currentUser?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(authorName || 'Cliente')}`,
      rating,
      comment: comment.trim(),
      productPurchased: productPurchased.trim() || 'Compra en NexusMóvil'
    });

    setComment('');
    setShowReviewForm(false);
  };

  return (
    <section id="reseñas" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 border-t border-slate-800/80">
      <div className="bg-[#0b101b] border border-cyan-500/20 rounded-3xl p-5 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Ambient atmospheric glow */}
        <div className="absolute -top-16 -right-16 w-64 h-64 ambient-orb-cyan rounded-full pointer-events-none blur-2xl opacity-40" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 ambient-orb-indigo rounded-full pointer-events-none blur-2xl opacity-30" />

        {/* Header with Google Brand styling */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 border-b border-slate-800/80">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider font-mono">
                Nexusmóvil Tienda · Google Reviews
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-[11px] text-slate-300 flex items-center gap-1 font-mono">
                <MapPin className="w-3 h-3 text-rose-400" />
                <span>San Cristóbal, Táchira · Envíos Nacionales</span>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Opiniones reales de Nexusmóvil Tienda
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Experiencias auténticas de clientes en San Cristóbal y toda Venezuela sobre calidad de sonido IEM, adaptadores DAC, periféricos y atención personalizada por WhatsApp al <strong className="text-emerald-400">+58 416-4761875</strong>.
            </p>
          </div>

          {/* Rating Summary Block & Action Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800 shrink-0">
            <div className="text-center pr-3 border-r border-slate-800">
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono leading-none">
                4.9
              </span>
              <div className="flex items-center gap-0.5 text-amber-400 mt-1 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                {reviews.length + 180}+ Opiniones Google
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() => setShowReviewForm(prev => !prev)}
                className="px-3.5 py-1.5 text-xs font-bold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all cursor-pointer shadow-md shadow-cyan-950/40 whitespace-nowrap flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{showReviewForm ? 'Cerrar formulario' : 'Escribir Reseña'}</span>
              </button>

              <a
                href={googleSearchUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 text-[11px] font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all cursor-pointer border border-slate-700 flex items-center gap-1.5 justify-center"
              >
                <span>Ver en Google</span>
                <ExternalLink className="w-3 h-3 text-cyan-400" />
              </a>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 text-[10px] font-medium text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1 justify-center"
              >
                <MapPin className="w-3 h-3 text-rose-400" />
                <span>Ubicación en Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Write Review Form */}
        {showReviewForm && (
          <form
            onSubmit={handleSubmitReview}
            className="my-5 p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/40 space-y-3.5 animate-in fade-in"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>Publicar tu reseña en NexusMóvil</span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Tu opinión ayuda a otros compradores a elegir su modelo ideal.
                </p>
              </div>

              {/* Star selector */}
              <div className="flex items-center gap-1">
                <span className="text-xs text-slate-400 mr-1">Calificación:</span>
                {[1, 2, 3, 4, 5].map(st => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setRating(st)}
                    className="p-1 text-slate-600 hover:text-amber-400 cursor-pointer"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        st <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-medium">Tu nombre o apodo:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Carlos Martínez"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-medium">Producto adquirido:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. KZ Castor Bass + Adaptador DAC"
                  value={productPurchased}
                  onChange={(e) => setProductPurchased(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-300 block mb-1 text-xs font-medium">Comentario detallado:</label>
              <textarea
                required
                rows={3}
                placeholder="Cuéntanos tu experiencia con el sonido, el tiempo de entrega y la atención por WhatsApp..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-3.5 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs cursor-pointer shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publicar Reseña</span>
              </button>
            </div>
          </form>
        )}

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-6">
          {reviews.map(rev => (
            <article
              key={rev.id}
              className="p-4 sm:p-5 rounded-2xl bg-[#080d16] border border-slate-800/80 hover:border-cyan-500/30 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                {/* Author Info */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={rev.avatar}
                      alt={rev.author}
                      className="w-9 h-9 rounded-full object-cover border border-slate-700 bg-slate-900"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center gap-1">
                        <span>{rev.author}</span>
                        {rev.verified && (
                          <span title="Comprador Verificado">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          </span>
                        )}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono">{rev.date}</span>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  &quot;{rev.comment}&quot;
                </p>
              </div>

              {/* Product Purchased Tag */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span className="font-mono text-cyan-400/90 truncate max-w-[200px]">
                  📦 {rev.productPurchased}
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <ThumbsUp className="w-3 h-3 text-slate-500" />
                  <span>{rev.likes}</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
