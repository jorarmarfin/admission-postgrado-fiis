import { diplomadoService } from "@/services"
import { DiplomadoRegistrationStatus } from "@/interfaces"
import { Metadata } from "next"
import Link from "next/link"
import { CheckCircle, Clock, AlertCircle, XCircle, FileCheck, Mail, CreditCard, ArrowRight } from "lucide-react"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: "Estado de tu Inscripción - Diplomado FIIS UNI",
}

type PageProps = { params: Promise<{ token: string }> }

const STATUS_CONFIG: Record<
    DiplomadoRegistrationStatus,
    { label: string; color: string; bg: string; border: string; Icon: React.ElementType }
> = {
    pending: {
        label: "Pendiente",
        color: "text-yellow-700",
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        Icon: Clock,
    },
    order_sent: {
        label: "Orden de pago enviada",
        color: "text-blue-700",
        bg: "bg-blue-50",
        border: "border-blue-200",
        Icon: FileCheck,
    },
    payment_submitted: {
        label: "Comprobante enviado",
        color: "text-indigo-700",
        bg: "bg-indigo-50",
        border: "border-indigo-200",
        Icon: FileCheck,
    },
    confirmed: {
        label: "Matrícula confirmada",
        color: "text-green-700",
        bg: "bg-green-50",
        border: "border-green-200",
        Icon: CheckCircle,
    },
    rejected: {
        label: "Rechazado",
        color: "text-red-700",
        bg: "bg-red-50",
        border: "border-red-200",
        Icon: XCircle,
    },
}

export default async function DiplomadoRegistroTokenPage({ params }: PageProps) {
    const { token } = await params

    let registration = null
    let notFound = false

    try {
        registration = await diplomadoService.getRegistrationStatus(token)
    } catch {
        notFound = true
    }

    if (notFound || !registration) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md text-center">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                        <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-7 h-7 text-red-600" />
                        </div>
                        <h1 className="text-xl font-bold text-gray-900 mb-2">Enlace no válido</h1>
                        <p className="text-gray-500 text-sm mb-6">
                            No encontramos una inscripción asociada a este enlace. Verifica que lo hayas
                            copiado correctamente desde tu correo.
                        </p>
                        <a
                            href="mailto:pgfiissecretaria@uni.edu.pe"
                            className="inline-flex items-center gap-1 text-blue-700 hover:text-blue-900 text-sm font-medium"
                        >
                            <Mail className="w-4 h-4" />
                            pgfiissecretaria@uni.edu.pe
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    const cfg = STATUS_CONFIG[registration.status] ?? STATUS_CONFIG.pending
    const { Icon } = cfg

    const formatDate = (d: string | null) =>
        d ? new Date(d).toLocaleString('es-PE', { dateStyle: 'long', timeStyle: 'short' }) : null

    const isOrderSent = registration.status === 'order_sent'
    const isPending = registration.status === 'pending'
    const isConfirmed = registration.status === 'confirmed'

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
            <div className="max-w-xl mx-auto">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xs">UNI</span>
                        </div>
                        <div className="text-left">
                            <p className="text-xs text-gray-500">Facultad de Ingeniería Industrial y de Sistemas</p>
                            <p className="text-sm font-semibold text-gray-800">Diplomados FIIS</p>
                        </div>
                    </div>
                </div>

                {/* Estado */}
                <div className={`rounded-2xl border ${cfg.border} ${cfg.bg} p-6 mb-6 flex items-center gap-4`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${cfg.bg} border ${cfg.border} flex-shrink-0`}>
                        <Icon className={`w-6 h-6 ${cfg.color}`} />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-0.5">Estado de tu inscripción</p>
                        <p className={`text-xl font-bold ${cfg.color}`}>{cfg.label}</p>
                        {registration.next_step && (
                            <p className="text-sm text-gray-600 mt-1">{registration.next_step}</p>
                        )}
                    </div>
                </div>

                {/* Próximos pasos para orden enviada */}
                {(isOrderSent || isPending) && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
                        <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-blue-700" />
                            Próximos pasos
                        </h2>
                        <ol className="space-y-3">
                            {[
                                { step: "1", text: "Revisa tu correo electrónico — te enviamos la orden de pago con los datos bancarios." },
                                { step: "2", text: "Realiza el depósito o transferencia en el BCP al número de cuenta indicado en la orden." },
                                { step: "3", text: "Envía el comprobante de pago a pgfiissecretaria@uni.edu.pe." },
                                { step: "4", text: "Espera la confirmación de matrícula por parte de administración." },
                            ].map(({ step, text }) => (
                                <li key={step} className="flex items-start gap-3">
                                    <span className="w-6 h-6 bg-blue-700 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        {step}
                                    </span>
                                    <p className="text-sm text-gray-600">{text}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                )}

                {/* Confirmado */}
                {isConfirmed && (
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <CheckCircle className="w-5 h-5 text-green-700" />
                            <p className="text-base font-semibold text-green-800">Tu matrícula está confirmada</p>
                        </div>
                        <p className="text-sm text-green-700">
                            Recibirás un correo con tus credenciales de acceso al portal del estudiante para gestionar tus pagos y seguimiento del diplomado.
                        </p>
                    </div>
                )}

                {/* Detalle de inscripción */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
                    <h2 className="text-base font-semibold text-gray-900 mb-4">Detalle de la inscripción</h2>
                    <dl className="divide-y divide-gray-100">
                        {[
                            { label: "Nombre", value: registration.full_name },
                            { label: "Programa", value: registration.program },
                            { label: "Período", value: registration.period },
                            { label: "Correo", value: registration.email },
                            { label: "Fecha de solicitud", value: formatDate(registration.submitted_at) },
                            ...(registration.confirmed_at
                                ? [{ label: "Confirmado el", value: formatDate(registration.confirmed_at) }]
                                : []),
                        ].map(({ label, value }) => (
                            <div key={label} className="py-3 grid grid-cols-5 gap-2">
                                <dt className="col-span-2 text-sm text-gray-500">{label}</dt>
                                <dd className="col-span-3 text-sm text-gray-900 font-medium">{value}</dd>
                            </div>
                        ))}
                        <div className="py-3 grid grid-cols-5 gap-2">
                            <dt className="col-span-2 text-sm text-gray-500">Token</dt>
                            <dd className="col-span-3 text-xs text-gray-400 font-mono break-all">{registration.token}</dd>
                        </div>
                    </dl>
                </div>

                {/* Ayuda */}
                <div className="text-center space-y-3">
                    <a
                        href="mailto:pgfiissecretaria@uni.edu.pe"
                        className="text-sm text-blue-700 hover:text-blue-900 flex items-center justify-center gap-1"
                    >
                        <Mail className="w-4 h-4" />
                        pgfiissecretaria@uni.edu.pe — Consultas
                    </a>
                    <Link href="/diplomado" className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1">
                        <ArrowRight className="w-4 h-4" />
                        Ver todos los diplomados
                    </Link>
                </div>
            </div>
        </div>
    )
}
