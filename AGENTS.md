# Reglas del proyecto

## Seguridad de Docker

- Nunca ejecutar comandos globales de limpieza o `prune`.
- Nunca detener, eliminar ni modificar contenedores, imágenes, redes o volúmenes ajenos a este proyecto.
- Antes de modificar Docker, inventariar contenedores, volúmenes, redes y puertos ocupados.
- Si un puerto necesario está ocupado por otro proyecto, detenerse y pedir autorización; no intervenir automáticamente.
- Todos los recursos deben llevar el nombre o prefijo del proyecto `cripticos`.
- Usar un nombre de proyecto explícito: `docker compose -p cripticos ...`.
- El volumen previsto para PostgreSQL es exclusivamente `cripticos_postgres_data`.
- No ejecutar `docker compose down --volumes` ni eliminar `cripticos_postgres_data` sin confirmación expresa que indique la pérdida de datos.
- Preferir operaciones no destructivas y acotadas: `docker compose create`, `docker compose up` y `docker compose stop`.

## Producto

- No copiar marcas, textos, pistas ni recursos gráficos de terceros.
- Mantener una identidad y contenido originales.
- Tratar la accesibilidad, SEO, privacidad y rendimiento como requisitos de producción.
- Los anuncios nunca deben confundirse con controles del juego ni bloquear la experiencia principal.
