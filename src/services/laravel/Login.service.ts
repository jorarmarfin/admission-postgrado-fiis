import { ILoginRequest, ILoginResponse } from "@/interfaces";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Interface para la respuesta del logout
export interface ILogoutResponse {
    message: string;
}

export const loginService = {
    /**
     * Realiza el login del usuario
     * @param credentials - Credenciales de login (email y password)
     * @returns Promise con la respuesta del login
     */
    async login(credentials: ILoginRequest): Promise<ILoginResponse> {
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(credentials),
                cache: 'no-store'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result: ILoginResponse = await response.json();

            return result;
        } catch (error) {
            console.error('Error al realizar login:', error);
            throw new Error('Error al iniciar sesión');
        }
    },

    /**
     * Realiza el logout del usuario
     * @param token - Bearer token del usuario autenticado
     * @returns Promise con la respuesta del logout
     */
    async logout(token: string): Promise<ILogoutResponse> {
        try {
            const response = await fetch(`${API_BASE_URL}/logout`, {
                method: 'POST',
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

            const result: ILogoutResponse = await response.json();

            return result;
        } catch (error) {
            console.error('Error al realizar logout:', error);
            throw new Error('Error al cerrar sesión');
        }
    }
};
