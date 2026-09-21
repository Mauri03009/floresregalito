# Sorpresa de primavera

Una página romántica, elegante y responsive para regalar por el Día de la Primavera. Tiene una pantalla de entrada, flores amarillas animadas, destellos, corazones, frases secuenciales y fuegos artificiales hechos con Three.js.

## Abrirla ahora

No hace falta instalar nada: abrí `index.html` con doble clic en un navegador moderno. Para que las fuentes y los fuegos artificiales de Three.js se carguen, el dispositivo debe tener conexión a internet (se descargan desde CDN).

## Personalizar el texto

Editá las frases dentro de `index.html`. Buscá los elementos con `class="message"`. También podés cambiar el nombre “Nova” en el encabezado y la paleta principal al comienzo de `style.css`.

## Publicar en GitHub Pages

1. Creá un repositorio nuevo en GitHub y subí estos cuatro archivos a su carpeta raíz.
2. En el repositorio, abrí **Settings → Pages**.
3. En “Build and deployment”, elegí **Deploy from a branch** y seleccioná la rama `main` y la carpeta `/(root)`.
4. Guardá. GitHub mostrará el enlace público después de unos minutos.

## Publicar en Vercel

1. Entrá a [vercel.com](https://vercel.com) e iniciá sesión.
2. Elegí **Add New → Project** e importá el repositorio de GitHub, o arrastrá esta carpeta al panel de Vercel.
3. No configures un framework: es un sitio estático.
4. Elegí **Deploy**. Vercel te dará un enlace para compartir.

## Archivos

- `index.html`: estructura y textos de la sorpresa.
- `style.css`: estética, flores y animaciones responsivas.
- `script.js`: secuencia de frases, corazones y fuegos artificiales Three.js.

La página no guarda información ni necesita servidor: GitHub Pages y Vercel la sirven directamente.
