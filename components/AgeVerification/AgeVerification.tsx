'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './AgeVerification.module.css'

interface AgeVerificationProps {
  onVerified?: () => void
}

export default function AgeVerification({ onVerified }: AgeVerificationProps) {
  const [visible, setVisible] = useState(false)
  const confirmed = useRef(false)

  useEffect(() => {
    const verified = sessionStorage.getItem('sv_age_ok')
    if (!verified) setVisible(true)
  }, [])

  const confirm = () => {
    if (confirmed.current) return
    confirmed.current = true
    sessionStorage.setItem('sv_age_ok', '1')
    setVisible(false)
    onVerified?.()
  }

  const deny = () => {
    window.location.href = 'https://www.instagram.com/sangria.victoria/'
  }

  if (!visible) return null

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="age-title">
      <div className={styles.modal}>
        <div className={styles.topLine} aria-hidden="true" />

        <div className={styles.badgeWrapper} aria-hidden="true">
          <div className={styles.badge}>
            <span>+18</span>
          </div>
        </div>

        <div className={styles.brand} aria-hidden="true">
          <span className={styles.brandText}>Victoria</span>
          <span className={styles.brandSub}>Sangría Premium</span>
        </div>

        <h1 id="age-title" className={`heading-md ${styles.title}`}>
          ¿Eres mayor de 18 años?
        </h1>
        <p className={`body-md ${styles.text}`}>
          Este sitio es exclusivo para mayores de edad. Por favor confirma tu edad
          para continuar.
        </p>

        <div className={styles.actions}>
          <button className={`btn btn-primary ${styles.confirmBtn}`} onClick={confirm} autoFocus>
            Sí, tengo 18 o más
          </button>
          <button className={`btn btn-secondary ${styles.denyBtn}`} onClick={deny}>
            No, soy menor
          </button>
        </div>

        <p className={styles.disclaimer}>
          Al ingresar confirmas que tienes la edad legal para consumir bebidas
          alcohólicas en tu país. Bebe responsablemente.
        </p>
      </div>
    </div>
  )
}
