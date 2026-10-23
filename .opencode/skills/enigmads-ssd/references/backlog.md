# Backlog de EnigmAds

Mantener este archivo priorizado y actualizarlo después de cada entrega.

## P0 · Antes de producción

- [ ] Elegir y comprar el dominio definitivo.
- [ ] Crear el proyecto en Vercel y conectarlo al repositorio GitHub.
- [ ] Contratar/configurar PostgreSQL administrado para producción.
- [ ] Ejecutar migraciones y semilla segura en producción.
- [ ] Configurar variables productivas y rotar credenciales/`SESSION_SECRET`.
- [ ] Sustituir los datos provisionales del administrador.
- [ ] Completar razón social, contacto, jurisdicción y derechos en textos legales.
- [ ] Definir zona horaria editorial; no depender de la zona horaria del servidor.
- [ ] Crear páginas de error y recuperación ante base de datos no disponible.
- [ ] Añadir encabezados CSP y demás cabeceras de seguridad.
- [ ] Incorporar rate limiting para login, comprobación y pistas.
- [ ] Añadir copias de seguridad y procedimiento probado de restauración.

## P1 · Calidad editorial y administración

- [ ] Vista previa real de borradores protegida para administradores.
- [ ] Duplicar reto y reordenar calendario.
- [ ] Etiquetas, dificultad, tipo de técnica y notas internas.
- [ ] Contador de letras/palabras y validación editorial en vivo.
- [ ] Historial de cambios y auditoría de quién publicó.
- [ ] Manejar conflictos de número/slug con mensajes amigables.
- [ ] Importar/exportar retos en CSV o JSON.
- [ ] Buscador, filtros y paginación del panel.
- [ ] Roles separados de administrador y editor.

## P1 · Experiencia del jugador

- [ ] Recuperar racha, mejor racha y estadísticas completas.
- [ ] Calendario visual de retos resueltos.
- [ ] Mejorar pegado, navegación con flechas y lectores de pantalla.
- [ ] Aviso de conexión y manejo de fallos de API.
- [ ] Evitar envíos simultáneos y añadir límites de frecuencia.
- [ ] Cuenta atrás al siguiente reto según zona horaria editorial.
- [ ] Compartir URL y cuadrícula sin revelar la respuesta.
- [ ] Tema oscuro opcional.
- [ ] Cuentas de jugador y sincronización multidispositivo, solo si las métricas lo justifican.

## P1 · Monetización y crecimiento

- [ ] Publicar suficiente contenido original de calidad antes de solicitar AdSense.
- [ ] Crear cuenta de Google AdSense y obtener aprobación del dominio.
- [ ] Configurar publisher ID y slots reales en Vercel.
- [ ] Publicar `ads.txt` con el identificador aprobado.
- [ ] Implementar una CMP certificada por Google si se atiende tráfico del EEE/Reino Unido/Suiza.
- [ ] Definir posiciones publicitarias por dispositivo sin afectar el juego ni CLS.
- [ ] Configurar analítica respetuosa con la privacidad y eventos del embudo.
- [ ] Medir retención diaria, resolución, uso de pistas, RPM y Core Web Vitals.
- [ ] Añadir Open Graph dinámico para compartir cada reto.
- [ ] Diseñar estrategia SEO editorial y páginas indexables con contenido suficiente.
- [ ] Explorar patrocinio, membresía sin anuncios y productos propios; no depender solo de AdSense.

## P2 · Ingeniería y operación

- [ ] Pruebas unitarias para normalización, publicación y rachas.
- [ ] Pruebas de integración para autenticación y API de retos.
- [ ] Pruebas E2E con Playwright para juego y panel.
- [ ] CI en GitHub Actions: lint, typecheck, test, build y audit.
- [ ] Entornos preview/staging con datos separados.
- [ ] Monitoreo de errores y disponibilidad.
- [ ] Logs estructurados sin secretos ni respuestas de retos.
- [ ] Lighthouse y auditoría WCAG 2.2 AA.
- [ ] Migraciones incrementales con tabla de control y plan de rollback.

## P3 · Ideas de producto

- [ ] Modo contrarreloj y retos especiales.
- [ ] Taller de pistas enviadas por la comunidad con moderación.
- [ ] Rankings opcionales sin patrones adictivos perjudiciales.
- [ ] Boletín diario y notificaciones opt-in.
- [ ] Aplicación instalable PWA.

## Notas comerciales

- La aprobación de AdSense y los ingresos nunca se consideran garantizados.
- Priorizar retención y contenido original antes de aumentar la densidad publicitaria.
- Evaluar ingresos por país, dispositivo y formato sin sacrificar accesibilidad o confianza.
