import { ILoginRequest, ILoginResponse } from "@/interfaces";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
    }
};
