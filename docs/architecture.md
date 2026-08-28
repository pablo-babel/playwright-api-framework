# Arquitectura del Framework

## Introducción

El framework utiliza una arquitectura por capas para separar responsabilidades y facilitar el mantenimiento, reutilización y crecimiento del proyecto.

La arquitectura está basada principalmente en:

- Arquitectura por capas.
- Service Object Pattern.
- Single Responsibility Principle (SRP).
- Encapsulación.
- Modelos tipados.
- Componentes reutilizables.

---

## Flujo general

El flujo principal del framework es:

```text
Test
 │
 ▼
Service
 │
 ▼
BaseService
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

Cada capa tiene una responsabilidad específica.

---

## Tests

Los tests contienen los escenarios que queremos automatizar.

Ejemplo:

```text
tests/
├── auth/
├── booking/
├── health/
├── negative/
└── utils/
```

Los tests son responsables principalmente de:

- Preparar los datos.
- Ejecutar operaciones mediante los Services.
- Validar las respuestas.
- Verificar el comportamiento esperado.

Los tests no deberían encargarse directamente de administrar la comunicación HTTP.

---

## Services

Los Services encapsulan las operaciones relacionadas con cada recurso de la API.

Ejemplos:

```text
AuthService
BookingService
HealthService
```

Por ejemplo, `BookingService` contiene operaciones relacionadas con bookings:

```text
createBooking()
getBooking()
getBookingIds()
updateBooking()
partialUpdateBooking()
deleteBooking()
```

Esto permite que los tests trabajen con métodos orientados al negocio en lugar de implementar directamente llamadas HTTP.

---

## BaseService

`BaseService` proporciona comportamiento común para los Services.

Los Services pueden extender esta clase para reutilizar funcionalidades comunes.

Ejemplo:

```typescript
export class BookingService extends BaseService {
  // Booking operations
}
```

Esto evita duplicar lógica común entre diferentes Services.

---

## ApiClient

`ApiClient` encapsula la comunicación con Playwright.

Su responsabilidad principal es administrar el `APIRequestContext` y proporcionar métodos HTTP reutilizables.

Ejemplo conceptual:

```text
ApiClient
├── GET
├── POST
├── PUT
├── PATCH
└── DELETE
```

Los Services utilizan `ApiClient` para comunicarse con la API.

De esta manera, la implementación de Playwright permanece aislada de los tests.

---

## Configuración

La configuración se encuentra centralizada mediante `ConfigManager`.

El framework permite trabajar con diferentes ambientes mediante variables de entorno.

Ejemplo:

```text
.env.dev
.env.qa
.env.prod
```

El objetivo es evitar colocar directamente valores específicos del ambiente dentro del código.

---

## Models

Los modelos representan las estructuras de datos utilizadas por la API.

Ejemplos:

```text
models/
├── AuthRequest
├── AuthResponse
├── BookingRequest
└── BookingResponse
```

Esto permite aprovechar el tipado de TypeScript y detectar inconsistencias durante el desarrollo.

---

## Factory

Las factories permiten generar datos reutilizables para las pruebas.

Ejemplo:

```text
BookingFactory
```

Una Factory resulta especialmente útil cuando queremos generar datos dinámicos utilizando Faker.

---

## Builder

El Builder permite construir objetos de prueba de manera flexible.

Ejemplo:

```typescript
const booking = new BookingBuilder()
  .withFirstname("Juan")
  .withLastname("Pérez")
  .withTotalPrice(500)
  .build();
```

Esto permite modificar únicamente los valores necesarios para un escenario determinado.

---

## Validators

Las validaciones reutilizables se centralizan en:

```text
src/validators/ResponseValidator.ts
```

Actualmente se utilizan para validar diferentes aspectos de las respuestas HTTP, como:

- Status codes.
- Headers.
- Tiempo de respuesta.
- JSON Schema.

Esto evita duplicar lógica de validación en los tests.

---

## Schemas

Los JSON Schemas se encuentran separados de los tests.

Ejemplo:

```text
src/
└── schemas/
    └── BookingSchema.ts
```

Se utiliza AJV para validar que las respuestas cumplan con la estructura esperada.

---

## Organización de suites

Las pruebas están organizadas utilizando diferentes suites:

```text
Smoke
Regression
Integration
```

Esto permite ejecutar diferentes grupos de pruebas dependiendo del objetivo de la ejecución.

Por ejemplo:

- Smoke: validaciones rápidas de funcionalidades críticas.
- Regression: conjunto más amplio de pruebas.
- Integration: validaciones relacionadas con la interacción entre componentes.

---

## Principios aplicados

### Single Responsibility Principle

Cada componente debe tener una responsabilidad clara.

Por ejemplo:

```text
ApiClient       → Comunicación HTTP
Service         → Operaciones de API
Factory         → Generación de datos
Builder         → Construcción personalizada de datos
Validator       → Validaciones reutilizables
ConfigManager   → Configuración
Test            → Escenario y assertions
```

### Reutilización

La lógica común debe mantenerse en componentes reutilizables para evitar duplicación.

### Encapsulación

Los detalles de implementación deben permanecer dentro de la capa correspondiente.

### Tipado

TypeScript se utiliza para definir estructuras y detectar errores durante el desarrollo.

---

## Ventajas de esta arquitectura

Esta arquitectura permite:

- Reducir duplicación.
- Facilitar mantenimiento.
- Reutilizar componentes.
- Agregar nuevos Services fácilmente.
- Mantener los tests simples.
- Separar responsabilidades.
- Facilitar futuras integraciones con CI/CD.

---

## Estructura general

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
├── docs/
│   ├── architecture.md
│   └── adding-new-service.md
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```
