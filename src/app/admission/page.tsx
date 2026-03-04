import Link from "next/link"
import { Button } from "@/components/ui/button"
import { programService } from "@/services"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Programas de Postgrado - FIIS UNI",
    description: "Explora nuestros programas de Maestría y Doctorado en la Facultad de Ingeniería Industrial y de Sistemas",
}

export default async function AdmissionPage() {
    const programs = await programService.getAllPrograms()

    // Agrupar programas por tipo
    const programsByType = programs.reduce((acc, program) => {
        const typeName = program.program_types.name
        if (!acc[typeName]) {
            acc[typeName] = []
        }
        acc[typeName].push(program)
        return acc
    }, {} as Record<string, typeof programs>)

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-red-800 to-red-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Programas de Posgrado
                        </h1>
                        <p className="text-xl md:text-2xl text-red-100 mb-2">
                            Facultad de Ingeniería Industrial y de Sistemas
                        </p>
                        <p className="text-lg text-red-200">
                            Universidad Nacional de Ingeniería
                        </p>

                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Introducción */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Impulsa tu Carrera Profesional
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Descubre nuestros programas de postgrado diseñados para formar líderes e investigadores
                            de excelencia. Selecciona el programa que mejor se adapte a tus objetivos profesionales
                            y da el siguiente paso en tu desarrollo académico.
                        </p>
                    </div>
                </div>

                {/* Programas por tipo */}
                {Object.entries(programsByType).map(([typeName, typePrograms]) => (
                    <div key={typeName} className="mb-12">
                        <div className="flex items-center mb-6">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <h2 className="px-6 text-2xl font-bold text-gray-900">
                                {typeName}
                            </h2>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {typePrograms.map((program) => (
                                <div
                                    key={program.id}
                                    className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group"
                                >
                                    {/* Header colorido */}
                                    <div className="bg-gradient-to-r from-red-700 to-red-800 p-6 group-hover:from-red-800 group-hover:to-red-900 transition-all">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 mb-3">
                                                    <span className="text-xs font-semibold text-white">
                                                        {program.program_types.name}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-bold text-white leading-tight">
                                                    {program.name}
                                                </h3>
                                            </div>
                                            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                                                <svg
                                                    className="w-6 h-6 text-white"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <p className="text-gray-600 mb-6 line-clamp-3 min-h-[4.5rem]">
                                            {program.description || `Programa de ${program.program_types.name} en ${program.name}. Desarrolla competencias avanzadas y lidera proyectos de investigación e innovación en tu área de especialización.`}
                                        </p>

                                        {/* Características */}
                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center text-sm text-gray-600">
                                                <svg
                                                    className="w-5 h-5 text-green-600 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                Grado académico reconocido
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <svg
                                                    className="w-5 h-5 text-green-600 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                Docentes especializados
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <svg
                                                    className="w-5 h-5 text-green-600 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                Modalidad flexible
                                            </div>
                                        </div>

                                        {/* Botón */}
                                        <Link href={`/admission/${program.uuid}`}>
                                            <Button className="w-full bg-red-800 hover:bg-red-900 text-white group-hover:shadow-md transition-all">
                                                <span>Postular Ahora</span>
                                                <svg
                                                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                    />
                                                </svg>
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Información adicional */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200 p-8 mt-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                ¿Necesitas más información?
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Contáctanos y resolveremos todas tus dudas sobre el proceso de admisión
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Proceso simple
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Completa tu postulación en línea de forma rápida y segura
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Soporte continuo
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Te acompañamos en cada etapa del proceso de admisión
                            </p>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mt-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        ¿Listo para dar el siguiente paso?
                    </h2>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                        Únete a la comunidad de profesionales e investigadores que están transformando
                        la industria desde la Universidad Nacional de Ingeniería.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a href="mailto:admision@fiis.uni.edu.pe">
                            <Button variant="outline" className="border-red-800 text-red-800 hover:bg-red-50">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Contáctanos
                            </Button>
                        </a>
                        <a href="tel:+5114813030">
                            <Button variant="outline" className="border-red-800 text-red-800 hover:bg-red-50">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                (01) 481-3030
                            </Button>
                        </a>
                    </div>
                </div>
            </main>
        </div>
    )
}

