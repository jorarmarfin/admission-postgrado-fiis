"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { programService } from "@/services";
import { ProgramDocuments } from "@/components";
import { IProgram } from "@/interfaces";

interface ProgramDetailsProps {
    programUuid: string;
}

export const ProgramDetails = ({ programUuid }: ProgramDetailsProps) => {
    const { data: session } = useSession();
    const [program, setProgram] = useState<IProgram | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProgram = async () => {
            try {
                setLoading(true);
                const programData = await programService.getProgramByUuid(programUuid);
                setProgram(programData);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error al cargar el programa');
                setProgram(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProgram();
    }, [programUuid]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-lg">Cargando programa...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-red-800 font-medium text-lg">Error</h3>
                <p className="text-red-600 mt-2">{error}</p>
            </div>
        );
    }

    if (!program) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600 text-lg">Programa no encontrado.</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Información del Programa */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{program.name}</h1>
                    <p className="text-gray-600 text-lg">{program.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Información General</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">ID del Programa:</span>
                                <span className="font-medium">{program.id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">UUID:</span>
                                <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                                    {program.uuid}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tipo de Programa:</span>
                                <span className="font-medium">{program.program_types.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Estado:</span>
                                <span className={`px-2 py-1 rounded text-sm font-medium ${
                                    program.program_types.active 
                                        ? "bg-green-100 text-green-800" 
                                        : "bg-red-100 text-red-800"
                                }`}>
                                    {program.program_types.active ? "Activo" : "Inactivo"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {session && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Información de Usuario</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Usuario:</span>
                                    <span className="font-medium">{session.user.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Email:</span>
                                    <span className="font-medium">{session.user.email}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Rol:</span>
                                    <span className="font-medium">{session.user.roles?.join(", ") || "Sin roles"}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Documentos del Programa */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <ProgramDocuments
                    programId={program.id}
                    programName={program.name}
                />
            </div>
        </div>
    );
};
