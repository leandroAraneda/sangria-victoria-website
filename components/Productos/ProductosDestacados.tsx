'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/lib/CartContext'
import { products } from '@/lib/data'
import styles from './ProductosDestacados.module.css'

export default function ProductosDestacados() {
  const router = useRouter()
  const { addItem } = useCart()
  const [notification, setNotification] = useState<string | null>(null)

  const handleAddToCart = (product: typeof products[0]) => {
    addItem(product, 1, false)
    setNotification(`${product.shortName} agregado al carrito`)
    setTimeout(() => setNotification(null), 2500)
  }

  const handleBuy = (product: typeof products[0]) => {
    addItem(product, 1, true)
  }

  return (
    <section id="productos" className={styles.section} aria-labelledby="productos-title">
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{}}
          transition={{ duration: 0.7 }}
        >
          <div className="gold-divider">
            <span className="section-tag">Nuestra Colección</span>
          </div>
          <h2 id="productos-title" className="heading-lg">
            Productos <em className={styles.titleAccent}>Destacados</em>
          </h2>
          <p className={`body-lg ${styles.subtitle}`}>
            Cada variedad es una experiencia sensorial única, elaborada con ingredientes
            seleccionados y el cuidado artesanal que nos caracteriza.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className={styles.grid} role="list">
          {products.map((product, idx) => (
            <motion.article
              key={product.id}
              className={styles.card}
              role="listitem"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{}}
              transition={{ delay: idx * 0.1, duration: 0.7 }}
              whileHover={{ y: -6 }}
              onClick={() => router.push(`/productos/${product.id}`)}
            >
              {/* Badge */}
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

              {/* Image */}
              <div className={styles.imageWrapper}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Card body */}
              <div className={styles.cardBody}>
                <div className={styles.meta}>
                  <span className={styles.category}>{product.category}</span>
                  <span className={styles.format}>{product.format} · {product.alcohol}</span>
                </div>

                <Link href={`/productos/${product.id}`} className={styles.nameLink}>
                  <h3 className={styles.productName}>{product.shortName}</h3>
                </Link>

                {/* Flavor notes */}
                <div className={styles.flavors} aria-label="Notas de sabor">
                  {product.flavorNotes.slice(0, 3).map((note) => (
                    <span key={note} className={styles.flavorTag}>
                      {note}
                    </span>
                  ))}
                </div>

                {/* Price row */}
                <div className={styles.priceRow}>
                  <div className={styles.prices}>
                    {product.originalPrice && (
                      <span className={styles.originalPrice}>
                        ${product.originalPrice.toLocaleString('es-CL')}
                      </span>
                    )}
                    <span className={styles.price}>
                      ${product.price.toLocaleString('es-CL')}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className={styles.cardActions}>
                  <button
                    className={`btn ${styles.addBtn}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddToCart(product)
                    }}
                    aria-label={`Agregar ${product.shortName} al carrito`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Agregar al carrito
                  </button>
                  <button
                    className={`btn btn-primary ${styles.buyBtn}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleBuy(product)
                    }}
                    aria-label={`Comprar ${product.shortName} ahora`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                    Comprar
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className={styles.cta}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{}}
          transition={{ delay: 0.3 }}
        >
          <Link href="/ventas" className="btn btn-burdeo">
            Ver Todos los Productos
          </Link>
        </motion.div>
      </div>

      {/* Toast notification */}
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
    </section>
  )
}
