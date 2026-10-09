import React, { useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { Upload } from 'lucide-react';

interface NexusLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const NexusLogo: React.FC<NexusLogoProps> = ({
  className = '',
  size = 40,
  showText = true
}) => {
  const { settings, updateSettings, isAdmin } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          updateSettings({ customLogoUrl: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // If a custom logo was uploaded, use it. Otherwise fallback to the official asset.
  const logoSrc = settings.customLogoUrl || '/logo-sin-fondo.svg';

  return (
    <div className={`flex items-center gap-3 select-none group relative ${className}`}>
      {/* Hidden file input for one-click logo update by admin */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/svg+xml,image/webp,image/jpeg"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Logotipo Oficial NexusMóvil Original (Fondo Transparente sin distorsión) */}
      <div className="relative shrink-0 flex items-center justify-center">
        <img
          src={logoSrc}
          alt="NexusMóvil Logo Oficial"
          width={size}
          height={size}
          style={{ width: `${size}px`, height: `${size}px` }}
          className="object-contain shrink-0 transition-transform duration-200 group-hover:scale-105 filter drop-shadow-[0_4px_14px_rgba(0,245,255,0.25)]"
        />

        {/* Quick upload icon when admin hovers */}
        {isAdmin && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              fileInputRef.current?.click();
            }}
            title="Subir archivo original del logo (PNG / SVG)"
            aria-label="Subir logo original"
            className="absolute -bottom-1 -right-1 p-1 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
          >
            <Upload className="w-2.5 h-2.5" />
          </button>
        )}
      </div>

      {/* Tipografía de la Marca */}
      {showText && (
        <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center leading-none">
          nexus<span className="text-cyan-400">móvil</span>
        </span>
      )}
    </div>
  );
};
