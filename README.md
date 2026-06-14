# Sangría Victoria — Premium Website

> Una experiencia web premium para Sangría Victoria, una sangría artesanal de alta calidad elaborada con los mejores viñedos.

![Sangría Victoria](public/images/sangria-clasica.png)

## ✨ Características

- **Diseño Premium**: Interfaz elegante con paleta de colores inspirada en la sangría — tonos dorados, burdeos y marfil
- **Modo Claro/Oscuro**: Experiencia visual adaptada conmutación fluida entre temas
- **Verificación de Edad**: Modal de verificación de edad para cumplimiento legal
- **Catálogo de Productos**: Galería interactiva con productos destacados y página de detalle
- **Carrito de Compras**: Funcionalidad completa de carrito con contexto global
- **Recetas y Cócteles**: Sección dedicada a recetas con sangría
- **Testimonios**: Slider de testimonios de clientes
- **Red de Distribución**: Mapa interactivo de distribuidores
- **Diseño Responsivo**: Optimizado para todos los dispositivos

## 🎨 Sistema de Diseño

### Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Dorado | `#C9A15D` | Acentos, elementos destacados |
| Burdeo | `#722F37` | Títulos, elementos principales |
| Marfil | `#F8F5EF` | Fondos claros, texto claro |
| Naranja Oro | `#E89B2D` | Gradientes, elementos cálidos |
| Terracota | `#C44A2A` | Acentos secundarios |
| Verde Viña | `#6B8E3D` | Elementos naturales |

### Tipografía
- **Headings**: Estilo serif elegante
- **Body**: Sans-serif legible y moderna

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Components**: Base UI React + shadcn
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React
- **Estilos**: CSS Modules + Tailwind CSS
- **Lenguaje**: TypeScript
- **Analítica**: Vercel Analytics

## 📁 Estructura del Proyecto

```
premium-sangria-website/
├── app/                      # App Router (páginas y layout)
│   ├── globals.css           # Estilos globales y variables CSS
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Página principal
│   ├── productos/           # Páginas de productos
│   │   └── [id]/
│   │       └── page.tsx     # Detalle de producto
│   └── ventas/              # Página de ventas
│       └── page.tsx
├── components/              # Componentes React
│   ├── AgeVerification/     # Verificación de edad
│   ├── Cart/                # Carrito de compras
│   ├── Contacto/            # Sección de contacto
│   ├── Distribuidores/      # Red de distribuidores
│   ├── Experiencia/         # La experiencia
│   ├── Footer/              # Pie de página
│   ├── Header/              # Encabezado con navegación
│   ├── Hero/                # Sección hero principal
│   ├── Historia/            # Historia de la marca
│   ├── ImageViewer/         # Visor de imágenes con zoom
│   ├── Productos/           # Productos destacados
│   ├── Recetas/             # Recetas y cócteles
│   ├── Responsabilidad/     # Responsabilidad social
│   └── Testimonios/         # Testimonios de clientes
├── lib/                     # Utilidades y contexto
│   ├── CartContext.tsx      # Contexto del carrito
│   └── ThemeContext.tsx     # Contexto del tema
├── public/                  # Assets estáticos
│   └── images/              # Imágenes del proyecto
└── next.config.mjs          # Configuración de Next.js
```

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js 20.9.0 o superior
- npm, yarn, pnpm o bun

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd premium-sangria-website

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

### Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Construye la aplicación para producción |
| `npm run start` | Inicia el servidor de producción |
| `npm run lint` | Ejecuta el linter de código |

## 🌐 Despliegue

### Netlify

Este proyecto está configurado para desplegarse en Netlify con el plugin oficial `@netlify/plugin-nextjs`.

1. Crea un archivo `netlify.toml` en la raíz del proyecto:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"
  NEXT_TELEMETRY_DISABLED = "1"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

2. Instala el plugin:
```bash
npm install -D @netlify/plugin-nextjs
```

3. Conecta tu repositorio en [app.netlify.com](https://app.netlify.com)

### Vercel

El proyecto es totalmente compatible con Vercel. Simplemente importa el repositorio en [vercel.com](https://vercel.com).

## 📝 Licencia

Este proyecto es propiedad de Sangría Victoria. Todos los derechos reservados.
