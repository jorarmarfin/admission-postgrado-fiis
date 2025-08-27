import { IDocumentType, IDocumentTypesResponse } from '@/interfaces';

const BASE_URL = process.env.NEXT_BACKEND_API_URL;

export const documentTypesService = {
    /**
     * Obtiene todos los tipos de documento disponibles
     * @returns Promise<IDocumentType[]> - Lista de tipos de documento
     */
    async getDocumentTypes(): Promise<IDocumentType[]> {
        try {
            const response = await fetch(`${BASE_URL}/admission/document-types`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                cache: 'force-cache', // Cache para mejorar performance ya que los tipos de documento no cambian frecuentemente
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: IDocumentTypesResponse = await response.json();

            if (data.status === 'success') {
                return data.data;
            } else {
                throw new Error('Error al obtener tipos de documento');
            }
        } catch (error) {
            console.error('Error fetching document types:', error);
            // Retornamos tipos por defecto en caso de error para no romper la UI
            return [
                { id: 'DNI', name: 'DNI' },
                { id: 'CE', name: 'Carné de Extranjería' },
                { id: 'PASSPORT', name: 'Pasaporte' }
            ];
        }
    },

    /**
     * Obtiene un tipo de documento específico por ID
     * @param id - ID del tipo de documento
     * @returns Promise<IDocumentType | null> - Tipo de documento o null si no se encuentra
     */
    async getDocumentTypeById(id: string): Promise<IDocumentType | null> {
        try {
            const documentTypes = await this.getDocumentTypes();
            return documentTypes.find(type => type.id === id) || null;
        } catch (error) {
            console.error('Error fetching document type by ID:', error);
            return null;
        }
    }
};
