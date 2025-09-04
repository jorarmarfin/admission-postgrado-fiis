"use client";

import { useState } from "react";
import Link from "next/link";
import { LogoutButton } from "@/components";

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <>
            {/* Botón hamburguesa - visible solo en tablet y móvil */}
            <div className="md:hidden">
                <button
                    onClick={toggleMenu}
                    className="text-gray-700 hover:text-red-800 p-2 transition-colors"
                    aria-label="Toggle menu"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {isOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={closeMenu}
                />
            )}

            {/* Menú móvil */}
            <div className={`
                fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}
            `}>
                <div className="flex flex-col h-full">
                    {/* Header del menú */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-red-800">
                            Menú
                        </h2>
                        <button
                            onClick={closeMenu}
                            className="text-gray-500 hover:text-red-800 p-1 transition-colors"
                            aria-label="Close menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Enlaces de navegación */}
                    <nav className="flex-1 py-6">
                        <div className="px-4 space-y-2">
                            <Link
                                href="/"
                                className="block px-4 py-3 text-gray-700 hover:text-red-800 hover:bg-red-50 rounded-lg font-medium transition-colors"
                                onClick={closeMenu}
                            >
                                <div className="flex items-center space-x-3">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    <span>Inicio</span>
                                </div>
                            </Link>

                            <Link
                                href="/documents/download"
                                className="block px-4 py-3 text-gray-700 hover:text-red-800 hover:bg-red-50 rounded-lg font-medium transition-colors"
                                onClick={closeMenu}
                            >
                                <div className="flex items-center space-x-3">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span>Descargar Documentos</span>
                                </div>
                            </Link>

                            <Link
                                href="/documents/upload"
                                className="block px-4 py-3 text-gray-700 hover:text-red-800 hover:bg-red-50 rounded-lg font-medium transition-colors"
                                onClick={closeMenu}
                            >
                                <div className="flex items-center space-x-3">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <span>Cargar Documentos</span>
                                </div>
                            </Link>

                            <Link
                                href="/interview"
                                className="block px-4 py-3 text-gray-700 hover:text-red-800 hover:bg-red-50 rounded-lg font-medium transition-colors"
                                onClick={closeMenu}
                            >
                                <div className="flex items-center space-x-3">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 6v6a2 2 0 002 2h4a2 2 0 002-2v-6m-6-6h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2z" />
                                    </svg>
                                    <span>Registro de Entrevista</span>
                                </div>
                            </Link>
                        </div>
                    </nav>

                    {/* Botón de cerrar sesión */}
                    <div className="border-t border-gray-200 p-4">
                        <LogoutButton className="w-full bg-red-800 text-white hover:bg-red-700 transition-colors px-4 py-3 rounded-lg font-medium" />
                    </div>
                </div>
            </div>
        </>
    );
}
