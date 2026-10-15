import React from 'react';

/**
 * Komponen tombol bernuansa peta kertas hangat, tanah liat, dan tambak.
 * Memenuhi panduan desain: garis tipis, sudut kecil (rounded-md), target sentuh >= 44px.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  className = '',
  onClick,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-md cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3 py-2 min-h-[36px] gap-1.5',
    md: 'text-sm px-4 py-2.5 min-h-[44px] gap-2',
    lg: 'text-base px-6 py-3 min-h-[48px] gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-clay text-paper hover:bg-[#9E4520] active:bg-[#883B1A] border border-clay shadow-xs',
    secondary:
      'bg-tambak text-paper hover:bg-[#255854] active:bg-[#1E4744] border border-tambak shadow-xs',
    outline:
      'bg-transparent text-ink border border-line hover:border-ink/40 hover:bg-black/5 active:bg-black/10',
    ghost:
      'bg-transparent text-ink hover:bg-black/5 active:bg-black/10 border border-transparent',
    clayOutline:
      'bg-transparent text-clay border border-clay/60 hover:bg-clay/10 active:bg-clay/20',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
