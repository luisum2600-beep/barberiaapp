'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import type { ReservaState } from '@/app/[barberia]/agendar/page'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface PasoPagoProps {
  reserva: ReservaState
  onBack: () => void
}

export default function PasoPago({ reserva, onBack }: PasoPagoProps) {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const confirmar = async (pagarAhora: boolean) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          barberia_id: reserva.barberia_id,
          barbero_id: reserva.barbero_id,
          servicio_id: reserva.servicio_id,
          cliente_nombre: reserva.cliente_nombre,
          cliente_telefono: reserva.cliente_telefono,
          cliente_email: reserva.cliente_email,
          fecha_hora: reserva.fecha_hora,
          pagar_ahora: pagarAhora,
        }),
      })
      if (!res.ok) throw new Error('Error al crear reserva')
      setDone(true)
    } catch {
      setError('No se pudo crear la reserva. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="text-center py-10">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-black mb-2">¡Reserva confirmada!</h2>
        <p className="text-gray-400">Recibirás un email de confirmación con el link para reagendar si necesitas.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-black mb-6">Confirmar reserva</h2>
      <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800 mb-6 space-y-2">
        <p><span className="text-gray-400">Servicio:</span> <span className="font-bold">{reserva.servicio_nombre}</span></p>
        <p><span className="text-gray-400">Barbero:</span> <span className="font-bold">{reserva.barbero_nombre}</span></p>
        <p><span className="text-gray-400">Fecha:</span> <span className="font-bold">{format(new Date(reserva.fecha_hora), "EEEE d 'de' MMMM, HH:mm", { locale: es })}</span></p>
        <p><span className="text-gray-400">Precio:</span> <span className="text-amber-500 font-black">S/ {reserva.servicio_precio.toFixed(2)}</span></p>
      </div>
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
      <div className="flex flex-col gap-3">
        <Button size="lg" disabled={loading} onClick={() => confirmar(false)}>
          {loading ? 'Procesando...' : 'Reservar sin pagar (pagar en local)'}
        </Button>
        <Button variant="outline" size="lg" disabled={loading} onClick={() => confirmar(true)}>
          Pagar ahora (S/ {reserva.servicio_precio.toFixed(2)})
        </Button>
        <Button variant="ghost" onClick={onBack} disabled={loading}>← Atrás</Button>
      </div>
    </div>
  )
}
