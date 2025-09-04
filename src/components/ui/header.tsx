import Link from "next/link";
import {Button} from "@/components/ui/button";

interface Props{
    period:string
    program:string
}

export const HeaderComponent = ({period,program}:Props) => {

    return (
        <>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 mb-6">
                    <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-800 rounded-full flex items-center justify-center flex-shrink-0">
                            <div className="w-8 h-8 sm:w-12 sm:h-12 border-2 sm:border-3 border-white rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-xs">UNI</span>
                            </div>
                        </div>
                        <div className="min-w-0 flex-1">
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-800 mb-1 leading-tight">
                                Documentos para Descarga
                            </h1>
                            <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-snug">
                                Proceso de Admisión Posgrado {period}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500 truncate">
                                {program}
                            </p>
                        </div>
                    </div>
                    <div className="flex-shrink-0 self-start sm:self-center">
                        <Link href="/">
                            <Button variant="outline" className="border-red-800 text-red-800 hover:bg-red-50 w-full sm:w-auto text-sm">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Volver al Inicio
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}