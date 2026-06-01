import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface Barbero {
  id: string
  nombre: string
  foto: string | null
  especialidades: string[]
}

interface BarberosProps {
  barberos: Barbero[]
  slug: string
}

export default function Barberos({ barberos, slug }: BarberosProps) {
  if (barberos.length === 0) return null

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto bg-neutral-900/50" id="barberos">
      <h2 className="text-3xl font-black uppercase tracking-tight mb-10 text-center">
        Nuestro Equipo
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {barberos.map((b) => (
          <div key={b.id} className="text-center w-48">
            <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-neutral-800">
              {b.foto ? (
                <Image src={b.foto} alt={b.nombre} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl text-gray-600">
                  ✂
                </div>
              )}
            </div>
            <h3 className="font-bold text-lg">{b.nombre}</h3>
            <p className="text-gray-400 text-sm mt-1">
              {b.especialidades.join(' · ')}
            </p>
            <Link href={`/${slug}/agendar?barbero=${b.id}`} className="mt-3 inline-block">
              <Button variant="outline" size="sm">Agendar con él</Button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
