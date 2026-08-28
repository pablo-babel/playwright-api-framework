# API Automation Framework

Proyecto de aprendizaje para diseñar e implementar un framework de automatización de APIs utilizando **Playwright** y **TypeScript**.

El objetivo principal es aprender y aplicar buenas prácticas de arquitectura, programación orientada a objetos (POO), mantenibilidad, reutilización de código y diseño de pruebas automatizadas.

Como API de práctica se utiliza **Restful Booker**.

> Este proyecto es exclusivamente con fines de aprendizaje y práctica.

---

## Objetivos del proyecto

El framework busca proporcionar una base reutilizable y escalable para automatizar APIs.

Los principales objetivos son:

- Automatizar endpoints de una API REST.
- Aplicar buenas prácticas de programación.
- Utilizar TypeScript para mejorar la seguridad de tipos.
- Aplicar el patrón **Service Object**.
- Separar responsabilidades mediante una arquitectura por capas.
- Centralizar la configuración.
- Crear datos de prueba reutilizables.
- Implementar validadores reutilizables.
- Organizar las pruebas por funcionalidad y tipo de ejecución.
- Incorporar herramientas de calidad de código.
- Mantener una estructura preparada para futuras integraciones con CI/CD.

---

## Tecnologías

- Node.js
- TypeScript
- Playwright
- Faker
- AJV
- ESLint
- Prettier
- dotenv

---

## Instalación

Clonar el repositorio y acceder al proyecto:

```bash
git clone https://github.com/pablo-babel/playwright-api-framework.git
cd api-playwright
```

Instalar las dependencias:

```bash
npm install
```

---

## Configuración

El proyecto utiliza variables de entorno para administrar la configuración.

Ejemplo:

```text
.env.dev
.env.qa
.env.prod
```

Las variables de entorno no deben contener información sensible dentro del repositorio.

Para ejecutar el proyecto correctamente, configura las variables necesarias según el ambiente utilizado.

---

## Ejecutar las pruebas

Para ejecutar todas las pruebas:

```bash
npx playwright test
```

Para ejecutar un archivo específico:

```bash
npx playwright test tests/booking/booking.spec.ts
```

Para ejecutar una prueba específica utilizando `-g`:

```bash
npx playwright test -g "POST /booking should create a booking"
```

Para ejecutar las pruebas en un navegador específico:

```bash
npx playwright test --project=chromium
```

---

## Reporte HTML

Playwright genera un reporte HTML después de la ejecución de las pruebas.

Para abrir el último reporte:

```bash
npx playwright show-report
```

---

## Calidad de código

El proyecto utiliza **ESLint** para detectar problemas potenciales y mantener reglas de calidad.

Ejecutar ESLint:

```bash
npm run lint
```

También se utiliza **Prettier** para mantener un formato consistente.

Formatear el proyecto:

```bash
npm run format
```

Verificar el formato sin modificar archivos:

```bash
npm run format:check
```

Para comprobar los tipos de TypeScript sin generar archivos JavaScript:

```bash
npx tsc --noEmit
```

---

## Arquitectura

El framework utiliza una arquitectura por capas y aplica el principio de responsabilidad única (**SRP**).

La comunicación con la API se encuentra separada de los casos de prueba.

Las pruebas interactúan principalmente con los **Services**, mientras que estos utilizan el cliente HTTP centralizado.

Flujo general:

```text
Tests
  │
  ▼
Services
  │
  ▼
ApiClient
  │
  ▼
Playwright APIRequestContext
  │
  ▼
REST API
```

---

## Service Object Pattern

Las operaciones de cada recurso de la API se encapsulan dentro de servicios.

Ejemplos:

```text
AuthService
BookingService
HealthService
```

Los tests no deberían realizar directamente las llamadas HTTP.

Por ejemplo:

```typescript
await bookingService.createBooking(bookingData);
```

en lugar de implementar directamente una petición HTTP dentro del test.

Esto facilita la reutilización y el mantenimiento del código.

---

## Datos de prueba

El proyecto utiliza diferentes estrategias para administrar los datos de prueba.

### Faker

Se utiliza Faker para generar información dinámica.

Esto permite evitar datos completamente hardcodeados y generar diferentes combinaciones de datos.

### Factory

Las factories permiten crear objetos de prueba reutilizables.

Ejemplo:

```text
BookingFactory
```

### Builder

Los builders permiten construir objetos de prueba cuando necesitamos personalizar determinados valores.

Ejemplo:

