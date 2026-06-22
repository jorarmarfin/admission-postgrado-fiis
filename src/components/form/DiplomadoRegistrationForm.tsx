"use client"

import { useForm } from "react-hook-form"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Loader2, CheckCircle, AlertCircle, Mail, DollarSign } from "lucide-react"
import { IDiplomadoProgram, IDiplomadoRegistrationRequest, AcademicDegree } from "@/interfaces"
import { useDiplomadoRegistrationForm } from "@/hooks/useDiplomadoRegistrationForm"

interface Props {
    program: IDiplomadoProgram
    academic_period_id: number
}

const ACADEMIC_DEGREES: { value: AcademicDegree; label: string }[] = [
    { value: "bachelor", label: "Bachiller" },
    { value: "graduate", label: "Titulado / Licenciado" },
    { value: "master", label: "Magíster" },
    { value: "doctor", label: "Doctor" },
    { value: "egresado", label: "Egresado (requiere constancia)" },
]

const formSchema = z.object({
    apellidos: z.string().min(2, "Los apellidos deben tener al menos 2 caracteres"),
    nombres: z.string().min(2, "Los nombres deben tener al menos 2 caracteres"),
    dni: z.string()
        .min(8, "El DNI debe tener al menos 8 dígitos")
        .max(12, "El documento no puede tener más de 12 caracteres")
        .regex(/^\d+$/, "Solo se permiten números"),
    birthdate: z.string().min(1, "La fecha de nacimiento es obligatoria").refine((date) => {
        const age = new Date().getFullYear() - new Date(date).getFullYear()
        return age >= 18 && age <= 100
    }, "Debe ser mayor de 18 años"),
    email: z.string().email("Ingrese un email válido"),
    phone: z.string()
        .transform((v) => v.replace(/\s/g, ''))
        .refine((v) => v.length === 9, "El celular debe tener 9 dígitos")
        .refine((v) => v.startsWith('9'), "El celular debe comenzar con 9"),
    address: z.string().min(5, "La dirección es obligatoria"),
    city: z.string().min(2, "La ciudad es obligatoria"),
    university: z.string().min(3, "La universidad de procedencia es obligatoria"),
    academic_degree: z.enum(["bachelor", "graduate", "master", "doctor", "egresado"]),
    career: z.string().min(3, "La carrera profesional es obligatoria"),
    voucher_type: z.enum(["boleta", "factura"]),
    ruc: z.string().optional(),
    razon_social: z.string().optional(),
    fiscal_address: z.string().optional(),
    invoice_email: z.string().optional(),
}).refine((data) => {
    if (data.voucher_type === "factura") {
        return data.ruc && /^\d{11}$/.test(data.ruc)
    }
    return true
}, { message: "El RUC es obligatorio y debe tener 11 dígitos", path: ["ruc"] })
    .refine((data) => {
        if (data.voucher_type === "factura") return !!data.razon_social && data.razon_social.length > 0
        return true
    }, { message: "La razón social es obligatoria", path: ["razon_social"] })
    .refine((data) => {
        if (data.voucher_type === "factura") return !!data.fiscal_address && data.fiscal_address.length > 0
        return true
    }, { message: "La dirección fiscal es obligatoria", path: ["fiscal_address"] })
    .refine((data) => {
        if (data.voucher_type === "factura") {
            if (!data.invoice_email) return true
            return z.string().email().safeParse(data.invoice_email).success
        }
        return true
    }, { message: "El email de facturación no es válido", path: ["invoice_email"] })

type FormData = z.infer<typeof formSchema>

const formatPhone = (value: string) => {
    const n = value.replace(/\D/g, '').slice(0, 9)
    return n.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3').trim()
}

