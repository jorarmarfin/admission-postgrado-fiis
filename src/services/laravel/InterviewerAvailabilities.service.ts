import { ApiResponse, IInterviewerAvailability } from "@/interfaces";

const API_BASE_URL = process.env.NEXT_BACKEND_API_URL;

export const interviewerAvailabilitiesService = {
    /**
     * Obtiene la lista de disponibilidades de entrevistadores
     * @param token - Token de autorización Bearer
     * @returns Promise con la lista de disponibilidades
     */
    async getInterviewerAvailabilities(token: string): Promise<IInterviewerAvailability[]> {
        try {
            const response = await fetch(`${API_BASE_URL}/admission/interviewer-availabilities`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                cache: 'no-store'
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result: ApiResponse<IInterviewerAvailability[]> = await response.json();

            if (result.status !== 'success') {
                throw new Error('Error en la respuesta del servidor');
            }

            return result.data;
        } catch (error) {
            console.error('Error al obtener disponibilidades de entrevistadores:', error);
            throw new Error('Error al cargar la lista de disponibilidades de entrevistadores');
        }
    }
};
