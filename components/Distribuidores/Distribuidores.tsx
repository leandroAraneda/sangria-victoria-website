'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { distributors, regions } from '@/lib/data'
import styles from './Distribuidores.module.css'

const typeColors: Record<string, string> = {
  Retail: '#C9A15D',
  Restaurante: '#4caf83',
  Hotel: '#6d9ecf',
  Supermercado: '#c96d5d',
}

export default function Distribuidores() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('Todas las Regiones')
  const [selectedType, setSelectedType] = useState('Todos')

  const filtered = useMemo(() => {
    return distributors.filter((d) => {
      const matchSearch =
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.city.toLowerCase().includes(searchQuery.toLowerCase())
      const matchRegion =
        selectedRegion === 'Todas las Regiones' || d.region === selectedRegion
      const matchType = selectedType === 'Todos' || d.type === selectedType
      return matchSearch && matchRegion && matchType
    })
  }, [searchQuery, selectedRegion, selectedType])

  return (
    <section id="distribuidores" className={styles.section} aria-labelledby="distribuidores-title">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="gold-divider">
            <span className="section-tag">Red de Distribución</span>
          </div>
          <h2 id="distribuidores-title" className="heading-lg">
            Encuéntranos <em className={styles.titleAccent}>Cerca de Ti</em>
          </h2>
          <p className={`body-lg ${styles.subtitle}`}>
            Busca el distribuidor más cercano y disfruta de Sangría Victoria
            en tu ciudad.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className={styles.filters}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {/* Search */}
          <div className={styles.searchWrapper}>
            <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              type="search"
              placeholder="Buscar por nombre o ciudad..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              aria-label="Buscar distribuidor"
            />
          </div>

          {/* Region Filter */}
          <div className={styles.selectWrapper}>
            <label htmlFor="region-filter" className="sr-only">
              Filtrar por región
            </label>
            <select
              id="region-filter"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className={styles.select}
            >
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Type filter */}
          <div className={styles.typeFilters} role="group" aria-label="Filtrar por tipo">
            {['Todos', 'Retail', 'Restaurante', 'Hotel', 'Supermercado'].map((type) => (
              <button
                key={type}
                className={`${styles.typeBtn} ${selectedType === type ? styles.typeBtnActive : ''}`}
                onClick={() => setSelectedType(type)}
                aria-pressed={selectedType === type}
              >
                {type}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results count */}
        <div className={styles.resultsCount} aria-live="polite">
          <span>
            {filtered.length} distribuidor{filtered.length !== 1 ? 'es' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Results Grid */}
        {filtered.length === 0 ? (
          <motion.div
            className={styles.empty}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
            <p>No se encontraron distribuidores con esos criterios.</p>
          </motion.div>
        ) : (
          <div className={styles.grid} role="list">
            {filtered.map((dist, idx) => (
              <motion.article
                key={dist.id}
                className={styles.card}
                role="listitem"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className={styles.cardHeader}>
                  <div
                    className={styles.typeBadge}
                    style={{ color: typeColors[dist.type], borderColor: `${typeColors[dist.type]}40`, background: `${typeColors[dist.type]}10` }}
                  >
                    {dist.type}
                  </div>
                  <div className={styles.cityBadge}>{dist.city}</div>
                </div>

                <h3 className={styles.distName}>{dist.name}</h3>

                <div className={styles.distInfo}>
                  <div className={styles.infoRow}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span>{dist.address}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.12 6.12l1.79-1.79a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    <a href={`tel:${dist.phone}`} className={styles.distPhone}>{dist.phone}</a>
                  </div>
                  <div className={styles.infoRow}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                      <polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                    <span>{dist.region}</span>
                  </div>
                </div>

                <a
                  href={`https://maps.google.com/?q=${dist.lat},${dist.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapBtn}
                  aria-label={`Ver ${dist.name} en Google Maps`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  Ver en Mapa
                </a>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
