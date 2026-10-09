import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { PurchaseAdvisorBanner } from './PurchaseAdvisorBanner';
import { CategoryId } from '../types';
import {
  PackageOpen,
  ChevronDown,
  X,
  Layers,
  Headphones,
  Gamepad2,
  Cpu,
  Cable,
  Usb
} from 'lucide-react';

interface SubcategoryGroup {
  title: string;
  items: { label: string; filterType: 'brand' | 'subcategory'; value: string }[];
}

interface CategoryNavConfig {
  id: CategoryId;
  label: string;
  icon: React.ReactNode;
  groups?: SubcategoryGroup[];
}

const CATEGORIES_CONFIG: CategoryNavConfig[] = [
  {
    id: 'todos',
    label: 'Todos',
    icon: <Layers className="w-3.5 h-3.5" />
  },
  {
    id: 'iem-audio',
    label: 'In-Ear Monitors',
    icon: <Headphones className="w-3.5 h-3.5" />,
    groups: [
      {
        title: 'Por Marca',
        items: [
          { label: 'KZ Acoustics', filterType: 'brand', value: 'KZ' },
          { label: 'Moondrop', filterType: 'brand', value: 'Moondrop' },
          { label: 'QKZ Audio', filterType: 'brand', value: 'QKZ' }
        ]
      },
      {
        title: 'Por Modelo & Formato',
        items: [
          { label: 'In-Ear Monitors (IEMs)', filterType: 'subcategory', value: 'In-Ear Monitors' },
          { label: 'Diademas Inalámbricas ANC', filterType: 'subcategory', value: 'Diademas Inalámbricas' }
        ]
      },
      {
        title: 'Accesorios para IEMs',
        items: [
          { label: 'Cables & Adaptadores DAC', filterType: 'subcategory', value: 'Cables & DACs' },
          { label: 'Almohadillas Memory Foam', filterType: 'subcategory', value: 'Almohadillas' },
          { label: 'Estuches Antigolpes', filterType: 'subcategory', value: 'Fundas & Protección' }
        ]
      }
    ]
  },
  {
    id: 'perifericos',
    label: 'Gaming & Setup',
    icon: <Gamepad2 className="w-3.5 h-3.5" />,
    groups: [
      {
        title: 'Periféricos Competitivos',
        items: [
          { label: 'Mice Gamer Ultralivianos (49g)', filterType: 'subcategory', value: 'Mice Gamer' },
          { label: 'Teclados Mecánicos 75%', filterType: 'subcategory', value: 'Teclados Mecánicos' }
        ]
      }
    ]
  },
  {
    id: 'accesorios-audio',
    label: 'Cables & DACs',
    icon: <Cable className="w-3.5 h-3.5" />,
    groups: [
      {
        title: 'Sonido Digital & Upgrades',
        items: [
          { label: 'Adaptadores DAC Tipo-C / Hi-Res', filterType: 'subcategory', value: 'Cables & DACs' },
          { label: 'Almohadillas Suaves Memory Foam', filterType: 'subcategory', value: 'Almohadillas' },
          { label: 'Estuches Rígidos de Protección', filterType: 'subcategory', value: 'Fundas & Protección' }
        ]
      }
    ]
  },
  {
    id: 'adaptadores-hubs',
    label: 'Hubs & Video',
    icon: <Usb className="w-3.5 h-3.5" />,
    groups: [
      {
        title: 'Conectividad & Pantallas',
        items: [
          { label: 'Hubs USB-C Multipuerto (8 en 1)', filterType: 'subcategory', value: 'Hubs USB-C' },
          { label: 'Adaptadores HDMI 4K / 8K', filterType: 'subcategory', value: 'Adaptadores de Video' }
        ]
      }
    ]
  },
  {
    id: 'componentes-pc',
    label: 'Componentes PC',
    icon: <Cpu className="w-3.5 h-3.5" />,
    groups: [
      {
        title: 'Hardware & Mantenimiento',
        items: [
          { label: 'Procesadores AMD Ryzen', filterType: 'subcategory', value: 'Procesadores' },
          { label: 'Pasta Térmica Arctic MX-4', filterType: 'subcategory', value: 'Enfriamiento & Pastas' },
          { label: 'Memorias RAM Kingston Fury', filterType: 'subcategory', value: 'Memorias RAM' }
        ]
      }
    ]
  }
];

