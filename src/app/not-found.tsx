import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image" // Importa el componente Image

export const metadata = {
    title: "Página no encontrada - UNI FIIS",
    description: "La página que buscas no existe o ha sido movida",
}

export default function NoFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
            <div className="max-w-4xl mx-auto text-center">
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-12">
                    {/* Logo/Imagen placeholder */}
                    <div className="mb-8 flex justify-center">
                        <div className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg overflow-hidden bg-white">
                            <img
                                src="/images/logo-uni.png"
                                alt="Logo UNI"
                                width={96}
                                height={96}
                                className="object-contain w-full h-full"
                            />
                        </div>
                    </div>

                    {/* Espacio reservado para imagen personalizada */}
                    <div className="mb-8">
                        <div className="w-32 mx-auto rounded-lg flex items-center justify-center overflow-hidden">
                            <img
                                src="/images/404.jpg"
                                alt="Imagen de error 404"
                                width={100}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>

                    {/* Error 404 */}
                    <div className="mb-8">
                        <h1 className="text-8xl font-bold text-red-800 mb-2">404</h1>
                        <div className="w-24 h-1 bg-red-800 mx-auto mb-6"></div>

                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Página no encontrada
                        </h2>

                        <p className="text-lg text-gray-600 mb-2 max-w-md mx-auto">
                            Lo sentimos, la página que estás buscando no existe o ha sido movida.
                        </p>

                        <p className="text-sm text-gray-500 mb-8">
                            Universidad Nacional de Ingeniería - Facultad de Ingeniería Industrial y de Sistemas
                        </p>
                    </div>

                    {/* Opciones de navegación */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                            <div className="w-12 h-12 bg-red-800 rounded-lg flex items-center justify-center mb-4 mx-auto">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Página Principal</h3>
                            <p className="text-sm text-gray-600">Volver al inicio</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                            <div className="w-12 h-12 bg-red-800 rounded-lg flex items-center justify-center mb-4 mx-auto">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Admisión</h3>
                            <p className="text-sm text-gray-600">Proceso de inscripción</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 sm:col-span-2 lg:col-span-1">
                            <div className="w-12 h-12 bg-red-800 rounded-lg flex items-center justify-center mb-4 mx-auto">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ayuda</h3>
                            <p className="text-sm text-gray-600">Soporte y contacto</p>
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/">
                            <Button className="bg-red-800 hover:bg-red-900 text-white px-8 py-3 text-base font-medium">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Ir al Inicio
                            </Button>
                        </Link>

                        <Button
                            variant="outline"
                            className="border-red-800 text-red-800 hover:bg-red-50 px-8 py-3 text-base font-medium"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Volver Atrás
                        </Button>
                    </div>

                    {/* Información adicional */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <p className="text-sm text-gray-500 mb-2">
                            Si crees que esto es un error, puedes contactarnos:
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-gray-600">
                            <a
                                href="mailto:admision@fiis.uni.edu.pe"
                                className="flex items-center hover:text-red-800 transition-colors"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                admision@fiis.uni.edu.pe
                            </a>

                            <span className="hidden sm:inline text-gray-400">|</span>

                            <a
                                href="tel:+51014813030"
                                className="flex items-center hover:text-red-800 transition-colors"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                (01) 481-3030
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>© 2024 Universidad Nacional de Ingeniería - Facultad de Ingeniería Industrial y de Sistemas</p>
                </div>
            </div>
        </div>
    )
}