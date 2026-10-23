# EnigmAds

Plataforma editorial de enigmas diarios con web pública, panel privado y monetización preparada para Google AdSense. Está construida con Next.js, TypeScript, PostgreSQL y Drizzle ORM.

## Ejecutar en local

1. Copia `.env.example` como `.env` y cambia `SESSION_SECRET`, `ADMIN_EMAIL` y `ADMIN_PASSWORD`.
2. Inicia exclusivamente la base de datos del proyecto:

```bash
docker compose -p cripticos up -d postgres
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

La aplicación estará disponible normalmente en `http://localhost:3000` y el panel en `/admin`.

## Comandos

- `npm run dev`: servidor de desarrollo Next.js.
- `npm run build`: compilación de producción.
- `npm run typecheck`: comprobación estricta de TypeScript.
- `npm run lint`: análisis estático.
- `npm run db:migrate`: aplica el esquema versionado a PostgreSQL.
- `npm run db:seed`: crea o actualiza el administrador y los retos de muestra.

## Contenido

Después de ejecutar la semilla, los contenidos se crean, editan, programan, publican y archivan desde `/admin`. `src/data.ts` solo contiene el material inicial de demostración.

El progreso de los jugadores permanece en su dispositivo. Las respuestas se validan en el servidor y no se incluyen en el HTML público.

## Alcance actual

- Web pública optimizada para SEO y archivo de retos.
- Entrada por casillas, navegación por teclado y pegado de palabras.
- Ayudas de definición, mecanismo y letras con penalización.
- Persistencia local, intentos y resultado compartible.
- Panel editorial protegido con sesión segura.
- Flujo de borrador, programación, publicación y archivo.
- PostgreSQL local aislado en `127.0.0.1:5435`.
- Espacios AdSense y consentimiento previo a cargar publicidad.
- Páginas de privacidad, cookies, robots y sitemap.

## Producción

Vercel no ejecuta PostgreSQL persistente en Docker. Para publicar se necesita un PostgreSQL administrado y configurar allí `DATABASE_URL`. También deben completarse los datos legales, conectar un dominio y añadir el identificador y los slots aprobados por AdSense.

La aprobación de AdSense y los ingresos no están garantizados: dependen del contenido, tráfico, procedencia de la audiencia y cumplimiento de sus políticas.
