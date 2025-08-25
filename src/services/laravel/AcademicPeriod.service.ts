import {ApiResponse, IAcademicPeriod} from "@/interfaces";

const API_BASE_URL = process.env.NEXT_BACKEND_API_URL;

export const academicPeriodService = {
  /**
   * Obtiene el período académico activo
   * @returns Promise con el período académico activo
   */
  async getActivePeriod(): Promise<IAcademicPeriod> {
    try {
      const response = await fetch(`${API_BASE_URL}/admission/period`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
          next: { tags: ['period'], revalidate: 60 * 60 * 24 }, // Para evitar cache y obtener datos frescos
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // CORRECCIÓN: Agregado tipado TypeScript correcto
      const data: ApiResponse<IAcademicPeriod> = await response.json();

      // CORRECCIÓN: Cambiado de 'success' a 'status' para coincidir con tu API
      if (data.status !== 'success') {
        throw new Error('Error al obtener el período académico activo');
      }

      return data.data;
    } catch (error) {
      console.error('Error fetching active academic period:', error);
      // CORRECCIÓN: Mejor manejo de errores con información más específica
      if (error instanceof Error) {
        throw new Error(`No se pudo obtener el período académico activo: ${error.message}`);
      }
      throw new Error('No se pudo obtener el período académico activo');
    }
  },

};
