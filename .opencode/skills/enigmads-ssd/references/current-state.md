# Estado actual de EnigmAds

Última actualización: 23 de octubre de 2026.

## Producto

- Marca provisional/definida: **EnigmAds**.
- Mercado inicial: Latinoamérica, español `es-419`.
- Dirección visual: editorial premium.
- Repositorio: `https://github.com/nelsonbyads/cripticos.git`.
- Rama principal: `main`.

## Arquitectura

- Next.js 16 App Router y React 19.
- TypeScript estricto.
- PostgreSQL 17.
- Drizzle ORM para consultas y esquema tipado.
- Zod para validaciones de formularios y API.
- Autenticación administrativa propia con bcrypt, JWT firmado y cookie `httpOnly`.
- Persistencia del progreso del jugador en `localStorage`.
- Validación de respuestas y entrega de pistas mediante API del servidor.

## Web pública terminada

- Portada con el reto disponible más reciente.
- Juego por casillas, intentos, pistas y compartir resultado.
- Archivo público y páginas individuales por slug.
- Página “Cómo jugar”.
- Diseño responsive y navegación por teclado básica.
- `robots.txt`, sitemap y metadatos sociales.
- Páginas iniciales de privacidad y cookies.
- Favicon e identidad EnigmAds originales.

## Administración terminada

- Acceso privado en `/admin/login`.
- Dashboard editorial en `/admin`.
- Crear y editar retos.
- Estados: borrador, programado, publicado y archivado.
- Fecha y hora de publicación, autor y slug.
- Archivado no destructivo.
- Borradores y archivados bloqueados en las API públicas.

## Publicidad

- Componente reutilizable de espacios publicitarios.
- Variables para cliente y slots de Google AdSense.
- El script de AdSense no se carga hasta aceptar publicidad.
- Marcado visible de los espacios como publicidad.
- No hay identificador real de AdSense configurado todavía.

## Docker local

- Proyecto Compose explícito: `cripticos`.
- Contenedor: `cripticos-postgres`.
- Imagen: `postgres:17-alpine`.
- Puerto: `127.0.0.1:5435` → `5432`.
- Volumen persistente exclusivo: `cripticos_postgres_data`.
- Red exclusiva: `cripticos_network`.
- El contenedor quedó saludable y en ejecución al cerrar la sesión de implementación.
- No detener, eliminar ni modificar recursos Docker de otros proyectos.

## Datos y entorno

- Migración inicial: `drizzle/0000_initial.sql`.
- Scripts: `npm run db:migrate` y `npm run db:seed`.
- Ocho enigmas originales de muestra sembrados desde `src/data.ts`.
- Credenciales locales generadas en `.env`; ese archivo está ignorado y no está en Git.
- `.env.example` documenta las variables requeridas.

## Validación completada

- `npm run build`: correcto.
- `npm run typecheck`: correcto.
- `npm run lint`: correcto.
- `npm audit`: 0 vulnerabilidades.
- Portada y login respondieron por HTTP local.
- Semilla ejecutada correctamente.

## Despliegue

- El código está preparado para Vercel, pero aún no se creó el proyecto Vercel.
- Producción necesita PostgreSQL administrado; Vercel no alojará el contenedor local.
- No hay dominio, variables productivas ni AdSense real configurados todavía.
- Los textos legales son borradores y requieren datos reales y revisión antes de publicar.
