"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DocumentsDownloadPage() {
    // Datos seteados que después vendrán de una API
    const documentos = [
        {
            id: 1,
            titulo: "Guía del Postulante 2026-1",
            descripcion: "Manual completo con toda la información necesaria para el proceso de admisión.",
            tipo: "PDF",
            tamaño: "2.3 MB",
            fechaActualizacion: "15 Diciembre 2024",
            url: "/downloads/guia-postulante-2026-1.pdf",
            icono: "document",
            categoria: "guia"
        },
        {
            id: 2,
            titulo: "Formato de Inscripción",
            descripcion: "Formulario oficial de inscripción que debe ser completado y presentado.",
            tipo: "PDF",
            tamaño: "850 KB",
            fechaActualizacion: "10 Diciembre 2024",
            url: "/downloads/formato-inscripcion.pdf",
            icono: "form",
            categoria: "formato"
        },
        {
            id: 3,
            titulo: "Lista de Requisitos Académicos",
            descripcion: "Documentos académicos requeridos según el programa de postgrado.",
            tipo: "PDF",
            tamaño: "1.1 MB",
            fechaActualizacion: "12 Diciembre 2024",
            url: "/downloads/requisitos-academicos.pdf",
            icono: "list",
            categoria: "requisitos"
        },
        {
            id: 4,
            titulo: "Cronograma del Proceso",
            descripcion: "Calendario detallado con todas las fechas importantes del proceso de admisión.",
            tipo: "PDF",
            tamaño: "780 KB",
            fechaActualizacion: "18 Diciembre 2024",
            url: "/downloads/cronograma-admision.pdf",
            icono: "calendar",
            categoria: "cronograma"
        },
        {
            id: 5,
            titulo: "Temario de Examen",
            descripcion: "Contenidos y temas que serán evaluados en el examen de admisión.",
            tipo: "PDF",
            tamaño: "1.5 MB",
            fechaActualizacion: "20 Diciembre 2024",
            url: "/downloads/temario-examen.pdf",
            icono: "book",
            categoria: "examen"
        },
        {
            id: 6,
            titulo: "Formato de Declaración Jurada",
            descripcion: "Documento de declaración jurada que debe ser firmado por el postulante.",
            tipo: "PDF",
            tamaño: "650 KB",
            fechaActualizacion: "08 Diciembre 2024",
            url: "/downloads/declaracion-jurada.pdf",
            icono: "certificate",
            categoria: "formato"
        }
    ]

    const [descargando, setDescargando] = useState<number | null>(null)

    const handleDescargar = async (documento: any) => {
        setDescargando(documento.id)
        // Simular descarga - aquí iría la lógica real de descarga
        setTimeout(() => {
            // En un caso real, aquí se iniciaría la descarga del archivo
            const link = document.createElement('a')
            link.href = documento.url
            link.download = `${documento.titulo.replace(/\s+/g, '-').toLowerCase()}.pdf`
            link.click()
            setDescargando(null)
        }, 1500)
    }

    const getIcono = (tipo: string) => {
        switch (tipo) {
            case "document":
                return (
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                )
            case "form":
                return (
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                )
            case "list":
                return (
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12h16" />
                    </svg>
                )
            case "calendar":
                return (
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                )
            case "book":
                return (
                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                )
            case "certificate":
                return (
                    <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                )
            default:
                return (
                    <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                )
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-red-800 rounded-full flex items-center justify-center">
                                <div className="w-12 h-12 border-3 border-white rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-xs">UNI</span>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-red-800 mb-1">
                                    Documentos para Descarga
                                </h1>
                                <p className="text-lg text-gray-600">
                                    Proceso de Admisión Postgrado 2026-1
                                </p>
                                <p className="text-sm text-gray-500">
                                    Universidad Nacional de Ingeniería - FIIS
                                </p>
                            </div>
                        </div>
                        <Link href="/">
                            <Button variant="outline" className="border-red-800 text-red-800 hover:bg-red-50">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Volver al Inicio
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Instrucciones */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-8">
                    <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-blue-900 mb-4">
                                Instrucciones Importantes
                            </h2>
                            <div className="space-y-3 text-blue-800">
                                <p className="flex items-start space-x-2">
                                    <span className="w-5 h-5 bg-blue-600 rounded-full text-white text-xs flex items-center justify-center mt-0.5 flex-shrink-0">1</span>
                                    <span><strong>Descarga todos los documentos:</strong> Asegúrate de descargar y revisar cada documento antes de continuar con tu proceso de inscripción.</span>
                                </p>
                                <p className="flex items-start space-x-2">
                                    <span className="w-5 h-5 bg-blue-600 rounded-full text-white text-xs flex items-center justify-center mt-0.5 flex-shrink-0">2</span>
                                    <span><strong>Lee cuidadosamente:</strong> Cada documento contiene información específica y requisitos que debes cumplir para completar tu postulación.</span>
                                </p>
                                <p className="flex items-start space-x-2">
                                    <span className="w-5 h-5 bg-blue-600 rounded-full text-white text-xs flex items-center justify-center mt-0.5 flex-shrink-0">3</span>
                                    <span><strong>Guarda los archivos:</strong> Mantén todos los documentos organizados en una carpeta de fácil acceso para consultas posteriores.</span>
                                </p>
                                <p className="flex items-start space-x-2">
                                    <span className="w-5 h-5 bg-blue-600 rounded-full text-white text-xs flex items-center justify-center mt-0.5 flex-shrink-0">4</span>
                                    <span><strong>Formatos requeridos:</strong> Todos los documentos están disponibles en formato PDF. Necesitarás un lector de PDF para visualizarlos.</span>
                                </p>
                            </div>
                            <div className="mt-6 p-4 bg-blue-100 rounded-lg">
                                <p className="text-sm text-blue-800 font-medium">
                                    💡 <strong>Consejo:</strong> Te recomendamos imprimir la "Guía del Postulante" para tenerla como referencia física durante todo el proceso.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lista de Documentos */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Documentos Disponibles
                    </h2>

                    <div className="grid gap-6">
                        {documentos.map((documento) => (
                            <div key={documento.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        {getIcono(documento.icono)}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                    {documento.titulo}
                                                </h3>
                                                <p className="text-gray-600 mb-3">
                                                    {documento.descripcion}
                                                </p>

                                                <div className="flex items-center space-x-6 text-sm text-gray-500">
                                                    <div className="flex items-center space-x-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                        </svg>
                                                        <span>{documento.tipo}</span>
                                                    </div>

                                                    <div className="flex items-center space-x-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                        </svg>
                                                        <span>{documento.tamaño}</span>
                                                    </div>

                                                    <div className="flex items-center space-x-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span>Actualizado: {documento.fechaActualizacion}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex-shrink-0 ml-4">
                                                <Button
                                                    onClick={() => handleDescargar(documento)}
                                                    disabled={descargando === documento.id}
                                                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
                                                >
                                                    {descargando === documento.id ? (
                                                        <div className="flex items-center space-x-2">
                                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                            <span>Descargando...</span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center space-x-2">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                            </svg>
                                                            <span>Descargar</span>
                                                        </div>
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Acción final */}
                <div className="mt-12 bg-green-50 border border-green-200 rounded-lg p-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-green-900 mb-2">
                            ¿Ya descargaste todos los documentos?
                        </h3>
                        <p className="text-green-800 mb-6">
                            Ahora puedes continuar con la carga de tus documentos personales para completar tu postulación.
                        </p>
                        <Link href="/documents/upload" className="inline-block">
                            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                                Continuar: Cargar Mis Documentos
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Footer informativo */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>¿Tienes problemas con las descargas? Contacta a: <a href="mailto:admision@fiis.uni.edu.pe" className="text-red-800 hover:text-red-900">admision@fiis.uni.edu.pe</a></p>
                </div>
            </div>
        </div>
    )
}