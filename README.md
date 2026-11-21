# Cronograma 2026 · Nuestra Señora del Valle

Sitio web con el cronograma de la novena y la Solemnidad de la Pura y Limpia Concepción del Valle (29 de noviembre al 8 de diciembre de 2026).

Hecho con React + Vite.

## Usarlo en la computadora

```bash
npm install     # solo la primera vez
npm run dev     # abre http://localhost:5173
```

## Cambiar horarios o textos

Todo el cronograma está en `src/data.js`. Las fotos están en `public/`.

## Publicación

Cada vez que se sube un cambio a la rama `main`, Cloudflare publica el sitio automáticamente
(configuración en `wrangler.jsonc`).
