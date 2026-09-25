"use client";

import React from "react";
import Image from "next/image";
import { MessageCircle, Share2, Sparkles, Check, ArrowUpRight } from "lucide-react";
import { Product } from "@/types";
import { formatPrice, createWhatsAppMessage, getWhatsAppShareUrl, getCatalogShareUrl } from "@/lib/utils";
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onShare: (title: string, url: string, price: number, description?: string) => void;
}

export function ProductCard({ product, onSelect, onShare }: ProductCardProps) {
  const mainImage = product.images && product.images.length > 0
    ? product.images[0]
    : "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80";

  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.compare_at_price! - product.price) / product.compare_at_price!) * 100)
    : 0;

  const productUrl = getCatalogShareUrl(`/producto/${product.id}`);

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const phone = product.whatsapp_number || DEFAULT_WHATSAPP_NUMBER;
    const msg = createWhatsAppMessage(product.title, product.price, productUrl);
    window.open(getWhatsAppShareUrl(phone, msg), "_blank");
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare(product.title, productUrl, product.price, product.description);
  };

  return (
    <div
      onClick={() => onSelect(product)}
      className="group relative flex flex-col rounded-3xl glass-card overflow-hidden cursor-pointer select-none"
    >
      {/* Image Wrap */}
      <div className="relative w-full aspect-square overflow-hidden bg-neutral-900/50">
        <Image
          src={mainImage}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
        />

        {/* Apple glass gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-1 z-10 pointer-events-none">
          <div className="flex flex-wrap items-center gap-1.5">
            {product.badge && (
              <span className="glass-pill px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold text-amber-300 border border-amber-400/30 flex items-center gap-1 shadow-lg">
                <Sparkles className="w-3 h-3 text-amber-400" />
                {product.badge}
              </span>
            )}
            {hasDiscount && (
              <span className="px-2 py-0.5 rounded-full bg-red-500/90 text-white font-bold text-[10px] sm:text-xs shadow-md backdrop-blur-md">
                -{discountPercent}%
              </span>
            )}
          </div>

          {/* In stock badge */}
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 backdrop-blur-md ${
              product.in_stock
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                : "bg-red-500/20 text-red-300 border border-red-400/30"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                product.in_stock ? "bg-emerald-400 animate-pulse" : "bg-red-400"
              }`}
            />
            {product.in_stock ? "En stock" : "Agotado"}
          </span>
        </div>

        {/* Quick hover action button overlay */}
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <button
            onClick={handleShareClick}
            className="p-2.5 rounded-full glass-dock text-white/80 hover:text-white shadow-lg active:scale-90 transition-transform"
            title="Compartir"
          >
            <Share2 className="w-4 h-4 text-cyan-400" />
          </button>
          <button
            onClick={handleWhatsAppClick}
            className="p-2.5 rounded-full bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] active:scale-90 transition-transform hover:bg-emerald-400"
            title="Pedir por WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Info */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400/80 mb-1 block">
            {product.category}
          </span>
          <h3 className="font-bold text-white text-base sm:text-lg line-clamp-1 group-hover:text-emerald-300 transition-colors">
            {product.title}
          </h3>
          <p className="text-xs text-white/60 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-white/40 uppercase font-medium">Precio</span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-extrabold text-white">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-xs line-through text-white/40 font-mono">
                  {formatPrice(product.compare_at_price!)}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
            <span>Ver</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
