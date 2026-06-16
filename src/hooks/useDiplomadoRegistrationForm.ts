'use client';

import { useState } from 'react';
import { diplomadoService } from '@/services';
import { IDiplomadoRegistrationRequest, IDiplomadoRegistrationData } from '@/interfaces';

export interface UseDiplomadoRegistrationFormReturn {
    isLoading: boolean;
    error: string | null;
    success: boolean;
    registrationData: IDiplomadoRegistrationData | null;
    validationErrors: Record<string, string[]> | null;
    submitRegistration: (payload: IDiplomadoRegistrationRequest) => Promise<boolean>;
    resetState: () => void;
}

export const useDiplomadoRegistrationForm = (): UseDiplomadoRegistrationFormReturn => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [registrationData, setRegistrationData] = useState<IDiplomadoRegistrationData | null>(null);
    const [validationErrors, setValidationErrors] = useState<Record<string, string[]> | null>(null);

    const submitRegistration = async (payload: IDiplomadoRegistrationRequest): Promise<boolean> => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);
        setValidationErrors(null);

        try {
            const response = await diplomadoService.register(payload);

            if (response.status === 'success') {
                setSuccess(true);
                setRegistrationData(response.data);
                if (response.data?.token) {
                    localStorage.setItem('diplomado_token', response.data.token);
                }
                return true;
            }

            if (response.errors) {
                setValidationErrors(response.errors);
            }
            setError(response.message || 'Error al registrar la inscripción');
            return false;
        } catch {
            setError('Error de conexión con el servidor. Por favor, inténtelo de nuevo.');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const resetState = () => {
        setError(null);
        setSuccess(false);
        setIsLoading(false);
        setValidationErrors(null);
        setRegistrationData(null);
    };

    return { isLoading, error, success, registrationData, validationErrors, submitRegistration, resetState };
};
