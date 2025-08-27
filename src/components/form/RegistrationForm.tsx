"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import {IBank, IUniversity, IApplicationRequest, IDocumentType} from "@/interfaces"
import { useRegistrationForm } from "@/hooks/useRegistrationForm"

interface Props {
    universities?: IUniversity[]
    banks?: IBank[]
    program_id?: number
    academic_period_id?: number
    document_types?: IDocumentType[]
}

// Esquema de validación con Zod
const formSchema = z.object({
    tipoDocumento: z.string().min(1, "Seleccione un tipo de documento"),
    dni: z.string()
        .min(1, "El número de documento es obligatorio")
        .min(8, "El número de documento debe tener al menos 8 dígitos"),
    apellidos: z.string()
        .min(1, "Los apellidos son obligatorios")
        .min(2, "Los apellidos deben tener al menos 2 caracteres"),
    nombres: z.string()
        .min(1, "Los nombres son obligatorios")
        .min(2, "Los nombres deben tener al menos 2 caracteres"),
    fechaNacimiento: z.string()
        .min(1, "La fecha de nacimiento es obligatoria")
        .refine((date) => {
            const today = new Date()
            const birthDate = new Date(date)
            const age = today.getFullYear() - birthDate.getFullYear()
            return age >= 18 && age <= 100
        }, "Debe ser mayor de 18 años y menor de 100"),
    email: z.string()
        .min(1, "El email es obligatorio")
        .email("Ingrese un email válido"),
    celular: z.string()
        .min(1, "El celular es obligatorio")
        .transform((val) => val.replace(/\s/g, ''))
        .refine((val) => val.length === 9, "El celular debe tener 9 dígitos")
        .refine((val) => val.startsWith('9'), "El celular debe comenzar con 9"),
    banco: z.string().min(1, "Seleccione un banco"),
    universidad: z.string().min(1, "Seleccione una universidad"),
    carreraProfesional: z.string()
        .min(1, "La carrera profesional es obligatoria")
        .min(3, "La carrera debe tener al menos 3 caracteres"),
    requiereFactura: z.enum(["si", "no"]),
    ruc: z.string().optional(),
    razonSocial: z.string().optional(),
    direccionRuc: z.string().optional(),
}).refine((data) => {
    if (data.tipoDocumento === "1") { // Asumiendo que 1 es DNI
        return /^\d{8}$/.test(data.dni)
    }
    return data.dni.length >= 8
}, {
    message: "Formato de documento inválido",
    path: ["dni"]
}).refine((data) => {
    if (data.requiereFactura === "si") {
        return data.ruc && /^\d{11}$/.test(data.ruc)
    }
    return true
}, {
    message: "El RUC es obligatorio y debe tener 11 dígitos",
    path: ["ruc"]
}).refine((data) => {
    if (data.requiereFactura === "si") {
        return data.razonSocial && data.razonSocial.length > 0
    }
    return true
}, {
    message: "La razón social es obligatoria",
    path: ["razonSocial"]
}).refine((data) => {
    if (data.requiereFactura === "si") {
        return data.direccionRuc && data.direccionRuc.length > 0
    }
    return true
}, {
    message: "La dirección fiscal es obligatoria",
    path: ["direccionRuc"]
})

type FormData = z.infer<typeof formSchema>

