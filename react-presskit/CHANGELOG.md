# Changelog - Florencia Palacios DJ Presskit

## Funcionalidades Implementadas

### 🎨 UI/UX
- **Menú desplegable de navegación**: Menú hamburguesa con links a todas las secciones (Biografía, Eventos, Galería, Video, SoundCloud)
- **Sistema de idiomas**: Selector de idioma con banderas (Argentina para español, Estados Unidos para inglés)
  - Traducción completa de todos los textos (menús, secciones, biografía, estadísticas, footer)
  - Persistencia del idioma seleccionado
- **Galería de imágenes**: 
  - Layout masonry responsive con efecto sticky en algunas imágenes
  - Lightbox para visualización full-screen con navegación por teclado y gestos
  - Imagen destacada (#14) con tamaño aumentado y sticky
- **Estadísticas animadas**: Contadores progresivos (Años, Eventos, Minutos) que se animan al entrar en viewport
- **Carousel de SoundCloud**: Carrusel infinito con efectos 3D (perspectiva, rotación, escalado) para las portadas de tracks
- **Imagen sticky en biografía**: Imagen que se mantiene fija mientras se lee el texto

### 🎬 Multimedia
- **Video de YouTube embebido**: Sección destacada con video de YouTube
- **Integración con SoundCloud**: 
  - Carga de tracks desde JSON
  - Fetch de portadas mediante oEmbed API
  - Carrusel con links a tracks de SoundCloud

### ⚡ Optimizaciones de Rendimiento
- **Throttle en eventos de scroll**: Limitación de eventos wheel a ~60fps para mejor rendimiento
- **CSS Contain Property**: Optimización de reflows/repaints en elementos animados
- **Prefers-reduced-motion**: Soporte completo para usuarios con preferencia de movimiento reducido
- **Lazy loading**: Carga diferida de imágenes de la galería
- **Intersection Observer**: Pausado automático de carousels cuando no están visibles

### 📱 Responsive Design
- **Layout adaptativo**: 
  - Desktop: 4 columnas en galería
  - Tablet: 3 columnas
  - Móvil: 1-2 columnas según tamaño
- **Desactivación de efectos sticky en móvil**: Mejor UX en pantallas pequeñas
- **Header responsive**: Menú y banderas adaptados a diferentes tamaños

### 🎯 Accesibilidad
- **Soporte para zoom**: Ctrl/Cmd + scroll funciona correctamente
- **Prefers-reduced-motion**: Respeta preferencias de accesibilidad del usuario
- **ARIA labels**: Etiquetas apropiadas en elementos interactivos

### 🔧 Mejoras Técnicas
- **Smooth scroll personalizado**: Scroll suave con requestAnimationFrame
- **Gestión de estado**: Estados para idioma, menú, lightbox, carousels
- **Error handling**: Manejo robusto de errores en carga de JSON y APIs externas
- **Favicon personalizado**: Logo "peloAuriculares.png" como favicon
- **Footer con logo**: Imagen del logo en el footer

### 📝 Contenido
- **Secciones de eventos**: Upcoming Events y Past Events ordenados por fecha
- **Biografía bilingüe**: Texto completo traducido al inglés
- **Eliminación de secciones**: Removidas Top Releases, Technical Rider y Contacto

## Archivos Modificados

- `src/App.jsx`: Componente principal con todas las funcionalidades
- `src/style.css`: Estilos responsive y animaciones
- `index.html`: Favicon y metadata
- `src/sc-tracks.json`: Lista de tracks de SoundCloud
- `vite.config.js`: Configuración para GitHub Pages
- `.github/workflows/deploy.yml`: Pipeline de deployment automático

## Dependencias Agregadas

- `country-flag-icons`: Librería para iconos de banderas

## Notas de Deployment

- Configurado para GitHub Pages con GitHub Actions
- Base URL configurable según nombre del repositorio
- Build automático en cada push a main/master
