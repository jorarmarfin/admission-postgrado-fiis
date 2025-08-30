import {DocumentsUploadForm} from "@/components";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {Metadata} from "next";
import {IUserApplicationsResponse} from "@/interfaces";
import {applicantService} from "@/services";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Cargar Documentos - FIIS UNI",
    description: "Sube y administra tus documentos de manera eficiente con nuestra plataforma segura y fácil de usar.",
}

export default async function DocumentsUploadPage() {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken ?? '';
    const userId = session?.user?.id ?? '';
    const applicantData: IUserApplicationsResponse = await applicantService.getUserApplications(parseInt(userId), token);
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
                                    Proceso de Admisión Postgrado {applicantData?.data[0].academic_period.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {applicantData?.data[0].program.name}
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
                <DocumentsUploadForm token={token} />


                {/* Footer informativo */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>¿Problemas con la carga de archivos? Contacta a: <a href="mailto:admision@fiis.uni.edu.pe" className="text-red-800 hover:text-red-900">admision@fiis.uni.edu.pe</a></p>
                </div>
            </div>
        </div>
    );
}