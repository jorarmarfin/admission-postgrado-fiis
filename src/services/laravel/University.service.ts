import { IUniversity, ApiResponse } from '../../interfaces';

const API_BASE_URL = process.env.NEXT_BACKEND_API_URL;

export const universityService = {
  /**
   * Obtiene todas las universidades activas
   * @returns Promise con el listado de universidades
   */
  async getUniversities(): Promise<IUniversity[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/admission/universities`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        cache: 'no-store', // Para evitar cache y obtener datos frescos
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse<IUniversity[]> = await response.json();

      if (data.status !== 'success') {
        throw new Error('Error al obtener las universidades');
      }

      return data.data;
    } catch (error) {
      console.error('Error fetching universities:', error);
      if (error instanceof Error) {
        throw new Error(`No se pudo obtener las universidades: ${error.message}`);
      }
      throw new Error('No se pudo obtener las universidades');
    }
  },
};
