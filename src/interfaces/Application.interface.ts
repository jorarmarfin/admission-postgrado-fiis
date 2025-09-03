// Interfaces para la aplicación de admisión

import {IStudent} from "@/interfaces/Student.interface";
import {IAcademicPeriodDetail} from "@/interfaces/AcademicPeriod.interface";
import {IProgramDetail} from "@/interfaces/Program.interface";

export interface IApplicationRequest {
    first_name: string;
    last_name: string;
    personal_email: string;
    phones: string;
    document_type: string;
    document_number: string;
    program_id: number;
    academic_period_id: number;
    payment_order_bank: string;
    birth_date: string;
    university_id: number;
    undergraduate_major: string;
    with_invoice:boolean;
    ruc_number?: string;
    business_name?: string;
    business_address?: string;
    registered_address?: string;
}

export interface IApplicantData {
    student_id: number;
    academic_period_id: number;
    program_id: number;
    updated_at: string;
    created_at: string;
    id: number;
}

export interface IApplicationSuccessResponse {
    status: "success";
    message: string;
    data: {
        applicant: IApplicantData;
    };
}

export interface IApplicationErrorResponse {
    status: "error";
    message: string;
    errors: {
        [key: string]: string[];
    };
}

export type IApplicationResponse = IApplicationSuccessResponse | IApplicationErrorResponse;

export interface IUserApplicationsResponse {
    status: "success";
    data: IUserApplication[];
}


export interface IUserApplication {
    id: number;
    student_id: number;
    academic_period_id: number;
    program_id: number;
    prospecto: boolean;
    admission: boolean;
    is_accepted: boolean;
    created_at: string;
    updated_at: string;
    student: IStudent;
    program: IProgramDetail;
    academic_period: IAcademicPeriodDetail;
}

export interface IUserApplicationsResponse {
    status: "success";
    data: IUserApplication[];
}



// Interface para la respuesta de detalles del solicitante

