export interface Product {
  id: string
  name: string
  shortName: string
  tagline: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  gallery: string[]
  format: string
  alcohol: string
  description: string
  longDescription: string
  ingredients: string[]
  flavorNotes: string[]
  pairing: string[]
  stock: number
  isNew?: boolean
  isBestSeller?: boolean
  isPremium?: boolean
  category: string
  badge?: string
}

export interface Recipe {
  id: string
  name: string
  description: string
  image: string
  ingredients: string[]
  steps: string[]
  time: string
  difficulty: 'Fácil' | 'Medio' | 'Difícil'
  servings: number
  tag: string
}

export interface Testimonial {
  id: string
  name: string
  location: string
  rating: number
  text: string
  avatar: string
}

export interface Distributor {
  id: string
  name: string
  region: string
  city: string
  type: 'Retail' | 'Restaurante' | 'Hotel' | 'Supermercado'
  address: string
  phone: string
  lat: number
  lng: number
}

// =====================
// PRODUCTS
// =====================
export const products: Product[] = [
  {
    id: 'sangria-clasica-750',
    name: 'Sangría Victoria Clásica 750ml',
    shortName: 'Victoria Clásica',
    tagline: 'La receta original desde Curicó',
    price: 8990,
    originalPrice: 11990,
    discount: 25,
    image: '/images/sangria-clasica.png',
    gallery: ['/images/sangria-clasica.png', '/images/experiencia-copas.png'],
    format: '750 ml',
    alcohol: '7% Vol.',
    description: 'Nuestra sangría clásica, elaborada con vino tinto seleccionado del Valle de Curicó, frutas cítricas frescas y especias artesanales.',
    longDescription:
      'Victoria Clásica es la expresión más pura de nuestra tradición sangritera. Elaborada con vinos tintos del Valle de Curicó, cítricos frescos y una mezcla secreta de especias, esta sangría encapsula el alma de Chile con reminiscencias de la España más clásica. Perfecta para celebraciones, reuniones en familia o simplemente para disfrutar en un atardecer de verano.',
    ingredients: ['Vino tinto Valle de Curicó', 'Naranjas frescas', 'Limón', 'Canela en rama', 'Clavo de olor', 'Azúcar de caña', 'Agua gasificada'],
    flavorNotes: ['Fruta roja', 'Cítricos', 'Canela', 'Vainilla suave'],
    pairing: ['Tapas españolas', 'Paella', 'Quesos curados', 'Jamón ibérico', 'Frutas frescas'],
    stock: 48,
    isBestSeller: true,
    isPremium: true,
    category: 'Clásica',
    badge: 'Más Vendido',
  },
  {
    id: 'sangria-clasica-1500',
    name: 'Sangría Victoria Clásica 1.5L',
    shortName: 'Victoria Clásica Magnum',
    tagline: 'El formato ideal para grandes momentos',
    price: 14990,
    originalPrice: 18990,
    discount: 21,
    image: '/images/sangria-clasica.png',
    gallery: ['/images/sangria-clasica.png'],
    format: '1.5 L',
    alcohol: '7% Vol.',
    description: 'La misma receta clásica en formato magnum, ideal para reuniones y eventos especiales.',
    longDescription:
      'El mismo espíritu de nuestra Victoria Clásica en un formato magnum de 1.5 litros. Ideal para eventos, celebraciones y aquellas reuniones donde la sangría de calidad no puede faltar.',
    ingredients: ['Vino tinto Valle de Curicó', 'Naranjas frescas', 'Limón', 'Canela en rama', 'Clavo de olor', 'Azúcar de caña', 'Agua gasificada'],
    flavorNotes: ['Fruta roja', 'Cítricos', 'Canela', 'Vainilla suave'],
    pairing: ['Eventos', 'Celebraciones', 'Reuniones familiares'],
    stock: 24,
    isPremium: true,
    category: 'Clásica',
    badge: 'Formato Magnum',
  },
  {
    id: 'sangria-tropical-750',
    name: 'Sangría Victoria Tropical 750ml',
    shortName: 'Victoria Tropical',
    tagline: 'Un viaje a los trópicos en cada copa',
    price: 9490,
    originalPrice: 12990,
    discount: 27,
    image: '/images/sangria-tropical.png',
    gallery: ['/images/sangria-tropical.png'],
    format: '750 ml',
    alcohol: '7% Vol.',
    description: 'Una fusión audaz de frutas tropicales con nuestra base de vino del Valle de Curicó. Refrescante y exótica.',
    longDescription:
      'Victoria Tropical nace de la audacia de fusionar lo mejor de los trópicos con la tradición vitivinícola del Valle de Curicó. Mango, piña, maracuyá y coco se fusionan con un vino blanco aromático para crear una experiencia sensorial única e irresistible.',
    ingredients: ['Vino blanco aromático', 'Mango fresco', 'Piña natural', 'Maracuyá', 'Coco', 'Azúcar de caña'],
    flavorNotes: ['Mango', 'Piña', 'Maracuyá', 'Coco', 'Fresco'],
    pairing: ['Mariscos', 'Ceviche', 'Frutas tropicales', 'Postres livianos'],
    stock: 36,
    isNew: true,
    isPremium: true,
    category: 'Tropical',
    badge: 'Nuevo',
  },
  {
    id: 'sangria-rosada-750',
    name: 'Sangría Victoria Rosé 750ml',
    shortName: 'Victoria Rosé',
    tagline: 'Delicadeza en cada sorbo',
    price: 9990,
    image: '/images/sangria-rosada.png',
    gallery: ['/images/sangria-rosada.png'],
    format: '750 ml',
    alcohol: '6.5% Vol.',
    description: 'Elaborada con vino rosé del Valle de Curicó, fresas, frambuesas y lichi. La sangría más elegante de nuestra colección.',
    longDescription:
      'Victoria Rosé es nuestra expresión más refinada. Basada en un vino rosé de uvas del Valle de Curicó, complementada con fresas frescas, frambuesas y lichi. Su color rosado y aroma floral la convierten en la opción perfecta para momentos especiales.',
    ingredients: ['Vino rosé Valle de Curicó', 'Fresas frescas', 'Frambuesas', 'Lichi', 'Pétalos de rosa', 'Azúcar de caña'],
    flavorNotes: ['Fresa', 'Frambuesa', 'Lichi', 'Floral', 'Delicado'],
    pairing: ['Quesos suaves', 'Ensaladas', 'Sushi', 'Postres de frutas'],
    stock: 18,
    isPremium: true,
    category: 'Rosé',
    badge: 'Premium',
  },
]