export const ProductGrid: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,
    selectedSubcategory,
    setSelectedSubcategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy
  } = useStore();

  const [hoveredCategory, setHoveredCategory] = useState<CategoryId | null>(null);
  const [mobileMenuCat, setMobileMenuCat] = useState<CategoryId | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMobileMenuCat(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hasActiveFilters =
    selectedCategory !== 'todos' ||
    selectedBrand !== 'todos' ||
    selectedSubcategory !== 'todos' ||
    searchQuery.trim() !== '';

  const handleResetFilters = () => {
    setSelectedCategory('todos');
    setSelectedBrand('todos');
    setSelectedSubcategory('todos');
    setSearchQuery('');
    setSortBy('featured');
    setHoveredCategory(null);
    setMobileMenuCat(null);
  };

  const handleSelectSubItem = (
    catId: CategoryId,
    item: { filterType: 'brand' | 'subcategory'; value: string }
  ) => {
    setSelectedCategory(catId);
    if (item.filterType === 'brand') {
      setSelectedBrand(item.value);
      setSelectedSubcategory('todos');
    } else {
      setSelectedSubcategory(item.value);
      setSelectedBrand('todos');
    }
    setHoveredCategory(null);
    setMobileMenuCat(null);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory !== 'todos' && product.category !== selectedCategory) {
        return false;
      }

      // Brand filter
      if (selectedBrand !== 'todos' && product.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
        return false;
      }

      // Subcategory filter
      if (selectedSubcategory !== 'todos' && product.subcategory !== selectedSubcategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchName = product.name.toLowerCase().includes(query);
        const matchBrand = product.brand.toLowerCase().includes(query);
        const matchDesc = product.description.toLowerCase().includes(query);
        const matchSub = product.subcategory.toLowerCase().includes(query);
        if (!matchName && !matchBrand && !matchDesc && !matchSub) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, selectedBrand, selectedSubcategory, searchQuery, sortBy]);

  const activeCatConfig = CATEGORIES_CONFIG.find(c => c.id === selectedCategory);

  return (
    <div className="w-full space-y-4 sm:space-y-5">
      {/* 1. Barra de Categorías con Menú de Subcategorías Desplegable al Pasar el Puntero (Hover) */}
      <div className="relative z-30" ref={dropdownRef}>
        <div className="p-2 sm:p-2.5 rounded-2xl bg-[#0d131f]/95 border border-slate-800 shadow-xl backdrop-blur-md">
          {/* Categorías Principales sin scroll horizontal */}
          <div className="flex flex-wrap items-center justify-start sm:justify-center gap-1.5 sm:gap-2">
            {CATEGORIES_CONFIG.map(cat => {
              const isSelected = selectedCategory === cat.id;
              const hasDropdown = Boolean(cat.groups && cat.groups.length > 0);
              const isMenuOpen = hoveredCategory === cat.id || mobileMenuCat === cat.id;
              const count = cat.id === 'todos'
                ? products.length
                : products.filter(p => p.category === cat.id).length;

              return (
                <div
                  key={cat.id}
                  className="relative shrink-0"
                  onMouseEnter={() => {
                    if (hasDropdown) setHoveredCategory(cat.id);
                  }}
                  onMouseLeave={() => {
                    setHoveredCategory(null);
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (cat.id === 'todos') {
                        setSelectedCategory('todos');
                        setSelectedSubcategory('todos');
                        setSelectedBrand('todos');
                        setMobileMenuCat(null);
                      } else {
                        setSelectedCategory(cat.id);
                        setSelectedSubcategory('todos');
                        setSelectedBrand('todos');
                        // Toggle mobile dropdown
                        setMobileMenuCat(prev => prev === cat.id ? null : cat.id);
                      }
                    }}
                    className={`group flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                      isSelected
                        ? 'text-cyan-300 bg-cyan-950/80 border border-cyan-500/50 shadow-sm shadow-cyan-950/40'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80 border border-transparent'
                    }`}
                  >
                    <span className={isSelected ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-300 transition-colors'}>
                      {cat.icon}
                    </span>
                    <span>{cat.label}</span>
                    <span className={`font-mono text-[10px] px-1.5 py-0.2 rounded-md ${
                      isSelected ? 'text-cyan-300 bg-cyan-900/60 font-bold' : 'text-slate-500 bg-slate-800/60'
                    }`}>
                      {count}
                    </span>
                    {hasDropdown && (
                      <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isMenuOpen ? 'rotate-180 text-cyan-400' : ''}`} />
                    )}
                  </button>

                  {/* Hover / Click Dropdown Subcategories Panel */}
                  {hasDropdown && isMenuOpen && cat.groups && (
                    <div
                      className="absolute top-full left-0 mt-1.5 w-72 sm:w-80 p-3.5 rounded-2xl bg-[#0c121e] border border-cyan-500/40 shadow-2xl shadow-black/80 backdrop-blur-xl z-50 space-y-3 animate-in fade-in slide-in-from-top-1.5 duration-150"
                      onMouseEnter={() => setHoveredCategory(cat.id)}
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      {/* Dropdown Header */}
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 font-mono">
                          {cat.label}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCategory(cat.id);
                            setSelectedSubcategory('todos');
                            setSelectedBrand('todos');
                            setHoveredCategory(null);
                            setMobileMenuCat(null);
                          }}
                          className="text-[10px] text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
                        >
                          Ver todos ({count})
                        </button>
                      </div>

                      {/* Subcategory Groups */}
                      {cat.groups.map(group => (
                        <div key={group.title} className="space-y-1.5">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                            {group.title}
                          </p>
                          <div className="grid grid-cols-1 gap-1">
                            {group.items.map(item => {
                              const isSubActive =
                                selectedCategory === cat.id &&
                                ((item.filterType === 'brand' && selectedBrand.toLowerCase() === item.value.toLowerCase()) ||
                                 (item.filterType === 'subcategory' && selectedSubcategory === item.value));

                              return (
                                <button
                                  key={item.value}
                                  type="button"
                                  onClick={() => handleSelectSubItem(cat.id, item)}
                                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-left transition-all cursor-pointer ${
                                    isSubActive
                                      ? 'bg-cyan-500/20 text-cyan-200 font-bold border border-cyan-500/40'
                                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80 border border-transparent'
                                  }`}
                                >
                                  <span>{item.label}</span>
                                  {isSubActive && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Filter Indicator Strip (If specific subcategory or brand is active) */}
        {(selectedSubcategory !== 'todos' || selectedBrand !== 'todos' || searchQuery.trim() !== '') && (
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 text-[11px]">Filtrado por:</span>

            {selectedCategory !== 'todos' && activeCatConfig && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-200 text-[11px]">
                {activeCatConfig.label}
              </span>
            )}

            {selectedSubcategory !== 'todos' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-[11px] font-medium">
                <span>{selectedSubcategory}</span>
                <button
                  type="button"
                  onClick={() => setSelectedSubcategory('todos')}
                  className="hover:text-white cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedBrand !== 'todos' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 text-[11px] font-medium">
                <span>Marca: {selectedBrand}</span>
                <button
                  type="button"
                  onClick={() => setSelectedBrand('todos')}
                  className="hover:text-white cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {searchQuery.trim() !== '' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-[11px] font-medium">
                <span>Búsqueda: &quot;{searchQuery}&quot;</span>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="hover:text-white cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              type="button"
              onClick={handleResetFilters}
              className="text-[11px] text-cyan-400 hover:text-cyan-300 underline cursor-pointer ml-1"
            >
              Limpiar todo
            </button>
          </div>
        )}
      </div>

      {/* 3. Cuadrícula de Productos */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-[#0e1422] rounded-2xl border border-slate-800">
          <div className="w-14 h-14 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-500 mb-3">
            <PackageOpen className="w-7 h-7" />
          </div>
          <h3 className="text-base font-semibold text-white mb-1">
            No se encontraron productos en esta sección
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mb-4">
            Intenta cambiar de categoría o buscar marcas como KZ, Moondrop o Nexus.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 transition-all cursor-pointer"
          >
            Ver Catálogo Completo
          </button>
        </div>
      )}

      {/* Barra de Asesoría 1 a 1 por WhatsApp al final del catálogo */}
      <div className="pt-2">
        <PurchaseAdvisorBanner />
      </div>
    </div>
  );
};
