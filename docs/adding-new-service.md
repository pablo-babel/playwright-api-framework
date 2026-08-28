# Cómo agregar un nuevo Service

## Introducción

Los Services encapsulan las operaciones relacionadas con un recurso de la API.

Para agregar un nuevo recurso al framework se recomienda seguir una estructura consistente.

---

## Paso 1 — Crear el modelo

Si el nuevo recurso utiliza una estructura de datos específica, crear primero los modelos correspondientes.

Ejemplo:

```text
src/models/UserRequest.ts
src/models/UserResponse.ts
```

Los modelos deben representar la estructura esperada por la API.

---

## Paso 2 — Crear el Service

Crear el Service dentro de:

```text
src/services/
```

Ejemplo:

```text
src/services/UserService.ts
```

---

## Paso 3 — Extender BaseService

El nuevo Service debe extender `BaseService`.

Ejemplo:

```typescript
import { BaseService } from "./BaseService";

export class UserService extends BaseService {}
```

Esto permite reutilizar la funcionalidad común proporcionada por `BaseService`.

---

## Paso 4 — Crear los métodos

Agregar métodos para las operaciones que el recurso necesite.

Por ejemplo:

```typescript
public async getUser(id: number): Promise<APIResponse> {
  await this.initialize();

  try {
    return await this.apiClient.get(`/user/${id}`);
  } finally {
    await this.dispose();
  }
}
```

Los métodos deben representar operaciones claras de la API.

Ejemplos:

```text
createUser()
getUser()
getUsers()
updateUser()
partialUpdateUser()
deleteUser()
```

---

## Paso 5 — Crear los datos de prueba

Cuando sea necesario utilizar datos reutilizables, crear una Factory, Builder o clase de datos.

Ejemplo:

```text
src/factories/UserFactory.ts
```

o:

```text
src/builders/UserBuilder.ts
```

La elección dependerá de las necesidades del recurso.

---

## Paso 6 — Crear el test

Crear una carpeta para el nuevo recurso:

```text
tests/user/
```

Y crear el archivo correspondiente:

```text
tests/user/user.spec.ts
```

El test debe utilizar el Service en lugar de realizar directamente llamadas HTTP.

Ejemplo:

```typescript
const userService = new UserService();

const response = await userService.getUser(userId);
```

---

## Paso 7 — Agregar validaciones

Utilizar `ResponseValidator` cuando corresponda.

Ejemplo:

```typescript
ResponseValidator.expectStatus(response, 200);
```

Para validaciones de estructura también pueden utilizarse JSON Schemas.

---

## Paso 8 — Ejecutar ESLint

Antes de terminar:

```bash
npm run lint
```

Resolver cualquier error reportado por ESLint.

---

## Paso 9 — Verificar formato

Ejecutar:

```bash
npm run format:check
```

Si existen archivos que necesitan formato:

```bash
npm run format
```

---

## Paso 10 — Verificar TypeScript

Ejecutar:

```bash
npx tsc --noEmit
```

El proyecto debe terminar sin errores de TypeScript.

---

## Paso 11 — Ejecutar las pruebas

Ejecutar el test específico:

```bash
npx playwright test tests/user/user.spec.ts
```

Después ejecutar toda la suite:

```bash
npx playwright test
```

---

## Checklist

Antes de considerar terminado un nuevo Service:

- [ ] Modelo creado.
- [ ] Service creado.
- [ ] Service extiende `BaseService`.
- [ ] Métodos de API implementados.
- [ ] Datos de prueba preparados.
- [ ] Test creado.
- [ ] Validaciones agregadas.
- [ ] ESLint pasa.
- [ ] Prettier pasa.
- [ ] TypeScript pasa.
- [ ] Todas las pruebas pasan.

---

## Ejemplo de flujo

```text
Nuevo recurso
      │
      ▼
Crear Model
      │
      ▼
Crear Service
      │
      ▼
Extender BaseService
      │
      ▼
Implementar métodos
      │
      ▼
Crear Factory / Builder
      │
      ▼
Crear Tests
      │
      ▼
Agregar Validators
      │
      ▼
ESLint + Prettier
      │
      ▼
TypeScript
      │
      ▼
Playwright
```
