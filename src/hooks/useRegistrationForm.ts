import { useState } from 'react';
import { applicantService } from '@/services';
import { IApplicationRequest, IApplicationResponse } from '@/interfaces';

export interface UseRegistrationFormReturn {
    isLoading: boolean;
    error: string | null;
    success: boolean;
    validationErrors: { [key: string]: string[] } | null;
    submitApplication: (formData: IApplicationRequest) => Promise<void>;
    resetState: () => void;
}

export const useRegistrationForm = (): UseRegistrationFormReturn => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string[] } | null>(null);

    const submitApplication = async (formData: IApplicationRequest): Promise<void> => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);
        setValidationErrors(null);

        try {
            const response: IApplicationResponse = await applicantService.submitApplication(formData);

            if (response.status === 'success') {
                setSuccess(true);
                console.log('Aplicación enviada exitosamente:', response.data);
            } else {
                // Error response
                setError(response.message);
                if (response.errors) {
                    setValidationErrors(response.errors);
                }
            }
        } catch (error) {
            console.error('Error en submitApplication:', error);
            setError('Error de conexión con el servidor. Por favor, inténtelo de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    const resetState = () => {
        setError(null);
        setSuccess(false);
        setValidationErrors(null);
        setIsLoading(false);
    };

    return {
        isLoading,
        error,
        success,
        validationErrors,
        submitApplication,
        resetState
    };
};
