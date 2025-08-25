import {ApiResponse, IProgram} from "@/interfaces";


const API_BASE_URL = process.env.NEXT_BACKEND_API_URL;

export const programService = {
    /**
     * Obtiene un programa por su UUID
     * @param uuid - UUID del programa
     * @returns Promise con los datos del programa
     */
    async getProgramByUuid(uuid: string): Promise<IProgram> {
        try {
            const response = await fetch(`${API_BASE_URL}/admission/program/${uuid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                cache: 'no-store'
            });

            const data: ApiResponse<IProgram> = await response.json();

            if (data.status !== 'success') {
                throw new Error('Error al obtener el programa');
            }

            return data.data;
        } catch (error) {
            console.error('Error fetching program by UUID:', error);
            if (error instanceof Error) {
                throw new Error(`No se pudo obtener el programa: ${error.message}`);
            }
            throw new Error('No se pudo obtener el programa');
        }
    },
};