// =====================
// RECIPES
// =====================
export const recipes: Recipe[] = [
  {
    id: 'sangria-clasica',
    name: 'Sangría Clásica Victoria',
    description: 'La receta original con frutas frescas y especias artesanales',
    image: '/images/sangria-clasica.png',
    tag: 'Clásica',
    time: '10 min',
    difficulty: 'Fácil',
    servings: 6,
    ingredients: [
      '1 botella Sangría Victoria Clásica 750ml',
      '1 naranja en rodajas',
      '1 limón en rodajas',
      '1 manzana verde en cubos',
      'Hielo al gusto',
      '100ml agua con gas',
      'Hojas de menta fresca',
    ],
    steps: [
      'Verter la Sangría Victoria Clásica en una jarra de vidrio grande.',
      'Agregar las rodajas de naranja, limón y los cubos de manzana.',
      'Incorporar abundante hielo.',
      'Completar con agua con gas al gusto.',
      'Decorar con hojas de menta fresca.',
      'Revolver suavemente y servir inmediatamente.',
    ],
  },
  {
    id: 'sangria-tropical',
    name: 'Sangría Tropical Victoria',
    description: 'Refrescante y exótica con toques de mango y maracuyá',
    image: '/images/sangria-tropical.png',
    tag: 'Tropical',
    time: '15 min',
    difficulty: 'Fácil',
    servings: 4,
    ingredients: [
      '1 botella Sangría Victoria Tropical 750ml',
      '½ mango en cubos',
      '½ piña en trozos',
      '2 rodajas de kiwi',
      'Hielo al gusto',
      '50ml jugo de maracuyá',
      'Sal de cítricos para el borde',
    ],
    steps: [
      'Escarchar el borde de una copa con sal de cítricos.',
      'Colocar los trozos de mango, piña y kiwi en la jarra.',
      'Agregar el jugo de maracuyá.',
      'Verter la Sangría Victoria Tropical.',
      'Añadir hielo abundante.',
      'Servir con una rodaja de piña como decoración.',
    ],
  },
  {
    id: 'sangria-verano',
    name: 'Sangría de Verano',
    description: 'La refrescante opción para los días más calurosos',
    image: '/images/experiencia-copas.png',
    tag: 'Verano',
    time: '20 min',
    difficulty: 'Medio',
    servings: 8,
    ingredients: [
      '1 botella Sangría Victoria Clásica 750ml',
      '200ml limonada natural',
      '1 taza de fresas en mitades',
      'Pepino en rodajas',
      'Menta fresca abundante',
      'Hielo',
      'Flores comestibles para decorar',
    ],
    steps: [
      'En una jarra, combinar la Sangría Victoria con la limonada.',
      'Añadir las fresas, pepino y menta.',
      'Dejar macerar 1 hora en refrigerador.',
      'Antes de servir, agregar hielo fresco.',
      'Decorar con flores comestibles.',
      'Servir en copas con mucho hielo.',
    ],
  },
  {
    id: 'sangria-frutal',
    name: 'Sangría Frutal Rosé',
    description: 'Con frambuesas, fresas y pétalos de rosa',
    image: '/images/sangria-rosada.png',
    tag: 'Frutal',
    time: '12 min',
    difficulty: 'Fácil',
    servings: 4,
    ingredients: [
      '1 botella Sangría Victoria Rosé 750ml',
      '1 taza de frambuesas',
      '½ taza de fresas en láminas',
      '50ml jarabe de rosas',
      'Pétalos de rosa comestibles',
      'Hielo',
      'Agua con gas',
    ],
    steps: [
      'Colocar las frambuesas y fresas en la jarra.',
      'Añadir el jarabe de rosas.',
      'Verter la Sangría Victoria Rosé.',
      'Incorporar hielo generosamente.',
      'Completar con un chorro de agua con gas.',
      'Decorar con pétalos de rosa.',
    ],
  },
]

