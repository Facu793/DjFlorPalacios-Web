# Changelog - DJ Presskit Florencia Palacios

## Cambios Implementados

### 🎨 Diseño y UI

#### Iconos Sociales
- **SoundCloud Icon**: Reemplazado el SVG por imagen PNG personalizada (`sounCloud.png`)
  - Aplicado filtro CSS para color rosado (#ff2da1) consistente con el tema
  - Tamaño ajustado: 40px en nav, 30px en otras secciones
  - Animación de vibración sutil al pasar el mouse sobre todos los iconos sociales

#### Layout y Estructura
- **Header**: Reorganización de imágenes
  - Imagen "FlorPalacioSuperpuesto blanco" centrada en el header
  - Eliminada imagen "peloAuriculares"
  - Eliminada imagen "tipografiaRayo" de la sección hero
  - Texto "DJ / Productora" y géneros musicales movidos debajo de la imagen principal

- **Sección ARTISTA**: Layout de dos columnas
  - Texto a la izquierda con información actualizada
  - Imagen `image1.JPEG` agregada a la derecha
  - Grid responsive con gap de 20px

### 📝 Tipografía

- **Fuente principal**: Cambiada de Poppins a **Montserrat** en todo el sitio
- **Google Fonts**: Actualizado `index.html` para cargar Montserrat (pesos 300-800)
- **Sección ARTISTA**: 
  - Tamaño de fuente: 18px
  - Peso: 500 (medium)
  - Color: #f5f7ff (blanco más brillante)
  - Line-height: 1.8
  - Letter-spacing: 0.3px

### 🎭 Animaciones

- **Hover en iconos sociales**: Animación de vibración sutil
  - Movimiento mínimo (1px máximo)
  - Rotación leve (2 grados máximo)
  - Duración: 1.2s
  - Aplicada a todos los iconos (SVG e imágenes)

### 📄 Contenido

- **Sección ARTISTA**: Texto actualizado con información sobre:
  - Trayectoria y ubicaciones (Rosario 🇦🇷 y Tulum 🇲🇽)
  - Colaboraciones con DJs nacionales e internacionales
  - Presentaciones en distintas ciudades
  - Proyectos de producción musical

- **Bandera de países**: Agregadas banderas emoji (🇦🇷 y 🇲🇽) en el texto

### 🖼️ Imágenes

- **Nuevas imágenes agregadas**:
  - `/image/imagenCuerpo/image1.JPEG` - Foto de DJ en acción
  - `/image/nubeSounCloud/sounCloud.png` - Icono personalizado de SoundCloud

### 🎯 Estilos CSS

- Ajustes de espaciado y posicionamiento
- Mejoras en contraste y legibilidad del texto
- Consistencia visual en toda la aplicación

## Archivos Modificados

- `src/App.jsx` - Estructura y contenido
- `src/style.css` - Estilos y tipografía
- `src/SoundCloudIcon.jsx` - Componente de icono personalizado
- `index.html` - Importación de Google Fonts
- `public/image/nubeSounCloud/sounCloud.png` - Nuevo icono
- `public/image/imagenCuerpo/image1.JPEG` - Nueva imagen

## Tecnologías

- React 18.3.1
- Vite 5.4.0
- Montserrat (Google Fonts)
- CSS3 con animaciones y filtros


