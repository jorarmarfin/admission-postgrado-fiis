"use client"

import * as React from "react"
import { createContext, useContext, useState } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

type NotificationType = "success" | "error" | "info" | "warning"

interface NotificationContextType {
  showNotification: (title: string, message: string, type: NotificationType) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [type, setType] = useState<NotificationType>("info")

  const showNotification = (title: string, message: string, type: NotificationType) => {
    setTitle(title)
    setMessage(message)
    setType(type)
    setIsOpen(true)
  }

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className={
              type === "success" ? "text-green-600" :
              type === "error" ? "text-red-600" :
              type === "warning" ? "text-amber-600" :
              "text-blue-600"
            }>{title}</AlertDialogTitle>
            <AlertDialogDescription>
              {message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Aceptar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotification debe ser usado dentro de un NotificationProvider')
  }
  return context
}