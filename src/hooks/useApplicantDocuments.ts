import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { applicantService } from '@/services/laravel/Applicant.service';
import { IUploadDocumentResponse } from '@/interfaces';

interface DocumentoSubido {
    id: number;
    nombre: string;
    tamaño: string;
    tipo: string;
    fechaSubida: string;
    archivo: File;
    uploaded?: boolean;
    uploadResponse?: IUploadDocumentResponse;
}

interface AlertDialogState {
    isOpen: boolean;
    title: string;
    description: string;
    type: 'error' | 'confirm' | 'info';
    onConfirm?: () => void;
    onCancel?: () => void;
}

interface UseApplicantDocumentsReturn {
    documentos: DocumentoSubido[];
    subiendo: boolean;
    draggedOver: boolean;
    form: ReturnType<typeof useForm>;
    alertDialog: AlertDialogState;
    setAlertDialog: (state: AlertDialogState) => void;
    closeAlertDialog: () => void;
    handleFileSelect: (files: FileList | null) => Promise<void>;
    handleDragOver: (e: React.DragEvent) => void;
    handleDragLeave: (e: React.DragEvent) => void;
    handleDrop: (e: React.DragEvent) => void;
    eliminarDocumento: (id: number) => void;
    limpiarTodos: () => void;
    subirDocumento: (file: File, documentName: string) => Promise<void>;
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

    const subirDocumento = useCallback(async (file: File, documentName: string) => {
        try {
            const response = await applicantService.uploadDocument(file, documentName, token);
            return response;
        } catch (error) {
            console.error('Error al subir documento:', error);
            throw error;
        }
    }, [token]);

    const handleFileSelect = useCallback(async (files: FileList | null) => {
        if (!files || files.length === 0) return;

        setSubiendo(true);

        const nuevosDocumentos: DocumentoSubido[] = [];
        const uploadPromises: Promise<void>[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // Validar tamaño máximo (10 MB)
            const maxSize = 10 * 1024 * 1024;
            if (file.size > maxSize) {
                showErrorDialog(
                    'Archivo demasiado grande',
                    `El archivo "${file.name}" es demasiado grande. El tamaño máximo permitido es de 10 MB.`
                );
                continue;
            }

            // Crear documento local
            const nuevoDocumento: DocumentoSubido = {
                id: Date.now() + i,
                nombre: file.name,
                tamaño: (file.size / (1024 * 1024)).toFixed(2) + " MB",
                tipo: file.type || "Desconocido",
                fechaSubida: new Date().toLocaleString('es-ES'),
                archivo: file,
                uploaded: false
            };

            nuevosDocumentos.push(nuevoDocumento);

            // Crear promesa de subida
            const uploadPromise = subirDocumento(file, file.name.split('.')[0])
                .then((response) => {
                    // Actualizar documento con respuesta de subida exitosa

                })
                .catch((error) => {
                    console.error(`Error al subir ${file.name}:`, error);
                    // Marcar documento con error pero mantenerlo en la lista

                    showErrorDialog(
                        'Error al subir documento',
                        `No se pudo subir el documento "${file.name}". Por favor, inténtalo de nuevo.`
                    );
                });

            uploadPromises.push(uploadPromise);
        }


        try {
            // Esperar a que todas las subidas terminen
            await Promise.all(uploadPromises);
        } finally {
            setSubiendo(false);
        }
    }, [subirDocumento, showErrorDialog]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDraggedOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDraggedOver(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDraggedOver(false);
        handleFileSelect(e.dataTransfer.files);
    }, [handleFileSelect]);

    const eliminarDocumento = useCallback((id: number) => {

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
