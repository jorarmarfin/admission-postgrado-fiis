import Link from "next/link";
import {Button} from "@/components/ui/button";

interface Props{
    period:string
    program:string
}

export const HeaderComponent = ({period,program}:Props) => {

    return (
        <>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-red-800 rounded-full flex items-center justify-center">
                            <div className="w-12 h-12 border-3 border-white rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-xs">UNI</span>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-red-800 mb-1">
                                Documentos para Descarga
                            </h1>
                            <p className="text-lg text-gray-600">
                                Proceso de Admisión Posgrado {period}
                            </p>
                            <p className="text-sm text-gray-500">
                                {program}
                            </p>
                        </div>
                    </div>
                    <Link href="/">
                        <Button variant="outline" className="border-red-800 text-red-800 hover:bg-red-50">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Volver al Inicio
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    )
}