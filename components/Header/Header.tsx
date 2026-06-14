'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useCart } from '@/lib/CartContext'
import { useTheme } from '@/lib/ThemeContext'
import styles from './Header.module.css'

const navLinks = [
  { href: '/#historia', label: 'Nuestra Historia' },
  { href: '/#productos', label: 'Productos' },
  { href: '/#experiencia', label: 'Experiencia Victoria' },
  { href: '/#recetas', label: 'Recetas' },
  { href: '/#distribuidores', label: 'Distribuidores' },
  { href: '/ventas', label: 'Ventas' },
  { href: '/#contacto', label: 'Contacto' },
]

export default function Header({ forceScrolled = false }: { forceScrolled?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { totalItems, openCart } = useCart()
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60)
  }, [])

  useEffect(() => {
    if (forceScrolled) {
      setScrolled(true)
      return
    }
    setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll, forceScrolled])

  const handleHashLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const hash = href.replace('/', '')
    closeMobile()

    if (pathname === '/') {
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      router.push('/')
      setTimeout(() => {
        const target = document.querySelector(hash)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 300)
    }
  }

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      <header
        className={`${styles.header} ${(scrolled || forceScrolled) ? styles.scrolled : styles.transparent}`}
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
                  {link.href.startsWith('/#') ? (
                    <a
                      href={link.href}
                      className={styles.navLink}
                      onClick={(e) => handleHashLink(e, link.href)}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className={styles.navLink} onClick={closeMobile}>
                      {link.label}
                    </Link>
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
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              aria-pressed={theme === 'light'}
              title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
            >
              {theme === 'dark' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
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
                {link.href.startsWith('/#') ? (
                  <a
                    href={link.href}
                    className={styles.mobileNavLink}
                    onClick={(e) => handleHashLink(e, link.href)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link href={link.href} className={styles.mobileNavLink} onClick={closeMobile}>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className={styles.mobileCta}>
            <button
              className={styles.mobileThemeToggle}
              onClick={() => { toggleTheme(); closeMobile() }}
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {theme === 'dark' ? '☀ Modo Claro' : '☾ Modo Oscuro'}
            </button>
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
