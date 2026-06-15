'use client'

import { useEffect, useCallback, useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './ImageViewer.module.css'

interface ImageViewerProps {
  images: { src: string; alt: string }[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

const MIN_ZOOM = 1
const MAX_ZOOM = 2.5
const ZOOM_STEP = 0.15

export default function ImageViewer({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}: ImageViewerProps) {
  const [zoomLevel, setZoomLevel] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [isDraggingZoom, setIsDraggingZoom] = useState(false)
  const pinchStartDistance = useRef<number | null>(null)
  const pinchStartZoom = useRef(1)
  const dragStart = useRef({ x: 0, y: 0 })
  const positionRef = useRef({ x: 0, y: 0 })
  const imageRef = useRef<HTMLDivElement>(null)
  const zoomTrackRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    },
    [onClose, onNext, onPrev]
  )

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  useEffect(() => {
    if (!isOpen) {
      setZoomLevel(1)
      setPosition({ x: 0, y: 0 })
    }
  }, [isOpen])

  useEffect(() => {
    if (zoomLevel === 1) {
      setPosition({ x: 0, y: 0 })
    }
  }, [zoomLevel])

  if (images.length === 0) return null

  const currentImage = images[currentIndex]

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP
    const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoomLevel + delta))
    setZoomLevel(newZoom)

    if (newZoom === 1) {
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(true)
      dragStart.current = { x: e.clientX - positionRef.current.x, y: e.clientY - positionRef.current.y }
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault()
      e.stopPropagation()
      const distance = getTouchDistance(e.touches[0], e.touches[1])
      pinchStartDistance.current = distance
      pinchStartZoom.current = zoomLevel
      setIsDragging(false)
    } else if (zoomLevel > 1 && e.touches.length === 1) {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(true)
      dragStart.current = { x: e.touches[0].clientX - positionRef.current.x, y: e.touches[0].clientY - positionRef.current.y }
    }
  }

  const getTouchDistance = (t1: React.Touch | Touch, t2: React.Touch | Touch) => {
    const dx = t1.clientX - t2.clientX
    const dy = t1.clientY - t2.clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      const newX = e.clientX - dragStart.current.x
      const newY = e.clientY - dragStart.current.y

      const maxPan = calculateMaxPan()
      const clampedX = Math.min(maxPan.x, Math.max(-maxPan.x, newX))
      const clampedY = Math.min(maxPan.y, Math.max(-maxPan.y, newY))

      positionRef.current = { x: clampedX, y: clampedY }
      setPosition({ x: clampedX, y: clampedY })
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchStartDistance.current !== null) {
      e.preventDefault()
      e.stopPropagation()
      const distance = getTouchDistance(e.touches[0], e.touches[1])
      const scale = distance / pinchStartDistance.current
      const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, pinchStartZoom.current * scale))
      setZoomLevel(newZoom)
      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 })
      }
    } else if (isDragging && zoomLevel > 1 && e.touches.length === 1) {
      const newX = e.touches[0].clientX - dragStart.current.x
      const newY = e.touches[0].clientY - dragStart.current.y

      const maxPan = calculateMaxPan()
      const clampedX = Math.min(maxPan.x, Math.max(-maxPan.x, newX))
      const clampedY = Math.min(maxPan.y, Math.max(-maxPan.y, newY))

      positionRef.current = { x: clampedX, y: clampedY }
      setPosition({ x: clampedX, y: clampedY })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchEnd = (e?: React.TouchEvent) => {
    setIsDragging(false)
    if (e && e.touches.length < 2) {
      pinchStartDistance.current = null
    }
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const calculateMaxPan = () => {
    if (!imageRef.current) return { x: 0, y: 0 }
    const containerWidth = imageRef.current.offsetWidth
    const containerHeight = imageRef.current.offsetHeight
    const maxX = (containerWidth * (zoomLevel - 1)) / 2
    const maxY = (containerHeight * (zoomLevel - 1)) / 2
    return { x: maxX, y: maxY }
  }

  const zoomPercentage = Math.round(((zoomLevel - MIN_ZOOM) / (MAX_ZOOM - MIN_ZOOM)) * 100)

  const handleZoomTrackInteraction = (clientX: number) => {
    if (!zoomTrackRef.current) return
    const rect = zoomTrackRef.current.getBoundingClientRect()
    const offsetX = clientX - rect.left
    const percentage = Math.min(100, Math.max(0, (offsetX / rect.width) * 100))
    const newZoom = MIN_ZOOM + (percentage / 100) * (MAX_ZOOM - MIN_ZOOM)
    setZoomLevel(newZoom)
    if (newZoom === 1) {
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleZoomIndicatorMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingZoom(true)
  }

  const handleZoomIndicatorTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingZoom(true)
  }

  useEffect(() => {
    if (!isDraggingZoom) return

    const handleMouseMoveGlobal = (e: MouseEvent) => {
      handleZoomTrackInteraction(e.clientX)
    }

    const handleTouchMoveGlobal = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleZoomTrackInteraction(e.touches[0].clientX)
      }
    }

    const handleMouseUpGlobal = () => {
      setIsDraggingZoom(false)
    }

    const handleTouchEndGlobal = () => {
      setIsDraggingZoom(false)
    }

    window.addEventListener('mousemove', handleMouseMoveGlobal)
    window.addEventListener('mouseup', handleMouseUpGlobal)
    window.addEventListener('touchmove', handleTouchMoveGlobal)
    window.addEventListener('touchend', handleTouchEndGlobal)

    return () => {
      window.removeEventListener('mousemove', handleMouseMoveGlobal)
      window.removeEventListener('mouseup', handleMouseUpGlobal)
      window.removeEventListener('touchmove', handleTouchMoveGlobal)
      window.removeEventListener('touchend', handleTouchEndGlobal)
    }
  }, [isDraggingZoom])

  const handleZoomTrackClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    handleZoomTrackInteraction(e.clientX)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <div className={styles.container} onClick={onClose}>
            <motion.div
              className={styles.imageWrapper}
              ref={imageRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              onWheel={handleWheel}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={styles.imageInner}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                  cursor: isDragging ? 'grabbing' : zoomLevel > 1 ? 'grab' : 'zoom-in',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
                    transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                    transformOrigin: 'center center',
                  }}
                >
                  <Image
                    src={currentImage.src}
                    alt={currentImage.alt}
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                    quality={90}
                    draggable={false}
                  />
                </div>

                <div
                  className={styles.zoomBar}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    className={styles.zoomTrack}
                    ref={zoomTrackRef}
                    onClick={handleZoomTrackClick}
                    onMouseDown={(e) => {
                      if (e.target === zoomTrackRef.current) {
                        handleZoomTrackInteraction(e.clientX)
                      }
                    }}
                  >
                    <div
                      className={styles.zoomIndicator}
                      style={{
                        left: `${zoomPercentage}%`,
                        cursor: isDraggingZoom ? 'grabbing' : 'grab',
                      }}
                      onMouseDown={handleZoomIndicatorMouseDown}
                      onTouchStart={handleZoomIndicatorTouchStart}
                      onClick={(e) => e.stopPropagation()}
                      role="slider"
                      aria-label="Control de zoom"
                      aria-valuemin={MIN_ZOOM}
                      aria-valuemax={MAX_ZOOM}
                      aria-valuenow={zoomLevel}
                    />
                  </div>
                  <span className={styles.zoomLabel}>{Math.round(zoomLevel * 100)}%</span>
                </div>
              </div>
            </motion.div>

            <button
              className={styles.closeBtn}
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              aria-label="Cerrar visor"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {images.length > 1 && (
              <>
                <div className={styles.counter}>
                  <span className={styles.counterCurrent}>{currentIndex + 1}</span>
                  <span className={styles.counterDivider}>/</span>
                  <span className={styles.counterTotal}>{images.length}</span>
                </div>

                <div className={styles.dotsRow}>
                  <button
                    className={styles.navBtnPrevMobile}
                    onClick={(e) => {
                      e.stopPropagation()
                      onPrev()
                    }}
                    aria-label="Imagen anterior"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>

                  <div className={styles.dots}>
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        className={`${styles.dot} ${idx === currentIndex ? styles.dotActive : ''}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          if (idx !== currentIndex) onNext()
                        }}
                        aria-label={`Ir a imagen ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    className={styles.navBtnNextMobile}
                    onClick={(e) => {
                      e.stopPropagation()
                      onNext()
                    }}
                    aria-label="Siguiente imagen"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
