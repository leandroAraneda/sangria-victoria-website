'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useCart } from '@/lib/CartContext'
import { products } from '@/lib/data'
import styles from './ProductosDestacados.module.css'

export default function ProductosDestacados() {
  const { addItem } = useCart()

  return (
    <section id="productos" className={styles.section} aria-labelledby="productos-title">
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.7 }}
              whileHover={{ y: -8 }}
            >
              {/* Badge */}
              {product.badge && (
                <div className={`${styles.badge} ${product.isNew ? styles.badgeNew : product.isBestSeller ? styles.badgeBest : styles.badgePremium}`}>
                  {product.badge}
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
                <div className={styles.imageOverlay} aria-hidden="true">
                  <Link
                    href={`/productos/${product.id}`}
                    className={`btn btn-secondary ${styles.viewBtn}`}
                    aria-label={`Ver detalle de ${product.name}`}
                  >
                    Ver Detalle
                  </Link>
                </div>
              </div>

              {/* Info */}
              <div className={styles.info}>
                <div className={styles.meta}>
                  <span className={styles.format}>{product.format}</span>
                  <span className={styles.alcohol}>{product.alcohol}</span>
                </div>

                <h3 className={`heading-sm ${styles.name}`}>{product.shortName}</h3>
                <p className={styles.tagline}>{product.tagline}</p>

                {/* Flavor notes */}
                <div className={styles.flavors} aria-label="Notas de sabor">
                  {product.flavorNotes.slice(0, 3).map((note) => (
                    <span key={note} className={styles.flavorTag}>
                      {note}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className={styles.pricing}>
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
                  {product.discount && (
                    <span className={styles.discount}>-{product.discount}%</span>
                  )}
                </div>

                {/* Actions */}
                <div className={styles.actions}>
                  <button
                    className={`btn btn-primary ${styles.addBtn}`}
                    onClick={() => addItem(product)}
                    aria-label={`Agregar ${product.shortName} al carrito`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                      <line x1="3" y1="6" x2="21" y2="6"/>
                      <path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                    Agregar
                  </button>
                  <Link
                    href={`/productos/${product.id}`}
                    className={`btn btn-secondary ${styles.detailBtn}`}
                    aria-label={`Ver detalle de ${product.name}`}
                  >
                    Detalle
                  </Link>
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
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link href="/ventas" className="btn btn-burdeo">
            Ver Todos los Productos
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
