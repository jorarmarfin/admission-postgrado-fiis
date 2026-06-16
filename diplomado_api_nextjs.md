# API Diplomado — Guía de implementación Next.js

Base URL: `{NEXT_PUBLIC_API_URL}/api`

---

## Endpoints públicos (sin autenticación)

### 1. `GET /diplomado/programs`

Lista los diplomados activos disponibles para inscripción.

**Response 200:**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "uuid": "...",
      "name": "Diplomado en Project Management Aplicando Inteligencia Artificial",
      "description": "...",
      "investment_total": 4500.00,
      "initial_payment": 1500.00
    }
  ]
}
```

---

### 2. `POST /diplomado/register`

Registra la solicitud de inscripción. Envía automáticamente la orden de pago al correo del postulante.

**Headers:**
```
Content-Type: application/json
Accept: application/json
```

**Payload:**
```json
{
  "program_id": 1,
  "academic_period_id": 1,

  "full_name": "Juan Carlos Pérez García",
  "dni": "12345678",
  "birthdate": "1990-05-15",
  "phone": "987654321",
  "email": "juan.perez@gmail.com",
  "address": "Av. Universitaria 1234",
  "city": "Lima",

  "university": "Universidad Nacional de Ingeniería",
  "academic_degree": "bachelor",
  "career": "Ingeniería de Sistemas",

  "voucher_type": "boleta",

  "razon_social": null,
  "ruc": null,
  "fiscal_address": null,
  "invoice_email": null
}
```

**Valores válidos para `academic_degree`:**
| Valor | Descripción |
|---|---|
| `bachelor` | Bachiller |
| `graduate` | Titulado / Licenciado |
| `master` | Magíster |
| `doctor` | Doctor |
| `egresado` | Egresado (requiere constancia) |

**Valores válidos para `voucher_type`:**
| Valor | Descripción |
|---|---|
| `boleta` | Boleta de venta |
| `factura` | Factura (campos RUC obligatorios) |

**Payload para `voucher_type: "factura"`** (campos adicionales obligatorios):
```json
{
  "voucher_type": "factura",
  "razon_social": "Empresa SAC",
  "ruc": "20123456789",
  "fiscal_address": "Av. Industrial 456, Lima",
  "invoice_email": "facturacion@empresa.com"
}
```

**Response 201:**
```json
{
  "status": "success",
  "message": "Tu solicitud ha sido registrada. Revisa tu correo para ver la orden de pago.",
  "data": {
    "token": "AbCdEfGh...",
    "investment": {
      "initial_payment": 1500.00,
      "total": 4500.00
    }
  }
}
```

**Response 422 (validación):**
```json
{
  "message": "El nombre completo es obligatorio.",
  "errors": {
    "full_name": ["El nombre completo es obligatorio."],
    "email": ["El correo electrónico es obligatorio."]
  }
}
```

**Manejo en Next.js:**
```ts
try {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/diplomado/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    // data.errors contiene los errores por campo
    throw new ValidationError(data.errors);
  }
  // Guardar data.data.token en localStorage o cookie para seguimiento
  localStorage.setItem('diplomado_token', data.data.token);
} catch (err) { ... }
```

---

### 3. `GET /diplomado/registration/{token}`

Consulta pública del estado de inscripción usando el token recibido por correo.

**Response 200:**
```json
{
  "status": "success",
  "data": {
    "token": "AbCdEfGh...",
    "status": "order_sent",
    "status_label": "Orden enviada",
    "next_step": "Realiza el pago en BCP y sube tu comprobante.",
    "program": "Diplomado en Project Management Aplicando Inteligencia Artificial",
    "period": "2026-I",
    "full_name": "Juan Carlos Pérez García",
    "email": "juan.perez@gmail.com",
    "submitted_at": "2026-06-16 10:30:00",
    "confirmed_at": null
  }
}
```

**Estados posibles de `status`:**
| Valor | Label | Descripción |
|---|---|---|
| `pending` | Pendiente | Solicitud recibida, orden aún no enviada |
| `order_sent` | Orden enviada | Orden de pago enviada al correo |
| `payment_submitted` | Comprobante enviado | Postulante subió su comprobante |
| `confirmed` | Confirmado | Matrícula confirmada por admin |
| `rejected` | Rechazado | Solicitud rechazada |

**Response 404:**
```json
{
  "message": "No query results for model [App\\Models\\DiplomadoRegistration]."
}
```

---

## Endpoints del portal del estudiante (requieren `Authorization: Bearer {token}`)

El token Sanctum se obtiene al hacer login con las credenciales enviadas por email tras confirmar la matrícula.

**Headers requeridos para todos los endpoints de portal:**
```
Accept: application/json
Authorization: Bearer {sanctum_token}
```

---

### 4. `GET /portal/diplomado/me`

Datos del diplomado activo del estudiante: estado de matrícula, programa, período y resumen de pagos.

**Response 200:**
```json
{
  "status": "success",
  "data": {
    "student": {
      "id": 42,
      "code": "",
      "full_name": "PÉREZ GARCÍA JUAN CARLOS",
      "document_number": "12345678",
      "personal_email": "juan.perez@gmail.com"
    },
    "registration": {
      "id": 1,
      "token": "AbCdEfGh...",
      "status": "confirmed",
      "status_label": "Confirmado",
      "confirmed_at": "2026-06-16 15:00:00",
      "requires_regularization": false,
      "regularization_deadline": null
    },
    "program": {
      "id": 10,
      "uuid": "...",
      "name": "Diplomado en Project Management Aplicando Inteligencia Artificial"
    },
    "academic_period": {
      "id": 5,
      "name": "2026-I"
    },
    "payment_summary": {
      "total_charges": 5,
      "paid_charges": 2,
      "pending_charges": 3,
      "total_amount": 4500.00,
      "paid_amount": 1500.00,
      "pending_amount": 3000.00
    }
  }
}
```

**Response 404:** estudiante sin matrícula de diplomado.

---

### 5. `GET /portal/diplomado/charges`

Lista todos los cargos del diplomado del estudiante, agrupados en pagados y pendientes.

**Response 200:**
```json
{
  "status": "success",
  "data": {
    "summary": {
      "total_charges": 5,
      "paid_count": 2,
      "pending_count": 3,
      "overdue_count": 0,
      "total_amount": 4500.00,
      "paid_amount": 1500.00,
      "pending_amount": 3000.00
    },
    "paid": [
      {
        "id": 101,
        "description": "Matrícula - Diplomado",
        "amount": 500.00,
        "effective_amount": 500.00,
        "due_date": null,
        "paid": true,
        "paid_at": "2026-06-16",
        "is_overdue": false,
        "charge_type": { "id": 22, "code": "13331406", "name": "MATRICULA DIPLOMADO" }
      },
      {
        "id": 102,
        "description": "Cuota 1 - Diplomado",
        "amount": 1000.00,
        "effective_amount": 1000.00,
        "due_date": null,
        "paid": true,
        "paid_at": "2026-06-16",
        "is_overdue": false,
        "charge_type": { "id": 23, "code": "13331519", "name": "CUOTAS DE DIPLOMADO" }
      }
    ],
    "pending": [
      {
        "id": 103,
        "description": "Cuota 2 - Diplomado",
        "amount": 1000.00,
        "effective_amount": 1000.00,
        "due_date": "2026-07-16",
        "paid": false,
        "paid_at": null,
        "is_overdue": false,
        "charge_type": { "id": 23, "code": "13331519", "name": "CUOTAS DE DIPLOMADO" }
      }
    ]
  }
}
```

---

### 6. `GET /portal/diplomado/charges/{id}/payment-options`

Devuelve los datos bancarios para pagar una cuota pendiente específica.

**Response 200:**
```json
{
  "status": "success",
  "data": {
    "charge": {
      "id": 103,
      "description": "Cuota 2 - Diplomado",
      "amount": 1000.00,
      "due_date": "2026-07-16"
    },
    "payment_options": [
      {
        "bank": "BCP",
        "account_type": "Cuenta Corriente",
        "currency": "Soles (PEN)",
        "account_number": "194-2302751-0-18",
        "cci": "002-194-002302751018-13",
        "holder": "UNMSM - Unidad de Posgrado FIIS",
        "reference": "PÉREZ GARCÍA JUAN CARLOS",
        "instructions": [
          "Realizar el depósito o transferencia al número de cuenta indicado.",
          "Colocar como referencia su nombre completo.",
          "Guardar el voucher de pago para enviarlo al administrador.",
          "Comunicarse con administración para registrar el pago."
        ]
      }
    ]
  }
}
```

**Response 422:** cargo ya pagado.
**Response 404:** cargo no encontrado o no pertenece al estudiante autenticado.

**Manejo en Next.js:**
```ts
const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/portal/diplomado/charges/${chargeId}/payment-options`,
  { headers: { Accept: 'application/json', Authorization: `Bearer ${token}` } }
);
const { data } = await res.json();
// data.payment_options[0] contiene los datos bancarios
```

---

## Consideraciones generales

- Todos los endpoints devuelven `Content-Type: application/json`.
- Los errores de validación (422) usan el formato estándar de Laravel: `{ message, errors: { campo: [mensajes] } }`.
- Los errores 404 usan el formato estándar de Laravel (sin envolver en `status/data`).
- Las fechas se envían en formato `YYYY-MM-DD` (ISO 8601).
- El `token` de inscripción es la única forma de consultar el estado mientras el postulante no tiene cuenta.
- Los endpoints `/portal/diplomado/*` requieren autenticación Sanctum (Bearer token obtenido al hacer login).
