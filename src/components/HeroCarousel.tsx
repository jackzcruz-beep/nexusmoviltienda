import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { LazyImage } from './LazyImage';
import { PROMO_SLIDES } from '../data/promos';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Gift, CheckCircle2, MessageCircle, Truck } from 'lucide-react';

export const HeroCarousel: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const {
    setSelectedCategory,
    setIsBundleModalOpen,
    setIsGiveawayModalOpen,
    setSelectedProductModal,
    products,
    promoSlides
  } = useStore();

  const totalSlides = promoSlides.length;

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex(prev => (prev + 1) % totalSlides);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  const nextSlide = () => {
    setCurrentSlideIndex(prev => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlideIndex(prev => (prev - 1 + totalSlides) % totalSlides);
  };

  const currentSlide = promoSlides[currentSlideIndex] || promoSlides[0];

  const handleCtaClick = () => {
    if (currentSlide.actionType === 'category') {
      setSelectedCategory(currentSlide.actionTarget as any);
      document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
    } else if (currentSlide.actionType === 'giveaway') {
      setIsGiveawayModalOpen(true);
    } else if (currentSlide.actionType === 'product') {
      const prod = products.find(p => p.id === currentSlide.actionTarget);
      if (prod) setSelectedProductModal(prod);
    } else {
      setSelectedCategory('todos');
      document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-5"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Featured Banner / Gallery */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-[#0e1524] to-[#090d15] shadow-2xl min-h-[320px] sm:min-h-[400px] flex items-center">
        {/* Inner atmospheric glowing orbs */}
        <div className="absolute -top-16 -right-16 w-72 h-72 ambient-orb-cyan rounded-full pointer-events-none blur-2xl opacity-60" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 ambient-orb-indigo rounded-full pointer-events-none blur-2xl opacity-50" />

        {/* Background Image with calculated scrim & progressive loading */}
        <div className="absolute inset-0 z-0">
          <LazyImage
            key={currentSlide.id}
            src={currentSlide.image}
            alt={currentSlide.title}
            referrerPolicy="no-referrer"
            priority={currentSlideIndex === 0}
            className="w-full h-full object-cover object-center opacity-30 sm:opacity-40 transition-all duration-700 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f17] via-[#0b0f17]/90 to-transparent sm:w-3/4 pointer-events-none" />
          <div className="absolute inset-0 bg-radial from-transparent to-[#0b0f17]/60 pointer-events-none" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl px-5 sm:px-12 py-8 sm:py-12 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-[11px] font-semibold tracking-wider uppercase font-mono px-2.5 py-0.5 rounded-full border"
              style={{
                borderColor: `${currentSlide.accent}40`,
                backgroundColor: `${currentSlide.accent}15`,
                color: currentSlide.accent
              }}
            >
              {currentSlide.badge}
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug mb-2 sm:mb-3 text-balance">
            {currentSlide.title}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed max-w-lg">
            {currentSlide.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleCtaClick}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-900 bg-cyan-400 hover:bg-cyan-300 transition-all shadow-md shadow-cyan-500/20 cursor-pointer whitespace-nowrap"
            >
              <span>{currentSlide.ctaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute right-3 bottom-3 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 flex sm:flex-col gap-2 z-20">
          <button
            onClick={prevSlide}
            aria-label="Anterior"
            className="p-2 rounded-full bg-slate-900/80 hover:bg-cyan-500 text-slate-300 hover:text-slate-950 border border-slate-700 transition-all cursor-pointer backdrop-blur-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Siguiente"
            className="p-2 rounded-full bg-slate-900/80 hover:bg-cyan-500 text-slate-300 hover:text-slate-950 border border-slate-700 transition-all cursor-pointer backdrop-blur-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute left-5 sm:left-12 bottom-3 flex items-center gap-1.5 z-20">
          {promoSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              aria-label={`Ir al slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === currentSlideIndex ? 'w-6 bg-cyan-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
