/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HeroCarousel } from './components/HeroCarousel';
import { ProductGrid } from './components/ProductGrid';
import { GoogleReviewsSection } from './components/GoogleReviewsSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { UserProfileModal } from './components/UserProfileModal';
import { GoogleLoginModal } from './components/GoogleLoginModal';
import { GiveawayModal } from './components/GiveawayModal';
import { AdminPanel } from './components/AdminPanel';
import { CableCompatibilityModal } from './components/CableCompatibilityModal';

const MainLayout: React.FC = () => {
  const { settings, isCableModalOpen, setIsCableModalOpen } = useStore();

  const cleanPhone = (settings.whatsappNumber || '+584164761875').replace(/[^0-9]/g, '') || '584164761875';
  const whatsappHelpUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hola NexusMóvil, necesito asesoría con un producto o una recomendación.')}`;

  return (
    <div className="min-h-screen bg-[#090d16] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.12),rgba(9,13,22,1))] text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden">
        {/* Atmospheric Ambient Lighting Halos (Estilo Sercofica) */}
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] ambient-orb-cyan rounded-full pointer-events-none blur-3xl opacity-75" />
        <div className="absolute top-[35%] -right-20 w-[600px] h-[600px] ambient-orb-indigo rounded-full pointer-events-none blur-3xl opacity-60" />
        <div className="absolute bottom-20 -left-20 w-[500px] h-[500px] ambient-orb-rose rounded-full pointer-events-none blur-3xl opacity-35" />

        {/* Interactive Promo Carousel / Hero Gallery */}
        <HeroCarousel />

        {/* Catalog Section (Full Width, Intuitive & Clean) */}
        <section id="catalogo" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          <ProductGrid />
        </section>

        {/* Google Reviews Section */}
        <GoogleReviewsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <aside aria-label="Contacto WhatsApp" className="fixed bottom-5 right-5 z-30">
        <a
          href={whatsappHelpUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Contactar por WhatsApp"
          title="Escríbenos por WhatsApp"
          className="w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-2xl shadow-black/80 hover:scale-110 active:scale-95 transition-all cursor-pointer border border-emerald-300/40"
        >
          <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </a>
      </aside>

      {/* Interactive Modals */}
      <ProductDetailModal />
      <CartDrawer />
      <OrderTrackingModal />
      <UserProfileModal />
      <GoogleLoginModal />
      <GiveawayModal />
      <AdminPanel />
      <CableCompatibilityModal
        isOpen={isCableModalOpen}
        onClose={() => setIsCableModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
