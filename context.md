# Contexto del Sistema - Sistema de Admisión de Postgrado FIIS UNI

## 📋 Descripción General
Sistema web de admisión para programas de postgrado (Maestría y Doctorado) de la Facultad de Ingeniería Industrial y de Sistemas (FIIS) de la Universidad Nacional de Ingeniería (UNI).

## 🏗️ Arquitectura

### Frontend (Next.js 16)
- **Framework**: Next.js 16.0.10 con Turbopack
- **Runtime**: React 19.2.1
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 4.1.17
- **Componentes UI**: Radix UI + shadcn/ui
- **Autenticación**: NextAuth.js 4.24.13
- **Formularios**: React Hook Form + Zod (validación)
- **Cliente HTTP**: Fetch API nativa

### Backend (Laravel 12)
- API REST en `postgrado-fiis.test`
- Base URL configurada en variable de entorno: `NEXT_BACKEND_API_URL`

## 📁 Estructura de Carpetas

```
src/
├── app/                          # Rutas y layouts de Next.js (App Router)
│   ├── api/                      # Endpoints de API (NextAuth)
│   ├── admission/                # Sección pública de admisión
│   │   ├── page.tsx             # Listado de programas
│   │   └── [slug]/
│   │       └── page.tsx         # Detalle de programa + formulario
│   ├── (intranet)/              # Área privada (requiere autenticación)
│   │   ├── documents/
│   │   ├── interview/
│   │   └── page.tsx
│   ├── auth/login/              # Página de login
│   └── layout.tsx               # Layout global
│
├── components/                   # Componentes React reutilizables
│   ├── auths/                   # Componentes de autenticación
│   │   ├── auth-provider.tsx    # Proveedor de sesión NextAuth
│   │   ├── login.tsx
│   │   ├── logout-button.tsx
│   │   └── public-route.tsx     # Protección de rutas públicas
│   ├── form/                    # Formularios principales
│   │   ├── RegistrationForm.tsx # Registro de postulantes
│   │   ├── DocumentsUploadForm.tsx # Subida de documentos
│   │   └── InterviewForm.tsx    # Formulario de entrevistas
│   ├── programs/                # Componentes de programas
│   │   ├── program-details.tsx  # Detalles de programa
│   │   └── program-documents.tsx # Documentos requeridos del programa
│   └── ui/                      # Componentes primitivos (button, input, etc)
│
├── services/                     # Servicios para llamadas a API
│   └── laravel/
│       ├── Program.service.ts    # Servicios de programas
│       ├── Applicant.service.ts  # Servicios de postulantes
│       ├── Login.service.ts      # Servicios de autenticación
│       ├── DocumentTypes.service.ts
│       ├── InterviewAvailabilities.service.ts
│       ├── InterviewAppointment.service.ts
│       ├── AcademicPeriod.service.ts
│       ├── Bank.service.ts
│       └── University.service.ts
│
├── interfaces/                   # Interfaces TypeScript
│   ├── Program.interface.ts      # IProgram, IProgramType
│   ├── Applicants.interface.ts
│   ├── Application.interface.ts
│   ├── Document.interface.ts
│   ├── DocumentType.interface.ts
│   ├── InterviewAvailability.ts
│   ├── InterviewAppointment.interface.ts
│   ├── Login.interface.ts
│   ├── Student.interface.ts
│   ├── University.interface.ts
│   ├── Bank.interface.ts
│   ├── AcademicPeriod.interface.ts
│   └── index.ts                 # Exportaciones centralizadas
│
├── hooks/                        # Custom React Hooks
│   ├── useRegistrationForm.ts
│   ├── useApplicantDocuments.ts
│   ├── useInterviewForm.ts
│   └── index.ts
│
├── contexts/                     # React Contexts
│   └── UserContext.tsx          # Contexto del usuario logueado
│
├── lib/                         # Utilidades
│   ├── auth.ts                  # Configuración NextAuth
│   └── utils.ts
│
├── stores/                      # Gestión de estado (Zustand o similar)
│   └── index.ts
│
├── actions/                     # Server Actions de Next.js
│   └── index.ts
│
├── types/                       # Tipos globales
│   └── next-auth.d.ts          # Tipos extendidos de NextAuth
│
└── middleware.ts                # Middleware de Next.js
```

## 🔑 Endpoints API Principales

