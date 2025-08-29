"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { applicantService } from "@/services";
import { IUserApplication } from "@/interfaces";

export const UserApplications = () => {
    const { data: session } = useSession();
    const [applications, setApplications] = useState<IUserApplication[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchApplications = async () => {
            if (!session?.user?.id || !session?.accessToken) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await applicantService.getUserApplications(
                    parseInt(session.user.id),
                    session.accessToken
                );

                setApplications(response.data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error al cargar aplicaciones');
                setApplications([]);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [session]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2">Cargando aplicaciones...</span>
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
                <p className="text-gray-600">Debes iniciar sesión para ver tus aplicaciones.</p>
            </div>
        );
    }

    if (applications.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-600">No tienes aplicaciones de admisión registradas.</p>
            </div>
        );
    }

    const getStatusBadge = (application: IUserApplication) => {
        if (application.is_accepted) {
            return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Aceptado</span>;
        }
        if (application.admission) {
            return <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">En Admisión</span>;
        }
        if (application.prospecto) {
            return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Prospecto</span>;
        }
        return <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Pendiente</span>;
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Mis Aplicaciones</h2>
                <span className="text-sm text-gray-600">{applications.length} aplicacion(es)</span>
            </div>

            <div className="grid gap-6">
                {applications.map((application) => (
                    <div key={application.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {application.program.name}
                                </h3>
                                <p className="text-gray-600">{application.program.description}</p>
                            </div>
                            {getStatusBadge(application)}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                            <div>
                                <h4 className="text-sm font-medium text-gray-700">Periodo Académico</h4>
                                <p className="text-gray-900">{application.academic_period.name}</p>
                                <p className="text-sm text-gray-500">
                                    {application.academic_period.active ? "Activo" : "Inactivo"}
                                </p>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-gray-700">Estudiante</h4>
                                <p className="text-gray-900">
                                    {application.student.first_name} {application.student.last_name}
                                </p>
                                <p className="text-sm text-gray-500">{application.student.document_number}</p>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-gray-700">Contacto</h4>
                                <p className="text-gray-900">{application.student.personal_email}</p>
                                <p className="text-sm text-gray-500">{application.student.phones}</p>
                            </div>
                        </div>

                        <div className="border-t pt-4">
                            <div className="flex justify-between items-center text-sm text-gray-500">
                                <span>Aplicación ID: {application.id}</span>
                                <span>
                                    Creado: {new Date(application.created_at).toLocaleDateString('es-ES')}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
