"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Search } from "lucide-react"

export default function DiplomadoEstadoPage() {
    const [token, setToken] = useState("")
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const t = token.trim()
        if (t) router.push(`/diplomado/estado/${t}`)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <div className="text-center mb-8">
                        <div className="w-14 h-14 bg-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-7 h-7 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Estado de Inscripción
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Ingresa el token que recibiste en tu correo electrónico al registrarte.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <Label htmlFor="token">Token de inscripción</Label>
                            <Input
                                id="token"
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                                placeholder="AbCdEfGh..."
                                className="mt-1 font-mono"
                                autoFocus
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                            disabled={!token.trim()}
                        >
                            Consultar estado
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link href="/diplomado" className="text-sm text-blue-700 hover:text-blue-900">
                            ← Volver a diplomados
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
