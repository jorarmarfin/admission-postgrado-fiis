'use client';

import { Button } from "@/components/ui/button"
import { useState } from "react"

interface DocumentDownloadButtonProps {
    documentName: string;
    fullUrl: string;
}

export function DocumentDownloadButton({ documentName, fullUrl }: DocumentDownloadButtonProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleDownload = async () => {
        try {
            setIsLoading(true);
            // Crear un link directo y dispararla descarga
            const link = document.createElement('a');
            link.href = fullUrl;
            link.download = documentName || 'documento';
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error descargando documento:', error);
            alert('Error al descargar el documento. Por favor intenta nuevamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            onClick={handleDownload}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>{isLoading ? 'Descargando...' : 'Descargar'}</span>
            </div>
        </Button>
    );
}

