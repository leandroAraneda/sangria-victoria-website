'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { recipes } from '@/lib/data'
import styles from './Recetas.module.css'

const difficultyColor = {
  Fácil: '#4caf83',
  Medio: '#D59E52',
  Difícil: '#c96d5d',
}

export default function Recetas() {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selectedRecipe = recipes.find((r) => r.id === selectedId)

  return (
    <section id="recetas" className={styles.section} aria-labelledby="recetas-title">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{}}
          transition={{ duration: 0.7 }}
        >
          <div className="gold-divider">
            <span className="section-tag">Recetas & Cócteles</span>
          </div>
          <h2 id="recetas-title" className="heading-lg">
            Inspírate con Nuestras <em className={styles.titleAccent}>Recetas</em>
          </h2>
          <p className={`body-lg ${styles.subtitle}`}>
            Descubre cómo crear momentos únicos con cada botella de Sangría Victoria.
          </p>
        </motion.div>

        <div className={styles.layout}>
          {/* Recipe Grid */}
          <div
            className={`${styles.grid} ${selectedId ? styles.gridCompact : ''}`}
            role="list"
          >
            {recipes.map((recipe, idx) => (
              <motion.article
                key={recipe.id}
                className={`${styles.card} ${selectedId === recipe.id ? styles.cardActive : ''}`}
                role="listitem"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ amount: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedId(selectedId === recipe.id ? null : recipe.id)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedId(selectedId === recipe.id ? null : recipe.id)
                  }
                }}
                aria-expanded={selectedId === recipe.id}
                aria-label={`Receta ${recipe.name}, tiempo ${recipe.time}, dificultad ${recipe.difficulty}`}
              >
                <div className={styles.cardImage}>
                  <Image
                    src={recipe.image}
                    alt={recipe.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className={styles.cardImageOverlay} aria-hidden="true" />
                  <span className={styles.recipeTag}>{recipe.tag}</span>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    <span className={styles.time}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                      {recipe.time}
                    </span>
                    <span
                      className={styles.difficulty}
                      style={{ color: difficultyColor[recipe.difficulty] }}
                    >
                      {recipe.difficulty}
                    </span>
                    <span className={styles.servings}>
                      {recipe.servings} porciones
                    </span>
                  </div>
                  <h3 className={styles.cardTitle}>{recipe.name}</h3>
                  <p className={styles.cardDesc}>{recipe.description}</p>
                  <div className={styles.expandIcon} aria-hidden="true">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{
                        transform: selectedId === recipe.id ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.3s ease',
                      }}
                    >
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Detail Panel */}
          <AnimatePresence mode="wait">
            {selectedRecipe && (
              <motion.aside
                key={selectedRecipe.id}
                className={styles.detail}
                initial={{ opacity: 0, x: 50, width: 0 }}
                animate={{ opacity: 1, x: 0, width: 380 }}
                exit={{ opacity: 0, x: 50, width: 0 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                aria-label={`Detalle de receta: ${selectedRecipe.name}`}
              >
                <div className={styles.detailImage}>
                  <Image
                    src={selectedRecipe.image}
                    alt={selectedRecipe.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className={styles.detailImageOverlay} aria-hidden="true" />
                </div>

                <div className={styles.detailContent}>
                  <span className={styles.detailTag}>{selectedRecipe.tag}</span>
                  <h3 className={styles.detailTitle}>{selectedRecipe.name}</h3>

                  <div className={styles.detailMeta}>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Tiempo</span>
                      <span className={styles.metaValue}>{selectedRecipe.time}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Dificultad</span>
                      <span className={styles.metaValue}>{selectedRecipe.difficulty}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Porciones</span>
                      <span className={styles.metaValue}>{selectedRecipe.servings}</span>
                    </div>
                  </div>

                  <div className={styles.ingredients}>
                    <h4 className={styles.listTitle}>Ingredientes</h4>
                    <ul className={styles.ingredientList}>
                      {selectedRecipe.ingredients.map((ing) => (
                        <li key={ing} className={styles.ingredientItem}>
                          <span className={styles.bullet} aria-hidden="true" />
                          {ing}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.steps}>
                    <h4 className={styles.listTitle}>Preparación</h4>
                    <ol className={styles.stepList}>
                      {selectedRecipe.steps.map((step, i) => (
                        <li key={i} className={styles.stepItem}>
                          <span className={styles.bullet} aria-hidden="true" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
