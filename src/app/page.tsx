"use client";

import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Leaf, 
  Flame, 
  Share2,
  Compass
} from "lucide-react";
import { Banner, Category, Product } from "@/types";
import { DataService } from "@/lib/data-service";
import { CLUB_NAME, CLUB_TAGLINE, DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants";
import { getCatalogShareUrl } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BannerSlider } from "@/components/catalog/BannerSlider";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { ProductModal } from "@/components/catalog/ProductModal";
import { ShareModal } from "@/components/catalog/ShareModal";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Selected product modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Share modal state
  const [shareData, setShareData] = useState<{
    isOpen: boolean;
    title: string;
    url: string;
    price?: number;
    description?: string;
  }>({
    isOpen: false,
    title: "",
    url: "",
  });

  useEffect(() => {
    async function loadCatalog() {
      try {
        const [prods, bans, cats] = await Promise.all([
          DataService.getProducts(),
          DataService.getBanners(),
          DataService.getCategories(),
        ]);
        setProducts(prods);
        setBanners(bans);
        setCategories(cats);
      } catch (err) {
        console.error("Error loading catalog:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCatalog();
  }, []);

  const handleOpenShare = (
    title: string,
    url: string,
    price?: number,
    description?: string
  ) => {
    setShareData({
      isOpen: true,
      title,
      url,
      price,
      description,
    });
  };

  const handleOpenCatalogShare = () => {
    handleOpenShare(
      `${CLUB_NAME} - Catálogo Oficial`,
      getCatalogShareUrl(),
      undefined,
      "Explorá nuestro catálogo digital de productos de monte técnico, artesanías y sabores autóctonos."
    );
  };

  return (
    <div className="min-h-screen bg-[#05080e] text-white flex flex-col relative overflow-hidden">
      {/* iOS 26/27 Ambient Animated Aurora Orbs */}
      <div className="bg-ambient-orb-1 -top-20 -left-20 animate-pulse duration-[10000ms]" />
      <div className="bg-ambient-orb-2 top-1/3 -right-32 animate-pulse duration-[8000ms]" />
      <div className="bg-ambient-orb-3 bottom-10 left-1/4 animate-pulse duration-[12000ms]" />

      {/* Floating Glass Navigation */}
      <Navbar onOpenShareModal={handleOpenCatalogShare} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-8 pt-24 sm:pt-28 w-full z-10">
        {/* Hero Header Presentation */}
        <div className="text-center max-w-3xl mx-auto pt-4 sm:pt-8 pb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold text-emerald-300 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>El Gran Chaco Salvaje • Catálogo Digital 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {CLUB_NAME}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/60 mt-3 max-w-xl mx-auto leading-relaxed">
            {CLUB_TAGLINE}. Diseñado con estética liquid glass, pedidos directos por WhatsApp y envíos a todo el territorio.
          </p>

          {/* Quick Features Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 sm:mt-8 max-w-2xl mx-auto">
            <div className="glass-panel p-3 rounded-2xl flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="text-left">
                <p className="text-[11px] font-bold text-white">Envíos Rápidos</p>
                <p className="text-[9px] text-white/50">A todo el país</p>
              </div>
            </div>

            <div className="glass-panel p-3 rounded-2xl flex items-center gap-2.5">
              <Leaf className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="text-left">
                <p className="text-[11px] font-bold text-white">100% Autóctono</p>
                <p className="text-[9px] text-white/50">Origen Chaco</p>
              </div>
            </div>

            <div className="glass-panel p-3 rounded-2xl flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="text-left">
                <p className="text-[11px] font-bold text-white">Garantía Club</p>
                <p className="text-[9px] text-white/50">Calidad certificada</p>
              </div>
            </div>

            <div className="glass-panel p-3 rounded-2xl flex items-center gap-2.5">
              <Flame className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="text-left">
                <p className="text-[11px] font-bold text-white">Exclusivo</p>
                <p className="text-[9px] text-white/50">Edición Limitada</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Banners Carousel */}
        {banners.length > 0 && <BannerSlider banners={banners} />}

        {/* Catalog Section */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
            <p className="text-xs text-white/50">Cargando catálogo...</p>
          </div>
        ) : (
          <ProductGrid
            products={products}
            categories={categories}
            onSelectProduct={(prod) => setSelectedProduct(prod)}
            onOpenShare={(title, url, price, description) =>
              handleOpenShare(title, url, price, description)
            }
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        onOpenShare={(title, url, price, description) =>
          handleOpenShare(title, url, price, description)
        }
      />

      {/* Share / QR Modal */}
      <ShareModal
        isOpen={shareData.isOpen}
        onClose={() => setShareData((prev) => ({ ...prev, isOpen: false }))}
        title={shareData.title}
        url={shareData.url}
        price={shareData.price}
        description={shareData.description}
      />
    </div>
  );
}
