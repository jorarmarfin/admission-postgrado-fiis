"use client"

import {useState} from "react"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Loader2, CheckCircle, AlertCircle} from "lucide-react"
import {IBank, IProgram, IUniversity, IApplicationRequest} from "@/interfaces"
import {useRegistrationForm} from "@/hooks/useRegistrationForm"
import {Alert, AlertDescription} from "@/components/ui/alert";

interface Props {
    universities?: IUniversity[],
    banks?: IBank[],
    program_id?: number,
    academic_period_id?: number,
}

export const RegistrationForm = ({
                                     universities,
                                     banks,
                                     program_id,
                                     academic_period_id
                                 }: Props) => {
    const [formData, setFormData] = useState({
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

    const {isLoading, error, success, validationErrors, submitApplication, resetState} = useRegistrationForm()

    const condiciones = [
        {value: "privado", label: "Privado"},
        {value: "estatal", label: "Estatal"}
    ]

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            requiereFactura: e.target.value
        }))
    }

    const validateForm = () => {
        const requiredFields = ['dni', 'apellidos', 'nombres', 'fechaNacimiento', 'email', 'celular', 'banco', 'universidad', 'carreraProfesional']

        for (const field of requiredFields) {
            if (!formData[field as keyof typeof formData]) {
                return false
            }
        }

        if (formData.requiereFactura === 'si') {
            if (!formData.ruc || !formData.razonSocial || !formData.direccionRuc) {
                return false
            }
        }

        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        // Mapear formData al formato IApplicationRequest
        const applicationData: IApplicationRequest = {
            document_type: 'DNI',
            document_number: formData.dni,
            program_id: program_id || 1, // ID del programa fijo
            academic_period_id: 1, // ID del periodo académico fijo
            last_name: formData.apellidos,
            first_name: formData.nombres,
            birth_date: formData.fechaNacimiento,
            personal_email: formData.email,
            phones: formData.celular,
            payment_order_bank: formData.banco,
            university_id: parseInt(formData.universidad),
            undergraduate_major: formData.carreraProfesional,
            with_invoice: formData.requiereFactura === 'si',
            ruc_number: formData.ruc || undefined,
            business_name: formData.razonSocial || undefined,
            registered_address: formData.direccionRuc || undefined
        }

        await submitApplication(applicationData)
    }

    const handleReset = () => {
        setFormData({
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
        resetState()
    }

    return (
        <div className="bg-white rounded-b-lg shadow-sm border-x border-b border-gray-200 p-8">
            {/* Mensajes de estado */}
            {error && (
                <Alert className="mb-6 border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600"/>
                    <AlertDescription className="text-red-700">
                        {error}
                    </AlertDescription>
                </Alert>
            )}

            {success && (
                <Alert className="mb-6 border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600"/>
                    <AlertDescription className="text-green-700">
                        ¡Inscripción enviada exitosamente! Recibirás un correo de confirmación.
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
                                    <li key={`${field}-${index}`} className="text-sm">{error}</li>
                                ))
                            )}
                        </ul>
                    </AlertDescription>
                </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Datos Personales */}
                <div className="border-b border-gray-200 pb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                        <div className="w-6 h-6 bg-red-800 rounded-full flex items-center justify-center mr-3">
                            <span className="text-white text-sm font-bold">1</span>
                        </div>
                        Datos Personales
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-2">
                                DNI *
                            </label>
                            <Input
                                id="dni"
                                name="dni"
                                type="text"
                                placeholder="Ingrese su DNI"
                                value={formData.dni}
                                onChange={handleInputChange}
                                maxLength={8}
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700 mb-2">
                                Apellidos *
                            </label>
                            <Input
                                id="apellidos"
                                name="apellidos"
                                type="text"
                                placeholder="Apellidos completos"
                                value={formData.apellidos}
                                onChange={handleInputChange}
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label htmlFor="nombres" className="block text-sm font-medium text-gray-700 mb-2">
                                Nombres *
                            </label>
                            <Input
                                id="nombres"
                                name="nombres"
                                type="text"
                                placeholder="Nombres completos"
                                value={formData.nombres}
                                onChange={handleInputChange}
                                className="w-full"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                        <div>
                            <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700 mb-2">
                                Fecha de Nacimiento *
                            </label>
                            <Input
                                id="fechaNacimiento"
                                name="fechaNacimiento"
                                type="date"
                                value={formData.fechaNacimiento}
                                onChange={handleInputChange}
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email *
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="correo@ejemplo.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label htmlFor="celular" className="block text-sm font-medium text-gray-700 mb-2">
                                Celular *
                            </label>
                            <Input
                                id="celular"
                                name="celular"
                                type="tel"
                                placeholder="999 999 999"
                                value={formData.celular}
                                onChange={handleInputChange}
                                className="w-full"
                            />
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
                            <label htmlFor="banco" className="block text-sm font-medium text-gray-700 mb-2">
                                Banco *
                            </label>
                            <select
                                id="banco"
                                name="banco"
                                value={formData.banco}
                                onChange={handleInputChange}
                                className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                            >
                                <option value="">Seleccione un banco</option>
                                {banks?.map((banco) => (
                                    <option key={banco.id} value={banco.id}>
                                        {banco.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="universidad" className="block text-sm font-medium text-gray-700 mb-2">
                                Universidad *
                            </label>
                            <select
                                id="universidad"
                                name="universidad"
                                value={formData.universidad}
                                onChange={handleInputChange}
                                className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                            >
                                <option value="">Seleccione una universidad</option>
                                {universities?.map((universidad) => (
                                    <option key={universidad.id} value={universidad.id}>
                                        {universidad.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div>
                            <label htmlFor="carreraProfesional"
                                   className="block text-sm font-medium text-gray-700 mb-2">
                                Carrera Profesional *
                            </label>
                            <Input
                                id="carreraProfesional"
                                name="carreraProfesional"
                                type="text"
                                placeholder="Ingrese su carrera profesional"
                                value={formData.carreraProfesional}
                                onChange={handleInputChange}
                                className="w-full"
                            />
                        </div>
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
                        <label className="block text-sm font-medium text-gray-700 mb-4">
                            ¿Requiere factura? *
                        </label>
                        <div className="flex space-x-6">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="requiereFactura"
                                    value="si"
                                    checked={formData.requiereFactura === "si"}
                                    onChange={handleRadioChange}
                                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                                />
                                <span className="ml-2 text-sm text-gray-700">Sí</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="requiereFactura"
                                    value="no"
                                    checked={formData.requiereFactura === "no"}
                                    onChange={handleRadioChange}
                                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                                />
                                <span className="ml-2 text-sm text-gray-700">No</span>
                            </label>
                        </div>
                    </div>

                    {formData.requiereFactura === "si" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="ruc" className="block text-sm font-medium text-gray-700 mb-2">
                                    RUC *
                                </label>
                                <Input
                                    id="ruc"
                                    name="ruc"
                                    type="text"
                                    placeholder="Ingrese el RUC"
                                    value={formData.ruc}
                                    onChange={handleInputChange}
                                    maxLength={11}
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="razonSocial" className="block text-sm font-medium text-gray-700 mb-2">
                                    Razón Social *
                                </label>
                                <Input
                                    id="razonSocial"
                                    name="razonSocial"
                                    type="text"
                                    placeholder="Ingrese la razón social"
                                    value={formData.razonSocial}
                                    onChange={handleInputChange}
                                    className="w-full"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="direccionRuc" className="block text-sm font-medium text-gray-700 mb-2">
                                    Dirección asociada al RUC *
                                </label>
                                <Input
                                    id="direccionRuc"
                                    name="direccionRuc"
                                    type="text"
                                    placeholder="Ingrese la dirección fiscal"
                                    value={formData.direccionRuc}
                                    onChange={handleInputChange}
                                    className="w-full"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Botones de acción */}
                <div className="flex justify-center space-x-4 pt-6 border-t border-gray-200">
                    <Button
                        type="button"
                        variant="outline"
                        className="px-8 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                        onClick={handleReset}
                        disabled={isLoading}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        className="px-8 py-2 bg-red-800 hover:bg-red-900 text-white disabled:opacity-50"
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