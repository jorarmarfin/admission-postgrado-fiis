# API – Registro de Diplomado

## Cambio en `POST /api/diplomado/register`

### Lo que cambió

El endpoint ahora **requiere** el documento académico (bachiller/título/etc.) como archivo PDF. El `Content-Type` de la petición **ya no puede ser `application/json`** — debe enviarse como `multipart/form-data`.

---

## Endpoint

```
POST /api/diplomado/register
Content-Type: multipart/form-data
```

## Nuevo campo requerido

| Campo | Tipo | Validación |
|---|---|---|
| `academic_document` | `File` | Requerido · Solo PDF · Máx 5 MB |

## Todos los campos del formulario

```
program_id            integer   requerido
academic_period_id    integer   requerido

full_name             string    requerido, máx 200
dni                   string    requerido, máx 20
birthdate             date      requerido, formato YYYY-MM-DD, antes de hoy
phone                 string    requerido, máx 20
email                 string    requerido, email válido
address               string    requerido, máx 300
city                  string    requerido, máx 100

university            string    requerido, máx 200
academic_degree       string    requerido  →  "bachelor" | "egresado" | "master" | "doctor"
career                string    requerido, máx 200
academic_document     file      REQUERIDO · solo PDF · máx 5 MB   ← NUEVO

voucher_type          string    requerido  →  "boleta" | "factura"
razon_social          string    requerido si voucher_type = "factura"
ruc                   string    requerido si voucher_type = "factura", exactamente 11 dígitos
fiscal_address        string    requerido si voucher_type = "factura"
invoice_email         string    requerido si voucher_type = "factura", email válido
```

## Ejemplo con `fetch`

```js
const formData = new FormData();
formData.append('program_id', programId);
formData.append('academic_period_id', periodId);
formData.append('full_name', 'Juan Pérez García');
formData.append('dni', '12345678');
formData.append('birthdate', '1990-05-15');
formData.append('phone', '987654321');
formData.append('email', 'juan@example.com');
formData.append('address', 'Av. Universitaria 1234');
formData.append('city', 'Lima');
formData.append('university', 'UNMSM');
formData.append('academic_degree', 'bachelor');
formData.append('career', 'Ingeniería de Sistemas');
formData.append('academic_document', pdfFile); // File del <input type="file">
formData.append('voucher_type', 'boleta');

const response = await fetch('/api/diplomado/register', {
  method: 'POST',
  body: formData,
  // NO pongas Content-Type manualmente; el navegador lo setea con el boundary correcto
});
```

## Respuesta exitosa `201`

```json
{
  "status": "success",
  "message": "Tu solicitud ha sido registrada. Revisa tu correo para ver la orden de pago.",
  "data": {
    "token": "abc123...",
    "investment": {
      "initial_payment": 500.00,
      "total": 2500.00
    }
  }
}
```

## Respuesta de error de validación `422`

```json
{
  "message": "El documento académico es obligatorio.",
  "errors": {
    "academic_document": [
      "El documento académico es obligatorio."
    ]
  }
}
```

---

## Input HTML recomendado

```html
<input type="file" name="academic_document" accept=".pdf" required />
```

El atributo `accept=".pdf"` filtra en el diálogo del sistema operativo, pero la validación real la hace el servidor — solo acepta PDF, rechaza JPG, PNG, etc.
