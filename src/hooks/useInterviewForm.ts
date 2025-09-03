import { useState } from 'react';
import { interviewAppointmentService } from '@/services';
import { IInterviewAvailability, ICreateInterviewAppointmentRequest } from '@/interfaces';

interface HorarioDisponible {
    id: string
    fecha: string
    fechaCompleta: Date
    hora: string
    disponible: boolean
    profesorNombre: string
    programaNombre: string
    periodoAcademico: string
    capacity: number
    availabilityId: number
    location: string
    meetingLink: string
}

interface UseInterviewFormReturn {
    horariosDisponibles: HorarioDisponible[]
    horarioSeleccionado: HorarioDisponible | null
    showDialog: boolean
    isLoading: boolean
    message: { type: 'success' | 'error', text: string } | null
    gruposFechas: { [fecha: string]: HorarioDisponible[] }
    fechasOrdenadas: string[]
    setHorarioSeleccionado: (horario: HorarioDisponible | null) => void
    setShowDialog: (show: boolean) => void
    handleHorarioClick: (horario: HorarioDisponible) => void
    confirmarEntrevista: () => Promise<void>
    limpiarSeleccion: () => void
}

export const useInterviewForm = (
    interviewerAvailabilities: IInterviewAvailability[],
    token: string
): UseInterviewFormReturn => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [showDialog, setShowDialog] = useState(false);

    // Convertir los datos del API a formato local
    const convertirHorariosAPI = (): HorarioDisponible[] => {
        return interviewerAvailabilities.map((availability) => {
            const fechaCompleta = new Date(availability.interviewer_start_at)
            const fecha = fechaCompleta.toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
            const hora = fechaCompleta.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            })

            return {
                id: `${availability.interviewer_start_at}-${availability.professor_name}`,
                fecha: fecha,
                fechaCompleta: fechaCompleta,
                hora: hora,
                disponible: availability.capacity > 0,
                profesorNombre: availability.professor_name,
                programaNombre: availability.program_name,
                periodoAcademico: availability.academic_period_name,
                capacity: availability.capacity,
                location: availability.location,
                meetingLink: availability.meeting_link,
                availabilityId: availability.id
            }
        })
    }

    const [horariosDisponibles] = useState<HorarioDisponible[]>(convertirHorariosAPI())
    const [horarioSeleccionado, setHorarioSeleccionado] = useState<HorarioDisponible | null>(null)

    // Agrupar horarios por fecha
    const agruparPorFecha = (): { [fecha: string]: HorarioDisponible[] } => {
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

    const gruposFechas = agruparPorFecha()
    const fechasOrdenadas = Object.keys(gruposFechas).sort()

    // Manejar click en horario
    const handleHorarioClick = (horario: HorarioDisponible) => {
        if (horario.disponible) {
            setHorarioSeleccionado(horario)
            setMessage(null) // Limpiar mensajes anteriores
        }
    }

    // Confirmar entrevista
    const confirmarEntrevista = async () => {
        if (!horarioSeleccionado || !token) {
            setMessage({ type: 'error', text: 'No se puede crear la cita. Por favor, inicia sesión nuevamente.' });
            return;
        }

        setIsLoading(true);

        try {
            const appointmentData: ICreateInterviewAppointmentRequest = {
                interviewer_availabilitie_id: horarioSeleccionado.availabilityId
            };

            const result = await interviewAppointmentService.createInterviewAppointment(
                appointmentData,
                token
            );

            if (result.status === 'success') {
                setMessage({ type: 'success', text: result.message });
                setShowDialog(false);
                // Opcional: redirigir o actualizar la página
                // window.location.reload();
            } else {
                setMessage({ type: 'error', text: result.message });
                setShowDialog(false);
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Error inesperado. Por favor, inténtalo de nuevo.'+error });
            setShowDialog(false);
        } finally {
            setIsLoading(false);
        }
    };

    // Limpiar selección
    const limpiarSeleccion = () => {
        setHorarioSeleccionado(null);
        setMessage(null);
    };

    return {
        horariosDisponibles,
        horarioSeleccionado,
        showDialog,
        isLoading,
        message,
        gruposFechas,
        fechasOrdenadas,
        setHorarioSeleccionado,
        setShowDialog,
        handleHorarioClick,
        confirmarEntrevista,
        limpiarSeleccion
    };
};
