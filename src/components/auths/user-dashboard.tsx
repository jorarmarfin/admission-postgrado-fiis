"use client";

import { useSession } from "next-auth/react";
import { LogoutButton } from "@/components";
import { Button } from "@/components/ui/button";

export const UserDashboard = () => {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div>Cargando...</div>;
    }

    if (!session) {
        return <div>No hay sesión activa</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex justify-between items-start mb-6">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <LogoutButton variant="destructive" />
            </div>

            <div className="space-y-4">
                <div>
                    <h2 className="text-lg font-semibold mb-2">Información del Usuario</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">ID:</p>
                            <p className="font-medium">{session.user.id}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Nombre:</p>
                            <p className="font-medium">{session.user.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Email:</p>
                            <p className="font-medium">{session.user.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Roles:</p>
                            <p className="font-medium">{session.user.roles?.join(", ") || "Sin roles"}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-md font-semibold mb-2">Token de Acceso</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 p-2 rounded">
                        {session.accessToken ? `${session.accessToken.substring(0, 20)}...` : "No disponible"}
                    </p>
                </div>

                {session.userData && (
                    <div>
                        <h3 className="text-md font-semibold mb-2">Datos Completos del Usuario</h3>
                        <div className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
                            <p><strong>Creado:</strong> {new Date(session.userData.created_at).toLocaleDateString()}</p>
                            <p><strong>Actualizado:</strong> {new Date(session.userData.updated_at).toLocaleDateString()}</p>
                            <p><strong>Email Verificado:</strong> {session.userData.email_verified_at ? "Sí" : "No"}</p>
                            <p><strong>Roles Detallados:</strong> {session.userData.roles.length}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
