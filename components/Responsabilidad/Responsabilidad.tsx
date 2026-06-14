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
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
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
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
        <circle cx="12" cy="12" r="3"/>
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
          viewport={{}}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.ageWarning} role="note">
            <span className={styles.ageBadge} aria-label="Solo para mayores de 18 años">+18</span>
            <p>
              Sangría Victoria es una bebida alcohólica. <strong>Solo para mayores de 18 años.</strong>
              <br />
              Si vas a conducir, no bebas.
            </p>
          </div>
        </motion.div>

        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{}}
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
              En Sangría Victoria creemos que disfrutar de nuestros productos es una experiencia que viene acompañada de responsabilidad. Por eso trabajamos cada día para garantizar la calidad de nuestros procesos y el impacto positivo en nuestra comunidad y el medio ambiente.
            </p>
          </div>

          <div className={styles.pillars}>
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                className={styles.pillar}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{}}
                transition={{ delay: idx * 0.15 }}
              >
                <div className={styles.pillarIcon}>{pillar.icon}</div>
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                <p className={styles.pillarText}>{pillar.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
