import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'
import Image from 'next/image'
import { Clock } from 'lucide-react'

interface Servicio {
  id: string
  nombre: string
  descripcion: string | null
  precio: unknown // Decimal from Prisma
  duracion_minutos: number
  foto: string | null
}

interface ServiciosProps {
  servicios: Servicio[]
  slug: string
}

export default function Servicios({ servicios, slug }: ServiciosProps) {
  if (servicios.length === 0) return null

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto" id="servicios">
      <h2 className="text-3xl font-black uppercase tracking-tight mb-10 text-center">
        Nuestros Servicios
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicios.map((s) => (
          <Card key={s.id} className="flex flex-col gap-4">
            {s.foto && (
              <div className="relative h-40 rounded-lg overflow-hidden">
                <Image src={s.foto} alt={s.nombre} fill className="object-cover" />
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-bold text-lg">{s.nombre}</h3>
              {s.descripcion && (
                <p className="text-gray-400 text-sm mt-1">{s.descripcion}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-500 font-black text-xl">
                  S/ {Number(s.precio).toFixed(2)}
                </p>
                <p className="text-gray-500 text-xs flex items-center gap-1 mt-0.5">
                  <Clock size={12} /> {s.duracion_minutos} min
                </p>
              </div>
              <Link href={`/${slug}/agendar?servicio=${s.id}`}>
                <Button size="sm">Agendar</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
