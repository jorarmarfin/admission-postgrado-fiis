
export interface IInterviewAppointment {
    interviewer_start_at: string;
    interviewer_end_at: string;
    mode: string;
    location: string;
    meeting_link: string;
    program_name: string;
    professor_first_name: string;
    professor_last_name: string;
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
