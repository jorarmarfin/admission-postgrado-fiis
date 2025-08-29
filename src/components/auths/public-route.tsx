"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface PublicRouteProps {
  children: ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { status } = useSession();
  const router = useRouter();
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  useEffect(() => {
    // Si el usuario ya está autenticado, redirigir a la página principal
    // if (isAuthenticated) {
    //   router.push("/");
    // }
  }, [isAuthenticated, router]);

  // Mientras verifica la sesión, mostrar un indicador de carga
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium">Cargando...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, mostrar el contenido de la ruta pública
  return <>{children}</>;
};
