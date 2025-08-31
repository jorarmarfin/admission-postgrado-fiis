"use client"

import React, { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Link from "next/link"
import { useApplicantDocuments } from "@/hooks/useApplicantDocuments"
import { IApplicantDocument } from "@/interfaces"
import { applicantService } from "@/services"
import { useRouter } from "next/navigation"

interface Props{
    token: string,
    documents: IApplicantDocument[]
}

export const DocumentsUploadForm = ({token, documents: initialDocuments}:Props) => {
    const router = useRouter()
    const [documents, setDocuments] = useState<IApplicantDocument[]>(initialDocuments)
    const [refreshing, setRefreshing] = useState(false)

    const refreshDocuments = useCallback(async () => {
        setRefreshing(true)
        try {
            const response = await applicantService.getApplicantDocuments(token)
            setDocuments(response.data)
            router.refresh() // Opcional: refrescar toda la página para sincronizar con el servidor
        } catch (error) {
            console.error('Error al recargar documentos:', error)
        } finally {
            setRefreshing(false)
        }
    }, [token, router])

    const {
        subiendo,
        draggedOver,
        alertDialog,
        closeAlertDialog,
        handleFileSelect,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        eliminarDocumento,
    } = useApplicantDocuments(token);

    const handleSuccessfulUpload = useCallback(() => {
        refreshDocuments()
    }, [refreshDocuments])

    const getTipoIcon = (fileIcon: string) => {
        if (fileIcon === 'document-text' || fileIcon.includes('pdf')) {
            return (
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            )
        } else if (fileIcon.includes('image')) {
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
       <>
           {/* Zona de carga */}
           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
               <div className="flex items-center justify-between mb-6">
                   <h2 className="text-xl font-bold text-gray-900">
                       Subir Documentos
                   </h2>
                   {documents.length > 0 && (
                       <Button
                           variant="outline"
                           size="sm"
                           onClick={refreshDocuments}
                           disabled={refreshing}
                           className="border-blue-300 text-blue-600 hover:bg-blue-50"
                       >
                           {refreshing ? (
                               <div className="w-4 h-4 mr-2 animate-spin rounded-full border-b-2 border-blue-600"></div>
                           ) : (
                               <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                               </svg>
                           )}
                           Actualizar
                       </Button>
                   )}
               </div>

               <div
                   className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-200 ${
                       draggedOver
                           ? 'border-blue-400 bg-blue-50'
                           : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                   } ${subiendo ? 'pointer-events-none opacity-75' : 'cursor-pointer'}`}
                   onDragOver={handleDragOver}
                   onDragLeave={handleDragLeave}
                   onDrop={(e) => handleDrop(e, handleSuccessfulUpload)}
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
                               <p>Formatos aceptados: PDF, JPG, PNG</p>
                               <p>Tamaño máximo por archivo: 10 MB</p>
                           </div>
                       </div>
                   )}

                   <input
                       id="file-input"
                       type="file"
                       multiple
                       accept=".pdf,.jpg,.jpeg,.png"
                       onChange={(e) => handleFileSelect(e.target.files, handleSuccessfulUpload)}
                       className="hidden"
                   />
               </div>
           </div>

           {/* Lista de documentos */}
           {documents.length > 0 && (
               <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                   <div className="flex items-center justify-between mb-6">
                       <h2 className="text-xl font-bold text-gray-900">
                           Documentos ({documents.length})
                       </h2>
                   </div>

                   <div className="space-y-4">
                       {documents.map((document) => (
                           <div key={document.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                               <div className="flex items-center space-x-4">
                                   <div className="flex-shrink-0">
                                       {getTipoIcon(document.file_type)}
                                   </div>
                                   <div className="flex-1 min-w-0">
                                       <h3 className="font-medium text-gray-900 truncate flex items-center">
                                           {document.name}
                                       </h3>

                                       <div className="flex items-center space-x-4 text-sm text-gray-500">
                                           <span>{document.file_size}</span>
                                           <span>•</span>
                                           <span>Subido: {document.upload_date ? new Date(document.upload_date).toLocaleDateString('es-ES') : 'Reciente'}</span>
                                       </div>
                                   </div>
                               </div>

                               <div className="flex items-center space-x-2">
                                   <Button
                                       variant="outline"
                                       size="sm"
                                       asChild
                                       className="border-blue-300 text-blue-600 hover:bg-blue-50"
                                   >
                                       <Link
                                            href={document.file_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                       >
                                           <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                           </svg>
                                           Ver
                                       </Link>
                                   </Button>
                                   <Button
                                       variant="outline"
                                       size="sm"
                                       onClick={() => eliminarDocumento(document.id)}
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
           {documents.length === 0 && (
               <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                   <div className="text-gray-400 mb-4">
                       <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                       </svg>
                   </div>
                   <h3 className="text-lg font-medium text-gray-900 mb-2">
                       No hay documentos
                   </h3>
                   <p className="text-gray-600">
                       Sube tus primeros documentos usando la zona de carga de arriba
                   </p>
               </div>
           )}

           {/* AlertDialog mejorado para diferentes tipos de mensajes */}
           <AlertDialog open={alertDialog.isOpen} onOpenChange={closeAlertDialog}>
               <AlertDialogContent>
                   <AlertDialogHeader>
                       <AlertDialogTitle className={`flex items-center gap-2 ${
                           alertDialog.type === 'error' ? 'text-red-600' : 
                           alertDialog.type === 'success' ? 'text-green-600' : ''
                       }`}>
                           {alertDialog.type === 'success' && (
                               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                               </svg>
                           )}
                           {alertDialog.type === 'error' && (
                               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                               </svg>
                           )}
                           {alertDialog.title}
                       </AlertDialogTitle>
                       <AlertDialogDescription className="whitespace-pre-line">
                           {alertDialog.description}
                       </AlertDialogDescription>
                   </AlertDialogHeader>
                   <AlertDialogFooter>
                       {alertDialog.type === 'confirm' ? (
                           <>
                               <AlertDialogCancel onClick={alertDialog.onCancel}>
                                   Cancelar
                               </AlertDialogCancel>
                               <AlertDialogAction
                                   onClick={alertDialog.onConfirm}
                                   className="bg-red-600 hover:bg-red-700"
                               >
                                   Confirmar
                               </AlertDialogAction>
                           </>
                       ) : (
                           <AlertDialogAction onClick={closeAlertDialog}>
                               Entendido
                           </AlertDialogAction>
                       )}
                   </AlertDialogFooter>
               </AlertDialogContent>
           </AlertDialog>
       </>
    )
}