export const RegistrationForm = ({
    universities,
    banks,
    program_id,
    academic_period_id,
    document_types
}: Props) => {
    const { isLoading, error, success, validationErrors, submitApplication, resetState } = useRegistrationForm()

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tipoDocumento: "",
            dni: "",
            apellidos: "",
            nombres: "",
            fechaNacimiento: "",
            email: "",
            celular: "",
            banco: "",
            universidad: "",
            carreraProfesional: "",
            requiereFactura: "no",
            ruc: "",
            razonSocial: "",
            direccionRuc: ""
        },
    })

    const watchRequiereFactura = form.watch("requiereFactura")

    // Función para formatear el celular
    const formatCelular = (value: string) => {
        const numbers = value.replace(/\D/g, '')
        if (numbers.length <= 9) {
            return numbers.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3').trim()
        }
        return numbers.slice(0, 9).replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')
    }

    const onSubmit = async (data: FormData) => {
        try {
            const applicationData: IApplicationRequest = {
                document_type: data.tipoDocumento,
                document_number: data.dni,
                program_id: program_id || 1,
                academic_period_id: academic_period_id || 1,
                last_name: data.apellidos,
                first_name: data.nombres,
                birth_date: data.fechaNacimiento,
                personal_email: data.email,
                phones: data.celular.replace(/\s/g, ''),
                payment_order_bank: data.banco,
                university_id: parseInt(data.universidad),
                undergraduate_major: data.carreraProfesional,
                with_invoice: data.requiereFactura === 'si',
                ruc_number: data.ruc || undefined,
                business_name: data.razonSocial || undefined,
                registered_address: data.direccionRuc || undefined
            }

            const wasSuccessful = await submitApplication(applicationData)

            // Limpiar el formulario solo si se guardó exitosamente
            if (wasSuccessful) {
                form.reset({
                    tipoDocumento: "",
                    dni: "",
                    apellidos: "",
                    nombres: "",
                    fechaNacimiento: "",
                    email: "",
                    celular: "",
                    banco: "",
                    universidad: "",
                    carreraProfesional: "",
                    requiereFactura: "no",
                    ruc: "",
                    razonSocial: "",
                    direccionRuc: ""
                })
            }
        } catch (error) {
            console.error('Error al enviar formulario:', error)
        }
    }

    const handleReset = () => {
        form.reset()
        resetState()
    }

    const handleCloseSuccessDialog = () => {
        resetState()
    }

    return (
        <div className="bg-white rounded-b-lg shadow-sm border-x border-b border-gray-200 p-8">
            {/* AlertDialog para éxito */}
            <AlertDialog open={success} onOpenChange={handleCloseSuccessDialog}>
                <AlertDialogContent className="max-w-md">
                    <AlertDialogHeader>
                        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <AlertDialogTitle className="text-center text-lg font-semibold text-gray-900">
                            ¡Inscripción Exitosa!
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-center text-gray-600">
                            Tu inscripción ha sido enviada correctamente. Recibirás un correo electrónico de confirmación con los detalles de tu registro.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                            onClick={handleCloseSuccessDialog}
                        >
                            Entendido
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Mensajes de estado - solo errores */}
            {error && (
                <Alert className="mb-6 border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600"/>
                    <AlertDescription className="text-red-700">
                        {error}
                    </AlertDescription>
                </Alert>
            )}

            {validationErrors && (
                <Alert className="mb-6 border-orange-200 bg-orange-50">
                    <AlertCircle className="h-4 w-4 text-orange-600"/>
                    <AlertDescription className="text-orange-700">
                        <div className="font-medium mb-2">Errores de validación:</div>
                        <ul className="list-disc list-inside space-y-1">
                            {Object.entries(validationErrors).map(([field, errors]) =>
                                errors.map((error, index) => (
                                    <li key={`${field}-${index}`} className="text-sm">
                                        {field === 'personal_email' && error.includes('ya ha sido tomado') && (
                                            <span className="text-red-600 font-medium">
                                                ⚠️ El email ingresado ya está registrado para otro postulante
                                            </span>
                                        )}
                                        {field === 'document_number' && error.includes('ya ha sido tomado') && (
                                            <span className="text-red-600 font-medium">
                                                ⚠️ El DNI ingresado ya está registrado para otro postulante
                                            </span>
                                        )}
                                        {!error.includes('ya ha sido tomado') && (
                                            <span>{error}</span>
                                        )}
                                    </li>
                                ))
                            )}
                        </ul>
                        <div className="mt-3 text-sm text-orange-800">
                            💡 <strong>Sugerencia:</strong> Si ya te registraste anteriormente, contacta con administración para verificar tu estado de postulación.
                        </div>
                    </AlertDescription>
                </Alert>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Datos Personales */}
                <div className="border-b border-gray-200 pb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                        <div className="w-6 h-6 bg-red-800 rounded-full flex items-center justify-center mr-3">
                            <span className="text-white text-sm font-bold">1</span>
                        </div>
                        Datos Personales
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                            <Label htmlFor="tipoDocumento">Tipo de Documento *</Label>
                            <Select onValueChange={(value) => form.setValue("tipoDocumento", value)} value={form.watch("tipoDocumento")}>
                                <SelectTrigger className={`w-full ${form.formState.errors.tipoDocumento ? 'border-red-500' : ''}`}>
                                    <SelectValue placeholder="Seleccione tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    {document_types?.map((tipo) => (
                                        <SelectItem key={tipo.id} value={tipo.id.toString()}>
                                            {tipo.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {form.formState.errors.tipoDocumento && (
                                <p className="mt-1 text-sm text-red-600">{form.formState.errors.tipoDocumento.message}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="dni">Número de Documento *</Label>
                            <Input
                                id="dni"
                                {...form.register("dni", {
                                    onChange: (e) => {
                                        const tipoDoc = form.watch("tipoDocumento")
                                        if (tipoDoc === "1") { // DNI
                                            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 8)
                                        } else {
                                            e.target.value = e.target.value.slice(0, 12)
                                        }
                                    }
                                })}
                                type="text"
                                placeholder="Ingrese su documento"
                                className={form.formState.errors.dni ? 'border-red-500' : ''}
                            />
                            {form.formState.errors.dni && (
                                <p className="mt-1 text-sm text-red-600">{form.formState.errors.dni.message}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="apellidos">Apellidos *</Label>
                            <Input
                                id="apellidos"
                                {...form.register("apellidos")}
                                type="text"
                                placeholder="Apellidos completos"
                                className={form.formState.errors.apellidos ? 'border-red-500' : ''}
                            />
                            {form.formState.errors.apellidos && (
                                <p className="mt-1 text-sm text-red-600">{form.formState.errors.apellidos.message}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="nombres">Nombres *</Label>
                            <Input
                                id="nombres"
                                {...form.register("nombres")}
                                type="text"
                                placeholder="Nombres completos"
                                className={form.formState.errors.nombres ? 'border-red-500' : ''}
                            />
                            {form.formState.errors.nombres && (
                                <p className="mt-1 text-sm text-red-600">{form.formState.errors.nombres.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                        <div>
                            <Label htmlFor="fechaNacimiento">Fecha de Nacimiento *</Label>
                            <Input
                                id="fechaNacimiento"
                                {...form.register("fechaNacimiento")}
                                type="date"
                                className={form.formState.errors.fechaNacimiento ? 'border-red-500' : ''}
                            />
                            {form.formState.errors.fechaNacimiento && (
                                <p className="mt-1 text-sm text-red-600">{form.formState.errors.fechaNacimiento.message}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                {...form.register("email")}
                                type="email"
                                placeholder="correo@ejemplo.com"
                                className={form.formState.errors.email ? 'border-red-500' : ''}
                            />
                            {form.formState.errors.email && (
                                <p className="mt-1 text-sm text-red-600">{form.formState.errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="celular">Celular *</Label>
                            <Input
                                id="celular"
                                {...form.register("celular", {
                                    onChange: (e) => {
                                        e.target.value = formatCelular(e.target.value)
                                    }
                                })}
                                type="tel"
                                placeholder="999 999 999"
                                className={form.formState.errors.celular ? 'border-red-500' : ''}
                            />
                            {form.formState.errors.celular && (
                                <p className="mt-1 text-sm text-red-600">{form.formState.errors.celular.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Información Bancaria y Académica */}
                <div className="border-b border-gray-200 pb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                        <div className="w-6 h-6 bg-red-800 rounded-full flex items-center justify-center mr-3">
                            <span className="text-white text-sm font-bold">2</span>
                        </div>
                        Información Bancaria y Académica
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="banco">Banco *</Label>
                            <Select onValueChange={(value) => form.setValue("banco", value)} value={form.watch("banco")}>
                                <SelectTrigger className={`w-full ${form.formState.errors.banco ? 'border-red-500' : ''}`}>
                                    <SelectValue placeholder="Seleccione un banco" />
                                </SelectTrigger>
                                <SelectContent>
                                    {banks?.map((banco) => (
                                        <SelectItem key={banco.id} value={banco.id.toString()}>
                                            {banco.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {form.formState.errors.banco && (
                                <p className="mt-1 text-sm text-red-600">{form.formState.errors.banco.message}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="universidad">Universidad *</Label>
                            <Select onValueChange={(value) => form.setValue("universidad", value)} value={form.watch("universidad")}>
                                <SelectTrigger className={`w-full ${form.formState.errors.universidad ? 'border-red-500' : ''}`}>
                                    <SelectValue placeholder="Seleccione una universidad" />
                                </SelectTrigger>
                                <SelectContent>
                                    {universities?.map((universidad) => (
                                        <SelectItem key={universidad.id} value={universidad.id.toString()}>
                                            {universidad.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {form.formState.errors.universidad && (
                                <p className="mt-1 text-sm text-red-600">{form.formState.errors.universidad.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-6">
                        <Label htmlFor="carreraProfesional">Carrera Profesional *</Label>
                        <Input
                            id="carreraProfesional"
                            {...form.register("carreraProfesional")}
                            type="text"
                            placeholder="Ingrese su carrera profesional"
                            className={form.formState.errors.carreraProfesional ? 'border-red-500' : ''}
                        />
                        {form.formState.errors.carreraProfesional && (
                            <p className="mt-1 text-sm text-red-600">{form.formState.errors.carreraProfesional.message}</p>
                        )}
                    </div>
                </div>

                {/* Datos de Facturación */}
                <div className="pb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                        <div className="w-6 h-6 bg-red-800 rounded-full flex items-center justify-center mr-3">
                            <span className="text-white text-sm font-bold">3</span>
                        </div>
                        Datos de Facturación
                    </h3>

                    <div className="mb-6">
                        <Label className="text-sm font-medium text-gray-700 mb-4">¿Requiere factura? *</Label>
                        <RadioGroup
                            value={form.watch("requiereFactura")}
                            onValueChange={(value) => form.setValue("requiereFactura", value as "si" | "no")}
                            className="flex space-x-6 mt-2"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="si" id="factura-si" />
                                <Label htmlFor="factura-si">Sí</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="factura-no" />
                                <Label htmlFor="factura-no">No</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {watchRequiereFactura === "si" && (
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
                                    type="text"
                                    placeholder="Ingrese el RUC"
                                    maxLength={11}
                                    className={form.formState.errors.ruc ? 'border-red-500' : ''}
                                />
                                {form.formState.errors.ruc && (
                                    <p className="mt-1 text-sm text-red-600">{form.formState.errors.ruc.message}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="razonSocial">Razón Social *</Label>
                                <Input
                                    id="razonSocial"
                                    {...form.register("razonSocial")}
                                    type="text"
                                    placeholder="Ingrese la razón social"
                                    className={form.formState.errors.razonSocial ? 'border-red-500' : ''}
                                />
                                {form.formState.errors.razonSocial && (
                                    <p className="mt-1 text-sm text-red-600">{form.formState.errors.razonSocial.message}</p>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <Label htmlFor="direccionRuc">Dirección asociada al RUC *</Label>
                                <Input
                                    id="direccionRuc"
                                    {...form.register("direccionRuc")}
                                    type="text"
                                    placeholder="Ingrese la dirección fiscal"
                                    className={form.formState.errors.direccionRuc ? 'border-red-500' : ''}
                                />
                                {form.formState.errors.direccionRuc && (
                                    <p className="mt-1 text-sm text-red-600">{form.formState.errors.direccionRuc.message}</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Botones de acción */}
                <div className="flex justify-center space-x-4 pt-6 border-t border-gray-200">
                    <Button
                        type="button"
                        variant="outline"
                        className="px-8 py-2"
                        onClick={handleReset}
                        disabled={isLoading}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        className="px-8 py-2 bg-red-800 hover:bg-red-900"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                Enviando...
                            </>
                        ) : (
                            'Enviar Inscripción'
                        )}
                    </Button>
                </div>
            </form>
        </div>
    )
}
