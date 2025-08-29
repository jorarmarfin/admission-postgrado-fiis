
# Sistema de Admisión - Postgrado FIIS
## 🧪 Scripts Disponibles
Sistema web para la gestión de admisiones de postgrado de la Facultad de Ingeniería de Sistemas e Informática (FIIS). Desarrollado con Next.js 15, TypeScript, TailwindCSS y NextAuth.js.
```bash
npm run dev      # Servidor de desarrollo con Turbopack
npm run build    # Build de producción con Turbopack
npm run start    # Servidor de producción
npm run lint     # Linter ESLint
```
## 🚀 Características
## 🏗️ Build y Deploy
- **Autenticación segura** con NextAuth.js y JWT
### Build Local
```bash
npm run build
npm run start
```
- **Proceso de admisión** completo para programas de postgrado
### Deploy en Vercel
- **Formularios validados** con React Hook Form y Zod
El proyecto está optimizado para deployment en Vercel:

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Deploy automático en cada push

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/your-username/admission-postgrado-fiis)
- **Lenguaje**: TypeScript
## 🤝 Contribuir
- **Autenticación**: NextAuth.js 4
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y pertenece a la Facultad de Ingeniería de Sistemas e Informática.

## 👥 Equipo

Desarrollado por el equipo de desarrollo de FIIS para la gestión de admisiones de postgrado.

---

Para más información sobre Next.js, consulta:

- [Documentación de Next.js](https://nextjs.org/docs) - aprende sobre las características y API de Next.js
- [Learn Next.js](https://nextjs.org/learn) - tutorial interactivo de Next.js
- [Repositorio de Next.js en GitHub](https://github.com/vercel/next.js) - ¡tus comentarios y contribuciones son bienvenidos!
- **Formularios**: React Hook Form + Zod
- **UI Components**: Radix UI + shadcn/ui
- **Iconos**: Lucide React, React Icons
- **Build Tool**: Turbopack

## 📋 Prerequisitos

- Node.js 18+ 
- npm, yarn, pnpm o bun

## 🔧 Instalación

1. **Clona el repositorio**
```bash
git clone <repository-url>
cd admission-postgrado-fiis
```

2. **Instala las dependencias**
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Configura las variables de entorno**
```bash
cp .env.example .env.local
```

Configura las siguientes variables en tu archivo `.env.local`:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
API_BASE_URL=http://postgrado-fiis.test/api
```

## 🚀 Desarrollo

Ejecuta el servidor de desarrollo:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── (intranet)/        # Rutas protegidas del sistema
│   ├── admission/         # Páginas de admisión
│   ├── auth/              # Páginas de autenticación
│   └── api/               # API Routes
├── components/            # Componentes React reutilizables
│   ├── auths/             # Componentes de autenticación
│   ├── form/              # Formularios especializados
│   ├── programs/          # Componentes de programas
│   └── ui/                # Componentes de UI base
├── contexts/              # React Contexts
├── hooks/                 # Custom Hooks
├── interfaces/            # Definiciones de TypeScript
├── lib/                   # Utilidades y configuraciones
├── services/              # Servicios API (Laravel backend)
├── stores/                # Estado global
└── types/                 # Tipos TypeScript adicionales
```

## 🔐 Autenticación

El sistema utiliza NextAuth.js para la autenticación con las siguientes características:

- **Estrategia JWT** para sesiones
- **Roles de usuario** (Student, Admin)
- **Rutas protegidas** con middleware
- **Logout automático** del backend


You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
## 📝 APIs Integradas

El frontend se conecta con las siguientes APIs del backend Laravel:

### Autenticación
- `POST /api/login` - Iniciar sesión
- `POST /api/logout` - Cerrar sesión

### Admisión
- `GET /api/admission/applicant/user/{id}` - Datos del solicitante
- `GET /api/admission/programs/{id}/documents` - Documentos del programa
- `POST /api/admission/applicant/documents` - Subir documentos

### Otros Servicios
- Gestión de universidades
- Períodos académicos
- Bancos y métodos de pago
- Tipos de documentos

## 🎨 Componentes UI

El proyecto utiliza shadcn/ui con los siguientes componentes:

- **Formularios**: Input, Label, Select, Checkbox, Radio Group
- **Navegación**: Button, Alert Dialog
- **Feedback**: Alert, Notification Dialog
- **Layout**: Responsive containers

## 📱 Responsive Design

- **Mobile First** approach
- **Breakpoints TailwindCSS** estándar
- **Componentes adaptables** para todos los dispositivos