### Programas
```
GET /api/admission/programs
```
**Respuesta**: Lista de todos los programas disponibles
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "uuid": "da90453c-5c62-48ad-a8e3-dd5a77fd9be1",
      "name": "Ingeniería Industrial",
      "description": "Descripción del programa",
      "program_type_id": 2,
      "program_types": {
        "id": 2,
        "name": "Doctorado",
        "active": null
      }
    }
  ]
}
```

```
GET /api/admission/program/{uuid}
```
**Respuesta**: Detalles de un programa específico

```
GET /api/admission/program/{uuid}/documents
```
**Respuesta**: Documentos requeridos del programa
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "document_type_id": 1,
      "program_id": 1,
      "full_url": "https://...",
      "document_types": { ... }
    }
  ]
}
```

### Autenticación
```
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/user
```

### Postulantes
```
POST /api/applicant/register
GET /api/applicant/{uuid}
PUT /api/applicant/{uuid}
POST /api/applicant/{uuid}/documents
```

### Entrevistas
```
GET /api/interview/availabilities
GET /api/interview/appointments
POST /api/interview/appointments
```

## 🎨 Interfaces Clave

### IProgram
```typescript
interface IProgram {
  id: number;
  uuid: string;
  name: string;
  description: string;
  program_type_id: number;
  program_types: IProgramType;
}
```

### IProgramType
```typescript
interface IProgramType {
  id: number;
  name: string;
  active: boolean | null;
}
```

### Estructura de Respuesta API
```typescript
interface ApiResponse<T> {
  status: 'success' | 'error';
  data: T;
  message?: string;
}
```

## 🔐 Autenticación y Autorización

### Configuración NextAuth.js Completa

#### 1. Proveedor de Autenticación: Credentials
- **Archivo**: `/src/lib/auth.ts`
- **Proveedor**: CredentialsProvider (conecta con API Laravel)
- **Strategy de Sesión**: JWT
- **Token almacenado**: AccessToken del Backend (Laravel)

#### 2. Flujo de Autenticación

```
Usuario → NextAuth (Credentials) → Login Service → Laravel API
                                   ↓
                            Retorna token JWT
                                   ↓
                            NextAuth almacena en JWT
                                   ↓
                         Session disponible en cliente
```

#### 3. Configuración en `/src/lib/auth.ts`

**Puntos clave**:
- `CredentialsProvider` con campos: `email` y `password`
- Llamada a `loginService.login()` que consulta `POST /login` en Laravel
- Respuesta esperada: `{ token, user, role, message }`
- El `token` se persiste en JWT callback
- La sesión contiene: `accessToken`, `roles`, `userData`

**Callbacks implementados**:

1. **jwt()**: Persiste datos del usuario en el token
   - Guarda `accessToken` (token del backend)
   - Guarda `roles` (roles del usuario)
   - Guarda `userData` (objeto completo del usuario)

2. **session()**: Expone datos al cliente
   - Proporciona `session.accessToken` para requests autenticados
   - Proporciona `session.userData` con info del usuario
   - Proporciona `session.user.roles` para control de acceso

3. **signOut event**: Llama al logout del backend
   - Ejecuta `loginService.logout()` con el token
   - Invalida la sesión en el backend

#### 4. Tipos TypeScript (`/src/types/next-auth.d.ts`)

**Extensión de Session**:
```typescript
interface Session {
  accessToken?: string;        // Token JWT del backend
  userData?: IUser;            // Datos completos del usuario
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    roles?: string[];          // Array de roles
  }
}
```

**Extensión de User**:
```typescript
interface User {
  token?: string;              // Token del backend
  roles?: string[];            // Roles del usuario
  userData?: IUser;            // Datos completos
}
```

**Extensión de JWT**:
```typescript
interface JWT {
  accessToken?: string;
  roles?: string[];
  userId?: string;
  userData?: IUser;
}
```

#### 5. Interfaces de Login (`/src/interfaces/Login.interface.ts`)

**Request**:
```typescript
interface ILoginRequest {
  email: string;
  password: string;
}
```

**Response del Backend**:
```typescript
interface ILoginResponse {
  token: string;               // JWT del backend
  user: IUser;                 // Objeto usuario
  role: string[];              // Array de roles
  message: string;
}

interface IUser {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  roles: IRole[];              // Roles con pivot info
}

interface IRole {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: { model_type, model_id, role_id };
}
```

