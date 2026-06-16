import Link from "next/link"
import { Button } from "@/components/ui/button"
import { diplomadoService } from "@/services"
import { Metadata } from "next"
import { IDiplomadoProgram } from "@/interfaces"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: "Diplomados - FIIS UNI",
    description: "Inscríbete en nuestros programas de Diplomado de la Facultad de Ingeniería Industrial y de Sistemas",
}

export default async function DiplomadoPage() {
    let programs: IDiplomadoProgram[] = []
    try {
        programs = await diplomadoService.getPrograms()
    } catch {
        // API unavailable — render empty state
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Hero */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
                            <span className="text-xs font-semibold uppercase tracking-wider text-white">
                                Educación Continua
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Diplomados
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 mb-2">
                            Facultad de Ingeniería Industrial y de Sistemas
                        </p>
                        <p className="text-lg text-blue-200">
                            Universidad Nacional de Ingeniería
                        </p>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Intro */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Actualiza y Certifica tus Competencias
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Nuestros diplomados están diseñados para profesionales que buscan
                            profundizar en áreas estratégicas con una formación práctica e intensiva,
                            avalada por la Universidad Nacional de Ingeniería.
                        </p>
                    </div>
                </div>

                {/* Programas */}
                {programs.length === 0 ? (
                    <div className="text-center py-16 text-gray-500">
                        No hay diplomados disponibles en este momento.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {programs.map((program) => (
                            <div
                                key={program.id}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group"
                            >
                                {/* Card header */}
                                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 group-hover:from-blue-700 group-hover:to-blue-900 transition-all">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 mb-3">
                                                <span className="text-xs font-semibold text-white uppercase tracking-wide">
                                                    Diplomado
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold text-white leading-tight">
                                                {program.name}
                                            </h3>
                                        </div>
                                        <div className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Card body */}
                                <div className="p-6">
                                    {program.description && (
                                        <p className="text-gray-600 text-sm mb-5 line-clamp-3 min-h-[3.75rem]">
                                            {program.description}
                                        </p>
                                    )}

                                    {/* Inversión */}
                                    <div className="bg-blue-50 rounded-lg p-4 mb-5 border border-blue-100">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Pago inicial</span>
                                            <span className="font-semibold text-blue-800">
                                                S/ {program.initial_payment.toFixed(2)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm mt-1">
                                            <span className="text-gray-600">Inversión total</span>
                                            <span className="font-semibold text-blue-800">
                                                S/ {program.investment_total.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="space-y-2 mb-5">
                                        {["Certificado UNI", "Docentes especializados", "Enfoque práctico"].map((feat) => (
                                            <div key={feat} className="flex items-center text-sm text-gray-600">
                                                <svg className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {feat}
                                            </div>
                                        ))}
                                    </div>

                                    <Link href={`/diplomado/${program.id}`}>
                                        <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white group-hover:shadow-md transition-all">
                                            <span>Inscribirme</span>
                                            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Info adicional */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-8 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                                title: "¿Dudas sobre la inscripción?",
                                desc: "Escríbenos y te guiamos en el proceso paso a paso",
                            },
                            {
                                icon: "M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                                title: "Orden de pago por correo",
                                desc: "Al registrarte recibes inmediatamente los datos bancarios en tu email",
                            },
                            {
                                icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
                                title: "Consulta tu estado",
                                desc: "Usa el token recibido por correo para seguir el estado de tu inscripción",
                            },
                        ].map((item) => (
                            <div key={item.title} className="text-center">
                                <div className="w-14 h-14 bg-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                    </svg>
                                </div>
                                <h3 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA / Consultar estado */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mt-8 text-center">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                        ¿Ya te inscribiste? Consulta el estado de tu solicitud
                    </h2>
                    <p className="text-gray-500 text-sm mb-5 max-w-xl mx-auto">
                        Usa el token que recibiste por correo electrónico al registrarte.
                    </p>
                    <Link href="/diplomado/estado">
                        <Button variant="outline" className="border-blue-700 text-blue-700 hover:bg-blue-50">
                            Consultar estado
                        </Button>
                    </Link>
                    <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                        <a href="mailto:pgfiissecretaria@uni.edu.pe">
                            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 text-sm">
                                pgfiissecretaria@uni.edu.pe
                            </Button>
                        </a>
                        <a href="tel:+5114811070">
                            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 text-sm">
                                (01) 481-1070, Anexo 5210
                            </Button>
                        </a>
                    </div>
                </div>
            </main>
        </div>
    )
}
