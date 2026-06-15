'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from './Hero.module.css'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' as const, delay },
  }),
}

interface HeroProps {
  startAnimation?: boolean
}

export default function Hero({ startAnimation = true }: HeroProps) {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return
      const scrollY = window.scrollY
      parallaxRef.current.style.transform = `translateY(${scrollY * 0.35}px)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const animState = startAnimation ? 'visible' : 'hidden'

  return (
    <section id="inicio" className={styles.hero} aria-label="Inicio - Sangría Victoria">
      {/* Background */}
      <div className={`${styles.bgWrapper} frost-overlay`} ref={parallaxRef}>
        <Image
          src="/images/hero-bg.png"
          alt="Sangría Victoria Premium - Viñedos de Curicó"
          fill
          priority
          quality={90}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className={styles.bgOverlay} aria-hidden="true" />
      </div>

      {/* Decorative gold lines */}
      <div className={styles.goldLineLeft} aria-hidden="true" />
      <div className={styles.goldLineRight} aria-hidden="true" />

      {/* Content */}
      <div className={styles.content}>
        <motion.h1
          className={styles.title}
          initial="hidden"
          animate={animState}
          custom={0.1}
          variants={fadeUp}
        >
          Sangría Premium
          <br />
          <em className={styles.titleAccent}>Elaborada en Curicó</em>
        </motion.h1>

        <motion.div
          className={styles.tagWrapper}
          initial="hidden"
          animate={animState}
          custom={0.3}
          variants={fadeUp}
        >
          <span className={styles.tag}>Valle de Curicó, Chile</span>
        </motion.div>

        <motion.p
          className={styles.subtitle}
          initial="hidden"
          animate={animState}
          custom={0.5}
          variants={fadeUp}
        >
          Tradición, calidad y sabor en cada copa.
          <br />
          Artesanal, auténtica, inigualable.
        </motion.p>

        <motion.div
          className={styles.buttons}
          initial="hidden"
          animate={animState}
          custom={0.7}
          variants={fadeUp}
        >
          <Link href="/ventas" className={`btn btn-primary ${styles.btnHero}`}>
            Comprar Ahora
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          className={styles.stats}
          initial="hidden"
          animate={animState}
          custom={0.9}
          variants={fadeUp}
        >
          <div className={styles.stat}>
            <span className={styles.statNumber} style={{ animationDelay: '0s' }}>100%</span>
            <span className={styles.statLabel}>Artesanal</span>
          </div>
          <div className={styles.statDivider} aria-hidden="true" />
          <div className={styles.stat}>
            <span className={styles.statNumber} style={{ animationDelay: '1.5s' }}>+5</span>
            <span className={styles.statLabel}>Variedades</span>
          </div>
          <div className={styles.statDivider} aria-hidden="true" />
          <div className={styles.stat}>
            <span className={styles.statNumber} style={{ animationDelay: '3s' }}>Curicó</span>
            <span className={styles.statLabel}>Valle Premium</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
