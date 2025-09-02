export interface IInterviewAppointment {
    applicant_id: number;
    interviewer_availabilitie_id: number;
    status: string;
    booked_at: string;
    id: number;
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
