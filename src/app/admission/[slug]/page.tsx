import {RegistrationForm} from "@/components";
import {Metadata} from "next";
import {academicPeriodService, bankService, programService, universityService} from "@/services";
import {isValidUuid} from "@/lib/utils";
import {notFound} from "next/navigation";

export const metadata: Metadata = {
    title: " Formulario de Registro",
    description: "Formulario de registro para admisión",
}

type pageProps = Promise<{slug: string}>;

export default async function Page(props:{params: pageProps}) {
    const {slug} = await props.params;

    // Validar si el slug es un UUID válido
    if (!isValidUuid(slug)) {
        notFound();
    }

    const activePeriod = await academicPeriodService.getActivePeriod();
    const program = await programService.getProgramByUuid(slug);
    const universities = await universityService.getUniversities();
    const banks = await bankService.getBanks();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header con logo y título */}
                <div className="bg-white rounded-t-lg shadow-sm border border-gray-200 p-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            {/* Espacio reservado para logo */}
                            <div className="w-20 h-20 bg-red-800 rounded-full flex items-center justify-center">
                                <div className="w-16 h-16 border-4 border-white rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">UNI</span>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-red-800 mb-1">
                                    Formulario de Inscripción
                                </h1>
                                <h2 className="text-lg text-gray-600 mb-1">
                                    Universidad Nacional de Ingeniería
                                </h2>
                                <p className="text-sm text-gray-500 mb-1">
                                    Postgrado - Facultad de Ingeniería Industrial y de Sistemas
                                </p>
                                <div className="mt-2">
                                    <span className="block text-base font-semibold text-gray-800">
                                        {program!.program_types.name} - {program!.name || "Programa de Ejemplo"}
                                    </span>
                                    <span className="block text-sm text-gray-600 mt-1">
                                        Periodo de admisión: {activePeriod.name || "2024-I"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Formulario */}
                <RegistrationForm
                    universities={universities}
                    banks={banks}
                    program_id={program.id}
                    academic_period_id={activePeriod.id}
                />

                {/* Footer */}
                <div className="text-center mt-6 text-sm text-gray-500">
                    <p>© 2024 Universidad Nacional de Ingeniería - Facultad de Ingeniería Industrial y de Sistemas</p>
                    <p>Todos los campos marcados con (*) son obligatorios</p>
                </div>
            </div>
        </div>
    );
}
