'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import type { ReservaState } from '@/app/[barberia]/agendar/page'
import { format } from 'date-fns'

interface Barbero {
  id: string
  nombre: string
  foto: string | null
}

interface PasoBarberoFechaProps {
  slug: string
  duracion: number
  onNext: (data: Pick<ReservaState, 'barbero_id' | 'barbero_nombre' | 'fecha_hora'>) => void
  onBack: () => void
}

export default function PasoBarberoFecha({ slug, duracion, onNext, onBack }: PasoBarberoFechaProps) {
  const [barberos, setBarberos] = useState<Barbero[]>([])
  const [selectedBarbero, setSelectedBarbero] = useState<string | null>(null)
  const [fecha, setFecha] = useState('')
  const [slots, setSlots] = useState<string[]>([])
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/barberos?slug=${slug}`)
      .then((r) => r.json())
      .then((d) => setBarberos(d.barberos ?? []))
  }, [slug])

  useEffect(() => {
    if (!selectedBarbero || !fecha) return
    fetch(`/api/disponibilidad?barbero_id=${selectedBarbero}&fecha=${fecha}&duracion_minutos=${duracion}`)
      .then((r) => r.json())
      .then((d) => { setSlots(d.slots ?? []); setSelectedSlot(null) })
  }, [selectedBarbero, fecha, duracion])

  const handleNext = () => {
    const b = barberos.find((x) => x.id === selectedBarbero)
    if (!b || !selectedSlot) return
    onNext({ barbero_id: b.id, barbero_nombre: b.nombre, fecha_hora: selectedSlot })
  }

  return (
    <div>
      <h2 className="text-2xl font-black mb-6">Elige barbero y fecha</h2>
      <div className="space-y-3 mb-6">
        {barberos.map((b) => (
          <Card
            key={b.id}
            variant={selectedBarbero === b.id ? 'highlighted' : 'default'}
            className="cursor-pointer"
            onClick={() => setSelectedBarbero(b.id)}
          >
            <p className="font-bold">{b.nombre}</p>
          </Card>
        ))}
      </div>
      {selectedBarbero && (
        <div className="mb-6">
          <label className="text-sm text-gray-400 block mb-2">Fecha</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            min={format(new Date(), 'yyyy-MM-dd')}
            className="bg-neutral-900 border border-neutral-700 text-white rounded-lg px-4 py-2.5 w-full focus:outline-none focus:border-amber-500"
          />
        </div>
      )}
      {slots.length > 0 && (
        <div className="mb-6">
          <p className="text-sm text-gray-400 mb-3">Horarios disponibles</p>
          <div className="grid grid-cols-4 gap-2">
            {slots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedSlot === slot
                    ? 'bg-amber-500 text-black'
                    : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
                }`}
              >
                {format(new Date(slot), 'HH:mm')}
              </button>
            ))}
          </div>
        </div>
      )}
      {slots.length === 0 && fecha && selectedBarbero && (
        <p className="text-gray-500 text-sm mb-6">No hay horarios disponibles para esta fecha.</p>
      )}
      <div className="flex gap-3">
        <Button variant="ghost" onClick={onBack}>← Atrás</Button>
        <Button className="flex-1" disabled={!selectedSlot} onClick={handleNext}>
          Continuar
        </Button>
      </div>
    </div>
  )
}
