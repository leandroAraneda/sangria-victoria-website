'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { testimonials } from '@/lib/data'
import styles from './Testimonios.module.css'

export default function Testimonios() {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, next])

  return (
    <section className={styles.section} aria-labelledby="testimonios-title">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{}}
          transition={{ duration: 0.7 }}
        >
          <div className="gold-divider">
            <span className="section-tag">Testimonios</span>
          </div>
          <h2 id="testimonios-title" className="heading-lg">
            Lo que Dicen Nuestros <em className={styles.titleAccent}>Clientes</em>
          </h2>
        </motion.div>

        <div
          className={styles.sliderWrapper}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          aria-live="polite"
          aria-atomic="true"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className={styles.slide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div className={styles.quoteIcon} aria-hidden="true">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>

              <blockquote className={styles.quote}>
                <p className={styles.quoteText}>
                  &ldquo;{testimonials[current].text}&rdquo;
                </p>
              </blockquote>

              <div className={styles.author}>
                <div className={styles.authorAvatar}>
                  <Image
                    src={testimonials[current].avatar}
                    alt={`Avatar de ${testimonials[current].name}`}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>{testimonials[current].name}</span>
                  <span className={styles.authorLocation}>{testimonials[current].location}</span>
                </div>
                <div className={styles.stars} aria-label={`Calificación: ${testimonials[current].rating} estrellas`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill={i < testimonials[current].rating ? 'var(--dorado)' : 'rgba(201,161,93,0.25)'}
                      aria-hidden="true"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className={styles.controls}>
            <button
              className={styles.navBtn}
              onClick={prev}
              aria-label="Testimonio anterior"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <div className={styles.dots} role="tablist" aria-label="Testimonios">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                  onClick={() => setCurrent(i)}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Testimonio ${i + 1} de ${testimonials.length}`}
                />
              ))}
            </div>
            <button
              className={styles.navBtn}
              onClick={next}
              aria-label="Siguiente testimonio"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Thumbnail row */}
        <div className={styles.thumbnails}>
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              className={`${styles.thumbnail} ${i === current ? styles.thumbnailActive : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Ver testimonio de ${t.name}`}
              aria-pressed={i === current}
            >
              <div className={styles.thumbnailImg}>
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="80px"
                />
              </div>
              <span className={styles.thumbnailName}>{t.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
