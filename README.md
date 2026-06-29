# Reto de Code Review — El Pull Request de Piter el Zombie

## Historia

Bienvenido a **Funeraria San Gabriel**. La empresa lleva años llevando su operación en
cuadernos y hojas de Excel, y por fin decidió digitalizarse: están construyendo una API
en **NestJS** para gestionar sus servicios funerarios (difuntos, familiares a cargo,
facturación, inventario de ataúdes, etc).

El encargado de arrancar el primer módulo fue **Piter el Zombie**, el desarrollador
junior del equipo. Piter es entusiasta, aprende rápido, pero todavía no tiene mucho
criterio de diseño ni de seguridad — y nadie le hizo code review antes de que se
acostumbrara a ciertas "mañas".

Piter acaba de abrir un Pull Request con el módulo de **gestión de difuntos**
(`src/difuntos/*`). Este PR va dirigido a la rama `main`, que se despliega
**directamente a producción** apenas se aprueba el merge — no hay un ambiente de
staging intermedio ni un proceso de QA posterior. En la descripción del PR escribió:

> "¡Listo! Ya probé todo en Postman y funciona perfecto, todo regresa 200. Lo subí
> rapidito porque necesitamos esto para la demo del viernes. Cualquier cosa me dicen 🧟"

**Tú eres el Tech Lead del equipo y el único revisor asignado.** Te toca revisar este
Pull Request antes de que se mezcle a `main` y se despliegue a producción. Lo que
apruebes aquí queda expuesto a usuarios reales de la funeraria de inmediato: no hay una
segunda red de seguridad después de tu aprobación. Tu misión es leer el código con ojo
crítico, encontrar todo lo que está mal (aunque "funcione"), y decidir si lo apruebas,
lo apruebas con cambios, o lo rechazas.

Este repositorio **es el código que Piter subió**, tal cual. No le quites nada importante,
analízalo como si fuera la primera vez que lo ves.

## Por qué este reto

Que un endpoint responda `200 OK` no significa que el código esté bien. Este ejercicio
simula una situación común en cualquier equipo: un PR que "funciona" en la superficie,
pero esconde problemas de seguridad, de arquitectura y de mantenibilidad que van a costar
caro más adelante (brechas de seguridad, bugs difíciles de rastrear, código que nadie
quiere tocar). La idea es practicar la habilidad de **leer código ajeno con escepticismo
profesional**, no solo de escribir código propio.

## Cómo correr el proyecto

Requisitos: Node.js 18+ y npm.

```bash
npm install
npx nest build
node dist/main.js
```

La API queda disponible en `http://localhost:3000`. Internamente usa una base de datos
SQLite local (`funeraria_san_gabriel.sqlite`, se crea sola al levantar la app), así que
no necesitas levantar Postgres, MySQL ni nada externo para probarlo.

También puedes correrlo en modo watch durante el desarrollo:

```bash
npx nest start --watch
```

### Endpoints que expone el PR de Piter

| Método | Ruta                          | Qué hace                                   |
|--------|-------------------------------|---------------------------------------------|
| POST   | `/difuntos`                   | Crea un difunto                              |
| GET    | `/difuntos`                   | Lista todos los difuntos                     |
| GET    | `/difuntos/buscar?nombre=...` | Busca difuntos por nombre                    |
| GET    | `/difuntos/:id`                | Obtiene el detalle de un difunto            |
| POST   | `/difuntos/:id/facturar`       | Calcula y registra el cobro de un servicio  |
| DELETE | `/difuntos/:id`                 | Elimina un difunto                         |
| POST   | `/difuntos/:id/observacion`     | Actualiza una observación interna          |

Ejemplo rápido para probar que efectivamente "funciona":

```bash
curl -X POST localhost:3000/difuntos \
  -H 'Content-Type: application/json' \
  -d '{"nombre_difunto":"Juan","apellidoDifunto":"Perez","qtyAtaud":1}'

curl localhost:3000/difuntos
```

## Tu tarea como revisor

1. **Levanta el proyecto** y prueba los endpoints (con curl, Postman o Insomnia) para
   entender qué hace el módulo y confirmar que, en efecto, "funciona".
2. **Recorre todo el repositorio** ―el Pull Request completo, no un archivo en
   particular― como si estuvieras dejando comentarios en un Pull Request real. Nadie te
   va a decir de antemano qué tocó Piter ni dónde están los problemas: en la vida real
   el `diff` puede tocar cualquier archivo, y a veces el problema no está donde uno
   esperaría.
3. **Identifica todos los problemas que encuentres.** No te límites a uno solo — este PR
   tiene varios, de distintas categorías: seguridad, arquitectura, diseño, manejo de
   datos, configuración y estilo/consistencia del código.
4. **Para cada problema que encuentres, documenta:**
   - Qué archivo y línea(s) están involucradas.
   - Qué está mal y **por qué** es un riesgo o una mala práctica (no basta con decir
     "esto está mal", explica la consecuencia concreta).
   - Cómo lo solucionarías. No es obligatorio reescribir todo el código — basta con una
     propuesta clara (puede ser texto, pseudo-código, o un diff puntual).
5. **Da tu veredicto final.** Elige uno y justifícalo en un párrafo:
   - ✅ **Apruebas** el Pull Request tal cual está.
   - 🟡 **Apruebas con cambios** (indicando cuáles son bloqueantes y cuáles no).
   - ❌ **Rechazas** el Pull Request.

No existe una única lista "correcta" de hallazgos — lo importante es la calidad del
análisis y de la justificación, igual que en un code review real de trabajo. Este reto
no incluye pistas: en un Pull Request real nadie te dice por dónde buscar los
problemas, así que el ejercicio empieza y termina con tu propio criterio.

## Entregable sugerido

Un documento (markdown, PDF o lo que prefieras) con:

1. Lista de hallazgos, cada uno con: ubicación, descripción del problema, riesgo y
   propuesta de solución.
2. Veredicto final del Pull Request, justificado.

No hace falta que corrijas el código en este repositorio — el objetivo del reto es la
revisión, no la implementación de la solución.