```typescript
const bookingData = new BookingBuilder()
  .withFirstname("Juan")
  .withLastname("Pérez")
  .withTotalPrice(500)
  .withDepositPaid(false)
  .withAdditionalNeeds("Dinner")
  .build();
```

### Datos estáticos

Los datos estáticos se mantienen para escenarios donde utilizar valores conocidos mejora la claridad de la prueba.

Ejemplos:

```text
AuthData
BookingData
```

---

## Validaciones reutilizables

Las validaciones comunes se centralizan en:

```text
src/validators/ResponseValidator.ts
```

Actualmente se utilizan para validar aspectos como:

- Status code
- Headers
- Tiempo de respuesta
- JSON Schema

Esto evita duplicar la misma lógica de validación en diferentes pruebas.

---

## JSON Schema

Para las validaciones de estructura de las respuestas se utiliza **AJV**.

Los schemas se mantienen separados de los tests.

Ejemplo:

```text
src/
└── schemas/
    └── BookingSchema.ts
```

Esto permite reutilizar los schemas en diferentes pruebas.

---

## Organización de las pruebas

Las pruebas se organizan por funcionalidad.

Ejemplo:

```text
tests/
├── auth/
├── booking/
├── health/
├── negative/
└── utils/
```

También se utilizan suites para clasificar diferentes tipos de ejecución:

```text
Smoke
Regression
Integration
```

Esto permite ejecutar diferentes grupos de pruebas dependiendo del objetivo de la ejecución.

---

## Pruebas negativas

El framework también incluye pruebas para validar comportamientos incorrectos o condiciones de error.

Entre los escenarios contemplados se encuentran:

- Datos inválidos.
- Token inválido.
- Recursos inexistentes.
- Operaciones no autorizadas.

Las pruebas negativas permiten comprobar que la API responde correctamente ante condiciones inesperadas.

---

## Estructura del proyecto

La estructura actual del proyecto sigue aproximadamente esta organización:

```text
api-playwright/
│
├── src/
│   ├── builders/
│   ├── config/
│   ├── core/
│   ├── data/
│   ├── factories/
│   ├── models/
│   ├── schemas/
│   ├── services/
│   ├── types/
│   └── validators/
│
├── tests/
│   ├── auth/
│   ├── booking/
│   ├── health/
│   ├── negative/
│   └── utils/
│
├── Reports/
├── playwright.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

---

## Buenas prácticas

Al desarrollar nuevas funcionalidades se siguen las siguientes reglas:

1. Mantener cada clase enfocada en una responsabilidad específica.
2. Evitar duplicación de código.
3. Utilizar Services para encapsular las operaciones de la API.
4. Utilizar modelos para representar estructuras de datos.
5. Utilizar Factory y Builder cuando aporten reutilización o flexibilidad.
6. Evitar hardcodear datos cuando puedan ser generados o reutilizados.
7. Centralizar las validaciones comunes.
8. Mantener la configuración separada del código de las pruebas.
9. Utilizar nombres descriptivos para clases, métodos y pruebas.
10. Mantener una estructura de carpetas consistente.
11. Utilizar ESLint para detectar problemas de código.
12. Utilizar Prettier para mantener un formato consistente.
13. Mantener las pruebas enfocadas en validar comportamiento.
14. Evitar colocar lógica de infraestructura directamente dentro de los tests.
15. Ejecutar las validaciones de calidad antes de considerar una funcionalidad terminada.

---

## Flujo recomendado

Antes de considerar un cambio terminado:

```bash
npm run lint
```

```bash
npm run format:check
```

```bash
npx tsc --noEmit
```

```bash
npx playwright test
```

El objetivo es mantener:

```text
ESLint       → Código limpio
Prettier     → Formato consistente
TypeScript   → Seguridad de tipos
Playwright   → Pruebas automatizadas
```

---

## Estado del proyecto

El framework se encuentra en desarrollo y continúa evolucionando mediante diferentes etapas de aprendizaje.

Hasta el momento se han trabajado conceptos como:

- Arquitectura por capas.
- Service Object Pattern.
- Configuración por ambientes.
- Automatización CRUD.
- Datos dinámicos con Faker.
- Factory Pattern.
- Builder Pattern.
- Validadores reutilizables.
- JSON Schema.
- Pruebas negativas.
- Organización de suites.
- Logging.
- ESLint.
- Prettier.
- Buenas prácticas de código.

El proyecto continuará incorporando nuevas mejoras y conceptos de automatización durante las siguientes etapas.
