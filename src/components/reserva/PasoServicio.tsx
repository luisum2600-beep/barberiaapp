'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Clock } from 'lucide-react'
import type { ReservaState } from '@/app/[barberia]/agendar/page'

interface Servicio {
  id: string
  nombre: string
  descripcion: string | null
  precio: string
  duracion_minutos: number
  barberia_id: string
}

interface PasoServicioProps {
  slug: string
  onNext: (data: Pick<ReservaState, 'barberia_id' | 'servicio_id' | 'servicio_nombre' | 'servicio_precio' | 'servicio_duracion'>) => void
}

export default function PasoServicio({ slug, onNext }: PasoServicioProps) {
  const [servicios, setServicios] = useState<Servicio[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/servicios?slug=${slug}`)
      .then((r) => r.json())
      .then((d) => { setServicios(d.servicios ?? []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [slug])

  const handleNext = () => {
    const s = servicios.find((x) => x.id === selected)
    if (!s) return
    onNext({
      barberia_id: s.barberia_id,
      servicio_id: s.id,
      servicio_nombre: s.nombre,
      servicio_precio: Number(s.precio),
      servicio_duracion: s.duracion_minutos,
    })
  }

  if (loading) return <p className="text-center text-gray-400">Cargando servicios...</p>

  return (
    <div>
      <h2 className="text-2xl font-black mb-6">¿Qué servicio deseas?</h2>
      <div className="space-y-3">
        {servicios.map((s) => (
          <Card
            key={s.id}
            variant={selected === s.id ? 'highlighted' : 'default'}
            className="cursor-pointer"
            onClick={() => setSelected(s.id)}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold">{s.nombre}</p>
                <p className="text-gray-500 text-xs flex items-center gap-1 mt-0.5">
                  <Clock size={12} /> {s.duracion_minutos} min
                </p>
              </div>
              <p className="text-amber-500 font-black text-lg">S/ {Number(s.precio).toFixed(2)}</p>
            </div>
          </Card>
        ))}
      </div>
      <Button className="mt-6 w-full" disabled={!selected} onClick={handleNext}>
        Continuar
      </Button>
    </div>
  )
}
