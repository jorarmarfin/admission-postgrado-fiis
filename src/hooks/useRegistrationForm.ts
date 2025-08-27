import { useState } from 'react';
import { applicantService } from '@/services';
import { IApplicationRequest, IApplicationResponse } from '@/interfaces';

export interface UseRegistrationFormReturn {
    isLoading: boolean;
    error: string | null;
    success: boolean;
    validationErrors: { [key: string]: string[] } | null;
    submitApplication: (formData: IApplicationRequest) => Promise<boolean>;
    resetState: () => void;
}

export const useRegistrationForm = (): UseRegistrationFormReturn => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string[] } | null>(null);

    const submitApplication = async (formData: IApplicationRequest): Promise<boolean> => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);
        setValidationErrors(null);

        try {
            const response: IApplicationResponse = await applicantService.submitApplication(formData);

            if (response.status === 'success') {
                setSuccess(true);
                console.log('Aplicación enviada exitosamente:', response.data);
                return true;
            } else {
                // Manejo específico de errores de validación
                if (response.errors) {
                    setValidationErrors(response.errors);

                    // Generar mensaje específico para duplicados
                    const isDuplicateUser = response.errors.personal_email?.some(err => err.includes('ya ha sido tomado')) ||
                                          response.errors.document_number?.some(err => err.includes('ya ha sido tomado'));

                    if (isDuplicateUser) {
                        setError('Este postulante ya está registrado en el sistema. Por favor, verifique el DNI y email ingresados.');
                    } else {
                        setError(response.message || 'Error de validación en los datos ingresados');
                    }
                } else {
                    setError(response.message || 'Error al enviar la aplicación');
                }
                return false;
            }
        } catch (error) {
            console.error('Error en submitApplication:', error);
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
