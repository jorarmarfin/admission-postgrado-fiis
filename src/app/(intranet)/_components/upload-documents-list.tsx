"use client"

import { useState } from "react"

const DOCUMENT_LISTS = {
    posgrado: {
        label: "Maestría / Doctorado",
        items: [
            "Ficha del Postulante (formato adjunto).",
            "Solicitud dirigida al Director de la Escuela Central de Posgrado – UNI (formato adjunto).",
            "Declaración Jurada (formato adjunto).",
            "Currículum Vitae.",
            "Copia del grado de Bachiller.",
            "Copia legible del DNI por ambos lados.",
            "Problemática de investigación (formato adjunto).",
        ],
    },
    diplomado: {
        label: "Diplomado",
        items: [
            "Ficha de matrícula debidamente completada (adjunta en este correo).",
            "Copia simple de su grado de Bachiller o Título Profesional.",
            "Copia de su Documento Nacional de Identidad (DNI).",
            "Currículum Vitae no documentado.",
        ],
    },
} as const

type DocumentType = keyof typeof DOCUMENT_LISTS

export function UploadDocumentsList() {
    const [selected, setSelected] = useState<DocumentType>("posgrado")

    return (
        <>
            <div className="mb-4">
                <label htmlFor="document-type" className="sr-only">
                    Tipo de programa
                </label>
                <select
                    id="document-type"
                    value={selected}
                    onChange={(e) => setSelected(e.target.value as DocumentType)}
                    className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {Object.entries(DOCUMENT_LISTS).map(([key, { label }]) => (
                        <option key={key} value={key}>
                            {label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="space-y-2 mb-6 text-left">
                {DOCUMENT_LISTS[selected].items.map((item) => (
                    <div key={item} className="flex items-center justify-between text-sm">
                        <span>• {item}</span>
                    </div>
                ))}
            </div>
        </>
    )
}
