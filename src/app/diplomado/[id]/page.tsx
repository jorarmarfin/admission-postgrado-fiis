import { DiplomadoRegistrationForm } from "@/components/form/DiplomadoRegistrationForm"
import { diplomadoService, academicPeriodService } from "@/services"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: "Inscripción Diplomado - FIIS UNI",
    description: "Formulario de inscripción para diplomados de la Facultad de Ingeniería Industrial y de Sistemas",
}

type PageProps = { params: Promise<{ id: string }> }

export default async function DiplomadoRegisterPage({ params }: PageProps) {
    const { id } = await params
    const programId = parseInt(id, 10)

    if (isNaN(programId)) notFound()

    const [programs, activePeriod] = await Promise.all([
        diplomadoService.getPrograms(),
        academicPeriodService.getActivePeriod(),
    ])

    const program = programs.find((p) => p.id === programId)
    if (!program) notFound()

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-t-lg shadow-sm border border-gray-200 p-8">
                    <div className="flex items-start justify-between mb-2">
                        <Link
                            href="/diplomado"
                            className="text-sm text-blue-700 hover:text-blue-900 flex items-center gap-1 mb-4"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Volver a diplomados
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 bg-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                            <div className="w-16 h-16 border-4 border-white rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-sm">UNI</span>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-blue-700 mb-1">
                                Formulario de Inscripción
                            </h1>
                            <h2 className="text-base text-gray-600 mb-0.5">
                                Universidad Nacional de Ingeniería
                            </h2>
                            <p className="text-sm text-gray-500">
                                Facultad de Ingeniería Industrial y de Sistemas
                            </p>
                            <div className="mt-2">
                                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-1">
                                    Diplomado
                                </span>
                                <p className="text-base font-semibold text-gray-800">{program.name}</p>
                                <p className="text-sm text-gray-500 mt-0.5">
                                    Período: {activePeriod.name}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Formulario */}
                <DiplomadoRegistrationForm program={program} academic_period_id={activePeriod.id} />

                {/* Footer */}
                <div className="text-center mt-6 text-sm text-gray-500">
                    <p>© 2024 Universidad Nacional de Ingeniería — Facultad de Ingeniería Industrial y de Sistemas</p>
                    <p>Todos los campos marcados con (*) son obligatorios</p>
                </div>
            </div>
        </div>
    )
}
