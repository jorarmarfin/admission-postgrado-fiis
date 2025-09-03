"use client"

import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Link from "next/link"
import { useInterviewForm } from "@/hooks"
import {IInterviewAvailability} from "@/interfaces";

interface Props{
    interviewAvailabilities: IInterviewAvailability[]
    myScheduledInterview: IInterviewAvailability | null
    token: string
}

export const InterviewForm = ({interviewAvailabilities,token,myScheduledInterview}: Props) => {
    const {
        horarioSeleccionado,
        showDialog,
        isLoading,
        message,
        gruposFechas,
        fechasOrdenadas,
        setShowDialog,
        handleHorarioClick,
        confirmarEntrevista,
        limpiarSeleccion
    } = useInterviewForm(interviewAvailabilities,token)

    return (
        <>
            {/* Mensaje de resultado */}
            {message && (
                <div className={`mb-6 p-4 rounded-lg border ${
                    message.type === 'success'
                        ? 'bg-green-50 border-green-200 text-green-800'
                        : 'bg-red-50 border-red-200 text-red-800'
                }`}>
                    <div className="flex items-center space-x-3">
                        {message.type === 'success' ? (
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )}
                        <span className="font-medium">{message.text}</span>
                    </div>
                </div>
            )}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Selecciona tu horario preferido
                </h2>

                {fechasOrdenadas.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-500 mb-4">
                            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1M8 7V6a2 2 0 012-2h4a2 2 0 012 2v1m0 0h4a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V9a2 2 0 012-2h4m0 0V7" />
                            </svg>
                            <p className="text-lg font-medium text-gray-600">No hay horarios disponibles en este momento</p>
                            <p className="text-sm text-gray-500 mt-2">Por favor, contacta con admisiones para más información</p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {fechasOrdenadas.map(fechaKey => {
                            const horariosDia = gruposFechas[fechaKey]
                            const fecha = horariosDia[0]

                            return (
                                <div key={fechaKey} className="border-b border-gray-100 pb-6 last:border-b-0">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 capitalize">
                                        {fecha.fecha}
                                    </h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {horariosDia.map(horario => (
                                            <button
                                                key={horario.id}
                                                onClick={() => handleHorarioClick(horario)}
                                                disabled={!horario.disponible}
                                                className={`
                                                        p-4 rounded-lg border text-left transition-all duration-200 
                                                        ${horario.disponible
                                                    ? horarioSeleccionado?.id === horario.id
                                                        ? 'bg-red-800 text-white border-red-800 shadow-md'
                                                        : 'bg-white text-gray-700 border-gray-300 hover:border-red-300 hover:bg-red-50'
                                                    : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                                }
                                                    `}
                                            >
                                                <div className="font-semibold text-lg mb-1">
                                                    {horario.hora}
                                                </div>
                                                <div className={`text-sm mb-2 ${horarioSeleccionado?.id === horario.id ? 'text-red-100' : 'text-gray-600'}`}>
                                                    {horario.profesorNombre}
                                                </div>
                                                <div className={`text-xs ${horarioSeleccionado?.id === horario.id ? 'text-red-200' : 'text-gray-500'}`}>
                                                    {horario.programaNombre}
                                                </div>
                                                <div className={`text-xs mt-2 font-medium ${
                                                    horario.disponible
                                                        ? horarioSeleccionado?.id === horario.id
                                                            ? 'text-green-200'
                                                            : 'text-green-600'
                                                        : 'text-red-500'
                                                }`}>
                                                    {horario.disponible ? 'Disponible' : 'Ocupado'}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}

                {/* Horario seleccionado */}
                {horarioSeleccionado && (
                    <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-lg font-semibold text-green-900">
                                Horario Seleccionado
                            </h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="font-medium text-green-900">Fecha:</span>
                                <p className="text-green-800 capitalize">{horarioSeleccionado.fecha}</p>
                            </div>
                            <div>
                                <span className="font-medium text-green-900">Hora:</span>
                                <p className="text-green-800">{horarioSeleccionado.hora}</p>
                            </div>
                            <div>
                                <span className="font-medium text-green-900">Entrevistador:</span>
                                <p className="text-green-800">{horarioSeleccionado.profesorNombre}</p>
                            </div>
                            <div>
                                <span className="font-medium text-green-900">Programa:</span>
                                <p className="text-green-800">{horarioSeleccionado.programaNombre}</p>
                            </div>
                            <div>
                                <span className="font-medium text-green-900">Período:</span>
                                <p className="text-green-800">{horarioSeleccionado.periodoAcademico}</p>
                            </div>
                            <div>
                                <span className="font-medium text-green-900">Ubicación:</span>
                                <p className="text-green-800">{horarioSeleccionado.location}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Botones de acción actualizados */}
                <div className="flex justify-center space-x-4 mt-8 pt-6 border-t border-gray-200">
                    <Button
                        variant="outline"
                        onClick={limpiarSeleccion}
                        disabled={!horarioSeleccionado}
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                        Limpiar Selección
                    </Button>

                    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                        <AlertDialogTrigger asChild>
                            <Button
                                disabled={!horarioSeleccionado || isLoading}
                                className="bg-green-600 hover:bg-green-700 text-white px-8"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Procesando...
                                    </>
                                ) : (
                                    <>
                                        Confirmar Entrevista
                                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </>
                                )}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Confirmar Entrevista</AlertDialogTitle>
                                <AlertDialogDescription asChild>
                                    {horarioSeleccionado && (
                                        <div className="mt-4">
                                            <p className="mb-4">¿Estás seguro de que deseas confirmar esta entrevista?</p>
                                            <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                                                <div><span className="font-medium">Fecha:</span> {horarioSeleccionado.fecha}</div>
                                                <div><span className="font-medium">Hora:</span> {horarioSeleccionado.hora}</div>
                                                <div><span className="font-medium">Entrevistador:</span> {horarioSeleccionado.profesorNombre}</div>
                                                <div><span className="font-medium">Programa:</span> {horarioSeleccionado.programaNombre}</div>
                                            </div>
                                        </div>
                                    )}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={confirmarEntrevista}
                                    disabled={isLoading}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    {isLoading ? 'Confirmando...' : 'Confirmar'}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

        </>
    )
}
