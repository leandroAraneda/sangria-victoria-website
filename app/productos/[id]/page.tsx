'use client'

import { use, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import Cart from '@/components/Cart/Cart'
import ImageViewer from '@/components/ImageViewer/ImageViewer'
import { products } from '@/lib/data'
import { useCart } from '@/lib/CartContext'
import styles from './product.module.css'

const formatCLP = (num: number) =>
  num.toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })

export default function ProductoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = products.find((p) => p.id === id)
  if (!product) notFound()

  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [notification, setNotification] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState(product.gallery[0])
  const [activeTab, setActiveTab] = useState<'descripcion' | 'ingredientes' | 'maridaje'>('descripcion')
  const [viewerOpen, setViewerOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3)

  const handleAdd = () => {
    addItem(product, qty, false)
    setNotification(`${product.shortName} agregado al carrito`)
    setTimeout(() => setNotification(null), 2500)
  }

  const handleBuy = () => {
    addItem(product, qty, true)
  }

  const openViewer = (index: number) => {
    setCurrentImageIndex(index)
    setViewerOpen(true)
  }

  const closeViewer = () => {
    setViewerOpen(false)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.gallery.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.gallery.length) % product.gallery.length)
  }

  const galleryImages = product.gallery.map((src) => ({ src, alt: product.name }))

  return (
    <>
      <Header forceScrolled />
      <main className={styles.page}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Ruta de navegación">
          <div className={styles.breadcrumbInner}>
            <Link href="/" className={styles.breadLink}>Inicio</Link>
            <span className={styles.breadSep} aria-hidden="true">/</span>
            <Link href="/ventas" className={styles.breadLink}>Tienda</Link>
            <span className={styles.breadSep} aria-hidden="true">/</span>
            <span className={styles.breadCurrent}>{product.shortName}</span>
          </div>
        </nav>

        <div className={styles.container}>
          <div className={styles.layout}>
            {/* Images */}
            <motion.div
              className={styles.imagesSection}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className={styles.mainImage}
                onClick={() => openViewer(product.gallery.indexOf(selectedImage))}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openViewer(product.gallery.indexOf(selectedImage))}
                aria-label="Ver imagen en grande"
              >
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {product.badge && (
                  <div className={`${styles.badge} ${product.isNew ? styles.badgeNew : product.isBestSeller ? styles.badgeBest : styles.badgePremium}`}>
                    {product.badge}
                  </div>
                )}
              </div>
              {product.gallery.length > 1 && (
                <div className={styles.thumbs} role="list" aria-label="Galería de imágenes">
                  {product.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      className={`${styles.thumb} ${selectedImage === img ? styles.thumbActive : ''}`}
                      onClick={() => setSelectedImage(img)}
                      aria-label={`Ver imagen ${idx + 1}`}
                      role="listitem"
                    >
                      <Image
                        src={img}
                        alt={`${product.name} imagen ${idx + 1}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Info */}
            <motion.div
              className={styles.infoSection}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className={styles.categoryTag}>{product.category}</div>
              <h1 className={`heading-lg ${styles.productTitle}`}>{product.shortName}</h1>
              <p className={styles.productTagline}>{product.tagline}</p>

              {/* Specs */}
              <div className={styles.specs} role="list" aria-label="Especificaciones">
                <div className={styles.spec} role="listitem">
                  <span className={styles.specLabel}>Formato</span>
                  <span className={styles.specValue}>{product.format}</span>
                </div>
                <div className={styles.spec} role="listitem">
                  <span className={styles.specLabel}>Alcohol</span>
                  <span className={styles.specValue}>{product.alcohol}</span>
                </div>
                <div className={styles.spec} role="listitem">
                  <span className={styles.specLabel}>Stock</span>
                  <span className={`${styles.specValue} ${product.stock > 10 ? styles.stockOk : styles.stockLow}`}>
                    {product.stock > 10 ? 'En stock' : `${product.stock} unidades`}
                  </span>
                </div>
              </div>

              {/* Flavor notes */}
              <div>
                <p className={styles.notesLabel}>Notas de Sabor</p>
                <div className={styles.flavorNotes} aria-label="Notas de sabor">
                  {product.flavorNotes.map((note) => (
                    <span key={note} className={styles.flavorTag}>{note}</span>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className={styles.priceBlock}>
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
                {product.discount && (
                  <span className={styles.discountBadge}>Ahorra {product.discount}%</span>
                )}
              </div>

              {/* Qty + Add */}
              <div className={styles.buyBlock}>
                <div className={styles.qtyControl} role="group" aria-label="Cantidad">
                  <button
                    className={styles.qtyBtn}
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    aria-label="Reducir cantidad"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </button>
                  <span className={styles.qtyValue} aria-label={`Cantidad: ${qty}`}>{qty}</span>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => setQty(qty + 1)}
                    aria-label="Aumentar cantidad"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </button>
                </div>

                <div className={styles.btnStack}>
                  <motion.button
                    className={`btn ${styles.addBtn}`}
                    onClick={handleAdd}
                    whileTap={{ scale: 0.97 }}
                    aria-label={`Agregar ${qty} ${product.shortName} al carrito`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Agregar al Carrito
                  </motion.button>
                  <motion.button
                    className={`btn btn-primary ${styles.buyBtn}`}
                    onClick={handleBuy}
                    whileTap={{ scale: 0.97 }}
                    aria-label={`Comprar ${qty} ${product.shortName} ahora`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                    Comprar
                  </motion.button>
                </div>
              </div>

              <p className={styles.totalLine}>
                Total: <strong>$ {formatCLP(product.price * qty)}</strong>
              </p>

              {/* Info pills */}
              <div className={styles.infoPills}>
                <span className={styles.infoPill}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="1" y="3" width="15" height="13" rx="1"/>
                    <path d="M16 8h4l3 3v3h-7V8z"/>
                    <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                  Despacho a todo Chile
                </span>
                <span className={styles.infoPill}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  Pago seguro
                </span>
              </div>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className={styles.tabs}>
            <div className={styles.tabList} role="tablist">
              {(['descripcion', 'ingredientes', 'maridaje'] as const).map((tab) => (
                <button
                  key={tab}
                  className={`${styles.tabBtn} ${activeTab === tab ? styles.tabBtnActive : ''}`}
                  onClick={() => setActiveTab(tab)}
                  role="tab"
                  aria-selected={activeTab === tab}
                  aria-controls={`tab-panel-${tab}`}
                >
                  {tab === 'descripcion' ? 'Descripción' : tab === 'ingredientes' ? 'Ingredientes' : 'Maridaje'}
                </button>
              ))}
            </div>

            <div className={styles.tabPanel} id={`tab-panel-${activeTab}`} role="tabpanel">
              <AnimatePresence mode="wait">
                {activeTab === 'descripcion' && (
                  <motion.div
                    key="descripcion"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    <p className={`body-lg ${styles.tabText}`}>{product.longDescription}</p>
                  </motion.div>
                )}
                {activeTab === 'ingredientes' && (
                  <motion.div
                    key="ingredientes"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    <ul className={styles.list}>
                      {product.ingredients.map((ing) => (
                        <li key={ing} className={styles.listItem}>
                          <span className={styles.bullet} aria-hidden="true" />
                          {ing}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
                {activeTab === 'maridaje' && (
                  <motion.div
                    key="maridaje"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    <div className={styles.pairingGrid}>
                      {product.pairing.map((p) => (
                        <div key={p} className={styles.pairingItem}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          {p}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Related */}
          <div className={styles.related}>
            <h2 className={`heading-md ${styles.relatedTitle}`}>También Te Puede Gustar</h2>
            <div className={styles.relatedGrid} role="list">
              {relatedProducts.map((rp) => (
                <Link href={`/productos/${rp.id}`} key={rp.id} className={styles.relatedCard} role="listitem">
                  <div className={styles.relatedImage}>
                    <Image
                      src={rp.image}
                      alt={rp.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className={styles.relatedInfo}>
                    <p className={styles.relatedName}>{rp.shortName}</p>
                    <p className={styles.relatedPrice}>$ {formatCLP(rp.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Cart />

      <ImageViewer
        images={galleryImages}
        currentIndex={currentImageIndex}
        isOpen={viewerOpen}
        onClose={closeViewer}
        onNext={nextImage}
        onPrev={prevImage}
      />

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
