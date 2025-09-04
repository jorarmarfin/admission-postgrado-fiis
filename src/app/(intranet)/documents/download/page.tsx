import { Button } from "@/components/ui/button"
import Link from "next/link"
import {Metadata} from "next";
import {authOptions} from "@/lib/auth";
import {getServerSession} from "next-auth";
import {applicantService, programService} from "@/services";
import {IApplicantDetails, IProgramDocumentsResponse} from "@/interfaces";
import {HeaderComponent} from "@/components";

export const metadata: Metadata = {
    title: "Descargar Documentos - Admisión Postgrado",
    description: "Página para descargar documentos necesarios para el proceso de admisión al postgrado de la FIIS - UNI.",
}


export default async function DocumentsDownloadPage() {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken ?? '';
    const applicantDetails: IApplicantDetails = await applicantService.getApplicantDetails(token);
    const documents: IProgramDocumentsResponse = await programService.getProgramDocuments(applicantDetails.program.id, token);



    const getIcono = (tipo: string) => {
        switch (tipo) {
            case "docx":
                return (
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                )
            case "pdf":
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <HeaderComponent period={applicantDetails.academic_period.name} program={applicantDetails.program.name} />
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
                                    💡 <strong>Consejo:</strong> Te recomendamos imprimir la Guía del Postulante para tenerla como referencia física durante todo el proceso.
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
                        {documents.data.map((document) => (
                            <div key={document.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        {getIcono(document.document_type)}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                    {document.document_name}
                                                </h3>
                                                <p className="text-gray-600 mb-3">
                                                    Descripción
                                                </p>

                                                <div className="flex items-center space-x-6 text-sm text-gray-500">
                                                    <div className="flex items-center space-x-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                        </svg>
                                                        <span>{document.document_type}</span>
                                                    </div>

                                                    <div className="flex items-center space-x-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                        </svg>
                                                        <span>{document.document_size}</span>
                                                    </div>

                                                    <div className="flex items-center space-x-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span>Actualizado: {new Date(document.created_at).toLocaleString('es-ES')}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex-shrink-0 ml-4">
                                                <Button
                                                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                        <span>Descargar</span>
                                                    </div>
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