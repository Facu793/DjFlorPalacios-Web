import { useEffect, useRef } from 'react'
import SoundCloudIcon from './SoundCloudIcon'

export default function App() {
  const canvasRef = useRef(null)

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
          </div>
        </div>
      </header>
      <div className="top-logo">
        <div className="top-logo-left">
          <img
            src="/image/tipografia/FlorPalacioSuperpuesto blanco.png"
            alt="Flor Palacios"
            className="top-logo-img left"
          />
          <div className="hero-text-left">
            <div className="subtitle">DJ / Productora</div>
            <div className="genres">TECHNO • DEEP HOUSE • PROGRESSIVE HOUSE <span className="badge">•</span></div>
          </div>
        </div>
        <img
          src="/image/logo/peloAuriculares.png"
          alt="Logo Florencia Palacios"
          className="top-logo-img right"
        />
      </div>
      <main className="container">
        <section className="hero">
        </section>

        

        <section id="modulos">
          <div className="section-title">ARTISTA</div>
          <div className="modules" style={{gridTemplateColumns:'1fr'}}>
            <div className="module-card reveal">
              <p>
                Flor Palacios es una DJ oriunda de Esperanza, Santa Fe, que actualmente
                reside en Rosario. Con más de 6 años de trayectoria, su carrera la llevó a
                diferentes escenarios de todo el país.
              </p>
              <p style={{marginTop:10}}>
                Su sonido se mueve entre el Progressive House, Deep House e Indie Dance,
                siempre con un enfoque versátil que se adapta al contexto y a la energía del
                público. Su objetivo es claro: transmitir emociones y generar conexión en la pista.
              </p>
            </div>
          </div>
        </section>

        <section id="eventos">
          <div className="section-title">UPCOMING EVENTS</div>
          <div className="card events reveal">
            <div className="row">
              <div>
                <h4>ALTERNATE STATES</h4>
                <div className="muted">06/12/2025 • Rosario, AR</div>
              </div>
              <a className="btn" href="#" target="_blank" rel="noopener">Tickets</a>
            </div>
            <div className="row">
              <div>
                <h4>GROOVE NIGHT</h4>
                <div className="muted">13/12/2025 • Santa Fe, AR</div>
              </div>
              <a className="btn" href="#" target="_blank" rel="noopener">Tickets</a>
            </div>
            <div className="row">
              <div>
                <h4>PALOOZA RECORDS SHOWCASE</h4>
                <div className="muted">20/12/2025 • Córdoba, AR</div>
              </div>
              <a className="btn" href="#" target="_blank" rel="noopener">Tickets</a>
            </div>
            <div style={{marginTop:16, textAlign:'center'}}>
              <a className="btn ghost" href="#">Más fechas</a>
            </div>
          </div>
        </section>

        <section>
          <div className="section-title">PAST EVENTS</div>
          <div className="grid cards reveal">
            <div className="card"><h4>Spektral Groove</h4><div className="muted">30/08/2025 • Buenos Aires, AR</div></div>
            <div className="card"><h4>Paname SF</h4><div className="muted">23/08/2025 • San Francisco, US</div></div>
            <div className="card"><h4>Lunáticos</h4><div className="muted">16/08/2025 • Mendoza, AR</div></div>
            <div className="card"><h4>Do Not Sit</h4><div className="muted">13/08/2025 • Miami, US</div></div>
          </div>
        </section>

        <section id="bio">
          <div className="section-title">BIO</div>
          <div className="grid" style={{gridTemplateColumns:'1.2fr .8fr', gap:18}}>
            <div className="card reveal">
              <p>
                Florencia Palacios es una DJ y productora de Esperanza, Santa Fe. Su sonido
                se caracteriza por líneas de bajo poderosas, percusiones intensas y melodías
                envolventes, navegando entre el Techno, el Deep y el Progressive.
              </p>
              <p>
                Ha compartido cabina con talentos locales e internacionales y su música ha
                recibido el apoyo de referentes de la escena. Se presentó en clubes y festivales
                a lo largo de Argentina y el exterior.
              </p>
              <p>
                Actualmente trabaja en nuevos lanzamientos y sets híbridos que combinan
                performance y producción en vivo.
              </p>
            </div>
            <div className="grid">
              <div className="stats reveal">
                <div className="stat"><div className="num" id="years">6+</div><div className="label">Años</div></div>
                <div className="stat"><div className="num" id="gigs">120+</div><div className="label">Eventos</div></div>
                <div className="stat"><div className="num" id="minutes">10k+</div><div className="label">Minutos</div></div>
              </div>
              <div className="media-embed sc-embed reveal">
                <iframe
                  title="SoundCloud Flor Palacios"
                  height="360"
                  scrolling="no"
                  allow="autoplay"
                  src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/florpalaciosdj&visual=true&color=%23ff2da1&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false">
                </iframe>
              </div>
            </div>
          </div>
        </section>

        <section id="lanzamientos">
          <div className="section-title">TOP RELEASES</div>
          <div className="grid cards reveal">
            <div className="card"><h4>Specialised (Remix)</h4><div className="muted">Mango Alley</div></div>
            <div className="card"><h4>Hypnotize (Original Mix)</h4><div className="muted">Univack</div></div>
            <div className="card"><h4>Mysterious Drag</h4><div className="muted">Plattenbank</div></div>
            <div className="card"><h4>Endurance</h4><div className="muted">Protagonist</div></div>
          </div>
        </section>

        <section id="rider">
          <div className="section-title">TECHNICAL RIDER</div>
          <div className="rider-list reveal">
            <div className="rider-item">
              <h4>Players</h4>
              <div className="muted">2–4 × Pioneer CDJ‑3000 (linkeados, último firmware)</div>
            </div>
            <div className="rider-item">
              <h4>Mixer</h4>
              <div className="muted">Pioneer DJM‑V10 o DJM‑900NXS2 (firmware actualizado)</div>
            </div>
            <div className="rider-item">
              <h4>Remix Station</h4>
              <div className="muted">Pioneer RMX‑1000 (enviar/retorno conectado)</div>
            </div>
            <div className="rider-item">
              <h4>Monitoreo</h4>
              <div className="muted">2 monitores de cabina de alta presión, sin distorsión</div>
            </div>
          </div>
        </section>

        <section id="contacto">
          <div className="section-title">CONTACTO</div>
          <div className="card reveal" style={{textAlign:'center'}}>
            <div style={{fontSize:22, fontWeight:800}}>Booking</div>
            <div className="muted" style={{margin:'6px 0 10px'}}>Esperanza, Santa Fe, Argentina</div>
            <div style={{display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap'}}>
              <a className="btn" href="mailto:booking.florenciapalacios@example.com">booking.florenciapalacios@example.com</a>
              <a className="btn ghost" href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a>
              <a className="btn ghost" href="https://soundcloud.com/" target="_blank" rel="noopener">SoundCloud</a>
            </div>
          </div>
        </section>

        <footer>
          <div className="container" style={{textAlign:'center'}}>
            © {new Date().getFullYear()} DJ PRESSKIT ® — Florencia Palacios — All Rights Reserved
            <div className="muted" style={{marginTop:6}}>Powered by tu hosting</div>
          </div>
        </footer>
      </main>
    </>
  )
}

