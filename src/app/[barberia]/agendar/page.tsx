'use client'

import { useState } from 'react'
import PasoServicio from '@/components/reserva/PasoServicio'
import PasoBarberoFecha from '@/components/reserva/PasoBarberoFecha'
import PasoDatos from '@/components/reserva/PasoDatos'
import PasoPago from '@/components/reserva/PasoPago'

export interface ReservaState {
  barberia_id: string
  slug: string
  servicio_id: string
  servicio_nombre: string
  servicio_precio: number
  servicio_duracion: number
  barbero_id: string
  barbero_nombre: string
  fecha_hora: string
  cliente_nombre: string
  cliente_telefono: string
  cliente_email: string
}

export default function AgendarPage({ params }: { params: { barberia: string } }) {
  const [paso, setPaso] = useState(1)
  const [reserva, setReserva] = useState<Partial<ReservaState>>({
    slug: params.barberia,
  })

  const update = (data: Partial<ReservaState>) =>
    setReserva((prev) => ({ ...prev, ...data }))

  return (
    <div className="min-h-screen bg-neutral-950 text-white py-12 px-4">
      <div className="max-w-xl mx-auto">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors
                ${paso >= n ? 'bg-amber-500 text-black' : 'bg-neutral-800 text-gray-500'}`}
            >
              {n}
            </div>
          ))}
        </div>

        {paso === 1 && (
          <PasoServicio
            slug={params.barberia}
            onNext={(data) => { update(data); setPaso(2) }}
          />
        )}
        {paso === 2 && (
          <PasoBarberoFecha
            slug={params.barberia}
            duracion={reserva.servicio_duracion ?? 30}
            onNext={(data) => { update(data); setPaso(3) }}
            onBack={() => setPaso(1)}
          />
        )}
        {paso === 3 && (
          <PasoDatos
            onNext={(data) => { update(data); setPaso(4) }}
            onBack={() => setPaso(2)}
          />
        )}
        {paso === 4 && (
          <PasoPago
            reserva={reserva as ReservaState}
            onBack={() => setPaso(3)}
          />
        )}
      </div>
    </div>
  )
}
