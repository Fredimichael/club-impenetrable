"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Menu, 
  X, 
  Share2, 
  ShieldCheck, 
  Sparkles, 
  MessageCircle, 
  Compass,
  ArrowRight
} from "lucide-react";
import { CLUB_NAME, DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants";
import { getWhatsAppShareUrl } from "@/lib/utils";

interface NavbarProps {
  onOpenShareModal?: () => void;
}

export function Navbar({ onOpenShareModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWhatsAppContact = () => {
    const msg = `¡Hola ${CLUB_NAME}! Vengo desde su catálogo web y me gustaría recibir información.`;
    window.open(getWhatsAppShareUrl(DEFAULT_WHATSAPP_NUMBER, msg), "_blank");
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 px-4 sm:px-8 py-3 sm:py-4 ${
          isScrolled ? "py-2 sm:py-3" : "py-4 sm:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`glass-dock rounded-2xl sm:rounded-full px-4 sm:px-6 py-3 flex items-center justify-between transition-all duration-300 ${
              isScrolled ? "shadow-2xl border-white/20" : "border-white/10"
            }`}
          >
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400/20 to-teal-500/30 border border-emerald-400/40 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover:scale-105 transition-all">
                <Compass className="w-5 h-5 text-emerald-400 group-hover:rotate-45 transition-transform duration-500" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold tracking-tight text-white sm:text-lg flex items-center gap-1.5">
                  {CLUB_NAME}
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </span>
                <span className="text-[10px] sm:text-xs text-white/50 tracking-wider uppercase font-medium">
                  Catálogo Oficial
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/#catalogo"
                className="px-4 py-2 rounded-full text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all"
              >
                Catálogo
              </Link>
              <Link
                href="/#destacados"
                className="px-4 py-2 rounded-full text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Destacados
              </Link>
              <button
                onClick={handleWhatsAppContact}
                className="px-4 py-2 rounded-full text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                Contacto
              </button>
            </nav>

            {/* Desktop Quick Actions */}
            <div className="hidden sm:flex items-center gap-2.5">
              {onOpenShareModal && (
                <button
                  onClick={onOpenShareModal}
                  className="glass-button px-3.5 py-2 rounded-full text-xs font-semibold text-white/90 flex items-center gap-2 hover:text-white"
                  title="Compartir Catálogo"
                >
                  <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Compartir</span>
                </button>
              )}

              <Link
                href="/admin"
                className="glass-button px-3.5 py-2 rounded-full text-xs font-semibold text-white/90 flex items-center gap-1.5 hover:text-white hover:border-emerald-400/50"
                title="Panel de Administración"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Admin</span>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex sm:hidden items-center gap-2">
              {onOpenShareModal && (
                <button
                  onClick={onOpenShareModal}
                  className="p-2 rounded-xl glass-button text-cyan-400"
                  aria-label="Compartir"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl glass-button text-white"
                aria-label="Abrir menú"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer / Glass Sheet Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 sm:hidden flex flex-col justify-end bg-black/70 backdrop-blur-xl animate-in fade-in duration-300">
          <div 
            className="absolute inset-0" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
          <div className="relative glass-dock rounded-t-3xl p-6 border-t border-white/20 shadow-2xl flex flex-col gap-5 max-h-[85vh] overflow-y-auto">
            {/* Drawer Handle */}
            <div className="w-12 h-1.5 rounded-full bg-white/30 mx-auto -mt-1" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Compass className="w-6 h-6 text-emerald-400" />
                <span className="font-bold text-lg text-white">{CLUB_NAME}</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full glass-button text-white/70"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <Link
                href="/#catalogo"
                onClick={() => setIsMobileMenuOpen(false)}
                className="glass-panel p-3.5 rounded-2xl flex items-center justify-between text-white font-medium hover:bg-white/10"
              >
                <span>Explorar Catálogo</span>
                <ArrowRight className="w-4 h-4 text-white/40" />
              </Link>

              <Link
                href="/#destacados"
                onClick={() => setIsMobileMenuOpen(false)}
                className="glass-panel p-3.5 rounded-2xl flex items-center justify-between text-white font-medium hover:bg-white/10"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Productos Destacados</span>
                </div>
                <ArrowRight className="w-4 h-4 text-white/40" />
              </Link>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleWhatsAppContact();
                }}
                className="glass-panel p-3.5 rounded-2xl flex items-center justify-between text-white font-medium hover:bg-white/10 text-left"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Consultar por WhatsApp</span>
                </div>
                <ArrowRight className="w-4 h-4 text-white/40" />
              </button>

              {onOpenShareModal && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenShareModal();
                  }}
                  className="glass-panel p-3.5 rounded-2xl flex items-center justify-between text-white font-medium hover:bg-white/10 text-left"
                >
                  <div className="flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-cyan-400" />
                    <span>Compartir Catálogo / QR</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/40" />
                </button>
              )}
            </div>

            <div className="pt-2 border-t border-white/10">
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="glass-button-primary w-full py-3 rounded-2xl flex items-center justify-center gap-2 text-sm font-semibold shadow-lg"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Acceso Admin / Subir Productos</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
