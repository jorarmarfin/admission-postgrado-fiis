"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface DocumentoSubido {
    id: number
    nombre: string
    tamaño: string
    tipo: string
    fechaSubida: string
    archivo: File
}

export const DocumentsUploadForm = () => {
    const [documentos, setDocumentos] = useState<DocumentoSubido[]>([])
    const [subiendo, setSubiendo] = useState(false)
    const [draggedOver, setDraggedOver] = useState(false)

    const handleFileSelect = async (files: FileList | null) => {
        if (!files || files.length === 0) return

        setSubiendo(true)

        // Procesar múltiples archivos
        const nuevosDocumentos: DocumentoSubido[] = []

        for (let i = 0; i < files.length; i++) {
            const file = files[i]

            // Validar tamaño máximo (10 MB)
            const maxSize = 10 * 1024 * 1024
            if (file.size > maxSize) {
                alert(`El archivo "${file.name}" es demasiado grande. Tamaño máximo: 10 MB`)
                continue
            }

            // Crear documento
            const nuevoDocumento: DocumentoSubido = {
                id: Date.now() + i,
                nombre: file.name,
                tamaño: (file.size / (1024 * 1024)).toFixed(2) + " MB",
                tipo: file.type || "Desconocido",
                fechaSubida: new Date().toLocaleString('es-ES'),
                archivo: file
            }

            nuevosDocumentos.push(nuevoDocumento)
        }

        // Simular tiempo de subida
        setTimeout(() => {
            setDocumentos(prev => [...prev, ...nuevosDocumentos])
            setSubiendo(false)
        }, 1500)
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setDraggedOver(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setDraggedOver(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setDraggedOver(false)
        handleFileSelect(e.dataTransfer.files)
    }

    const eliminarDocumento = (id: number) => {
        setDocumentos(prev => prev.filter(doc => doc.id !== id))
    }

    const limpiarTodos = () => {
        if (window.confirm('¿Estás seguro de eliminar todos los documentos?')) {
            setDocumentos([])
        }
    }

    const getTipoIcon = (tipo: string) => {
        if (tipo.includes('pdf')) {
            return (
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            )
        } else if (tipo.includes('image')) {
            return (
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            )
        } else {
            return (
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
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
                                    Cargar Documentos
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

                    {/* Estadísticas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-blue-600 mb-1">
                                {documentos.length}
                            </div>
                            <div className="text-sm text-blue-800">
                                Documentos Subidos
                            </div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-green-600 mb-1">
                                {documentos.reduce((acc, doc) => acc + parseFloat(doc.tamaño), 0).toFixed(2)} MB
                            </div>
                            <div className="text-sm text-green-800">
                                Tamaño Total
                            </div>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-purple-600 mb-1">
                                {documentos.filter(doc => doc.tipo.includes('pdf')).length}
                            </div>
                            <div className="text-sm text-purple-800">
                                Documentos PDF
                            </div>
                        </div>
                    </div>
                </div>

                {/* Zona de carga */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                        Subir Documentos
                    </h2>

                    <div
                        className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-200 ${
                            draggedOver 
                                ? 'border-blue-400 bg-blue-50' 
                                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                        } ${subiendo ? 'pointer-events-none opacity-75' : 'cursor-pointer'}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => !subiendo && document.getElementById('file-input')?.click()}
                    >
                        {subiendo ? (
                            <div className="flex flex-col items-center space-y-4">
                                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
                                <p className="text-lg font-medium text-blue-600">Subiendo archivos...</p>
                                <p className="text-sm text-gray-500">Por favor espera mientras procesamos tus documentos</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center space-y-4">
                                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <div>
                                    <p className="text-lg font-medium text-gray-600 mb-2">
                                        Arrastra tus archivos aquí
                                    </p>
                                    <p className="text-sm text-gray-500 mb-4">
                                        o haz clic para seleccionar archivos desde tu dispositivo
                                    </p>
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8l-8-8-8 8" />
                                        </svg>
                                        Seleccionar Archivos
                                    </Button>
                                </div>
                                <div className="text-xs text-gray-400 border-t pt-4">
                                    <p>Formatos aceptados: PDF, JPG, PNG, DOC, DOCX</p>
                                    <p>Tamaño máximo por archivo: 10 MB</p>
                                </div>
                            </div>
                        )}

                        <input
                            id="file-input"
                            type="file"
                            multiple
                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                            onChange={(e) => handleFileSelect(e.target.files)}
                            className="hidden"
                        />
                    </div>
                </div>

                {/* Lista de documentos */}
                {documentos.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">
                                Documentos Subidos ({documentos.length})
                            </h2>
                            <Button
                                variant="outline"
                                onClick={limpiarTodos}
                                className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                                Limpiar Todo
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {documentos.map((documento) => (
                                <div key={documento.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            {getTipoIcon(documento.tipo)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium text-gray-900 truncate">
                                                {documento.nombre}
                                            </h3>
                                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                <span>{documento.tamaño}</span>
                                                <span>•</span>
                                                <span>Subido: {documento.fechaSubida}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                const url = URL.createObjectURL(documento.archivo)
                                                window.open(url, '_blank')
                                            }}
                                            className="border-blue-300 text-blue-600 hover:bg-blue-50"
                                        >
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            Ver
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => eliminarDocumento(documento.id)}
                                            className="border-red-300 text-red-600 hover:bg-red-50"
                                        >
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Eliminar
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Acciones finales */}
                        <div className="flex justify-center space-x-4 mt-8 pt-6 border-t border-gray-200">
                            <Button
                                variant="outline"
                                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                Guardar Progreso
                            </Button>
                            <Link href="/interview">
                                <Button className="bg-green-600 hover:bg-green-700 text-white px-8">
                                    Continuar: Agendar Entrevista
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}

                {/* Mensaje si no hay documentos */}
                {documentos.length === 0 && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                        <div className="text-gray-400 mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No hay documentos subidos
                        </h3>
                        <p className="text-gray-600">
                            Sube tus primeros documentos usando la zona de carga de arriba
                        </p>
                    </div>
                )}

                {/* Footer informativo */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>¿Problemas con la carga de archivos? Contacta a: <a href="mailto:admision@fiis.uni.edu.pe" className="text-red-800 hover:text-red-900">admision@fiis.uni.edu.pe</a></p>
                </div>
            </div>
        </div>
    )
}
