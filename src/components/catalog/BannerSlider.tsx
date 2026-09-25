"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import { Banner } from "@/types";

interface BannerSliderProps {
  banners: Banner[];
}

export function BannerSlider({ banners }: BannerSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeBanners = banners.filter((b) => b.is_active);

  const nextSlide = useCallback(() => {
    if (activeBanners.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
  }, [activeBanners.length]);

  const prevSlide = () => {
    if (activeBanners.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
  };

  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide, activeBanners.length]);

  if (activeBanners.length === 0) return null;

  const currentBanner = activeBanners[currentIndex];

  return (
    <div className="relative w-full overflow-hidden rounded-3xl glass-panel p-2 sm:p-3 my-6 sm:my-8 group">
      {/* Background Image Container */}
      <div className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] rounded-2xl overflow-hidden">
        {activeBanners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <Image
              src={banner.image_url}
              alt={banner.title}
              fill
              priority={index === 0}
              className="object-cover object-center transform scale-105 group-hover:scale-100 transition-transform duration-1000"
            />
            {/* Apple style liquid gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent hidden sm:block" />
          </div>
        ))}

        {/* Content Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-10 md:p-14 max-w-3xl">
          {currentBanner.badge && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs font-semibold text-emerald-300 w-fit mb-3 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{currentBanner.badge}</span>
            </div>
          )}

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2 sm:mb-3 leading-tight drop-shadow-md">
            {currentBanner.title}
          </h2>

          {currentBanner.subtitle && (
            <p className="text-sm sm:text-base md:text-lg text-white/80 mb-5 sm:mb-6 max-w-2xl line-clamp-2 sm:line-clamp-3">
              {currentBanner.subtitle}
            </p>
          )}

          {currentBanner.button_text && (
            <div>
              <a
                href={currentBanner.button_link || "#catalogo"}
                className="glass-button-primary inline-flex items-center gap-2.5 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all hover:gap-3.5"
              >
                <span>{currentBanner.button_text}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>

        {/* Navigation Arrows */}
        {activeBanners.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              aria-label="Anterior banner"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full glass-dock text-white/80 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Siguiente banner"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full glass-dock text-white/80 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Indicators */}
        {activeBanners.length > 1 && (
          <div className="absolute bottom-4 right-6 z-30 flex items-center gap-1.5 p-1.5 rounded-full glass-dock">
            {activeBanners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Ir al banner ${idx + 1}`}
                className={`transition-all duration-300 rounded-full h-1.5 ${
                  idx === currentIndex ? "w-6 bg-emerald-400" : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
