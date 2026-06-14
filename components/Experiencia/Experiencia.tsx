'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from './Experiencia.module.css'

const experiences = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3"/>
        <path d="M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3"/>
        <path d="M12 3v18"/>
      </svg>
    ),
    title: 'Cómo Servir',
    description:
      'Sirve bien fría sobre hielo abundante. Añade rodajas de naranja y unas hojas de menta para realzar sus aromas.',
    tip: 'Temperatura ideal: 4-8°C',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M3 2l2.519 3.408A2 2 0 0 0 7.134 6H16.866a2 2 0 0 0 1.615-.592L21 2"/>
        <path d="M3 2h18"/>
        <path d="M10 10.5a1.5 1.5 0 1 0 3 0c0-1.5-3-3-3-3"/>
        <path d="M12 16v6"/>
        <path d="M8 22h8"/>
      </svg>
    ),
    title: 'Maridajes',
    description:
      'Acompáñala con tapas españolas, jamón serrano, quesos curados, empanadas chilenas y frutos del mar.',
    tip: 'Perfecta con paella y mariscos',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 2v10"/>
        <path d="m4.93 10.93 1.41 1.41"/>
        <path d="M2 18h2"/>
        <path d="M20 18h2"/>
        <path d="m19.07 10.93-1.41 1.41"/>
        <path d="M22 22H2"/>
        <path d="m16 6-4 4-4-4"/>
        <path d="M16 18a4 4 0 0 0-8 0"/>
      </svg>
    ),
    title: 'Eventos',
    description:
      'La Sangría Victoria es el complemento perfecto para bodas, celebraciones corporativas y reuniones de gala.',
    tip: 'Ideal para grupos de 10 o más personas',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M21 11V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"/>
        <path d="m12 12 4 10 1.7-4.3L22 16Z"/>
      </svg>
    ),
    title: 'Celebraciones',
    description:
      'Desde cumpleaños íntimos hasta grandes recepciones, Victoria añade un toque de elegancia a cualquier ocasión.',
    tip: 'Personaliza tu orden para eventos',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.3-4.3"/>
      </svg>
    ),
    title: 'Aperitivos',
    description:
      'Perfecta como aperitivo antes de una comida especial, acompañada de aceitunas, frutos secos y queso manchego.',
    tip: 'Sirve en copa de vino grande',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M2 12h20"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Verano & Playa',
    description:
      'La compañera ideal para días calurosos. Refrescante, veraniega y con toda la vitalidad de los viñedos del sur.',
    tip: 'Añade frutas de estación frescas',
  },
]

export default function Experiencia() {
  return (
    <section id="experiencia" className={styles.section} aria-labelledby="experiencia-title">
      {/* Background image */}
      <div className={styles.bgWrapper} aria-hidden="true">
        <Image
          src="/images/experiencia-copas.png"
          alt=""
          fill
          style={{ objectFit: 'cover' }}
          quality={80}
        />
        <div className={styles.bgOverlay} />
      </div>

      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{}}
          transition={{ duration: 0.7 }}
        >
          <div className="gold-divider">
            <span className="section-tag">La Experiencia</span>
          </div>
          <h2 id="experiencia-title" className="heading-lg">
            Experiencia <em className={styles.titleAccent}>Victoria</em>
          </h2>
          <p className={`body-lg ${styles.subtitle}`}>
            Descubre todos los momentos en que Sangría Victoria puede convertir
            lo ordinario en extraordinario.
          </p>
        </motion.div>

        <div className={styles.grid} role="list">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.title}
              className={styles.card}
              role="listitem"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{}}
              transition={{ delay: idx * 0.08, duration: 0.6 }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <div className={styles.iconWrapper} aria-hidden="true">
                {exp.icon}
              </div>
              <h3 className={styles.cardTitle}>{exp.title}</h3>
              <p className={styles.cardText}>{exp.description}</p>
              <div className={styles.tip}>
                <span className={styles.tipDot} aria-hidden="true" />
                <span>{exp.tip}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
