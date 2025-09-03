import {HeaderComponent, InterviewForm} from "@/components";
import {applicantService, interviewAppointmentService, interviewAvailabilitiesService} from "@/services";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {IApplicantDetails, IInterviewAppointment, IInterviewAvailability} from "@/interfaces";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Entrevistas - FIIS UNI",
    description: "Página de gestión de entrevistas",
}


export default async function InterviewPage() {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken ?? '';
    const interviewAvailabilities: IInterviewAvailability[] = await interviewAvailabilitiesService.getInterviewAvailabilities(token);
    const applicantDetails: IApplicantDetails = await applicantService.getApplicantDetails(token);
    const myScheduledInterview: IInterviewAppointment[] = await interviewAppointmentService.getInterviewAppointments(token);

    // Si no hay entrevistas programadas, enviar null
    const scheduledInterview = myScheduledInterview.length > 0 ? myScheduledInterview[0].interviewer_availability : null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <HeaderComponent period={applicantDetails.program.name} program={applicantDetails.program.name}/>

                {/* Selección de horario */}
                <InterviewForm
                    interviewAvailabilities={interviewAvailabilities}
                    token={token}
                    myScheduledInterview={scheduledInterview}
                />

                {/* Instrucciones adicionales */}
                <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <div className="flex items-start space-x-3">
                        <svg className="w-6 h-6 text-yellow-600 mt-0.5" fill="none" stroke="currentColor"
                             viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                        </svg>
                        <div className="flex-1">
                            <h3 className="font-semibold text-yellow-900 mb-2">Instrucciones Importantes</h3>
                            <ul className="text-sm text-yellow-800 space-y-1">
                                <li>• Llega 15 minutos antes de tu cita programada</li>
                                <li>• Trae tu DNI original y copia de todos los documentos enviados</li>
                                <li>• La entrevista será evaluada por el comité académico</li>
                                <li>• Si necesitas reprogramar, contacta con 48 horas de anticipación</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Footer informativo */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>¿Tienes preguntas sobre la entrevista? Contacta a: <a href="mailto:admision@fiis.uni.edu.pe"
                                                                             className="text-red-800 hover:text-red-900">admision@fiis.uni.edu.pe</a>
                    </p>
                </div>
            </div>
        </div>
    );

}