# 🌿 Club Impenetrable - Catálogo Digital & Panel de Administración

Catálogo digital de vanguardia para **Club Impenetrable**, desarrollado con estética **Liquid Glass (estilo iOS 26/27)**, navegación ultra-responsiva con menú hamburguesa para celulares y vista multi-columna para PC/notebooks, soporte de banners y productos, generación dinámica de códigos QR y enlaces directos a WhatsApp para pedidos y consultas.

Desplegable al 100% **gratis en Vercel** con base de datos y almacenamiento en **Supabase**.

---

## 🚀 Características Principales

- 📱 **Diseño Liquid Glass (iOS 26/27)**:
  - Efectos de refracción, `backdrop-filter: blur`, bordes especulares y orbes de luz ambiental animados.
  - Menú hamburguesa tipo hoja/drawer inferior fluido para smartphones.
  - Navbar flotante estilo Dynamic Island / Dock.
- 📦 **Catálogo Interactivo**:
  - Filtro por categorías con pills dinámicos.
  - Búsqueda en tiempo real por título, descripción y categoría.
  - Interruptor tipo iOS *"Solo en stock"*.
  - Ordenamiento por destacados, más nuevos o por precio.
  - Modal de producto con galería de imágenes en alta resolución, cálculo de descuento (`% OFF`) y disponibilidad.
- 🖼️ **Carrusel de Banners**:
  - Slider hero con transiciones suaves, temporizador automático, badges y botones de llamada a la acción (CTA).
- 🔗 **Compartir & QR Code**:
  - Generación instantánea de códigos QR en pantalla para escanear con la cámara del celular.
  - Botón de copiar enlace con confirmación visual.
  - Enlaces directos para compartir en WhatsApp y Telegram.
  - Páginas públicas dedicadas por producto (`/producto/[id]`) con vista previa OpenGraph optimizada.
- 💬 **Integración Nativa con WhatsApp**:
  - Mensaje pre-redactado automáticamente con nombre del producto, precio y enlace directo al hacer clic en *"Pedir por WhatsApp"*.
- 🛡️ **Panel de Administración (`/admin`)**:
  - Gestión completa de Productos (Crear, Editar, Eliminar, Conmutar Stock y Destacados).
  - Gestión de Banners (Subir imágenes, cambiar enlaces, texto, orden y visibilidad).
  - Subida de imágenes a Supabase Storage con compresión o URLs externas.
  - Modo Demostración sin conexión incluido para probar inmediatamente sin configurar nada.

---

## ⚖️ ¿Por qué Supabase en vez de Firebase?

Para este proyecto, **Supabase** es la mejor opción por las siguientes razones:

1. **Seguridad Superior con RLS (Row Level Security)**:
   - Supabase utiliza PostgreSQL con políticas a nivel de fila.
   - El público general solo puede leer productos y banners activos.
   - Solo los administradores autenticados tienen permisos de escritura/modificación/eliminación.
2. **Consultas y Filtros Relacionales**:
   - Permite ordenar y filtrar por categorías, precios y stock sin las limitaciones de índices compuestos de Firestore.
3. **Storage Integrado para Fotos**:
   - Incluye bucket (`catalog-media`) con políticas públicas de lectura y privadas para subida.
4. **100% Gratuito y Optimizado para Vercel**:
   - El plan gratuito incluye 500 MB de base de datos PostgreSQL, 1 GB de almacenamiento de fotos y 50.000 usuarios activos mensuales.
   - No requiere archivos secretos JSON de cuentas de servicio en el servidor como Firebase Admin.

---

## 🛠️ Tecnologías

- **Framework**: Next.js 16 (App Router, Turbopack, React 19, TypeScript)
- **Estilos**: Tailwind CSS v4 + Liquid Glass utilities
- **Iconografía**: Lucide React
- **Base de Datos & Auth & Storage**: Supabase (PostgreSQL + RLS)
- **Generador QR**: `qrcode.react`
- **Hosting**: Vercel (Plan Hobby - Gratuito)

---

## ⚡ Inicio Rápido Local

1. Instalar dependencias:
   ```bash
   pnpm install
   ```

2. Ejecutar servidor de desarrollo:
   ```bash
   pnpm dev
   ```

3. Abrir en tu navegador:
   - Catálogo: [http://localhost:3000](http://localhost:3000)
   - Panel de Control: [http://localhost:3000/admin](http://localhost:3000/admin)

> [!NOTE]
> La aplicación arranca por defecto en **Modo Demostración local** con productos y banners de ejemplo, por lo que puedes probar la interfaz, agregar productos y editar banners de inmediato sin configurar ninguna clave.

---

## 🗄️ Configuración de Supabase (Paso a Paso)

1. Ingresa a [supabase.com](https://supabase.com) y crea un nuevo proyecto gratuito.
2. En el panel izquierdo de Supabase, ve a **SQL Editor**.
3. Abre el archivo [`supabase-schema.sql`](./supabase-schema.sql) ubicado en este proyecto, copia todo su contenido y haz clic en **Run**.
   - Esto creará automáticamente las tablas `products`, `banners`, `categories`, las políticas de seguridad RLS y el bucket de almacenamiento `catalog-media`.
4. Ve a **Project Settings > API** en Supabase y copia:
   - `Project URL`
   - `anon / public API key`
5. Crea un archivo `.env.local` en tu proyecto:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anon
   NEXT_PUBLIC_DEFAULT_WHATSAPP=5493624000000
   NEXT_PUBLIC_SITE_NAME=Club Impenetrable
   ```

---

## 🚀 Despliegue Gratis en Vercel

1. Sube tu código a un repositorio en **GitHub** o **GitLab**.
2. Entra en [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
3. Haz clic en **Add New... > Project** y selecciona tu repositorio `club-impenetrable`.
4. En la sección **Environment Variables**, agrega las mismas variables de tu `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_DEFAULT_WHATSAPP`
5. Haz clic en **Deploy**. En menos de 1 minuto tendrás tu catálogo público con dominio gratuito `https://club-impenetrable.vercel.app` listo para compartir con tus clientes.
