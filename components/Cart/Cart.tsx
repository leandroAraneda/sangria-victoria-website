'use client'

import { useCart } from '@/lib/CartContext'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Cart.module.css'

function formatCLP(n: number) {
  return `$${n.toLocaleString('es-CL')}`
}

export default function Cart() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, discount, total } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-label="Carrito de compras"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerLeft}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="8" cy="21" r="1"/>
                  <circle cx="19" cy="21" r="1"/>
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                </svg>
                <h2 className={styles.title}>Mi Carrito</h2>
                <span className={styles.count}>{items.reduce((s, i) => s + i.quantity, 0)}</span>
              </div>
              <button className={styles.closeBtn} onClick={closeCart} aria-label="Cerrar carrito">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className={styles.items} role="list">
              {items.length === 0 ? (
                <div className={styles.empty}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <circle cx="8" cy="21" r="1"/>
                    <circle cx="19" cy="21" r="1"/>
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                  </svg>
                  <p>Tu carrito está vacío</p>
                  <button className={`btn btn-secondary ${styles.shopBtn}`} onClick={closeCart}>
                    Ver Productos
                  </button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      className={styles.item}
                      role="listitem"
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className={styles.itemImg}>
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          width={72}
                          height={72}
                          className={styles.img}
                        />
                      </div>
                      <div className={styles.itemInfo}>
                        <p className={styles.itemName}>{item.product.shortName}</p>
                        <p className={styles.itemFormat}>{item.product.format}</p>
                        <p className={styles.itemPrice}>{formatCLP(item.product.price * item.quantity)}</p>
                        <div className={styles.qtyRow}>
                          <button
                            className={styles.qtyBtn}
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            aria-label="Reducir cantidad"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                              <line x1="5" y1="12" x2="19" y2="12"/>
                            </svg>
                          </button>
                          <span className={styles.qty} aria-label={`Cantidad: ${item.quantity}`}>{item.quantity}</span>
                          <button
                            className={styles.qtyBtn}
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            aria-label="Aumentar cantidad"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                              <line x1="12" y1="5" x2="12" y2="19"/>
                              <line x1="5" y1="12" x2="19" y2="12"/>
                            </svg>
                          </button>
                          <button
                            className={styles.removeBtn}
                            onClick={() => removeItem(item.product.id)}
                            aria-label={`Eliminar ${item.product.shortName}`}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                              <polyline points="3 6 5 6 21 6"/>
                              <path d="M19 6l-1 14H6L5 6"/>
                              <path d="M10 11v6M14 11v6"/>
                              <path d="M9 6V4h6v2"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Summary */}
            {items.length > 0 && (
              <div className={styles.summary}>
                {discount > 0 && (
                  <div className={styles.summaryRow}>
                    <span>Descuento aplicado</span>
                    <span className={styles.discountVal}>-{formatCLP(discount)}</span>
                  </div>
                )}
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>{formatCLP(subtotal)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.shippingLabel}>Despacho</span>
                  <span className={styles.shippingVal}>Calcular al pagar</span>
                </div>
                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                  <span>Total</span>
                  <span className={styles.totalVal}>{formatCLP(total)}</span>
                </div>

                <button className={`btn btn-primary ${styles.checkoutBtn}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect width="20" height="14" x="2" y="5" rx="2"/>
                    <line x1="2" x2="22" y1="10" y2="10"/>
                  </svg>
                  Pagar Ahora
                </button>
                <p className={styles.secureNote}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  Pago 100% seguro
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
