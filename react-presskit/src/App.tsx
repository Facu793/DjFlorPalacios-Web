import { useEffect, useRef } from 'react'

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = canvas.getContext('2d')!
    let width = 0, height = 0, dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
    let raf = 0

    function resize() {
      const { clientWidth, clientHeight } = canvas
      width = clientWidth; height = clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
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

    function drawRadial(x: number, y: number, r: number, hue: number) {
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
    const frame = (now: number) => {
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
          <nav style={{display:'flex', gap:12}}>
            <a className="pill" href="#eventos">Eventos</a>
            <a className="pill" href="#bio">Bio</a>
            <a className="pill" href="#lanzamientos">Releases</a>
            <a className="pill" href="#rider">Rider</a>
            <a className="pill" href="#contacto">Contacto</a>
          </nav>
        </div>
      </header>
      <div className="top-logo">
        <img
          src="/image/logo/peloAuriculares.png"
          alt="Logo Florencia Palacios"
          className="top-logo-img"
        />
      </div>
      <main className="container">
        <section className="hero">
          <img
            src="/image/tipografia/tipografiaRayo.png"
            alt="Florencia Palacios"
            className="hero-name-img"
          />
          <div className="subtitle">DJ / Productora</div>
          <div className="genres">TECHNO • DEEP HOUSE • PROGRESSIVE HOUSE <span className="badge">•</span></div>
        </section>

        <section id="musica">
          <div className="section-title">MÚSICA</div>
          <div className="media-embed reveal">
            <iframe
              title="SoundCloud Flor Palacios"
              height="300"
              scrolling="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/florpalaciosdj&color=%23ff2da1&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"
            ></iframe>
          </div>
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
              <div className="media-embed reveal">
                <iframe title="SoundCloud" height="180" scrolling="no" allow="autoplay"
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/209262931&color=%237a5fff&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false">
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


