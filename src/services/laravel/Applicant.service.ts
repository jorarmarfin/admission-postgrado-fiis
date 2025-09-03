import {
    IApplicationRequest,
    IApplicationResponse,
    IUploadDocumentResponse,
    IApplicantDocumentsResponse,
    IApplicantDetailsResponse,
    IApplicantDetails
} from "@/interfaces";

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
    },

    /**
     * Sube un documento del solicitante
     * @param file - Archivo a subir
     * @param documentName - Nombre del documento
     * @param token - Token de autorización Bearer
     * @returns Promise con la respuesta de la subida
     */
    async uploadDocument(file: File, documentName: string, token: string): Promise<IUploadDocumentResponse> {
        try {
            const formData = new FormData();
            formData.append('document', file);
            formData.append('document_name', documentName);

            const response = await fetch(`${API_BASE_URL}/admission/applicant/documents`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            return data as IUploadDocumentResponse;
        } catch (error) {
            console.error('Error al subir el documento:', error);
            throw new Error('Error al subir el documento');
        }
    },

    /**
     * Obtiene los documentos del solicitante
     * @param token - Token de autorización Bearer
     * @returns Promise con los documentos del solicitante
     */
    async getApplicantDocuments(token: string): Promise<IApplicantDocumentsResponse> {
        try {
            const response = await fetch(`${API_BASE_URL}/admission/applicant/documents`, {
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

            const data = await response.json();

            return data as IApplicantDocumentsResponse;
        } catch (error) {
            console.error('Error al obtener los documentos del solicitante:', error);
            throw new Error('Error al cargar los documentos del solicitante');
        }
    },

    /**
     * Elimina un documento del solicitante
     * @param documentId - ID del documento a eliminar
     * @param token - Token de autorización Bearer
     * @returns Promise con la respuesta de la eliminación
     */
    async deleteDocument(documentId: number, token: string): Promise<{ status: string, message: string }> {
        try {
            const response = await fetch(`${API_BASE_URL}/admission/applicant/documents/${documentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            return data as { status: string, message: string };
        } catch (error) {
            console.error('Error al eliminar el documento:', error);
            throw new Error('Error al eliminar el documento');
        }
    },

    /**
     * Obtiene los detalles del solicitante
     * @param token - Token de autorización Bearer
     * @returns Promise con los detalles del solicitante
     */
    async getApplicantDetails(token: string): Promise<IApplicantDetails> {
        try {
            const response = await fetch(`${API_BASE_URL}/admission/applicant/details`, {
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

            const result: IApplicantDetailsResponse = await response.json();

            if (result.status !== 'success') {
                throw new Error('Error en la respuesta del servidor');
            }
            return result.data;
        } catch (error) {
            console.error('Error al obtener los detalles del solicitante:', error);
            throw new Error('Error al cargar los detalles del solicitante');
        }
    }
};
