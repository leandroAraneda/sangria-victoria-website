'use client'

import { motion } from 'framer-motion'
import styles from './Responsabilidad.module.css'

const pillars = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Consumo Responsable',
    text: 'Promovemos activamente el consumo moderado y responsable de alcohol. Nuestros productos están destinados únicamente a mayores de 18 años.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M2 22 16 8M3.5 6.5C5.5 2 12 2 16 6c4 4 4 10.5 0.5 12.5"/>
        <path d="M21.5 21.5C9 23 3 17 3 7"/>
      </svg>
    ),
    title: 'Compromiso Ambiental',
    text: 'Trabajamos con viñedos que utilizan prácticas sustentables. Nuestros envases son reciclables y buscamos reducir nuestra huella de carbono cada año.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Comunidad Local',
    text: 'Apoyamos a productores locales del Valle de Curicó, generando empleo y fomentando el desarrollo económico de nuestra región.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 16v-4M12 8h.01"/>
      </svg>
    ),
    title: 'Transparencia',
    text: 'Todos nuestros ingredientes son declarados en la etiqueta. Creemos en la información clara y honesta para nuestros consumidores.',
  },
]

export default function Responsabilidad() {
  return (
    <section id="responsabilidad" className={styles.section} aria-labelledby="resp-title">
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.ageWarning} role="note">
            <span className={styles.ageBadge} aria-label="Solo para mayores de 18 años">+18</span>
            <p>
              Sangría Victoria es una bebida alcohólica. <strong>Solo para mayores de 18 años.</strong>{' '}
              Si vas a conducir, no bebas.
            </p>
          </div>
        </motion.div>

        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className={styles.textCol}>
            <div className="gold-divider">
              <span className="section-tag">Compromiso</span>
            </div>
            <h2 id="resp-title" className="heading-md">
              Responsabilidad <em className={styles.titleAccent}>Social y Ambiental</em>
            </h2>
            <p className={`body-lg ${styles.text}`}>
              En Sangría Victoria creemos que disfrutar de una buena bebida va de
              la mano con la responsabilidad hacia las personas y el planeta. Nuestro
              compromiso va más allá del sabor.
            </p>
          </div>

          <div className={styles.pillarsGrid} role="list">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                className={styles.pillar}
                role="listitem"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
              >
                <div className={styles.pillarIcon}>{pillar.icon}</div>
                <div>
                  <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                  <p className={`body-sm ${styles.pillarText}`}>{pillar.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