export const DiplomadoRegistrationForm = ({ program, academic_period_id }: Props) => {
    const { isLoading, error, success, registrationData, validationErrors, submitRegistration, resetState } =
        useDiplomadoRegistrationForm()

    const [academicDocument, setAcademicDocument] = useState<File | null>(null)
    const [fileError, setFileError] = useState<string | null>(null)

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            apellidos: "", nombres: "", dni: "", birthdate: "", email: "",
            phone: "", address: "", city: "", university: "", career: "",
            academic_degree: undefined, voucher_type: "boleta",
            ruc: "", razon_social: "", fiscal_address: "", invoice_email: "",
        },
    })

    const watchVoucherType = form.watch("voucher_type")

    const onSubmit = async (data: FormData) => {
        if (!academicDocument) {
            setFileError("El documento académico (bachiller/título/constancia) es obligatorio")
            return
        }
        if (academicDocument.type !== 'application/pdf') {
            setFileError("Solo se aceptan archivos PDF")
            return
        }
        if (academicDocument.size > 5 * 1024 * 1024) {
            setFileError("El documento no puede superar los 5 MB")
            return
        }
        setFileError(null)

        const payload: IDiplomadoRegistrationRequest = {
            program_id: program.id,
            academic_period_id,
            full_name: `${data.apellidos} ${data.nombres}`,
            dni: data.dni,
            birthdate: data.birthdate,
            phone: data.phone.replace(/\s/g, ''),
            email: data.email,
            address: data.address,
            city: data.city,
            university: data.university,
            academic_degree: data.academic_degree,
            career: data.career,
            academic_document: academicDocument,
            voucher_type: data.voucher_type,
            razon_social: data.voucher_type === "factura" ? data.razon_social || null : null,
            ruc: data.voucher_type === "factura" ? data.ruc || null : null,
            fiscal_address: data.voucher_type === "factura" ? data.fiscal_address || null : null,
            invoice_email: data.voucher_type === "factura" ? data.invoice_email || null : null,
        }

        const ok = await submitRegistration(payload)
        if (ok) { form.reset(); setAcademicDocument(null) }
    }

    const handleReset = () => { form.reset(); resetState(); setAcademicDocument(null); setFileError(null) }

    const stepDot = (n: number) => (
        <div className="w-6 h-6 bg-blue-700 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
            <span className="text-white text-xs font-bold">{n}</span>
        </div>
    )

    const fieldError = (msg?: string) =>
        msg ? <p className="mt-1 text-sm text-red-600">{msg}</p> : null

    return (
        <div className="bg-white rounded-b-lg shadow-sm border-x border-b border-gray-200 p-8">
            {/* Dialog éxito */}
            <AlertDialog open={success} onOpenChange={handleReset}>
                <AlertDialogContent className="max-w-md">
                    <AlertDialogHeader>
                        <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 bg-blue-100 rounded-full">
                            <CheckCircle className="w-7 h-7 text-blue-700" />
                        </div>
                        <AlertDialogTitle className="text-center text-lg font-semibold text-gray-900">
                            ¡Inscripción Registrada!
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-center text-gray-600 space-y-2">
                            <span className="block">
                                Tu solicitud fue recibida. Recibirás en tu correo la orden de pago
                                con los datos bancarios para completar tu inscripción.
                            </span>
                            {registrationData && (
                                <span className="block mt-3 p-3 bg-blue-50 rounded-lg text-sm text-blue-800 font-medium">
                                    Pago inicial: S/ {registrationData.investment.initial_payment.toFixed(2)}
                                    &nbsp;·&nbsp; Total: S/ {registrationData.investment.total.toFixed(2)}
                                </span>
                            )}
                            <span className="block text-xs text-gray-500 mt-2 flex items-center justify-center gap-1">
                                <Mail className="w-3 h-3" /> Guarda el token recibido por correo para consultar tu estado.
                            </span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction
                            className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                            onClick={handleReset}
                        >
                            Entendido
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Errores */}
            {error && (
                <Alert className="mb-6 border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
            )}

            {validationErrors && (
                <Alert className="mb-6 border-orange-200 bg-orange-50">
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                    <AlertDescription className="text-orange-700">
                        <div className="font-medium mb-2">Errores de validación:</div>
                        <ul className="list-disc list-inside space-y-1">
                            {Object.entries(validationErrors).flatMap(([field, errors]) =>
                                errors.map((msg, i) => (
                                    <li key={`${field}-${i}`} className="text-sm">{msg}</li>
                                ))
                            )}
                        </ul>
                    </AlertDescription>
                </Alert>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Sección 1: Datos Personales */}
                <div className="border-b border-gray-200 pb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                        {stepDot(1)} Datos Personales
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="apellidos">Apellidos *</Label>
                            <Input
                                id="apellidos"
                                {...form.register("apellidos")}
                                placeholder="Apellidos completos"
                                className={form.formState.errors.apellidos ? 'border-red-500' : ''}
                            />
                            {fieldError(form.formState.errors.apellidos?.message)}
                        </div>
                        <div>
                            <Label htmlFor="nombres">Nombres *</Label>
                            <Input
                                id="nombres"
                                {...form.register("nombres")}
                                placeholder="Nombres completos"
                                className={form.formState.errors.nombres ? 'border-red-500' : ''}
                            />
                            {fieldError(form.formState.errors.nombres?.message)}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                        <div>
                            <Label htmlFor="dni">DNI / Documento *</Label>
                            <Input
                                id="dni"
                                {...form.register("dni", {
                                    onChange: (e) => {
                                        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 12)
                                    }
                                })}
                                placeholder="12345678"
                                className={form.formState.errors.dni ? 'border-red-500' : ''}
                            />
                            {fieldError(form.formState.errors.dni?.message)}
                        </div>
                        <div>
                            <Label htmlFor="birthdate">Fecha de Nacimiento *</Label>
                            <Input
                                id="birthdate"
                                type="date"
                                {...form.register("birthdate")}
                                className={form.formState.errors.birthdate ? 'border-red-500' : ''}
                            />
                            {fieldError(form.formState.errors.birthdate?.message)}
                        </div>
                        <div>
                            <Label htmlFor="phone">Celular *</Label>
                            <Input
                                id="phone"
                                type="tel"
                                {...form.register("phone", {
                                    onChange: (e) => { e.target.value = formatPhone(e.target.value) }
                                })}
                                placeholder="999 999 999"
                                className={form.formState.errors.phone ? 'border-red-500' : ''}
                            />
                            {fieldError(form.formState.errors.phone?.message)}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div>
                            <Label htmlFor="email">Correo Electrónico *</Label>
                            <Input
                                id="email"
                                type="email"
                                {...form.register("email")}
                                placeholder="correo@ejemplo.com"
                                className={form.formState.errors.email ? 'border-red-500' : ''}
                            />
                            {fieldError(form.formState.errors.email?.message)}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="city">Ciudad *</Label>
                                <Input
                                    id="city"
                                    {...form.register("city")}
                                    placeholder="Lima"
                                    className={form.formState.errors.city ? 'border-red-500' : ''}
                                />
                                {fieldError(form.formState.errors.city?.message)}
                            </div>
                            <div>
                                {/* placeholder de grid */}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Label htmlFor="address">Dirección *</Label>
                        <Input
                            id="address"
                            {...form.register("address")}
                            placeholder="Av. Universitaria 1234"
                            className={form.formState.errors.address ? 'border-red-500' : ''}
                        />
                        {fieldError(form.formState.errors.address?.message)}
                    </div>
                </div>

                {/* Sección 2: Formación Académica */}
                <div className="border-b border-gray-200 pb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                        {stepDot(2)} Formación Académica
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <Label htmlFor="university">Universidad de procedencia *</Label>
                            <Input
                                id="university"
                                {...form.register("university")}
                                placeholder="Universidad Nacional de Ingeniería"
                                className={form.formState.errors.university ? 'border-red-500' : ''}
                            />
                            {fieldError(form.formState.errors.university?.message)}
                        </div>
                        <div>
                            <Label>Grado académico *</Label>
                            <Select
                                onValueChange={(v) => form.setValue("academic_degree", v as AcademicDegree)}
                                value={form.watch("academic_degree")}
                            >
                                <SelectTrigger className={form.formState.errors.academic_degree ? 'border-red-500' : ''}>
                                    <SelectValue placeholder="Seleccione grado" />
                                </SelectTrigger>
                                <SelectContent>
                                    {ACADEMIC_DEGREES.map((d) => (
                                        <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {fieldError(form.formState.errors.academic_degree?.message)}
                        </div>
                    </div>

                    <div className="mt-6">
                        <Label htmlFor="career">Carrera profesional *</Label>
                        <Input
                            id="career"
                            {...form.register("career")}
                            placeholder="Ingeniería de Sistemas"
                            className={form.formState.errors.career ? 'border-red-500' : ''}
                        />
                        {fieldError(form.formState.errors.career?.message)}
                    </div>

                    <div className="mt-6">
                        <Label htmlFor="academic_document">
                            Documento académico (bachiller / título / constancia) *
                        </Label>
                        <div className={`mt-1 flex items-center gap-3 rounded-md border px-3 py-2 ${fileError ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}>
                            <input
                                id="academic_document"
                                type="file"
                                accept=".pdf,application/pdf"
                                className="flex-1 text-sm text-gray-700 file:mr-3 file:rounded file:border-0 file:bg-blue-50 file:px-3 file:py-1 file:text-xs file:font-medium file:text-blue-700 hover:file:bg-blue-100"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] ?? null
                                    setAcademicDocument(file)
                                    setFileError(null)
                                }}
                            />
                            {academicDocument && (
                                <span className="text-xs text-gray-500 whitespace-nowrap">
                                    {(academicDocument.size / 1024 / 1024).toFixed(2)} MB
                                </span>
                            )}
                        </div>
                        <p className="mt-1 text-xs text-gray-500">Solo PDF · máx. 5 MB</p>
                        {fileError && <p className="mt-1 text-sm text-red-600">{fileError}</p>}
                    </div>

                    {form.watch("academic_degree") === "egresado" && (
                        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex gap-3">
                            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-yellow-800">
                                Como egresado debes subir la <strong>constancia de egresado</strong> emitida
                                por tu universidad como documento académico.
                            </p>
                        </div>
                    )}
                </div>

                {/* Sección 3: Comprobante de pago */}
                <div className="pb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                        {stepDot(3)} Tipo de Comprobante
                    </h3>

                    <div className="mb-6">
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">
                            ¿Qué comprobante deseas recibir? *
                        </Label>
                        <RadioGroup
                            value={form.watch("voucher_type")}
                            onValueChange={(v) => form.setValue("voucher_type", v as "boleta" | "factura")}
                            className="flex gap-6 mt-2"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="boleta" id="boleta" />
                                <Label htmlFor="boleta">Boleta de venta</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="factura" id="factura" />
                                <Label htmlFor="factura">Factura (empresa / RUC)</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {watchVoucherType === "factura" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="ruc">RUC *</Label>
                                <Input
                                    id="ruc"
                                    {...form.register("ruc", {
                                        onChange: (e) => {
                                            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 11)
                                        }
                                    })}
                                    placeholder="20123456789"
                                    maxLength={11}
                                    className={form.formState.errors.ruc ? 'border-red-500' : ''}
                                />
                                {fieldError(form.formState.errors.ruc?.message)}
                            </div>
                            <div>
                                <Label htmlFor="razon_social">Razón Social *</Label>
                                <Input
                                    id="razon_social"
                                    {...form.register("razon_social")}
                                    placeholder="Empresa SAC"
                                    className={form.formState.errors.razon_social ? 'border-red-500' : ''}
                                />
                                {fieldError(form.formState.errors.razon_social?.message)}
                            </div>
                            <div>
                                <Label htmlFor="fiscal_address">Dirección fiscal *</Label>
                                <Input
                                    id="fiscal_address"
                                    {...form.register("fiscal_address")}
                                    placeholder="Av. Industrial 456, Lima"
                                    className={form.formState.errors.fiscal_address ? 'border-red-500' : ''}
                                />
                                {fieldError(form.formState.errors.fiscal_address?.message)}
                            </div>
                            <div>
                                <Label htmlFor="invoice_email">Email para envío de factura</Label>
                                <Input
                                    id="invoice_email"
                                    type="email"
                                    {...form.register("invoice_email")}
                                    placeholder="facturacion@empresa.com"
                                    className={form.formState.errors.invoice_email ? 'border-red-500' : ''}
                                />
                                {fieldError(form.formState.errors.invoice_email?.message)}
                            </div>
                        </div>
                    )}
                </div>

                {/* Inversión */}
                <div className="pb-8 border-b border-gray-200">
                    <div className="p-5 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-4">
                        <DollarSign className="h-6 w-6 text-blue-700 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-semibold text-blue-900 mb-1">Inversión del programa</p>
                            <p className="text-sm text-blue-800">
                                Pago inicial: <strong>S/ {program.initial_payment.toFixed(2)}</strong>
                                &nbsp;·&nbsp; Inversión total: <strong>S/ {program.investment_total.toFixed(2)}</strong>
                            </p>
                            <p className="text-xs text-blue-700 mt-2">
                                Al confirmar recibirás por correo la orden de pago con los datos bancarios BCP.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Botones */}
                <div className="flex justify-center space-x-4 pt-6">
                    <Button
                        type="button"
                        variant="outline"
                        className="px-8"
                        onClick={handleReset}
                        disabled={isLoading}
                    >
                        Limpiar
                    </Button>
                    <Button
                        type="submit"
                        className="px-8 bg-blue-700 hover:bg-blue-800 text-white"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...</>
                        ) : (
                            'Registrar Inscripción'
                        )}
                    </Button>
                </div>
            </form>
        </div>
    )
}
