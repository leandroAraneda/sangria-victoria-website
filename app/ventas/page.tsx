'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import Cart from '@/components/Cart/Cart'
import { products } from '@/lib/data'
import { useCart } from '@/lib/CartContext'
import styles from './ventas.module.css'

const categories = ['Todos', 'Clásica', 'Tropical', 'Rosé']
const sortOptions = [
  { value: 'featured', label: 'Destacados' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
  { value: 'discount', label: 'Mayor descuento' },
]

const formatCLP = (num: number) =>
  num.toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })

export default function VentasPage() {
  const router = useRouter()
  const { addItem } = useCart()
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [sortBy, setSortBy] = useState('featured')
  const [notification, setNotification] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let list = selectedCategory === 'Todos'
      ? [...products]
      : products.filter((p) => p.category === selectedCategory)

    if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price)
    else if (sortBy === 'discount') list.sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0))

    return list
  }, [selectedCategory, sortBy])

  const handleAddToCart = (product: typeof products[0]) => {
    addItem(product, 1, false)
    setNotification(`${product.shortName} agregado al carrito`)
    setTimeout(() => setNotification(null), 2500)
  }

  const handleBuy = (product: typeof products[0]) => {
    addItem(product, 1, true)
  }

  return (
    <>
      <Header forceScrolled />
      <main className={styles.page}>
        {/* Hero banner */}
        <div className={styles.hero} aria-label="Tienda Sangría Victoria">
          <div className={styles.heroBg} aria-hidden="true">
            <Image
              src="/images/experiencia-copas.png"
              alt=""
              fill
              style={{ objectFit: 'cover' }}
              priority
              quality={80}
            />
            <div className={styles.heroOverlay} />
          </div>
          <div className={styles.heroContent}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="gold-divider">
                <span className="section-tag">Tienda Oficial</span>
              </div>
              <h1 className="heading-xl" style={{ color: 'var(--marfil)' }}>
                Nuestros <em style={{ color: 'var(--dorado)', fontStyle: 'italic' }}>Productos</em>
              </h1>
              <p className={`body-lg ${styles.heroText}`}>
                Sangría premium elaborada artesanalmente en Curicó. Despacho a todo Chile.
              </p>
            </motion.div>
          </div>
        </div>

        <div className={styles.shopLayout}>
          {/* Filters bar */}
          <div className={styles.filtersBar}>
            <div className={styles.categories} role="group" aria-label="Filtrar por categoría">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.catBtn} ${selectedCategory === cat ? styles.catBtnActive : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={selectedCategory === cat}
                >
                  {cat}
                  <span className={styles.catCount}>
                    {cat === 'Todos' ? products.length : products.filter((p) => p.category === cat).length}
                  </span>
                </button>
              ))}
            </div>

            <div className={styles.sortWrapper}>
              <label htmlFor="sort-select" className="sr-only">Ordenar por</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.sortSelect}
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <p className={styles.resultsInfo} aria-live="polite">
            {filtered.length} producto{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
          </p>

          {/* Product grid */}
          <motion.div className={styles.grid} layout role="list">
            <AnimatePresence mode="popLayout">
              {filtered.map((product, idx) => (
                <motion.article
                  key={product.id}
                  className={styles.card}
                  role="listitem"
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ y: -6 }}
                  onClick={() => router.push(`/productos/${product.id}`)}
                >
                  {product.badge && (
                    <div className={`${styles.badge} ${product.isNew ? styles.badgeNew : product.isBestSeller ? styles.badgeBest : styles.badgePremium}`}>
                      {product.badge}
                    </div>
                  )}
                  {product.discount && (
                    <div className={styles.discountBadge} aria-label={`${product.discount}% de descuento`}>
                      -{product.discount}%
                    </div>
                  )}

                  <Link href={`/productos/${product.id}`} className={styles.imageLink} aria-label={`Ver detalle de ${product.name}`}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  </Link>

                  <div className={styles.cardBody}>
                    <div className={styles.meta}>
                      <span className={styles.category}>{product.category}</span>
                      <span className={styles.format}>{product.format} · {product.alcohol}</span>
                    </div>

                    <Link href={`/productos/${product.id}`} className={styles.nameLink}>
                      <h2 className={styles.productName}>{product.shortName}</h2>
                    </Link>

                    <div className={styles.flavors} aria-label="Notas de sabor">
                      {product.flavorNotes.slice(0, 3).map((n) => (
                        <span key={n} className={styles.flavorTag}>{n}</span>
                      ))}
                    </div>
                    {idx === 0 && (
                      <div className={styles.flavors} aria-label="Notas de sabor adicionales">
                        <span className={styles.flavorTag}>Vainilla</span>
                        <span className={styles.flavorTag}>Miel</span>
                        <span className={styles.flavorTag}>Especias</span>
                      </div>
                    )}

                    <div className={styles.priceRow}>
                      <div className={styles.prices}>
                        {product.originalPrice && (
                          <span className={styles.originalPrice}>
                            $ {formatCLP(product.originalPrice)}
                          </span>
                        )}
                        <span className={styles.price}>
                          $ {formatCLP(product.price)}
                        </span>
                      </div>

                      <div className={styles.cardActions}>
                        <motion.button
                          className={`btn ${styles.addBtn}`}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleAddToCart(product)
                          }}
                          aria-label={`Agregar ${product.shortName} al carrito`}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <line x1="12" y1="5" x2="12" y2="19"/>
                            <line x1="5" y1="12" x2="19" y2="12"/>
                          </svg>
                          Agregar al carrito
                        </motion.button>
                        <motion.button
                          className={`btn btn-primary ${styles.buyBtn}`}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleBuy(product)
                          }}
                          aria-label={`Comprar ${product.shortName} ahora`}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                          Comprar
                        </motion.button>
                      </div>
                    </div>

                    <div className={styles.stock}>
                      <span className={`${styles.stockDot} ${product.stock > 10 ? styles.stockHigh : styles.stockLow}`} aria-hidden="true" />
                      <span className={styles.stockText}>
                        {product.stock > 10 ? 'En stock' : `Solo ${product.stock} unidades`}
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Shipping info */}
          <div className={styles.shippingInfo} role="complementary">
            <div className={styles.shippingCard}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <rect x="1" y="3" width="15" height="13" rx="1"/>
                <path d="M16 8h4l3 3v3h-7V8z"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
              <div>
                <p className={styles.shippingTitle}>Despacho a todo Chile</p>
                <p className={styles.shippingText}>En 24–72 horas hábiles</p>
              </div>
            </div>
            <div className={styles.shippingCard}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <div>
                <p className={styles.shippingTitle}>Pago 100% seguro</p>
                <p className={styles.shippingText}>Transbank, transferencia y más</p>
              </div>
            </div>
            <div className={styles.shippingCard}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
                <path d="M12 12v9"/>
                <path d="m8 17 4 4 4-4"/>
              </svg>
              <div>
                <p className={styles.shippingTitle}>Fácil devolución</p>
                <p className={styles.shippingText}>Si no estás satisfecho, te devolvemos</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Cart />

      {/* Notification toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            key={notification}
            className={styles.toast}
            initial={{ opacity: 0, x: -100, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            role="status"
            aria-live="polite"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
