'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/CartContext'
import styles from './Header.module.css'

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#historia', label: 'Nuestra Historia' },
  { href: '#productos', label: 'Productos' },
  { href: '#experiencia', label: 'Experiencia Victoria' },
  { href: '#recetas', label: 'Recetas' },
  { href: '#distribuidores', label: 'Distribuidores' },
  { href: '/ventas', label: 'Ventas' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { totalItems, openCart } = useCart()

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : styles.transparent}`}
        role="banner"
      >
        <div className={styles.container}>
          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="Sangría Victoria - Inicio">
            <span className={styles.logoIcon}>V</span>
            <span className={styles.logoText}>
              <span className={styles.logoBrand}>Sangría</span>
              <span className={styles.logoSub}>Victoria</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.nav} aria-label="Navegación principal">
            <ul className={styles.navList}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith('/') ? (
                    <Link href={link.href} className={styles.navLink} onClick={closeMobile}>
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className={styles.navLink} onClick={closeMobile}>
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Right actions */}
          <div className={styles.actions}>
            <span className={styles.badge18} aria-label="Venta exclusiva para mayores de 18 años">
              +18
            </span>
            <button
              className={styles.cartBtn}
              onClick={openCart}
              aria-label={`Carrito de compras, ${totalItems} productos`}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {totalItems > 0 && (
                <span className={styles.cartCount} aria-hidden="true">
                  {totalItems}
                </span>
              )}
            </button>
            <Link href="/ventas" className={`${styles.buyBtn} btn btn-primary`}>
              Comprar Ahora
            </Link>
            <button
              className={styles.menuBtn}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <span className={`${styles.menuLine} ${mobileOpen ? styles.line1Open : ''}`} />
              <span className={`${styles.menuLine} ${mobileOpen ? styles.line2Open : ''}`} />
              <span className={`${styles.menuLine} ${mobileOpen ? styles.line3Open : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!mobileOpen}
      >
        <nav aria-label="Navegación móvil">
          <ul className={styles.mobileNavList}>
            {navLinks.map((link, idx) => (
              <li
                key={link.href}
                className={styles.mobileNavItem}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {link.href.startsWith('/') ? (
                  <Link href={link.href} className={styles.mobileNavLink} onClick={closeMobile}>
                    {link.label}
                  </Link>
                ) : (
                  <a href={link.href} className={styles.mobileNavLink} onClick={closeMobile}>
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <div className={styles.mobileCta}>
            <Link href="/ventas" className="btn btn-primary" onClick={closeMobile}>
              Comprar Ahora
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className={styles.overlay} onClick={closeMobile} aria-hidden="true" />
      )}
    </>
  )
}
