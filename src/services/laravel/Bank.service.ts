import { ApiResponse, IBank } from "@/interfaces";

const API_BASE_URL = process.env.NEXT_BACKEND_API_URL;

export const bankService = {
    /**
     * Obtiene la lista de bancos disponibles
     * @returns Promise con la lista de bancos
     */
    async getBanks(): Promise<IBank[]> {
        try {
            const response = await fetch(`${API_BASE_URL}/admission/banks`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                cache: 'no-store'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result: ApiResponse<IBank[]> = await response.json();

            if (result.status !== 'success') {
                throw new Error('Error en la respuesta del servidor');
            }

            return result.data;
        } catch (error) {
            console.error('Error al obtener bancos:', error);
            throw new Error('Error al cargar la lista de bancos');
        }
    }
};
