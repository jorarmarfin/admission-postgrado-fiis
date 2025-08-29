import Link from "next/link";
import React from "react";
import {LogoUni, LogoutButton} from "@/components"; // Importa el componente Image

export default function IntranetLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo y título */}
                        <div className="flex items-center space-x-4">
                            {/* Sustituye el logo por la imagen */}
                            <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-white border border-gray-200">
                                <LogoUni/>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-red-800">
                                    Admisión Postgrado
                                </h1>
                                <p className="text-sm text-gray-600">
                                    Universidad Nacional de Ingeniería <br/>
                                    Facultad de Ingeniería Industrial y de Sistemas
                                </p>
                            </div>
                        </div>

                        {/* Navegación */}
                        <nav className="hidden md:flex items-center space-x-6">
                            <Link href="/" className="text-gray-700 hover:text-red-800 font-medium transition-colors">
                                Inicio
                            </Link>
                            <Link href="/" className="text-gray-700 hover:text-red-800 font-medium transition-colors">
                                Descargar Documentos
                            </Link>
                            <div className="border-l border-gray-300 pl-6">
                                <LogoutButton className='bg-red-800 text-white
                                hover:bg-red-500 hover:text-white
                                cursor-pointer'/>
                            </div>
                        </nav>

                        {/* Menu móvil */}
                        <div className="md:hidden">
                            <button className="text-gray-700 hover:text-red-800 p-2">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                {children}
            </main>
            {/* Footer */}
            <footer className="bg-red-800 text-white mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                    <span className="text-red-800 font-bold text-sm">UNI</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Universidad Nacional de Ingeniería</h3>
                                    <p className="text-red-200 text-sm">Facultad de Ingeniería Industrial y de Sistemas</p>
                                </div>
                            </div>
                            <p className="text-red-200 text-sm">
                                Formando profesionales de excelencia para el desarrollo del país desde 1876.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-lg mb-4">Enlaces Rápidos</h4>
                            <ul className="space-y-2 text-red-200">
                                <li><Link href="/" className="hover:text-white transition-colors">Inicio</Link></li>
                                <li><Link href="/admission" className="hover:text-white transition-colors">Proceso de Admisión</Link></li>
                                <li><Link href="/interview" className="hover:text-white transition-colors">Entrevistas</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-lg mb-4">Información de Contacto</h4>
                            <div className="space-y-2 text-red-200">
                                <p>Av. Túpac Amaru 210, Rímac</p>
                                <p>Lima 25, Perú</p>
                                <p>Teléfono: (01) 481-3030</p>
                                <p>Email: admision@fiis.uni.edu.pe</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-red-700 mt-8 pt-8 text-center text-red-200">
                        <p>© 2024 Universidad Nacional de Ingeniería. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
        </>
    );
}