// =====================
// TESTIMONIALS
// =====================
export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Valentina Herrera',
    location: 'Santiago, RM',
    rating: 5,
    text: 'La mejor sangría que he probado en Chile. El sabor es increíblemente auténtico, se nota que es artesanal. Ya la encargué para la fiesta de mi boda.',
    avatar: '/images/elaboracion.png',
  },
  {
    id: '2',
    name: 'Matías González',
    location: 'Concepción',
    rating: 5,
    text: 'Pedí la clásica y la tropical para un asado familiar. Todos preguntaron dónde la había conseguido. Definitivamente la mejor del mercado.',
    avatar: '/images/historia-vinedo.png',
  },
  {
    id: '3',
    name: 'Catalina Muñoz',
    location: 'Viña del Mar',
    rating: 5,
    text: 'La Victoria Rosé es una obra de arte. Delicada, aromática y perfecta para nuestras reuniones de verano. Llegó al día siguiente del pedido, impecable.',
    avatar: '/images/barricas.png',
  },
  {
    id: '4',
    name: 'Diego Saavedra',
    location: 'Puerto Montt',
    rating: 5,
    text: 'La despachan a todo Chile y llega perfecta. Calidad premium, precio accesible. Le doy 6 estrellas si pudiera. 100% recomendada.',
    avatar: '/images/elaboracion.png',
  },
]

// =====================
// DISTRIBUTORS
// =====================
export const distributors: Distributor[] = [
  {
    id: '1',
    name: 'Vinoteca Premium Santiago Centro',
    region: 'Región Metropolitana',
    city: 'Santiago',
    type: 'Retail',
    address: 'Av. Providencia 2340, Providencia',
    phone: '+56 2 2345 6789',
    lat: -33.4315,
    lng: -70.6196,
  },
  {
    id: '2',
    name: 'Restaurant El Viñedo',
    region: 'Región Metropolitana',
    city: 'Santiago',
    type: 'Restaurante',
    address: 'Bellavista 0101, Providencia',
    phone: '+56 2 2234 5678',
    lat: -33.4356,
    lng: -70.6348,
  },
  {
    id: '3',
    name: 'Hotel & Spa Valle Curicó',
    region: 'Maule',
    city: 'Curicó',
    type: 'Hotel',
    address: 'Camino Las Rastras km 5',
    phone: '+56 75 234 5678',
    lat: -34.9831,
    lng: -71.2396,
  },
  {
    id: '4',
    name: 'Supermercado Unimarc Temuco',
    region: 'La Araucanía',
    city: 'Temuco',
    type: 'Supermercado',
    address: 'Av. Alemania 0780, Temuco',
    phone: '+56 45 234 5678',
    lat: -38.7356,
    lng: -72.5896,
  },
  {
    id: '5',
    name: 'Bodega El Curicano',
    region: 'Maule',
    city: 'Curicó',
    type: 'Retail',
    address: 'Yungay 730, Curicó',
    phone: '+56 75 312 4567',
    lat: -34.9791,
    lng: -71.2396,
  },
  {
    id: '6',
    name: 'Restaurant La Viña Concepción',
    region: 'Biobío',
    city: 'Concepción',
    type: 'Restaurante',
    address: 'Barros Arana 540, Concepción',
    phone: '+56 41 234 5678',
    lat: -36.8267,
    lng: -73.0503,
  },
]

export const regions = [
  'Todas las Regiones',
  'Región Metropolitana',
  'Maule',
  'La Araucanía',
  'Biobío',
  'Los Lagos',
  'Valparaíso',
]
