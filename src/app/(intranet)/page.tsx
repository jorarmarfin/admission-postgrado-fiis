
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {academicPeriodService} from "@/services";

export default async function Home() {
    const activePeriod = await academicPeriodService.getActivePeriod();
    // Datos del postulante (puedes reemplazar con datos reales)
  const postulante = {
    nombre: "Luis Mayta"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">


      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Saludo y bienvenida */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              ¡Bienvenido, {postulante.nombre}!
            </h2>
            <div className="flex items-center justify-center space-x-2 text-lg text-gray-600">
              <span>Proceso de Admisión</span>
              <div className="w-2 h-2 bg-red-800 rounded-full"></div>
              <span className="font-semibold text-red-800">Periodo {activePeriod.name}</span>
            </div>
            <p className="text-gray-500 mt-2">
              Universidad Nacional de Ingeniería - Facultad de Ingeniería Industrial y de Sistemas
            </p>
          </div>

          {/* Estado del proceso */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900">Estado del Proceso</h3>
                  <p className="text-blue-700 text-sm">Documentación pendiente</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-blue-900">Progreso</div>
                <div className="w-32 bg-blue-200 rounded-full h-2 mt-1">
                  <div className="bg-blue-600 h-2 rounded-full w-1/3"></div>
                </div>
                <div className="text-xs text-blue-700 mt-1">33% completado</div>
              </div>
            </div>
          </div>
        </div>

        {/* Opciones principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Documentación para descargar */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Documentos para Descargar
              </h3>
              <p className="text-gray-600 mb-6">
                Descarga todos los formatos, guías y documentos necesarios para completar tu proceso de admisión.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>• Guía del postulante</span>
                  <span className="text-green-600">PDF</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>• Formatos de inscripción</span>
                  <span className="text-green-600">PDF</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>• Lista de requisitos</span>
                  <span className="text-green-600">PDF</span>
                </div>
              </div>
              <Link href="/documents/download">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Descargar Documentos
                </Button>
              </Link>
            </div>
          </div>

          {/* Documentos para cargar */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Cargar Documentos
              </h3>
              <p className="text-gray-600 mb-6">
                Sube todos los documentos requeridos de manera segura. Formatos aceptados: PDF, JPG, PNG.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span>• Certificados académicos</span>
                  <span className="text-orange-500">Pendiente</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>• Documento de identidad</span>
                  <span className="text-orange-500">Pendiente</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>• Foto tipo carnet</span>
                  <span className="text-orange-500">Pendiente</span>
                </div>
              </div>
              <Link href="/documents/upload">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Cargar Documentos
                </Button>
              </Link>
            </div>
          </div>

          {/* Agendar entrevista */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Agendar Entrevista
              </h3>
              <p className="text-gray-600 mb-6">
                Programa tu entrevista personal con el comité de admisión. Disponible una vez completada la documentación.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>• Modalidad: Presencial/Virtual</span>
                  <span>Disponible pronto</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>• Duración: 30 minutos</span>
                  <span>---</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>• Horario: L-V 9am-5pm</span>
                  <span>---</span>
                </div>
              </div>
              <Link href="/interview">
                <Button
                  className="w-full bg-gray-400 text-white cursor-not-allowed"
                  disabled
                >
                  Completar Documentos Primero
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Fechas Importantes
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Inicio de inscripciones</span>
                  <span className="font-medium text-red-800">15 Enero 2026</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Cierre de inscripciones</span>
                  <span className="font-medium text-red-800">28 Febrero 2026</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Entrevistas</span>
                  <span className="font-medium text-red-800">1-15 Marzo 2026</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Publicación de resultados</span>
                  <span className="font-medium text-red-800">30 Marzo 2026</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Contacto y Soporte
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-800 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-sm text-gray-600">admision@fiis.uni.edu.pe</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-800 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Teléfono</p>
                    <p className="text-sm text-gray-600">(01) 481-3030</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-800 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Horario de Atención</p>
                    <p className="text-sm text-gray-600">Lun - Vie: 9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>


    </div>
  );
}