#### 6. Servicio de Login (`/src/services/laravel/Login.service.ts`)

**Endpoint de Login**:
```typescript
POST ${API_BASE_URL}/login
Content-Type: application/json
```

**Request**:
```json
{
  "email": "usuario@example.com",
  "password": "contraseña"
}
```

**Response**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "usuario@example.com",
    ...
  },
  "role": ["postulante", "usuario"],
  "message": "Login exitoso"
}
```

**Endpoint de Logout**:
```typescript
POST ${API_BASE_URL}/logout
Authorization: Bearer {token}
```

#### 7. Middleware de Protección (`/src/middleware.ts`)

**Rutas Públicas** (sin necesidad de autenticación):
- `/auth/login`
- `/api/auth`
- `/admission` (formulario de registro)

**Rutas Privadas** (requieren autenticación):
- `/intranet/*` - Panel de control del postulante
- `/api/applicant/*` - Endpoints protegidos del postulante

**Flujo**:
1. Verifica si la ruta es pública → permitir
2. Obtiene el token JWT usando `getToken()`
3. Si no hay token → redirigir a `/auth/login` con callbackUrl
4. Si hay token → permitir acceso

### Variables de Entorno Requeridas

```env
# URL del backend Laravel
NEXT_PUBLIC_API_BASE_URL=http://postgrado-fiis.test/api

# NextAuth configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu_secret_muy_largo_y_seguro_aqui
```

⚠️ **IMPORTANTE**: 
- `NEXTAUTH_SECRET` debe ser una cadena larga y aleatoria
- Generar con: `openssl rand -base64 32`
- Cambiar en producción con valores seguros

#### 8. Uso en Componentes Cliente

**Obtener la sesión**:
```typescript
'use client'
import { useSession } from "next-auth/react";

export default function MyComponent() {
  const { data: session, status } = useSession();
  
  if (status === "loading") return <div>Cargando...</div>;
  if (status === "unauthenticated") return <div>No autenticado</div>;
  
  return <div>{session?.user?.name}</div>;
}
```

**Hacer requests autenticados**:
```typescript
const { data: session } = useSession();

await fetch(`${API_BASE_URL}/applicant/123`, {
  headers: {
    'Authorization': `Bearer ${session?.accessToken}`
  }
});
```

**Acceder a datos del usuario**:
```typescript
const { data: session } = useSession();

const userId = session?.user?.id;
const roles = session?.user?.roles;  // ['postulante', 'usuario']
const userData = session?.userData;  // Datos completos del usuario
const token = session?.accessToken;  // Token del backend
```

### Rutas Protegidas
- `/intranet/*` - Requiere autenticación
- `/admission/[slug]` - Formulario de registro (público)
- `/auth/login` - Página de login (público)

## 📱 Flujo de Usuario

1. **Descubrimiento**: Usuario llega a `/admission`
   - Ve listado de programas agrupados por tipo
   - Cada programa tiene descripción e información

2. **Selección**: Click en programa
   - Redirige a `/admission/[uuid]`
   - Muestra detalles del programa

3. **Registro**: Completa RegistrationForm
   - Envía datos a `POST /api/applicant/register`
   - Crea cuenta de postulante

4. **Subida de Documentos**: DocumentsUploadForm
   - Sube documentos requeridos del programa
   - Endpoint: `POST /api/applicant/{uuid}/documents`

5. **Entrevista**: InterviewForm
   - Consulta disponibilidades: `GET /api/interview/availabilities`
   - Programa entrevista: `POST /api/interview/appointments`

6. **Panel de Control**: Área intranet
   - Ver documentos subidos
   - Ver fecha de entrevista
   - Descargar constancias

## 🛠️ Stack Técnico Detallado

### Frontend Dependencies
- `@hookform/resolvers`: Validación de formularios
- `@radix-ui/*`: Componentes accesibles sin estilos
- `react-hook-form`: Gestión eficiente de formularios
- `zod`: Validación de esquemas TypeScript-first
- `react-icons`: Iconografía
- `lucide-react`: Iconos SVG
- `clsx`: Utilidades para clases CSS
- `tailwind-merge`: Merge de clases Tailwind

### Dev Dependencies
- `typescript`: Tipado estático
- `tailwindcss`: Framework CSS
- `@tailwindcss/postcss`: PostCSS plugin
- `eslint`: Linting

## 🌍 Variables de Entorno

```env
NEXT_BACKEND_API_URL=http://postgrado-fiis.test
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<tu_secret_aqui>
```

## 🎯 Patrones de Desarrollo

### Servicios (Services Pattern)
- Cada servicio encapsula lógica de API
- Métodos async/await
- Manejo centralizado de errores
- Caching con tags de Next.js

```typescript
export const programService = {
  async getAllPrograms(): Promise<IProgram[]> {
    // Implementación
  },
  async getProgramByUuid(uuid: string): Promise<IProgram> {
    // Implementación
  }
}
```

### Componentes Server & Client
- Server Components por defecto (Next.js 13+)
- Client Components solo cuando sea necesario (`'use client'`)
- Datos fetched en Server Components
- Interactividad en Client Components

### Formularios
- React Hook Form + Zod
- Validación en cliente y servidor
- Feedback visual de errores
- CSRF protection automática en Next.js

## 📊 Estado de Desarrollo

### Funcionalidades Implementadas ✅
- Listado de programas
- Autenticación con NextAuth
- Formulario de registro
- Subida de documentos
- Gestión de entrevistas
- Panel intranet

### En Desarrollo / Mejoras
- Descarga de documentos del programa (full_url)
- Formato de fechas en entrevistas (24h vs AM/PM)
- Componentes de UI optimizados
- Performance de imágenes

## 🚀 Scripts Disponibles

```bash
yarn dev          # Inicia servidor desarrollo (Turbopack)
yarn build        # Build para producción
yarn start        # Inicia servidor producción
yarn lint         # Ejecuta ESLint
```

## 📝 Consideraciones Importantes

1. **Cache de Datos**: Programas cacheados por 1 hora
2. **Errores de API**: Capturados y transformados en mensajes legibles
3. **Tipos TypeScript**: Strict mode habilitado
4. **Estilos**: Tailwind CSS con configuración personalizada
5. **Accesibilidad**: Componentes Radix UI son WAI-ARIA compliant
6. **Responsive**: Mobile-first approach con Tailwind

## 🔗 Referencias

- [Next.js 16 Docs](https://nextjs.org)
- [NextAuth.js Docs](https://next-auth.js.org)
- [React Hook Form](https://react-hook-form.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Zod Validation](https://zod.dev)
- [Radix UI](https://www.radix-ui.com)

---

## 🚀 Cómo Implementar este Sistema de Autenticación en Otro Proyecto

Si deseas reutilizar esta configuración de autenticación en otro proyecto Next.js, sigue estos pasos:

### Paso 1: Instalar Dependencias

```bash
yarn add next-auth react-hook-form zod
```

### Paso 2: Crear la Estructura de Carpetas

```
src/
├── lib/
│   └── auth.ts                    # Configuración de NextAuth
├── types/
│   └── next-auth.d.ts            # Tipos extendidos
├── interfaces/
│   └── Login.interface.ts         # Interfaces de autenticación
├── services/
│   └── laravel/
│       └── Login.service.ts       # Servicio de login
├── components/
│   └── auths/
│       ├── auth-provider.tsx      # SessionProvider
│       ├── login.tsx              # Componente de login
│       └── logout-button.tsx      # Botón de logout
└── app/
    ├── api/
    │   └── auth/
    │       └── [...nextauth]/
    │           └── route.ts       # Ruta de NextAuth
    └── auth/
        └── login/
            └── page.tsx           # Página de login
```

### Paso 3: Variables de Entorno (`.env.local`)

```env
# URL del backend (ajusta según tu API)
NEXT_PUBLIC_API_BASE_URL=http://tu-api.test/api

# NextAuth configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu_secret_generado_con_openssl_rand_-base64_32
```

### Paso 4: Crear Interfaces de Login

**`/src/interfaces/Login.interface.ts`**:
```typescript
export interface ILoginRequest {
    email: string;
    password: string;
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    // ... otros campos según tu API
}

export interface ILoginResponse {
    token: string;
    user: IUser;
    role: string[];
    message: string;
}
```

### Paso 5: Crear Servicio de Login

**`/src/services/laravel/Login.service.ts`**:
```typescript
import { ILoginRequest, ILoginResponse } from "@/interfaces";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const loginService = {
    async login(credentials: ILoginRequest): Promise<ILoginResponse> {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(credentials),
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    },

    async logout(token: string): Promise<any> {
        const response = await fetch(`${API_BASE_URL}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }
};
```

### Paso 6: Configurar Tipos de NextAuth

**`/src/types/next-auth.d.ts`**:
```typescript
import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { IUser } from "@/interfaces";

declare module "next-auth" {
    interface Session extends DefaultSession {
        accessToken?: string;
        userData?: IUser;
        user: {
            id: string;
            roles?: string[];
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        token?: string;
        roles?: string[];
        userData?: IUser;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        accessToken?: string;
        roles?: string[];
        userId?: string;
        userData?: IUser;
    }
}
```

### Paso 7: Configurar NextAuth

**`/src/lib/auth.ts`**:
```typescript
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { loginService } from "@/services";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                try {
                    const response = await loginService.login({
                        email: credentials.email,
                        password: credentials.password
                    });

                    return {
                        id: response.user.id.toString(),
                        email: response.user.email,
                        name: response.user.name,
                        token: response.token,
                        roles: response.role,
                        userData: response.user
                    };
                } catch (error) {
                    console.error("Error en autenticación:", error);
                    return null;
                }
            }
        }),
    ],
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = (user as any).token;
                token.roles = (user as any).roles;
                token.userId = user.id;
                token.userData = (user as any).userData;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.userId as string;
                session.user.roles = token.roles as string[];
            }
            session.accessToken = token.accessToken as string;
            session.userData = token.userData as any;
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
```

### Paso 8: Crear Ruta de API NextAuth

**`/src/app/api/auth/[...nextauth]/route.ts`**:
```typescript
import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

### Paso 9: Crear Página de Login

**`/src/app/auth/login/page.tsx`**:
```typescript
'use client'
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError("Credenciales inválidas");
        } else {
            router.push("/dashboard"); // Redirigir a página protegida
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                {error && <p className="text-red-500">{error}</p>}
                
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full mb-4 p-2 border"
                    required
                />
                
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    className="w-full mb-4 p-2 border"
                    required
                />
                
                <button type="submit" className="w-full p-2 bg-blue-500 text-white">
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
}
```

### Paso 10: Configurar SessionProvider

**`/src/app/layout.tsx`**:
```typescript
import { SessionProvider } from "next-auth/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mi Aplicación",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            <body>
                <SessionProvider>
                    {children}
                </SessionProvider>
            </body>
        </html>
    );
}
```

### Paso 11: Crear Middleware de Protección (Opcional)

**`/src/middleware.ts`**:
```typescript
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

const publicRoutes = ["/auth/login", "/api/auth"];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    if (publicRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.next();
    }
    
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
        const url = new URL("/auth/login", request.url);
        url.searchParams.set("callbackUrl", encodeURI(request.url));
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
```

### Paso 12: Usar la Sesión en Componentes

**Para obtener la sesión**:
```typescript
'use client'
import { useSession, signOut } from "next-auth/react";

export default function Dashboard() {
    const { data: session } = useSession();

    return (
        <div>
            <h1>Bienvenido, {session?.user?.name}</h1>
            <p>Email: {session?.user?.email}</p>
            <p>Roles: {session?.user?.roles?.join(", ")}</p>
            <button onClick={() => signOut()}>Cerrar Sesión</button>
        </div>
    );
}
```

**Para hacer requests autenticados**:
```typescript
const { data: session } = useSession();

const response = await fetch("/api/protected", {
    headers: {
        "Authorization": `Bearer ${session?.accessToken}`
    }
});
```

---

## 📝 Checklist de Implementación

- [ ] Instalar `next-auth`
- [ ] Crear estructura de carpetas
- [ ] Configurar variables de entorno
- [ ] Crear interfaces de login
- [ ] Implementar servicio de login
- [ ] Configurar tipos de NextAuth
- [ ] Crear configuración de NextAuth (`auth.ts`)
- [ ] Crear ruta de API (`[...nextauth]/route.ts`)
- [ ] Crear página de login
- [ ] Configurar SessionProvider en layout
- [ ] Crear middleware (opcional)
- [ ] Probar con credenciales reales
- [ ] Validar tokens en el backend

---

