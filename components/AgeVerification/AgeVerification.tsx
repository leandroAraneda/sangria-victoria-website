'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './AgeVerification.module.css'

export default function AgeVerification() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const verified = sessionStorage.getItem('sv_age_ok')
    if (!verified) setVisible(true)
  }, [])

  const confirm = () => {
    sessionStorage.setItem('sv_age_ok', '1')
    setVisible(false)
  }

  const deny = () => {
    // Redirect to a safe page
    window.location.href = 'https://www.who.int/es'
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="age-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28, delay: 0.1 }}
          >
            {/* Decorative top line */}
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
              <button
                className={`btn btn-primary ${styles.confirmBtn}`}
                onClick={confirm}
                autoFocus
              >
                Sí, tengo 18 o más
              </button>
              <button
                className={`btn btn-secondary ${styles.denyBtn}`}
                onClick={deny}
              >
                No, soy menor
              </button>
            </div>

            <p className={styles.disclaimer}>
              Al ingresar confirmas que tienes la edad legal para consumir bebidas
              alcohólicas en tu país. Bebe responsablemente.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
