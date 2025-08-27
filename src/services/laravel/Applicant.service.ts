import { IApplicationRequest, IApplicationResponse } from "@/interfaces";

const SERVER_BASE = process.env.NEXT_BACKEND_API_URL;            // solo server
const CLIENT_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
export const API_BASE_URL =
    typeof window === 'undefined' ? SERVER_BASE : CLIENT_BASE;

export const applicantService = {
    /**
     * Envía una aplicación de admisión
     * @param applicationData - Datos de la aplicación
     * @returns Promise con la respuesta de la aplicación
     */
    async submitApplication(applicationData: IApplicationRequest): Promise<IApplicationResponse> {
        try {
            const response = await fetch(`${API_BASE_URL}/admission/apply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(applicationData)
            });

            const data = await response.json();

            return data as IApplicationResponse;
        } catch (error) {
            console.error('Error al enviar la aplicación:', error);
            throw new Error('Error de conexión con el servidor');
        }
    }
};
