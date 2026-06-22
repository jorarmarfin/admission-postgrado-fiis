import {
    IDiplomadoProgram,
    IDiplomadoRegistrationRequest,
    IDiplomadoRegistrationResponse,
    IDiplomadoRegistrationStatus,
} from '@/interfaces';

const SERVER_BASE = process.env.NEXT_BACKEND_API_URL;
const CLIENT_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_BASE_URL = typeof window === 'undefined' ? SERVER_BASE : CLIENT_BASE;

export const diplomadoService = {
    async getPrograms(): Promise<IDiplomadoProgram[]> {
        const response = await fetch(`${API_BASE_URL}/diplomado/programs`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            cache: 'no-store',
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        return data.data as IDiplomadoProgram[];
    },

    async register(payload: IDiplomadoRegistrationRequest): Promise<IDiplomadoRegistrationResponse> {
        const formData = new FormData();
        formData.append('program_id', String(payload.program_id));
        formData.append('academic_period_id', String(payload.academic_period_id));
        formData.append('full_name', payload.full_name);
        formData.append('dni', payload.dni);
        formData.append('birthdate', payload.birthdate);
        formData.append('phone', payload.phone);
        formData.append('email', payload.email);
        formData.append('address', payload.address);
        formData.append('city', payload.city);
        formData.append('university', payload.university);
        formData.append('academic_degree', payload.academic_degree);
        formData.append('career', payload.career);
        formData.append('academic_document', payload.academic_document);
        formData.append('voucher_type', payload.voucher_type);
        if (payload.voucher_type === 'factura') {
            if (payload.razon_social) formData.append('razon_social', payload.razon_social);
            if (payload.ruc) formData.append('ruc', payload.ruc);
            if (payload.fiscal_address) formData.append('fiscal_address', payload.fiscal_address);
            if (payload.invoice_email) formData.append('invoice_email', payload.invoice_email);
        }

        const response = await fetch(`${API_BASE_URL}/diplomado/register`, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                status: 'error',
                message: data.message || 'Error al registrar',
                data: data.data,
                errors: data.errors,
            };
        }

        return data as IDiplomadoRegistrationResponse;
    },

    async getRegistrationStatus(token: string): Promise<IDiplomadoRegistrationStatus> {
        const response = await fetch(`${API_BASE_URL}/diplomado/registration/${token}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            cache: 'no-store',
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        return data.data as IDiplomadoRegistrationStatus;
    },
};
