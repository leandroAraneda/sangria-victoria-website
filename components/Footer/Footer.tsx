import Link from 'next/link'
import styles from './Footer.module.css'

const navLinks = [
  { label: 'Historia', href: '/#historia' },
  { label: 'Productos', href: '/#productos' },
  { label: 'Experiencia', href: '/#experiencia' },
  { label: 'Recetas', href: '/#recetas' },
  { label: 'Distribuidores', href: '/#distribuidores' },
  { label: 'Contacto', href: '/#contacto' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer} role="contentinfo">
      {/* Wave divider tropical superior */}
      <div className={styles.waveTop} aria-hidden="true">
        <svg viewBox="0 0 1440 50" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,25 C180,50 360,0 540,25 C720,50 900,0 1080,25 C1260,50 1440,0 1440,25 L1440,50 L0,50 Z"
            fill="var(--negro)"
          />
        </svg>
      </div>
      <div className={styles.container}>
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo} aria-label="Sangría Victoria — Inicio">
              <span className={styles.logoText}>Victoria</span>
              <span className={styles.logoSub}>Sangría Premium</span>
            </Link>
            <p className={styles.tagline}>
              Elaborada artesanalmente en el corazón del Valle de Curicó,
              Chile. Una tradición de sabor y calidad desde nuestra familia a la tuya.
            </p>
            <div className={styles.socialRow}>
              <a
                href="https://www.instagram.com/sangria.victoria/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram de Sangría Victoria"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/sangria.victoria.2025"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Facebook de Sangría Victoria"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <p className={styles.colTitle}>Productos</p>
            <ul className={styles.linkList}>
              <li><Link href="/ventas" className={styles.navLink}>Ver Todos</Link></li>
            </ul>
          </div>

          {/* Nav */}
          <nav aria-label="Navegación del footer">
            <p className={styles.colTitle}>Navegación</p>
            <ul className={styles.linkList}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={styles.navLink}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className={styles.colTitle}>Contacto</p>
            <address className={styles.address}>
              <p>
                <a href="mailto:hola@sangriavictoria.cl" className={styles.navLink}>
                  hola@sangriavictoria.cl
                </a>
              </p>
              <p>
                <a href="tel:+56752341234" className={styles.navLink}>
                  +56 75 234 1234
                </a>
              </p>
              <p className={styles.addressText}>Curicó, Región del Maule</p>
              <p className={styles.addressText}>Chile</p>
            </address>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {year} Sangría Victoria. Todos los derechos reservados.
          </p>
          <div className={styles.legal}>
            <a href="#" className={styles.legalLink}>Política de Privacidad</a>
            <a href="#" className={styles.legalLink}>Términos de Uso</a>
            <span className={styles.ageNote} role="note">Solo para mayores de 18 años</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
