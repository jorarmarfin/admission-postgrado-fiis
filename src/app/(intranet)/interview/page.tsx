import {HeaderComponent, InterviewForm} from "@/components";
import {applicantService, interviewAppointmentService, interviewAvailabilitiesService} from "@/services";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {
    IApplicantDetails,
    IInterviewAppointment,
    IInterviewAvailability
} from "@/interfaces";
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
    const scheduledInterview: IInterviewAppointment[] | null = myScheduledInterview.length > 0 ? myScheduledInterview : null;
    const applicantCanRegisterForInterviews: boolean = await applicantService.canRegisterForInterviews(token);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <HeaderComponent period={applicantDetails.academic_period.name}
                                 program={applicantDetails.program.name}/>

                {/* Selección de horario */}
                {applicantCanRegisterForInterviews ? (
                    <InterviewForm
                        interviewAvailabilities={interviewAvailabilities}
                        token={token}
                        myScheduledInterview={scheduledInterview}
                    />
                ) : (
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <svg className="w-12 h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                    Registro de Entrevista No Disponible
                                </h2>
                                <p className="text-gray-700 text-lg mb-4">
                                    Para poder registrarte en una entrevista, primero debes:
                                </p>
                                <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-6">
                                    <li>Cargar todos los documentos requeridos</li>
                                    <li>Esperar a que los documentos sean revisados y aprobados</li>
                                </ol>
                                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                                    <p className="text-blue-800 font-medium">
                                        En la primera semana de marzo se habilitará el registro para entrevistas.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Instrucciones adicionales */}
                {applicantCanRegisterForInterviews && (
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
                                <li>• Ingresa 5 minutos antes de tu cita programada</li>
                                <li>• Tener a la mano tu DNI</li>
                                <li>• La entrevista será evaluada por el comité académico</li>
                                <li>• Si necesitas reprogramar, contacta con 48 horas de anticipación</li>
                            </ul>
                        </div>
                    </div>
                </div>
                )}

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