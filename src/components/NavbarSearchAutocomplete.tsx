import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, CategoryId } from '../types';
import {
  Search,
  X,
  Headphones,
  Gamepad2,
  Cable,
  Usb,
  Cpu,
  LayoutGrid,
  ArrowRight,
  Sparkles,
  Tag,
  Star
} from 'lucide-react';

interface CategoryMatch {
  id: CategoryId;
  label: string;
  shortLabel: string;
  count: number;
}

const CATEGORY_LIST: { id: CategoryId; label: string; shortLabel: string; keywords: string[] }[] = [
  {
    id: 'iem-audio',
    label: 'In-Ear Monitors (KZ / Moondrop)',
    shortLabel: 'In-Ear & Audio',
    keywords: ['iem', 'in-ear', 'in ear', 'audio', 'audifonos', 'auriculares', 'kz', 'moondrop', 'tangzu', 'chu', 'castor']
  },
  {
    id: 'perifericos',
    label: 'Periféricos Gamer',
    shortLabel: 'Gaming',
    keywords: ['perifericos', 'gamer', 'gaming', 'mouse', 'mice', 'teclado', 'teclados', 'mecanico', 'attack shark', 'inalambrico']
  },
  {
    id: 'accesorios-audio',
    label: 'Cables DAC & Accesorios',
    shortLabel: 'DACs & Audio',
    keywords: ['cable', 'cables', 'dac', 'dacs', 'almohadillas', 'tips', 'foam', 'estuche', 'fundas', 'adaptador 3.5', 'tipo c']
  },
  {
    id: 'adaptadores-hubs',
    label: 'Hubs USB-C & Video',
    shortLabel: 'Hubs & Video',
    keywords: ['hub', 'hubs', 'usb-c', 'usbc', 'hdmi', 'adaptador', 'video', 'ugreen', 'dock', 'multipuerro']
  },
  {
    id: 'componentes-pc',
    label: 'Componentes & Almacenamiento',
    shortLabel: 'Componentes PC',
    keywords: ['ssd', 'nvme', 'm.2', 'pasta termica', 'fan', 'ventilador', 'almacenamiento', 'pc', 'computacion']
  }
];

const POPULAR_SEARCHES = [
  'KZ Castor',
  'Moondrop Chu II',
  'Attack Shark X3',
  'Cable DAC Type-C',
  'Hub USB-C 4K',
  'In-Ear Monitors'
];

interface NavbarSearchAutocompleteProps {
  onItemSelect?: () => void;
  className?: string;
  autoFocus?: boolean;
}

