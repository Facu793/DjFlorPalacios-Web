import { useEffect, useRef, useState } from 'react'
import SoundCloudIcon from './SoundCloudIcon'
import Flag from 'country-flag-icons/react/3x2'

export default function App() {
  const canvasRef = useRef(null)
  const galleryImages = [
    '/image/galeria/1.JPEG',
    '/image/galeria/2.JPEG',
    '/image/galeria/3.JPG',
    '/image/galeria/4.JPEG',
    '/image/galeria/5.JPEG',
    '/image/galeria/6.JPEG',
    '/image/galeria/7.JPEG',
    '/image/galeria/8.JPEG',
    '/image/galeria/9.JPEG',
    '/image/galeria/10.JPEG',
    '/image/galeria/11.JPEG',
    '/image/galeria/12.JPEG',
    '/image/galeria/13.JPEG',
    '/image/galeria/15.JPG',
    '/image/galeria/14.jpeg',
  ]

  // Lightbox state for gallery
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  // Menu dropdown state
  const [menuOpen, setMenuOpen] = useState(false)
  // Language state
  const [language, setLanguage] = useState('es') // 'es' or 'en'
  
  // Translations
  const t = {
    es: {
      menu: {
        bio: 'Biografía',
        upcoming: 'Próximos Eventos',
        past: 'Eventos Pasados',
        gallery: 'Galería',
        video: 'Video Destacado',
        soundcloud: 'SoundCloud'
      },
      sections: {
        bio: 'Bio',
        upcoming: 'PRÓXIMOS EVENTOS',
        past: 'EVENTOS PASADOS',
        gallery: 'GALERÍA',
        video: 'VIDEOS DESTACADOS',
        soundcloud: 'SOUNDCLOUD'
      },
      bio: {
        p1: 'Flor Palacios es una DJ oriunda de Santa Fe, Argentina. Actualmente se encuenra en constante movimiento con base en Rosario 🇦🇷 y Tulum🇲🇽. Con más de 7 años de trayectoria, su carrera la llevó a diferentes escenarios. Su sonido se mueve entre el Progressive House, Deep House e Indie Dance, siempre con un enfoque versátil que se adapta al contexto y a la energía del público. Su objetivo es claro: transmitir emociones y generar conexión en la pista.',
        p2: 'En su recorrido compartió cabina con DJs nacionales e internacionales como Budakid, Chapa & Castelo, Greta Meier, John Cosani y Kabi, entre otros. Esto le permitió presentarse en ciudades como Buenos Aires, Rosario y Bariloche, y también expandir su música fuera del país, con presentaciones en Tulum (México).',
        p3: 'Actualmente, Flor está perfeccionándose en producción musical junto a referentes del género, como Ignacio Berardi, Agustín Pietrocola; con el objetivo de lanzar sus próximos tracks.'
      },
      gallery: {
        alt: 'Galería'
      },
      video: {
        title: 'YouTube destacado'
      },
      stats: {
        subtitle: 'DJ / Productora',
        years: 'Años',
        events: 'Eventos',
        minutes: 'Minutos'
      },
      footer: {
        copyright: 'DJ PRESSKIT ® — Florencia Palacios — All Rights Reserved',
        powered: '@DsFacuCordoba'
      }
    },
    en: {
      menu: {
        bio: 'Biography',
        upcoming: 'Upcoming Events',
        past: 'Past Events',
        gallery: 'Gallery',
        video: 'Featured Video',
        soundcloud: 'SoundCloud'
      },
      sections: {
        bio: 'Bio',
        upcoming: 'UPCOMING EVENTS',
        past: 'PAST EVENTS',
        gallery: 'GALLERY',
        video: 'FEATURED VIDEO',
        soundcloud: 'SOUNDCLOUD'
      },
      bio: {
        p1: 'Flor Palacios is a DJ from Santa Fe, Argentina. Currently in constant movement based in Rosario 🇦🇷 and Tulum🇲🇽. With over 6 years of career, her journey has taken her to different stages. Her sound moves between Progressive House, Deep House and Indie Dance, always with a versatile approach that adapts to the context and the energy of the audience. Her goal is clear: to transmit emotions and create connection on the dance floor. Flor Palacios is a DJ from Santa Fe, Argentina. Currently in constant movement based in Rosario 🇦🇷 and Tulum🇲🇽. With over 6 years of career, her journey has taken her to different stages. Her sound moves between Progressive House, Deep House and Indie Dance, always with a versatile approach that adapts to the context and the energy of the audience. Her goal is clear: to transmit emotions and create connection on the dance floor.',
        p2: 'Throughout her journey, she has shared the booth with national and international DJs such as Budakid, Chapa & Castelo, Greta Meier, John Cosani and Kabi, among others. This has allowed her to perform in cities like Buenos Aires, Rosario and Bariloche, and also expand her music outside the country, with performances in Tulum (Mexico).',
        p3: 'Currently, Flor is perfecting herself in music production alongside genre references such as Ignacio Berardi, Agustín Pietrocola; with the goal of releasing her upcoming tracks.'
      },
      gallery: {
        alt: 'Gallery'
      },
      video: {
        title: 'Featured YouTube'
      },
      stats: {
        subtitle: 'DJ / Producer',
        years: 'Years',
        events: 'Events',
        minutes: 'Minutes'
      },
      footer: {
        copyright: 'DJ PRESSKIT ® — Florencia Palacios — All Rights Reserved',
        powered: 'DsFacuCordoba'
      }
    }
  }

  // YouTube videos state (loaded from /yt-video.json)
  const [ytVideos, setYtVideos] = useState([])
  const [ytVideoIndex, setYtVideoIndex] = useState(0)
  // SoundCloud covers state (loaded from /soundcloud-covers.json)
  const [scImages, setScImages] = useState([])
  // SoundCloud tracks state (loaded from /soundcloud-tracks.json)
  const [scTracks, setScTracks] = useState([])
  const [scThumbs, setScThumbs] = useState([])
  
  // Títulos manuales para los tracks de SoundCloud (en el mismo orden que sc-tracks.json)
  const scTrackTitles = [
    'Warm up w/ Kabi - 2025 - Rafaela',
    'Sessions Amygdala Therapy 017 - Bélgica',
    'Ephimera Special Sunset mix 2025',
    'Opening w/ Greta Meier - 2024 - Santa Fe',
    'Grap Session - Progrssive house mix 2024',
    'Opening set w/ John Cosani - 2024 Santa Fe',
    'Set from Shyft Studios - Miami',
    'Set from 120bpmstore - Bs.As'
  ]
  useEffect(() => {
    let mounted = true
    const base = (typeof importMeta !== 'undefined' && importMeta.env && importMeta.env.BASE_URL) || (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) || '/'
    const makeUrl = (name) => {
      try {
        const u = new URL(base, window.location.origin)
        return new URL(name + `?t=${Date.now()}`, u).toString()
      } catch { return `/${name}?t=${Date.now()}` }
    }

    const fetchJsonCandidates = async (names) => {
      for (const name of names) {
        const url = makeUrl(name)
        try {
          const r = await fetch(url, { cache: 'no-store' })
          if (!r.ok) continue
          const txt = await r.text()
          try { return JSON.parse(txt) } catch { /* try next */ }
        } catch { /* try next */ }
      }
      return null
    }

    ;(async () => {
      const covers = await fetchJsonCandidates(['soundcloud-covers.json', 'sc-covers.json'])
      if (mounted && Array.isArray(covers)) setScImages(covers)

      let tracks = await fetchJsonCandidates(['soundcloud-tracks.json', 'sc-tracks.json', 'sc-tracks.json.json'])
      if (!Array.isArray(tracks)) {
        try {
          const mod = await import('./sc-tracks.json')
          tracks = mod.default || mod
        } catch (e) {
        }
      }
      if (mounted && Array.isArray(tracks)) {
        setScTracks(tracks)
      }

      // Cargar videos de YouTube
      let videos = await fetchJsonCandidates(['yt-video.json', 'youtube-videos.json'])
      if (!Array.isArray(videos)) {
        try {
          const mod = await import('./yt-video.json')
          videos = mod.default || mod
        } catch (e) {
        }
      }
      if (mounted && Array.isArray(videos) && videos.length > 0) {
        setYtVideos(videos)
        // Buscar si el video actual (m3WmPLg7HHQ) está en la lista
        const currentVideoId = 'm3WmPLg7HHQ'
        const foundIndex = videos.findIndex(url => url.includes(currentVideoId))
        if (foundIndex >= 0) {
          setYtVideoIndex(foundIndex)
        }
      }
    })()
    return () => { mounted = false }
  }, [])

  // Derivar miniaturas de SoundCloud usando oEmbed
  useEffect(() => {
    if (!Array.isArray(scTracks) || scTracks.length === 0) { setScThumbs([]); return }
    let cancelled = false
    const controller = new AbortController()
    const sleep = (ms) => new Promise(r => setTimeout(r, ms))
    ;(async () => {
      try {
        const urls = Array.from(new Set(scTracks))
        const collected = []
        const BATCH = 6
        for (let i = 0; i < urls.length; i += BATCH) {
          const chunk = urls.slice(i, i + BATCH)
          const res = await Promise.allSettled(chunk.map(async (url) => {
            const o = await fetch(`https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(url)}`, { signal: controller.signal })
            if (!o.ok) throw new Error('oembed ' + o.status)
            const data = await o.json()
            let thumb = data.thumbnail_url || ''
            thumb = thumb.replace('-t200x200.', '-t500x500.').replace('-large.', '-t500x500.')
            return { url, thumb }
          }))
          res.forEach(r => { if (r.status === 'fulfilled' && r.value && r.value.thumb) collected.push(r.value) })
          if (cancelled) return
          setScThumbs(prev => prev.length === 0 ? collected.slice() : prev)
          await sleep(200)
        }
        if (!cancelled) setScThumbs(collected)
      } catch (e) {
        if (!cancelled) setScThumbs([])
      }
    })()
    return () => { cancelled = true; controller.abort() }
  }, [scTracks])

  const openLightbox = (idx) => { setLightboxIndex(idx); setLightboxOpen(true) }
  const closeLightbox = () => setLightboxOpen(false)
  const nextLightbox = () => setLightboxIndex((i) => (i + 1) % galleryImages.length)
  const prevLightbox = () => setLightboxIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && !e.target.closest('header')) setMenuOpen(false)
    }
    if (menuOpen) document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [menuOpen])

  useEffect(() => {
    if (!lightboxOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      else if (e.key === 'ArrowRight') nextLightbox()
      else if (e.key === 'ArrowLeft') prevLightbox()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxOpen])

  function Carousel({ images, intervalMs = 5000 }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const rootRef = useRef(null)
    const timerRef = useRef(0)
    const touchRef = useRef({ xStart: 0, xMove: 0, dragging: false })

    const goTo = (idx) => {
      const n = images.length
      const next = ((idx % n) + n) % n
      setCurrentIndex(next)
    }
    const next = () => goTo(currentIndex + 1)
    const prev = () => goTo(currentIndex - 1)

    useEffect(() => {
      if (prefersReducedMotion || isPaused || images.length <= 1) return
      timerRef.current = window.setTimeout(next, intervalMs)
      return () => { if (timerRef.current) window.clearTimeout(timerRef.current) }
    }, [currentIndex, isPaused, intervalMs, images.length, prefersReducedMotion])

    useEffect(() => {
      const el = rootRef.current
      if (!el) return
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          setIsPaused(!e.isIntersecting)
        })
      }, { threshold: 0.2 })
      io.observe(el)
      return () => io.disconnect()
    }, [])

    const onPointerEnter = () => setIsPaused(true)
    const onPointerLeave = () => setIsPaused(false)

    const onTouchStart = (e) => {
      const t = e.touches[0]
      touchRef.current = { xStart: t.clientX, xMove: t.clientX, dragging: true }
    }
    const onTouchMove = (e) => {
      if (!touchRef.current.dragging) return
      touchRef.current.xMove = e.touches[0].clientX
    }
    const onTouchEnd = () => {
      const { xStart, xMove, dragging } = touchRef.current
      if (!dragging) return
      const delta = xMove - xStart
      touchRef.current.dragging = false
      if (Math.abs(delta) > 40) {
        if (delta < 0) next(); else prev()
      }
    }

    return (
      <div
        ref={rootRef}
        className="carousel"
        onMouseEnter={onPointerEnter}
        onMouseLeave={onPointerLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          position:'relative', width:'100%',
          overflow:'hidden', borderRadius:12,
        }}
      >
        <div
          className="track"
          style={{
            display:'flex', transition: prefersReducedMotion ? 'none' : 'transform 600ms ease',
            transform:`translateX(-${currentIndex * 100}%)`,
            width:`${images.length * 100}%`,
          }}
        >
          {images.map((src, i) => (
            <div key={i} style={{flex:'0 0 100%', position:'relative'}}>
              <div style={{position:'relative', width:'100%', aspectRatio:'16 / 9', background:'#111'}}>
                <img
                  src={src}
                  alt={`Galería ${i+1}`}
                  loading="lazy"
                  style={{
                    position:'absolute', inset:0, width:'100%', height:'100%',
                    objectFit:'cover'
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              aria-label="Anterior"
              onClick={prev}
              style={{
                position:'absolute', top:'50%', left:8, transform:'translateY(-50%)',
                background:'rgba(0,0,0,.4)', color:'#fff', border:'none',
                width:36, height:36, borderRadius:18, cursor:'pointer'
              }}
            >
              ‹
            </button>
            <button
              aria-label="Siguiente"
              onClick={next}
              style={{
                position:'absolute', top:'50%', right:8, transform:'translateY(-50%)',
                background:'rgba(0,0,0,.4)', color:'#fff', border:'none',
                width:36, height:36, borderRadius:18, cursor:'pointer'
              }}
            >
              ›
            </button>
            <div style={{position:'absolute', bottom:8, left:0, right:0, display:'flex', justifyContent:'center', gap:6}}>
              {images.map((_, i) => (
                <button key={i} aria-label={`Ir a ${i+1}`} onClick={() => goTo(i)} style={{
                  width:8, height:8, borderRadius:4, border:'none', cursor:'pointer',
                  background: i === currentIndex ? '#fff' : 'rgba(255,255,255,.4)'
                }} />
              ))}
            </div>
          </>
        )}
      </div>
    )
  }

  function LightboxImage({ src, index, onPrev, onNext }) {
    const touchRef = useRef({ xStart: 0, xMove: 0, dragging: false })
    const onTouchStart = (e) => {
      const t = e.touches[0]
      touchRef.current = { xStart: t.clientX, xMove: t.clientX, dragging: true }
    }
    const onTouchMove = (e) => {
      if (!touchRef.current.dragging) return
      touchRef.current.xMove = e.touches[0].clientX
    }
    const onTouchEnd = () => {
      const { xStart, xMove, dragging } = touchRef.current
      if (!dragging) return
      const delta = xMove - xStart
      touchRef.current.dragging = false
      if (Math.abs(delta) > 40) {
        if (delta < 0) onNext(); else onPrev()
      }
    }
    return (
      <div
        className="lightbox-inner"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          maxWidth:'min(96vw, 1400px)', maxHeight:'86vh',
          display:'flex', alignItems:'center', justifyContent:'center'
        }}
      >
        <img
          src={src}
          alt={`Galería ampliada ${index+1}`}
          style={{
            width:'100%', height:'100%', objectFit:'contain',
            boxShadow:'0 20px 80px rgba(0,0,0,0.6)'
          }}
        />
      </div>
    )
  }

  // Carousel para imágenes con links
  function ImageCarouselWithLinks({ items, trackTitles = [], intervalMs = 5000 }) {
    const visibleCards = 3
    const images = items.map(i => i.thumb)
    const extendedItems = items.length > 0 ? [...items, ...items.slice(0, visibleCards)] : []
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [noAnim, setNoAnim] = useState(false)
    const rootRef = useRef(null)
    const timerRef = useRef(0)
    
    const goTo = (idx) => { const n = images.length || 1; setCurrentIndex(((idx % n) + n) % n) }
    const next = () => goTo(currentIndex + 1)
    const prev = () => goTo(currentIndex - 1)
    
    // Autoplay del carousel - IGNORAMOS prefersReducedMotion para forzar el autoplay
    useEffect(() => { 
      if (isPaused) return
      if (images.length <= 1) return
      
      // Limpiar timer anterior
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = 0
      }
      
      // Configurar nuevo timer - sin requestAnimationFrame para que sea más suave y sin saltos
      timerRef.current = window.setTimeout(() => {
        setCurrentIndex((prev) => {
          const n = images.length || 1
          return ((prev + 1) % n + n) % n
        })
      }, intervalMs) // Usar el intervalo proporcionado (7 segundos)
      
      return () => { 
        if (timerRef.current) {
          clearTimeout(timerRef.current)
          timerRef.current = 0
        }
      }
    }, [currentIndex, isPaused, intervalMs, images.length])
    
    // IntersectionObserver para pausar cuando no está visible
    useEffect(() => { 
      const el = rootRef.current
      if (!el) return
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          // Solo pausar si está completamente fuera de vista (menos del 10% visible)
          const shouldPause = entry.intersectionRatio < 0.1
          setIsPaused(shouldPause)
        })
      }, { threshold: [0, 0.1, 0.5, 1], rootMargin: '0px' })
      io.observe(el)
      return () => io.disconnect()
    }, [])
    // snap back when reaching the cloned tail to create infinite loop (forward)
    useEffect(() => {
      if (images.length === 0) return
      if (currentIndex === images.length) {
        const t = setTimeout(() => {
          // Usar múltiples requestAnimationFrame para asegurar que el DOM esté listo
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setNoAnim(true)
              requestAnimationFrame(() => {
                setCurrentIndex(0)
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    setNoAnim(false)
                  })
                })
              })
            })
          })
        }, 5100) // Esperar a que termine la animación de 5s antes de hacer el snap
        return () => clearTimeout(t)
      }
    }, [currentIndex, images.length])
    const CARD = 400
    const GAP = 48
    return (
      <div ref={rootRef} className="soundcloud-carousel-container" style={{position:'relative', overflow:'hidden', width:'100vw', maxWidth:'100vw', marginLeft:'calc(50% - 50vw)', perspective:1200}}>
        <div style={{display:'flex', gap:`${GAP}px`, width:(extendedItems.length) * (CARD + GAP), transform:`translate3d(-${currentIndex * (CARD + GAP)}px, 0, 0)`, transition: noAnim ? 'none' : 'transform 5000ms cubic-bezier(0.4, 0, 0.2, 1)', padding:`0 ${GAP}px`, willChange:'transform', backfaceVisibility:'hidden'}}>
          {extendedItems.map((item, i) => {
            const offset = i - currentIndex
            const clamped = Math.max(-2, Math.min(2, offset))
            const isCenter = clamped === 0
            const rotate = isCenter ? 0 : clamped * 18 // grados
            const translateZ = isCenter ? 20 : -Math.abs(clamped) * 60
            const scale = 1
            const opacity = isCenter ? 1 : 1 - Math.abs(clamped) * 0.2
            const zIndex = isCenter ? 3 : 1
            // Usar una key única basada en el índice del item original para evitar re-renders innecesarios
            const itemKey = i < items.length ? i : i - items.length
            return (
              <div key={`item-${itemKey}-${i}`} style={{flex:'0 0 auto', width:CARD, position:'relative', cursor:'pointer', transform:`translateZ(0)`, willChange:'transform, opacity', zIndex, contain:'layout style paint', backfaceVisibility:'hidden', WebkitBackfaceVisibility:'hidden', perspective:'1000px'}} onClick={() => window.open(item.url, '_blank', 'noopener') }>
                <div style={{position:'relative', width:'100%', height:CARD, background:'#000', overflow:'hidden', borderRadius:22, boxShadow: isCenter ? '0 18px 50px rgba(255,45,161,.25), 0 12px 40px rgba(0,0,0,.42)' : '0 14px 44px rgba(0,0,0,.38)', transform: `translate3d(0, 0, ${translateZ}px) rotateY(${rotate}deg) scale(${scale})`, transformStyle:'preserve-3d', transformOrigin: offset < 0 ? 'right center' : offset > 0 ? 'left center' : 'center', transition: 'transform 5000ms cubic-bezier(0.4, 0, 0.2, 1), opacity 5000ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 5000ms cubic-bezier(0.4, 0, 0.2, 1)', opacity, contain:'layout style paint', willChange:'transform, opacity', backfaceVisibility:'hidden', WebkitBackfaceVisibility:'hidden'}}>
                  <img src={item.thumb} alt={`SC ${i+1}`} loading="lazy" style={{position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center'}} />
                  <div style={{position:'absolute', inset:0, boxShadow:'inset 0 0 0 2px rgba(155,92,255,.25)', borderRadius:22, pointerEvents:'none'}} />
                  {trackTitles[itemKey] && (
                    <div style={{position:'absolute', bottom:0, left:0, right:0, background:'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 60%, transparent 100%)', padding:'16px 12px 12px', borderRadius:'0 0 22px 22px', pointerEvents:'none'}}>
                      <div style={{color:'#fff', fontSize:'13px', fontWeight:600, lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', width:'100%', textShadow:'0 1px 3px rgba(0,0,0,0.8)'}}>
                        {trackTitles[itemKey]}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        {images.length > 3 && (
          <>
            <button aria-label="Anterior" onClick={(e)=>{e.stopPropagation(); prev()}} style={{position:'absolute', top:'50%', left:6, transform:'translateY(-50%)', background:'rgba(0,0,0,.45)', color:'#fff', border:'none', width:32, height:32, borderRadius:16, cursor:'pointer'}}>‹</button>
            <button aria-label="Siguiente" onClick={(e)=>{e.stopPropagation(); next()}} style={{position:'absolute', top:'50%', right:6, transform:'translateY(-50%)', background:'rgba(0,0,0,.45)', color:'#fff', border:'none', width:32, height:32, borderRadius:16, cursor:'pointer'}}>›</button>
          </>
        )}
      </div>
    )
  }

  // Carousel for SoundCloud iframes
  function SoundCloudCarousel({ tracks, trackTitles = [], intervalMs = 6000 }) {
    // Crear array infinito: último al inicio, todos los tracks, primero al final
    const infiniteTracks = tracks.length > 1 ? [tracks[tracks.length - 1], ...tracks, tracks[0]] : tracks
    const [currentIndex, setCurrentIndex] = useState(tracks.length > 1 ? 1 : 0) // Empezar en el primer track real
    const [isPaused, setIsPaused] = useState(false)
    const [noTransition, setNoTransition] = useState(false)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const rootRef = useRef(null)
    const timerRef = useRef(0)

    const goTo = (idx) => {
      if (tracks.length <= 1) {
        setCurrentIndex(0)
        return
      }
      const total = infiniteTracks.length
      let next = idx
      
      // Si llegamos al final (clon del primero), saltar sin animación al inicio real
      if (idx >= total - 1) {
        setNoTransition(true)
        setCurrentIndex(1)
        setTimeout(() => setNoTransition(false), 50)
        return
      }
      // Si vamos hacia atrás y llegamos al inicio (clon del último), saltar sin animación al final real
      if (idx <= 0) {
        setNoTransition(true)
        setCurrentIndex(total - 2)
        setTimeout(() => setNoTransition(false), 50)
        return
      }
      
      setCurrentIndex(next)
    }
    const next = () => goTo(currentIndex + 1)
    const prev = () => goTo(currentIndex - 1)

    useEffect(() => {
      if (prefersReducedMotion) return
      if (isPaused) return
      if (tracks.length <= 1) return
      
      // Limpiar timer anterior
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = 0
      }
      
      // Configurar nuevo timer usando el estado actualizado
      timerRef.current = window.setTimeout(() => {
        setCurrentIndex((prev) => {
          const total = infiniteTracks.length
          // Si llegamos al final, saltar al inicio sin animación
          if (prev >= total - 1) {
            setNoTransition(true)
            setTimeout(() => setNoTransition(false), 50)
            return 1
          }
          return prev + 1
        })
      }, intervalMs)
      
      return () => { 
        if (timerRef.current) {
          clearTimeout(timerRef.current)
          timerRef.current = 0
        }
      }
    }, [currentIndex, isPaused, intervalMs, tracks.length, prefersReducedMotion, infiniteTracks.length])

    useEffect(() => {
      const el = rootRef.current
      if (!el) return
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => setIsPaused(!e.isIntersecting))
      }, { threshold: 0.2 })
      io.observe(el)
      return () => io.disconnect()
    }, [])

    // Función para obtener el título por índice (más simple y confiable)
    const getTrackTitle = (index) => {
      // El array infinito tiene: [último, ...tracks, primero]
      // Necesitamos mapear el índice del array infinito al índice original
      let originalIndex
      if (tracks.length <= 1) {
        originalIndex = 0
      } else if (index === 0) {
        // Es el clon del último
        originalIndex = tracks.length - 1
      } else if (index === infiniteTracks.length - 1) {
        // Es el clon del primero
        originalIndex = 0
      } else {
        // Es un track original (restamos 1 porque el primero es el clon del último)
        originalIndex = index - 1
      }
      const title = trackTitles[originalIndex] || ''
      // Debug para el track visible
      if (index === currentIndex) {
        console.log('Track index:', index, 'Original index:', originalIndex, 'Title:', title, 'Total titles:', trackTitles.length)
      }
      return title
    }

    return (
      <div ref={rootRef} className="sc-carousel" style={{position:'relative', overflow:'visible', borderRadius:16, maxWidth:800, margin:'0 auto'}}>
        <div style={{display:'flex', width:`${infiniteTracks.length * 100}%`, transform:`translateX(-${(currentIndex / infiniteTracks.length) * 100}%)`, transition: (prefersReducedMotion || noTransition) ? 'none' : 'transform 600ms ease', overflow:'hidden', borderRadius:16}}>
          {infiniteTracks.map((trackUrl, i) => {
            const embedSrc = `https://w.soundcloud.com/player/?url=${encodeURIComponent(trackUrl)}&visual=false&color=%23ff2da1&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`
            const trackTitle = getTrackTitle(i)
            const isVisible = Math.abs(currentIndex - i) <= 1
            return (
              <div key={i} style={{flex:'0 0 100%', minWidth:'100%', display:'flex', flexDirection:'column'}}>
                <div style={{position:'relative', width:'100%', height:166, background:'#000', borderRadius:'16px 16px 0 0', flexShrink:0, overflow:'hidden'}}>
                  {isVisible ? (
                    <iframe
                      title={`SC ${i+1}`}
                      src={embedSrc}
                      allow="autoplay; encrypted-media; clipboard-write"
                      referrerPolicy="no-referrer-when-downgrade"
                      style={{position:'absolute', top:0, left:0, right:0, bottom:0, width:'100%', height:'100%', border:0, borderRadius:'16px 16px 0 0'}}
                    />
                  ) : (
                    <div style={{position:'absolute', top:0, left:0, right:0, bottom:0, background:'#000', borderRadius:'16px 16px 0 0'}} />
                  )}
                </div>
                <div style={{background:'rgba(11, 11, 18, 0.95)', padding:'12px 16px', borderRadius:'0 0 16px 16px', textAlign:'center', borderTop:'1px solid rgba(255,255,255,0.1)', flexShrink:0, minHeight:'48px', display:'flex', alignItems:'center', justifyContent:'center', width:'100%'}}>
                  <div style={{color:'var(--text, #f5f7ff)', fontSize:'14px', fontWeight:500, lineHeight:1.4, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', width:'100%'}}>
                    {trackTitle || `Track ${i + 1}`}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {tracks.length > 1 && (
          <>
            <button aria-label="Anterior" onClick={prev} style={{position:'absolute', top:'50%', left:8, transform:'translateY(-50%)', background:'rgba(0,0,0,.4)', color:'#fff', border:'none', width:36, height:36, borderRadius:18, cursor:'pointer'}}>‹</button>
            <button aria-label="Siguiente" onClick={next} style={{position:'absolute', top:'50%', right:8, transform:'translateY(-50%)', background:'rgba(0,0,0,.4)', color:'#fff', border:'none', width:36, height:36, borderRadius:18, cursor:'pointer'}}>›</button>
          </>
        )}
      </div>
    )
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const canvasEl = canvas
    const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = canvas.getContext('2d')
    let width = 0, height = 0, dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
    let raf = 0

    function resize() {
      const { clientWidth, clientHeight } = canvasEl
      width = clientWidth; height = clientHeight
      canvasEl.width = Math.floor(width * dpr)
      canvasEl.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const onResize = () => { resize() }
    window.addEventListener('resize', onResize)
    resize()

    const blobs = Array.from({ length: 6 }).map((_, i) => {
      const baseRadius = Math.min(width, height) * (0.12 + 0.04 * (i % 3))
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: baseRadius,
        ang: Math.random() * Math.PI * 2,
        speed: (prefersReduced ? 0.0002 : 0.0006) + Math.random() * (prefersReduced ? 0.0003 : 0.0009),
        ampX: 60 + Math.random() * 160,
        ampY: 60 + Math.random() * 160,
        hue: i % 2 === 0 ? 320 : 285,
      }
    })

    function drawRadial(x, y, r, hue) {
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r)
      grad.addColorStop(0.0, `hsla(${hue}, 100%, 65%, 0.34)`)
      grad.addColorStop(0.45, `hsla(${hue}, 100%, 55%, 0.18)`)
      grad.addColorStop(1.0, 'hsla(0, 0%, 0%, 0)')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
    }

    let last = performance.now()
    const frame = (now) => {
      const dt = Math.min(32, now - last); last = now
      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'lighter'
      blobs.forEach((b, i) => {
        b.ang += b.speed * dt
        const x = (b.x + Math.cos(b.ang + i) * b.ampX + width) % width
        const y = (b.y + Math.sin(b.ang * 1.15 + i) * b.ampY + height) % height
        drawRadial(x, y, b.r, b.hue + Math.sin(now * 0.0002 + i) * 8)
      })
      ctx.globalCompositeOperation = 'source-over'
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const setHeaderVar = () => {
      const headerEl = document.querySelector('header')
      const h = headerEl ? headerEl.offsetHeight : 70
      root.style.setProperty('--header-h', `${h}px`)
    }
    setHeaderVar()
    window.addEventListener('resize', setHeaderVar)
    return () => window.removeEventListener('resize', setHeaderVar)
  }, [])

  useEffect(() => {
    // Inicializar smooth scroll siempre (ignorar prefers-reduced-motion para esta funcionalidad)
    
    // Función throttle para limitar la frecuencia de ejecución
    const throttle = (func, limit) => {
      let inThrottle
      return function(...args) {
        if (!inThrottle) {
          func.apply(this, args)
          inThrottle = true
          setTimeout(() => inThrottle = false, limit)
        }
      }
    }
    
    let scrollPosition = window.scrollY || window.pageYOffset
    let targetPosition = scrollPosition
    let isScrolling = false
    let rafId = null
    let accumulatedDelta = 0

    const smoothScroll = () => {
      const distance = targetPosition - scrollPosition
      
      // Si hay distancia hacia el objetivo, aplicar suavizado
      if (Math.abs(distance) > 0.1) {
        // Interpolación suave con easing
        scrollPosition += distance * 0.12
        window.scrollTo(0, Math.round(scrollPosition))
        rafId = requestAnimationFrame(smoothScroll)
      } else {
        // Detener animación completamente
        scrollPosition = targetPosition
        window.scrollTo(0, Math.round(scrollPosition))
        isScrolling = false
        if (rafId) {
          cancelAnimationFrame(rafId)
          rafId = null
        }
      }
    }

    const handleWheel = (e) => {
      // Permitir zoom con Ctrl/Cmd + scroll
      if (e.ctrlKey || e.metaKey) {
        return // Dejar que el navegador maneje el zoom normalmente
      }
      
      e.preventDefault()
      e.stopPropagation()
      
      // Acumular deltas para suavizar el scroll en monitores de alta tasa de refresco
      accumulatedDelta += e.deltaY
      
      // Actualizar posición objetivo con el delta acumulado
      targetPosition += accumulatedDelta
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      targetPosition = Math.max(0, Math.min(targetPosition, maxScroll))
      
      // Resetear acumulador después de aplicar
      accumulatedDelta = 0
      
      // Si no está animando, iniciar
      if (!isScrolling) {
        isScrolling = true
        scrollPosition = window.scrollY || window.pageYOffset
        rafId = requestAnimationFrame(smoothScroll)
      }
    }
    
    // Throttle del evento wheel a ~60fps (16ms) para mejor rendimiento
    const throttledWheel = throttle(handleWheel, 16)

    const handleTouchStart = (e) => {
      scrollPosition = window.scrollY || window.pageYOffset
      targetPosition = scrollPosition
    }

    const handleTouchMove = (e) => {
      if (e.touches.length === 1) {
        e.preventDefault()
        const touch = e.touches[0]
        const currentY = touch.clientY
        const lastY = window.lastTouchY || currentY
        const delta = lastY - currentY
        window.lastTouchY = currentY
        
        targetPosition -= delta
        
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        targetPosition = Math.max(0, Math.min(targetPosition, maxScroll))

        if (!isScrolling) {
          isScrolling = true
          rafId = requestAnimationFrame(smoothScroll)
        }
      }
    }

    const handleTouchEnd = (e) => {
      window.lastTouchY = null
    }

    // Agregar listeners con throttle para mejor rendimiento
    window.addEventListener('wheel', throttledWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('wheel', throttledWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => {
    // Contadores progresivos: 4s hasta el valor final
    const DURATION = 4000
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

    const formatValue = (value, el) => {
      const format = el.getAttribute('data-format')
      const suffix = el.getAttribute('data-suffix') || ''
      if (format === 'kPlus') {
        const v = Math.round(value)
        const k = Math.round(v / 1000)
        return `${k}k+`
      }
      return `${Math.round(value)}${suffix}`
    }

    const runCounter = (el) => {
      const target = Number(el.getAttribute('data-target') || '0')
      let start = 0
      let startTs = 0
      let raf = 0
      const step = (ts) => {
        if (!startTs) startTs = ts
        const t = Math.min(1, (ts - startTs) / DURATION)
        const eased = easeOutCubic(t)
        const current = start + (target - start) * eased
        el.textContent = formatValue(current, el)
        if (t < 1) {
          raf = requestAnimationFrame(step)
        } else {
          el.textContent = formatValue(target, el)
        }
      }
      raf = requestAnimationFrame(step)
      return () => cancelAnimationFrame(raf)
    }

    const disposers = []
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          const nums = e.target.querySelectorAll('.num[data-target]')
          nums.forEach((n) => {
            disposers.push(runCounter(n))
          })
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.2 })

    document.querySelectorAll('.stats.reveal').forEach(el => io.observe(el))

    return () => {
      io.disconnect()
      disposers.forEach(fn => fn && fn())
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} id="bg-canvas" aria-hidden="true" style={{position:'fixed', inset:0, zIndex:-2, width:'100vw', height:'100vh', pointerEvents:'none'}} />
      <header>
        <div className="container nav">
          <div className="logo">DJ PRESSKIT • Florencia Palacios</div>
          <div className="social-actions">
            <a className="social-btn sc" aria-label="SoundCloud" title="SoundCloud" href="https://soundcloud.com/florpalaciosdj" target="_blank" rel="noopener">
              <SoundCloudIcon src="/image/nubeSounCloud/sounCloud.png" />
            </a>
            <a className="social-btn ig" aria-label="Instagram" title="Instagram" href="https://www.instagram.com/florpalaciosok?igsh=MXJ0ZjNtdDFuNHlpdQ%3D%3D&utm_source=qr" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M16 2H8a6 6 0 0 0-6 6v8a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6V8a6 6 0 0 0-6-6Z"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1"/>
              </svg>
            </a>
            <a className="social-btn yt" aria-label="YouTube" title="YouTube" href="https://youtube.com/@florpalaciosdj?si=sxNxK9raRLNTbXfw" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a className="social-btn mail" aria-label="Email" title="Email" href="mailto:mariaflorenciapalacios@gmail.com">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"/>
              </svg>
            </a>
            <div style={{position:'relative'}}>
              <button
                aria-label="Menú"
                onClick={() => setMenuOpen(!menuOpen)}
                className="social-btn"
                style={{
                  border:'none', background:'transparent',
                  width:50, height:50, cursor:'pointer', color:'var(--brand)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  transition:'all .2s ease'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M3 12h18M3 6h18M3 18h18"} />
                </svg>
              </button>
              {menuOpen && (
                <nav
                  style={{
                    position:'absolute', top:'calc(100% + 8px)', right:0,
                    background:'rgba(5,5,7,0.95)', backdropFilter:'blur(12px)',
                    border:'1px solid var(--surface)', borderRadius:12,
                    minWidth:220, padding:'8px 0', zIndex:100,
                    boxShadow:'0 8px 32px rgba(0,0,0,.4)'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {[
                    { label:t[language].menu.bio, href:'#modulos' },
                    { label:t[language].menu.upcoming, href:'#eventos' },
                    { label:t[language].menu.past, href:'#past-events' },
                    { label:t[language].menu.gallery, href:'#galeria' },
                    { label:t[language].menu.video, href:'#youtube' },
                    { label:t[language].menu.soundcloud, href:'#sc-tracks' },
                  ].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        setMenuOpen(false)
                        const el = document.querySelector(item.href)
                        if (el) {
                          setTimeout(() => el.scrollIntoView({ behavior:'smooth', block:'start' }), 100)
                        }
                      }}
                      style={{
                        display:'block', padding:'10px 16px', color:'var(--text)',
                        textDecoration:'none', fontSize:14, transition:'all .15s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background='rgba(255,45,161,.1)'; e.currentTarget.style.color='#ffd3ec' }}
                      onMouseLeave={(e) => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='var(--text)' }}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              )}
            </div>
            <div style={{display:'flex', gap:8, alignItems:'center'}}>
              <button
                onClick={() => setLanguage('es')}
                className="social-btn"
                style={{
                  border:'none', background:'transparent',
                  width:50, height:50, cursor:'pointer', padding:0,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  opacity: language === 'es' ? 1 : 0.5,
                  transition:'all .2s ease'
                }}
                title="Español"
              >
                <Flag.AR style={{width:28, height:20, borderRadius:2}} />
              </button>
              <button
                onClick={() => setLanguage('en')}
                className="social-btn"
                style={{
                  border:'none', background:'transparent',
                  width:50, height:50, cursor:'pointer', padding:0,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  opacity: language === 'en' ? 1 : 0.5,
                  transition:'all .2s ease'
                }}
                title="English"
              >
                <Flag.US style={{width:28, height:20, borderRadius:2}} />
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="top-logo">
        <div className="top-logo-center">
          <img
            src="/image/tipografia/FlorPalacioSuperpuesto blanco.png"
            alt="Flor Palacios"
            className="top-logo-img center"
          />
          <div className="hero-text-center">
            <div className="subtitle">{t[language].stats.subtitle}</div>
            <div className="genres">PROGRESSIVE HOUSE • HOUSE • DEEP HOUSE • ORGANIC HOUSE • INDIE DANCE <span className="badge">•</span></div>
          </div>
          <div className="stats reveal" style={{marginTop:16}}>
            <div className="stat">
              <div className="num" data-target="7" data-suffix="+">0</div>
              <div className="label">{t[language].stats.years}</div>
            </div>
            <div className="stat">
              <div className="num" data-target="80" data-suffix="+">0</div>
              <div className="label">{t[language].stats.events}</div>
            </div>
            <div className="stat">
              <div className="num" data-target="10000" data-format="kPlus">0</div>
              <div className="label">{t[language].stats.minutes}</div>
            </div>
          </div>
        </div>
      </div>
      <main className="container">
        <section className="hero">
        </section>

        

        

        <section id="modulos">
          <div className="section-title">{t[language].sections.bio}</div>
          <div className="modules" style={{gridTemplateColumns:'1fr 1fr', gap:'20px'}}>
            <div className="module-card reveal">
              <p>
                {t[language].bio.p1}
              </p>
              <p style={{marginTop:10}}>  
                {t[language].bio.p2}
              </p>
              <p style={{marginTop:10}}>
                {t[language].bio.p3}
              </p>
            </div>
            <div className="module-card reveal sticky-image" style={{position:'sticky', top:'var(--header-h, 70px)', alignSelf:'start'}}>
              <img 
                src="/image/imagenCuerpo/image1.JPEG" 
                alt="Flor Palacios DJ" 
                style={{width:'100%', height:'auto', borderRadius:'12px', objectFit:'cover'}}
              />
            </div>
          </div>
        </section>

        

        

        <section id="eventos">
          <div className="section-title">{t[language].sections.upcoming}</div>
          <div className="card events reveal">
            <div className="row">
              <div>
                <h4>Cosme Beats</h4>
                <div className="muted">14/11/2025 • Rosario, AR 🇦🇷</div>
              </div>
            </div>
            <div className="row">
              <div>
                <h4>MAD</h4>
                <div className="muted">28/11/2025 • Miami, US 🇺🇸</div>
              </div>
            </div>
            <div className="row">
              <div>
                <h4>Xnake Rooftop</h4>
                <div className="muted">05/12/2025 • Tulum, MX 🇲🇽</div>
              </div>
            </div>
          </div>
        </section>

        <section id="past-events">
          <div className="section-title">{t[language].sections.past}</div>
          <div className="grid cards reveal">
            <div className="card"><h4>Recreo</h4><div className="muted">11/05/2025 • Rosario, AR</div></div>
            <div className="card"><h4>W Kabi</h4><div className="muted">17/05/2025 • Rafaela, AR</div></div>
            <div className="card"><h4>Lucky</h4><div className="muted">06/06/2025 • Rosario, AR</div></div>
            <div className="card"><h4>Xnake Rooftop</h4><div className="muted">20/07/2025 • Tulum, MX</div></div>
            <div className="card"><h4>Alto Fuego Beer House</h4><div className="muted">25/07/2025 • Tulum, MX</div></div>
            <div className="card"><h4>Santino</h4><div className="muted">02/08/2025 • Tulum, MX</div></div>
            <div className="card"><h4>Casa Cultura</h4><div className="muted">04/08/2025 • Tulum, MX</div></div>
            <div className="card"><h4>Bells in the City — Mía</h4><div className="muted">23/08/2025 • Tulum, MX</div></div>
            <div className="card"><h4>Timeless</h4><div className="muted">06/09/2025 • Rosario, AR</div></div>
            <div className="card"><h4>Patagonia Cerveza</h4><div className="muted">21/09/2025 • Bariloche, AR</div></div>
          </div>
        </section>

        {/* Galería full-bleed después de PAST EVENTS */}
        <section id="galeria" className="reveal" style={{width:'100vw', marginLeft:'calc(50% - 50vw)'}}>
          <div className="container" style={{padding:'0 16px'}}>
            <div className="section-title">{t[language].sections.gallery}</div>
          </div>
          <div className="masonry" style={{marginTop:12, padding:'0 16px'}}>
            {galleryImages.map((src, i) => {
              const stickyClass = (src.includes('/14'))
                ? 'stick full-stick big-14'
                : ((i % 5 === 1 || i % 7 === 3) ? 'stick ' + ((i % 2 === 0) ? 'offset-1' : 'offset-2') : '')
              return (
              <div key={i} className={`masonry-item ${stickyClass}`} onClick={() => openLightbox(i)} style={{cursor:'zoom-in'}}>
                <img src={src} alt={`${t[language].gallery.alt} ${i+1}`} loading="lazy" />
              </div>
            )})}
          </div>
        </section>

        {/* YouTube destacado */}
        <section id="youtube">
          <div className="section-title">{t[language].sections.video}</div>
          <div className="reveal">
            <div
              className="card"
              style={{ overflow:'hidden', padding:0, borderRadius:16, border:'1px solid var(--surface)', position:'relative' }}
            >
              <div style={{ position:'relative', width:'100%', aspectRatio:'16 / 9', background:'#000' }}>
                {ytVideos.length > 0 && (() => {
                  const currentVideo = ytVideos[ytVideoIndex]
                  // Convertir URL watch?v= a formato embed
                  const videoId = currentVideo.match(/[?&]v=([^&]+)/)?.[1] || currentVideo.split('/').pop()
                  const embedUrl = `https://www.youtube.com/embed/${videoId}`
                  return (
                    <iframe
                      key={ytVideoIndex}
                      title={t[language].video.title}
                      src={embedUrl}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      style={{ position:'absolute', inset:0, width:'100%', height:'100%', border:0 }}
                    />
                  )
                })()}
              </div>
              {ytVideos.length > 1 && (
                <>
                  <button
                    aria-label="Video anterior"
                    onClick={() => setYtVideoIndex((prev) => (prev - 1 + ytVideos.length) % ytVideos.length)}
                    style={{
                      position:'absolute', left:16, top:'50%', transform:'translateY(-50%)',
                      background:'rgba(0,0,0,0.6)', backdropFilter:'blur(8px)',
                      color:'#fff', border:'none', width:44, height:44, borderRadius:22,
                      cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:24, fontWeight:'bold', zIndex:10,
                      transition:'background 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.8)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}
                  >
                    ‹
                  </button>
                  <button
                    aria-label="Video siguiente"
                    onClick={() => setYtVideoIndex((prev) => (prev + 1) % ytVideos.length)}
                    style={{
                      position:'absolute', right:16, top:'50%', transform:'translateY(-50%)',
                      background:'rgba(0,0,0,0.6)', backdropFilter:'blur(8px)',
                      color:'#fff', border:'none', width:44, height:44, borderRadius:22,
                      cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:24, fontWeight:'bold', zIndex:10,
                      transition:'background 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.8)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}
                  >
                    ›
                  </button>
                </>
              )}
            </div>
          </div>
        </section>

        {/* SoundCloud debajo de YouTube */}
        {Array.isArray(scTracks) && scTracks.length > 0 ? (
          <section id="sc-tracks">
            <div className="section-title">{t[language].sections.soundcloud}</div>
            <div style={{marginTop:12}}>
              {Array.isArray(scThumbs) && scThumbs.length > 0
                ? <ImageCarouselWithLinks items={scThumbs} trackTitles={scTrackTitles} intervalMs={5000} />
                : <SoundCloudCarousel tracks={scTracks} trackTitles={scTrackTitles} intervalMs={5000} />}
            </div>
          </section>
        ) : (
          Array.isArray(scImages) && scImages.length > 0 && (
            <section id="sc-covers">
              <div className="section-title">{t[language].sections.soundcloud}</div>
              <div style={{marginTop:12}}>
                <Carousel images={scImages} intervalMs={4000} />
              </div>
            </section>
          )
        )}
        <footer>
          <div className="container" style={{textAlign:'center'}}>
            © {new Date().getFullYear()} {t[language].footer.copyright}
            <div className="muted" style={{marginTop:6}}>{t[language].footer.powered}</div>
          </div>
        </footer>
      </main>
      {lightboxOpen && (
        <div
          className="lightbox"
          onClick={(e) => { if (e.target === e.currentTarget) closeLightbox() }}
          style={{
            position:'fixed', inset:0, zIndex:1000, background:'rgba(0,0,0,0.92)',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}
        >
          <button aria-label="Cerrar" onClick={closeLightbox} style={{position:'absolute', top:16, right:16, background:'rgba(255,255,255,0.12)', color:'#fff', border:'none', width:40, height:40, borderRadius:20, cursor:'pointer'}}>✕</button>
          <button aria-label="Anterior" onClick={(e) => { e.stopPropagation(); prevLightbox() }} style={{position:'absolute', left:16, background:'rgba(255,255,255,0.12)', color:'#fff', border:'none', width:44, height:44, borderRadius:22, cursor:'pointer'}}>‹</button>
          <button aria-label="Siguiente" onClick={(e) => { e.stopPropagation(); nextLightbox() }} style={{position:'absolute', right:16, background:'rgba(255,255,255,0.12)', color:'#fff', border:'none', width:44, height:44, borderRadius:22, cursor:'pointer'}}>›</button>
          <LightboxImage src={galleryImages[lightboxIndex]} index={lightboxIndex} onPrev={prevLightbox} onNext={nextLightbox} />
        </div>
      )}
    </>
  )
}

