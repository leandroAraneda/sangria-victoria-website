'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Contacto.module.css'

export default function Contacto() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section id="contacto" className={styles.section} aria-labelledby="contacto-title">
      <div className={styles.container}>
        <div className={styles.layout}>
          {/* Left info */}
          <motion.div
            className={styles.info}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{}}
            transition={{ duration: 0.7 }}
          >
            <div className="gold-divider">
              <span className="section-tag">Contacto</span>
            </div>
            <h2 id="contacto-title" className="heading-lg">
              Hablemos <em className={styles.titleAccent}>Juntos</em>
            </h2>
            <p className={`body-lg ${styles.infoText}`}>
              ¿Tienes preguntas sobre nuestros productos, deseas convertirte en
              distribuidor o simplemente quieres saber más sobre Sangría Victoria?
              Estamos aquí para ayudarte.
            </p>

            <div className={styles.contactCards}>
              <div className={styles.contactCard}>
                <div className={styles.contactIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <p className={styles.contactLabel}>Ubicación</p>
                  <p className={styles.contactValue}>Curicó, Región del Maule, Chile</p>
                </div>
              </div>

              <div className={styles.contactCard}>
                <div className={styles.contactIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.12 6.12l1.79-1.79a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <p className={styles.contactLabel}>Teléfono</p>
                  <a href="tel:+56752341234" className={styles.contactLink}>+56 75 234 1234</a>
                </div>
              </div>

              <div className={styles.contactCard}>
                <div className={styles.contactIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </div>
                <div>
                  <p className={styles.contactLabel}>Correo</p>
                  <a href="mailto:hola@sangriavictoria.cl" className={styles.contactLink}>
                    hola@sangriavictoria.cl
                  </a>
                </div>
              </div>

              <div className={styles.contactCard}>
                <div className={styles.contactIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <p className={styles.contactLabel}>Horario</p>
                  <p className={styles.contactValue}>Lun–Vie 09:00–18:00</p>
                </div>
              </div>
            </div>

            <div className={styles.social}>
              <p className={styles.socialLabel}>Síguenos</p>
              <div className={styles.socialLinks}>
                <a
                  href="https://www.instagram.com/sangria.victoria/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  aria-label="Instagram de Sangría Victoria"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/sangria.victoria.2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  aria-label="Facebook de Sangría Victoria"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                  Facebook
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            className={styles.formWrapper}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {submitted ? (
              <motion.div
                className={styles.success}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className={styles.successIcon} aria-hidden="true">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3 className="heading-sm">Mensaje Enviado</h3>
                <p className={`body-md ${styles.successText}`}>
                  Gracias por contactarnos. Responderemos en menos de 24 horas
                  hábiles.
                </p>
                <button
                  className={`btn btn-secondary ${styles.newMsgBtn}`}
                  onClick={() => { setSubmitted(false); setForm({ nombre: '', email: '', asunto: '', mensaje: '' }) }}
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form} noValidate>
                <h3 className={`heading-sm ${styles.formTitle}`}>Envíanos un Mensaje</h3>

                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label htmlFor="nombre" className={styles.label}>Nombre</label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      required
                      placeholder="Tu nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="email" className={styles.label}>Correo electrónico</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="tu@email.cl"
                      value={form.email}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="asunto" className={styles.label}>Asunto</label>
                  <select
                    id="asunto"
                    name="asunto"
                    required
                    value={form.asunto}
                    onChange={handleChange}
                    className={styles.select}
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="consulta">Consulta general</option>
                    <option value="distribucion">Quiero ser distribuidor</option>
                    <option value="pedido">Consulta sobre pedido</option>
                    <option value="prensa">Prensa y medios</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label htmlFor="mensaje" className={styles.label}>Mensaje</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    required
                    rows={5}
                    placeholder="Escribe tu mensaje aquí..."
                    value={form.mensaje}
                    onChange={handleChange}
                    className={styles.textarea}
                  />
                </div>

                <button
                  type="submit"
                  className={`btn btn-primary ${styles.submitBtn}`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className={styles.spinner} aria-hidden="true" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <line x1="22" x2="11" y1="2" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