export const NavbarSearchAutocomplete: React.FC<NavbarSearchAutocompleteProps> = ({
  onItemSelect,
  className = '',
  autoFocus = false
}) => {
  const {
    products,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    setSelectedProductModal
  } = useStore();

  const [inputValue, setInputValue] = useState(searchQuery);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync internal input value with store's searchQuery if changed externally
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  // Click outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const normalizedQuery = inputValue.trim().toLowerCase();

  // Compute matched categories in real-time
  const matchedCategories = useMemo<CategoryMatch[]>(() => {
    if (!normalizedQuery) return [];

    return CATEGORY_LIST.filter(cat => {
      const matchLabel = cat.label.toLowerCase().includes(normalizedQuery);
      const matchShort = cat.shortLabel.toLowerCase().includes(normalizedQuery);
      const matchKeyword = cat.keywords.some(k => k.includes(normalizedQuery) || normalizedQuery.includes(k));
      return matchLabel || matchShort || matchKeyword;
    }).map(cat => {
      const count = products.filter(p => p.category === cat.id).length;
      return {
        id: cat.id,
        label: cat.label,
        shortLabel: cat.shortLabel,
        count
      };
    });
  }, [normalizedQuery, products]);

  // Compute matched products in real-time
  const matchedProducts = useMemo<Product[]>(() => {
    if (!normalizedQuery) return [];

    return products.filter(product => {
      const matchName = product.name.toLowerCase().includes(normalizedQuery);
      const matchBrand = product.brand.toLowerCase().includes(normalizedQuery);
      const matchSubcategory = product.subcategory.toLowerCase().includes(normalizedQuery);
      const matchDesc = product.description.toLowerCase().includes(normalizedQuery);
      const matchFeatures = product.features.some(f => f.toLowerCase().includes(normalizedQuery));
      const matchSoundSig = product.soundSignature && (
        product.soundSignature.toLowerCase().includes(normalizedQuery) ||
        (product.soundSignature === 'bass-head' && (normalizedQuery.includes('bass') || normalizedQuery.includes('bajo'))) ||
        (product.soundSignature === 'gaming' && (normalizedQuery.includes('game') || normalizedQuery.includes('juego') || normalizedQuery.includes('fps'))) ||
        (product.soundSignature === 'balanced' && (normalizedQuery.includes('balance') || normalizedQuery.includes('neutral') || normalizedQuery.includes('hifi'))) ||
        (product.soundSignature === 'monitoring' && (normalizedQuery.includes('monitoreo') || normalizedQuery.includes('estudio') || normalizedQuery.includes('voz') || normalizedQuery.includes('voces')))
      );
      return matchName || matchBrand || matchSubcategory || matchDesc || matchFeatures || matchSoundSig;
    }).slice(0, 5); // Show top 5 best matches
  }, [normalizedQuery, products]);

  // Total selectable items count for keyboard navigation
  // Categories first, then Products, and 1 footer action if query exists
  const totalItems = matchedCategories.length + matchedProducts.length + (normalizedQuery ? 1 : 0);

  // Handle Input Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    setSearchQuery(val);
    setIsOpen(true);
    setSelectedIndex(-1);
  };

  // Clear Input
  const handleClear = () => {
    setInputValue('');
    setSearchQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  // Handle selecting a category match
  const handleSelectCategory = (catId: CategoryId) => {
    setSelectedCategory(catId);
    setSearchQuery('');
    setInputValue('');
    setIsOpen(false);
    onItemSelect?.();
    scrollToCatalog();
  };

  // Handle selecting a product match
  const handleSelectProduct = (product: Product) => {
    setSelectedProductModal(product);
    setIsOpen(false);
    onItemSelect?.();
  };

  // Handle viewing all results for current query
  const handleViewAllResults = () => {
    setSearchQuery(inputValue);
    setIsOpen(false);
    onItemSelect?.();
    scrollToCatalog();
  };

  // Smooth scroll to catalog
  const scrollToCatalog = () => {
    const catalogElem = document.getElementById('catalogo');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1 < totalItems ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 >= 0 ? prev - 1 : totalItems - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0) {
        // Execute highlighted item
        if (selectedIndex < matchedCategories.length) {
          handleSelectCategory(matchedCategories[selectedIndex].id);
        } else if (selectedIndex < matchedCategories.length + matchedProducts.length) {
          const prodIndex = selectedIndex - matchedCategories.length;
          handleSelectProduct(matchedProducts[prodIndex]);
        } else {
          handleViewAllResults();
        }
      } else {
        handleViewAllResults();
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const getCategoryIcon = (id: CategoryId) => {
    switch (id) {
      case 'iem-audio':
        return <Headphones className="w-3.5 h-3.5 text-cyan-400" />;
      case 'perifericos':
        return <Gamepad2 className="w-3.5 h-3.5 text-indigo-400" />;
      case 'accesorios-audio':
        return <Cable className="w-3.5 h-3.5 text-amber-400" />;
      case 'adaptadores-hubs':
        return <Usb className="w-3.5 h-3.5 text-emerald-400" />;
      case 'componentes-pc':
        return <Cpu className="w-3.5 h-3.5 text-rose-400" />;
      default:
        return <LayoutGrid className="w-3.5 h-3.5 text-cyan-400" />;
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Search Input Box */}
      <div className="relative flex items-center bg-slate-900/90 border border-slate-700/80 hover:border-cyan-500/60 focus-within:border-cyan-400 focus-within:ring-1 focus-within:ring-cyan-400/30 rounded-xl transition-all shadow-inner">
        <Search className="w-4 h-4 text-cyan-400 ml-3 mr-2 shrink-0 pointer-events-none" />
        
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          autoFocus={autoFocus}
          placeholder="Buscar producto, marca o categoría..."
          className="bg-transparent text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none w-full py-2 pr-8"
        />

        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2.5 p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
            title="Limpiar búsqueda"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown Popup */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-[#0d131f] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-black/80 backdrop-blur-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[80vh] flex flex-col">
          <div className="overflow-y-auto p-2 space-y-3">
            {/* Case A: User has entered text */}
            {normalizedQuery ? (
              <>
                {/* 1. Category Suggestions */}
                {matchedCategories.length > 0 && (
                  <div>
                    <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-400/90 flex items-center gap-1.5">
                      <Tag className="w-3 h-3" />
                      <span>Categorías Coincidentes</span>
                    </div>

                    <div className="space-y-0.5 mt-1">
                      {matchedCategories.map((cat, idx) => {
                        const isHighlighted = selectedIndex === idx;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => handleSelectCategory(cat.id)}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                              isHighlighted
                                ? 'bg-cyan-500/20 text-white font-medium border border-cyan-500/30'
                                : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="w-6 h-6 rounded-lg bg-slate-800/90 flex items-center justify-center shrink-0 border border-slate-700">
                                {getCategoryIcon(cat.id)}
                              </div>
                              <span className="truncate">{cat.label}</span>
                            </div>

                            <span className="text-[10px] font-mono text-cyan-400 bg-slate-800 px-2 py-0.5 rounded-full shrink-0 border border-slate-700/60 ml-2">
                              {cat.count} {cat.count === 1 ? 'producto' : 'productos'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 2. Product Suggestions */}
                {matchedProducts.length > 0 && (
                  <div>
                    <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-400/90 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      <span>Productos Encontrados</span>
                    </div>

                    <div className="space-y-1 mt-1">
                      {matchedProducts.map((product, idx) => {
                        const itemIndex = matchedCategories.length + idx;
                        const isHighlighted = selectedIndex === itemIndex;

                        return (
                          <div
                            key={product.id}
                            onClick={() => handleSelectProduct(product)}
                            className={`p-2 rounded-xl flex items-center gap-3 transition-all cursor-pointer border ${
                              isHighlighted
                                ? 'bg-cyan-950/40 border-cyan-400/50 shadow-sm'
                                : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/80'
                            }`}
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              loading="lazy"
                              decoding="async"
                              className="w-11 h-11 rounded-lg object-cover bg-slate-950 border border-slate-800 shrink-0"
                            />

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                                  {product.brand}
                                </span>
                                <span className="text-[10px] text-slate-400 truncate">
                                  {product.subcategory}
                                </span>
                              </div>

                              <p className="text-xs font-bold text-white truncate mt-0.5">
                                {product.name}
                              </p>

                              <div className="flex items-center gap-2 text-[11px] mt-0.5">
                                <span className="font-mono font-bold text-cyan-300">
                                  ${product.price.toFixed(2)} USD
                                </span>
                                <span className="flex items-center text-[10px] text-amber-400 gap-0.5">
                                  <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                                  {product.rating}
                                </span>
                              </div>
                            </div>

                            <div className="shrink-0 text-slate-400 hover:text-cyan-300 p-1">
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. Empty State (no categories and no products found) */}
                {matchedCategories.length === 0 && matchedProducts.length === 0 && (
                  <div className="py-6 px-4 text-center space-y-2">
                    <p className="text-xs text-slate-300 font-medium">
                      No encontramos resultados exactos para <span className="text-cyan-300 font-bold">"{inputValue}"</span>
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Prueba buscando por marca (ej. <em>KZ, Moondrop, Attack Shark</em>) o categorías como <em>In-Ear</em> o <em>Gamer</em>.
                    </p>
                  </div>
                )}
              </>
            ) : (
              /* Case B: Empty input - show popular searches & category shortcuts */
              <div className="space-y-3 py-1 px-1">
                <div>
                  <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span>Búsquedas Populares</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {POPULAR_SEARCHES.map(term => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => {
                          setInputValue(term);
                          setSearchQuery(term);
                          setIsOpen(true);
                        }}
                        className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-900 hover:bg-cyan-500/15 hover:border-cyan-500/40 hover:text-cyan-300 border border-slate-800 text-slate-300 transition-colors cursor-pointer"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <LayoutGrid className="w-3 h-3 text-cyan-400" />
                    <span>Explorar por Categoría</span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 mt-1">
                    {CATEGORY_LIST.map(cat => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleSelectCategory(cat.id)}
                        className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 flex items-center gap-2 text-left text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
                      >
                        <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                          {getCategoryIcon(cat.id)}
                        </div>
                        <span className="truncate text-[11px] font-medium">{cat.shortLabel}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar: View All Results */}
          {normalizedQuery && (
            <div className="p-2 bg-[#090d16] border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 px-1">
                Presiona <kbd className="font-mono text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">Enter</kbd> para filtrar
              </span>

              <button
                type="button"
                onClick={handleViewAllResults}
                className="px-3 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Ver catálogo filtrado</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
