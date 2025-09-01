import {Login} from "@/components";
import {PublicRoute} from "@/components/auths/public-route";
import {Metadata} from "next";
export const metadata: Metadata = {
    title: "Ingreso - FIIS UNI",
    description: "Accede a tu cuenta de FIIS UNI para gestionar tus aplicaciones y documentos de admisión.",
}

export default function LoginPage() {
    return (
        <PublicRoute>
            <Login/>
        </PublicRoute>
    );
}
