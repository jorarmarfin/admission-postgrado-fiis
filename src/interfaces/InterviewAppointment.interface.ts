import {IInterviewAvailability} from "@/interfaces/InterviewAvailability";

export interface IInterviewAppointment {
    applicant_id: number;
    interviewer_availabilitie_id: number;
    status: string;
    booked_at: string;
    id: number;
    interviewer_availability: IInterviewAvailability
}

export interface ICreateInterviewAppointmentRequest {
    interviewer_availabilitie_id: number;
}

export interface ICreateInterviewAppointmentResponse {
    status: "success" | "error";
    message: string;
    data?: {
        appointment: IInterviewAppointment;
    };
}

export interface IGetInterviewAppointmentsResponse {
    status: "success" | "error";
    message?: string;
    data?: IInterviewAppointment[];
}
