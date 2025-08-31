import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { applicantService } from '@/services/laravel/Applicant.service';
import { IUploadDocumentResponse, IApplicantDocument } from '@/interfaces';

interface AlertDialogState {
    isOpen: boolean;
    title: string;
    description: string;
    type: 'error' | 'confirm' | 'info' | 'success';
    onConfirm?: () => void;
    onCancel?: () => void;
}

interface UseApplicantDocumentsReturn {
    subiendo: boolean;
    draggedOver: boolean;
    form: ReturnType<typeof useForm>;
    alertDialog: AlertDialogState;
    setAlertDialog: (state: AlertDialogState) => void;
    closeAlertDialog: () => void;
    handleFileSelect: (files: FileList | null, onSuccess?: () => void) => Promise<void>;
    handleDragOver: (e: React.DragEvent) => void;
    handleDragLeave: (e: React.DragEvent) => void;
    handleDrop: (e: React.DragEvent, onSuccess?: () => void) => void;
    eliminarDocumento: (id: number) => void;
    subirDocumento: (file: File, documentName: string) => Promise<IUploadDocumentResponse>;
}

export const useApplicantDocuments = (token: string): UseApplicantDocumentsReturn => {
    const [subiendo, setSubiendo] = useState(false);
    const [draggedOver, setDraggedOver] = useState(false);
    const [alertDialog, setAlertDialogState] = useState<AlertDialogState>({
        isOpen: false,
        title: '',
        description: '',
        type: 'info'
    });

    const form = useForm();

    const setAlertDialog = useCallback((state: AlertDialogState) => {
        setAlertDialogState(state);
    }, []);

    const closeAlertDialog = useCallback(() => {
        setAlertDialogState(prev => ({ ...prev, isOpen: false }));
    }, []);

    const showErrorDialog = useCallback((title: string, description: string) => {
        setAlertDialog({
            isOpen: true,
            title,
            description,
            type: 'error'
        });
    }, [setAlertDialog]);

    const showSuccessDialog = useCallback((title: string, description: string) => {
        setAlertDialog({
            isOpen: true,
            title,
            description,
            type: 'success'
        });
    }, [setAlertDialog]);

    const showConfirmDialog = useCallback((title: string, description: string, onConfirm: () => void) => {
        setAlertDialog({
            isOpen: true,
            title,
            description,
            type: 'confirm',
            onConfirm,
            onCancel: closeAlertDialog
        });
    }, [setAlertDialog, closeAlertDialog]);

    const subirDocumento = useCallback(async (file: File, documentName: string): Promise<IUploadDocumentResponse> => {
        try {
            const response = await applicantService.uploadDocument(file, documentName, token);
            return response;
        } catch (error: any) {
            console.error('Error al subir documento:', error);

            // Mostrar error específico del backend
            if (error.message && error.message.includes('validation')) {
                throw new Error('Formato de archivo no válido. Solo se aceptan archivos PDF, JPG, JPEG y PNG.');
            }

            throw new Error('Error al subir el documento. Por favor, inténtalo de nuevo.');
        }
    }, [token]);

    const handleFileSelect = useCallback(async (files: FileList | null, onSuccess?: () => void) => {
        if (!files || files.length === 0) return;

        // Validar formato de archivos
        const validFormats = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
        const invalidFiles = Array.from(files).filter(file => !validFormats.includes(file.type));

        if (invalidFiles.length > 0) {
            showErrorDialog(
                'Formato de archivo no válido',
                `Solo se aceptan archivos PDF, JPG, JPEG y PNG. Archivos rechazados: ${invalidFiles.map(f => f.name).join(', ')}`
            );
            return;
        }

        setSubiendo(true);
        let uploadedCount = 0;
        let errorCount = 0;
        const errorDetails: string[] = [];

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                // Validar tamaño máximo (10 MB)
                const maxSize = 10 * 1024 * 1024;
                if (file.size > maxSize) {
                    errorCount++;
                    errorDetails.push(`${file.name}: Archivo demasiado grande (máximo 10 MB)`);
                    continue;
                }

                try {
                    const documentName = file.name.split('.')[0];
                    await subirDocumento(file, documentName);
                    uploadedCount++;
                } catch (error: any) {
                    errorCount++;
                    console.error(`Error al subir ${file.name}:`, error);

                    // Capturar errores específicos del backend
                    if (error.message.includes('validation')) {
                        errorDetails.push(`${file.name}: Formato no válido`);
                    } else {
                        errorDetails.push(`${file.name}: Error al subir`);
                    }
                }
            }

            // Mostrar resultado final
            if (uploadedCount > 0 && errorCount === 0) {
                showSuccessDialog(
                    '¡Documentos subidos exitosamente!',
                    `Se ${uploadedCount === 1 ? 'subió 1 documento' : `subieron ${uploadedCount} documentos`} correctamente.`
                );
                onSuccess?.();
            } else if (uploadedCount > 0 && errorCount > 0) {
                showErrorDialog(
                    'Subida parcialmente exitosa',
                    `Se subieron ${uploadedCount} documentos correctamente, pero ${errorCount} fallaron:\n${errorDetails.join('\n')}`
                );
                onSuccess?.();
            } else if (errorCount > 0) {
                showErrorDialog(
                    'Error en la subida',
                    `No se pudo subir ningún documento:\n${errorDetails.join('\n')}`
                );
            }

        } finally {
            setSubiendo(false);
        }
    }, [subirDocumento, showErrorDialog, showSuccessDialog]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDraggedOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDraggedOver(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent, onSuccess?: () => void) => {
        e.preventDefault();
        setDraggedOver(false);
        handleFileSelect(e.dataTransfer.files, onSuccess);
    }, [handleFileSelect]);

    const eliminarDocumento = useCallback((id: number) => {
        // TODO: Implementar eliminación de documento
        console.log('Eliminar documento:', id);
    }, []);

    return {
        subiendo,
        draggedOver,
        form,
        alertDialog,
        setAlertDialog,
        closeAlertDialog,
        handleFileSelect,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        eliminarDocumento,
        subirDocumento
    };
};
