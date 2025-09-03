import {
    ICreateInterviewAppointmentRequest,
    ICreateInterviewAppointmentResponse,
    ApiResponse,
    IInterviewAppointment
} from "@/interfaces";

const SERVER_BASE = process.env.NEXT_BACKEND_API_URL;
const CLIENT_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
export const API_BASE_URL =
    typeof window === 'undefined' ? SERVER_BASE : CLIENT_BASE;

export const interviewAppointmentService = {
    /**
     * Crea una cita de entrevista
     * @param appointmentData - Datos de la cita a crear
     * @param token - Token de autorización Bearer
     * @returns Promise con la respuesta de la creación de cita
     */
    async createInterviewAppointment(
        appointmentData: ICreateInterviewAppointmentRequest,
        token: string
    ): Promise<ICreateInterviewAppointmentResponse> {
        try {
            const response = await fetch(`${API_BASE_URL}/admission/interview-appointments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(appointmentData)
            });

            // Devolver la respuesta tal como viene del servidor
            // para que el front pueda manejar tanto éxito como error
            return await response.json();

        } catch (error) {
            console.error('Error al crear la cita de entrevista:', error);
            // En caso de error de red, devolver formato consistente
            return {
                status: "error",
                message: "Error de conexión con el servidor. Inténtalo más tarde."
            };
        }
    },

    /**
     * Obtiene las citas de entrevista
     * @param token - Token de autorización Bearer
     * @returns Promise con el array de citas de entrevista
     */
    async getInterviewAppointments(
        token: string
    ): Promise<IInterviewAppointment[]> {
        try {
            const response = await fetch(`${API_BASE_URL}/admission/interview-appointments`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result: ApiResponse<IInterviewAppointment[]> = await response.json();

            if (result.status !== 'success') {
                throw new Error('Error en la respuesta del servidor');
            }

            return result.data;

        } catch (error) {
            console.error('Error al obtener las citas de entrevista:', error);
            throw error;
        }
    },
};
