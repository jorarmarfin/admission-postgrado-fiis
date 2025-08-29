
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { programService } from "@/services";
import { IProgramDocument } from "@/interfaces";
import { Button } from "@/components/ui/button";

interface ProgramDocumentsProps {
    programId: number;
    programName?: string;
}

export const ProgramDocuments = ({ programId, programName }: ProgramDocumentsProps) => {
    const { data: session } = useSession();
    const [documents, setDocuments] = useState<IProgramDocument[]>([]);
    const [programTitle, setProgramTitle] = useState<string>(programName || "");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDocuments = async () => {
            if (!session?.accessToken) {
                setError("Debes iniciar sesión para ver los documentos");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await programService.getProgramDocuments(
                    programId,
                    session.accessToken
                );

                setDocuments(response.data);
                setProgramTitle(response.program);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error al cargar documentos');
                setDocuments([]);
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, [programId, session]);

    const getFileExtension = (fileName: string) => {
        return fileName.split('.').pop()?.toUpperCase() || 'ARCHIVO';
    };

    const getFileIcon = (documentType: string) => {
        if (documentType.includes('pdf')) return '📄';
        if (documentType.includes('word') || documentType.includes('octet-stream')) return '📝';
        if (documentType.includes('excel') || documentType.includes('spreadsheet')) return '📊';
        if (documentType.includes('image')) return '🖼️';
        return '📁';
    };

    const handleDownload = (document: IProgramDocument) => {
        window.open(document.full_url, '_blank');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2">Cargando documentos...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-red-800 font-medium">Error</h3>
                <p className="text-red-600 text-sm mt-1">{error}</p>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-600">Debes iniciar sesión para ver los documentos.</p>
            </div>
        );
    }

    if (documents.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-600">No hay documentos disponibles para este programa.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Documentos del Programa</h2>
                    {programTitle && (
                        <p className="text-gray-600 mt-1">{programTitle}</p>
                    )}
                </div>
                <span className="text-sm text-gray-600">{documents.length} documento(s)</span>
            </div>

            <div className="grid gap-4">
                {documents.map((document) => (
                    <div key={document.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 flex-1 min-w-0">
                                <div className="text-2xl">
                                    {getFileIcon(document.document_type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-medium text-gray-900 truncate">
                                        {document.document_name}
                                    </h3>
                                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                                            {getFileExtension(document.document_name)}
                                        </span>
                                        <span>
                                            Subido: {new Date(document.created_at).toLocaleDateString('es-ES')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                                <Button
                                    onClick={() => handleDownload(document)}
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center space-x-1"
                                >
                                    <span>📥</span>
                                    <span>Descargar</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
                <p><strong>Nota:</strong> Los documentos se abrirán en una nueva pestaña. Asegúrate de que tu navegador permita ventanas emergentes.</p>
            </div>
        </div>
    );
};