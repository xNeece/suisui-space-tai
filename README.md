# SuiSui Xatspace — estructura editable

## Estructura

```text
xatspace-suisui/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── assets/
│   ├── audio/
│   │   └── music.mp3.placeholder.txt
│   ├── video/
│   │   └── intro.mp4.placeholder.txt
│   ├── images/
│   │   ├── suisui-character.png.placeholder.txt
│   │   ├── item-weapon.svg
│   │   ├── item-echo.svg
│   │   ├── item-core.svg
│   │   ├── avatar-01.svg
│   │   ├── avatar-02.svg
│   │   ├── avatar-03.svg
│   │   ├── avatar-04.svg
│   │   ├── gallery-01.svg
│   │   ├── gallery-02.svg
│   │   ├── gallery-03.svg
│   │   └── gallery-04.svg
│   └── icons/
└── reference/
    └── interfaz-referencia.jpg
```

## Archivos que debes reemplazar

1. `assets/video/intro.mp4`
   - Tu video introductorio.
   - Se reproduce automáticamente, en bucle y sin sonido.
   - El botón Enter oculta el intro y abre la interfaz.

2. `assets/audio/music.mp3`
   - Tu música de fondo.
   - Empieza al pulsar Enter porque los navegadores normalmente bloquean audio automático.

3. `assets/images/suisui-character.png`
   - Tu render de SuiSui.
   - Recomendado: PNG con transparencia y buena resolución.

4. `assets/images/gallery-01.svg` ... `gallery-04.svg`
   - Puedes sustituirlos por JPG/PNG/GIF y cambiar el `src` en `index.html`.

5. `assets/images/avatar-01.svg` ... `avatar-04.svg`
   - Sustituye por los iconos circulares de los personajes/amigos.

## Margen para Xat

La página deja `90px` reservados arriba mediante `.xat-safe-top`, y la barra principal comienza con `margin-top: 90px`.

Si el banner de tu xat ocupa más o menos espacio, cambia:

```css
.xat-safe-top { height: 90px; }
.topbar { margin-top: 90px; }
```

## Personalización rápida

- Colores: variables al principio de `css/style.css`.
- Mensajes: array `messages` en `js/app.js`.
- Número de mensajes simultáneos: `MAX_MESSAGES`.
- Velocidad de mensajes: `setInterval(showMessage, 4200)`.
- Estadísticas: directamente en `index.html`.
- Iconos laterales: botones `.nav-item`.
- La navegación lateral ahora cambia de interfaz sin hacer scroll.
- La transición aplica un desenfoque breve al escenario y cada sección entra con animación.
- Las pantallas secundarias tienen un espacio preparado para el render de SuiSui con movimiento orbital suave.
- Se muestran como máximo 3 notificaciones simultáneas y aparece una nueva cada 7 segundos.

## Importante

No se incluyen archivos MP4/MP3 reales ni un render de personaje de terceros. Los nombres de archivo están preparados para que simplemente coloques tus propios archivos.

## IMPORTANTE EN FEDORA / LINUX

Si al abrir `index.html` con doble clic aparece en la consola un mensaje como:

`Unsafe attempt to load URL file:///... from frame with URL file:///...`

no significa que el diseño esté roto. Es una restricción del navegador al ejecutar una web desde `file://`. Para probarla correctamente, usa un servidor local.

En la carpeta del proyecto ejecuta:

```bash
python3 -m http.server 8000
```

Después abre en el navegador:

```text
http://127.0.0.1:8000
```

También incluimos `iniciar-fedora.sh` para hacerlo con un doble clic/terminal.

La nueva versión del JavaScript ya no depende de que el video o el MP3 existan para cambiar del intro a la interfaz. Aunque todavía no hayas colocado `intro.mp4` o `music.mp3`, **Enter debe llevarte a la interfaz principal**.

## V1.3 — cambios nuevos
- Margen superior de Xat ajustado a 85px.
- Más separación entre barra lateral y panel principal.
- Renders de las vistas con flotación/deriva suave.
- Items organizados en 3 columnas (9 tarjetas).
- Amigos con frase/firma y botón de enlace a Xatspace.
- Reproductor desplegable desde el botón de música, con vinilo, progreso y controles.
- Para varias canciones, coloca `music.mp3`, `music-02.mp3` y `music-03.mp3` en `assets/audio/`.
- Los enlaces de amigos son ejemplos (`friends/amiga-01.html`, etc.); reemplázalos por las URLs reales de tus Xatspaces.


### Renders independientes por apartado
Puedes colocar un PNG diferente para cada sección en `assets/images/`:
- `render-stats.png` — Estadísticas
- `render-items.png` — Items equipados
- `render-friends.png` — Personajes / amigos
- `render-gallery.png` — Galería
- `render-messages.png` — Messages

El apartado Perfil mantiene su animación `assets/video/suisui-profile.webm`. El archivo `assets/images/render-profile.png` queda reservado si más adelante quieres añadir un render estático específico para esa pantalla sin sustituir el WEBM.

### V2.5 — imágenes en PNG y galería interactiva
Las imágenes editables del proyecto usan formato PNG para que puedas reemplazarlas sin tocar el código.
La galería utiliza `gallery-01.png` a `gallery-04.png` y añade parallax, zoom, borde dorado y brillo dorado al pasar el cursor.


### V2.8 — Galería dark-gold holográfica
El borde de la galería usa un dorado oscuro. Al pasar el cursor, cada tarjeta activa un brillo glossy tipo carta holográfica, parallax, zoom y una inclinación 3D suave.

### Dónde cambiar imágenes e iconos
- Amigos: `assets/images/avatar-01.png` a `avatar-04.png`. Se usan tanto en la lista de amigos como en las notificaciones dinámicas.
- Items: `assets/images/item-weapon.png`, `item-echo.png`, `item-core.png`.
- Galería: `assets/images/gallery-01.png` a `gallery-04.png`.
- Renders por sección: `assets/images/render-stats.png`, `render-items.png`, `render-friends.png`, `render-gallery.png`, `render-messages.png`.
- WEBM del perfil: `assets/video/suisui-profile.webm`.
Para añadir más amigos o cambiar nombres/textos, edita las tarjetas `.friend` de `index.html`. Para cambiar los mensajes/notificaciones dinámicos, edita el arreglo `messages` de `js/app.js`.


### Items PNG — V3.9
Los 9 items de la sección **Items** están preparados para usar archivos PNG individuales en:
`assets/images/items/`

Nombres exactos:
- `item-01.png` — Arma favorita
- `item-02.png` — Eco / Resonancia
- `item-03.png` — Core de SuiSui
- `item-04.png` — Accesorio lunar
- `item-05.png` — Fragmento de marea
- `item-06.png` — Perla celeste
- `item-07.png` — Orbe cristalino
- `item-08.png` — Pluma de luz
- `item-09.png` — Talismán de hielo

Los archivos incluidos son copias de respaldo de los 3 PNG de item existentes, para que el proyecto no quede con imágenes rotas. Puedes reemplazarlos directamente por tus 9 PNG definitivos manteniendo esos nombres. El efecto glossy de una pasada ya está aplicado a los 9 cuadros.
