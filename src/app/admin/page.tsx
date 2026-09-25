"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  Sparkles, 
  Database, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  Copy,
  Check,
  Package,
  Layers,
  LogOut,
  RefreshCw,
  Eye,
  EyeOff
} from "lucide-react";
import { Banner, Category, Product } from "@/types";
import { DataService } from "@/lib/data-service";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { CLUB_NAME } from "@/lib/constants";
import { formatPrice, getCatalogShareUrl } from "@/lib/utils";
import { ProductFormModal } from "@/components/admin/ProductFormModal";
import { BannerFormModal } from "@/components/admin/BannerFormModal";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Data states
  const [products, setProducts] = useState<Product[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState<"products" | "banners" | "setup">("products");
  const [searchFilter, setSearchFilter] = useState("");

  // Modals
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [bannerToEdit, setBannerToEdit] = useState<Banner | null>(null);

  // Copied alert
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Check auth session
  useEffect(() => {
    // Si ya está guardada una sesión local de admin
    const localSession = sessionStorage.getItem("club_impenetrable_admin_auth");
    if (localSession === "true") {
      setIsAuthenticated(true);
    }

    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setIsAuthenticated(true);
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
          setIsAuthenticated(true);
        }
      });
      return () => subscription.unsubscribe();
    }
  }, []);

  const loadData = async () => {
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
      console.error("Error loading admin data", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.auth.signInWithPassword({
          email: authEmail,
          password: authPassword,
        });

        if (error) {
          throw new Error(error.message);
        }
        setIsAuthenticated(true);
      } else {
        // En modo demo / local sin backend configurado aún
        // Permite acceso directo con clave por defecto "admin" o cualquier clave
        if (authPassword === "admin" || authPassword.length >= 4) {
          setIsAuthenticated(true);
          sessionStorage.setItem("club_impenetrable_admin_auth", "true");
        } else {
          setAuthError("Para modo demo, ingresá una contraseña de al menos 4 caracteres (ej: admin123).");
        }
      }
    } catch (err: any) {
      setAuthError(err.message || "Error al iniciar sesión");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleDemoAccess = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem("club_impenetrable_admin_auth", "true");
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    sessionStorage.removeItem("club_impenetrable_admin_auth");
    setIsAuthenticated(false);
  };

  const handleDeleteProduct = async (id: string, title: string) => {
    if (confirm(`¿Estás seguro de eliminar el producto "${title}"?`)) {
      try {
        await DataService.deleteProduct(id);
        await loadData();
      } catch (err: any) {
        alert(err.message || "Error al eliminar");
      }
    }
  };

  const handleDeleteBanner = async (id: string, title: string) => {
    if (confirm(`¿Estás seguro de eliminar el banner "${title}"?`)) {
      try {
        await DataService.deleteBanner(id);
        await loadData();
      } catch (err: any) {
        alert(err.message || "Error al eliminar");
      }
    }
  };

  const handleToggleStock = async (product: Product) => {
    try {
      await DataService.saveProduct({
        ...product,
        in_stock: !product.in_stock,
      });
      await loadData();
    } catch (err: any) {
      alert(err.message || "Error actualizando stock");
    }
  };

  const handleToggleFeatured = async (product: Product) => {
    try {
      await DataService.saveProduct({
        ...product,
        is_featured: !product.is_featured,
      });
      await loadData();
    } catch (err: any) {
      alert(err.message || "Error actualizando destacado");
    }
  };

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // If NOT authenticated, render iOS glass login card
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#05080e] flex items-center justify-center p-4 relative overflow-hidden text-white">
        <div className="bg-ambient-orb-1 top-10 left-10" />
        <div className="bg-ambient-orb-2 bottom-10 right-10" />

        <div className="relative glass-dock w-full max-w-md rounded-3xl p-8 border border-white/20 shadow-2xl z-10">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-teal-500/30 border border-emerald-400/40 flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.3)] mb-3">
              <ShieldCheck className="w-7 h-7 text-emerald-400" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">{CLUB_NAME}</h1>
            <p className="text-xs text-white/50 mt-1">Panel de Control & Administración</p>
          </div>

          {/* Database status banner */}
          <div className={`p-3.5 rounded-2xl mb-6 flex items-center gap-2.5 text-xs ${
            isSupabaseConfigured 
              ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
              : "bg-amber-500/10 border border-amber-500/30 text-amber-200"
          }`}>
            <Database className="w-4 h-4 shrink-0" />
            <span>
              {isSupabaseConfigured
                ? "Conexión a Supabase detectada en variables de entorno."
                : "Modo Local / Demo activo. Puedes acceder sin clave o configurar Supabase."}
            </span>
          </div>

          {authError && (
            <div className="p-3 mb-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-200 text-xs">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                placeholder={isSupabaseConfigured ? "admin@clubimpenetrable.com" : "admin@demo.com"}
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                className="w-full glass-panel px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 border-white/10"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                className="w-full glass-panel px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 border-white/10"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="glass-button-primary w-full py-3 rounded-xl text-xs sm:text-sm font-bold shadow-xl flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{authLoading ? "Verificando..." : "Ingresar al Panel"}</span>
            </button>
          </form>

          {!isSupabaseConfigured && (
            <div className="mt-4 pt-4 border-t border-white/10 text-center">
              <button
                type="button"
                onClick={handleDemoAccess}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-4"
              >
                Ingresar directamente en Modo Demostración
              </button>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-xs text-white/40 hover:text-white/80 inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a la tienda</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const filteredProducts = products.filter((p) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-[#05080e] text-white flex flex-col relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="bg-ambient-orb-1 top-0 left-10" />
      <div className="bg-ambient-orb-2 top-80 right-10" />

      {/* Admin Top Navigation */}
      <header className="sticky top-0 z-40 border-b border-white/10 glass-dock px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 rounded-xl glass-button text-white/80 hover:text-white" title="Ver Tienda">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base sm:text-lg">{CLUB_NAME}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                ADMIN
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={loadData}
              className="p-2 rounded-xl glass-button text-white/70 hover:text-white"
              title="Refrescar Datos"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleLogout}
              className="glass-button px-3 py-1.5 rounded-xl text-xs font-semibold text-red-300 hover:text-red-200 border-red-500/30 flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-8 py-8 w-full z-10">
        {/* Status Callout */}
        <div className="glass-panel p-4 rounded-2xl mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-white/10">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              isSupabaseConfigured 
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
            }`}>
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white">
                {isSupabaseConfigured ? "Conexión a Base de Datos Supabase: ACTIVA" : "Modo Local / Demostración Activo"}
              </h3>
              <p className="text-[11px] text-white/50">
                {isSupabaseConfigured 
                  ? "Tus productos, fotos y banners se almacenan de manera segura en PostgreSQL con RLS."
                  : "Los cambios se guardan localmente. Para persistencia permanente gratis en Supabase, revisa la pestaña 'Configuración & SQL'."}
              </p>
            </div>
          </div>

          {!isSupabaseConfigured && (
            <button
              onClick={() => setActiveTab("setup")}
              className="glass-button px-3.5 py-1.5 rounded-xl text-xs font-semibold text-amber-300 border-amber-500/30 hover:border-amber-400 shrink-0"
            >
              Ver Instrucciones SQL
            </button>
          )}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-panel p-4 rounded-2xl">
            <span className="text-xs text-white/50 font-medium">Total Productos</span>
            <p className="text-2xl font-extrabold text-white mt-1 font-mono">{products.length}</p>
          </div>
          <div className="glass-panel p-4 rounded-2xl">
            <span className="text-xs text-white/50 font-medium">En Stock</span>
            <p className="text-2xl font-extrabold text-emerald-400 mt-1 font-mono">
              {products.filter((p) => p.in_stock).length}
            </p>
          </div>
          <div className="glass-panel p-4 rounded-2xl">
            <span className="text-xs text-white/50 font-medium">Banners Activos</span>
            <p className="text-2xl font-extrabold text-cyan-400 mt-1 font-mono">
              {banners.filter((b) => b.is_active).length}
            </p>
          </div>
          <div className="glass-panel p-4 rounded-2xl">
            <span className="text-xs text-white/50 font-medium">Categorías</span>
            <p className="text-2xl font-extrabold text-amber-300 mt-1 font-mono">{categories.length}</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 pb-6 border-b border-white/10 mb-6">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === "products"
                ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                : "glass-button text-white/70 hover:text-white"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Productos ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("banners")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === "banners"
                ? "bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                : "glass-button text-white/70 hover:text-white"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Banners ({banners.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("setup")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === "setup"
                ? "bg-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                : "glass-button text-white/70 hover:text-white"
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Configuración & Supabase</span>
          </button>
        </div>

        {/* TAB 1: PRODUCTS */}
        {activeTab === "products" && (
          <div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
              <input
                type="text"
                placeholder="Filtrar productos..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="glass-panel px-4 py-2 rounded-xl text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none w-full sm:w-72 border-white/10"
              />

              <button
                onClick={() => {
                  setProductToEdit(null);
                  setIsProductModalOpen(true);
                }}
                className="glass-button-primary px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar Producto</span>
              </button>
            </div>

            <div className="glass-panel rounded-3xl overflow-hidden border border-white/10">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5 text-white/60">
                      <th className="p-4">Producto</th>
                      <th className="p-4">Precio</th>
                      <th className="p-4">Categoría</th>
                      <th className="p-4 text-center">Stock</th>
                      <th className="p-4 text-center">Destacado</th>
                      <th className="p-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredProducts.map((p) => {
                      const shareUrl = getCatalogShareUrl(`/producto/${p.id}`);
                      return (
                        <tr key={p.id} className="hover:bg-white/[0.03] transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-12 rounded-xl overflow-hidden glass-panel shrink-0">
                                <Image
                                  src={p.images?.[0] || "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=400&q=80"}
                                  alt={p.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <span className="font-semibold text-white line-clamp-1">{p.title}</span>
                                {p.badge && (
                                  <span className="text-[10px] text-amber-300 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                                    {p.badge}
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="p-4 font-mono font-bold text-white whitespace-nowrap">
                            {formatPrice(p.price)}
                            {p.compare_at_price && (
                              <span className="text-[10px] text-white/40 block line-through">
                                {formatPrice(p.compare_at_price)}
                              </span>
                            )}
                          </td>
                          <td className="p-4">
                            <span className="capitalize px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs">
                              {p.category}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => handleToggleStock(p)}
                              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                                p.in_stock
                                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                  : "bg-red-500/20 text-red-300 border border-red-500/30"
                              }`}
                            >
                              {p.in_stock ? "En stock" : "Agotado"}
                            </button>
                          </td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => handleToggleFeatured(p)}
                              className={`p-1.5 rounded-lg transition-all ${
                                p.is_featured
                                  ? "text-amber-400 bg-amber-500/20 border border-amber-500/30"
                                  : "text-white/30 hover:text-white/60"
                              }`}
                              title={p.is_featured ? "Destacado en portada" : "No destacado"}
                            >
                              <Sparkles className="w-4 h-4" />
                            </button>
                          </td>
                          <td className="p-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleCopyLink(shareUrl, p.id)}
                                className="p-2 rounded-xl glass-button text-white/70 hover:text-white"
                                title="Copiar Enlace Directo"
                              >
                                {copiedId === p.id ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                              <a
                                href={`/producto/${p.id}`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 rounded-xl glass-button text-white/70 hover:text-white"
                                title="Ver en Catálogo"
                              >
                                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                              </a>
                              <button
                                onClick={() => {
                                  setProductToEdit(p);
                                  setIsProductModalOpen(true);
                                }}
                                className="p-2 rounded-xl glass-button text-white/70 hover:text-white"
                                title="Editar"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-amber-300" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id, p.title)}
                                className="p-2 rounded-xl glass-button text-red-400 hover:text-red-300 hover:border-red-500/30"
                                title="Eliminar"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BANNERS */}
        {activeTab === "banners" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs sm:text-sm text-white/60">
                Los banners aparecen en la parte superior del catálogo como carrusel destacado.
              </p>
              <button
                onClick={() => {
                  setBannerToEdit(null);
                  setIsBannerModalOpen(true);
                }}
                className="glass-button-primary px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Banner</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {banners.map((b) => (
                <div key={b.id} className="glass-panel rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between">
                  <div className="relative w-full h-44">
                    <Image src={b.image_url} alt={b.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      {b.badge && (
                        <span className="glass-pill px-2.5 py-1 rounded-full text-[10px] font-bold text-amber-300 border border-amber-400/30">
                          {b.badge}
                        </span>
                      )}
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        b.is_active ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"
                      }`}>
                        {b.is_active ? "Activo" : "Inactivo"}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-4 right-4">
                      <h4 className="text-base font-bold text-white line-clamp-1">{b.title}</h4>
                      <p className="text-xs text-white/70 line-clamp-1">{b.subtitle}</p>
                    </div>
                  </div>

                  <div className="p-4 flex items-center justify-between border-t border-white/10 bg-white/[0.02]">
                    <span className="text-xs text-white/40 font-mono">Prioridad: #{b.order}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setBannerToEdit(b);
                          setIsBannerModalOpen(true);
                        }}
                        className="p-2 rounded-xl glass-button text-amber-300"
                        title="Editar"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteBanner(b.id, b.title)}
                        className="p-2 rounded-xl glass-button text-red-400"
                        title="Eliminar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SETUP & SUPABASE */}
        {activeTab === "setup" && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl max-w-3xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-emerald-400" />
                <span>Configuración de Base de Datos (Supabase Gratuito)</span>
              </h3>
              <p className="text-xs sm:text-sm text-white/60 mt-1 leading-relaxed">
                Supabase te brinda base de datos PostgreSQL, almacenamiento de imágenes y autenticación totalmente gratis.
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-white/80">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <p className="font-semibold text-emerald-400">Paso 1: Crear proyecto en Supabase</p>
                <p className="text-white/60 text-xs">
                  Entrá en <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-cyan-400 underline">supabase.com</a> y creá una cuenta gratuita. Crea una organización y un proyecto nuevo (ej: "Club Impenetrable").
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <p className="font-semibold text-emerald-400">Paso 2: Ejecutar el script SQL</p>
                <p className="text-white/60 text-xs">
                  En el menú de tu proyecto de Supabase, entra a <strong className="text-white">SQL Editor</strong>, abre el archivo que creamos llamado <code className="text-amber-300">supabase-schema.sql</code> en la raíz de tu proyecto, copia todo su contenido, pégalo allí y haz clic en <strong className="text-white">Run</strong>. ¡Esto creará las tablas, la seguridad RLS y el bucket de fotos automáticamente!
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <p className="font-semibold text-emerald-400">Paso 3: Obtener claves y configurar en Vercel o local</p>
                <p className="text-white/60 text-xs">
                  En Supabase ve a <strong className="text-white">Project Settings &gt; API</strong> y copia tu <code className="text-cyan-300">Project URL</code> y tu clave <code className="text-cyan-300">anon / public</code>.
                  Agrégalas a tu archivo <code className="text-amber-300">.env.local</code> o en las variables de entorno de tu proyecto en <strong className="text-white">Vercel</strong>:
                </p>
                <pre className="p-3 rounded-xl bg-black/60 font-mono text-[11px] text-emerald-300 overflow-x-auto">
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co&#10;NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anon
                </pre>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-white/50">¿Quieres restablecer la demo local?</span>
              <button
                onClick={async () => {
                  if (confirm("¿Restablecer los datos demo a los valores originales?")) {
                    await DataService.resetDemoData();
                    await loadData();
                    alert("Datos restablecidos con éxito.");
                  }
                }}
                className="glass-button px-4 py-2 rounded-xl text-xs font-semibold text-amber-300 hover:text-amber-200 border-amber-500/30"
              >
                Restablecer Catálogo Demo
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Product Form Modal */}
      <ProductFormModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        productToEdit={productToEdit}
        categories={categories}
        onSaved={loadData}
      />

      {/* Banner Form Modal */}
      <BannerFormModal
        isOpen={isBannerModalOpen}
        onClose={() => setIsBannerModalOpen(false)}
        bannerToEdit={bannerToEdit}
        onSaved={loadData}
      />
    </div>
  );
}
