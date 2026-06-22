export interface IDiplomadoProgram {
    id: number;
    uuid: string;
    name: string;
    description: string;
    investment_total: number;
    initial_payment: number;
}

export type AcademicDegree = 'bachelor' | 'graduate' | 'master' | 'doctor' | 'egresado';
export type VoucherType = 'boleta' | 'factura';

export interface IDiplomadoRegistrationRequest {
    program_id: number;
    academic_period_id: number;
    full_name: string;
    dni: string;
    birthdate: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    university: string;
    academic_degree: AcademicDegree;
    career: string;
    academic_document: File;
    voucher_type: VoucherType;
    razon_social?: string | null;
    ruc?: string | null;
    fiscal_address?: string | null;
    invoice_email?: string | null;
}

export interface IDiplomadoRegistrationData {
    token: string;
    investment: {
        initial_payment: number;
        total: number;
    };
}

export interface IDiplomadoRegistrationResponse {
    status: string;
    message: string;
    data: IDiplomadoRegistrationData;
    errors?: Record<string, string[]>;
}

export type DiplomadoRegistrationStatus =
    | 'pending'
    | 'order_sent'
    | 'payment_submitted'
    | 'confirmed'
    | 'rejected';

export interface IDiplomadoRegistrationStatus {
    token: string;
    status: DiplomadoRegistrationStatus;
    status_label: string;
    next_step: string;
    program: string;
    period: string;
    full_name: string;
    email: string;
    submitted_at: string;
    confirmed_at: string | null;
}
