import {DocumentsUploadForm, HeaderComponent} from "@/components";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {Metadata} from "next";
import {IApplicantDetails, IApplicantDocumentsResponse} from "@/interfaces";
import {applicantService} from "@/services";

export const metadata: Metadata = {
    title: "Cargar Documentos - FIIS UNI",
    description: "Sube y administra tus documentos de manera eficiente con nuestra plataforma segura y fácil de usar.",
}

export default async function DocumentsUploadPage() {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken ?? '';
    const applicantDetails: IApplicantDetails = await applicantService.getApplicantDetails(token);
    const applicantDocuments:IApplicantDocumentsResponse = await applicantService.getApplicantDocuments(token);
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <HeaderComponent period={applicantDetails.program.name} program={applicantDetails.program.name} />
                <DocumentsUploadForm
                    token={token}
                    documents={applicantDocuments.data}
                />


                {/* Footer informativo */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>¿Problemas con la carga de archivos? Contacta a: <a href="mailto:admision@fiis.uni.edu.pe" className="text-red-800 hover:text-red-900">admision@fiis.uni.edu.pe</a></p>
                </div>
            </div>
        </div>
    );
}