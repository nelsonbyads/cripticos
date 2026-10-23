---
name: EnigmAds SSD
description: Continuar el desarrollo de EnigmAds usando el flujo SSD (Specification, System Design, Delivery), respetando su arquitectura, seguridad Docker, monetización y backlog.
---

# EnigmAds · flujo SSD

Usa esta skill para cualquier cambio funcional, técnico, editorial, publicitario o de despliegue de EnigmAds.

En este proyecto, **SSD** significa:

1. **Specification**: definir el problema, alcance, casos, criterios de aceptación y exclusiones.
2. **System Design**: diseñar UI, datos, API, seguridad, migración, observabilidad y despliegue antes de programar.
3. **Delivery**: implementar en incrementos pequeños, validar, documentar y publicar de forma reversible.

## Inicio obligatorio de cada sesión

1. Leer `../../../AGENTS.md` y cumplir especialmente las reglas Docker.
2. Leer `references/current-state.md` para no reconstruir ni contradecir lo existente.
3. Leer `references/backlog.md` y ubicar el trabajo en su prioridad.
4. Comprobar `git status`, rama y remoto antes de editar.
5. Si se modificará Docker, inventariar primero contenedores, volúmenes, redes y puertos. Nunca asumir que otros recursos pertenecen al proyecto.

## Fase 1 · Specification

Antes de implementar una funcionalidad no trivial, redactar o actualizar `docs/specs/<tema>.md` con:

- Problema y resultado esperado.
- Persona usuaria y recorrido principal.
- Requisitos funcionales y no funcionales.
- Criterios de aceptación observables.
- Casos límite, errores y estados vacíos.
- Privacidad, seguridad, SEO, accesibilidad y publicidad aplicables.
- Fuera de alcance.

No empezar la implementación si falta una decisión que pueda cambiar el modelo de datos, el contrato API, la monetización o el despliegue. En ese caso, preguntar primero.

## Fase 2 · System Design

Añadir a la especificación:

- Componentes y rutas afectados.
- Cambios de esquema y estrategia de migración sin pérdida de datos.
- Contratos de entrada/salida y autorización.
- Estados de interfaz y adaptación móvil.
- Riesgos, medidas de seguridad y plan de reversión.
- Plan de pruebas y telemetría.

Reglas técnicas:

- Mantener Next.js App Router, TypeScript estricto, PostgreSQL y Drizzle ORM.
- Validar entradas del servidor con Zod.
- No enviar respuestas de enigmas, borradores ni explicaciones al cliente antes de tiempo.
- Proteger todo el panel y toda mutación con autorización de administrador.
- Mantener secretos únicamente en variables de entorno; nunca registrarlos en Git o logs.
- No cargar AdSense antes del consentimiento correspondiente.
- No confundir anuncios con controles ni colocarlos de forma que provoquen clics accidentales.
- En Vercel usar PostgreSQL administrado; Docker es solo para desarrollo local.

## Fase 3 · Delivery

1. Implementar el menor incremento que cumpla la especificación.
2. Añadir o actualizar migraciones versionadas; nunca alterar datos destructivamente sin autorización.
3. Ejecutar como mínimo:

```bash
npm run lint
npm run typecheck
npm run build
npm audit
```

4. Ejecutar pruebas específicas y smoke tests del recorrido afectado.
5. Actualizar `README.md`, la especificación y `references/current-state.md` si cambió la arquitectura o el estado del producto.
6. Actualizar `references/backlog.md`: marcar lo terminado y registrar deuda nueva.
7. Revisar que `.env` continúe ignorado y que no haya secretos en el diff.
8. Crear commits descriptivos y publicar en `origin/main` solo cuando las validaciones estén correctas y el alcance lo autorice.

## Definición de terminado

Un cambio solo está terminado cuando:

- Cumple todos los criterios de aceptación.
- Tiene manejo de errores y estados vacíos.
- Funciona con teclado y en pantalla móvil.
- No degrada SEO, privacidad, seguridad ni Core Web Vitals.
- No expone contenido editorial antes de su publicación.
- Compila, pasa lint y no introduce vulnerabilidades conocidas.
- Queda documentado y sincronizado con el repositorio.

## Archivos de referencia

- Estado y arquitectura: `references/current-state.md`
- Trabajo pendiente: `references/backlog.md`
- Plantilla SSD: `references/spec-template.md`
