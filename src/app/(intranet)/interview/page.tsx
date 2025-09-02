import {InterviewForm} from "@/components";
import {interviewerAvailabilitiesService} from "@/services";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {IInterviewerAvailability} from "@/interfaces";


export default async function InterviewPage() {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken ?? '';
    const interviewerAvailabilities: IInterviewerAvailability[] = await interviewerAvailabilitiesService.getInterviewerAvailabilities(token);

    return <InterviewForm />;
}