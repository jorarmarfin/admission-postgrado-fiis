import {InterviewForm} from "@/components";
import {interviewAppointmentService, interviewAvailabilitiesService} from "@/services";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {IInterviewAppointment, IInterviewAvailability} from "@/interfaces";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Entrevistas - FIIS UNI",
    description: "Página de gestión de entrevistas",
}


export default async function InterviewPage() {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken ?? '';
    const interviewAvailabilities: IInterviewAvailability[] = await interviewAvailabilitiesService.getInterviewAvailabilities(token);
    const myInterview:IInterviewAppointment[] = await interviewAppointmentService.getInterviewAppointments(token);

    return <InterviewForm interviewAvailabilities={interviewAvailabilities} token={token} myScheduledInterview={myInterview.interviewer_availability} />;
}