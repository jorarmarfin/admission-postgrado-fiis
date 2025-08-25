"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {IProgram, IUniversity} from "@/interfaces";

interface Props {
    period?: string
    program?: IProgram,
    universities?: IUniversity[]
}

export const RegistrationForm = ({period,program,universities}:Props) => {
    const [formData, setFormData] = useState({
        dni: "",
        apellidos: "",
        nombres: "",
        fechaNacimiento: "",
        email: "",
        celular: "",
        banco: "",
        condicion: "",
        universidad: "",
        carreraProfesional: "",
        requiereFactura: "no",
        ruc: "",
        razonSocial: "",
        direccionRuc: ""
    })

    const bancos = [
        { value: "bcp", label: "BCP - Banco de Crédito del Perú" },
        { value: "scotiabank", label: "Scotiabank Perú" },
        { value: "niubiz", label: "Niubiz" }
    ]

    const condiciones = [
        { value: "privado", label: "Privado" },
        { value: "estatal", label: "Estatal" }
    ]

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
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
                                        Periodo de admisión: {period || "2024-I"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Formulario */}
                <div className="bg-white rounded-b-lg shadow-sm border-x border-b border-gray-200 p-8">
                    <form className="space-y-8">
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
                                        {bancos.map((banco) => (
                                            <option key={banco.value} value={banco.value}>
                                                {banco.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div>
                                    <label htmlFor="condicion" className="block text-sm font-medium text-gray-700 mb-2">
                                        Condición *
                                    </label>
                                    <select
                                        id="condicion"
                                        name="condicion"
                                        value={formData.condicion}
                                        onChange={handleInputChange}
                                        className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                                    >
                                        <option value="">Seleccione una condición</option>
                                        {condiciones.map((condicion) => (
                                            <option key={condicion.value} value={condicion.value}>
                                                {condicion.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
                                
                                <div>
                                    <label htmlFor="carreraProfesional" className="block text-sm font-medium text-gray-700 mb-2">
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
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                className="px-8 py-2 bg-red-800 hover:bg-red-900 text-white"
                            >
                                Enviar Inscripción
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="text-center mt-6 text-sm text-gray-500">
                    <p>© 2024 Universidad Nacional de Ingeniería - Facultad de Ingeniería Industrial y de Sistemas</p>
                    <p>Todos los campos marcados con (*) son obligatorios</p>
                </div>
            </div>
        </div>
    )
}