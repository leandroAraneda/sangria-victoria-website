'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from './Historia.module.css'

const timelineItems = [
  {
    year: '1987',
    title: 'Los Orígenes',
    text: 'La familia fundadora comienza a producir vinos artesanales en el corazón del Valle de Curicó, tierra bendecida por el sol y regada por el río Teno.',
  },
  {
    year: '2005',
    title: 'Nace Victoria',
    text: 'Inspirados en la tradición española y el sabor único de los ingredientes chilenos, creamos la primera receta de Sangría Victoria, fusionando lo mejor de dos mundos.',
  },
  {
    year: '2015',
    title: 'Expansión Nacional',
    text: 'Sangría Victoria conquista los paladares de toda Chile, llegando a las principales ciudades y convirtiéndose en la sangría premium de referencia.',
  },
  {
    year: 'Hoy',
    title: 'Tradición y Futuro',
    text: 'Seguimos elaborando artesanalmente cada botella con los mismos valores de calidad, pasión y autenticidad que nos definen desde nuestros orígenes.',
  },
]

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export default function Historia() {
  return (
    <section id="historia" className={styles.section} aria-labelledby="historia-title">
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="gold-divider">
            <span className="section-tag">Nuestra Historia</span>
          </div>
          <h2 id="historia-title" className="heading-lg">
            Del Valle de Curicó
            <br />
            <em className={styles.titleItalic}>al Mundo</em>
          </h2>
          <p className={`body-lg ${styles.headerSubtitle}`}>
            Una historia de pasión, tradición y amor por la sangría artesanal que nació
            en el corazón de la zona vitivinícola más emblemática de Chile.
          </p>
        </motion.div>

        {/* Split grid */}
        <div className={styles.splitGrid}>
          {/* Images column */}
          <motion.div
            className={styles.imagesCol}
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className={styles.imageMain}>
              <Image
                src="/images/historia-vinedo.png"
                alt="Viñedos del Valle de Curicó - Sangría Victoria"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className={styles.imageTag} aria-label="Valle de Curicó, Chile">
                <span>Valle de Curicó, Chile</span>
              </div>
            </div>
            <div className={styles.imagesSmall}>
              <div className={styles.imageSmall}>
                <Image
                  src="/images/elaboracion.png"
                  alt="Elaboración artesanal de Sangría Victoria"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className={styles.imageSmall}>
                <Image
                  src="/images/barricas.png"
                  alt="Barricas de vino en bodega Victoria"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
          </motion.div>

          {/* Text column */}
          <motion.div
            className={styles.textCol}
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className={`body-lg ${styles.introText}`}>
              Sangría Victoria nació de la fusión entre la rica tradición vitivinícola del
              Valle de Curicó y la herencia sangritera española, creando una bebida que
              celebra lo mejor de ambas culturas.
            </p>

            {/* Timeline */}
            <div className={styles.timeline} role="list">
              {timelineItems.map((item, idx) => (
                <motion.div
                  key={item.year}
                  className={styles.timelineItem}
                  role="listitem"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                >
                  <div className={styles.timelineYear}>{item.year}</div>
                  <div className={styles.timelineContent}>
                    <h3 className={styles.timelineTitle}>{item.title}</h3>
                    <p className={`body-md ${styles.timelineText}`}>{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Values */}
            <div className={styles.values}>
              {['Artesanal', 'Premium', 'Auténtico', 'Chileno'].map((v) => (
                <span key={v} className={styles.valueTag}>
                  {v}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
