import {ApiResponse, IProgram, IProgramDocumentsResponse} from "@/interfaces";


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

    /**
     * Obtiene los documentos de un programa específico
     * @param programId - ID del programa
     * @param token - Token de autorización Bearer
     * @returns Promise con los documentos del programa
     */
    async getProgramDocuments(programId: number, token: string): Promise<IProgramDocumentsResponse> {
        try {
            const response = await fetch(`${API_BASE_URL}/admission/programs/${programId}/documents`, {
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

            const data: IProgramDocumentsResponse = await response.json();

            if (data.status !== 'success') {
                throw new Error('Error al obtener los documentos del programa');
            }

            return data;
        } catch (error) {
            console.error('Error fetching program documents:', error);
            if (error instanceof Error) {
                throw new Error(`No se pudieron obtener los documentos del programa: ${error.message}`);
            }
            throw new Error('No se pudieron obtener los documentos del programa');
        }
    },
};
