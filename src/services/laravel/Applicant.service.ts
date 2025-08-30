import { IApplicationRequest, IApplicationResponse, IUserApplicationsResponse, IProgramDocumentsResponse, IUploadDocumentResponse } from "@/interfaces";

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
     * Obtiene las aplicaciones de un usuario específico
     * @param userId - ID del usuario
     * @param token - Token de autorización Bearer
     * @returns Promise con las aplicaciones del usuario
     */
    async getUserApplications(userId: number, token: string): Promise<IUserApplicationsResponse> {
        try {
            const response = await fetch(`${API_BASE_URL}/admission/applicant/user/${userId}`, {
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

            return data as IUserApplicationsResponse;
        } catch (error) {
            console.error('Error al obtener las aplicaciones del usuario:', error);
            throw new Error('Error al cargar las aplicaciones del usuario');
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
    }
};
