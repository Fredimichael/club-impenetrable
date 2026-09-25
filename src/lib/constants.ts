import { Banner, Category, Product } from "@/types";

export const DEFAULT_WHATSAPP_NUMBER = "5493624000000"; // Reemplazar con el número del club
export const CLUB_NAME = "Club Impenetrable";
export const CLUB_TAGLINE = "Catálogo Exclusivo & Experiencias Salvajes";

export const INITIAL_CATEGORIES: Category[] = [
  { id: "cat-all", name: "Todos", slug: "todos", icon: "Sparkles" },
  { id: "cat-indumentaria", name: "Indumentaria", slug: "indumentaria", icon: "Shirt" },
  { id: "cat-accesorios", name: "Accesorios & EDC", slug: "accesorios", icon: "Compass" },
  { id: "cat-artesanal", name: "Artesanal Autóctono", slug: "artesanal", icon: "Gem" },
  { id: "cat-gourmet", name: "Sabores del Monte", slug: "gourmet", icon: "Utensils" },
  { id: "cat-experiencias", name: "Pases & Experiencias", slug: "experiencias", icon: "MapPin" },
];

export const INITIAL_BANNERS: Banner[] = [
  {
    id: "banner-1",
    title: "Nueva Colección El Impenetrable",
    subtitle: "Prendas técnicas y artesanías nativas diseñadas para resistir y destacar.",
    image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    button_text: "Explorar Colección",
    button_link: "#catalogo",
    badge: "TEMPORADA 2026",
    is_active: true,
    order: 1,
  },
  {
    id: "banner-2",
    title: "Miel Silvestre & Cacao Nativo",
    subtitle: "Edición limitada cosechada de manera sustentable en el corazón del monte chaqueño.",
    image_url: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1600&q=80",
    button_text: "Ver Gourmet",
    button_link: "#catalogo",
    badge: "EDICIÓN LIMITADA",
    is_active: true,
    order: 2,
  },
  {
    id: "banner-3",
    title: "Expediciones VIP & Pases de Campo",
    subtitle: "Accedé a travesías guiadas exclusivas con astrofotografía y gastronomía de autor.",
    image_url: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1600&q=80",
    button_text: "Reservar Experiencia",
    button_link: "#catalogo",
    badge: "MEMBRESÍA CLUB",
    is_active: true,
    order: 3,
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    title: "Chaqueta Cortavientos Monte Tech",
    description: "Confeccionada con tejido impermeable ripstop ultra liviano con memoria térmica. Tratamiento anti-desgarro para excursiones de alta exigencia.",
    price: 68500,
    compare_at_price: 82000,
    category: "indumentaria",
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80"
    ],
    in_stock: true,
    is_featured: true,
    badge: "DESTACADO",
    whatsapp_number: DEFAULT_WHATSAPP_NUMBER,
  },
  {
    id: "prod-2",
    title: "Cuchillo Artesanal Acero Damasco & Quebracho Colorado",
    description: "Forjado a mano por maestros cuchilleros locales. Cabo en madera de quebracho colorado rescatado con incrustaciones de bronce. Incluye vaina de cuero vacuno curtido vegetal.",
    price: 94000,
    compare_at_price: 110000,
    category: "artesanal",
    images: [
      "https://images.unsplash.com/photo-1593081891731-fda0877988da?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80"
    ],
    in_stock: true,
    is_featured: true,
    badge: "ARTESANAL",
    whatsapp_number: DEFAULT_WHATSAPP_NUMBER,
  },
  {
    id: "prod-3",
    title: "Miel Negra Orgánica del Impenetrable (500g)",
    description: "Cosecha silvestre de abejas nativas en flora virgen de algarrobo y mistol. Sabor intenso con notas ahumadas y propiedades nutricionales excepcionales.",
    price: 18500,
    compare_at_price: null,
    category: "gourmet",
    images: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1000&q=80"
    ],
    in_stock: true,
    is_featured: true,
    badge: "100% ORGÁNICO",
    whatsapp_number: DEFAULT_WHATSAPP_NUMBER,
  },
  {
    id: "prod-4",
    title: "Mochila Táctica Modular Cordura 35L",
    description: "Diseño ergonómico con sistema MOLLE reforzado, compartimento acolchado para notebook de hasta 16\", porta bolsa de hidratación y cierres YKK termosellados.",
    price: 89000,
    compare_at_price: 98000,
    category: "accesorios",
    images: [
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80"
    ],
    in_stock: true,
    is_featured: false,
    badge: "MOLLE SYSTEM",
    whatsapp_number: DEFAULT_WHATSAPP_NUMBER,
  },
  {
    id: "prod-5",
    title: "Termo Balas Inox Doble Pared 1.2L Glass Edition",
    description: "Mantiene la temperatura frío/calor durante más de 36 horas. Tapón cebador de precisión para mate y acabado exterior texturado anti-deslizante.",
    price: 49500,
    compare_at_price: 55000,
    category: "accesorios",
    images: [
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80"
    ],
    in_stock: true,
    is_featured: false,
    badge: "MÁS VENDIDO",
    whatsapp_number: DEFAULT_WHATSAPP_NUMBER,
  },
  {
    id: "prod-6",
    title: "Gorra Trucker Club Impenetrable - Edición Nocturna",
    description: "Parche frontal bordado de alta densidad en relieve. Malla respirable ultra-durable y broche regulable snapback. Talle único adaptable.",
    price: 24000,
    compare_at_price: null,
    category: "indumentaria",
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=80"
    ],
    in_stock: true,
    is_featured: false,
    badge: "ORIGINAL CLUB",
    whatsapp_number: DEFAULT_WHATSAPP_NUMBER,
  },
  {
    id: "prod-7",
    title: "Pase Safari Nocturno & Astrofotografía (x2 personas)",
    description: "Voucher oficial para experiencia inmersiva en la Reserva Natural. Incluye guía certificado, telescopio móvil computarizado y degustación de fogón criollo.",
    price: 145000,
    compare_at_price: 170000,
    category: "experiencias",
    images: [
      "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1000&q=80"
    ],
    in_stock: true,
    is_featured: true,
    badge: "EXPERIENCIA EXCLUSIVA",
    whatsapp_number: DEFAULT_WHATSAPP_NUMBER,
  },
  {
    id: "prod-8",
    title: "Tejido Chaguar Ancestral Camino de Mesa",
    description: "Pieza única realizada íntegramente a mano con fibras silvestres de chaguar tintadas con cortezas y raíces del monte. Medidas 120 x 35 cm.",
    price: 52000,
    compare_at_price: null,
    category: "artesanal",
    images: [
      "https://images.unsplash.com/photo-1606744888344-498238f01743?auto=format&fit=crop&w=1000&q=80"
    ],
    in_stock: false,
    is_featured: false,
    badge: "PIEZA ÚNICA",
    whatsapp_number: DEFAULT_WHATSAPP_NUMBER,
  }
];
