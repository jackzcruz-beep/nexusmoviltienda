import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { NexusLogo } from './NexusLogo';
import { NavbarSearchAutocomplete } from './NavbarSearchAutocomplete';
import {
  ShoppingBag,
  Search,
  User,
  PackageCheck,
  ShieldCheck,
  Menu,
  X,
  Lock
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    cartCount,
    setIsCartOpen,
    setIsTrackingOpen,
    setIsProfileOpen,
    setIsGoogleLoginOpen,
    currentUser,
    isAdmin,
    setIsAdminOpen,
    setSelectedCategory
  } = useStore();

  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#090d16]/95 backdrop-blur-md border-b border-slate-800/80">
      {/* Top micro banner */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-[#0a0f18] to-cyan-950/80 border-b border-cyan-900/30 px-4 py-1 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-medium text-emerald-400">Atención WhatsApp Directa</span>
            <span className="hidden sm:inline text-slate-400">· Envíos Nacionales · 9:00 AM a 7:00 PM (Lunes a Domingo)</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <button
              onClick={() => setIsTrackingOpen(true)}
              className="hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <PackageCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Rastrear Pedido</span>
            </button>
            {isAdmin ? (
              <>
                <span className="text-slate-600 hidden md:inline">|</span>
                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="text-amber-400 hover:text-amber-300 transition-colors hidden md:flex items-center gap-1 cursor-pointer font-bold"
                  title="Panel de Administrador"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Panel</span>
                </button>
              </>
            ) : (
              <>
                <span className="text-slate-600 hidden md:inline">|</span>
                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="text-slate-500 hover:text-amber-300 transition-colors hidden md:flex items-center gap-1 cursor-pointer"
                  title="Acceso de Administrador"
                >
                  <Lock className="w-3 h-3" />
                  <span>Admin</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Official Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              setSelectedCategory('todos');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group focus:outline-none cursor-pointer"
          >
            <NexusLogo size={40} showText={true} />
          </button>
        </div>

        {/* Center Zone: Real-Time Autocomplete Search Bar */}
        <div className="hidden md:block flex-1 max-w-sm lg:max-w-md xl:max-w-lg mx-2 lg:mx-4">
          <NavbarSearchAutocomplete />
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-300 shrink-0">
          <a
            href="#catalogo"
            onClick={(e) => {
              e.preventDefault();
              setSelectedCategory('todos');
              document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-cyan-400 transition-colors"
          >
            Catálogo
          </a>
          <button
            onClick={() => setIsTrackingOpen(true)}
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            Rastrear Guía
          </button>
          <a
            href="#reseñas"
            className="hover:text-cyan-400 transition-colors"
          >
            Opiniones ⭐
          </a>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Mobile search toggle button */}
          <button
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className={`p-2 rounded-lg transition-colors md:hidden cursor-pointer ${
              isMobileSearchOpen
                ? 'text-cyan-400 bg-slate-800'
                : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60'
            }`}
            title="Buscar productos o categorías"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* User Profile / Google Sign-in */}
          {currentUser ? (
            <button
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-colors cursor-pointer"
              title="Mi Perfil"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full object-cover border border-cyan-400/40"
              />
              <span className="hidden xl:inline text-xs font-medium text-slate-200 truncate max-w-[90px]">
                {currentUser.name.split(' ')[0]}
              </span>
            </button>
          ) : (
            <button
              onClick={() => setIsGoogleLoginOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors cursor-pointer"
              title="Iniciar sesión con Google"
            >
              <User className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Ingresar</span>
            </button>
          )}

          {/* Shopping Bag Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors shadow-sm shadow-cyan-950/40 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="font-mono tabular-nums font-bold">{cartCount}</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-xl xl:hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Expandable Bar */}
      {isMobileSearchOpen && (
        <div className="md:hidden px-4 py-2.5 bg-[#0d131f] border-b border-cyan-500/30 animate-in fade-in slide-in-from-top-2">
          <NavbarSearchAutocomplete
            autoFocus
            onItemSelect={() => setIsMobileSearchOpen(false)}
          />
        </div>
      )}

      {/* Mobile drawer menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0c121e] border-b border-slate-800 px-4 py-4 space-y-3 animate-in fade-in">
          <div className="md:hidden pb-1">
            <NavbarSearchAutocomplete onItemSelect={() => setMobileMenuOpen(false)} />
          </div>

          <a
            href="#catalogo"
            onClick={() => {
              setSelectedCategory('todos');
              setMobileMenuOpen(false);
            }}
            className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            Catálogo Completo
          </a>
          <button
            onClick={() => {
              setIsTrackingOpen(true);
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-800 cursor-pointer"
          >
            Rastrear Pedido
          </button>
          <a
            href="#reseñas"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            Opiniones de Clientes
          </a>
          <button
            onClick={() => {
              setIsAdminOpen(true);
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-amber-300 bg-amber-950/40 border border-amber-800/40 flex items-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Panel de Administrador</span>
          </button>
        </div>
      )}
    </header>
  );
};
