"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface HorarioDisponible {
    id: string
    fecha: string
    fechaCompleta: Date
    hora: string
    disponible: boolean
    entrevistador: string
}

export const InterviewForm = () => {
    // Generar fechas y horarios disponibles para las próximas 2 semanas
    const generarHorariosDisponibles = (): HorarioDisponible[] => {
        const horarios: HorarioDisponible[] = []
        const hoy = new Date()
        const entrevistadores = [
            "Dr. García Mendoza",
            "Mg. López Rivera",
            "Dr. Santamaría Cruz",
            "Mg. Rodríguez Vega"
        ]

        // Horarios disponibles por día
        const horasDisponibles = [
            "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
            "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
        ]

        // Generar horarios para 14 días (2 semanas)
        for (let dia = 1; dia <= 14; dia++) {
            const fecha = new Date(hoy)
            fecha.setDate(hoy.getDate() + dia)

            // Solo días laborables (lunes a viernes)
            if (fecha.getDay() >= 1 && fecha.getDay() <= 5) {
                horasDisponibles.forEach((hora, index) => {
                    // Simular disponibilidad aleatoria (70% de probabilidad de estar disponible)
                    const disponible = Math.random() > 0.3

                    horarios.push({
                        id: `${fecha.toISOString().split('T')[0]}-${hora}`,
                        fecha: fecha.toLocaleDateString('es-ES', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }),
                        fechaCompleta: fecha,
                        hora: hora,
                        disponible: disponible,
                        entrevistador: entrevistadores[Math.floor(Math.random() * entrevistadores.length)]
                    })
                })
            }
        }

        return horarios
    }

    const [horariosDisponibles] = useState<HorarioDisponible[]>(generarHorariosDisponibles())
    const [horarioSeleccionado, setHorarioSeleccionado] = useState<HorarioDisponible | null>(null)
    const [confirmando, setConfirmando] = useState(false)

    const agruparPorFecha = () => {
        const grupos: { [fecha: string]: HorarioDisponible[] } = {}

        horariosDisponibles.forEach(horario => {
            const fechaKey = horario.fechaCompleta.toDateString()
            if (!grupos[fechaKey]) {
                grupos[fechaKey] = []
            }
            grupos[fechaKey].push(horario)
        })

        return grupos
    }

    const confirmarEntrevista = async () => {
        if (!horarioSeleccionado) return

        setConfirmando(true)

        // Simular confirmación de entrevista
        setTimeout(() => {
            setConfirmando(false)
            alert(`¡Entrevista confirmada para el ${horarioSeleccionado.fecha} a las ${horarioSeleccionado.hora} con ${horarioSeleccionado.entrevistador}!`)
        }, 2000)
    }

    const gruposFechas = agruparPorFecha()
    const fechasOrdenadas = Object.keys(gruposFechas).sort()

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
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
                                    Agendar Entrevista
                                </h1>
                                <p className="text-lg text-gray-600">
                                    Proceso de Admisión Postgrado 2026-1
                                </p>
                                <p className="text-sm text-gray-500">
                                    Universidad Nacional de Ingeniería - FIIS
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

                    {/* Información importante */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <div className="flex items-start space-x-3">
                            <svg className="w-6 h-6 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div className="flex-1">
                                <h3 className="font-semibold text-blue-900 mb-2">Información sobre la Entrevista</h3>
                                <ul className="text-sm text-blue-800 space-y-1">
                                    <li>• Duración aproximada: 30 minutos</li>
                                    <li>• Modalidad: Presencial en las instalaciones de FIIS</li>
                                    <li>• Horarios disponibles: Lunes a Viernes, 9:00 AM - 5:00 PM</li>
                                    <li>• Una vez confirmada, recibirás un email con los detalles</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Selección de horario */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                        Selecciona tu horario preferido
                    </h2>

                    <div className="space-y-8">
                        {fechasOrdenadas.map(fechaKey => {
                            const horariosDia = gruposFechas[fechaKey]
                            const fecha = horariosDia[0]

                            return (
                                <div key={fechaKey} className="border-b border-gray-100 pb-6 last:border-b-0">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 capitalize">
                                        {fecha.fecha}
                                    </h3>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                        {horariosDia.map(horario => (
                                            <button
                                                key={horario.id}
                                                onClick={() => horario.disponible && setHorarioSeleccionado(horario)}
                                                disabled={!horario.disponible}
                                                className={`
                                                    p-3 rounded-lg border text-sm font-medium transition-all duration-200 
                                                    ${horario.disponible 
                                                        ? horarioSeleccionado?.id === horario.id
                                                            ? 'bg-red-800 text-white border-red-800 shadow-md'
                                                            : 'bg-white text-gray-700 border-gray-300 hover:border-red-300 hover:bg-red-50'
                                                        : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                                    }
                                                `}
                                            >
                                                <div className="font-semibold">
                                                    {horario.hora}
                                                </div>
                                                {horario.disponible ? (
                                                    <div className="text-xs mt-1 opacity-75">
                                                        Disponible
                                                    </div>
                                                ) : (
                                                    <div className="text-xs mt-1">
                                                        Ocupado
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

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
                                    <p className="text-green-800">{horarioSeleccionado.entrevistador}</p>
                                </div>
                                <div>
                                    <span className="font-medium text-green-900">Ubicación:</span>
                                    <p className="text-green-800">FIIS - Oficina de Postgrado</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Botones de acción */}
                    <div className="flex justify-center space-x-4 mt-8 pt-6 border-t border-gray-200">
                        <Button
                            variant="outline"
                            onClick={() => setHorarioSeleccionado(null)}
                            disabled={!horarioSeleccionado}
                            className="border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                            Limpiar Selección
                        </Button>
                        <Button
                            onClick={confirmarEntrevista}
                            disabled={!horarioSeleccionado || confirmando}
                            className="bg-green-600 hover:bg-green-700 text-white px-8"
                        >
                            {confirmando ? (
                                <div className="flex items-center space-x-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    <span>Confirmando...</span>
                                </div>
                            ) : (
                                <>
                                    Confirmar Entrevista
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Instrucciones adicionales */}
                <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <div className="flex items-start space-x-3">
                        <svg className="w-6 h-6 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <div className="flex-1">
                            <h3 className="font-semibold text-yellow-900 mb-2">Instrucciones Importantes</h3>
                            <ul className="text-sm text-yellow-800 space-y-1">
                                <li>• Llega 15 minutos antes de tu cita programada</li>
                                <li>• Trae tu DNI original y copia de todos los documentos enviados</li>
                                <li>• La entrevista será evaluada por el comité académico</li>
                                <li>• Si necesitas reprogramar, contacta con 48 horas de anticipación</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Footer informativo */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>¿Tienes preguntas sobre la entrevista? Contacta a: <a href="mailto:admision@fiis.uni.edu.pe" className="text-red-800 hover:text-red-900">admision@fiis.uni.edu.pe</a></p>
                </div>
            </div>
        </div>
    )
}