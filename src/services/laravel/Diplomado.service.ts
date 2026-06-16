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
        const response = await fetch(`${API_BASE_URL}/diplomado/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(payload),
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
