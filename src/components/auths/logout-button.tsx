"use client";

import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
    className?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
}

export const LogoutButton = ({ className, variant = "outline", size = "default" }: LogoutButtonProps) => {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        setIsLoading(true);

        try {
            await signOut({
                redirect: false, // No redirigir automáticamente
            });

            // Redirigir manualmente después del logout exitoso
            router.push("/auth/login");
            router.refresh();
        } catch (error) {
            console.error("Error durante el logout:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Solo mostrar el botón si hay una sesión activa
    if (!session) {
        return null;
    }

    return (
        <Button
            onClick={handleLogout}
            disabled={isLoading}
            variant={variant}
            size={size}
            className={className}
        >
            {isLoading ? "Cerrando sesión..." : "Cerrar sesión"}
        </Button>
    );
};
