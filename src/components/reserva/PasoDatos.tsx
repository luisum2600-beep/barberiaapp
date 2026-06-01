'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { ReservaState } from '@/app/[barberia]/agendar/page'

interface PasosDatosProps {
  onNext: (data: Pick<ReservaState, 'cliente_nombre' | 'cliente_telefono' | 'cliente_email'>) => void
  onBack: () => void
}

export default function PasoDatos({ onNext, onBack }: PasosDatosProps) {
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (nombre.length < 2) e.nombre = 'Mínimo 2 caracteres'
    if (!/^\+?[0-9]{9,15}$/.test(telefono)) e.telefono = 'Número inválido'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Email inválido'
    return e
  }

  const handleNext = () => {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    onNext({ cliente_nombre: nombre, cliente_telefono: telefono, cliente_email: email })
  }

  return (
    <div>
      <h2 className="text-2xl font-black mb-6">Tus datos</h2>
      <div className="space-y-4 mb-6">
        <Input
          label="Nombre completo"
          placeholder="Ej: Juan Pérez"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          error={errors.nombre}
        />
        <Input
          label="WhatsApp"
          placeholder="+51 987 654 321"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          error={errors.telefono}
        />
        <Input
          label="Email"
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
      </div>
      <div className="flex gap-3">
        <Button variant="ghost" onClick={onBack}>← Atrás</Button>
        <Button className="flex-1" onClick={handleNext}>Continuar</Button>
      </div>
    </div>
  )
}
